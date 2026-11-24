const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const programId = 'bras-heros';
const today = '2026-11-20';
const tomorrow = '2026-11-21';

function boot(records = new Map(), date = today) {
  const window = { addEventListener() {}, setTimeout() {} };
  const document = {
    addEventListener() {},
    querySelector: () => null,
    querySelectorAll: () => [],
    body: { classList: { toggle() {}, remove() {} } }
  };
  const localStorage = {
    getItem: (key) => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, value),
    removeItem: (key) => records.delete(key)
  };
  const context = vm.createContext({ window, document, localStorage, console, structuredClone });
  for (const name of ['config', 'data', 'state', 'camp', 'progress', 'render',
    'navigation', 'exercises', 'programs']) {
    const filename = 'app-' + name + '.js';
    vm.runInContext(readFileSync(join(__dirname, '..', filename), 'utf8'), context, { filename });
  }

  const { FitnessRpgState: state, FitnessRpgCamp: camp, FitnessRpgPrograms: programs,
    FitnessRpgProgress: progress, FitnessRpgConfig: config, FitnessRpgRender: render } = window;
  state.todayKey = () => date;
  state.loadProfile() || state.setProfile(state.createDefaultProfile({ name: 'Aventurière', activeProgramId: programId }));
  state.loadActiveProgramSession();
  camp.resolveOvernight();
  let message;
  let summary;
  render.renderAll = () => {};
  render.renderProgramDetail = () => {};
  render.queueWorkoutSummary = (value) => { summary = value; };
  programs.showMessage = (options) => { message = options.message; };
  return { state, programs, progress, config, render, exercises: window.FitnessRpgExercises, localStorage, records, profileKey: config.storageKeys.profile,
    readMessage: () => message, readSummary: () => summary };
}

function completeGuidedDay(app, dayNumber) {
  app.programs.validateProgramDay(programId, dayNumber, 1);
  app.programs.getActiveProgramWorkout().exercises.forEach(({ exerciseId }, index) => {
    app.state.completeProgramSessionExercise(index + '-' + exerciseId);
  });
  app.programs.finishProgramSession();
  assert.equal(app.state.getActiveProgramSession(), null);
}

test('les séances libres partagent 5 PO par jour local et gardent leurs XP', () => {
  let app = boot();
  const exercise = {
    type: 'exercise', exerciseId: 'exercice-libre', date: '2026-11-19', xp: 8
  };
  const custom = { type: 'custom-program', programId: 'routine-du-soir', xp: 12 };

  assert.equal(app.state.addTrainingEntry(exercise).gold, 5);
  app = boot(app.records);
  assert.equal(app.state.addTrainingEntry(custom).gold || 0, 0);

  const required = app.state.addTrainingEntry({
    type: 'program', programId, dayNumber: 1, weekNumber: 1, xp: 35
  }, { campGold: 10 });
  assert.equal(required.gold, 10);
  assert.equal(app.state.profile.totalXp, 55);
  assert.equal(app.state.profile.camp.gold, 15);

  app = boot(app.records, tomorrow);
  assert.equal(app.state.addTrainingEntry(exercise).gold, 5);
  assert.equal(app.state.profile.totalXp, 63);
  assert.equal(app.state.profile.camp.gold, 20);
});

test('un complément guidé crédite ses XP et ses PO à la première validation', () => {
  let app = boot();
  completeGuidedDay(app, 4);
  assert.equal(app.readSummary().xp, 10);
  assert.equal(app.readSummary().rewards.some(({ text }) => text.includes('+5 PO')), true);
  assert.equal(app.state.profile.totalXp, 10);
  assert.equal(app.state.profile.camp.gold, 5);
  assert.ok(app.state.getProgramComplementCompletion(programId, 1, 4));
  assert.equal(app.programs.getProgramCompletionProgress(programId).completed, 0);

  app = boot(app.records);
  completeGuidedDay(app, 4);
  assert.equal(app.readSummary(), undefined);
  assert.match(app.readMessage(), /récompenses déjà obtenues/);
  assert.equal(app.state.profile.totalXp, 10);
  assert.equal(app.state.profile.camp.gold, 5);

  app.state.resetProgramProgress(programId);
  completeGuidedDay(app, 4);
  assert.equal(app.state.profile.totalXp, 10);
  assert.equal(app.state.profile.camp.gold, 5);
  assert.equal(app.programs.getProgramCompletionProgress(programId).completed, 0);
});

