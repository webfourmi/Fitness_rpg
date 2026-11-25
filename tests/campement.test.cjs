const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

function boot(records = new Map(), date = '2026-11-20') {
  const window = { addEventListener() {} };
  const document = { addEventListener() {}, querySelector: () => null };
  const localStorage = {
    getItem: (key) => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, value),
    removeItem: (key) => records.delete(key)
  };
  const context = vm.createContext({ window, document, localStorage, console, structuredClone });
  for (const file of ['config', 'data', 'program-forge-exercises', 'program-forge',
    'program-champion-arenes', 'rewards', 'state', 'camp', 'progress', 'programs', 'backup']) {
    const filename = 'app-' + file + '.js';
    vm.runInContext(readFileSync(join(__dirname, '..', filename), 'utf8'), context, { filename });
  }
  const { FitnessRpgState: state, FitnessRpgCamp: camp, FitnessRpgPrograms: programs,
    FitnessRpgBackup: backup } = window;
  const profileKey = window.FitnessRpgConfig.storageKeys.profile;
  state.todayKey = () => date;
  state.loadProfile() || state.setProfile(state.createDefaultProfile({ name: 'Aventurière', gender: 'femme' }));
  return { state, camp, programs, backup, profileKey, records, window, setDate: (next) => { date = next; } };
}

const firstDay = { type: 'program', programId: 'epreuves-forge', weekNumber: 1, dayNumber: 1 };
const firstBoss = { type: 'program-boss', programId: firstDay.programId, weekNumber: 1 };

test('une première victoire sauvegarde son trophée, le propose au bilan et permet de l’équiper', () => {
  const { window, state, camp, programs, records } = boot();
  let summary;
  let message;
  window.FitnessRpgRender = { queueWorkoutSummary: (value) => { summary = value; } };
  window.setTimeout = () => {};
  programs.showMessage = (value) => { message = value; };
  const finish = () => {
    state.startProgramBossSession('tour-mage', 2, 'single');
    programs.getActiveProgramWorkout().exercises.forEach(({ exerciseId }, index) => {
      state.completeProgramSessionExercise(`${index}-${exerciseId}`);
    });
    programs.finishProgramBossSession();
  };
  finish();
  const trophyId = 'trophy-marble-golem';
  assert.equal(state.getAllEntries().find((entry) => entry.type === 'program-boss').trophyId, trophyId);
  assert.equal(summary.rewards.find((reward) => reward.trophyId === trophyId).text, 'Trophée obtenu · Broche de pierre polie');
  const totalXp = state.getProfile().totalXp;
  finish();
  assert.equal(state.getProfile().totalXp, totalXp);
  assert.equal(message.title, 'Mission rejouée');

  const reopened = boot(records);
  reopened.camp.resolveOvernight();
  assert.equal(reopened.state.profile.camp.owned.filter((id) => id === trophyId).length, 1);
  assert.equal(reopened.camp.getPurchaseDetails(trophyId), null);
  const gold = reopened.state.profile.camp.gold;
  reopened.camp.mutate('buy', trophyId);
  assert.equal(reopened.state.profile.camp.gold, gold);
  assert.match(reopened.camp.mutate('equip', trophyId), /Équipé/);
  assert.ok(reopened.camp.isEquipped(trophyId));
  assert.match(reopened.camp.avatar('Mage'), /camp-avatar--trophee-marbre/);
});

