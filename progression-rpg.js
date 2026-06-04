function initRpgProgression() {
  if (window.__rpgProgressionReady) return;
  window.__rpgProgressionReady = true;

  const BADGE_KEY = "sportRpgV1RpgBadges";
  const LAST_LEVEL_KEY = "sportRpgV1LastSeenLevel";

  const RPG_BADGES = [
    { id: "lvl5", icon: "🛡️", title: "Premier palier", text: "Atteindre le niveau 5.", kind: "Progression", condition: () => currentLevel() >= 5 },
    { id: "lvl10", icon: "⚔️", title: "Guerrier confirmé", text: "Atteindre le niveau 10.", kind: "Progression", condition: () => currentLevel() >= 10 },
    { id: "lvl15", icon: "🔥", title: "Champion ardent", text: "Atteindre le niveau 15.", kind: "Progression", condition: () => currentLevel() >= 15 },
    { id: "lvl20", icon: "👑", title: "Légende vivante", text: "Atteindre le niveau 20.", kind: "Progression", condition: () => currentLevel() >= 20 },
    { id: "chest-bronze", icon: "🧰", title: "Coffre de bronze", text: "Récompense de niveau 5.", kind: "Coffres", condition: () => currentLevel() >= 5 },
    { id: "chest-silver", icon: "🪙", title: "Coffre d’argent", text: "Récompense de niveau 10.", kind: "Coffres", condition: () => currentLevel() >= 10 },
    { id: "chest-gold", icon: "💎", title: "Coffre d’or", text: "Récompense de niveau 15.", kind: "Coffres", condition: () => currentLevel() >= 15 },
    { id: "chest-legend", icon: "👑", title: "Coffre légendaire", text: "Récompense de niveau 20.", kind: "Coffres", condition: () => currentLevel() >= 20 },
  ];

  function currentLevel() {
    try {
      return typeof profile !== "undefined" && profile && typeof levelInfo === "function" ? levelInfo(profile.totalXp || 0).level : 1;
    } catch {
      return 1;
    }
  }

  function getRankTitle(level) {
    if (level <= 4) return "Novice";
    if (level <= 9) return "Aventurier";
    if (level <= 14) return "Champion";
    if (level <= 19) return "Légende";
    return "Héros mythique";
  }

  function getChestReward(level) {
    if (level === 5) return { icon: "🧰", title: "Coffre de bronze", text: "Premier palier franchi. Ton héros débloque une récompense de bronze." };
    if (level === 10) return { icon: "🪙", title: "Coffre d’argent", text: "Ton héros devient confirmé. Récompense spéciale débloquée." };
    if (level === 15) return { icon: "💎", title: "Coffre d’or", text: "Tu entres dans les niveaux élevés. Récompense majeure !" };
    if (level === 20) return { icon: "👑", title: "Coffre légendaire", text: "Sommet atteint pour cette première progression. La légende a une couronne." };
    if (level > 20 && level % 5 === 0) return { icon: "🎁", title: "Coffre bonus", text: "Récompense spéciale débloquée pour ta régularité." };
    return null;
  }

  function heroImageByLevel(level, gender) {
    const safe = String(Math.max(1, Math.min(20, Number(level) || 1))).padStart(2, "0");
    return gender === "femme" ? `assets/joueuse/joueuse_niveau_${safe}.png` : `assets/joueur/joueur_niveau_${safe}.png`;
  }

  function loadBadgeIds() {
    try {
      const raw = JSON.parse(localStorage.getItem(BADGE_KEY) || "[]");
      return Array.isArray(raw) ? raw : [];
    } catch {
      return [];
    }
  }

  function saveBadgeIds(ids) {
    localStorage.setItem(BADGE_KEY, JSON.stringify([...new Set(ids)]));
  }

  function unlockBadges({ silent = false } = {}) {
    if (typeof profile === "undefined" || !profile) return [];
    const unlocked = new Set(loadBadgeIds());
    const newly = [];

    RPG_BADGES.forEach((badge) => {
      if (badge.condition() && !unlocked.has(badge.id)) {
        unlocked.add(badge.id);
        newly.push(badge);
      }
    });

    if (newly.length) {
      saveBadgeIds([...unlocked]);
      if (!silent && typeof log === "function") {
        newly.forEach((badge) => log(`Badge débloqué : ${badge.icon} ${badge.title}`));
      }
    }

    return newly;
  }

  function ensureLevelOverlay() {
    let overlay = document.querySelector("#levelUpOverlay");
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.id = "levelUpOverlay";
    overlay.className = "levelup-overlay hidden";
    overlay.innerHTML = `
      <div class="levelup-modal" role="dialog" aria-modal="true" aria-labelledby="levelUpTitle">
        <p class="eyebrow">Progression</p>
        <h2 id="levelUpTitle">Niveau supérieur !</h2>
        <p id="levelUpText" class="levelup-rank-line">Ton héros progresse.</p>
        <div class="levelup-images">
          <div class="levelup-image-card"><span>Avant</span><img id="levelUpOldImage" src="" alt="Ancien niveau"></div>
          <span class="levelup-arrow">→</span>
          <div class="levelup-image-card"><span>Après</span><img id="levelUpNewImage" src="" alt="Nouveau niveau"></div>
        </div>
        <div id="levelUpRewardBox" class="levelup-reward-box hidden"></div>
        <div class="levelup-actions"><button id="closeLevelUpBtn" class="primary-btn" type="button">Continuer l’aventure</button></div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector("#closeLevelUpBtn")?.addEventListener("click", () => overlay.classList.add("hidden"));
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) overlay.classList.add("hidden");
    });
    return overlay;
  }

  function showLevelUpModal(oldLevel, newLevel) {
    if (typeof profile === "undefined" || !profile) return;
    const overlay = ensureLevelOverlay();
    const gender = profile.gender || "homme";
    const title = overlay.querySelector("#levelUpTitle");
    const text = overlay.querySelector("#levelUpText");
    const oldImage = overlay.querySelector("#levelUpOldImage");
    const newImage = overlay.querySelector("#levelUpNewImage");
    const rewardBox = overlay.querySelector("#levelUpRewardBox");
    const rankName = getRankTitle(newLevel);
    const reward = getChestReward(newLevel);
    const newly = unlockBadges({ silent: false });

    title.textContent = `Niveau ${newLevel} atteint !`;
    text.textContent = `Ton héros devient ${rankName}.`;
    oldImage.src = heroImageByLevel(oldLevel, gender);
    newImage.src = heroImageByLevel(newLevel, gender);
    oldImage.onerror = () => { oldImage.style.visibility = "hidden"; };
    newImage.onerror = () => { newImage.style.visibility = "hidden"; };

    rewardBox.classList.toggle("hidden", !reward && !newly.length);
    rewardBox.innerHTML = "";

    if (reward) {
      rewardBox.insertAdjacentHTML("beforeend", `<article class="levelup-chest-card"><span class="chest-icon">${reward.icon}</span><div><strong>${reward.title}</strong><p>${reward.text}</p></div></article>`);
    }

    newly.forEach((badge) => {
      rewardBox.insertAdjacentHTML("beforeend", `<article class="levelup-chest-card"><span class="chest-icon">${badge.icon}</span><div><strong>Badge : ${badge.title}</strong><p>${badge.text}</p></div></article>`);
    });

    overlay.classList.remove("hidden");
    const heroPortrait = document.querySelector("#heroPortrait");
    heroPortrait?.classList.add("hero-level-flash");
    window.setTimeout(() => heroPortrait?.classList.remove("hero-level-flash"), 600);
  }

  function updateRankLabels() {
    if (typeof profile === "undefined" || !profile) return;
    const level = currentLevel();
    const rankName = getRankTitle(level);
    const rankLabel = document.querySelector("#rankLabel");
    const levelLabel = document.querySelector("#levelLabel");

    if (rankLabel) rankLabel.textContent = `${rankName} · Rang RPG`;
    if (levelLabel) levelLabel.textContent = `Niveau ${level} · ${rankName}`;
  }

  function renderRpgBadges() {
    if (typeof profile === "undefined" || !profile) return;
    const list = document.querySelector("#badgesList");
    if (!list) return;
    const unlocked = new Set(loadBadgeIds());
    const regularContent = list.innerHTML;

    list.classList.add("rpg-badges-list");
    list.innerHTML = `
      <article class="badges-legend-card">
        <span class="badge-icon-big">🏰</span>
        <div><strong>Progression RPG</strong><p class="muted">Titres, coffres et trophées débloqués par niveau.</p></div>
      </article>
      <p class="rpg-badge-section-title">Badges de progression</p>
    `;

    RPG_BADGES.forEach((badge) => {
      const isUnlocked = unlocked.has(badge.id) || badge.condition();
      const item = document.createElement("article");
      item.className = `badge-item rpg-badge-item${isUnlocked ? " unlocked" : ""}`;
      item.innerHTML = `<div class="badge-icon">${badge.icon}</div><div><strong>${badge.title}</strong><p>${badge.text}</p><span>${isUnlocked ? "Débloqué" : "Verrouillé"} · ${badge.kind}</span></div>`;
      list.appendChild(item);
    });

    if (regularContent && regularContent.trim()) {
      list.insertAdjacentHTML("beforeend", `<p class="rpg-badge-section-title">Badges sportifs</p>${regularContent}`);
    }
  }

  function checkLevelProgression() {
    if (typeof profile === "undefined" || !profile) return;
    const level = currentLevel();
    const last = Number(localStorage.getItem(LAST_LEVEL_KEY) || level);
    if (level > last) showLevelUpModal(last, level);
    localStorage.setItem(LAST_LEVEL_KEY, String(level));
    unlockBadges({ silent: true });
  }

  function patchRender() {
    checkLevelProgression();
    updateRankLabels();
    if (typeof currentView !== "undefined" && currentView === "badges") renderRpgBadges();
    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((el) => { el.textContent = "0.3.5.2"; });
  }

  window.getRpgRankTitle = getRankTitle;
  window.showLevelUpModal = showLevelUpModal;
  window.unlockRpgBadges = unlockBadges;

  ensureLevelOverlay();
  patchRender();

  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__rpgProgressionRenderPatched) {
    window.__rpgProgressionRenderPatched = true;
    render = function rpgProgressionPatchedRender() {
      oldRender();
      patchRender();
    };
    render();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initRpgProgression);
} else {
  initRpgProgression();
}
