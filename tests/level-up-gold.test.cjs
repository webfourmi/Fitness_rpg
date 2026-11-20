const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

function boot(records = new Map()) {
  const window = { addEventListener() {} };
  const document = { addEventListener() {}, querySelector: () => null };
  const localStorage = {
    getItem: (key) => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, value)
  };
  const context = vm.createContext({ window, document, localStorage, console, structuredClone });
  for (const name of ['config', 'data', 'rewards', 'state', 'camp', 'progress']) {
    const filename = 'app-' + name + '.js';
    vm.runInContext(readFileSync(join(__dirname, '..', filename), 'utf8'), context, { filename });
  }

  const { FitnessRpgState: state, FitnessRpgConfig: config, FitnessRpgCamp: camp,
    FitnessRpgProgress: progress } = window;
  state.todayKey = () => '2026-11-20';
  state.loadProfile() || state.setProfile(state.createDefaultProfile({ name: 'Aventurière' }));
  return { state, config, camp, progress, records, localStorage, profileKey: config.storageKeys.profile };
}

test('un sac de 20 PO est versé au premier niveau atteint et sauvegardé avec les XP', () => {
  let app = boot();
  app.camp.resolveOvernight();
  assert.equal(app.state.profile.camp.levelRewardedThrough, 1);
  const firstThreshold = app.config.totalXpForLevel(2);
  app.state.addXp(firstThreshold - 1);
  assert.equal(app.state.profile.camp.gold, 0);
  assert.equal(app.progress.peekLevelUpModal(), null);

  const storedProfiles = [];
  const write = app.localStorage.setItem;
  app.localStorage.setItem = (key, value) => {
    if (key === app.profileKey) storedProfiles.push(JSON.parse(value));
    write(key, value);
  };
  app.state.addXp(1);
  assert.equal(app.state.profile.totalXp, firstThreshold);
  assert.equal(app.progress.peekLevelUpModal().gold, 20);
  assert.equal(app.state.profile.camp.gold, 20);
  assert.ok(storedProfiles.length > 0);
  assert.ok(storedProfiles.every((profile) => profile.totalXp === firstThreshold && profile.camp.gold === 20));

  app = boot(app.records);
  app.state.addXp(1);
  assert.equal(app.state.profile.camp.gold, 20);
  assert.equal(app.progress.peekLevelUpModal(), null);
});

test('plusieurs niveaux gagnés ensemble ajoutent chacun un sac et gardent les familiers', () => {
  const { state, config, progress } = boot();
  const xp = config.totalXpForLevel(4);
  state.addXp(xp);

  assert.equal(state.profile.totalXp, xp);
  assert.equal(state.profile.camp.gold, 60);
  assert.equal(progress.peekLevelUpModal().oldLevel, 1);
  assert.equal(progress.peekLevelUpModal().newLevel, 4);
  assert.equal(progress.peekLevelUpModal().gold, 60);
  assert.deepEqual(Object.keys(state.profile.levelFamiliarRewards), ['2', '3', '4']);
  assert.equal(state.profile.familiars.length, 3);
});

test('un profil V7.0.0 reçoit ses sacs passés une fois et garde ses achats et son solde', () => {
  let app = boot();
  const existing = JSON.parse(app.records.get(app.profileKey));
  existing.totalXp = app.config.totalXpForLevel(5);
  existing.camp = {
    startedOn: '2026-11-20',
    gold: 17,
    claims: {},
    owned: ['moon-aura'],
    equipped: { aura: 'moon-aura' },
    months: {},
    protectedThrough: null,
    restedSinceWorkout: false,
    lastFreeze: null
  };
  app.records.set(app.profileKey, JSON.stringify(existing));

  app = boot(app.records);
  app.camp.resolveOvernight();
  assert.equal(app.state.profile.camp.gold, 97);
  assert.equal(app.state.profile.camp.levelRewardedThrough, 5);
  assert.equal(app.state.profile.totalXp, existing.totalXp);
  assert.equal(app.state.profile.camp.equipped.aura, 'moon-aura');
  assert.equal(app.progress.peekLevelUpModal(), null);

  app.camp.resolveOvernight();
  assert.equal(app.state.profile.camp.gold, 97);

  app = boot(app.records);
  app.camp.resolveOvernight();
  assert.equal(app.state.profile.camp.gold, 97);
  const nextThreshold = app.config.totalXpForLevel(6);
  app.state.addXp(nextThreshold - existing.totalXp);
  assert.equal(app.state.profile.totalXp, nextThreshold);
  assert.equal(app.state.profile.camp.gold, 117);
  assert.equal(app.progress.peekLevelUpModal().gold, 20);

  app = boot(app.records);
  app.state.profile.totalXp = existing.totalXp;
  app.state.saveProfile();
  app.state.addXp(nextThreshold - existing.totalXp);
  assert.equal(app.state.profile.camp.gold, 117);
});