test('un échec de sauvegarde du complément laisse les récompenses disponibles au nouvel essai', () => {
  const app = boot();
  const before = app.records.get(app.profileKey);
  const write = app.localStorage.setItem;
  app.localStorage.setItem = () => { throw new Error('QuotaExceededError'); };

  assert.throws(() => app.state.completeProgramComplement(programId, 1, 4), /QuotaExceededError/);
  assert.equal(app.records.get(app.profileKey), before);
  assert.equal(app.state.getProgramComplementCompletion(programId, 1, 4), null);
  assert.equal(app.state.profile.totalXp, 0);
  assert.equal(app.state.profile.camp.gold, 0);

  app.localStorage.setItem = write;
  const result = app.state.completeProgramComplement(programId, 1, 4);
  assert.equal(result.xp, 10);
  assert.equal(result.gold, 5);
  assert.equal(app.state.profile.totalXp, 10);
  assert.equal(app.state.profile.camp.gold, 5);
});

test('le sac de niveau s’ajoute aux PO du complément qui a fait franchir le palier', () => {
  const app = boot();
  const nextThreshold = app.config.totalXpForLevel(2);
  app.state.addXp(nextThreshold - 10);

  completeGuidedDay(app, 4);
  assert.equal(app.state.profile.totalXp, nextThreshold);
  assert.equal(app.state.profile.camp.gold, 25);
  assert.equal(app.progress.peekLevelUpModal().gold, 20);
});

test('une séance guidée conserve une seule chronique avec les gains réellement crédités', () => {
  let app = boot();
  completeGuidedDay(app, 1);
  const [entry] = app.state.getAllEntries();
  assert.ok(entry.xp > 0);
  assert.equal(app.state.profile.camp.gold, 10);
  app = boot(app.records);
  app.programs.finishProgramSession();
  const rows = app.state.getJournal().filter(row => row.title === entry.title);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].sessionId, entry.id);
  assert.equal(rows[0].xp, entry.xp);
  assert.equal(rows[0].gold, 10);
  assert.match(rows[0].text, /exercices validés/);
  assert.equal(app.state.profile.totalXp, entry.xp);
});

test('deux validations du même minuteur ne paient qu’une fois, même après reprise', () => {
  let app = boot();
  const timed = { id: 'timer-123', type: 'exercise', title: 'Marche', xp: 8 };
  app.state.addTrainingEntry(timed);
  app = boot(app.records);
  assert.equal(app.state.addTrainingEntry(timed), null);
  assert.equal(app.state.profile.totalXp, 8);
  assert.equal(app.state.profile.camp.gold, 5);
  assert.equal(app.state.getJournal().length, 1);
  const second = app.state.addTrainingEntry({ ...timed, id: 'timer-124' });
  assert.equal(second.xp, 8);
  assert.equal(app.state.getJournal().length, 2);
  assert.equal(app.state.getJournal()[0].gold, 0);
});

test('un double clic sur une séance libre est ignoré jusqu’à la fermeture du bilan', () => {
  const { state, exercises, render } = boot();
  const exercise = { id: 'demo', title: 'Marche', unit: 'min', min: 1, xpPerUnit: 1 };
  exercises.getExercise = () => exercise;
  render.queueWorkoutSummary = value => { render.pendingWorkoutSummary = value; };
  const validate = () => exercises.validateExercise(exercise.id, { amount: 10 });
  validate();
  assert.equal(state.getJournal().filter(row => row.type === 'exercise').length, 1);
  assert.equal(state.getJournal().some(row => row.type === 'xp'), false);
  const firstXp = state.profile.totalXp;
  validate();
  assert.equal(state.getAllEntries().length, 1);
  assert.equal(state.profile.totalXp, firstXp);
  render.consumeWorkoutSummary();
  validate();
  assert.equal(state.getAllEntries().length, 2);
  assert.equal(state.profile.totalXp, firstXp * 2);
  assert.equal(state.profile.camp.gold, 5);
});

test('un complément a une seule ligne et sépare les pièces du sac de niveau', () => {
  const app = boot();
  app.state.addXp(app.config.totalXpForLevel(2) - 10);
  completeGuidedDay(app, 4);
  completeGuidedDay(app, 4);
  const rows = app.state.getJournal().filter(row => row.type === 'program');
  assert.equal(rows.length, 1);
  assert.equal(rows[0].xp, 10);
  assert.equal(rows[0].gold, 5);
  assert.ok(app.state.getJournal().some(row => row.type === 'levelup'));
  assert.equal(app.state.profile.camp.gold, 25);
});

