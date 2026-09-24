const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const plain = (value) => JSON.parse(JSON.stringify(value));

function boot() {
  const records = new Map();
  const localStorage = {
    get length() { return records.size; },
    key: (index) => [...records.keys()][index] ?? null,
    getItem: (key) => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, String(value)),
    removeItem: (key) => records.delete(key)
  };
  const nodes = new Map();
  const document = {
    readyState: 'loading',
    addEventListener() {},
    querySelector: (selector) => nodes.get(selector) || null,
    querySelectorAll: () => []
  };
  const window = { addEventListener() {}, confirm: () => true };
  const context = vm.createContext({ window, document, localStorage, console, Blob, Intl });
  for (const name of ['app-config.js', 'app-data.js', 'app-state.js', 'app-render.js',
    'app-exercises.js', 'app-navigation.js', 'app-backup.js']) {
    vm.runInContext(readFileSync(path.join(root, name), 'utf8'), context, { filename: name });
  }
  const state = window.FitnessRpgState;
  state.setProfile(state.createDefaultProfile({ name: 'Test', gender: 'femme' }));
  return { window, state, localStorage, nodes, backup: window.FitnessRpgBackup,
    exercises: window.FitnessRpgExercises, render: window.FitnessRpgRender,
    navigation: window.FitnessRpgNavigation, ids: window.FitnessRpgData.exercises.map((e) => e.id) };
}

test('un ancien profil reçoit des favoris vides sans changer sa progression', () => {
  const { state, localStorage } = boot();
  const old = { ...state.getProfile(), totalXp: 750, badges: ['test'], customPrograms: [{ id: 'perso' }] };
  delete old.favoriteExerciseIds;
  localStorage.setItem(state.getKeys().profile, JSON.stringify(old));
  state.loadProfile();
  assert.deepEqual(plain(state.getFavoriteExerciseIds()), []);
  const loaded = plain(state.getProfile());
  delete loaded.favoriteExerciseIds;
  assert.deepEqual(loaded, plain(old));
});

test('ajout et retrait des favoris survivent au rechargement sans toucher aux autres données', () => {
  const { state, localStorage, ids } = boot();
  const before = plain(state.getProfile());
  const beforeKeys = localStorage.length;
  assert.equal(state.toggleFavoriteExercise(ids[0]), true);
  state.loadProfile();
  assert.deepEqual(plain(state.getFavoriteExerciseIds()), [ids[0]]);
  assert.equal(state.toggleFavoriteExercise(ids[1]), true);
  assert.equal(state.toggleFavoriteExercise(ids[0]), false);
  state.loadProfile();
  assert.deepEqual(plain(state.getFavoriteExerciseIds()), [ids[1]]);
  assert.equal(localStorage.length, beforeKeys);
  const after = plain(state.getProfile());
  delete before.favoriteExerciseIds; delete after.favoriteExerciseIds;
  delete before.updatedAt; delete after.updatedAt;
  assert.deepEqual(after, before);
  assert.equal(state.toggleFavoriteExercise('inexistant'), null);
  state.profile = null;
  assert.equal(state.toggleFavoriteExercise(ids[0]), null);
});

test('un échec de sauvegarde des favoris conserve le profil en mémoire et sur disque', () => {
  const { state, localStorage, ids } = boot();
  const before = JSON.stringify(state.getProfile());
  const stored = localStorage.getItem(state.getKeys().profile);
  localStorage.setItem = () => { throw new Error('QuotaExceededError'); };
  assert.throws(() => state.toggleFavoriteExercise(ids[0]), /QuotaExceededError/);
  assert.equal(JSON.stringify(state.getProfile()), before);
  assert.equal(localStorage.getItem(state.getKeys().profile), stored);
});

test('la suppression vise une seule pesée, même sans id ou avec des ids identiques', () => {
  const { state } = boot();
  const weights = [
    { date: '2026-09-01', value: 81 },
    { id: 'same', date: '2026-09-02', value: 80 },
    { id: 'same', date: '2026-09-02', value: 79 }
  ];
  state.saveWeights(weights);
  const profile = JSON.stringify(state.getProfile());
  assert.equal(state.deleteWeightAt(1, JSON.stringify(weights[1])), true);
  assert.deepEqual(plain(state.getWeights()), [weights[0], weights[2]]);
  assert.equal(state.deleteWeightAt(0, JSON.stringify(weights[0])), true);
  assert.deepEqual(plain(state.getWeights()), [weights[2]]);
  assert.equal(state.deleteWeightAt(0, JSON.stringify(weights[2])), true);
  assert.deepEqual(plain(state.getWeights()), []);
  assert.equal(JSON.stringify(state.getProfile()), profile);
});

test('une mesure périmée ou un index invalide ne supprime rien', () => {
  const { state } = boot();
  const weights = [{ date: '2026-09-01', value: 81 }];
  state.saveWeights(weights);
  for (const index of [-1, 2, 0.5, NaN]) {
    assert.equal(state.deleteWeightAt(index, JSON.stringify(weights[0])), false);
  }
  assert.equal(state.deleteWeightAt(0, JSON.stringify({ ...weights[0], value: 80 })), false);
  assert.deepEqual(plain(state.getWeights()), weights);
});

