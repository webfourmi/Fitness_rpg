const assert = require('node:assert/strict');
const { readFileSync, existsSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const id = 'epreuves-forge';
const addons = ['app-program-forge-exercises.js', 'app-program-forge.js'];
const plain = (value) => JSON.parse(JSON.stringify(value));

function boot() {
  const records = new Map();
  const localStorage = {
    getItem: (key) => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, String(value)),
    removeItem: (key) => records.delete(key)
  };
  const window = { addEventListener() {} };
  const document = {
    readyState: 'loading', addEventListener() {},
    querySelector: () => null, querySelectorAll: () => []
  };
  const context = vm.createContext({ window, document, localStorage, console, Intl, Blob });
  const load = (file) => vm.runInContext(readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  load('app-config.js');
  load('app-data.js');
  const baseline = plain({
    programs: window.FitnessRpgConfig.programs,
    programDetails: window.FitnessRpgData.programDetails,
    storageKeys: window.FitnessRpgConfig.storageKeys,
    xpRules: window.FitnessRpgConfig.xpRules,
    exercises: window.FitnessRpgData.exercises,
    badges: window.FitnessRpgData.badges
  });
  for (const file of [...addons, 'app-state.js', 'app-progress.js', 'app-programs.js', 'app-exercises.js']) load(file);
  const state = window.FitnessRpgState;
  state.setProfile(state.createDefaultProfile({ name: 'Forge test', gender: 'femme', activeProgramId: id }));
  return { window, state, load, baseline, localStorage };
}

test('la Forge conserve les programmes, exercices, badges, clés et XP existants', () => {
  const { window, baseline } = boot();
  const data = window.FitnessRpgData;
  for (const item of baseline.programs) assert.deepEqual(plain(window.FitnessRpgConfig.getProgramById(item.id)), item);
  for (const [key, value] of Object.entries(baseline.programDetails)) assert.deepEqual(plain(data.programDetails[key]), value);
  for (const item of baseline.exercises) assert.deepEqual(plain(data.exercises.find((e) => e.id === item.id)), item);
  for (const item of baseline.badges) assert.deepEqual(plain(data.badges.find((b) => b.id === item.id)), item);
  assert.deepEqual(plain(window.FitnessRpgConfig.storageKeys), baseline.storageKeys);
  assert.deepEqual(plain(window.FitnessRpgConfig.xpRules), baseline.xpRules);
});

test('le parcours contient 24 séances, 8 boss et un nouveau mouvement par semaine', () => {
  const { window } = boot();
  const program = window.FitnessRpgData.programDetails[id];
  assert.equal(program.weeks.length, 8);
  assert.equal(program.bosses.length, 8);
  assert.equal(program.weeks.reduce((n, week) => n + week.days.length, 0), 24);
  const seen = new Set();
  const known = new Set(window.FitnessRpgData.exercises.map((e) => e.id));
  for (const [index, week] of program.weeks.entries()) {
    assert.equal(week.week, index + 1);
    assert.deepEqual(plain(week.days.map((day) => day.day)), [1, 2, 3]);
    const moves = new Set(week.days.flatMap((day) => day.exercises.map((e) => e.exerciseId)));
    const introduced = [...moves].filter((move) => move.startsWith('forge_') && !seen.has(move));
    assert.equal(introduced.length, 1, 'Nouveau mouvement semaine ' + week.week);
    for (const move of moves) {
      assert.ok(known.has(move), move);
      seen.add(move);
    }
  }
  for (const boss of program.bosses) for (const item of boss.exercises) assert.ok(known.has(item.exerciseId));
});

test('recharger les modules ne crée aucun doublon ni ne remplace les données', () => {
  const { window, load } = boot();
  const snapshot = JSON.stringify([window.FitnessRpgConfig.programs, window.FitnessRpgData]);
  for (const file of addons) load(file);
  assert.equal(JSON.stringify([window.FitnessRpgConfig.programs, window.FitnessRpgData]), snapshot);
  for (const items of [window.FitnessRpgConfig.programs, window.FitnessRpgData.exercises, window.FitnessRpgData.badges]) {
    assert.equal(new Set(items.map((item) => item.id)).size, items.length);
  }
});

test('les boss se débloquent après trois séances distinctes, jusqu’à la fin de S8', () => {
  const { window, state } = boot();
  const programs = window.FitnessRpgPrograms;
  for (let week = 1; week <= 8; week++) {
    assert.equal(programs.isProgramBossUnlocked(id, week), false);
    for (let day = 1; day <= 3; day++) {
      assert.equal(programs.isProgramBossUnlocked(id, week), false);
      state.addTrainingEntry({ type: 'program', programId: id, weekNumber: week, dayNumber: day, xp: 0 });
    }
    assert.equal(programs.isProgramBossUnlocked(id, week), true);
    assert.equal(programs.getProgramProgressDetails(id).nextItem.type, 'boss');
    state.addTrainingEntry({ type: 'program-boss', programId: id, weekNumber: week, xp: 0 });
    if (week < 8) assert.equal(programs.getProgramProgressDetails(id).nextItem.weekNumber, week + 1);
  }
  const progress = programs.getProgramProgressDetails(id);
  assert.equal(progress.completed, 24);
  assert.equal(progress.bossesDefeated, 8);
  assert.equal(progress.campaignComplete, true);
  state.addTrainingEntry({ type: 'program', programId: id, weekNumber: 1, dayNumber: 1, xp: 0 });
  assert.equal(programs.getProgramProgressDetails(id).completed, 24);
});

test('répéter une séance ou terminer un autre programme ne débloque pas le boss', () => {
  const { window, state } = boot();
  for (let i = 0; i < 3; i++) state.addTrainingEntry({ type: 'program', programId: id, weekNumber: 1, dayNumber: 1, xp: 0 });
  for (let day = 1; day <= 3; day++) state.addTrainingEntry({ type: 'program', programId: 'forge-guerrier', weekNumber: 1, dayNumber: day, xp: 0 });
  assert.equal(window.FitnessRpgPrograms.isProgramBossUnlocked(id, 1), false);
});

test('les quatre badges suivent les seuils du moteur existant', () => {
  const { window, state } = boot();
  const badges = window.FitnessRpgData.badges.filter((badge) => badge.programId === id);
  assert.deepEqual(plain(badges.map((badge) => badge.target)), [1, 8, 16, 32]);
  for (let count = 0; count <= 32; count++) {
    for (const badge of badges) assert.equal(window.FitnessRpgProgress.isBadgeUnlocked(badge), count >= badge.target);
    if (count < 32) state.addTrainingEntry({ type: count % 4 === 3 ? 'program-boss' : 'program', programId: id, weekNumber: Math.floor(count / 4) + 1, dayNumber: count % 4 + 1, xp: 0 });
  }
});

test('une séance Forge et son exercice coché sont repris après rechargement', () => {
  const { window, state, localStorage } = boot();
  const session = state.startProgramSession(id, 1, 1);
  assert.equal(session.programId, id);
  state.completeProgramSessionExercise('0-walk');
  const saved = plain(state.getActiveProgramSession());
  assert.ok(localStorage.getItem('fitnessRpgV54ActiveProgramSession'));
  state.activeProgramSession = null;
  state.loadActiveProgramSession();
  assert.deepEqual(plain(state.getActiveProgramSession()), saved);
  assert.equal(window.FitnessRpgPrograms.getProgramProgressDetails(id).action.type, 'resume');
});

test('les cartes de bibliothèque et de séance utilisent les WebP Forge présents', () => {
  const { window } = boot();
  const data = window.FitnessRpgData;
  for (const exercise of data.exercises.filter((e) => e.id.startsWith('forge_'))) {
    const file = exercise.images.femme;
    assert.ok(existsSync(path.join(root, file)), file);
    const bytes = readFileSync(path.join(root, file));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
    for (const options of [{}, { mode: 'program', item: { exerciseId: exercise.id, amount: 10, unit: 'répétitions' } }]) {
      const html = window.FitnessRpgExercises.exerciseCardHtml(exercise, options);
      assert.ok(html.includes('src="' + file + '"'));
      assert.ok(html.includes('data-exercise-id="' + exercise.id + '"'));
    }
  }
  const program = data.programDetails[id];
  for (const boss of program.bosses) assert.ok(existsSync(path.join(root, boss.image)));
  for (const badge of data.badges.filter((b) => b.programId === id)) assert.ok(existsSync(path.join(root, badge.image)));
});


test('la Forge est intermédiaire avec une progression de deux puis trois séries', () => {
  const { window } = boot();
  const config = window.FitnessRpgConfig.getProgramById(id);
  const program = window.FitnessRpgData.programDetails[id];
  assert.equal(config.tier, 'intermediate');
  assert.equal(config.unlockLevel, 2);
  for (const week of program.weeks) {
    for (const day of week.days) {
      const series = new Set(day.exercises.flatMap((exercise) =>
        [...String(exercise.phase || '').matchAll(/Série ([0-9]+)/g)].map((match) => Number(match[1]))
      ));
      assert.equal(series.size, week.week <= 2 ? 2 : 3);
    }
  }
});

test('la Forge exige un programme débutant complet, boss inclus', () => {
  const { window, state } = boot();
  const programs = window.FitnessRpgPrograms;
  assert.equal(programs.isForgeAccessible(), false);
  const beginner = window.FitnessRpgConfig.programs.find((item) =>
    item.id !== id && window.FitnessRpgConfig.getProgramTier(item) === 'beginner'
      && programs.getProgramWeeks(item.id).length > 0
  );
  assert.ok(beginner, 'Programme débutant de référence requis');
  for (const week of programs.getProgramWeeks(beginner.id)) {
    for (const day of programs.getProgramDaysForWeek(beginner.id, week.week)) {
      state.addTrainingEntry({ type: 'program', programId: beginner.id, weekNumber: week.week, dayNumber: day.day, xp: 0 });
    }
  }
  const beforeBoss = programs.getProgramProgressDetails(beginner.id);
  assert.equal(beforeBoss.campaignComplete, false);
  assert.equal(programs.isForgeAccessible(), false);
  for (const week of programs.getProgramWeeks(beginner.id)) {
    if (programs.getProgramBoss(beginner.id, week.week)) {
      state.addTrainingEntry({ type: 'program-boss', programId: beginner.id, weekNumber: week.week, xp: 0 });
    }
  }
  assert.equal(programs.getProgramProgressDetails(beginner.id).campaignComplete, true);
  assert.equal(programs.isForgeAccessible(), true);
});

test('une ancienne progression Forge conserve son accès', () => {
  const { window, state } = boot();
  assert.equal(window.FitnessRpgPrograms.isForgeAccessible(), false);
  state.addTrainingEntry({ type: 'program', programId: id, weekNumber: 1, dayNumber: 1, xp: 0 });
  assert.equal(window.FitnessRpgPrograms.isForgeAccessible(), true);
});