test('les victoires antérieures donnent leurs trophées sans versement supplémentaire', () => {
  const app = boot();
  app.camp.resolveOvernight();
  const legacy = JSON.parse(app.records.get(app.profileKey));
  delete legacy.camp.trophiesMigrated;
  legacy.camp.gold = 73;
  legacy.camp.claims[JSON.stringify(['boss', 'rempart-heros', 2])] = true;
  legacy.completedByDate = {
    '2026-11-19': [
      { type: 'program-boss', programId: 'tour-mage', title: 'Tour du Mage · Semaine 4 · Le Dragon Astral' },
      { type: 'program-boss', programId: 'maitre-flux', weekNumber: 2 }
    ]
  };
  app.records.set(app.profileKey, JSON.stringify(legacy));
  const reopened = boot(app.records);
  reopened.camp.resolveOvernight();
  assert.deepEqual([...reopened.state.profile.camp.owned].sort(), ['trophy-astral-dragon', 'trophy-rampart-knight']);
  assert.equal(reopened.state.profile.camp.gold, 73);
  reopened.state.loadProfile();
  reopened.camp.resolveOvernight();
  assert.equal(reopened.state.profile.camp.owned.length, 2);
});

test('migration avec sacs de niveau, sans recrédit des anciennes séances ni perte du profil', () => {
  const app = boot();
  const legacy = JSON.parse(app.records.get(app.profileKey));
  legacy.totalXp = 420;
  legacy.badges = ['badge-historique'];
  legacy.familiarAffinity = { familier: 12 };
  legacy.completedByDate = { '2026-11-19': [{ ...firstDay, xp: 40 }] };
  legacy.programComplements = { [firstDay.programId]: { '1-4': { date: '2026-11-19' } } };
  app.records.set(app.profileKey, JSON.stringify(legacy));

  const { camp, state, backup } = boot(app.records);
  camp.resolveOvernight();
  assert.equal(state.profile.camp.gold, 40);
  assert.equal(state.profile.totalXp, 420);
  assert.deepEqual(JSON.parse(JSON.stringify(state.profile.badges)), legacy.badges);
  assert.equal(state.profile.familiarAffinity.familier, 12);
  assert.equal(state.getAllEntries().length, 1);
  assert.equal(camp.reward(state.profile.camp, firstDay, 10), 0);
  assert.equal(camp.reward(state.profile.camp, { ...firstDay, dayNumber: 4 }, 5), 0);
  const exported = JSON.parse(app.records.get(app.profileKey));
  const errors = [];
  backup.validateProfile(exported, errors);
  assert.deepEqual(errors, []);
  exported.camp.gold = -1;
  backup.validateProfile(exported, errors);
  assert.equal(errors.length, 1);
});

test('PO et progression sont distinctes, monétisation unique même après réinitialisation', () => {
  const { state, programs } = boot();
  programs.getProgramProgressDetails = () => ({ campaignComplete: state.getAllEntries().length >= 2 });
  const day = state.addTrainingEntry({ ...firstDay, xp: 32 }, { campGold: 10 });
  assert.equal(day.gold, 10);
  assert.equal(state.profile.totalXp, 32);
  const boss = state.addTrainingEntry({ ...firstBoss, xp: 57 }, { campGold: 20 });
  assert.equal(boss.gold, 70);
  assert.equal(state.profile.totalXp, 89);
  assert.equal(state.profile.camp.gold, 80);
  state.resetProgramProgress(firstDay.programId);
  assert.equal(state.addTrainingEntry(firstDay, { campGold: 10 }).gold, 0);
  assert.equal(state.addTrainingEntry({ ...firstBoss, bossVariant: 'outdoor' }, { campGold: 20 }).gold, 0);
  const complement = state.completeProgramComplement(firstDay.programId, 1, 4);
  assert.equal(complement.gold, 5);
  assert.equal(complement.xp, 10);
  assert.equal(state.completeProgramComplement(firstDay.programId, 1, 4), undefined);
  assert.equal(state.profile.camp.gold, 85);
});

