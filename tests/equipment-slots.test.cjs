const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function boot() {
  const root = { innerHTML: '', querySelectorAll: () => [{ dataset: { campSlot: 'head' } }] };
  const window = {
    FitnessRpgRender: { escapeHtml: (value) => value }
  };
  const records = new Map();
  const localStorage = {
    getItem: (key) => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, value)
  };
  const document = { querySelector: () => root };
  const context = vm.createContext({ window, localStorage, document, structuredClone });
  for (const name of ['app-config.js', 'app-state.js', 'app-camp.js']) {
    vm.runInContext(readFileSync(join(__dirname, '..', name), 'utf8'), context, { filename: name });
  }

  const { FitnessRpgState: state, FitnessRpgCamp: camp } = window;
  const profile = state.createDefaultProfile({ name: 'Aventurière', gender: 'femme' });
  state.setProfile(profile);
  camp.resolveOvernight();
  return { root, state, camp, profile, window };
}

test('les emplacements cliquables préservent le médaillon et enregistrent la tête et la tenue séparément', () => {
  const { root, state, camp, profile } = boot();
  Object.assign(profile.camp, {
    gold: 105,
    owned: ['dragon-clasp'],
    equipped: { broche: 'dragon-clasp' }
  });
  state.saveProfile();

  camp.render();
  assert.match(root.innerHTML, /data-camp-slot="head" open>\s*<summary><strong>Tête<\/strong><small>Vide<\/small>/);
  assert.match(root.innerHTML, /<strong>Tenue<\/strong><small>Vide<\/small>/);
  assert.match(root.innerHTML, /<strong>Accessoire<\/strong><small>Médaillon runique<\/small>/);

  for (const item of ['garnet-headband', 'indigo-tunic']) {
    camp.mutate('buy', item);
    camp.mutate('equip', item);
  }
  state.loadProfile();
  camp.render();
  assert.equal(state.getProfile().camp.gold, 0);
  assert.match(root.innerHTML, /data-camp-slot="head" open>[\s\S]*?Bandeau grenat[\s\S]*?data-camp-action="remove" data-camp-item="garnet-headband"/);
  assert.match(root.innerHTML, /<strong>Tenue<\/strong><small>Tunique indigo<\/small>/);
  assert.match(root.innerHTML, /<strong>Accessoire<\/strong><small>Médaillon runique<\/small>/);
  assert.match(root.innerHTML, /camp-avatar--grenat/);
  assert.match(root.innerHTML, /camp-avatar--indigo/);

  camp.mutate('remove', 'indigo-tunic');
  camp.render();
  assert.match(root.innerHTML, /<strong>Tenue<\/strong><small>Vide<\/small>/);
  assert.match(root.innerHTML, /data-camp-slot="outfit"[\s\S]*?data-fitting-action="preview" data-camp-item="indigo-tunic"/);
  assert.doesNotMatch(root.innerHTML, /camp-avatar--indigo/);
  assert.equal(state.getProfile().camp.equipped.head, 'garnet-headband');
  assert.ok(state.getProfile().camp.owned.includes('indigo-tunic'));
});

test('la boutique fait défiler les objets du même emplacement et vérifie le niveau avant achat', () => {
  const { root, state, camp, profile, window } = boot();
  profile.camp.gold = 200;
  camp.render();
  const section = (slot) => root.innerHTML.match(
    new RegExp(`data-camp-shop-slot="${slot}"[\\s\\S]*?<\\/section>`)
  )[0];
  const outfit = section('outfit');
  assert.match(section('head'), /Bandeau grenat/);
  camp.stepShop('head', 1);
  assert.equal(section('outfit'), outfit);
  assert.match(section('head'), /Diadème du Gardien du Sceau/);
  assert.match(section('head'), /Niveau 2 requis/);
  assert.match(camp.mutate('buy', 'boss-gear-2'), /niveau 2/);
  assert.equal(profile.camp.gold, 200);
  assert.doesNotMatch(section('head'), /Tunique/);

  profile.totalXp = window.FitnessRpgConfig.totalXpForLevel(2);
  camp.render();
  assert.match(section('head'), /Acheter · 35 PO/);
  camp.mutate('buy', 'boss-gear-2');
  camp.mutate('equip', 'boss-gear-2');
  state.loadProfile();
  assert.equal(state.profile.camp.gold, 165);
  assert.equal(state.profile.camp.equipped.head, 'boss-gear-2');
  assert.match(camp.avatar('Aventurière'), /camp-avatar--grenat camp-avatar--sceau/);
});

