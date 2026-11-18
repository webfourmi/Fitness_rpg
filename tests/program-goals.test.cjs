const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const root = path.resolve(__dirname, '..');

function boot() {
  const records = new Map();
  const localStorage = {
    getItem: (key) => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, String(value)),
    removeItem: (key) => records.delete(key)
  };
  const nodes = new Map();
  const document = {
    readyState: 'loading', addEventListener() {}, querySelectorAll: () => [],
    body: { classList: { toggle() {}, remove() {} } },
    querySelector: (selector) => nodes.get(selector) || null,
    createElement: () => ({ dataset: {}, innerHTML: '' })
  };
  const window = { addEventListener() {}, setTimeout() {} };
  const context = vm.createContext({ window, document, localStorage, console, Intl });
  for (const file of [
    'app-config.js', 'app-data.js', 'app-program-forge-exercises.js', 'app-program-forge.js',
    'app-program-champion-arenes.js', 'app-state.js', 'app-progress.js', 'app-render.js',
    'app-programs.js', 'app-sport.js', 'app.js'
  ]) {
    vm.runInContext(readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  window.FitnessRpgApp.applyDataUpdates();
  const state = window.FitnessRpgState;
  state.setProfile(state.createDefaultProfile({ name: 'Test du planning' }));
  state.getCurrentWeekId = () => '2026-11-16';
  return {
    config: window.FitnessRpgConfig, programs: window.FitnessRpgPrograms,
    render: window.FitnessRpgRender, state, records, nodes
  };
}

test('chaque programme du catalogue a un ou deux objectifs et chaque recommandation est classée', () => {
  const { config } = boot();
  assert.equal(config.programs.length, 15);
  for (const program of config.programs) {
    const count = config.getGoalsForProgram(program.id).length;
    assert.ok(count >= 1 && count <= 2, program.title);
  }
  for (const goal of config.goals) {
    assert.equal(new Set(goal.programProgression).size, goal.programProgression.length, goal.id);
    assert.ok(goal.programProgression.includes(goal.recommendedProgramId), goal.id);
    for (const id of goal.programProgression) assert.ok(config.getProgramById(id), id);
  }
});

test('les six objectifs et chaque programme suivi gardent trois séances et deux compléments distincts', () => {
  const { config, programs, state } = boot();
  const mainIds = [...config.programs.map((program) => program.id), null, 'ancien-id-inconnu'];
  for (const goal of config.goals) {
    for (const mainId of mainIds) {
      state.setActiveProgramId(mainId);
      const effectiveId = config.getProgramById(mainId)?.id || goal.recommendedProgramId;
      const plan = programs.getCombinedWeeklyPlan(goal.id);
      for (const index of [0, 2, 4]) {
        assert.equal(plan[index][2], effectiveId);
        assert.equal(plan[index][3], 'active-program');
      }
      for (const index of [1, 3]) {
        assert.equal(plan[index][3], 'goal');
        assert.notEqual(plan[index][2], effectiveId);
        assert.ok(goal.programProgression.includes(plan[index][2]));
      }
      assert.notEqual(plan[1][2], plan[3][2]);
      assert.equal(plan[5][3], 'boss-locked');
      assert.equal(plan[6][3], 'rest');
      assert.deepEqual(programs.getWeeklyPlan(goal.id), plan);
    }
  }
});

test('la rotation reste stable dans la semaine et parcourt tous les compléments admissibles', () => {
  const { config, programs, state } = boot();
  const firstMonday = Date.UTC(2026, 9, 19);
  for (const level of ['beginner', 'intermediate', 'advanced']) {
    state.updateSportProfile({ level });
    for (const goal of config.goals) {
      const expected = goal.programProgression.filter((id) => id !== goal.recommendedProgramId
        && (level === 'advanced' || config.getProgramTier(config.getProgramById(id)) !== 'advanced'));
      const seen = new Set();
      let previous = null;
      for (let week = 0; week < expected.length; week++) {
        const monday = new Date(firstMonday + week * 7 * 86400000);
        state.getCurrentWeekId = () => monday.toISOString().slice(0, 10);
        const pair = [0, 1].map((slot) => programs.getObjectiveProgramForSlot(goal.id, slot));
        assert.deepEqual(pair, [0, 1].map((slot) => programs.getObjectiveProgramForSlot(goal.id, slot)));
        if (previous) assert.notDeepEqual(pair, previous);
        for (const id of pair) seen.add(id);
        previous = pair;
      }
      assert.deepEqual(seen, new Set(expected), goal.id + ' · ' + level);
    }
  }
});

test('la quête du jour et le rattrapage reprennent les programmes de la grille sans écraser la séance en cours', () => {
  const { programs, state, records } = boot();
  state.setActiveProgramId('epreuves-forge');
  state.setGoal('mobilite');
  state.startProgramSession('epreuves-forge', 1, 1);
  state.completeProgramSessionExercise('0-walk');
  state.addTrainingEntry({ type: 'program', programId: 'epreuves-forge', weekNumber: 1, dayNumber: 1, xp: 52 });
  const before = [...records.entries()];
  programs.getTodayPlanIndex = () => 1;
  const plan = programs.getCombinedWeeklyPlan('mobilite');
  assert.equal(programs.getTodayPlanningQuest().programId, plan[1][2]);
  assert.equal(programs.getNextGoalSession().programId, plan[1][2]);
  assert.equal(programs.getMissingMainSessionsThisWeek().find((item) => item.index === 3).programId, plan[3][2]);
  assert.deepEqual([...records.entries()], before);
});

test('les écrans Objectif et Programmes affichent les mêmes associations que le planning', () => {
  const { config, render, nodes } = boot();
  const cards = [];
  nodes.set('#goalChoiceList', { appendChild: (card) => cards.push(card) });
  render.renderGoalPage();
  assert.equal(cards.length, config.goals.length);
  for (const card of cards) {
    const goal = config.getGoalById(card.dataset.goalId);
    for (const id of goal.programProgression) {
      assert.ok(card.innerHTML.includes(config.getProgramById(id).title));
    }
  }

  const programCards = [];
  const classList = { add() {}, remove() {} };
  const detail = { classList, dataset: {}, querySelector: () => null };
  nodes.set('#programDetail', detail);
  nodes.set('#programList', { classList, appendChild: (card) => programCards.push(card) });
  for (const tier of Object.keys(config.programTierLabels)) {
    render.selectedProgramTier = tier;
    render.renderProgramList();
  }
  assert.equal(programCards.length, config.programs.length);
  for (const card of programCards) {
    render.renderProgramDetail(card.dataset.programId);
    for (const goal of config.getGoalsForProgram(card.dataset.programId)) {
      assert.ok(card.innerHTML.includes(goal.title));
      assert.ok(detail.innerHTML.includes(goal.title));
    }
  }
});
