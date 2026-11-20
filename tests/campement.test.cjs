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
    setItem: (key, value) => records.set(key, value)
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
  return { state, camp, programs, backup, profileKey, records, setDate: (next) => { date = next; } };
}

const firstDay = { type: 'program', programId: 'epreuves-forge', weekNumber: 1, dayNumber: 1 };
const firstBoss = { type: 'program-boss', programId: firstDay.programId, weekNumber: 1 };

test('migration de la sauvegarde sans paiement rétroactif et sans perte du profil', () => {
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
  assert.equal(state.profile.camp.gold, 0);
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
  assert.equal(state.completeProgramComplement(firstDay.programId, 1, 4), 5);
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
  assert.match(app.camp.avatar('assets/joueuse/joueuse_niveau_01.webp', 'Aventurière'), /camp-avatar--solaire camp-avatar--heroine/);
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
