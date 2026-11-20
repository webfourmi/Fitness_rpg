/* Campement, portefeuille et équipement du héros. */
window.FitnessRpgCamp = (() => {
  const slots = {
    head: "Tête",
    outfit: "Tenue",
    cape: "Cape",
    broche: "Accessoire",
    aura: "Aura"
  };
  const catalog = [
    { id: "garnet-headband", slot: "head", name: "Bandeau grenat", price: 40, style: "grenat" },
    { id: "indigo-tunic", slot: "outfit", name: "Tunique indigo", price: 65, style: "indigo" },
    { id: "moon-aura", slot: "aura", name: "Aura lunaire", price: 35, style: "lunaire" },
    { id: "sun-aura", slot: "aura", name: "Aura solaire", price: 50, style: "solaire" },
    { id: "emerald-cloak", slot: "cape", name: "Cape de l’aventurier", price: 100, style: "aventurier" },
    { id: "dragon-clasp", slot: "broche", name: "Médaillon runique", price: 150, style: "dragon" }
  ];
  const bossGear = [
    { slot: "head", name: "Diadème du Gardien du Sceau", price: 35, style: "grenat", variant: "sceau" },
    { slot: "outfit", name: "Tunique du Golem de Marbre", price: 50, style: "indigo", variant: "marbre" },
    { slot: "cape", name: "Cape du Chevalier du Rempart", price: 65, style: "aventurier", variant: "rempart" },
    { slot: "broche", name: "Sceau du Gobelin Forgeron", price: 75, style: "dragon", variant: "forge" },
    { slot: "aura", name: "Aura du Dragon Astral", price: 85, style: "lunaire", variant: "astral" }
  ];
  const shopSelection = Object.create(null);
  const freezePrice = 60;
  const goldPerLevel = 20;
  const freePerMonth = 2;
  const maxPurchases = 2;
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  const state = () => window.FitnessRpgState;

  function getLevelItem(level) {
    if (!Number.isSafeInteger(level) || level < 2) return null;
    const index = level - 2;
    const design = bossGear[index % bossGear.length];
    const edition = Math.floor(index / bossGear.length);
    return {
      ...design,
      id: `boss-gear-${level}`,
      name: edition ? `${design.name} · niv. ${level}` : design.name,
      price: design.price + Math.min(edition, 10) * 10,
      hue: (edition * 37) % 360,
      minLevel: level
    };
  }

  function getItem(id) {
    const levelId = /^boss-gear-([1-9]\d*)$/.exec(id);
    return levelId ? getLevelItem(Number(levelId[1])) : catalog.find((item) => item.id === id);
  }

  function getLevel(profile) {
    return window.FitnessRpgConfig.levelInfo(profile?.totalXp || 0).level;
  }

  function getShopItems(slot, camp, level) {
    const items = catalog.filter((item) => item.slot === slot && !camp.owned.includes(item.id));
    const owned = new Set(camp.owned);
    const firstLevel = 2 + bossGear.findIndex((item) => item.slot === slot);
    for (let nextLevel = firstLevel; nextLevel <= level + bossGear.length; nextLevel += bossGear.length) {
      const item = getLevelItem(nextLevel);
      if (!owned.has(item.id)) items.push(item);
    }
    return items;
  }

  function stepShop(slot, delta) {
    const profile = state().getProfile();
    if (!profile?.camp || !Object.hasOwn(slots, slot) || (delta !== -1 && delta !== 1)) return;
    const items = getShopItems(slot, profile.camp, getLevel(profile));
    const current = Math.min(shopSelection[slot] || 0, items.length - 1);
    if (items.length < 2) return;
    shopSelection[slot] = (current + delta + items.length) % items.length;
    render();
  }

  function empty(startedOn) {
    return { startedOn, gold: 0, claims: {}, owned: [], equipped: {}, months: {},
      protectedThrough: null, restedSinceWorkout: false, lastFreeze: null };
  }

  function rewardKey(entry) {
    const { type, programId } = entry;
    const { weekNumber, dayNumber } = window.FitnessRpgPrograms?.getProgramEntryPosition?.(entry) || entry;
    if (type === "program-boss") return JSON.stringify(["boss", programId, Number(weekNumber || 1)]);
    return JSON.stringify(["day", programId, Number(weekNumber || 1), Number(dayNumber)]);
  }

  function isDate(value) {
    if (typeof value !== "string" || !datePattern.test(value)) return false;
    const date = new Date(value + "T00:00:00Z");
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }

  function hasValidSave(camp) {
    const isRecord = (value) => value && typeof value === "object" && !Array.isArray(value);
    const isCount = (value, max = Number.MAX_SAFE_INTEGER) =>
      Number.isSafeInteger(value) && value >= 0 && value <= max;
    return Boolean(isRecord(camp) && isDate(camp.startedOn) && isCount(camp.gold)
      && (camp.levelRewardedThrough === undefined || isCount(camp.levelRewardedThrough))
      && (camp.levelCatchUpGold === undefined || isCount(camp.levelCatchUpGold))
      && isRecord(camp.claims) && Object.values(camp.claims).every((value) => value === true)
      && (camp.showFamiliar === undefined || typeof camp.showFamiliar === "boolean")
      && Array.isArray(camp.owned) && camp.owned.every((id) => typeof id === "string" && getItem(id))
      && isRecord(camp.equipped) && Object.entries(camp.equipped).every(([slot, id]) =>
        camp.owned.includes(id) && getItem(id)?.slot === slot)
      && isRecord(camp.months) && Object.entries(camp.months).every(([key, quota]) =>
        isDate(key + "-01") && isRecord(quota) && isCount(quota.freeUsed, freePerMonth)
        && isCount(quota.bought, maxPurchases) && isCount(quota.paidUsed, quota.bought))
      && (camp.protectedThrough === null || isDate(camp.protectedThrough))
      && (camp.lastFreeze === null || isDate(camp.lastFreeze))
      && typeof camp.restedSinceWorkout === "boolean");
  }

  function migrate(profile) {
    if (profile.camp) return profile.camp;
    const camp = empty(state().todayKey());
    for (const entry of state().getAllEntries()) {
      if (entry.type === "program" || entry.type === "program-boss") {
        camp.claims[rewardKey(entry)] = true;
      }
    }
    for (const [programId, completions] of Object.entries(profile.programComplements || {})) {
      for (const key of Object.keys(completions || {})) {
        const [weekNumber, dayNumber] = key.split("-");
        camp.claims[rewardKey({ programId, weekNumber, dayNumber })] = true;
      }
    }
    for (const programId of new Set(state().getAllEntries().map((entry) => entry.programId).filter(Boolean))) {
      if (isCampaignComplete(programId)) camp.claims[JSON.stringify(["campaign", programId])] = true;
    }
    profile.camp = camp;
    return camp;
  }

  function isCampaignComplete(programId) {
    return Boolean(window.FitnessRpgPrograms?.getProgramProgressDetails?.(programId)?.campaignComplete);
  }

  function credit(camp, key, amount) {
    if (camp.claims[key]) return 0;
    camp.claims[key] = true;
    camp.gold += amount;
    return amount;
  }

  function reward(camp, entry, amount) {
    let earned = credit(camp, rewardKey(entry), amount);
    if (isCampaignComplete(entry.programId)) {
      earned += credit(camp, JSON.stringify(["campaign", entry.programId]), 50);
    }
    return earned;
  }

  function rewardFreeSession(camp) {
    return credit(camp, JSON.stringify(["free-session", state().todayKey()]), 5);
  }

  function rewardComplement(camp, programId, weekNumber, dayNumber) {
    return credit(camp, rewardKey({ programId, weekNumber, dayNumber }), 5);
  }

  function hasComplementReward(camp, programId, weekNumber, dayNumber) {
    return Boolean(camp?.claims[rewardKey({ programId, weekNumber, dayNumber })]);
  }

  function catchUpLevels(profile, level) {
    const camp = migrate(profile);
    if (camp.levelRewardedThrough) return camp;

    const reachedLevel = level ?? window.FitnessRpgConfig.levelInfo(profile.totalXp || 0).level;
    const levelCatchUpGold = (reachedLevel - 1) * goldPerLevel;
    return {
      ...camp,
      gold: camp.gold + levelCatchUpGold,
      levelRewardedThrough: reachedLevel,
      levelCatchUpGold
    };
  }

  function rewardLevels(profile, oldLevel, newLevel) {
    const camp = catchUpLevels(profile, oldLevel);
    const rewardedThrough = Math.max(oldLevel, camp.levelRewardedThrough);
    if (newLevel <= rewardedThrough) return 0;

    const earned = (newLevel - rewardedThrough) * goldPerLevel;
    profile.camp = { ...camp, gold: camp.gold + earned, levelRewardedThrough: newLevel };
    return earned;
  }

  function nextDay(date) {
    const day = new Date(date + "T00:00:00Z");
    day.setUTCDate(day.getUTCDate() + 1);
    return day.toISOString().slice(0, 10);
  }

  function month(camp, date) {
    return camp.months[date.slice(0, 7)] || { freeUsed: 0, bought: 0, paidUsed: 0 };
  }

  function paidStock(camp) {
    return Object.values(camp.months).reduce((sum, quota) => sum + quota.bought - quota.paidUsed, 0);
  }

  function settle(profile, today) {
    const camp = profile.camp;
    if (!profile.streak || !isDate(profile.lastActiveDate)) return false;
    let through = camp.protectedThrough > profile.lastActiveDate ? camp.protectedThrough : profile.lastActiveDate;
    let changed = false;
    while (nextDay(through) < today) {
      const day = nextDay(through);
      const quota = month(camp, day);
      const paidMonth = Object.keys(camp.months).sort().find((key) =>
        key <= day.slice(0, 7) && camp.months[key].bought > camp.months[key].paidUsed
      );
      if (day < camp.startedOn || (quota.freeUsed >= freePerMonth && !paidMonth)) {
        profile.streak = 0;
        camp.protectedThrough = null;
        return true;
      }
      // Les gels gratuits expirent. Les fioles achetées restent dans la réserve.
      if (quota.freeUsed < freePerMonth) {
        quota.freeUsed += 1;
        camp.months[day.slice(0, 7)] = quota;
      } else {
        camp.months[paidMonth].paidUsed += 1;
      }
      camp.lastFreeze = day;
      camp.protectedThrough = day;
      through = day;
      changed = true;
    }
    return changed;
  }

  function resolveOvernight() {
    const profile = state().getProfile();
    if (!profile) return;
    const previousCamp = profile.camp;
    const previousStreak = profile.streak;
    const previousUpdatedAt = profile.updatedAt;
    const today = state().todayKey();
    try {
      const migratedCamp = catchUpLevels(profile);
      profile.camp = structuredClone(migratedCamp);
      if (settle(profile, today) || migratedCamp !== previousCamp) {
        state().saveProfile();
      } else {
        profile.camp = previousCamp;
      }
    } catch (error) {
      profile.camp = previousCamp;
      profile.streak = previousStreak;
      profile.updatedAt = previousUpdatedAt;
      console.error("Fitness RPG - mise à jour du campement impossible à sauvegarder", error);
    }
  }

  function mutate(action, id) {
    const profile = state().getProfile();
    if (!profile) return "Crée un héros pour accéder au campement.";
    resolveOvernight();
    const previous = migrate(profile);
    const previousUpdatedAt = profile.updatedAt;
    const camp = structuredClone(previous);
    const today = state().todayKey();
    const quota = month(camp, today);
    const item = getItem(id);
    let message;

    switch (action) {
      case "rest":
        if (!profile.streak || profile.lastActiveDate >= today || camp.protectedThrough === today || camp.restedSinceWorkout) {
          return "Le repos est disponible un jour sans entraînement, une fois entre deux jours actifs.";
        }
        camp.protectedThrough = today;
        camp.restedSinceWorkout = true;
        message = "Repos enregistré. Ta série est protégée aujourd’hui.";
        break;
      case "freeze":
        if (quota.bought >= maxPurchases || paidStock(camp) >= maxPurchases) return "Réserve ou limite mensuelle atteinte.";
        if (camp.gold < freezePrice) return "Il te faut 60 PO pour une fiole.";
        camp.gold -= freezePrice;
        quota.bought += 1;
        camp.months[today.slice(0, 7)] = quota;
        message = "Fiole ajoutée à ta réserve.";
        break;
      case "buy":
        if (!item) return "Cet objet est indisponible.";
        if (item.minLevel > getLevel(profile)) return `Cet objet se débloque au niveau ${item.minLevel}.`;
        if (camp.owned.includes(id)) return "Cet objet est déjà dans ton inventaire.";
        if (camp.gold < item.price) return "Tu n’as pas assez de PO pour cet objet.";
        camp.gold -= item.price;
        camp.owned.push(id);
        message = item.name + " rejoint ton inventaire.";
        break;
      case "equip":
        if (!item || !camp.owned.includes(id)) return "Cet objet est indisponible.";
        camp.equipped[item.slot] = id;
        message = item.name + " · Équipé";
        break;
      case "remove":
        if (!item || camp.equipped[item.slot] !== id) return "Cet objet n’est pas équipé.";
        delete camp.equipped[item.slot];
        message = item.name + " · Retiré";
        break;
      case "familiar-show":
        if (!window.FitnessRpgRewards?.getActiveFamiliar?.()) return "Sélectionne d’abord un familier.";
        camp.showFamiliar = true;
        message = "Ton familier est visible à côté de ton personnage.";
        break;
      case "familiar-hide":
        camp.showFamiliar = false;
        message = "Ton familier a été retiré du portrait.";
        break;
      default:
        return "";
    }

    profile.camp = camp;
    try {
      state().saveProfile();
      return message;
    } catch {
      profile.camp = previous;
      profile.updatedAt = previousUpdatedAt;
      return "La sauvegarde a échoué. Réessaie après avoir vérifié le stockage.";
    }
  }

  function getPurchaseDetails(id) {
    const item = getItem(id);
    return item ? { name: item.name, price: item.price } : null;
  }

  function avatar(alt, imageAttributes = "", imageClass = "", level = null) {
    const profile = state().getProfile();
    const camp = profile?.camp;
    const heroine = profile?.gender === "femme";
    const heroPath = heroine ? "assets/heros-campement/heroine.webp" : "assets/heros-campement/heros.webp";
    const equipped = Object.values(camp?.equipped || {}).map(getItem).filter(Boolean);
    const styles = equipped.flatMap((item) => item.variant ? [item.style, item.variant] : [item.style])
      .map((style) => `camp-avatar--${style}`).join(" ");
    const hues = equipped.filter((item) => item.hue)
      .map((item) => `--camp-${item.slot}-hue:${item.hue}deg`).join(";");
    const pose = heroine ? " camp-avatar--heroine" : "";
    const config = window.FitnessRpgConfig;
    const shownLevel = level ?? getLevel(profile);
    const rank = config.getRank(shownLevel);
    const rankStep = (shownLevel - rank.min) % 5 + 1;
    const familiar = camp?.showFamiliar ? window.FitnessRpgRewards?.getActiveFamiliar?.() : null;
    const escape = window.FitnessRpgRender?.escapeHtml;
    return `<div class="camp-avatar camp-avatar--ranked camp-avatar--rank-${rank.appearance} camp-avatar--rank-step-${rankStep} ${styles}${pose}" ${hues ? `style="${hues}"` : ""}>
      <img src="${heroPath}" alt="${alt}" class="${imageClass}" ${imageAttributes}>
      <span class="camp-avatar-rank-marks" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></span>
      <span class="camp-avatar-aura" aria-hidden="true"></span>
      <span class="camp-avatar-cloak" aria-hidden="true"></span>
      <span class="camp-avatar-tunic" aria-hidden="true"></span>
      <span class="camp-avatar-mantle" aria-hidden="true"></span>
      <span class="camp-avatar-clasp" aria-hidden="true"></span>
      <span class="camp-avatar-headband" aria-hidden="true"></span>
      ${familiar?.image ? `<img class="camp-avatar-familiar" src="${escape(familiar.image)}" alt="${escape(familiar.name)}">` : ""}
    </div>`;
  }

  function render(message = "") {
    const root = document.querySelector("#campContent");
    const profile = state().getProfile();
    if (!root || !profile) return;
    const today = state().todayKey();
    const camp = migrate(profile);
    const quota = month(camp, today);
    const paid = paidStock(camp);
    const renderer = window.FitnessRpgRender;
    const level = getLevel(profile);
    const itemCard = (item, owned, showSlot = true) => {
      const equipped = camp.equipped[item.slot] === item.id;
      const locked = !owned && item.minLevel > level;
      const action = owned ? (equipped ? "remove" : "equip") : "buy";
      const label = owned ? (equipped ? "Retirer" : "Équiper")
        : locked ? `Niveau ${item.minLevel} requis` : `Acheter · ${item.price} PO`;
      return `<li class="camp-item">
        <div><strong>${item.name}</strong>${showSlot ? `<small>${slots[item.slot]}${equipped ? " · Équipé" : ""}</small>` : ""}</div>
        <button class="secondary-btn" data-camp-action="${action}" data-camp-item="${item.id}"
          type="button" aria-label="${label} · ${item.name}" ${locked || (!owned && camp.gold < item.price) ? "disabled" : ""}>${label}</button>
      </li>`;
    };
    const inventory = camp.owned.map(getItem).filter(Boolean);
    const openSlots = new Set([...root.querySelectorAll(".camp-equipment-slot[open]")]
      .map((details) => details.dataset.campSlot));
    const equipment = Object.entries(slots).map(([slot, label]) => {
      const choices = inventory.filter((item) => item.slot === slot);
      const equipped = choices.find((item) => item.id === camp.equipped[slot]);
      return `<details class="camp-equipment-slot" data-camp-slot="${slot}" ${openSlots.has(slot) ? "open" : ""}>
        <summary><strong>${label}</strong><small>${equipped?.name || "Vide"}</small></summary>
        ${choices.length
          ? `<ul class="camp-items">${choices.map((item) => itemCard(item, true, false)).join("")}</ul>`
          : "<p>Aucun objet compatible dans ton inventaire.</p>"}
      </details>`;
    }).join("");
    const familiar = window.FitnessRpgRewards?.getActiveFamiliar?.();
    const showFamiliar = Boolean(familiar && camp.showFamiliar);
    const familiarSlot = `<details class="camp-equipment-slot" data-camp-slot="familiar" ${openSlots.has("familiar") ? "open" : ""}>
      <summary><strong>Familier</strong><small>${showFamiliar ? renderer.escapeHtml(familiar.name) : "Vide"}</small></summary>
      ${familiar ? `<button class="secondary-btn" data-camp-action="${showFamiliar ? "familiar-hide" : "familiar-show"}" type="button">
        ${showFamiliar ? "Retirer du portrait" : `Équiper · ${renderer.escapeHtml(familiar.name)}`}
      </button>` : "<p>Sélectionne un familier dans ta collection.</p>"}
    </details>`;
    const store = Object.entries(slots).map(([slot, label]) => {
      const items = getShopItems(slot, camp, level);
      const index = Math.min(shopSelection[slot] || 0, items.length - 1);
      const item = items[index];
      if (!item) return "";
      const arrows = items.length > 1;
      return `<section class="camp-shop-category" data-camp-shop-slot="${slot}" aria-label="${label}">
        <h3>${label}</h3>
        <div class="camp-shop-carousel">
          ${arrows ? `<button type="button" class="secondary-btn" data-camp-shop-step="-1" aria-label="${label} · Objet précédent">←</button>` : ""}
          <ul class="camp-items" aria-live="polite">${itemCard(item, false, false)}</ul>
          ${arrows ? `<button type="button" class="secondary-btn" data-camp-shop-step="1" aria-label="${label} · Objet suivant">→</button>` : ""}
        </div>
        ${arrows ? `<small class="camp-shop-count">${index + 1} / ${items.length}</small>` : ""}
      </section>`;
    }).join("");
    const canRest = profile.streak > 0 && profile.lastActiveDate < today
      && camp.protectedThrough !== today && !camp.restedSinceWorkout;
    root.innerHTML = `
      <div class="camp-summary">
        ${avatar(renderer.escapeHtml(profile.name))}
        <div>
          <strong class="camp-balance">${camp.gold} PO</strong>
          ${camp.levelCatchUpGold ? `<p class="camp-catch-up">Rattrapage de tes niveaux précédents · <strong>+${camp.levelCatchUpGold} PO</strong></p>` : ""}
          <p>10 PO par nouvelle séance essentielle, 5 par complément, 20 par boss, 50 par campagne terminée et ${goldPerLevel} par nouveau niveau.</p>
          <p>Le premier exercice libre ou programme perso validé de la journée rapporte aussi 5 PO.</p>
        </div>
      </div>
      <p class="camp-status" role="status" tabindex="-1">${message}</p>
      <h2>Équipement</h2>
      <div class="camp-equipment">${equipment}${familiarSlot}</div>
      <h2>Repos et gels de série</h2>
      <p>Série de ${profile.streak || 0} jour(s) actif(s)${camp.protectedThrough === today ? " · Protégée aujourd’hui" : ""}.</p>
      <p>${freePerMonth - quota.freeUsed}/2 gels gratuits ce mois-ci · ${paid}/2 fioles en réserve · ${quota.bought}/2 achats ce mois-ci.</p>
      ${camp.lastFreeze ? `<p>Dernière journée protégée par un gel : ${renderer.escapeHtml(camp.lastFreeze)}.</p>` : ""}
      <p>Les gels gratuits protègent automatiquement les jours manqués, puis les fioles prennent le relais. Tu peux prendre un jour de repos entre deux jours actifs.</p>
      <div class="camp-actions">
        <button class="primary-btn" data-camp-action="rest" type="button" ${canRest ? "" : "disabled"}>Se reposer aujourd’hui</button>
        <button class="secondary-btn" data-camp-action="freeze" type="button"
          ${camp.gold < freezePrice || quota.bought >= maxPurchases || paid >= maxPurchases ? "disabled" : ""}>Acheter une fiole · ${freezePrice} PO</button>
      </div>
      <h2>Inventaire</h2>
      ${inventory.length ? `<ul class="camp-items">${inventory.map((item) => itemCard(item, true)).join("")}</ul>` : "<p>Aucun objet dans ton inventaire.</p>"}
      <h2>Boutique</h2>
      ${store}
    `;
  }

  return { migrate, reward, rewardFreeSession, rewardComplement, hasComplementReward, rewardLevels,
    settle, nextDay, isDate, hasValidSave, resolveOvernight, mutate, getPurchaseDetails, getLevelItem, stepShop, avatar, render };
})();
