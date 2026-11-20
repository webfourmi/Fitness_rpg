const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const programId = 'forge-guerrier';
const plain = (value) => JSON.parse(JSON.stringify(value));

function boot(records = new Map()) {
  const localStorage = {
    getItem: (key) => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, String(value)),
    removeItem: (key) => records.delete(key)
  };
  const window = { addEventListener() {}, setTimeout() {}, confirm: () => true };
  const document = {
    readyState: 'loading',
    addEventListener() {},
    querySelector: () => null,
    querySelectorAll: () => [],
    body: { classList: { toggle() {}, remove() {} } }
  };
  const context = vm.createContext({ window, document, localStorage, console, Intl, Blob });
  for (const file of ['app-config.js', 'app-data.js', 'app-state.js', 'app-progress.js', 'app-render.js', 'app-navigation.js', 'app-exercises.js', 'app-programs.js']) {
    vm.runInContext(readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  const { FitnessRpgState: state, FitnessRpgData: data, FitnessRpgPrograms: programs, FitnessRpgRender: render } = window;
  if (!state.loadProfile()) {
    state.setProfile(state.createDefaultProfile({ name: 'Test Forge du guerrier', activeProgramId: programId }));
  }
  state.loadActiveProgramSession();
  render.renderAll = () => {};
  render.renderProgramDetail = () => {};
  render.queueWorkoutSummary = () => {};
  programs.showMessage = () => {};
  return { window, state, data, programs, records };
}

function finish(app) {
  const workout = app.programs.getActiveProgramWorkout();
  assert.ok(workout?.exercises?.length);
  for (const [i, item] of workout.exercises.entries()) {
    app.state.completeProgramSessionExercise(i + '-' + item.exerciseId);
  }
  assert.equal(app.programs.isActiveProgramSessionComplete(), true);
  app.programs.finishProgramSession();
  assert.equal(app.state.getActiveProgramSession(), null);
}

test('Forge du guerrier : 4 semaines, 12 séances essentielles, 4 boss', () => {
  const { data, programs } = boot();
  const program = data.getProgramDetail(programId);
  assert.equal(program.workoutRevision, 2);
  assert.equal(program.weeks.length, 4);
  assert.equal(program.bosses.length, 4);
  assert.equal(program.weeks.flatMap((week) => week.days).length, 12);
  const known = new Set(data.exercises.map((ex) => ex.id));
  for (const [index, week] of program.weeks.entries()) {
    assert.equal(week.week, index + 1);
    assert.deepEqual(plain(week.days.map((day) => day.day)), [1, 2, 3]);
    assert.ok(week.days.every((day) => !day.optional));
    assert.ok(week.days.every((day) => day.exercises.length >= 12));
    assert.ok(week.days[1].exercises.some((ex) => ex.exerciseId === 'supported_row_water_bottle'));
    assert.ok(week.days[2].exercises.some((ex) => ex.exerciseId === 'supported_row_water_bottle'));
    for (const day of week.days) {
      for (const item of day.exercises) assert.ok(known.has(item.exerciseId), 'Exercice : ' + item.exerciseId);
    }
    const boss = program.bosses[index];
    const originalBoss = program.legacyWorkouts.bosses[index];
    assert.equal(boss.title, originalBoss.title);
    assert.equal(boss.badgeId, originalBoss.badgeId);
    assert.equal(boss.xp, originalBoss.xp);
    assert.equal(boss.chest, originalBoss.chest);
    for (const item of programs.getProgramBossVariant(programId, index + 1, 'single').exercises) {
      assert.ok(known.has(item.exerciseId), 'Boss : ' + item.exerciseId);
    }
  }
});

test('Le planning propose deux compléments légers clairement facultatifs', () => {
  const { programs } = boot();
  const plan = programs.getCombinedWeeklyPlan('renforcement');
  assert.deepEqual(plain([plan[0][3], plan[2][3], plan[4][3]]), ['active-program','active-program','active-program']);
  assert.equal(plan[1][2], 'tour-mage');
  assert.equal(plan[3][2], 'marche-aventurier');
  assert.match(plan[1][1], /facultatif/);
  assert.match(plan[3][1], /facultatif/);
  assert.equal(plan[5][3], 'boss-locked');
});

test('Trois séances distinctes débloquent le boss, sans compter les compléments', () => {
  const { state, programs } = boot();
  state.addTrainingEntry({ type: 'program', programId: 'tour-mage', weekNumber: 1, dayNumber: 1, xp: 0 });
  state.addTrainingEntry({ type: 'program', programId: 'marche-aventurier', weekNumber: 1, dayNumber: 1, xp: 0 });
  assert.equal(programs.isProgramBossUnlocked(programId, 1), false);
  for (let i = 0; i < 3; i++) {
    state.addTrainingEntry({ type: 'program', programId, weekNumber: 1, dayNumber: 1, xp: 0 });
  }
  assert.equal(programs.isProgramBossUnlocked(programId, 1), false);
  state.addTrainingEntry({ type: 'program', programId, weekNumber: 1, dayNumber: 2, xp: 0 });
  assert.equal(programs.isProgramBossUnlocked(programId, 1), false);
  state.addTrainingEntry({ type: 'program', programId, weekNumber: 1, dayNumber: 3, xp: 0 });
  assert.equal(programs.isProgramBossUnlocked(programId, 1), true);
  assert.equal(programs.isProgramBossUnlocked(programId, 2), false);
  assert.equal(programs.getCombinedWeeklyPlan('renforcement')[5][3], 'program-boss');
});

test('Les séances anciennes restent lisibles après révision sans affecter la sauvegarde', () => {
  const { state, programs, data, records } = boot();
  const oldDay = data.getProgramDetail(programId).legacyWorkouts.weeks[0].days[0];
  const active = state.startProgramSession(programId, 1, 1);
  assert.equal(active.workoutRevision, 2);
  const freshDay = programs.getActiveProgramWorkout();
  assert.equal(freshDay.title, 'Les fondations de fer');
  active.workoutRevision = undefined;
  state.saveActiveProgramSession();
  assert.equal(programs.getActiveProgramWorkout().exercises.length, oldDay.exercises.length);
  state.completeProgramSessionExercise('0-' + oldDay.exercises[0].exerciseId);
  const restarted = boot(records);
  assert.equal(restarted.state.getActiveProgramSession().workoutRevision, undefined);
  assert.ok(restarted.state.getActiveProgramSession().completedExerciseKeys.length > 0);
  assert.equal(restarted.programs.getActiveProgramWorkout().exercises.length, oldDay.exercises.length);
});

test('Rejouer la semaine conserve les XP et les entrées déjà validées', () => {
  const records = new Map();
  let app = boot(records);
  for (const day of [1, 2, 3]) {
    app.state.startProgramSession(programId, day, 1);
    finish(app);
  }
  const snapshot = plain({
    xp: app.state.getProfile().totalXp,
    badges: app.state.getProfile().badges,
    entries: app.state.getAllEntries().map((entry) => [entry.type, entry.programId, entry.weekNumber, entry.dayNumber, entry.xp])
  });
  assert.equal(app.programs.isProgramBossUnlocked(programId, 1), true);
  assert.equal(app.programs.startRepeatWeek(programId, 1), true);
  for (const day of [1, 2, 3]) {
    app.state.startProgramSession(programId, day, 1);
    const first = app.programs.getActiveProgramWorkout().exercises[0];
    app.state.completeProgramSessionExercise('0-' + first.exerciseId);
    app = boot(records);
    assert.ok(app.state.getActiveProgramSession().completedExerciseKeys.includes('0-' + first.exerciseId));
    finish(app);
  }
  assert.equal(app.programs.getRepeatWeek(programId), null);
  assert.deepEqual(plain({
    xp: app.state.getProfile().totalXp,
    badges: app.state.getProfile().badges,
    entries: app.state.getAllEntries().map((entry) => [entry.type, entry.programId, entry.weekNumber, entry.dayNumber, entry.xp])
  }), snapshot);
});
