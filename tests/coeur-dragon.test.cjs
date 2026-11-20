const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const id = 'coeur-dragon';
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

test('les 20 séances et 8 variantes gardent leurs références et des durées exactes', () => {
  const { data, programs } = boot();
  const detail = data.getProgramDetail(id);
  assert.equal(detail.weeks.length, 4);
  assert.equal(detail.bosses.length, 4);
  const durations = [
    [[12, 14], [12, 14], [15, 18], [8, 12], [6, 10], [12, 15], [12, 15]],
    [[14, 16], [14, 16], [18, 20], [8, 12], [6, 10], [15, 18], [15, 18]],
    [[16, 18], [16, 18], [20, 23], [8, 12], [6, 10], [18, 20], [18, 20]],
    [[18, 20], [18, 20], [22, 25], [8, 12], [6, 10], [20, 23], [20, 23]]
  ];
  for (const [index, week] of detail.weeks.entries()) {
    const original = detail.legacyWorkouts.weeks[index];
    const boss = detail.bosses[index];
    const legacyBoss = detail.legacyWorkouts.bosses[index];
    assert.equal(week.days.map((day) => day.day).join(','), '1,2,3,4,5');
    assert.equal(week.days.filter((day) => !day.optional).length, 3);
    assert.ok(week.days.slice(3).every((day) => day.optional && day.xp === 0));
    assert.equal(boss.badgeId, legacyBoss.badgeId);
    assert.equal(boss.xp, legacyBoss.xp);
    assert.equal(boss.chest, legacyBoss.chest);
    for (const [dayIndex, day] of original.days.entries()) {
      assert.equal(week.days[dayIndex].title, day.title);
      assert.equal(week.days[dayIndex].xp, day.xp);
    }
    assert.equal(Object.keys(boss.variants).join(','), 'indoor,outdoor');
    for (const [position, workout] of [...week.days, ...Object.values(boss.variants)].entries()) {
      assert.match(workout.instructions, /parler en phrases/);
      const seconds = workout.exercises.reduce((sum, item) => {
        const exercise = data.getExerciseById(item.exerciseId);
        assert.ok(exercise && item.amount > 0 && item.cue, item.exerciseId);
        for (const image of Object.values(exercise.images)) assert.ok(existsSync(path.join(root, image)), image);
        return sum + programs.programItemToSeconds(item);
      }, 0);
      const [, minutes, remainder] = /^(\d+) min(?: (\d+) s)?$/.exec(workout.difficultyLabel);
      assert.equal(seconds, Number(minutes) * 60 + Number(remainder || 0));
      const [minimum, maximum] = durations[index][position];
      assert.ok(seconds >= minimum * 60 && seconds <= maximum * 60, workout.difficultyLabel);
    }
  }
});

test('planning et navigation distinguent les deux compléments de la semaine du boss', () => {
  const { state, programs, navigation } = boot();
  for (const dayNumber of [1, 2, 3]) state.addTrainingEntry({
    type: 'program', programId: id, weekNumber: 1, dayNumber
  });
  assert.equal(programs.getPlanningBossWeekNumber(id), 1);
  const plan = programs.getCombinedWeeklyPlan('reprise-douce');
  assert.equal(plan[5][3], 'program-boss');
  for (const [index, dayNumber] of [[1, 4], [3, 5]]) {
    programs.getTodayPlanIndex = () => index;
    const quest = programs.getTodayPlanningQuest();
    assert.equal(quest.day.day, dayNumber);
    assert.equal(quest.weekNumber, 1);
    const [, , programId, source, week] = plan[index];
    let selection;
    programs.openProgramDetail = (_, options) => { selection = options; };
    const button = { dataset: { programId, source, weekNumber: String(week), dayNumber: String(dayNumber) } };
    navigation.handlePlanningClick({ preventDefault() {}, stopPropagation() {} }, {
      closest: (selector) => selector === '.planning-program-btn' ? button : null
    });
    assert.equal(selection.dayNumber, dayNumber);
    assert.equal(selection.weekNumber, 1);
  }
});

