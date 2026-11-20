const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function boot() {
  class Element {
    constructor(id, value = '') {
      this.id = id;
      this.value = value;
      this.classList = {
        toggle: (name, force) => { this.hidden = name === 'hidden' && force; }
      };
    }

    matches(selector) {
      return selector.split(', ').includes('#' + this.id);
    }

    setAttribute(name, value) {
      this[name] = value;
    }
  }

  const records = new Map();
  const localStorage = {
    getItem: (key) => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, value)
  };
  const ids = ['weightChart', 'weightSummary', 'weightHistory', 'weightHistoryCount',
    'weightChartRange', 'weightView', 'weightPeriod', 'weightPeriodPicker'];
  const nodes = Object.fromEntries(ids.map((id) => [id, new Element(id)]));
  const document = { querySelector: (selector) => nodes[selector.slice(1)] || null };
  const window = {};
  const getComputedStyle = () => ({ getPropertyValue: () => '' });
  const context = vm.createContext({ window, localStorage, document, Element, getComputedStyle });
  for (const name of ['app-config.js', 'app-state.js', 'app-render.js', 'app-navigation.js']) {
    vm.runInContext(readFileSync(join(__dirname, '..', name), 'utf8'), context, { filename: name });
  }
  const { FitnessRpgRender: render, FitnessRpgState: state, FitnessRpgNavigation: navigation } = window;
  return { render, state, navigation, nodes };
}

test('une pesée datée appartient à sa semaine locale du lundi au dimanche et à son mois civil', () => {
  const { render, state } = boot();
  const sunday = render.getWeightDate('2026-11-01');
  const monday = render.getWeightDate('2026-11-02');
  assert.equal(state.dateKeyFromDate(sunday), '2026-11-01');
  const previousWeek = render.getWeightPeriod(sunday, 'week');
  assert.equal(previousWeek.key, '2026-10-26');
  assert.equal(state.dateKeyFromDate(previousWeek.end), '2026-11-01');
  assert.equal(render.getWeightPeriod(monday, 'week').key, '2026-11-02');
  assert.equal(render.getWeightPeriod(sunday, 'month').key, '2026-11-01');
  const leapFebruary = render.getWeightPeriod(render.getWeightDate('2024-02-10'), 'month');
  assert.equal(state.dateKeyFromDate(leapFebruary.end), '2024-02-29');
  assert.equal(render.getWeightDate('2026-02-30'), null);
});

test('les sélecteurs actualisent le graphique, le résumé et les index de suppression du bon intervalle', () => {
  const { render, state, navigation, nodes } = boot();
  const records = [
    { date: '2026-11-06', value: 79 },
    { date: '2026-10-31', value: 83 },
    { at: '2026-11-01T12:00:00', value: 81 },
    { date: '2026-11-02', value: 80 }
  ];
  let lastChart;
  state.saveWeights(records);
  render.drawWeightChart = (canvas, entries, period) => {
    lastChart = { ids: Array.from(entries, (entry) => entry.storageIndex), period };
  };

  nodes.weightView.value = 'week';
  navigation.handleDocumentInput({ target: nodes.weightView });
  assert.equal(nodes.weightPeriodPicker.hidden, false);
  assert.equal(nodes.weightPeriod.value, '2026-11-02');
  assert.deepEqual(lastChart.ids, [3, 0]);
  assert.match(nodes.weightSummary.innerHTML, /-1 kg/);
  assert.match(nodes.weightHistory.innerHTML, /data-weight-index="0"/);

  nodes.weightPeriod.value = '2026-10-26';
  navigation.handleDocumentInput({ target: nodes.weightPeriod });
  assert.deepEqual(lastChart.ids, [1, 2]);
  assert.equal(lastChart.period.key, '2026-10-26');
  assert.match(nodes.weightHistory.innerHTML, /data-weight-index="2"/);
  assert.equal(state.deleteWeightAt(2, JSON.stringify(records[2])), true);
  render.renderWeight();
  assert.equal(nodes.weightPeriod.value, '2026-10-26');
  assert.deepEqual(lastChart.ids, [1]);

  nodes.weightView.value = 'month';
  navigation.handleDocumentInput({ target: nodes.weightView });
  assert.equal(nodes.weightPeriod.value, '2026-11-01');
  assert.deepEqual(lastChart.ids, [2, 0]);
  assert.equal(nodes.weightChartRange.textContent, 'novembre 2026');
  assert.match(nodes.weightChart['aria-label'], /2 mesures/);

  nodes.weightView.value = 'all';
  navigation.handleDocumentInput({ target: nodes.weightView });
  assert.equal(nodes.weightPeriodPicker.hidden, true);
  assert.deepEqual(lastChart.ids, [1, 2, 0]);
});

test('sur petit écran le graphique espace les points selon les dates réelles', () => {
  const { render } = boot();
  const points = [];
  const noop = () => {};
  const ctx = {
    setTransform: noop, clearRect: noop, fillText: noop, beginPath: noop, moveTo: noop,
    lineTo: noop, stroke: noop, fill: noop, closePath: noop,
    createLinearGradient: () => ({ addColorStop: noop }),
    arc: (x) => points.push(x)
  };
  const canvas = { parentElement: { clientWidth: 280 }, style: {}, getContext: () => ctx };
  const dateAt = (day) => render.getWeightDate('2026-11-0' + day);
  const period = render.getWeightPeriod(dateAt(2), 'week');
  render.drawWeightChart(canvas, [
    { measureDate: dateAt(2), value: 80 }, { measureDate: dateAt(3), value: 79 },
    { measureDate: dateAt(8), value: 78 }
  ], period);
  assert.equal(canvas.style.width, '280px');
  assert.equal(points.length, 3);
  assert.ok(Math.abs((points[1] - points[0]) / (points[2] - points[0]) - 1 / 6) < .0001);
});