test('chaque niveau à partir du niveau 2 introduit une pièce numérotée, même après le niveau mythique', () => {
  const { camp } = boot();
  assert.equal(camp.getLevelItem(1), null);
  const items = Array.from({ length: 30 }, (_, index) => camp.getLevelItem(index + 2));
  assert.equal(new Set(items.map((item) => item.id)).size, 30);
  assert.equal(new Set(items.slice(0, 5).map((item) => item.slot)).size, 5);
  assert.deepEqual(items.map((item) => item.minLevel), Array.from({ length: 30 }, (_, index) => index + 2));
  assert.notEqual(items[0].hue, items[5].hue);
});

test('le familier sélectionné peut rejoindre ou quitter le portrait sans changer la sélection', () => {
  const { root, state, camp, profile, window } = boot();
  profile.activeFamiliarId = 'familiar';
  window.FitnessRpgRewards = {
    getActiveFamiliar: () => ({ name: 'Lynx', image: 'assets/familiers/lynx.webp' })
  };
  camp.render();
  assert.match(root.innerHTML, /data-camp-slot="familiar"[\s\S]*?data-camp-action="familiar-show"/);
  camp.mutate('familiar-show');
  state.loadProfile();
  assert.match(camp.avatar('Aventurière'), /class="camp-avatar-familiar"[^>]*alt="Lynx"/);
  camp.mutate('familiar-hide');
  assert.doesNotMatch(camp.avatar('Aventurière'), /class="camp-avatar-familiar"/);
  assert.equal(state.profile.activeFamiliarId, 'familiar');
});

test('le vestiaire expose chaque acquisition une fois et présente la plus récente en premier', () => {
  const { root, camp, profile } = boot();
  profile.camp.owned = ['emerald-cloak', 'dragon-clasp', 'trophy-astral-dragon'];
  camp.render();
  const wardrobe = root.innerHTML.split('<h2>Repos')[0];
  assert.equal(wardrobe.match(/data-camp-item="trophy-astral-dragon"/g)?.length, 1);
  assert.match(wardrobe, /data-camp-slot="cape" open>/);
  assert.ok(wardrobe.indexOf('Cape étoilée') < wardrobe.indexOf('Cape de l’aventurier'));
  assert.match(wardrobe, /Programme terminé/);
});

test('essayer un ancien trophée conserve la tenue, la bourse et les récompenses enregistrées', () => {
  const { state, camp, profile } = boot();
  profile.camp.owned = ['emerald-cloak', 'trophy-astral-dragon', 'dragon-clasp'];
  profile.camp.equipped = { cape: 'emerald-cloak', broche: 'dragon-clasp' };
  state.saveProfile();
  const saved = JSON.stringify(profile);
  const preview = camp.fittingHtml('trophy-astral-dragon');
  assert.match(preview, /camp-avatar--trophee-astral/);
  assert.match(preview, /camp-avatar--dragon/);
  assert.match(preview, /heroine.webp/);
  assert.equal(camp.fittingHtml('trophy-rampart-knight'), '');
  assert.equal(JSON.stringify(profile), saved);
  state.loadProfile();
  assert.equal(state.profile.camp.equipped.cape, 'emerald-cloak');
  assert.doesNotMatch(camp.avatar('Héros'), /camp-avatar--trophee-astral/);
  camp.mutate('equip', 'trophy-astral-dragon');
  state.loadProfile();
  assert.match(camp.avatar('Héros'), /camp-avatar--trophee-astral/);
  assert.equal(state.profile.camp.equipped.broche, 'dragon-clasp');
  assert.equal(state.profile.camp.gold, profile.camp.gold);
  assert.equal(state.profile.totalXp, profile.totalXp);
});
