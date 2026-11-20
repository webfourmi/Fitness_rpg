const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const id = 'bras-heros';
const sessionKey = 'fitnessRpgV54ActiveProgramSession';

function boot(records = new Map()) {
  const localStorage = {
    getItem: (key) => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, String(value)),
    removeItem: (key) => records.delete(key)
  };
  const window = { addEventListener() {}, setTimeout() {} };
  const detail = { querySelector: () => null, insertAdjacentHTML(_, html) { this.html = html; } };
  const document = {
    addEventListener() {},
    querySelector: (selector) => selector === '#programDetail' ? detail : null,
    body: { classList: { toggle() {}, remove() {} } }
  };
  const context = vm.createContext({ window, document, localStorage, console, Intl });
  for (const name of ['config', 'data', 'state', 'progress', 'render', 'navigation', 'exercises', 'programs']) {
    const file = 'app-' + name + '.js';
    vm.runInContext(readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  const { FitnessRpgState: state, FitnessRpgPrograms: programs, FitnessRpgData: data,
    FitnessRpgRender: render, FitnessRpgNavigation: navigation } = window;
  if (!state.loadProfile()) state.setProfile(state.createDefaultProfile({ name: 'Test', activeProgramId: id }));
  state.loadActiveProgramSession();
  render.renderAll = () => {};
  render.renderProgramDetail = () => {};
  render.queueWorkoutSummary = () => {};
  programs.showMessage = () => {};
  return { state, programs, data, render, navigation, detail };
}

function finish(app) {
  app.programs.getActiveProgramWorkout().exercises.forEach(({ exerciseId }, index) => {
    app.state.completeProgramSessionExercise(index + '-' + exerciseId);
  });
  app.programs.finishProgramSession();
  assert.equal(app.state.getActiveProgramSession(), null);
}

function rewards(state) {
  const { totalXp, badges, streak } = state.getProfile();
  return JSON.stringify({ totalXp, badges, streak, entries: state.getAllEntries() });
}


test('la progression porte sur les exercices, avec trois séances à XP et deux compléments', () => {
  const { data, programs } = boot();
  const detail = data.getProgramDetail(id);
  assert.equal(detail.weeks.length, 4);
  for (const { week, days } of detail.weeks) {
    assert.equal(days.map(day => day.day).join(','), '1,2,3,4,5');
    assert.equal(days.map(day => day.xp).join(','), '35,40,20,0,0');
    assert.equal(days.filter(day => day.optional).map(day => day.day).join(','), '4,5');
    for (const day of days) {
      assert.equal(day.exercises[0].phase === 'Échauffement', !day.optional || day.day === 4);
      for (const item of day.exercises) {
        const exercise = data.getExerciseById(item.exerciseId);
        assert.ok(exercise && item.amount > 0, item.exerciseId);
        for (const image of Object.values(exercise.images)) {
          assert.ok(existsSync(path.join(root, image)), image);
        }
      }
    }
    assert.equal(days.some(day => day.exercises.some(item => item.exerciseId.endsWith('_1kg'))), week >= 3);
    assert.equal(programs.getProgramBoss(id, week), null);
  }
  assert.match(detail.weeks[3].days[0].instructions, /Ralentis la descente/);
});

test('planning et validation des compléments sans récompense ni progression essentielle', () => {
  const records = new Map();
  let app = boot(records);
  const plan = app.programs.getCombinedWeeklyPlan('reprise-douce');
  assert.equal(plan.filter(item => item[3] === 'active-program').length, 3);
  assert.equal(plan[1].slice(2).join(','), 'bras-heros,program-optional,1,4');
  assert.equal(plan[3].slice(2).join(','), 'bras-heros,program-optional,1,5');

  const before = rewards(app.state);
  for (const day of [4, 5, 4]) {
    app.programs.validateProgramDay(id, day, 1);
    finish(app);
  }
  assert.equal(rewards(app.state), before);
  app = boot(records);
  for (const day of [4, 5]) assert.ok(app.state.getProgramComplementCompletion(id, 1, day));
  assert.equal(app.programs.getProgramCompletionProgress(id).completed, 0);

  for (const day of [1, 2, 3, 1]) {
    app.programs.validateProgramDay(id, day, 1);
    finish(app);
  }
  const entries = app.state.getAllEntries().filter(entry => entry.type === 'program');
  assert.equal(entries.map(entry => entry.xp).sort((a, b) => a - b).join(','), '20,35,40');
  assert.equal(app.programs.getProgramCompletionProgress(id).completed, 3);
  assert.equal(app.programs.getNextProgramSession(id).weekNumber, 2);
  assert.equal(app.programs.getCombinedWeeklyPlan('reprise-douce')[1][4], 2);
  assert.equal(app.programs.getCombinedWeeklyPlan('reprise-douce')[5][3], 'boss-locked');
  const weekKeys = app.state.getWeekKeys();
  for (const [index, date] of weekKeys.slice(0, 3).entries()) {
    app.state.addTrainingEntry({ date, type: 'program', programId: id, weekNumber: 2, dayNumber: index + 1, xp: 0 });
  }
  assert.equal(app.programs.getCombinedWeeklyPlan('reprise-douce')[5][3], 'boss');
});

test('une séance ouverte avant la révision conserve ses étapes et ses coches', () => {
  const records = new Map();
  let app = boot(records);
  const original = app.data.getProgramDetail(id).days[1];
  const key = '0-' + original.exercises[0].exerciseId;
  records.set(sessionKey, JSON.stringify({
    id: 'legacy-session', type: 'program', programId: id, dayNumber: 2, weekNumber: 4,
    completedExerciseKeys: [key]
  }));
  app = boot(records);
  assert.equal(JSON.stringify(app.programs.getActiveProgramWorkout().exercises), JSON.stringify(original.exercises));
  assert.equal(app.state.getActiveProgramSession().completedExerciseKeys.join(','), key);
  finish(app);
  assert.equal(app.state.getAllEntries().find(entry => entry.type === 'program').xp, 40);
  app.programs.validateProgramDay(id, 2, 3);
  assert.equal(boot(records).state.getActiveProgramSession().workoutRevision, 'bras-heros-v1');
  assert.equal(boot(records).programs.getActiveProgramWorkout().title, 'Tirage et biceps');
});

test('la séance guidée affiche les consignes et propose le minuteur pour les durées', () => {
  const app = boot();
  app.programs.validateProgramDay(id, 2, 4);
  app.render.renderActiveProgramSession();
  assert.match(app.detail.html, /Ralentis la descente/);
  assert.match(app.detail.html, /program-exercise-timer-btn|>Timer</);
  for (const [index, item] of app.programs.getActiveProgramWorkout().exercises.slice(0, 3).entries()) {
    app.state.completeProgramSessionExercise(index + '-' + item.exerciseId);
  }
  app.render.renderActiveProgramSession();
  assert.match(app.detail.html, /Tirage|Rowing/);
  assert.match(app.detail.html, /moitié des répétitions de chaque côté/);
});
