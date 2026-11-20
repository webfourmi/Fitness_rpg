/* Campement, portefeuille et équipement du héros. */
window.FitnessRpgCamp = (() => {
  const catalog = [
    { id: "moon-aura", slot: "aura", name: "Aura lunaire", price: 35, style: "lunaire" },
    { id: "sun-aura", slot: "aura", name: "Aura solaire", price: 50, style: "solaire" },
    { id: "emerald-cloak", slot: "cape", name: "Cape de l’aventurier", price: 100, style: "aventurier" },
    { id: "dragon-clasp", slot: "broche", name: "Broche du dragon", price: 150, style: "dragon" }
  ];
  const freezePrice = 60;
  const freePerMonth = 2;
  const maxPurchases = 2;
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  const state = () => window.FitnessRpgState;

  function empty(startedOn) {
    return { startedOn, gold: 0, claims: {}, owned: [], equipped: {}, months: {},
      protectedThrough: null, restedSinceWorkout: false, lastFreeze: null };
  }

  function rewardKey(entry) {
    const { type, programId, weekNumber, dayNumber } = entry;
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
      && isRecord(camp.claims) && Object.values(camp.claims).every((value) => value === true)
      && Array.isArray(camp.owned) && camp.owned.every((id) => catalog.some((item) => item.id === id))
      && isRecord(camp.equipped) && Object.entries(camp.equipped).every(([slot, id]) =>
        camp.owned.includes(id) && catalog.some((item) => item.id === id && item.slot === slot))
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
      migrate(profile);
      profile.camp = structuredClone(profile.camp);
      if (settle(profile, today) || !previousCamp) {
        state().saveProfile();
      } else {
        profile.camp = previousCamp;
      }
    } catch (error) {
      profile.camp = previousCamp;
      profile.streak = previousStreak;
      profile.updatedAt = previousUpdatedAt;
      console.error("Fitness RPG - protection de série impossible à sauvegarder", error);
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
    const item = catalog.find((candidate) => candidate.id === id);
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
        if (!item || camp.owned.includes(id)) return "Cet objet est déjà dans ton inventaire.";
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

  function avatar(heroPath, alt, imageAttributes = "", imageClass = "") {
    const camp = state().getProfile()?.camp;
    const styles = catalog.filter((item) => camp?.equipped[item.slot] === item.id)
      .map((item) => `camp-avatar--${item.style}`).join(" ");
    const pose = heroPath.includes("/joueuse/") ? " camp-avatar--heroine" : "";
    return `<div class="camp-avatar ${styles}${pose}">
      <img src="${heroPath}" alt="${alt}" class="${imageClass}" ${imageAttributes}>
      <span class="camp-avatar-aura" aria-hidden="true"></span>
      <span class="camp-avatar-cloak" aria-hidden="true"></span>
      <span class="camp-avatar-clasp" aria-hidden="true"></span>
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
    const itemCard = (item, owned) => {
      const equipped = camp.equipped[item.slot] === item.id;
      const action = owned ? (equipped ? "remove" : "equip") : "buy";
      const label = owned ? (equipped ? "Retirer" : "Équiper") : `Acheter · ${item.price} PO`;
      return `<li class="camp-item">
        <div><strong>${item.name}</strong><small>${item.slot}${equipped ? " · Équipé" : ""}</small></div>
        <button class="secondary-btn" data-camp-action="${action}" data-camp-item="${item.id}"
          type="button" aria-label="${label} · ${item.name}" ${!owned && camp.gold < item.price ? "disabled" : ""}>${label}</button>
      </li>`;
    };
    const inventory = catalog.filter((item) => camp.owned.includes(item.id));
    const store = catalog.filter((item) => !camp.owned.includes(item.id));
    const canRest = profile.streak > 0 && profile.lastActiveDate < today
      && camp.protectedThrough !== today && !camp.restedSinceWorkout;
    root.innerHTML = `
      <div class="camp-summary">
        ${avatar(window.FitnessRpgProgress.getHeroImagePath(), renderer.escapeHtml(profile.name))}
        <div><strong class="camp-balance">${camp.gold} PO</strong><p>10 PO par nouvelle séance essentielle, 5 par complément, 20 par boss et 50 par campagne terminée.</p></div>
      </div>
      <p class="camp-status" role="status" tabindex="-1">${message}</p>
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
      ${store.length ? `<ul class="camp-items">${store.map((item) => itemCard(item, false)).join("")}</ul>` : "<p>Tu possèdes tous les objets disponibles.</p>"}
    `;
  }

  return { migrate, reward, settle, nextDay, isDate, hasValidSave, resolveOvernight, mutate, avatar, render };
})();
