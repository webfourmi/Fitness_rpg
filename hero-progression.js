function initHeroProgressionImages() {
  if (window.__heroProgressionReady) return;
  window.__heroProgressionReady = true;

  const fallbackHeroSvg = typeof heroSvg === "function" ? heroSvg : null;

  function paddedLevel(level) {
    return String(Math.max(1, Math.min(20, Number(level) || 1))).padStart(2, "0");
  }

  function getHeroLevel() {
    try {
      if (typeof profile !== "undefined" && profile && typeof levelInfo === "function") {
        return Math.max(1, Math.min(20, levelInfo(profile.totalXp || 0).level));
      }
    } catch (error) {
      console.warn("Impossible de calculer le niveau du héros", error);
    }
    return 1;
  }

  function getHeroGender() {
    try {
      if (typeof profile !== "undefined" && profile && profile.gender === "femme") return "femme";
    } catch {}
    return "homme";
  }

  function heroImageSvg(currentStage) {
    const level = getHeroLevel();
    const gender = getHeroGender();
    const levelText = paddedLevel(level);
    const src = `assets/heroes/${gender}/level_${levelText}.jpg`;
    const alt = `${gender === "femme" ? "Héroïne" : "Héros"} niveau ${level}`;
    const fallback = fallbackHeroSvg ? fallbackHeroSvg(currentStage) : "";

    return `
      <div class="hero-level-frame">
        <img
          class="hero-level-image"
          src="${src}"
          alt="${alt}"
          loading="eager"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
        />
        <div class="hero-fallback-svg" style="display:none">${fallback}</div>
        <div class="hero-level-badge">Niv. ${level}</div>
      </div>
    `;
  }

  try {
    if (typeof heroSvg === "function") {
      heroSvg = heroImageSvg;
      if (typeof render === "function") render();
    }
  } catch (error) {
    console.warn("Impossible d’appliquer les images de progression du héros", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeroProgressionImages);
} else {
  initHeroProgressionImages();
}
