const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const code = fs.readFileSync("app-data.js", "utf8");
const context = { window: {}, console };
vm.runInNewContext(code, context);
const data = context.window.FitnessRpgData;
const program = data.programs?.["grand-maitre-arcanes"] || data.programDetails?.["grand-maitre-arcanes"] || Object.values(data).find(v => v && typeof v === "object" && v["grand-maitre-arcanes"])?.["grand-maitre-arcanes"];
test("programme disponible", () => assert.ok(program));
test("4 semaines, 3 essentielles et 2 facultatives sans XP", () => {
  assert.equal(program.weeks.length, 4);
  for (const week of program.weeks) {
    assert.equal(week.days.filter(day => !day.optional).length, 3);
    assert.equal(week.days.filter(day => day.optional).length, 2);
    assert.ok(week.days.filter(day => day.optional).every(day => day.xp === 0));
  }
});
test("4 boss et badge préservés", () => {
  assert.equal(program.bosses.length, 4);
  assert.equal(program.reward.badgeId, "grand-maitre-arcanes-vaincu");
});
test("références des exercices", () => {
  const exercises = JSON.stringify(data.exercises);
  for (const week of program.weeks)
    for (const day of week.days)
      for (const exercise of day.exercises)
        assert.ok(exercises.includes('"' + exercise.exerciseId + '"'), exercise.exerciseId);
});
