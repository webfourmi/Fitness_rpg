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
  return { state, programs, progress, config, localStorage, records, profileKey: config.storageKeys.profile,
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
