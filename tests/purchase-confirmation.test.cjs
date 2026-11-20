const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function createCamp(acceptPurchase) {
  const confirmations = [];
  const messages = [];
  const focusTargets = [];
  const records = new Map();
  class Element {}
  const window = {
    confirm(message) {
      confirmations.push(message);
      return acceptPurchase;
    }
  };
  const localStorage = {
    getItem: (key) => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, value)
  };
  const nextButtons = [
    {
      dataset: { campItem: 'garnet-headband' },
      getClientRects: () => [],
      focus: () => focusTargets.push('hidden')
    },
    {
      dataset: { campItem: 'garnet-headband' },
      getClientRects: () => [{}],
      focus: () => focusTargets.push('visible')
    }
  ];
  const document = {
    querySelector: () => null,
    querySelectorAll: () => nextButtons
  };
  const context = vm.createContext({ window, localStorage, document, Element, structuredClone });
  for (const file of ['app-config.js', 'app-state.js', 'app-camp.js', 'app-navigation.js']) {
    vm.runInContext(readFileSync(join(__dirname, '..', file), 'utf8'), context, { filename: file });
  }

  const { FitnessRpgState: state, FitnessRpgCamp: camp, FitnessRpgNavigation: navigation } = window;
  const profile = state.createDefaultProfile({ name: 'Héroïne' });
  state.setProfile(profile);
  camp.resolveOvernight();
  profile.camp.gold = 100;
  state.saveProfile();
  camp.render = (message) => messages.push(message);

  function clickElement(dataset, selector, parent = null) {
    const target = new Element();
    target.dataset = dataset;
    target.closest = (query) => {
      if (query === selector) return target;
      return query === '.camp-shop-category' ? parent : null;
    };
    navigation.handleDocumentClick({ target, preventDefault() {}, stopPropagation() {} });
  }

  function click(campAction, campItem) {
    clickElement({ campAction, campItem }, '[data-camp-action]');
  }

  const readSave = () => localStorage.getItem(window.FitnessRpgConfig.storageKeys.profile);
  return { profile, camp, document, confirmations, messages, focusTargets, click, clickElement, readSave };
}

test('annuler une confirmation d’achat préserve la bourse et l’inventaire', () => {
  const { profile, confirmations, messages, click, readSave } = createCamp(false);
  const previousSave = readSave();
  click('buy', 'garnet-headband');

  assert.equal(confirmations.length, 1);
  assert.match(confirmations[0], /Bandeau grenat.*40 PO/);
  assert.equal(profile.camp.gold, 100);
  assert.equal(profile.camp.owned.length, 0);
  assert.equal(readSave(), previousSave);
  assert.equal(messages.length, 0);
});

test('confirmer l’achat débite le prix et rend le focus à un bouton visible', () => {
  const { profile, confirmations, messages, focusTargets, click, readSave } = createCamp(true);
  click('buy', 'garnet-headband');

  assert.equal(confirmations.length, 1);
  assert.equal(profile.camp.gold, 60);
  assert.ok(profile.camp.owned.includes('garnet-headband'));
  assert.deepEqual(JSON.parse(readSave()).camp.owned, ['garnet-headband']);
  assert.match(messages[0], /rejoint ton inventaire/);
  assert.deepEqual(focusTargets, ['visible']);

  click('equip', 'garnet-headband');
  click('remove', 'garnet-headband');
  click('freeze');
  assert.equal(confirmations.length, 1);
  assert.ok(!profile.camp.equipped.head);
  assert.equal(profile.camp.gold, 0);
});

test('les flèches parcourent leur catégorie et conservent le focus lorsque la fin est atteinte', () => {
  const { camp, document, confirmations, clickElement } = createCamp(false);
  const calls = [];
  const focused = [];
  const category = { dataset: { campShopSlot: 'aura' } };
  const previous = { dataset: { campShopStep: '-1' }, focus: () => focused.push('précédent') };
  const next = { dataset: { campShopStep: '1' }, focus: () => focused.push('suivant') };
  const anotherCategory = {
    dataset: { campShopSlot: 'cape' },
    querySelectorAll: () => [{ ...next, focus: () => focused.push('autre catégorie') }]
  };
  camp.stepShop = (slot, step) => {
    calls.push([slot, step]);
    const refreshedCategory = { ...category, querySelectorAll: () => calls.length === 1 ? [previous, next] : [previous] };
    document.querySelectorAll = () => [anotherCategory, refreshedCategory];
  };
  const showNext = () => clickElement({ campShopStep: '1' }, '[data-camp-shop-step]', category);
  showNext();
  showNext();

  assert.deepEqual(calls, [['aura', 1], ['aura', 1]]);
  assert.deepEqual(focused, ['suivant', 'précédent']);
  assert.equal(confirmations.length, 0);
});