test('deux compléments ne donnent aucune récompense et seules les trois essentielles ouvrent le boss', () => {
  const records = new Map();
  let app = boot(records);
  const before = rewards(app.state);
  for (const day of [4, 5, 4]) {
    app.programs.validateProgramDay(id, day, 1);
    finish(app);
  }
  assert.equal(rewards(app.state), before);
  app = boot(records);
  for (const day of [4, 5]) assert.ok(app.state.getProgramComplementCompletion(id, 1, day));
  assert.equal(app.programs.getProgramCompletionProgress(id).completed, 0);
  for (const day of [1, 2, 1]) {
    app.programs.validateProgramDay(id, day, 1);
    finish(app);
  }
  assert.equal(app.state.getAllEntries().length, 2);
  assert.equal(app.programs.isProgramBossUnlocked(id, 1), false);
  app.programs.startProgramBossSession(id, 1);
  assert.equal(app.state.getActiveProgramSession(), null);
  app.programs.validateProgramDay(id, 3, 1);
  finish(app);
  assert.equal(app.programs.isProgramBossUnlocked(id, 1), true);

  const afterEssentials = rewards(app.state);
  assert.equal(app.programs.startRepeatWeek(id, 1), true);
  for (const day of [1, 2, 3]) {
    app.programs.validateProgramDay(id, day, 1);
    const first = app.programs.getActiveProgramWorkout().exercises[0];
    app.state.completeProgramSessionExercise('0-' + first.exerciseId);
    app = boot(records);
    assert.equal(app.programs.getRepeatWeek(id).nextDay, day);
    assert.ok(app.state.getActiveProgramSession().completedExerciseKeys.includes('0-' + first.exerciseId));
    finish(app);
  }
  assert.equal(app.programs.getRepeatWeek(id), null);
  assert.equal(rewards(app.state), afterEssentials);

  let afterBoss;
  for (const variant of ['indoor', 'outdoor']) {
    app.programs.startProgramBossSession(id, 1, variant);
    app = boot(records);
    assert.equal(app.state.getActiveProgramSession().bossVariant, variant);
    finish(app);
    if (afterBoss) assert.equal(rewards(app.state), afterBoss);
    afterBoss = rewards(app.state);
  }
  assert.equal(app.state.getAllEntries().filter(({ type }) => type === 'program-boss').length, 1);
});

test('une sauvegarde ouverte avant la mise à jour retrouve ses coches et les anciennes étapes', () => {
  const records = new Map();
  const { data } = boot(records);
  const legacy = data.getProgramDetail(id).legacyWorkouts;
  for (const [type, dayNumber, variant, workout] of [
    ['program', 2, null, legacy.weeks[2].days[1]],
    ['program-boss', 0, 'indoor', legacy.bosses[2].variants.indoor],
    ['program-boss', 0, 'outdoor', legacy.bosses[2].variants.outdoor]
  ]) {
    const keys = Array.from(workout.exercises, ({ exerciseId }, index) => index + '-' + exerciseId);
    records.set(sessionKey, JSON.stringify({
      id: 'ancienne-session', programId: id, type, weekNumber: 3, dayNumber,
      bossVariant: variant, completedExerciseKeys: keys
    }));
    const { state, programs } = boot(records);
    assert.equal(JSON.stringify(programs.getActiveProgramWorkout().exercises), JSON.stringify(workout.exercises));
    assert.equal(programs.isActiveProgramSessionComplete(), true);
    assert.deepEqual(Array.from(state.getActiveProgramSession().completedExerciseKeys), keys);
  }
});

test('la séance guidée affiche la consigne adaptée et termine le complément sans promesse d’XP', () => {
  const app = boot();
  app.programs.validateProgramDay(id, 4, 1);
  app.render.renderActiveProgramSession();
  assert.match(app.detail.html, /Marche à allure facile, dehors sur du plat ou sur place à l’intérieur/);
  app.programs.getActiveProgramWorkout().exercises.forEach(({ exerciseId }, index) => {
    app.state.completeProgramSessionExercise(index + '-' + exerciseId);
  });
  app.render.renderActiveProgramSession();
  assert.match(app.detail.html, /finishProgramSessionButton[^>]*>\s*Terminer\s*<\/button>/);
});
