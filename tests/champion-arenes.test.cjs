const assert = require("node:assert/strict");
const { readFileSync, existsSync } = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const id = "champion-arenes";
const activeKey = "fitnessRpgV54ActiveProgramSession";
const plain = v => JSON.parse(JSON.stringify(v));

function boot(records = new Map()) {
  const localStorage = {
    getItem: key => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, String(value)),
    removeItem: key => records.delete(key)
  };
  const window = { addEventListener() {}, setTimeout() {}, confirm: () => true };
  const document = { readyState: "loading", addEventListener() {}, querySelector: () => null, querySelectorAll: () => [] };
  const context = vm.createContext({ window, document, localStorage, console, Intl, Blob, alert() {} });
  const load = file => vm.runInContext(readFileSync(path.join(root, file), "utf8"), context, { filename:file });
  load("app-config.js");
  load("app-data.js");
  const originalImages = new Map(plain(window.FitnessRpgData.exercises.map(x => [x.id, x.images])));
  const originalKeys = plain(window.FitnessRpgConfig.storageKeys);
  for (const file of ["app-program-forge-exercises.js","app-program-forge.js","app-program-champion-arenes.js","app-state.js","app-progress.js","app-programs.js","app.js"]) load(file);
  window.FitnessRpgApp.applyDataUpdates();
  const state = window.FitnessRpgState;
  if (!state.loadProfile()) state.setProfile(state.createDefaultProfile({ name: "Test champion", activeProgramId: id }));
  state.loadActiveProgramSession();
  const programs = window.FitnessRpgPrograms;
  programs.showMessage = () => {};
  return { window, state, programs, records, load, detail:window.FitnessRpgData.getProgramDetail(id), originalImages, originalKeys };
}

function finish(app) {
  const workout = app.programs.getActiveProgramWorkout();
  assert.ok(workout, "séance active manquante");
  workout.exercises.forEach((e,i) => app.state.completeProgramSessionExercise(i + "-" + e.exerciseId));
  app.programs.finishProgramSession();
  assert.equal(app.state.getActiveProgramSession(), null);
}
function rewards(state) {
  const { totalXp, badges, streak } = state.getProfile();
  return JSON.stringify({ totalXp, badges, streak, entries:state.getAllEntries() });
}

test("quatre semaines, trois essentielles et deux facultatives, tous les exercices résolus", () => {
  const { detail, window, programs } = boot();
  assert.equal(detail.workoutRevision, 1);
  assert.equal(detail.weeks.length, 4);
  assert.equal(detail.bosses.length, 4);
  assert.equal(detail.reward.badgeId, "champion-arenes-vaincu");
  assert.equal(detail.bosses[3].xp, detail.legacyWorkouts.bosses[3].xp);
  for (const week of detail.weeks) {
    assert.deepEqual(plain(week.days.map(x => x.day)), [1,2,3,4,5]);
    assert.equal(week.days.filter(x => !x.optional).length, 3);
    assert.ok(week.days.slice(3).every(x => x.optional && x.xp === 0));
    for (const session of [...week.days, ...Object.values(detail.bosses[week.week - 1].variants)]) {
      for (const e of session.exercises) {
        assert.ok(window.FitnessRpgData.getExerciseById(e.exerciseId), "exercice absent : " + e.exerciseId);
        assert.ok(Number(e.amount) > 0);
      }
    }
    for (const day of [...week.days.slice(0,3), detail.bosses[week.week - 1].variants.indoor]) {
      const cycles = new Set(day.exercises.filter(e => /Cycle/.test(e.phase)).map(e => e.phase.match(/Cycle (\d+)/)?.[1]));
      assert.equal(cycles.size, week.week === 3 ? 3 : 2);
      assert.ok(day.exercises.filter(e => e.exerciseId === "turkish_get_up").every(e => e.amount <= 4));
      assert.ok(day.exercises.filter(e => e.exerciseId === "pullups_clean_max").every(e => e.amount <= 6));
    }
  }
  const plan = programs.getCombinedWeeklyPlan("renforcement");
  assert.equal(plan[1][3], "program-optional");
  assert.equal(plan[3][3], "program-optional");
});

