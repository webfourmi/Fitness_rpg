(() => {
  "use strict";

  const State = window.FitnessRpgState;
  const Programs = window.FitnessRpgPrograms;
  const Render = window.FitnessRpgRender;
  const Adaptation = window.FitnessRpgExerciseAdaptation;
  const stages = [
    { label: "Débutant", id: "eveil-heros", minutes: [30, 40, 50, 60] },
    { label: "Intermédiaire", id: "marche-aventurier", minutes: [65, 80, 95, 110] },
    { label: "Avancé", id: "coeur-dragon", minutes: [120, 130, 140, 150] }
  ];
  const activityTypes = { walk: "Marche", bike: "Vélo", other: "Autre endurance" };
  const labels = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  const slots = [0, 2, 4];

  function enabled(goal = State.getGoalId()) {
    return goal === "perte-poids" && State.getProfile()?.weightPlanningEnabled === true;
  }

  function currentStage() {
    return stages.find((stage) => !Programs.getProgramProgressDetails(stage.id).campaignComplete) || stages.at(-1);
  }

  function campaignWeek(id) {
    return Programs.getRepeatWeek(id)?.weekNumber || Programs.getSuggestedProgramPosition(id).weekNumber;
  }

  function secondsPerUnit(unit) {
    if (unit === "min" || unit === "minutes") return 60;
    if (["sec", "s", "secondes"].includes(unit)) return 1;
    if (["répétitions", "reps"].includes(unit)) return 4;
    return 0;
  }

  function fitWorkout(exercises, minutes, overhead = 10) {
    const prepared = exercises.map((item) => ({
      item, rate: secondsPerUnit(item.unit), seconds: Number(item.amount) * secondsPerUnit(item.unit)
    })).filter(({ seconds }) => Number.isFinite(seconds) && seconds > 0);
    const budget = Math.floor(minutes * 60) - overhead * prepared.length;
    if (budget <= 0) return [];
    const ratio = Math.min(1, budget / prepared.reduce((sum, item) => sum + item.seconds, 0));
    return prepared.flatMap(({ item, rate, seconds }) => {
      const amount = Math.floor(seconds * ratio / rate * 10) / 10;
      // Une répétition est entière, une durée peut être fractionnaire.
      const safeAmount = rate === 4 ? Math.floor(amount) : amount;
      return safeAmount >= (rate === 60 ? 0.1 : 1) ? [{ ...item, amount: safeAmount }] : [];
    });
  }

  function adaptWorkout(programId, workout, { boss = false, dayNumber = 0, sport = State.getSportProfile(), allowIncrease = true } = {}) {
    if (!enabled() || !stages.some((stage) => stage.id === programId)) return null;
    const advice = window.FitnessRpgSport.getTrainingRecommendation(sport);
    if (advice?.mode === "professional-review") return { exercises: [], restricted: true };
    const coach = window.FitnessRpgAdaptiveCoach?.adjustment(programId, boss ? "program-boss" : "program");
    if (coach?.blocked) return { exercises: [], restricted: true };
    const minutes = (advice?.initialMinutes ?? sport.preferredDuration) * (coach?.factor ?? 1);

    const source = [...(workout?.exercises || [])];
    const trainingDay = !boss && !workout?.optional;
    if (trainingDay && [1, 3].includes(dayNumber)) {
      const families = new Set(source.map((item) => Adaptation.getMetadata(item.exerciseId)?.family));
      const equipment = sport.equipment || [];
      const addition = (exerciseId) => ({ exerciseId, phase: "Renforcement", amount: 6, unit: "répétitions" });
      if (!families.has("squat")) {
        const legs = equipment.includes("chair") ? "chair_squat" : "squats";
        source.splice(Math.max(1, source.length - 2), 0, addition(legs));
      }
      if (!families.has("push")) source.splice(Math.max(1, source.length - 2), 0, addition("wall_pushups"));
    }
    if (trainingDay && advice?.includeBalance && sport.equipment.includes("wall")
      && !sport.trainingProfile?.limitations.includes("balance")) {
      source.splice(Math.max(1, source.length - 2), 0, {
        exerciseId: "single_leg_balance", phase: "Équilibre · garder la main près du mur",
        amount: 15, unit: "sec", instructions: "Garde la main près d’un appui stable et repose le pied dès que nécessaire."
      });
    }
    const rated = Adaptation.assessWorkout({ exercises: source }, sport).movements;
    const selected = rated.flatMap((movement) => movement.item && !coach?.paused.includes(movement.item.exerciseId)
      ? [movement.item] : []);
    const base = fitWorkout(selected, minutes);
    const usedSeconds = base.reduce((sum, item) => sum + 10 + item.amount * secondsPerUnit(item.unit), 0);
    const index = allowIncrease && coach?.increase
      ? base.findIndex((item) => Adaptation.getMetadata(item.exerciseId)?.family === "cardio" && item.unit === "min")
      : -1;
    const extra = index >= 0 ? Math.min(1, Math.floor(base[index].amount) / 10, Math.floor((minutes * 60 - usedSeconds) / 6) / 10) : 0;
    if (extra > 0) base[index].amount = Math.round((base[index].amount + extra) * 10) / 10;
    const exercises = base;
    const scored = exercises.some((item) => ["cardio", "squat", "push", "trunk"]
      .includes(Adaptation.getMetadata(item.exerciseId)?.family));
    return {
      exercises: scored ? exercises : [],
      minutes,
      increased: extra > 0,
      coachNote: extra > 0 ? "Progression acceptée : un bloc d’endurance a été légèrement allongé."
        : coach?.factor < 1 ? "Durée réduite après un bilan difficile." : "",
      omitted: source.length - exercises.length,
      substitutions: rated.filter((movement) => movement.status === "replace" && exercises.some((item) =>
        item.exerciseId === movement.item.exerciseId && item.phase === movement.item.phase)).length
    };
  }

  function allowWorkout(programId, workout, options) {
    const result = adaptWorkout(programId, workout, options);
    if (!result || result.exercises.length) return true;
    Programs.showMessage({
      title: "Séance à adapter",
      message: result.restricted ? "Demande un avis professionnel avant de reprendre ce parcours."
        : "Aucun mouvement principal ne correspond au profil et au temps disponible pour cette séance.",
      okText: "Compris"
    });
    return false;
  }

  function enduranceByActivity(items) {
    const totals = { walk: 0, bike: 0, other: 0 };
    for (const item of items || []) {
      const family = Adaptation.getMetadata(item.exerciseId)?.family;
      const category = window.FitnessRpgData.getExerciseById(item.exerciseId)?.categoryId;
      if (family ? family !== "cardio" : category !== "cardio") continue;
      const rate = secondsPerUnit(item.unit);
      const kind = ["walk", "slow_walk", "dynamic_walk", "walk_acceleration", "march_on_spot"].includes(item.exerciseId)
        ? "walk" : ["bike", "bike_acceleration"].includes(item.exerciseId) ? "bike" : "other";
      if (rate !== 4) totals[kind] += Math.max(0, Number(item.amount) * rate / 60 || 0);
    }
    return totals;
  }

  function recordedDays(keys = State.getWeekKeys(), { includeManual = true } = {}) {
    const days = new Map();
    const unique = new Set();
    const weekDays = new Set(keys);
    for (const entry of State.getAllEntries()) {
      if (!weekDays.has(State.getEntryDateKey(entry))) continue;
      if (!entry.id || unique.has(entry.id)) continue;
      unique.add(entry.id);
      const key = State.getEntryDateKey(entry);
      const day = days.get(key) || { walk: 0, bike: 0, other: 0 };
      const legacyWorkout = !entry.enduranceByActivity && entry.type === "program"
        && Programs.getProgramDay(entry.programId, entry.dayNumber, entry.weekNumber);
      const totals = entry.enduranceByActivity || enduranceByActivity(legacyWorkout?.exercises || [entry]);
      for (const kind of Object.keys(activityTypes)) day[kind] += Math.max(0, Number(totals[kind]) || 0);
      days.set(key, day);
    }

    const log = includeManual ? State.getProfile()?.weightActivity || {} : {};
    return new Map(keys.map((key) => {
      const manual = log[key] || {};
      const day = days.get(key) || {};
      // Une valeur manuelle représente le total de cette activité sur la journée.
      return [key, Object.keys(activityTypes).reduce((total, id) =>
        total + Math.max(day[id] || 0, Number(manual[id]) || 0), 0)];
    }));
  }

  function recordedMinutes() {
    return Math.floor([...recordedDays().values()].reduce((sum, minutes) => sum + minutes, 0));
  }

  function hasStrength(exercises) {
    return (exercises || []).some((item) => ["squat", "push", "trunk"].includes(Adaptation.getMetadata(item.exerciseId)?.family));
  }

  function saveActivity(date, kind, minutes) {
    const profile = State.getProfile();
    if (!profile || !State.getWeekKeys().includes(date) || date > State.todayKey()
      || !Object.hasOwn(activityTypes, kind) || !Number.isInteger(minutes) || minutes < 0 || minutes > 600) return false;
    const previous = profile.weightActivity;
    const day = { ...previous?.[date], [kind]: minutes };
    profile.weightActivity = { ...previous, [date]: day };
    try {
      State.saveProfile();
      return true;
    } catch (error) {
      profile.weightActivity = previous;
      console.error("Fitness RPG - activité non sauvegardée", error);
      return false;
    }
  }

  function activityFormHtml(actionAttribute = "data-weight-plan") {
    const keys = State.getWeekKeys();
    return `
      <details>
        <summary>Renseigner l’endurance du jour ou de la semaine</summary>
        <p>Indique le total quotidien par activité, journal compris. Ressaisir une valeur la remplace. Le planning retient le plus grand des deux totaux pour chaque activité.</p>
        <label>Date <select id="weightActivityDate">${keys.filter((key) => key <= State.todayKey()).reverse()
          .map((key) => `<option value="${key}">${key.split("-").reverse().join("/")}</option>`).join("")}</select></label>
        <label>Activité <select id="weightActivityKind">${Object.entries(activityTypes)
          .map(([id, name]) => `<option value="${id}">${name}</option>`).join("")}</select></label>
        <label>Minutes <input id="weightActivityMinutes" type="number" min="0" max="600" step="1" required></label>
        <button class="secondary-btn" type="button" ${actionAttribute}="log">Enregistrer le total</button>
      </details>
      <p id="weightActivityFeedback" role="status"></p>`;
  }

  function render(summary, grid) {
    if (!enabled()) return false;
    const sport = State.getSportProfile();
    const advice = window.FitnessRpgSport.getTrainingRecommendation(sport);
    const stage = currentStage();
    const week = campaignWeek(stage.id);
    const program = Programs.getProgram(stage.id);
    const days = Programs.getProgramDaysForWeek(stage.id, week).filter((day) => !day.optional).slice(0, 3);
    const completed = Programs.getCompletedProgramWeekDays(stage.id, week);
    const repeat = Programs.getRepeatWeek(stage.id);
    const boss = Programs.getProgramBoss(stage.id, week);
    const bossDone = Programs.getProgramProgressDetails(stage.id).weeks
      .find((item) => item.weekNumber === week)?.boss?.defeated;
    const coachAdjustment = window.FitnessRpgAdaptiveCoach?.adjustment();
    const blocked = advice?.mode === "professional-review" || coachAdjustment?.blocked;
    const minutes = advice?.initialMinutes ?? sport.preferredDuration;
    const remainingDays = Math.max(0, Math.min(2, sport.sessionsPerWeek - 3));
    const weeklyCapacity = minutes * Math.min(6, Math.max(1, sport.sessionsPerWeek));
    const campaignComplete = Programs.getProgramProgressDetails(stage.id).campaignComplete;
    const target = campaignComplete ? Math.min(300, Math.max(150, weeklyCapacity))
      : stage.minutes[Math.min(week - 1, 3)];
    const goalMinutes = Math.min(target, weeklyCapacity);
    const keys = State.getWeekKeys();

    summary.innerHTML = `
      <div class="planning-compact-header">
        <span class="eyebrow">Objectif Perte de poids</span>
        <strong>${stage.label} · ${program.title} · Semaine ${week}</strong>
      </div>
      <details id="weightPlanningInfo" ${blocked || coachAdjustment?.paused.length || summary.querySelector?.("#weightPlanningInfo")?.open ? "open" : ""}>
        <summary>Informations et conseils</summary>
        ${window.FitnessRpgSport.trainingRecommendationHtml(sport)}
        ${window.FitnessRpgAdaptiveCoach?.planningHtml() || ""}
        <p>${recordedMinutes()} min d’endurance cette semaine${blocked ? "" : ` · repère souple ${goalMinutes} min`}. Le repère à long terme est de 150 à 300 min d’endurance modérée par semaine, selon ta tolérance. Les minutes des séances guidées sont estimées.</p>
        <p>Les trois séances essentielles peuvent s’étaler sur plusieurs semaines. Les compléments et le total de minutes restent facultatifs.</p>
        <button class="secondary-btn" type="button" data-mobile-destination="hero-menu">Ouvrir le profil sportif</button>
      </details>
      ${window.FitnessRpgWeightDashboard?.measuresHtml() || ""}
      ${window.FitnessRpgWeightDashboard?.html() || ""}
      <button class="ghost-btn" type="button" data-weight-plan="toggle">Revenir au planning habituel</button>
      ${!blocked && !repeat && days.every((day) => completed.has(Number(day.day)))
        ? '<button class="secondary-btn" type="button" data-weight-plan="repeat">Recommencer cette semaine</button>' : ""}
      ${window.FitnessRpgHeroPlanning?.controlsHtml() || ""}
      ${activityFormHtml()}
    `;

    grid.innerHTML = labels.map((label, index) => {
      const day = days[slots.indexOf(index)];
      let content;
      if (day) {
        const dose = adaptWorkout(stage.id, day, { dayNumber: Number(day.day), sport });
        const strength = dose.exercises.some((item) => ["squat", "push"].includes(Adaptation.getMetadata(item.exerciseId)?.family));
        const canStart = dose.exercises.length && (repeat ? Number(day.day) === repeat.nextDay : !completed.has(Number(day.day)));
        content = `<h2>${day.title}</h2><p>Essentielle · ${dose.exercises.length
          ? `jusqu’à ${Math.round(dose.minutes * 10) / 10} min, fractionnables${strength ? " · renforcement" : ""}` : "à adapter"}.</p>
          ${canStart ? `<button class="secondary-btn" type="button" data-weight-plan="day" data-day="${day.day}">Ouvrir la séance</button>`
          : completed.has(Number(day.day)) ? "<span>Séance validée</span>" : ""}`;
      } else if (index === 5 && boss) {
        const unlocked = !blocked && !repeat && Programs.isProgramBossUnlocked(stage.id, week);
        content = `<h2>${boss.title}</h2><p>${bossDone ? "Boss vaincu" : unlocked ? "Boss débloqué" : "Boss après les trois séances essentielles"}</p>
          ${unlocked && !bossDone ? '<button class="secondary-btn" type="button" data-weight-plan="boss">Choisir la mission</button>' : ""}`;
      } else if (index === 1 || index === 3) {
        content = `<h2>${index === 1 ? "Endurance douce" : "Mobilité"}</h2><p>Facultatif · ${blocked || (index === 1 ? remainingDays < 1 : remainingDays < 2)
          ? "repos conseillé selon tes disponibilités" : index === 1 ? `marche ou vélo, jusqu’à ${minutes} min en plusieurs blocs si besoin`
          : `mobilité douce${advice?.includeBalance ? " et appui stable pour l’équilibre si adapté" : ""}, jusqu’à ${minutes} min`}.</p>`;
      } else {
        content = "<h2>Repos</h2><p>Récupération.</p>";
      }
      return `<article class="planning-day-card card${keys[index] === State.todayKey() ? " today" : ""}"><div class="planning-day-top"><strong>${label}</strong></div>${content}</article>`;
    }).join("");
    return true;
  }

  function handleActivityForm() {
    const amount = document.querySelector("#weightActivityMinutes");
    if (!amount?.reportValidity()) return;
    const date = document.querySelector("#weightActivityDate").value;
    const kind = document.querySelector("#weightActivityKind").value;
    const saved = saveActivity(date, kind, amount.valueAsNumber);
    if (saved) {
      Render.renderPlanningPage();
      document.querySelector("#weightActivityFeedback").textContent = "Total enregistré.";
    } else {
      document.querySelector("#weightActivityFeedback").textContent = "Total impossible à enregistrer.";
    }
  }

  function handleClick(button) {
    const profile = State.getProfile();
    if (!profile || State.getGoalId() !== "perte-poids") return;
    const action = button.dataset.weightPlan;
    if (action === "toggle") {
      profile.weightPlanningEnabled = !enabled();
      State.saveProfile();
      Render.renderPlanningPage();
      return;
    }
    if (!enabled()) return;
    if (action.startsWith("dashboard-")) {
      window.FitnessRpgWeightDashboard?.handle(button);
      return;
    }
    if (action.startsWith("coach-")) {
      window.FitnessRpgAdaptiveCoach?.handlePlanning(action);
      return;
    }
    if (action === "log") {
      handleActivityForm();
      return;
    }
    const stage = currentStage();
    const weekNumber = campaignWeek(stage.id);
    const dayNumber = Number(button.dataset.day || 1);
    Programs.openProgramDetail(stage.id, { weekNumber, dayNumber });
    if (action === "repeat") {
      Programs.startRepeatWeek(stage.id, weekNumber);
    } else if (action === "boss") {
      document.querySelector(".program-boss-choice")?.scrollIntoView({ block: "start" });
    } else {
      Programs.validateProgramDay(stage.id, dayNumber, weekNumber);
    }
  }

  window.FitnessRpgWeightPlanning = { enabled, currentStage, adaptWorkout, allowWorkout, fitWorkout, secondsPerUnit, activityFormHtml, handleActivityForm, enduranceByActivity, recordedDays, recordedMinutes, hasStrength, saveActivity, render, handleClick };
})();
