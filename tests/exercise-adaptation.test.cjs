const assert = require("node:assert/strict");
const { existsSync, readFileSync } = require("node:fs");
const { join } = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = join(__dirname, "..");
const state = { getSportProfile: () => sport };
let shownModal;
const window = {
  FitnessRpgState: state,
  FitnessRpgRender: { showModal: (options) => { shownModal = options; } }
};
const context = vm.createContext({ window, document: { readyState: "loading", addEventListener() {} }, console });
for (const file of ["app-config.js", "app-data.js", "app-program-forge-exercises.js", "app-program-forge.js", "app-program-champion-arenes.js", "app-exercise-adaptation.js", "app-exercises.js"]) {
  vm.runInContext(readFileSync(join(root, file), "utf8"), context, { filename: file });
}
const data = window.FitnessRpgData;
const adaptation = window.FitnessRpgExerciseAdaptation;
const sport = { level: "beginner", equipment: ["chair", "wall"], trainingProfile: { activity: "regular", noImpact: true } };

test("chaque mouvement des trois programmes audités et chaque variante a une fiche et des images existantes", () => {
  const used = new Set();
  for (const programme of adaptation.programmeIds) {
    assert.ok(data.programDetails[programme]);
    JSON.stringify(data.programDetails[programme], (key, value) => {
      if (key === "exerciseId") used.add(value);
      return value;
    });
  }
  assert.ok(used.size >= 20);
  used.add("pushups").add("run_outdoor").add("run_treadmill").add("no_jump_jacks").add("bike").add("single_leg_balance");
  for (const id of used) {
    const metadata = adaptation.getMetadata(id);
    assert.ok(metadata, id);
    assert.ok(["light", "moderate", "vigorous"].includes(metadata.intensity), id);
    const exercise = data.getExerciseById(id);
    assert.ok(exercise, id);
    for (const image of Object.values(exercise.images)) assert.ok(existsSync(join(root, image)), image);
    for (const variant of metadata.variants) {
      assert.equal(adaptation.getMetadata(variant)?.family, metadata.family);
      used.add(variant);
    }
  }
});

test("chaise et mur fournissent des variantes et conservent la phase, la dose et les récompenses", () => {
  const leg = { exerciseId: "goblet_squat", amount: 8, unit: "répétitions", phase: "Renforcement" };
  const push = { exerciseId: "pushups", amount: 6, unit: "répétitions" };
  const workout = { exercises: [leg, push], xp: 50, gold: 15 };
  const before = JSON.stringify(workout);
  const result = adaptation.assessWorkout(workout, sport);
  assert.equal(result.workout.xp, 50);
  assert.equal(result.workout.gold, 15);
  assert.equal(result.movements[0].status, "replace");
  assert.equal(JSON.stringify(result.movements[0].item), JSON.stringify({ ...leg, exerciseId: "chair_squat" }));
  assert.equal(result.movements[1].item.exerciseId, "wall_pushups");
  assert.equal(JSON.stringify(workout), before);
});

test("le moteur respecte l’impact, la tolérance, l’espace et les unités", () => {
  const run = { exerciseId: "run_outdoor", amount: 50, unit: "sec", distanceKm: 1, distanceOptional: true };
  const option = adaptation.resolveMovement(run, { ...sport, smallSpace: true });
  assert.equal(option.item.exerciseId, "march_on_spot");
  assert.equal(option.item.unit, "sec");
  assert.equal(option.item.distanceKm, undefined);
  const knees = { exerciseId: "slow_knee_raises", amount: 8, unit: "répétitions" };
  const constrained = { ...sport, trainingProfile: { limitations: ["balance"] } };
  assert.equal(adaptation.resolveMovement(knees, constrained).status, "skip");
  const easeIn = { ...sport, trainingProfile: { activity: "inactive" } };
  assert.equal(adaptation.resolveMovement({ exerciseId: "walk", unit: "min" }, easeIn).item.exerciseId, "slow_walk");
});

test("une restriction ou une incompatibilité écarte la suggestion automatique", () => {
  const item = { exerciseId: "pushups", amount: 5, unit: "répétitions" };
  assert.equal(adaptation.resolveMovement(item, { ...sport, equipment: [] }).status, "skip");
  assert.equal(adaptation.resolveMovement(item, { ...sport, trainingProfile: { limitations: ["shoulders"] } }).status, "skip");
  assert.equal(adaptation.resolveMovement(item, { ...sport, trainingProfile: { medicalRestriction: true } }).status, "professional-review");
  assert.equal(adaptation.resolveMovement({ exerciseId: "absent" }, sport).status, "unreviewed");
});

test("les détails du grimoire affichent une option issue du moteur", () => {
  window.FitnessRpgExercises.openExerciseDetails("pushups");
  assert.ok(shownModal.message.some((line) => line.includes("Option selon ton profil · Pompes murales")));
});

test("le grimoire entier est classé et les substitutions conservent les familles", () => {
  for (const exercise of data.exercises) {
    const metadata = adaptation.getMetadata(exercise.id);
    assert.ok(metadata?.muscles.length, exercise.id);
    assert.ok(Array.isArray(metadata.supports), exercise.id);
    for (const path of Object.values(exercise.images || {})) assert.ok(existsSync(join(root, path)), path);
    for (const id of metadata.variants) {
      assert.equal(adaptation.getMetadata(id)?.family, metadata.family, exercise.id);
      assert.ok(data.getExerciseById(id), id);
    }
  }
  assert.equal(adaptation.resolveMovement({ exerciseId: "ballet_sequence" }, sport).status, "unreviewed");
});

test("une fente marchée devient une fente assistée si l’espace ou le niveau l’exige", () => {
  const item = { exerciseId: "walking_lunges", unit: "répétitions", amount: 8 };
  const profile = { ...sport, smallSpace: true, equipment: ["stable-support"] };
  const result = adaptation.resolveMovement(item, profile);
  assert.equal(result.status, "replace");
  assert.equal(result.item.exerciseId, "assisted_reverse_lunges");
  assert.equal(result.item.amount, 8);
  assert.equal(adaptation.resolveMovement(item, { ...profile, equipment: [] }).status, "skip");
});
