(() => {
  "use strict";
  const State = window.FitnessRpgState;
  const Catalogue = window.FitnessRpgExerciseAdaptation;
  const Render = window.FitnessRpgRender;
  const labels = {
    enduranceMinutes: ["Endurance", "min"], duration: ["Durée d’endurance", "min"], distance: ["Distance enregistrée", "km"],
    activeDays: ["Jours actifs", "j"], strengthDays: ["Jours de renforcement", "j"],
    load: ["Charge maximale enregistrée", "kg"], comparableLoad: ["Charge maximale à exercice identique", "kg"],
    sets: ["Séries documentées", ""], repetitions: ["Répétitions documentées", ""],
    comparableRepetitions: ["Répétitions par série à exercice identique", ""],
    effort: ["Effort ressenti moyen", "/ 10"], comfortableRange: ["Amplitude confortable", "/ 5"],
    ease: ["Aisance", "/ 5"], tolerance: ["Tolérance", "/ 5"], stability: ["Stabilité", "/ 5"],
    movementControl: ["Contrôle du mouvement", "/ 5"], supportUsed: ["Appui utilisé", ""],
    movementDiversity: ["Familles de mouvements", ""]
  };
  const selfReports = ["comfortableRange", "ease", "tolerance", "stability", "movementControl", "supportUsed"];
  const number = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });

  function previousWeek(keys) {
    return keys.map((key) => {
      const date = new Date(key + "T12:00:00Z");
      date.setUTCDate(date.getUTCDate() - 7);
      return date.toISOString().slice(0, 10);
    });
  }

  function average(points) {
    return points.length ? points.reduce((sum, value) => sum + value, 0) / points.length : null;
  }

  function snapshot(rule, keys, referenceExercise) {
    const dates = new Set(keys);
    const entries = State.getAllEntries().filter((entry) => dates.has(State.getEntryDateKey(entry)));
    const idMap = new Map(entries.filter((entry) => entry.id).map((entry) => [entry.id, entry]));
    const completions = [...idMap.values()].concat(entries.filter((entry) => !entry.id));
    const performance = (State.getPerformanceHistory?.() || []).filter((record) => idMap.has(record.sourceSessionId));
    const movements = performance.flatMap((record) => (record.exercises || []).map((move) => ({
      ...move, day: State.getEntryDateKey(idMap.get(record.sourceSessionId))
    })));
    for (const item of completions) {
      if (item.exerciseId) movements.push({ ...item, actualAmount: item.amount, day: State.getEntryDateKey(item) });
    }
    const families = movements.map((move) => Catalogue.getMetadata(move.exerciseId)?.family).filter(Boolean);
    const endurance = window.FitnessRpgWeightPlanning.recordedDays(keys);
    const active = new Set([...endurance].filter(([, minutes]) => minutes > 0).map(([date]) => date));
    for (const item of completions) {
      if (["program", "program-boss", "exercise", "custom-program", "challenge"].includes(item.type)) active.add(State.getEntryDateKey(item));
    }
    const strengthFamilies = ["squat", "lunge", "hipExtension", "hinge", "push", "pull", "overhead", "verticalPull", "elbowFlexion", "elbowExtension", "heelRaise", "carry", "trunk"];
    const strengthDays = new Set(movements.filter((move) => strengthFamilies.includes(Catalogue.getMetadata(move.exerciseId)?.family)).map((move) => move.day));
    for (const entry of completions) if (entry.weightStrength) strengthDays.add(State.getEntryDateKey(entry));
    const strength = movements.filter((move) => strengthFamilies.includes(Catalogue.getMetadata(move.exerciseId)?.family)
      && ["répétitions", "reps"].includes(move.unit) && Number.isFinite(move.actualAmount));
    const comparisonId = referenceExercise ?? [...strength].sort((a, b) => b.day.localeCompare(a.day))[0]?.exerciseId;
    const comparable = strength.filter((move) => move.exerciseId === comparisonId);
    const loads = (moves) => moves.map((item) => item.loadKg).filter((value) => Number.isFinite(value) && value > 0);
    const distances = completions.map((entry) => entry.distanceKm).filter((value) => Number.isFinite(value) && value > 0);
    const minutes = [...endurance.values()].reduce((sum, value) => sum + value, 0);
    const max = (values) => values.length ? Math.max(...values) : null;
    const eligibleRpe = performance.map((record) => record.rpe).filter((value) => Number.isInteger(value) && value >= 1 && value <= 10);
    const values = {
      enduranceMinutes: minutes, duration: minutes, distance: distances.length ? distances.reduce((sum, x) => sum + x, 0) : null,
      activeDays: active.size, strengthDays: strengthDays.size, load: max(loads(strength)), comparableLoad: max(loads(comparable)),
      sets: strength.length || null, repetitions: strength.length ? strength.reduce((sum, item) => sum + item.actualAmount, 0) : null,
      comparableRepetitions: max(comparable.map((item) => item.actualAmount)), effort: average(eligibleRpe),
      movementDiversity: families.length ? new Set(families).size : null
    };
    const logs = State.getProfile()?.heroGoalObservations?.[rule.id] || {};
    for (const id of selfReports) {
      const valuesInWeek = keys.map((key) => logs[key]?.[id]);
      values[id] = id === "supportUsed" ? valuesInWeek.findLast((value) => value === "yes" || value === "no") ?? null
        : average(valuesInWeek.filter((value) => Number.isInteger(value) && value >= 1 && value <= 5));
    }
    return { ...values, comparisonId };
  }

  function renderValue(value, unit) {
    if (value == null) return "Non renseigné";
    if (value === "yes" || value === "no") return value === "yes" ? "Oui" : "Non";
    return number.format(value) + (unit ? " " + unit : "");
  }

  function html(rule) {
    if (!rule) return "";
    const keys = State.getWeekKeys();
    const current = snapshot(rule, keys);
    const prior = snapshot(rule, previousWeek(keys), current.comparisonId || "");
    const metrics = rule.metrics.filter((id) => Object.hasOwn(labels, id));
    const inputs = metrics.filter((id) => selfReports.includes(id));
    const today = State.getProfile()?.heroGoalObservations?.[rule.id]?.[State.todayKey()] || {};
    return `<details id="heroGoalProgress"><summary>Mes progrès · ${Render.escapeHtml(rule.title)}</summary>
      <div class="planning-week-progress">${metrics.map((id) => {
        const [label, unit] = labels[id];
        return `<div><strong>${renderValue(current[id], unit)}</strong><span>${label}</span>
          <small>Semaine précédente · ${renderValue(prior[id], unit)}</small></div>`;
      }).join("")}</div>
      ${rule.id === "force" && current.comparisonId ? `<p>Exercice comparé · ${Render.escapeHtml(window.FitnessRpgData.getExerciseById(current.comparisonId)?.title || current.comparisonId)}</p>` : ""}
      <p>Repère du profil · ${rule.frequency[0]} à ${rule.frequency[1]} jours par semaine.</p>
      ${rule.metrics.includes("optionalMeasurements") ? '<button type="button" class="secondary-btn" data-mobile-destination="camp">Mesures facultatives au campement</button>' : ""}
      ${inputs.length ? `<div class="sport-profile-grid">${inputs.map((id) => {
        const choices = id === "supportUsed" ? [["yes", "Oui"], ["no", "Non"]] : [1, 2, 3, 4, 5].map((value) => [value, value]);
        return `<label>${labels[id][0]}${id === "supportUsed" ? "" : " (1 à 5)"} <select data-hero-metric="${id}">
          <option value="">Non renseigné</option>${choices.map(([value, label]) =>
            `<option value="${value}" ${today[id] === value ? "selected" : ""}>${label}</option>`).join("")}</select></label>`;
      }).join("")}</div><button type="button" class="secondary-btn" data-hero-plan="dashboard-save">Enregistrer mon ressenti du jour</button>` : ""}
      <p id="heroGoalProgressStatus" role="status"></p>
    </details>`;
  }

  function save(rule, values) {
    const profile = State.getProfile();
    const previous = profile.heroGoalObservations;
    const today = State.todayKey();
    const days = previous?.[rule.id] || {};
    const clean = {};
    for (const id of rule.metrics.filter((key) => selfReports.includes(key))) {
      const raw = values[id];
      if (id === "supportUsed" && ["yes", "no"].includes(raw)) clean[id] = raw;
      if (id !== "supportUsed" && /^[1-5]$/.test(raw ?? "")) clean[id] = Number(raw);
    }
    profile.heroGoalObservations = { ...previous, [rule.id]: { ...days, [today]: clean } };
    try {
      State.saveProfile();
      return true;
    } catch (error) {
      profile.heroGoalObservations = previous;
      console.error("Fitness RPG · observation non enregistrée", error);
      return false;
    }
  }

  function handle(rule, button) {
    if (!rule) return;
    const root = button.closest("#heroGoalProgress");
    const values = Object.fromEntries([...root.querySelectorAll("[data-hero-metric]")]
      .map((field) => [field.dataset.heroMetric, field.value]));
    const saved = save(rule, values);
    if (saved) Render.renderPlanningPage();
    const details = document.querySelector("#heroGoalProgress");
    details.open = true;
    details.querySelector("#heroGoalProgressStatus").textContent = saved ? "Ressenti enregistré." : "Enregistrement impossible.";
  }

  window.FitnessRpgHeroDashboard = { snapshot, previousWeek, html, save, handle };
})();
