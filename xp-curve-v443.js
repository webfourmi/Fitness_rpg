function initXpCurveV443() {
  if (window.__xpCurveV443Ready) return;
  window.__xpCurveV443Ready = true;

  
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
  window.FitnessRpgConfig?.setVersionLabels?.();
}

  function removeXpCurvePanel() {
    document.querySelector("#xpCurvePanel")?.remove();
  }

  function patch() {
    patchGlobals();
    setVersionLabels();
    removeXpCurvePanel();
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