test('un échec de stockage ne fait pas disparaître la pesée', () => {
  const { state, localStorage } = boot();
  const entry = state.addWeight(80);
  localStorage.setItem = () => { throw new Error('QuotaExceededError'); };
  assert.throws(() => state.deleteWeightAt(0, JSON.stringify(entry)), /QuotaExceededError/);
  assert.deepEqual(plain(state.getWeights()), [plain(entry)]);
});

test('export et restauration conservent les favoris et les pesées restantes', () => {
  const { state, backup, ids } = boot();
  state.toggleFavoriteExercise(ids[0]);
  const removed = state.addWeight(81, '2026-09-01');
  const kept = state.addWeight(80, '2026-09-02');
  state.deleteWeightAt(0, JSON.stringify(removed));
  const exported = JSON.parse(JSON.stringify(backup.buildBackup()));
  const validated = backup.validateBackupObject(exported);
  assert.equal(validated.valid, true, validated.errors.join('; '));
  state.toggleFavoriteExercise(ids[0]);
  state.clearWeights();
  backup.applyRecordsTransaction(validated.records);
  state.loadProfile();
  assert.deepEqual(plain(state.getFavoriteExerciseIds()), [ids[0]]);
  assert.deepEqual(plain(state.getWeights()), [plain(kept)]);

  const oldProfile = JSON.parse(exported.data.records[state.getKeys().profile]);
  delete oldProfile.favoriteExerciseIds;
  exported.data.records[state.getKeys().profile] = JSON.stringify(oldProfile);
  assert.equal(backup.validateBackupObject(exported).valid, true);
  backup.applyRecordsTransaction(exported.data.records);
  state.loadProfile();
  assert.deepEqual(plain(state.getFavoriteExerciseIds()), []);
});

test('un import mal formé des favoris est refusé', () => {
  const { state, backup } = boot();
  for (const value of ['bad', [null], [{}], ['']]) {
    const profile = { ...plain(state.getProfile()), favoriteExerciseIds: value };
    const errors = [];
    backup.validateProfile(profile, errors);
    assert.ok(errors.some((error) => error.includes('favoris')));
  }
});

test('toutes les pesées sont affichées et la courbe et le résumé suivent la suppression', () => {
  const { state, nodes, render } = boot();
  for (const id of ['weightChart', 'weightSummary', 'weightHistory', 'weightHistoryCount', 'weightChartRange']) {
    nodes.set(`#${id}`, { innerHTML: '', textContent: '' });
  }
  let plotted;
  render.drawWeightChart = (canvas, weights) => { plotted = weights; };
  const weights = Array.from({ length: 12 }, (_, i) => ({ date: `2026-09-${String(i + 1).padStart(2, '0')}`, value: 90 - i }));
  state.saveWeights(weights.slice().reverse());
  render.renderWeight();
  const history = nodes.get('#weightHistory');
  assert.equal((history.innerHTML.match(/class="ghost-btn delete-weight-btn"/g) || []).length, 12);
  assert.equal(history.innerHTML.match(/data-weight-index="(\d+)"/)[1], '0');
  assert.equal(plotted.length, 12);
  state.deleteWeightAt(0, JSON.stringify(weights[11]));
  render.renderWeight();
  assert.equal(plotted.length, 11);
  assert.match(nodes.get('#weightSummary').innerHTML, /80 kg/);
  state.clearWeights();
  render.renderWeight();
  assert.equal(plotted.length, 0);
  assert.match(history.innerHTML, /Aucune mesure enregistrée/);
});

test('la confirmation annule ou supprime uniquement la pesée sélectionnée', () => {
  const { state, window, navigation, render } = boot();
  const entry = state.addWeight(80);
  const button = { dataset: { weightIndex: '0', weightEntry: JSON.stringify(entry) } };
  render.renderWeight = () => {};
  const messages = [];
  navigation.showMessage = (message) => messages.push(message);
  window.confirm = () => false;
  navigation.deleteWeight(button);
  assert.equal(state.getWeights().length, 1);
  window.confirm = (message) => { assert.match(message, /80 kg/); return true; };
  navigation.deleteWeight(button);
  assert.equal(state.getWeights().length, 0);
  navigation.deleteWeight(button);
  assert.equal(messages.at(-1).title, 'Historique actualisé');
});

test('les favoris sont avant le programme perso et leurs cartes gardent les actions habituelles', () => {
  const { state, exercises, ids, nodes } = boot();
  const container = { innerHTML: '' };
  nodes.set('#exercisesContent', container);
  state.toggleFavoriteExercise(ids[0]);
  exercises.renderCategories();
  assert.ok(container.innerHTML.indexOf('Mes exercices favoris') < container.innerHTML.indexOf('Crée ton propre programme'));
  assert.match(container.innerHTML, /aria-pressed="true"/);
  assert.match(container.innerHTML, /validate-exercise-btn/);
  const card = exercises.exerciseCardHtml(exercises.getExercise(ids[1]));
  assert.match(card, /aria-pressed="false"/);
  assert.match(card, /Ajouter .* aux favoris/);
});
