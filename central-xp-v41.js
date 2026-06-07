function initCentralXpV41() {
  if (window.__centralXpV41Ready) return;
  window.__centralXpV41Ready = true;

  const config = window.FitnessRpgConfig || {
  version: "0.4.6.0",
  displayVersion: "V4.6.0",
  storageKeys: {}
};

  const REWARD_KEY = config.storageKeys?.centralRewards || "sportRpgV41Rewards";
 
  function todayString() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function mondayKey() {
    const d = new Date();
    const day = d.getDay() === 0 ? 6 : d.getDay() - 1;
    d.setDate(d.getDate() - day);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function rewardStore() {
    try { return JSON.parse(localStorage.getItem(REWARD_KEY) || "{}"); }
    catch { return {}; }
  }

  function saveRewardStore(data) {
    localStorage.setItem(REWARD_KEY, JSON.stringify(data));
  }

  function hasReward(id) {
    return Boolean(rewardStore()[id]);
  }

  function markReward(id) {
    const data = rewardStore();
    data[id] = new Date().toISOString();
    saveRewardStore(data);
  }

  function ensureToast() {
    let toast = document.querySelector("#v41RewardToast");
    if (toast) return toast;
    toast = document.createElement("aside");
    toast.id = "v41RewardToast";
    toast.className = "v41-reward-toast hidden";
    toast.innerHTML = `<span class="reward-icon">✨</span><div><strong>XP gagné</strong><span>Progression enregistrée.</span></div>`;
    document.body.appendChild(toast);
    return toast;
  }

  function showRewardToast(icon, title, text) {
    const toast = ensureToast();
    toast.querySelector(".reward-icon").textContent = icon;
    toast.querySelector("strong").textContent = title;
    toast.querySelector("span:last-child").textContent = text;
    toast.classList.remove("hidden");
    clearTimeout(window.__v41RewardToastTimer);
    window.__v41RewardToastTimer = setTimeout(() => toast.classList.add("hidden"), 3600);
  }

  function getLevel(totalXp) {
    try {
      if (typeof levelInfo === "function") return levelInfo(Number(totalXp || 0)).level;
    } catch {}
    return Math.floor(Number(totalXp || 0) / 100) + 1;
  }

  function addEntry(entry) {
    if (typeof profile === "undefined" || !profile) return;
    if (!profile.completedByDate) profile.completedByDate = {};
    const date = todayString();
    const entries = Array.isArray(profile.completedByDate[date]) ? profile.completedByDate[date] : [];
    entries.push({
      id: entry.id || `v41-${Date.now()}`,
      sportId: entry.sportId || "v41",
      sportTitle: entry.sportTitle || "Progression",
      title: entry.title || "Récompense",
      amount: entry.amount || 1,
      unit: entry.unit || "action",
      xp: Number(entry.xp || 0),
      at: new Date().toISOString()
    });
    profile.completedByDate[date] = entries;
  }

  function awardBonus(xp, label, rewardId, icon = "🎁") {
    if (typeof profile === "undefined" || !profile || hasReward(rewardId)) return 0;
    const value = Number(xp || 0);
    if (!Number.isFinite(value) || value <= 0) return 0;

    const oldLevel = getLevel(profile.totalXp || 0);
    profile.totalXp = Number(profile.totalXp || 0) + value;
    profile.xp = Number(profile.xp || 0) + value;
    markReward(rewardId);
    if (typeof log === "function") log(`+${value} XP bonus · ${label}`);
    addEntry({ id: rewardId, sportId: "bonus", sportTitle: "Bonus", title: label, xp: value, amount: 1, unit: "bonus" });
    const newLevel = getLevel(profile.totalXp || 0);
    if (newLevel > oldLevel && typeof window.RpgProgression?.showLevelUpModal === "function") {
      window.RpgProgression.showLevelUpModal(oldLevel, newLevel);
    }
    showRewardToast(icon, `Bonus : +${value} XP`, label);
    return value;
  }

  function checkAutomaticBonuses() {
    if (typeof profile === "undefined" || !profile) return;
    const xpRules = config.xpRules || { threeDayStreakBonus: 30, completeWeekBonus: 100 };

    if (Number(profile.streak || 0) >= 3) {
      awardBonus(xpRules.threeDayStreakBonus, "Série de 3 jours", `streak-3-${todayString()}`, "🔥");
    }

    const weekStart = mondayKey();
    const keys = [];
    const start = new Date(`${weekStart}T00:00:00`);
    for (let i = 0; i < 7; i += 1) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      keys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
    }
    const completeWeek = keys.every((key) => Array.isArray(profile.completedByDate?.[key]) && profile.completedByDate[key].length > 0);
    if (completeWeek) {
      awardBonus(xpRules.completeWeekBonus, "Semaine complète", `week-complete-${weekStart}`, "🏆");
    }
  }

  function applyXpGain(xp, sourceLabel = "Progression", entry = null, options = {}) {
    if (typeof profile === "undefined" || !profile) return { oldLevel: 1, newLevel: 1, xp: 0 };
    const value = Number(xp || 0);
    if (!Number.isFinite(value) || value <= 0) return { oldLevel: getLevel(profile.totalXp || 0), newLevel: getLevel(profile.totalXp || 0), xp: 0 };

    const rewardId = options.rewardId;
    if (rewardId && hasReward(rewardId)) {
      showRewardToast("🛡️", "Déjà validé", `${sourceLabel} a déjà donné son XP.`);
      return { oldLevel: getLevel(profile.totalXp || 0), newLevel: getLevel(profile.totalXp || 0), xp: 0, duplicate: true };
    }

    const oldLevel = getLevel(profile.totalXp || 0);
    profile.totalXp = Number(profile.totalXp || 0) + value;
    profile.xp = Number(profile.xp || 0) + value;

    if (entry) addEntry({ ...entry, xp: value });
    if (rewardId) markReward(rewardId);
    if (typeof updateStreak === "function") updateStreak();
    if (typeof log === "function") log(`+${value} XP · ${sourceLabel}`);

    const newLevel = getLevel(profile.totalXp || 0);
    if (newLevel > oldLevel && typeof window.RpgProgression?.showLevelUpModal === "function") {
      window.RpgProgression.showLevelUpModal(oldLevel, newLevel);
    }

    checkAutomaticBonuses();

    if (typeof save === "function") save();
    if (!options.skipRender && typeof render === "function") render();
    showRewardToast("✨", `+${value} XP`, sourceLabel);

    return { oldLevel, newLevel, xp: value };
  }

  function patchCompleteExercise() {
    if (typeof completeExercise !== "function" || window.__v41CompleteExercisePatched) return;
    window.__v41CompleteExercisePatched = true;

    completeExercise = function v41CompleteExercise(id, amount) {
      const exercise = typeof exerciseById !== "undefined" ? exerciseById[id] : null;
      if (!exercise) return;
      const value = Number(amount);
      if (!Number.isFinite(value) || value < exercise.min) {
        alert(`Entre une valeur d’au moins ${exercise.min} ${exercise.unit}.`);
        return;
      }
      const xp = typeof calcXp === "function" ? calcXp(exercise, value) : Math.max(1, Math.round(value));
      if (typeof pose !== "undefined") pose = exercise.pose || "victory";
      if (typeof el !== "undefined" && el.coachMsg) {
        el.coachMsg.textContent = typeof exerciseMessage === "function" ? exerciseMessage(id) : "Exercice validé.";
      }
      applyXpGain(xp, `${exercise.sportTitle} · ${exercise.title}`, {
        id: exercise.id,
        sportId: exercise.sportId,
        sportTitle: exercise.sportTitle,
        title: exercise.title,
        amount: value,
        unit: exercise.unit
      }, { skipRender: false });
    };
  }

  function patchTodayValidation() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("#todayValidateBtn");
      if (!button || button.disabled) return;
      if (button.dataset.v41Handled === "true") return;

      const content = document.querySelector("#todayContent");
      const title = content?.querySelector(".today-hero-card h2")?.textContent?.trim() || "Quête du jour";
      const date = todayString();
      const xp = Number((button.closest(".today-action-grid")?.previousElementSibling?.textContent || "").match(/\+(\d+) XP/)?.[1]) || config.programXp?.[title] || 10;

      event.preventDefault();
      event.stopImmediatePropagation();
      button.dataset.v41Handled = "true";
      button.disabled = true;
      button.textContent = "Déjà validé";

      try {
        const doneKey = config.storageKeys?.today || "sportRpgV1TodayDone";
        const done = JSON.parse(localStorage.getItem(doneKey) || "{}");
        done[date] = { at: new Date().toISOString(), program: title, xp };
        localStorage.setItem(doneKey, JSON.stringify(done));
      } catch {}

      applyXpGain(xp, `Aujourd’hui · ${title}`, {
        id: `today-${date}`,
        sportId: "today",
        sportTitle: "Aujourd’hui",
        title: `Quête du jour · ${title}`,
        amount: 1,
        unit: "séance"
      }, { rewardId: `today-${date}` });

      const coachMsg = document.querySelector("#coachMessage");
      if (coachMsg) coachMsg.textContent = `Quête du jour validée : ${title}. +${xp} XP.`;
    }, true);
  }

  function patchVersion() {
  window.FitnessRpgConfig?.setVersionLabels?.();
}
  window.CentralXpV41 = {
    applyXpGain,
    checkAutomaticBonuses,
    showRewardToast,
    hasReward,
    markReward
  };

  if (window.FitnessRpgCore) {
    window.FitnessRpgCore.applyXpGain = applyXpGain;
  }

  patchCompleteExercise();
  patchTodayValidation();
  patchVersion();
  checkAutomaticBonuses();

  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__centralXpV41RenderPatched) {
    window.__centralXpV41RenderPatched = true;
    render = function centralXpV41Render() {
      oldRender();
      patchCompleteExercise();
      patchVersion();
    };
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCentralXpV41);
} else {
  initCentralXpV41();
}
