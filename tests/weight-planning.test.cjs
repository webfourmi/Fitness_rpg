const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

function boot() {
  const storage = new Map();
  const localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: (key) => storage.delete(key)
  };
  const window = { setTimeout() {} };
  const document = { readyState: "loading", addEventListener() {}, querySelector: () => null };
  const context = vm.createContext({ window, document, localStorage, console, structuredClone });
  for (const file of ["app-config.js", "app-data.js", "app-state.js", "app-render.js", "app-programs.js", "app-exercise-adaptation.js", "app-sport.js", "app-weight-planning.js"]) {
    vm.runInContext(readFileSync(join(__dirname, "..", file), "utf8"), context, { filename: file });
  }
  const state = window.FitnessRpgState;
  state.setProfile(state.createDefaultProfile({ name: "Test", gender: "femme", goalId: "perte-poids" }));
  state.setGoal("perte-poids");
  state.getProfile().weightPlanningEnabled = true;
  state.updateSportProfile({ level: "beginner", preferredDuration: 5, equipment: ["chair", "wall"], trainingProfile: { activity: "inactive", ageGroup: "65+" } });
  return { state, plan: window.FitnessRpgWeightPlanning, programs: window.FitnessRpgPrograms };
}

test("le planning propose trois séances essentielles, deux compléments et un jour de repos", () => {
  const { plan } = boot();
  const summary = {};
  const grid = {};
  assert.equal(plan.render(summary, grid), true);
  assert.equal((grid.innerHTML.match(/Essentielle ·/g) || []).length, 3);
  assert.equal((grid.innerHTML.match(/Facultatif ·/g) || []).length, 2);
  assert.match(grid.innerHTML, /Dimanche.*Repos/);
  assert.match(grid.innerHTML, /Boss après les trois séances essentielles/);
  assert.equal((grid.innerHTML.match(/· renforcement/g) || []).length >= 2, true);
});

test("une séance personnalisée respecte le temps déclaré et survit au rechargement", () => {
  const { state, plan, programs } = boot();
  const source = programs.getProgramDay("eveil-heros", 3, 1);
  const before = JSON.stringify(source);
  const planned = plan.adaptWorkout("eveil-heros", source, { dayNumber: 3 });
  assert.ok(planned.exercises.length > 0);
  const seconds = planned.exercises.reduce((total, item) => total + 10
    + item.amount * (item.unit === "min" ? 60 : item.unit === "répétitions" ? 4 : 1), 0);
  assert.ok(seconds <= 300);
  assert.equal(JSON.stringify(source), before);
  const session = state.startProgramSession("eveil-heros", 3, 1);
  assert.equal(session.weightPlanningWorkout, true);
  assert.equal(JSON.stringify(state.loadActiveProgramSession().adaptedExercises), JSON.stringify(planned.exercises));
  state.updateSportProfile({ trainingProfile: { medicalRestriction: true } });
  assert.equal(plan.adaptWorkout("eveil-heros", source).restricted, true);
  assert.deepEqual(JSON.parse(JSON.stringify(state.getActiveProgramSession().adaptedExercises)), JSON.parse(JSON.stringify(planned.exercises)));
});

test("la campagne suivante nécessite les séances et les boss précédents", () => {
  const { state, plan, programs } = boot();
  function recordCampaign(id, bosses) {
    for (const { week, days } of programs.getProgramWeeks(id)) {
      for (const day of days.filter((day) => !day.optional)) {
        state.addTrainingEntry({ id: `${id}:${week}:${day.day}`, type: "program", programId: id, weekNumber: week, dayNumber: day.day });
      }
      if (bosses) state.addTrainingEntry({ id: `${id}:boss:${week}`, type: "program-boss", programId: id, weekNumber: week });
    }
  }
  recordCampaign("eveil-heros", false);
  assert.equal(plan.currentStage().id, "eveil-heros");
  recordCampaign("eveil-heros", true);
  assert.equal(plan.currentStage().id, "marche-aventurier");
  recordCampaign("marche-aventurier", true);
  assert.equal(plan.currentStage().id, "coeur-dragon");
});

test("l’endurance est rapprochée par date et activité, et une ressaisie remplace le total", () => {
  const { state, plan } = boot();
  const today = state.todayKey();
  state.addTrainingEntry({ id: "walk", exerciseId: "walk", amount: 15, unit: "min" });
  state.addTrainingEntry({ id: "guided", type: "program", enduranceByActivity: { walk: 5, bike: 0, other: 2 } });
  assert.equal(plan.saveActivity(today, "walk", 20), true);
  assert.equal(plan.saveActivity(today, "walk", 20), true);
  assert.equal(plan.saveActivity(today, "bike", 12), true);
  assert.equal(plan.recordedMinutes(), 34);
  assert.equal(plan.saveActivity(today, "walk", 30), true);
  state.loadProfile();
  assert.equal(plan.recordedMinutes(), 44);
  assert.equal(plan.saveActivity(today, "walk", -5), false);
});