test('achat, équipement par emplacement et retrait survivent à la sauvegarde', () => {
  let app = boot();
  app.camp.resolveOvernight();
  app.state.profile.camp.gold = 100;
  app.state.saveProfile();
  app.camp.mutate('equip', 'moon-aura');
  assert.equal(app.state.profile.camp.equipped.aura, undefined);
  app.camp.mutate('buy', 'moon-aura');
  app.camp.mutate('buy', 'moon-aura');
  app.camp.mutate('buy', 'sun-aura');
  app.camp.mutate('equip', 'moon-aura');
  app.camp.mutate('equip', 'sun-aura');
  app = boot(app.records);
  assert.equal(app.state.profile.camp.gold, 15);
  assert.equal(app.state.profile.camp.equipped.aura, 'sun-aura');
  assert.match(app.camp.avatar('Aventurière'), /camp-avatar--solaire camp-avatar--heroine/);
  app.camp.mutate('remove', 'sun-aura');
  assert.equal(app.state.profile.camp.equipped.aura, undefined);
  assert.equal(app.state.profile.camp.owned.length, 2);
  assert.equal(app.state.profile.totalXp, 0);
});

test('repos puis gels automatiques au changement de mois, sans séance ni XP fictifs', () => {
  const { state, camp, setDate } = boot(new Map(), '2026-11-28');
  state.addTrainingEntry({ xp: 14 });
  setDate('2026-11-29');
  camp.mutate('rest');
  camp.mutate('rest');
  assert.equal(state.profile.streak, 1);
  assert.equal(state.profile.lastActiveDate, '2026-11-28');
  assert.equal(state.profile.totalXp, 14);
  assert.equal(state.getAllEntries().length, 1);
  setDate('2026-12-03');
  camp.resolveOvernight();
  assert.equal(state.profile.camp.months['2026-11'].freeUsed, 1);
  assert.equal(state.profile.camp.months['2026-12'].freeUsed, 2);
  assert.equal(state.profile.streak, 1);
  camp.resolveOvernight();
  assert.equal(state.profile.camp.months['2026-12'].freeUsed, 2);
  state.addTrainingEntry({ xp: 5 });
  assert.equal(state.profile.streak, 2);
  assert.equal(state.profile.totalXp, 19);
  setDate('2026-12-05');
  camp.resolveOvernight();
  assert.equal(state.profile.streak, 0);
});

test('fioles payantes, plafond mensuel, stock et report', () => {
  const { state, camp, setDate } = boot(new Map(), '2026-11-28');
  camp.resolveOvernight();
  state.profile.camp.gold = 240;
  state.saveProfile();
  for (let index = 0; index < 3; index++) camp.mutate('freeze');
  assert.equal(state.profile.camp.gold, 120);
  assert.equal(state.profile.camp.months['2026-11'].bought, 2);
  setDate('2026-12-01');
  camp.mutate('freeze');
  assert.equal(state.profile.camp.gold, 120);
  state.addTrainingEntry({});
  setDate('2026-12-05');
  camp.resolveOvernight();
  assert.equal(state.profile.camp.months['2026-12'].freeUsed, 2);
  assert.equal(state.profile.camp.months['2026-11'].paidUsed, 1);
  assert.equal(state.profile.streak, 1);
  camp.mutate('freeze');
  assert.equal(state.profile.camp.gold, 60);
});

test('un achat échoué conserve la bourse et l’inventaire', () => {
  const { state, camp } = boot();
  camp.resolveOvernight();
  state.profile.camp.gold = 35;
  state.saveProfile();
  state.saveProfile = () => { throw new Error('quota'); };
  assert.match(camp.mutate('buy', 'moon-aura'), /échoué/);
  assert.equal(state.profile.camp.gold, 35);
  assert.equal(state.profile.camp.owned.length, 0);
});

const finalTrophies = [
  ['ballet-sylphes', 'trophy-sylph-ribbon', 'ballet-reine-sylphes'],
  ['marche-aventurier', 'trophy-trail-compass', 'marcheur-royaumes-vaincu'],
  ['forge-guerrier', 'trophy-forge-cape', 'seigneur-forge-vaincu']
];

