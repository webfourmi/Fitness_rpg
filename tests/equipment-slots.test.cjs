const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

test('les emplacements du camp préservent le médaillon et enregistrent la tête et la tenue séparément', () => {
  const root = { innerHTML: '' };
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
  Object.assign(profile.camp, {
    gold: 105,
    owned: ['dragon-clasp'],
    equipped: { broche: 'dragon-clasp' }
  });
  state.saveProfile();

  camp.render();
  assert.match(root.innerHTML, /<dt>Tête<\/dt>\s*<dd>Vide<\/dd>/);
  assert.match(root.innerHTML, /<dt>Tenue<\/dt>\s*<dd>Vide<\/dd>/);
  assert.match(root.innerHTML, /<dt>Accessoire<\/dt>\s*<dd>Médaillon runique<\/dd>/);

  for (const item of ['garnet-headband', 'indigo-tunic']) {
    camp.mutate('buy', item);
    camp.mutate('equip', item);
  }
  state.loadProfile();
  camp.render();
  assert.equal(state.getProfile().camp.gold, 0);
  assert.match(root.innerHTML, /<dt>Tête<\/dt>\s*<dd>Bandeau grenat<\/dd>/);
  assert.match(root.innerHTML, /<dt>Tenue<\/dt>\s*<dd>Tunique indigo<\/dd>/);
  assert.match(root.innerHTML, /<dt>Accessoire<\/dt>\s*<dd>Médaillon runique<\/dd>/);
  assert.match(root.innerHTML, /camp-avatar--grenat/);
  assert.match(root.innerHTML, /camp-avatar--indigo/);

  camp.mutate('remove', 'indigo-tunic');
  camp.render();
  assert.match(root.innerHTML, /<dt>Tenue<\/dt>\s*<dd>Vide<\/dd>/);
  assert.doesNotMatch(root.innerHTML, /camp-avatar--indigo/);
  assert.equal(state.getProfile().camp.equipped.head, 'garnet-headband');
  assert.ok(state.getProfile().camp.owned.includes('indigo-tunic'));
});