test("illustrations des quinze mouvements avancés préservées et fichiers WebP présents", () => {
  const { window, originalImages } = boot();
  const source = readFileSync(path.join(root, "app-program-champion-arenes.js"), "utf8");
  const ids = [...source.matchAll(/addExercise\(\{\s*id: "([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, 15);
  for (const exerciseId of ids) {
    const images = plain(window.FitnessRpgData.getExerciseById(exerciseId).images);
    assert.deepEqual(images, originalImages.get(exerciseId), "illustration effacée : " + exerciseId);
    for (const file of new Set(Object.values(images))) {
      assert.ok(existsSync(path.join(root,file)), "image introuvable : " + file);
      assert.equal(readFileSync(path.join(root,file)).toString("ascii",8,12), "WEBP");
    }
  }
});

test("les quatre boss conservent badge et XP ; temps extérieur exact", () => {
  const { detail } = boot();
  for (const [idx,boss] of detail.bosses.entries()) {
    assert.equal(boss.badgeId,detail.legacyWorkouts.bosses[idx].badgeId);
    assert.equal(boss.xp,detail.legacyWorkouts.bosses[idx].xp);
    assert.deepEqual(plain(Object.keys(boss.variants)), ["indoor","outdoor"]);
    const outdoor=boss.variants.outdoor;
    const minutes=outdoor.exercises.filter(e => e.unit === "min").reduce((n,e) => n+e.amount,0);
    assert.ok(outdoor.difficultyLabel.includes(minutes + " min"));
    assert.ok(minutes >= 45 && minutes <= 75);
  }
});

test("les compléments donnent des XP une fois, la troisième essentielle ouvre le boss", () => {
  const app=boot();
  const before = JSON.parse(rewards(app.state));
  for (const day of [4,5,4]) { app.programs.validateProgramDay(id,day,1); finish(app); }
  assert.deepEqual(JSON.parse(rewards(app.state)), { ...before, totalXp: before.totalXp + 20 });
  assert.equal(app.programs.isProgramBossUnlocked(id,1),false);
  for (const day of [1,2]) { app.programs.validateProgramDay(id,day,1);finish(app); }
  assert.equal(app.programs.isProgramBossUnlocked(id,1),false);
  app.programs.validateProgramDay(id,3,1);finish(app);
  assert.equal(app.programs.isProgramBossUnlocked(id,1),true);
});

test("les quatre boss ont leurs deux variantes après les trois séances", () => {
  const app=boot();
  for (let week=1;week<=4;week++) {
    assert.equal(app.programs.isProgramBossUnlocked(id,week),false);
    for (let day=1;day<=3;day++) app.state.addTrainingEntry({type:"program",programId:id,weekNumber:week,dayNumber:day,xp:0});
    assert.equal(app.programs.isProgramBossUnlocked(id,week),true);
    for (const variant of ["indoor","outdoor"]) assert.ok(app.programs.getProgramBossVariant(id,week,variant));
  }
});

test("ancienne séance et ancien boss intérieur ou extérieur retrouvés à la reprise", () => {
  const records=new Map();
  const { detail }=boot(records);
  for (const [type,variant,day] of [["program","indoor",2],["program-boss","indoor",0],["program-boss","outdoor",0]]) {
    const original=type==="program" ? detail.legacyWorkouts.weeks[3].days[day-1] : detail.legacyWorkouts.bosses[3].variants[variant];
    const key="0-"+original.exercises[0].exerciseId;
    records.set(activeKey,JSON.stringify({id:"legacy",type,programId:id,weekNumber:4,dayNumber:day,bossVariant:variant,completedExerciseKeys:[key],completedExerciseIds:[original.exercises[0].exerciseId]}));
    const app=boot(records);
    assert.equal(app.programs.getActiveProgramWorkout().exercises.length,original.exercises.length);
    assert.ok(app.state.getActiveProgramSession().completedExerciseKeys.includes(key));
    app.state.clearActiveProgramSession();
  }
});

test("rejouer la semaine conserve badges, XP et coches après rechargement", () => {
  const records=new Map();let app=boot(records);
  for (const day of [1,2,3]) { app.programs.validateProgramDay(id,day,1);finish(app); }
  const before=rewards(app.state);
  assert.equal(app.programs.startRepeatWeek(id,1),true);
  for (const day of [1,2,3]) {
    app.programs.validateProgramDay(id,day,1);
    const ex=app.programs.getActiveProgramWorkout().exercises[0];
    app.state.completeProgramSessionExercise("0-"+ex.exerciseId);
    app=boot(records);
    assert.ok(app.state.getActiveProgramSession().completedExerciseKeys.includes("0-"+ex.exerciseId));
    finish(app);
  }
  assert.equal(app.programs.getRepeatWeek(id),null);
  assert.equal(rewards(app.state),before);
});

test("rechargement du module sans doublons, clés de stockage inchangées", () => {
  const app=boot();
  const before=JSON.stringify([app.window.FitnessRpgConfig.programs,app.window.FitnessRpgData]);
  app.load("app-program-champion-arenes.js");
  assert.equal(JSON.stringify([app.window.FitnessRpgConfig.programs,app.window.FitnessRpgData]),before);
  for (const list of [app.window.FitnessRpgConfig.programs,app.window.FitnessRpgData.exercises,app.window.FitnessRpgData.badges])
    assert.equal(new Set(list.map(x => x.id)).size,list.length);
  assert.deepEqual(plain(app.window.FitnessRpgConfig.storageKeys),app.originalKeys);
});
