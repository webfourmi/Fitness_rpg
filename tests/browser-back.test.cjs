const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function boot() {
  const source = readFileSync(join(__dirname, '..', 'app-navigation.js'), 'utf8');
  const nodes = new Map();
  const entries = [null];
  let cursor = 0;
  let flush = () => {};
  let onPop;
  let exerciseView = null;
  const activeSession = { id: 'séance-1', completedExerciseKeys: ['0-walk'] };
  const timer = { id: 'timer-1', context: { sessionId: activeSession.id }, endsAt: 1234 };
  const profile = { id: 'alix' };

  const addNode = (id, zIndex = 0) => {
    const classes = new Set(['hidden']);
    const node = {
      id, zIndex, dataset: {},
      classList: {
        contains: (className) => classes.has(className),
        remove: (className) => classes.delete(className),
        add: (className) => classes.add(className)
      }
    };
    nodes.set(id, node);
    return node;
  };
  const detail = addNode('programDetail');
  addNode('exerciseList');
  const makeVisible = (id, zIndex) => {
    const node = nodes.get(id) || addNode(id, zIndex);
    node.classList.remove('hidden');
    return node;
  };
  const document = {
    body: {},
    addEventListener() {},
    getElementById: (id) => nodes.get(id) || null,
    querySelector(selector) {
      if (selector === '#programDetail:not(.hidden)') {
        return detail.classList.contains('hidden') ? null : detail;
      }
      if (selector === '#exerciseList .exercise-category-detail-page' && exerciseView === 'category') return {};
      return null;
    }
  };
  const state = {
    page: 'home',
    setPage(page) { this.page = page; },
    getPage() { return this.page; },
    getProfile: () => profile,
    hasProfile: () => Boolean(profile),
    getActiveProgramSession: () => activeSession,
    getActiveTimerSession: () => timer
  };
  const programs = {
    openProgramDetail(programId, programOptions) {
      detail.classList.remove('hidden');
      detail.dataset.programId = programId;
      this.programBrowser = { ...programOptions };
    }
  };
  const exercises = {
    renderCategoryExercises(categoryId, exercisePage) {
      this.currentCategoryId = categoryId;
      this.currentExercisePage = exercisePage;
      exerciseView = 'category';
    },
    stopTimer(options) {
      assert.equal(options.clearState, false);
      nodes.get('exerciseTimerOverlay').classList.add('hidden');
    }
  };
  const render = {
    renderAll() {
      if (state.page === 'programs') detail.classList.add('hidden');
      if (state.page === 'exercises') exerciseView = null;
    },
    closeModal() {
      nodes.get('rpgModalOverlay').classList.add('hidden');
    }
  };
  const window = {
    FitnessRpgState: state,
    FitnessRpgConfig: { pages: ['home', 'training', 'camp', 'weight', 'programs', 'exercises', 'hero-setup'] },
    FitnessRpgPrograms: programs,
    FitnessRpgExercises: exercises,
    FitnessRpgRender: render,
    getComputedStyle: (node) => ({ zIndex: node.zIndex }),
    addEventListener: (event, handler) => { if (event === 'popstate') onPop = handler; },
    MutationObserver: class {
      constructor(callback) { flush = callback; }
      observe() {}
    },
    history: {
      get state() { return entries[cursor]; },
      replaceState(value) { entries[cursor] = structuredClone(value); },
      pushState(value) { entries.splice(++cursor, entries.length, structuredClone(value)); },
      back() { if (cursor > 0) onPop({ state: entries[--cursor] }); },
      forward() { if (cursor < entries.length - 1) onPop({ state: entries[++cursor] }); }
    }
  };
  vm.runInNewContext(source, { window, document });
  const navigation = window.FitnessRpgNavigation;
  navigation.init();
  return { window, state, navigation, programs, exercises, render, detail, flush, makeVisible };
}

test('Retour du téléphone et flèche de l’app suivent les écrans dans le même ordre', () => {
  const { window, state, navigation, flush } = boot();
  for (const page of ['training', 'camp', 'weight']) {
    navigation.setPage(page);
    flush();
  }
  window.history.back();
  assert.equal(state.page, 'camp');
  navigation.goBack();
  assert.equal(state.page, 'training');
  window.history.forward();
  assert.equal(state.page, 'camp');
});

test('Retour quitte le détail du programme sans effacer la séance validée ou le timer', () => {
  const { window, state, navigation, programs, detail, flush, makeVisible } = boot();
  navigation.setPage('programs');
  flush();
  programs.openProgramDetail('forge', { weekNumber: 2, dayNumber: 3, planningIndex: 5 });
  flush();
  const saved = state.getActiveProgramSession();
  const timer = state.getActiveTimerSession();
  const timerDialog = makeVisible('exerciseTimerOverlay', 100);
  const modal = makeVisible('rpgModalOverlay', 200);
  flush();

  window.history.back();
  assert.ok(modal.classList.contains('hidden'));
  assert.ok(!timerDialog.classList.contains('hidden'));
  window.history.back();
  assert.ok(timerDialog.classList.contains('hidden'));
  assert.ok(!detail.classList.contains('hidden'));
  window.history.back();
  assert.ok(detail.classList.contains('hidden'));
  assert.equal(state.page, 'programs');
  assert.strictEqual(state.getActiveProgramSession(), saved);
  assert.strictEqual(state.getActiveTimerSession(), timer);

  window.history.forward();
  assert.equal(detail.dataset.programId, 'forge');
  assert.equal(programs.programBrowser.weekNumber, 2);
  assert.equal(programs.programBrowser.planningIndex, 5);
});

test('un dialogue déjà fermé ne consomme pas un retour supplémentaire', () => {
  const { window, state, navigation, render, flush, makeVisible } = boot();
  navigation.setPage('camp');
  flush();
  makeVisible('rpgModalOverlay', 200);
  flush();
  render.closeModal();
  flush();
  window.history.back();
  assert.equal(state.page, 'home');
});

test('le retour de catégorie ne revient pas à elle au prochain retour', () => {
  const { window, state, navigation, exercises, flush } = boot();
  navigation.setPage('exercises');
  flush();
  exercises.renderCategoryExercises('mobility', 2);
  flush();
  assert.equal(navigation.browserHistory.backToList('exercises'), true);
  assert.equal(exercises.currentCategoryId, null);
  assert.equal(state.page, 'exercises');
  window.history.forward();
  assert.equal(exercises.currentCategoryId, 'mobility');
  assert.equal(exercises.currentExercisePage, 2);
  window.history.back();
  window.history.back();
  assert.equal(state.page, 'home');
});
