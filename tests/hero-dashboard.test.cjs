const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

function boot() {
  let entries = [{ id: "walk", type: "exercise", exerciseId: "walk", date: "2026-11-23", distanceKm: 0, amount: 10 }];
  const profile = {};
  const window = {
    FitnessRpgState: {
      getAllEntries: () => entries,
      getEntryDateKey: (entry) => entry.date,
      getProfile: () => profile,
      getPerformanceHistory: () => [],
      todayKey: () => "2026-11-23",
      getWeekKeys: () => ["2026-11-23"],
      saveProfile() {}
    },
    FitnessRpgExerciseAdaptation: { getMetadata: (id) => id === "walk" ? { family: "cardio" } : null },
    FitnessRpgRender: { escapeHtml: String },
    FitnessRpgWeightPlanning: { recordedDays: (keys) => new Map(keys.map((key) => [key, key === "2026-11-23" ? 10 : 0])) }
  };
  for (const file of ["app-goal-rules.js", "app-hero-dashboard.js"]) {
    vm.runInNewContext(readFileSync(join(__dirname, "..", file), "utf8"), { window, structuredClone, Intl });
  }
  return { dashboard: window.FitnessRpgHeroDashboard, rules: window.FitnessRpgGoalRules, profile };
}

test("les neuf objectifs disposent d’un tableau et les mesures restent facultatives", () => {
  const { dashboard, rules } = boot();
  for (const id of rules.goalIds) {
    assert.match(dashboard.html(rules.getRule(id, "beginner")), /Semaine précédente/);
  }
  assert.match(dashboard.html(rules.getRule("perte-poids", "beginner")), /Mesures facultatives au campement/);
  assert.doesNotMatch(dashboard.html(rules.getRule("force", "beginner")), /Mesures facultatives/);
});

test("les semaines et indicateurs non renseignés sont distincts des compteurs à zéro", () => {
  const { dashboard, rules } = boot();
  const goal = rules.getRule("endurance", "beginner");
  const week = ["2026-11-23"];
  assert.equal(dashboard.snapshot(goal, week).duration, 10);
  assert.equal(dashboard.snapshot(goal, week).distance, null);
  assert.equal(dashboard.snapshot(goal, dashboard.previousWeek(week)).duration, 0);
});

test("les observations facultatives sont isolées par objectif", () => {
  const { dashboard, rules } = boot();
  const mobility = rules.getRule("souplesse", "beginner");
  const balance = rules.getRule("equilibre-autonomie", "beginner");
  assert.equal(dashboard.save(mobility, { ease: "4", comfortableRange: "7" }), true);
  assert.equal(dashboard.snapshot(mobility, ["2026-11-23"]).ease, 4);
  assert.equal(dashboard.snapshot(mobility, ["2026-11-23"]).comfortableRange, null);
  assert.equal(dashboard.snapshot(balance, ["2026-11-23"]).ease, null);
});
