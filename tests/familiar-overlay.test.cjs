const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

test('le portrait agrandi reprend le familier et les teintes du héros uniquement', () => {
  const sourceFamiliar = { src: 'https://fitness.test/assets/familiers/ecureuil.webp', alt: 'Écureuil' };
  const familiar = {
    hidden: true,
    removeAttribute(name) { delete this[name]; }
  };
  familiar.classList = { toggle: (_, hidden) => { familiar.hidden = hidden; } };
  const sourceAvatar = {
    className: 'camp-avatar camp-avatar--grenat camp-avatar--rank-step-2',
    style: { cssText: '--camp-head-hue: 40deg;' },
    querySelector: () => sourceFamiliar
  };
  const overlayAvatar = { style: {}, querySelector: () => familiar };
  const label = {};
  const overlay = { classList: { remove() {} }, setAttribute() {} };
  const nodes = {
    '#heroImage': {
      src: 'https://fitness.test/assets/heros-campement/heroine.webp',
      closest: () => sourceAvatar
    },
    '#coachImage': { src: 'https://fitness.test/assets/coach.webp' },
    '#imageOverlay': overlay,
    '#imageOverlayImg': {},
    '#imageOverlayAvatar': overlayAvatar,
    '#imageOverlayTitle': label
  };
  const window = {
    FitnessRpgState: { getProfile: () => ({ name: 'Aventurière' }) },
    FitnessRpgData: { getCoach: () => ({ fullName: 'Korvan' }) }
  };
  const document = { querySelector: (selector) => nodes[selector] || null };
  const context = vm.createContext({ window, document });
  const filename = 'app-media.js';
  vm.runInContext(readFileSync(join(__dirname, '..', filename), 'utf8'), context, { filename });

  window.FitnessRpgMedia.openHeroImage();
  assert.equal(label.textContent, 'Aventurière');
  assert.equal(overlayAvatar.className, sourceAvatar.className);
  assert.equal(overlayAvatar.style.cssText, sourceAvatar.style.cssText);
  assert.equal(familiar.hidden, false);
  assert.equal(familiar.src, sourceFamiliar.src);
  assert.equal(familiar.alt, sourceFamiliar.alt);

  window.FitnessRpgMedia.openCoachImage();
  assert.equal(label.textContent, 'Korvan');
  assert.equal(overlayAvatar.className, 'camp-avatar');
  assert.equal(overlayAvatar.style.cssText, '');
  assert.equal(familiar.hidden, true);
  assert.equal(familiar.src, undefined);
  assert.equal(familiar.alt, '');
});
