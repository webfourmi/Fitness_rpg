const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const programId = 'epreuves-forge';
const first = 'familier-01';
const second = 'familier-02';

function boot(records = new Map(), date = '2026-11-19') {
  const localStorage = {
    get length() { return records.size; },
    key: (index) => [...records.keys()][index] ?? null,
    getItem: (key) => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, String(value)),
    removeItem: (key) => records.delete(key)
  };
  class Element {}
  const window = { addEventListener() {}, setTimeout() {} };
  const classes = new Set();
  const overlay = {
    classList: { add: (value) => classes.add(value), remove: (value) => classes.delete(value) },
    setAttribute(name, value) { this[name] = value; }
  };
  const document = {
    addEventListener() {},
    querySelector: (selector) => selector === '#familiarDetailOverlay' ? overlay : null,
    querySelectorAll: () => [],
    body: { classList: { add() {}, remove() {} } }
  };
  const context = vm.createContext({ window, document, Element, localStorage, console, Intl, Blob });
  for (const name of ['config', 'data', 'program-forge-exercises', 'program-forge', 'rewards',
    'state', 'progress', 'render', 'navigation', 'programs', 'backup']) {
    const file = 'app-' + name + '.js';
    vm.runInContext(readFileSync(path.join(__dirname, '..', file), 'utf8'), context, { filename: file });
  }
  const { FitnessRpgState: state, FitnessRpgRewards: rewards, FitnessRpgPrograms: programs,
    FitnessRpgRender: render, FitnessRpgNavigation: navigation, FitnessRpgBackup: backup } = window;
  state.todayKey = () => date;
  if (!state.loadProfile()) state.setProfile(state.createDefaultProfile({ name: 'Aventurière' }));
  state.loadActiveProgramSession();
  let summary;
  let message;
  render.renderAll = () => {};
  render.getLevelSnapshot = () => null;
  render.queueWorkoutSummary = (value) => { summary = value; };
  programs.showMessage = (value) => { message = value; };
  programs.setCoachMessage = () => {};
  return { state, rewards, programs, navigation, backup, overlay, records,
    summary: () => summary, message: () => message };
}

function start(app, day, complete = true, planningDateKey = null) {
  app.state.startProgramSession(programId, day, 1, { planningDateKey });
  if (complete) {
    app.programs.getActiveProgramWorkout().exercises.forEach(({ exerciseId }, index) => {
      app.state.completeProgramSessionExercise(index + '-' + exerciseId);
    });
  }
}

function click(app, selector, familiarId) {
  const button = { dataset: { familiarId } };
  const target = { closest: (query) => query === selector ? button : null };
  return app.navigation.handleDocumentClick({
    target: { parentElement: target }, preventDefault() {}, stopPropagation() {}
  });
}

test('validation après rechargement, bonus dans le bilan et plafond commun aux compagnons', () => {
  let app = boot();
  app.rewards.unlockFamiliar(first);
  app.rewards.unlockFamiliar(second);
  app.rewards.setActiveFamiliar(first);
  app.state.profile.familiarAffinity[first] = 48;
  start(app, 1, true, '2026-11-18');
  app.state.saveProfile();

  app = boot(app.records);
  const beforeXp = app.state.profile.totalXp;
  app.programs.finishProgramSession();
  const entry = app.state.getAllEntries().find((item) => item.dayNumber === 1);
  assert.equal(entry.date, '2026-11-18');
  assert.equal(entry.familiarBonusXp, 1);
  assert.equal(entry.familiarId, first);
  assert.equal(app.state.profile.totalXp - beforeXp, app.summary().xp);
  assert.equal(app.summary().xp, app.summary().baseXp + app.summary().bonusXp);
  assert.ok(app.summary().rewards.some(({ text }) => text.includes('bonus passif +1 XP')));
  assert.equal(app.rewards.getFamiliarLevelInfo(first).level, 3);
  assert.equal(app.state.getActiveProgramSession(), null);
  app.programs.finishProgramSession();
  assert.equal(app.state.getAllEntries().length, 1);

  app.rewards.setActiveFamiliar(second);
  start(app, 2);
  app = boot(app.records);
  app.programs.finishProgramSession();
  assert.equal(app.state.getAllEntries().find((item) => item.dayNumber === 2).familiarBonusXp, undefined);
});

test('un autre jour permet un bonus supérieur sur une nouvelle séance, sans récompenser un rejeu', () => {
  let app = boot();
  app.rewards.unlockFamiliar(first);
  app.rewards.setActiveFamiliar(first);
  app.state.profile.familiarAffinity[first] = 100;
  start(app, 1);
  app.programs.finishProgramSession();
  assert.equal(app.state.getAllEntries()[0].familiarBonusXp, 3);

  app.state.clearTodayEntries();
  app = boot(app.records, '2026-11-20');
  start(app, 1);
  app.programs.finishProgramSession();
  assert.ok(app.state.getAllEntries().every((item) => !item.familiarBonusXp));
  start(app, 2);
  app.programs.finishProgramSession();
  assert.equal(app.state.getAllEntries().find((item) => item.dayNumber === 2).familiarBonusXp, 3);
});

test('une séance incomplète et un compagnon absent conservent le parcours habituel', () => {
  const app = boot();
  start(app, 1, false);
  app.programs.finishProgramSession();
  assert.equal(app.message().title, 'Séance incomplète');
  assert.equal(app.state.getAllEntries().length, 0);
  assert.ok(app.state.getActiveProgramSession());
  start(app, 1);
  app.programs.finishProgramSession();
  assert.equal(app.state.getAllEntries()[0].familiarBonusXp, undefined);
  assert.equal(app.summary().xp, app.summary().baseXp);
});