test('lecture des anciennes paires, avec deux séances identiques et un bonus autonome', () => {
  const app = boot();
  const at = '2026-11-19T15:00:00.000Z';
  const later = '2026-11-19T16:00:00.000Z';
  const source = 'Routine · Programme perso';
  const session = { type: 'custom-program', title: 'Routine', xp: 8, at };
  const credit = { type: 'xp', title: source, xp: 8, text: '+8 XP · ' + source, at };
  const profile = app.state.profile;
  profile.totalXp = 24;
  profile.camp.gold = 25;
  profile.completedByDate[today] = [
    { ...session, title: source, gold: 5 },
    { ...session, title: source, at: later, gold: 0 }
  ];
  profile.journal = [
    { ...session, at: later }, { ...credit, at: later },
    session, { type: 'levelup', at }, { type: 'familiar', at }, credit,
    { ...credit, title: 'Bonus de planning' }
  ];
  app.state.saveProfile();
  const before = JSON.stringify(profile);
  const saved = app.records.get(app.profileKey);
  const rows = app.state.getJournal();
  assert.equal(rows.length, 5);
  assert.deepEqual(Array.from(rows, row => row.type), ['custom-program', 'custom-program', 'levelup', 'familiar', 'xp']);
  assert.equal(rows[0].gold, 0);
  assert.equal(rows[1].gold, 5);
  assert.equal(JSON.stringify(profile), before);
  assert.equal(app.records.get(app.profileKey), saved);
});

test('un échec de sauvegarde du journal permet de reprendre la validation', () => {
  const app = boot();
  const workout = { id: 'run-1', title: 'Séance du soir', xp: 9 };
  const write = app.localStorage.setItem;
  app.localStorage.setItem = () => { throw new Error('QuotaExceededError'); };
  assert.throws(() => app.state.addTrainingEntry(workout), /QuotaExceededError/);
  assert.equal(app.state.getJournal().length, 0);
  assert.equal(app.state.getAllEntries().length, 0);
  assert.equal(app.state.profile.totalXp, 0);
  assert.equal(app.state.profile.camp.gold, 0);
  app.localStorage.setItem = write;
  app.state.addTrainingEntry(workout);
  assert.equal(app.state.getJournal().length, 1);
  assert.equal(app.state.profile.totalXp, 9);
  assert.equal(app.state.profile.camp.gold, 5);
});

test('un programme personnalisé guidé conserve ses détails et son identifiant de séance', () => {
  const { state, exercises } = boot();
  const program = state.saveCustomProgram({
    title: 'Circuit du soir',
    exercises: [{ exerciseId: 'demo', amount: 6, unit: 'répétitions' }]
  });
  exercises.renderCustomProgramDetail = () => {};
  exercises.customProgramRun = { programId: program.id, startedAt: '2026-11-20T18:00:00Z' };
  exercises.finishCustomProgramGuided(program.id);
  exercises.finishCustomProgramGuided(program.id);
  const [entry] = state.getAllEntries();
  const rows = state.getJournal().filter(row => row.type === 'custom-program');
  assert.equal(rows.length, 1);
  assert.equal(rows[0].sessionId, entry.id);
  assert.equal(rows[0].title, program.title);
  assert.match(rows[0].text, /6 répétitions/);
  assert.equal(rows[0].xp, state.profile.totalXp);
  assert.equal(rows[0].gold, 5);
  assert.equal(state.getJournal().some(row => row.type === 'xp'), false);
});

test('un boss revaincu conserve une seule victoire récompensée', () => {
  const { state, programs } = boot();
  for (let attempt = 0; attempt < 2; attempt++) {
    state.startProgramBossSession('tour-mage', 4);
    programs.getActiveProgramWorkout().exercises.forEach(({ exerciseId }, index) => {
      state.completeProgramSessionExercise(index + '-' + exerciseId);
    });
    programs.finishProgramSession();
  }
  const rows = state.getJournal().filter(row => row.type === 'program-boss');
  assert.equal(rows.length, 1);
  assert.equal(state.getAllEntries().length, 1);
  assert.equal(rows[0].xp, state.profile.totalXp);
  assert.equal(rows[0].gold, 20);
  assert.equal(state.getJournal().some(row => row.type === 'xp'), false);
});
