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

  function candidateSources(gender, levelText, level) {
    return [
      `assets/heroes/${gender}/level_${levelText}.jpg`,
      `assets/heroes/${gender}/level_${levelText}.png`,
      `assets/heroes/${gender}/level_${levelText}.webp`,
      `assets/heroes/${gender}/level_${level}.jpg`,
      `assets/heroes/${gender}/level_${level}.png`,
      `assets/heroes/${gender}/${levelText}.jpg`,
      `assets/heroes/${gender}/${levelText}.png`,
      `assets/heroes/${gender}/${level}.jpg`,
      `assets/heroes/${gender}/${level}.png`,
    ];
  }

  window.tryNextHeroImage = function tryNextHeroImage(img) {
    const sources = JSON.parse(img.dataset.sources || "[]");
    const nextIndex = Number(img.dataset.sourceIndex || 0) + 1;

    if (nextIndex < sources.length) {
      img.dataset.sourceIndex = String(nextIndex);
      img.src = sources[nextIndex];
      return;
    }

    img.style.display = "none";
    const fallback = img.parentElement.querySelector(".hero-fallback-svg");
    const warning = img.parentElement.querySelector(".hero-missing-warning");
    if (fallback) fallback.style.display = "block";
    if (warning) warning.style.display = "block";
  };

  function heroImageSvg(currentStage) {
    const level = getHeroLevel();
    const gender = getHeroGender();
    const levelText = paddedLevel(level);
    const sources = candidateSources(gender, levelText, level);
    const alt = `${gender === "femme" ? "Héroïne" : "Héros"} niveau ${level}`;
    const fallback = fallbackHeroSvg ? fallbackHeroSvg(currentStage) : "";
    const expectedPath = `assets/heroes/${gender}/level_${levelText}.jpg`;

    return `
      <div class="hero-level-frame">
        <img
          class="hero-level-image"
          src="${sources[0]}"
          alt="${alt}"
          loading="eager"
          data-source-index="0"
          data-sources='${JSON.stringify(sources)}'
          onerror="window.tryNextHeroImage(this)"
        />
        <div class="hero-fallback-svg" style="display:none">${fallback}</div>
        <div class="hero-missing-warning" style="display:none">
          Image manquante :<br><code>${expectedPath}</code>
        </div>
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
