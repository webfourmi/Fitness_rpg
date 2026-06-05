function initXpCurveV443() {
  if (window.__xpCurveV443Ready) return;
  window.__xpCurveV443Ready = true;

  const VERSION = "0.4.4.3";
  const DISPLAY_VERSION = "V4.4.3";

  function xpNeededForLevel(level) {
    return Math.max(1, Number(level) || 1) * 100;
  }

  function totalXpForLevel(level) {
    const targetLevel = Math.max(1, Number(level) || 1);
    return ((targetLevel - 1) * targetLevel / 2) * 100;
  }

  function levelFromTotalXp(totalXp) {
    const xp = Math.max(0, Number(totalXp) || 0);
    let level = 1;
    while (xp >= totalXpForLevel(level + 1)) level += 1;
    const currentLevelStart = totalXpForLevel(level);
    const nextLevelTotal = totalXpForLevel(level + 1);
    return {
      level,
      currentXp: xp - currentLevelStart,
      nextXp: nextLevelTotal - currentLevelStart,
      currentLevelStart,
      nextLevelTotal,
      totalXp: xp
    };
  }

  function patchGlobals() {
    try {
      need = xpNeededForLevel;
      levelInfo = levelFromTotalXp;
    } catch {}

    window.XpCurveV443 = {
      xpNeededForLevel,
      totalXpForLevel,
      levelFromTotalXp
    };

    if (window.FitnessRpgConfig) {
      window.FitnessRpgConfig.version = VERSION;
      window.FitnessRpgConfig.displayVersion = DISPLAY_VERSION;
      window.FitnessRpgConfig.xpCurve = {
        type: "progressive-triangular",
        formula: "niveau courant × 100 XP",
        examples: [
          { level: 2, total: 100 },
          { level: 3, total: 300 },
          { level: 4, total: 600 },
          { level: 5, total: 1000 },
          { level: 6, total: 1500 }
        ]
      };
    }
  }

  function setVersionLabels() {
    document.title = `Fitness RPG - ${DISPLAY_VERSION}`;
    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((node) => {
      node.textContent = VERSION;
    });
    const eyebrow = document.querySelector(".hero-header .eyebrow");
    if (eyebrow) eyebrow.textContent = `Fitness RPG · ${DISPLAY_VERSION}`;
  }

  function renderXpCurvePanel() {
    const heroInfo = document.querySelector(".hero-info");
    if (!heroInfo || !profile) return;

    const info = levelFromTotalXp(profile.totalXp || 0);
    let panel = document.querySelector("#xpCurvePanel");
    if (!panel) {
      panel = document.createElement("section");
      panel.id = "xpCurvePanel";
      panel.className = "xp-curve-panel";
      heroInfo.appendChild(panel);
    }

    const startLevel = Math.max(1, info.level - 1);
    const levels = Array.from({ length: 5 }, (_, i) => startLevel + i + 1);
    panel.innerHTML = `
      <h3>Progression XP</h3>
      <p>Nouvelle courbe : niveau 2 à 100 XP, niveau 3 à 300 XP, niveau 4 à 600 XP, niveau 5 à 1000 XP.</p>
      <div class="xp-curve-grid">
        ${levels.map((level) => {
          const total = totalXpForLevel(level);
          return `<article class="xp-curve-cell ${level === info.level ? "current" : ""}"><strong>Niv. ${level}</strong><span>${total} XP total</span></article>`;
        }).join("")}
      </div>
    `;
  }

  function patch() {
    patchGlobals();
    setVersionLabels();
    renderXpCurvePanel();
  }

  patch();

  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__xpCurveRenderPatched) {
    window.__xpCurveRenderPatched = true;
    render = function xpCurveRender() {
      patchGlobals();
      oldRender();
      patch();
    };
    render();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initXpCurveV443);
} else {
  initXpCurveV443();
}