test('une sauvegarde ancienne reste restaurable et une sauvegarde récente conserve le plafond', () => {
  const source = boot();
  delete source.state.profile.familiarPassiveClaims;
  source.rewards.unlockFamiliar(first);
  source.rewards.setActiveFamiliar(first);
  const legacy = JSON.parse(JSON.stringify(source.backup.buildBackup()));
  const target = boot();
  function restore(backupFile) {
    const validated = target.backup.validateBackupObject(backupFile);
    assert.equal(validated.valid, true, JSON.stringify(validated));
    target.backup.applyRecordsTransaction(validated.records);
    return boot(target.records);
  }
  let imported = restore(legacy);
  assert.equal(imported.rewards.getActiveFamiliarId(), first);
  start(imported, 1);
  imported.programs.finishProgramSession();
  imported = restore(JSON.parse(JSON.stringify(imported.backup.buildBackup())));
  assert.equal(imported.rewards.getFamiliarAffinity(first), 2);
  assert.equal(imported.state.getAllEntries()[0].familiarBonusXp, 1);
  start(imported, 2);
  imported.programs.finishProgramSession();
  assert.equal(imported.state.getAllEntries().find((item) => item.dayNumber === 2).familiarBonusXp, undefined);
});

test('navigation existante de la fiche, sélection enregistrée et refus des familiers verrouillés', () => {
  let app = boot();
  app.rewards.unlockFamiliar(first);
  app.rewards.unlockFamiliar(second);
  app.rewards.setActiveFamiliar(first);
  click(app, '.familiar-card[data-familiar-id]', second);
  assert.match(app.overlay.innerHTML, /Passif · \+1 XP/);
  assert.equal(app.overlay['aria-hidden'], 'false');
  click(app, '.set-active-familiar-btn[data-familiar-id]', second);
  assert.match(app.overlay.innerHTML, /Compagnon actif/);
  click(app, '.set-active-familiar-btn[data-familiar-id]', 'familier-31');
  assert.equal(app.rewards.getActiveFamiliarId(), second);
  click(app, '.familiar-detail-close');
  assert.equal(app.overlay['aria-hidden'], 'true');
  app = boot(app.records);
  assert.equal(app.rewards.getActiveFamiliarId(), second);
});

test('la révision et le boss gardent leurs récompenses existantes sans consommer le passif', () => {
  const app = boot();
  app.rewards.unlockFamiliar(first);
  app.rewards.setActiveFamiliar(first);
  app.state.profile.repeatWeek = { programId, weekNumber: 1, nextDay: 1 };
  start(app, 1);
  app.programs.finishProgramSession();
  assert.equal(app.state.getAllEntries().length, 0);
  assert.equal(app.state.profile.totalXp, 0);

  app.state.startProgramBossSession(programId, 1);
  app.programs.getActiveProgramWorkout().exercises.forEach(({ exerciseId }, index) => {
    app.state.completeProgramSessionExercise(index + '-' + exerciseId);
  });
  app.programs.finishProgramSession();
  const boss = app.state.getAllEntries()[0];
  assert.equal(boss.type, 'program-boss');
  assert.equal(boss.familiarBonusXp, undefined);
  assert.equal(app.rewards.getFamiliarAffinity(first), 5);
  assert.equal(app.state.profile.familiarPassiveClaims.lastDate, null);
});

test('les quatre paliers restent bornés à trois XP', () => {
  const app = boot();
  app.rewards.unlockFamiliar(first);
  app.rewards.setActiveFamiliar(first);
  for (const [points, xp] of [[0, 1], [20, 1], [50, 2], [100, 3], [1000, 3]]) {
    app.state.profile.familiarAffinity[first] = points;
    assert.equal(app.rewards.getGuidedSessionPassive({ programId }, 1, 1).xp, xp);
  }
});

test('un échec du premier enregistrement permet de réessayer sans perdre la séance ni le bonus', () => {
  const app = boot();
  app.rewards.unlockFamiliar(first);
  app.rewards.setActiveFamiliar(first);
  start(app, 1);
  const write = app.records.set.bind(app.records);
  const profileKey = app.state.getKeys().profile;
  const previousXp = app.state.profile.totalXp;
  app.records.set = (key, value) => {
    if (key === profileKey) throw new Error('QuotaExceededError');
    return write(key, value);
  };
  app.programs.finishProgramSession();
  assert.equal(app.message().title, 'Sauvegarde de séance interrompue');
  assert.equal(app.state.profile.totalXp, previousXp);
  assert.equal(app.state.getAllEntries().length, 0);
  assert.ok(app.state.getActiveProgramSession());
  app.records.set = write;
  app.programs.finishProgramSession();
  assert.equal(app.state.getAllEntries()[0].familiarBonusXp, 1);
});

test('une séance déjà enregistrée mais encore présente au rechargement ne crédite rien de plus', () => {
  let app = boot();
  app.rewards.unlockFamiliar(first);
  app.rewards.setActiveFamiliar(first);
  start(app, 1);
  const sessionKey = app.state.getKeys().activeProgramSession;
  const session = app.records.get(sessionKey);
  app.programs.finishProgramSession();
  const xp = app.state.profile.totalXp;
  app.records.set(sessionKey, session);
  app = boot(app.records);
  app.programs.finishProgramSession();
  assert.equal(app.state.profile.totalXp, xp);
  assert.equal(app.state.getAllEntries().length, 1);
  assert.equal(app.state.getActiveProgramSession(), null);
});