test('une sauvegarde sans campement reçoit ses sacs même au-delà du niveau 20', () => {
  let app = boot();
  const existing = JSON.parse(app.records.get(app.profileKey));
  existing.totalXp = app.config.totalXpForLevel(23);
  delete existing.camp;
  app.records.set(app.profileKey, JSON.stringify(existing));

  app = boot(app.records);
  app.camp.resolveOvernight();
  assert.equal(app.state.profile.totalXp, existing.totalXp);
  assert.equal(app.state.profile.camp.gold, 440);
  assert.equal(app.state.profile.camp.levelRewardedThrough, 23);
  assert.equal(app.progress.peekLevelUpModal(), null);
});

test('la première montée de niveau verse les sacs passés avant même l’ouverture du campement', () => {
  let app = boot();
  const existing = JSON.parse(app.records.get(app.profileKey));
  existing.totalXp = app.config.totalXpForLevel(3);
  delete existing.camp;
  app.records.set(app.profileKey, JSON.stringify(existing));

  app = boot(app.records);
  const nextThreshold = app.config.totalXpForLevel(4);
  app.state.addXp(nextThreshold - existing.totalXp);
  assert.equal(app.state.profile.camp.gold, 60);
  assert.equal(app.state.profile.camp.levelRewardedThrough, 4);
  assert.equal(app.progress.peekLevelUpModal().gold, 20);

  app.camp.resolveOvernight();
  assert.equal(app.state.profile.camp.gold, 60);
});

test('un enregistrement de rattrapage refusé peut être retenté sans doubler les PO', () => {
  let app = boot();
  const existing = JSON.parse(app.records.get(app.profileKey));
  existing.totalXp = app.config.totalXpForLevel(3);
  delete existing.camp;
  app.records.set(app.profileKey, JSON.stringify(existing));

  app = boot(app.records);
  const before = app.records.get(app.profileKey);
  const write = app.localStorage.setItem;
  app.localStorage.setItem = () => { throw new Error('QuotaExceededError'); };
  app.camp.resolveOvernight();
  assert.equal(app.records.get(app.profileKey), before);
  assert.equal(app.state.profile.camp, undefined);

  app.localStorage.setItem = write;
  app.camp.resolveOvernight();
  assert.equal(app.state.profile.camp.gold, 40);
  assert.equal(app.state.profile.camp.levelRewardedThrough, 3);
  app = boot(app.records);
  app.camp.resolveOvernight();
  assert.equal(app.state.profile.camp.gold, 40);
});

test('un bonus de planning gagné avant l’affichage cumule les sacs dans le même bilan', () => {
  const { state, config, progress } = boot();
  const level2 = config.totalXpForLevel(2);
  const level3 = config.totalXpForLevel(3);
  state.addXp(level2);
  progress.applyXp(level3 - level2, 'Bonus planning hebdomadaire');

  assert.equal(state.profile.totalXp, level3);
  assert.equal(state.profile.camp.gold, 40);
  assert.equal(progress.peekLevelUpModal().oldLevel, 1);
  assert.equal(progress.peekLevelUpModal().newLevel, 3);
  assert.equal(progress.peekLevelUpModal().gold, 40);
});

test('après un premier enregistrement refusé, une nouvelle tentative crédite les PO une seule fois', () => {
  const app = boot();
  app.camp.resolveOvernight();
  const xp = app.config.totalXpForLevel(2);
  const before = app.records.get(app.profileKey);
  const write = app.localStorage.setItem;
  app.localStorage.setItem = () => { throw new Error('QuotaExceededError'); };

  assert.throws(() => app.state.addXp(xp), /QuotaExceededError/);
  assert.equal(app.records.get(app.profileKey), before);
  assert.equal(app.state.profile.totalXp, 0);
  assert.equal(app.state.profile.camp.gold, 0);
  assert.equal(app.progress.peekLevelUpModal(), null);

  app.localStorage.setItem = write;
  app.state.addXp(xp);
  assert.equal(app.state.profile.totalXp, xp);
  assert.equal(app.state.profile.camp.gold, 20);
  assert.equal(app.progress.peekLevelUpModal().gold, 20);
  assert.equal(app.state.profile.journal.filter((entry) => entry.type === 'xp').length, 1);
});