for (const [programId, trophyId, badgeId] of finalTrophies) {
  test(programId + ' : trophée au boss final, essayage et rejeu sans double gain', () => {
    const { camp, state, programs, window } = boot();
    let summary;
    window.FitnessRpgRender = { queueWorkoutSummary(value) { summary = value; }, escapeHtml: String };
    window.setTimeout = () => {};
    programs.showMessage = () => {};
    camp.resolveOvernight();
    assert.match(camp.programTrophyHtml(programId), /Remporte le boss de la semaine 4/);
    assert.equal(camp.rewardTrophy(state.profile.camp, { type: 'program-boss', programId, weekNumber: 3 }), null);
    const finish = () => {
      state.startProgramBossSession(programId, 4);
      programs.getActiveProgramWorkout().exercises.forEach(({ exerciseId }, index) =>
        state.completeProgramSessionExercise(index + '-' + exerciseId));
      programs.finishProgramBossSession();
    };
    finish();
    assert.equal(state.getAllEntries()[0].badgeId, badgeId);
    assert.equal(state.getAllEntries()[0].trophyId, trophyId);
    assert.ok(summary.rewards.some(reward => reward.trophyId === trophyId));
    assert.match(camp.programTrophyHtml(programId), /Dans ton vestiaire/);
    assert.ok(camp.fittingHtml(trophyId).includes(camp.getTrophy(trophyId).variant));
    const balances = () => [state.profile.totalXp, state.profile.camp.gold];
    const earned = balances();
    finish();
    assert.deepEqual(balances(), earned);
    state.resetProgramProgress(programId);
    finish();
    assert.deepEqual(balances(), earned);
    assert.equal(state.getAllEntries()[0].xp, 0);
    assert.equal(state.profile.camp.owned.filter(id => id === trophyId).length, 1);
  });
}

test('mise à jour 7.0.8 : récupère les trois trophées à partir des preuves de victoire conservées', () => {
  const app = boot();
  app.camp.resolveOvernight();
  const legacy = JSON.parse(app.records.get(app.profileKey));
  delete legacy.camp.trophyCatalogVersion;
  legacy.completedByDate = { '2026-11-19': [
    { type: 'program-boss', programId: 'ballet-sylphes', title: 'Ballet des Sylphes · Semaine 4' }
  ] };
  legacy.camp.claims[JSON.stringify(['boss', 'marche-aventurier', 4])] = true;
  legacy.badges = ['seigneur-forge-vaincu'];
  legacy.camp.gold = 58;
  legacy.totalXp = 27;
  legacy.camp.owned = ['emerald-cloak'];
  legacy.camp.equipped = { cape: 'emerald-cloak' };
  app.records.set(app.profileKey, JSON.stringify(legacy));
  const { camp, state } = boot(app.records);
  for (let i = 0; i < 2; i++) {
    state.loadProfile();
    camp.resolveOvernight();
    assert.deepEqual([...state.profile.camp.owned].sort(), ['emerald-cloak', ...finalTrophies.map(t => t[1])].sort());
    assert.equal(state.profile.camp.gold, 58);
    assert.equal(state.profile.totalXp, 27);
    assert.equal(state.profile.camp.equipped.cape, 'emerald-cloak');
    assert.equal(JSON.stringify(state.profile.journal), JSON.stringify(legacy.journal));
    assert.deepEqual([...state.profile.badges], legacy.badges);
  }
});

test('Inébranlable compte les journées officielles distinctes et se conserve au rechargement', () => {
  const app = boot();
  const { camp, state, window } = app;
  const history = [1, 3, 5, 8].map(day => ({
    date: '2026-11-0' + day, status: 'completed', score: 12
  }));
  history.push(history[0], { date: '2026-11-09', status: 'interrupted' });
  window.FitnessRpgChallenges = { read: () => ({ squats: { history } }) };
  assert.match(camp.mutate('title-equip'), /cinq journées/);
  history.push({ date: '2026-11-10', status: 'completed', score: 10 });
  assert.match(camp.mutate('title-equip'), /Titre équipé/);
  state.loadProfile();
  assert.equal(camp.getHeroTitle(), 'Inébranlable');
  assert.match(camp.mutate('title-remove'), /Titre retiré/);
  state.loadProfile();
  assert.equal(camp.getHeroTitle(), '');
});
