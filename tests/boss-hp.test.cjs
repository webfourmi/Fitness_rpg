const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const sessionKey = "fitnessRpgV54ActiveProgramSession";
const programId = "tour-mage";

function boot(records = new Map()) {
  const localStorage = {
    getItem: (key) => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, value),
    removeItem: (key) => records.delete(key)
  };
  const detail = {
    querySelector: () => null,
    insertAdjacentHTML(_position, html) { this.html = html; }
  };
  const document = {
    addEventListener() {},
    querySelector: (selector) => selector === "#programDetail" ? detail : null,
    body: { classList: { toggle() {}, remove() {} } }
  };
  const window = { addEventListener() {}, setTimeout() {} };
  const context = vm.createContext({ window, document, localStorage, console, Intl });
  for (const module of ["config", "data", "state", "progress", "render", "exercises", "programs"]) {
    const name = `app-${module}.js`;
    vm.runInContext(readFileSync(join(__dirname, "..", name), "utf8"), context, { filename: name });
  }

  const { FitnessRpgState: state, FitnessRpgRender: render, FitnessRpgPrograms: programs } = window;
  if (!state.loadProfile()) state.setProfile(state.createDefaultProfile({ name: "Test" }));
  state.loadActiveProgramSession();
  render.renderProgramDetail = () => render.renderActiveProgramSession();
  programs.isProgramBossUnlocked = () => true;
  programs.setCoachMessage = () => {};
  return { detail, state, programs, render };
}

function hp(detail) {
  return Number(detail.html.match(/aria-label="Points de vie du boss"[\s\S]*?aria-valuenow="(\d+)"/)?.[1]);
}

test("le boss entre à 100 PV, chaque validation unique le blesse et la dernière l’amène à 0", () => {
  const { programs, detail, state } = boot();
  programs.startProgramBossSession(programId, 4, "indoor");
  assert.equal(hp(detail), 100);
  assert.match(detail.html, /guided-boss-battle is-entering/);
  assert.match(detail.html, /Le combat commence/);
  assert.doesNotMatch(detail.html, /finishProgramSessionButton/);

  const workout = programs.getActiveProgramWorkout();
  const firstExercise = workout.exercises[0];
  programs.validateProgramExercise(firstExercise.exerciseId, `0-${firstExercise.exerciseId}`);
  const afterFirst = hp(detail);
  assert.ok(afterFirst < 100 && afterFirst > 0);
  assert.match(detail.html, /guided-boss-battle is-hit/);
  assert.match(detail.html, new RegExp(`−${100 - afterFirst} PV`));

  programs.validateProgramExercise(firstExercise.exerciseId, `0-${firstExercise.exerciseId}`);
  assert.equal(hp(detail), afterFirst);
  assert.doesNotMatch(detail.html, /guided-boss-battle is-hit/);
  assert.equal(programs.isActiveProgramSessionComplete(), false);

  workout.exercises.slice(1).forEach(({ exerciseId }, index) => {
    programs.validateProgramExercise(exerciseId, `${index + 1}-${exerciseId}`);
  });
  assert.equal(hp(detail), 0);
  assert.match(detail.html, /guided-boss-battle is-defeated/);
  assert.match(detail.html, /Boss à terre/);
  assert.match(detail.html, /finishProgramSessionButton/);
  assert.equal(programs.isActiveProgramSessionComplete(), true);
  assert.equal(state.getProfile().totalXp, 0, "les PV ne distribuent aucune récompense");
});

test("les PV suivent la variante sauvegardée d’un boss en cours, sans rejouer l’introduction", () => {
  const records = new Map();
  let app = boot(records);
  app.programs.startProgramBossSession("coeur-dragon", 4, "outdoor");
  const { exercises } = app.programs.getActiveProgramWorkout();
  app.programs.validateProgramExercise(exercises[0].exerciseId, `0-${exercises[0].exerciseId}`);
  const expected = hp(app.detail);
  assert.ok(expected < 100);

  app = boot(records);
  app.render.renderActiveProgramSession();
  assert.equal(app.state.getActiveProgramSession().bossVariant, "outdoor");
  assert.equal(hp(app.detail), expected);
  assert.doesNotMatch(app.detail.html, /guided-boss-battle is-(?:entering|hit|defeated)/);
});

test("un ancien identifiant baisse les PV d’une occurrence et ne double pas une clé indexée", () => {
  const { programs } = boot();
  const workout = {
    exercises: [{ exerciseId: "walk" }, { exerciseId: "walk" }, { exerciseId: "breathing" }]
  };
  const session = {
    type: "program-boss",
    completedExerciseKeys: ["1-walk", "999-fake"],
    completedExerciseIds: ["walk", "breathing"]
  };
  const progress = programs.getBossBattleProgress(session, workout);
  assert.deepEqual(Array.from(progress.completedKeys), ["1-walk", "2-breathing"]);
  assert.equal(progress.hp, 34);
  assert.equal(programs.getBossBattleProgress({ ...session, type: "program" }, workout), null);
});

test("la reprise d’une ancienne séance recharge ses identifiants et conserve sa version du boss", () => {
  const initial = boot();
  const session = { id: "legacy-boss", type: "program-boss", programId, weekNumber: 4, bossVariant: "single" };
  const workout = initial.programs.getProgramDetail(programId).legacyWorkouts.bosses[3];
  const lastExercise = workout.exercises.at(-1);
  const records = new Map([[sessionKey, JSON.stringify({
    ...session,
    completedExerciseIds: [lastExercise.exerciseId]
  })]]);
  const { render, detail, programs, state } = boot(records);
  render.renderActiveProgramSession();
  assert.equal(hp(detail), Math.ceil(100 * (workout.exercises.length - 1) / workout.exercises.length));
  assert.equal(state.getActiveProgramSession().workoutRevision, undefined);
  assert.equal(programs.getActiveProgramWorkout().exercises.length, workout.exercises.length);
  assert.doesNotMatch(detail.html, /guided-boss-battle is-entering/);
});
