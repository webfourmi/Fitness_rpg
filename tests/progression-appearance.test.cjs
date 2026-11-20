const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');
const test = require('node:test');

function element(classes = []) {
  const classSet = new Set(classes);
  return {
    innerHTML: '',
    textContent: '',
    classList: {
      add: (name) => classSet.add(name),
      remove: (name) => classSet.delete(name),
      contains: (name) => classSet.has(name),
      toggle(name, force = !classSet.has(name)) {
        if (force) classSet.add(name);
        else classSet.delete(name);
        return force;
      }
    },
    setAttribute(name, value) { this[name] = value; }
  };
}

function boot(gender, level) {
  const nodes = {
    '#heroEvolutionCarousel': element(),
    '#levelUpOverlay': element(['hidden']),
    '#levelUpText': element(),
    '#levelUpTitle': element(),
    '#levelUpReward': element()
  };
  const window = {};
  const document = { querySelector: (selector) => nodes[selector] || null, body: element() };
  const records = new Map();
  const localStorage = {
    getItem: (key) => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, value)
  };
  const context = vm.createContext({ window, document, localStorage, structuredClone, console });
  for (const file of ['config', 'state', 'camp', 'progress', 'render']) {
    const filename = 'app-' + file + '.js';
    vm.runInContext(readFileSync(join(__dirname, '..', filename), 'utf8'), context, { filename });
  }
  const {
    FitnessRpgState: state,
    FitnessRpgConfig: config,
    FitnessRpgCamp: camp,
    FitnessRpgProgress: progress,
    FitnessRpgRender: render
  } = window;
  const profile = state.createDefaultProfile({ name: 'Alix', gender });
  profile.totalXp = config.totalXpForLevel(level);
  state.setProfile(profile);
  camp.resolveOvernight();
  profile.camp.gold = 100;
  return { profile, config, camp, progress, render, nodes };
}

test('le portrait équipé reste le même quand on parcourt les anciens paliers', () => {
  const { profile, camp, render, nodes } = boot('femme', 10);
  const portrait = nodes['#heroEvolutionCarousel'];
  camp.mutate('buy', 'emerald-cloak');
  camp.mutate('equip', 'emerald-cloak');

  render.renderHeroEvolutionCarousel();
  assert.match(portrait.innerHTML, /Niveau 10\b/);
  assert.match(portrait.innerHTML, /assets\/heros-campement\/heroine\.webp/);
  assert.match(portrait.innerHTML, /\bcamp-avatar--aventurier\b/);
  assert.match(portrait.innerHTML, /\bcamp-avatar--rank-champion\b/);

  render.changeHeroEvolutionLevel(-1);
  assert.match(portrait.innerHTML, /Niveau 9\b/);
  assert.match(portrait.innerHTML, /assets\/heros-campement\/heroine\.webp/);
  assert.match(portrait.innerHTML, /\bcamp-avatar--aventurier\b/);
  assert.match(portrait.innerHTML, /\bcamp-avatar--rank-aventurier\b/);

  camp.mutate('remove', 'emerald-cloak');
  render.renderHeroEvolutionCarousel();
  assert.doesNotMatch(portrait.innerHTML, /(?:\s|")camp-avatar--aventurier(?:\s|")/);
  assert.equal(profile.totalXp, 4500);
  assert.equal(profile.camp.gold, 0);
});

test('la progression affiche aussi le niveau réel au-delà du palier 20', () => {
  const { config, profile, render, nodes } = boot('homme', 26);
  const portrait = nodes['#heroEvolutionCarousel'];

  render.renderHeroEvolutionCarousel();
  assert.match(portrait.innerHTML, /Niveau 26\b/);
  assert.match(portrait.innerHTML, /assets\/heros-campement\/heros\.webp/);
  assert.match(portrait.innerHTML, /\bcamp-avatar--rank-mythique\b/);

  render.changeHeroEvolutionLevel(1);
  assert.match(portrait.innerHTML, /Niveau 26\b/);

  profile.totalXp = config.totalXpForLevel(27);
  render.renderHeroEvolutionCarousel();
  assert.match(portrait.innerHTML, /Niveau 27\b/);
});

test('la montée de rang affiche le portrait habillé et conserve le coffre de familier', () => {
  const { profile, camp, progress, render, nodes } = boot('homme', 10);
  camp.mutate('buy', 'moon-aura');
  camp.mutate('equip', 'moon-aura');
  profile.familiars = [{ id: 'gardien', name: 'Gardien', image: 'assets/familiers/gardien.webp' }];
  profile.levelFamiliarRewards = { 10: { familiarId: 'gardien' } };
  progress.queueLevelUpModal(9, 10);

  render.renderLevelUpOverlay();
  const text = nodes['#levelUpText'].innerHTML;
  assert.equal(nodes['#levelUpTitle'].textContent, 'Niveau 10 atteint !');
  assert.equal(nodes['#levelUpOverlay'].classList.contains('hidden'), false);
  assert.equal(Array.from(text.matchAll(/assets\/heros-campement\/heros\.webp/g)).length, 1);
  assert.match(text, /\bcamp-avatar--lunaire\b/);
  assert.match(text, /\bcamp-avatar--rank-champion\b/);
  assert.match(text, /Niv\. 9.*Niv\. 10/s);
  assert.match(text, /level-up-chest-button/);
  assert.match(text, /Gardien/);
  assert.match(nodes['#levelUpReward'].textContent, /Coffre de familier/);
  assert.doesNotMatch(text, /nouvelle apparence/i);
  assert.doesNotMatch(text, /level-up-gold-reward/);
});

test('la bourse de PO est annoncée en plus du coffre de montée en niveau', () => {
  const { profile, progress, render, nodes } = boot('femme', 2);
  profile.levelFamiliarRewards = { 2: { allCollected: true } };
  progress.queueLevelUpModal(1, 2);
  progress.peekLevelUpModal().gold = 20;

  render.renderLevelUpOverlay();
  const text = nodes['#levelUpText'].innerHTML;
  assert.match(text, /level-up-gold-reward[^>]*>[\s\S]*?\b20\s*PO\b/);
  assert.match(text, /Collection complète/);
});
