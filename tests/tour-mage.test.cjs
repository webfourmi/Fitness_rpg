const assert = require('node:assert/strict');
const { readFileSync, existsSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const id = 'tour-mage';
const sessionKey = 'fitnessRpgV54ActiveProgramSession';

function boot(records = new Map()) {
  const localStorage = {
    getItem: (key) => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, String(value)),
    removeItem: (key) => records.delete(key)
  };
  const window = { addEventListener() {} };
  const document = { readyState: 'loading', addEventListener() {} };
  const context = vm.createContext({ window, document, localStorage, console, Intl });
  for (const file of ['app-config.js', 'app-data.js', 'app-state.js', 'app-progress.js', 'app-programs.js']) {
    vm.runInContext(readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  const state = window.FitnessRpgState;
  state.loadProfile();
  if (!state.hasProfile()) state.setProfile(state.createDefaultProfile({ name: 'Mage test', activeProgramId: id }));
  state.loadActiveProgramSession();
  return { state, programs: window.FitnessRpgPrograms, data: window.FitnessRpgData };
}

test('quatre semaines, cinq séances par semaine et catalogue illustré', () => {
  const { data } = boot();
  const detail = data.getProgramDetail(id);
  assert.equal(detail.weeks.length, 4);
  assert.equal(detail.bosses.length, 4);
  for (const [index, week] of detail.weeks.entries()) {
    const boss = detail.bosses[index];
    assert.equal(week.days.map((day) => day.day).join(','), '1,2,3,4');
    assert.equal(week.days.filter((day) => !day.optional).length, 3);
    assert.ok(week.days[3].optional && boss.optional);
    assert.equal(boss.badgeId, detail.legacyWorkouts.bosses[index].badgeId);
    assert.equal(boss.xp, detail.legacyWorkouts.bosses[index].xp);
    for (const workout of [...week.days, boss]) {
      for (const item of workout.exercises) {
        const exercise = data.getExerciseById(item.exerciseId);
        assert.ok(exercise && item.amount > 0 && item.cue, item.exerciseId);
        for (const image of Object.values(exercise.images)) {
          assert.ok(existsSync(path.join(root, image)), image);
        }
      }
    }
  }
});

test('les compléments ne bloquent ni les semaines ni la révision et le boss exige trois séances distinctes', () => {
  const { programs, state } = boot();
  const record = (weekNumber, dayNumber) => state.addTrainingEntry({
    type: 'program', programId: id, weekNumber, dayNumber, title: 'Essai', xp: 0
  });
  record(1, 4);
  record(1, 1);
  record(1, 1);
  record(1, 2);
  assert.equal(programs.getProgramProgressDetails(id).completed, 2);
  assert.equal(programs.isProgramBossUnlocked(id, 1), false);
  record(1, 3);
  assert.equal(programs.isProgramBossUnlocked(id, 1), true);
  assert.equal(programs.getProgramProgressDetails(id).nextItem.weekNumber, 2);
  assert.equal(programs.getNextProgramSession(id).dayNumber, 1);
  assert.equal(programs.getSuggestedDayNumberForPlanItem({ programId: id, source: 'program-optional' }), 4);
  assert.equal(programs.startRepeatWeek(id, 1), true);
  programs.showMessage = () => {};
  for (const dayNumber of [1, 2, 3]) programs.finishRepeatDay({ programId: id, weekNumber: 1, dayNumber });
  assert.equal(programs.getRepeatWeek(id), null);
  for (const week of [2, 3, 4]) for (const day of [1, 2, 3]) record(week, day);
  const progress = programs.getProgramProgressDetails(id);
  assert.equal(progress.total, 12);
  assert.equal(progress.bossesDefeated, 0);
  assert.equal(progress.campaignComplete, true);
});

test('la reprise garde les anciennes coches de séances et boss, puis sauvegarde le nouveau format', () => {
  const records = new Map();
  const { data } = boot(records);
  const legacy = data.getProgramDetail(id).legacyWorkouts;
  for (const [type, workout] of [['program', legacy.weeks[3].days[1]], ['program-boss', legacy.bosses[3]]]) {
    const dayNumber = type === 'program' ? 2 : 0;
    const keys = Array.from(workout.exercises, (item, index) => index + '-' + item.exerciseId);
    records.set(sessionKey, JSON.stringify({
      id: 'ancienne-session', programId: id, type, weekNumber: 4, dayNumber,
      bossVariant: 'single', completedExerciseKeys: keys
    }));
    const { state, programs } = boot(records);
    assert.deepEqual(Array.from(programs.getActiveProgramWorkout().exercises, (item) => item.exerciseId),
      Array.from(workout.exercises, (item) => item.exerciseId));
    assert.equal(programs.isActiveProgramSessionComplete(), true);
    assert.deepEqual(Array.from(state.getActiveProgramSession().completedExerciseKeys), keys);
    state.clearActiveProgramSession();
  }
  const { state } = boot(records);
  const session = state.startProgramSession(id, 4, 2);
  assert.equal(session.workoutRevision, 1);
  session.completedExerciseKeys.push('0-march_on_spot');
  state.saveActiveProgramSession();
  const restored = boot(records);
  assert.equal(restored.programs.getActiveProgramWorkout().title, 'Mobilité douce');
  assert.equal(restored.state.getActiveProgramSession().completedExerciseKeys[0], '0-march_on_spot');
  restored.state.clearActiveProgramSession();
  restored.state.startProgramBossSession(id, 4, 'single');
  assert.equal(boot(records).programs.getActiveProgramWorkout().exercises.length, 7);
});
