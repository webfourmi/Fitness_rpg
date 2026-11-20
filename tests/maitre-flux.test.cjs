// Régression Maître du Flux : progression, compléments, boss et sauvegardes.
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const vm = require("node:vm");
const test = require("node:test");

const root = join(__dirname, "..");
const id = "maitre-flux";
const sessionKey = "fitnessRpgV54ActiveProgramSession";

function boot(records = new Map()) {
  const localStorage = {
    getItem: (key) => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, String(value)),
    removeItem: (key) => records.delete(key)
  };
  const window = { addEventListener() {}, setTimeout() {} };
  const document = { readyState: "loading", addEventListener() {}, querySelector() { return null; } };
  const context = vm.createContext({ window, document, localStorage, console, Intl, alert() {} });
  for (const file of ["app-config.js", "app-data.js", "app-state.js", "app-progress.js", "app-programs.js", "app.js"]) {
    vm.runInContext(readFileSync(join(root, file), "utf8"), context, { filename: file });
  }
  window.FitnessRpgApp.applyDataUpdates();
  const state = window.FitnessRpgState;
  if (!state.loadProfile()) state.setProfile(state.createDefaultProfile({ name: "Flux test", activeProgramId: id }));
  state.loadActiveProgramSession();
  const programs = window.FitnessRpgPrograms;
  programs.showMessage = () => {};
  return { state, programs, data: window.FitnessRpgData, detail: window.FitnessRpgData.getProgramDetail(id) };
}

function finish(app) {
  app.programs.getActiveProgramWorkout().exercises.forEach(({ exerciseId }, index) => {
    app.state.completeProgramSessionExercise(index + "-" + exerciseId);
  });
  app.programs.finishProgramSession();
  assert.equal(app.state.getActiveProgramSession(), null);
}
function snapshot(state) {
  const { totalXp, badges, streak } = state.getProfile();
  return JSON.stringify({ totalXp, badges, streak, entries: state.getAllEntries() });
}

test("4 semaines, 3 essentielles + 2 compléments, boss final et références", () => {
  const { detail, data, programs } = boot();
  assert.equal(detail.workoutRevision, 1);
  assert.equal(detail.weeks.length, 4);
  assert.equal(detail.bosses.length, 4);
  assert.deepEqual(Array.from(detail.reward.nextPrograms),
    ["archimage-corps", "forge-guerrier", "champion-arenes"]);
  assert.equal(detail.bosses[3].xp, detail.legacyWorkouts.bosses[3].xp);
  assert.equal(detail.bosses[3].badgeId, detail.legacyWorkouts.bosses[3].badgeId);
  assert.equal(detail.bosses[3].exercises.filter(x => x.phase.startsWith("Cycle")).length, 14);
  for (const week of detail.weeks) {
    assert.deepEqual(Array.from(week.days.map(x => x.day)), [1, 2, 3, 4, 5]);
    assert.equal(week.days.filter(x => !x.optional).length, 3);
    assert.ok(week.days.slice(3).every(x => x.optional && x.xp === 0));
    for (const workout of [...week.days, detail.bosses[week.week - 1]]) {
      for (const item of workout.exercises) {
        assert.ok(data.getExerciseById(item.exerciseId), "Missing exercise " + item.exerciseId);
        assert.ok(item.amount > 0);
      }
    }
  }
  assert.equal(programs.getCombinedWeeklyPlan("mobilite")[1][3], "program-optional");
  assert.equal(programs.getCombinedWeeklyPlan("mobilite")[3][3], "program-optional");
});

test("Les compléments donnent des XP une fois et le boss exige trois essentielles", () => {
  const records = new Map(); const app = boot(records);
  const before = JSON.parse(snapshot(app.state));
  for (const day of [4, 5, 4]) { app.programs.validateProgramDay(id, day, 1); finish(app); }
  assert.deepEqual(JSON.parse(snapshot(app.state)), { ...before, totalXp: before.totalXp + 20 });
  assert.equal(app.programs.isProgramBossUnlocked(id, 1), false);
  for (const day of [1, 2]) { app.programs.validateProgramDay(id, day, 1); finish(app); }
  assert.equal(app.programs.isProgramBossUnlocked(id, 1), false);
  app.programs.validateProgramDay(id, 3, 1); finish(app);
  assert.equal(app.programs.isProgramBossUnlocked(id, 1), true);
  assert.equal(app.state.getAllEntries().filter(x => x.type === "program").length, 3);
});

test("Les anciennes séances en cours conservent leur suite d'exercices et leurs coches", () => {
  const records = new Map(); const { detail } = boot(records);
  for (const [type, day] of [["program", 2], ["program-boss", 0]]) {
    const old = type === "program" ? detail.legacyWorkouts.weeks[3].days[day - 1]
      : detail.legacyWorkouts.bosses[3];
    const key = "0-" + old.exercises[0].exerciseId;
    records.set(sessionKey, JSON.stringify({
      id: "legacy", type, programId: id, weekNumber: 4, dayNumber: day,
      completedExerciseKeys: [key], completedExerciseIds: [old.exercises[0].exerciseId],
      bossVariant: "single"
    }));
    const app = boot(records);
    assert.equal(app.programs.getActiveProgramWorkout().exercises.length, old.exercises.length);
    assert.ok(app.state.getActiveProgramSession().completedExerciseKeys.includes(key));
    app.state.clearActiveProgramSession();
  }
});

test("Une semaine répétée ne double pas l'XP et reprend après rechargement", () => {
  const records = new Map(); let app = boot(records);
  for (const day of [1, 2, 3]) { app.programs.validateProgramDay(id, day, 1); finish(app); }
  const before = snapshot(app.state);
  assert.equal(app.programs.startRepeatWeek(id, 1), true);
  for (const day of [1, 2, 3]) {
    app.programs.validateProgramDay(id, day, 1);
    const first = app.programs.getActiveProgramWorkout().exercises[0];
    app.state.completeProgramSessionExercise("0-" + first.exerciseId);
    app = boot(records);
    assert.ok(app.state.getActiveProgramSession().completedExerciseKeys.includes("0-" + first.exerciseId));
    finish(app);
  }
  assert.equal(app.programs.getRepeatWeek(id), null);
  assert.equal(snapshot(app.state), before);
});
