const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const window = {};
vm.runInNewContext(readFileSync(join(__dirname, "..", "app-goal-rules.js"), "utf8"), { window, structuredClone });
const rules = window.FitnessRpgGoalRules;
const levels = ["beginner", "intermediate", "advanced"];

test("les neuf objectifs ont des règles versionnées aux trois niveaux", () => {
  assert.equal(rules.goalIds.length, 9);
  for (const id of rules.goalIds) {
    for (const level of levels) {
      const rule = rules.getRule(id, level);
      assert.equal(rule.version, rules.version);
      assert.equal(rule.id, id);
      assert.equal(rule.level, level);
      assert.ok(rule.families.length && rule.metrics.length && rule.recovery);
      assert.ok(rule.frequency[0] <= rule.frequency[1]);
      assert.ok(rule.volume.range[0] <= rule.volume.range[1]);
      assert.ok(rule.references.every((ref) => rules.sources[ref]?.startsWith("https://")));
    }
  }
  const detached = rules.getRule("force", "advanced");
  detached.families.length = 0;
  assert.ok(rules.getRule("force", "advanced").families.length);
});

test("les anciens objectifs ambigus exigent un choix et les inconnus sont signalés", () => {
  assert.equal(rules.assess("renforcement", { level: "advanced" }).status, "choose-goal");
  assert.equal(rules.goalOptions("renforcement").join(","), "force,prise-muscle");
  assert.equal(rules.assess("cardio", { level: "beginner" }).rule.id, "endurance");
  assert.equal(rules.assess("unknown", {}).status, "unknown-goal");
  assert.equal(rules.assess("force", {}).status, "level-required");
});

test("la sécurité, la récupération et les disponibilités priment sans modifier le niveau lié à l’âge", () => {
  const senior = { level: "advanced", preferredDuration: 7, sessionsPerWeek: 2, trainingProfile: {
    ageGroup: "65+", recovery: "difficult", availableDays: ["wed"]
  } };
  const choice = rules.assess("endurance", senior);
  assert.equal(choice.status, "adapt");
  assert.equal(choice.rule.level, "advanced");
  assert.equal(choice.rule.frequency.join(","), "1,1");
  assert.equal(choice.rule.volume.range.join(","), "7,7");
  assert.equal(choice.rule.advance, null);
  assert.equal(choice.rule.effortMax, 4);
  senior.trainingProfile.medicalRestriction = true;
  assert.equal(rules.assess("endurance", senior).rule, null);
  assert.equal(rules.assess("renforcement", senior).status, "professional-review");
});
