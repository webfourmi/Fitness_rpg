(() => {
  "use strict";

  const State = window.FitnessRpgState;
  const Programs = window.FitnessRpgPrograms;
  const Render = window.FitnessRpgRender;
  const Data = window.FitnessRpgData;
  const Rules = window.FitnessRpgGoalRules;
  const Catalogue = window.FitnessRpgExerciseAdaptation;
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const labels = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  const complementPool = [
    "march_on_spot", "slow_walk", "bike", "chair_squat", "wall_pushups", "bridge",
    "dead_bug_simplified", "arm_circles", "hip_circles", "cat_cow", "ballet_weight_transfer", "slow_calf_raises"
  ];
  const escape = (value) => Render.escapeHtml(value);
  const planning = () => window.FitnessRpgWeightPlanning;

  function primaryProgramId() {
    return State.getActiveProgramId() || State.getRecommendedProgram()?.id || null;
  }

  function selection() {
    const profile = State.getProfile();
    const saved = profile?.heroPlanning;
    return saved?.goalId === State.getGoalId() && Rules.goalIds.includes(saved.focus) ? saved : null;
  }

  function assess(sport = State.getSportProfile()) {
    const saved = selection();
    return saved && Rules.assess(saved.focus, sport);
  }

  const recoveryChoices = {
    ready: "Bien récupéré", tired: "Encore fatigué", rest: "Reporter la séance", unknown: "Je préfère ne pas répondre"
  };

  function recovery() {
    const current = State.getProfile()?.heroPlanningRecovery;
    return current?.date === State.todayKey() && Object.hasOwn(recoveryChoices, current.choice) ? current.choice : null;
  }

  function saveRecovery(choice) {
    const profile = State.getProfile();
    if (!profile || !Object.hasOwn(recoveryChoices, choice)) return false;
    const previous = profile.heroPlanningRecovery;
    const previousRest = profile.heroPlanningRest;
    profile.heroPlanningRest = { ...previousRest, [State.todayKey()]: choice === "rest" };
    profile.heroPlanningRecovery = { date: State.todayKey(), choice };
    try {
      State.saveProfile();
      return true;
    } catch (error) {
      profile.heroPlanningRecovery = previous;
      profile.heroPlanningRest = previousRest;
      console.error("Fitness RPG · récupération non enregistrée", error);
      return false;
    }
  }

  function rewardEligibility() {
    const available = new Set();
    if (!selection()) return available;
    const keys = State.getWeekKeys();
    const week = new Set(keys);
    const profile = State.getProfile();
    const all = State.getAllEntries();
    const entries = all.filter((entry) => Rules.goalIds.includes(entry.heroPlanningFocus)
      && ["program", "program-boss"].includes(entry.type));
    const weekly = entries.filter((entry) => week.has(State.getEntryDateKey(entry)));
    const adapted = (entry) => entry.weightVariant || entry.heroProgressed;
    if (new Set(weekly.map(State.getEntryDateKey)).size >= 3) available.add("weight-traveler");
    const strength = weekly.filter((entry) => entry.weightStrength);
    if (new Set(strength.map(State.getEntryDateKey)).size >= 2 && strength.some(adapted)) available.add("weight-strength");
    const endurance = planning().recordedDays(keys);
    if (keys.some((key) => (profile.heroPlanningRest?.[key] || profile.camp?.lastPlannedRest === key)
      && !endurance.get(key) && !all.some((entry) => State.getEntryDateKey(entry) === key))) {
      available.add("weight-rest");
    }

    const passed = entries.some((entry) => {
      if (!adapted(entry) || entry.type !== "program") return false;
      const program = entry.programId;
      const weekNumber = Number(entry.weekNumber || 1);
      const essential = Programs.getProgramDaysForWeek(program, weekNumber).filter((day) => !day.optional);
      const completed = new Set(entries.filter((item) => item.type === "program"
        && item.programId === program && Number(item.weekNumber || 1) === weekNumber).map((item) => Number(item.dayNumber)));
      const boss = Programs.getProgramBoss(program, weekNumber);
      return essential.length > 0 && essential.every((day) => completed.has(Number(day.day)))
        && (!boss || boss.optional || all.some((item) => item.type === "program-boss" && item.programId === program
          && Number(item.weekNumber || 1) === weekNumber));
    });
    if (passed) available.add("weight-phoenix");
    return available;
  }

  function recoveryHtml() {
    return `<section aria-label="Récupération avant la séance">
      <label>Comment as-tu récupéré aujourd’hui ?
        <select id="heroRecovery"><option value="">Choisir une réponse</option>
          ${Object.entries(recoveryChoices).map(([id, label]) => `<option value="${id}" ${recovery() === id ? "selected" : ""}>${label}</option>`).join("")}
        </select>
      </label>
      <button type="button" class="secondary-btn" data-hero-plan="recovery">Confirmer ma récupération</button>
      <p id="heroRecoveryStatus" role="status">${recovery() === "rest" ? "Séances reportées pour aujourd’hui. Tu peux modifier ce choix." : ""}</p>
    </section>`;
  }

  function sessionSlots(sport, frequency) {
    const available = sport.trainingProfile?.availableDays || [];
    const candidates = (available.length ? days.filter((day) => available.includes(day)) : days).map((day) => days.indexOf(day));
    const capacity = Math.min(candidates.length, Math.max(0, sport.sessionsPerWeek ?? frequency));
    const slots = [];
    const count = Math.min(3, capacity);
    for (let i = 0; i < count; i += 1) {
      slots.push(candidates[Math.floor(i * candidates.length / count)]);
    }
    const extras = candidates.filter((index) => !slots.includes(index)).slice(0, Math.min(2, Math.max(0, Math.min(capacity, frequency) - slots.length)));
    return { essentials: slots, extras };
  }

  function compatibleComplements(rule, sport) {
    if (!rule) return [];
    const coach = window.FitnessRpgAdaptiveCoach?.adjustment();
    if (coach?.blocked) return [];
    return complementPool.flatMap((id) => {
      const exercise = Data.getExerciseById(id);
      const metadata = Catalogue.getMetadata(id);
      if (!exercise || !metadata || !rule.families.includes(metadata.family) || coach?.paused.includes(id)) return [];
      const result = Catalogue.resolveMovement({ exerciseId: id, unit: exercise.unit }, sport, {
        maxIntensity: rule.effortMax <= 4 ? "light" : "moderate"
      });
      return result.status === "keep" ? [exercise] : [];
    });
  }

  function adaptWorkout(id, workout, { boss = false, sport = State.getSportProfile(), allowIncrease = true } = {}) {
    if (!selection() || primaryProgramId() !== id || !workout) return null;
    const checked = assess(sport);
    const focus = selection().focus;
    const coach = window.FitnessRpgAdaptiveCoach?.adjustment(id, boss ? "program-boss" : "program", focus);
    const readiness = recovery();
    if (!checked?.rule || coach?.blocked) return { exercises: [], restricted: true };
    const { rule } = checked;
    const profileCap = window.FitnessRpgSport.getTrainingRecommendation(sport)?.initialMinutes ?? sport.preferredDuration;
    const minutes = Math.min(profileCap, rule.volume.kind.endsWith("Minutes") ? rule.volume.range[1] : profileCap)
      * Math.min(coach?.factor ?? 1, readiness === "tired" ? 0.75 : readiness === "unknown" ? 0.85 : 1);
    const moves = workout.exercises || [];
    const options = { maxIntensity: rule.effortMax <= 4 || readiness === "tired" ? "light" : "moderate" };
    const results = moves.map((item) => Catalogue.resolveMovement(item, sport, options));
    const sets = new Map();
    const pieces = results.flatMap((result) => {
      const item = result.item;
      if (!item || coach?.paused.includes(item.exerciseId)) return [];
      if (!boss && rule.volume.kind === "setsPerMovement" && rule.families.includes(Catalogue.getMetadata(item.exerciseId)?.family)
        && item.unit === "répétitions") {
        const count = sets.get(item.exerciseId) || 0;
        if (count >= rule.volume.range[1]) return [];
        sets.set(item.exerciseId, count + 1);
      }
      return [item];
    });
    const overhead = rule.recovery === "sameMuscles" ? 30 : 15;
    const exercises = planning().fitWorkout(pieces, minutes, overhead);
    const step = rule.advance;
    const progressionAllowed = !boss && ["duration", "repetitions"].includes(step?.parameter);
    let increased = false;
    if (allowIncrease && progressionAllowed && coach?.increase && coach.factor === 1 && readiness === "ready"
      && !Programs.getRepeatWeek(id)) {
      const isTimed = step.parameter === "duration";
      const item = exercises.find((move) => rule.families.includes(Catalogue.getMetadata(move.exerciseId)?.family)
        && (isTimed ? move.unit === "min" && move.amount >= 1 : move.unit === "répétitions" && move.amount >= 5));
      if (item) {
        const total = exercises.reduce((sum, move) => sum + overhead + move.amount * planning().secondsPerUnit(move.unit), 0);
        const extra = isTimed ? Math.min(step.step, Math.floor(item.amount) / 10) : 1;
        if (total + extra * planning().secondsPerUnit(item.unit) <= minutes * 60) {
          item.amount = Math.round((item.amount + extra) * 10) / 10;
          increased = true;
        }
      }
    }
    const usable = exercises.some((item) => Catalogue.getMetadata(item.exerciseId)?.family !== "breathing");
    return {
      exercises: usable ? exercises : [],
      minutes, focus, progressionAllowed, increased, substitutions: results.filter((result) => result.status === "replace").length,
      omitted: moves.length - exercises.length,
      coachNote: increased ? "Progression acceptée sur un seul mouvement."
        : readiness === "tired" || readiness === "unknown" || coach?.factor < 1 ? "Séance raccourcie par prudence."
        : "Séance ajustée aux mouvements compatibles et au temps disponible."
    };
  }

  function allowWorkout(id, workout, options) {
    const result = adaptWorkout(id, workout, options);
    if (!result) return true;
    const readiness = recovery();
    if (!result.restricted && result.exercises.length && readiness && readiness !== "rest") return true;
    Programs.showMessage({
      title: "Séance à adapter",
      message: result.restricted ? "Demande un avis professionnel avant de reprendre le parcours personnalisé."
        : readiness === "rest" ? "Tu as choisi de reporter la séance. Tu peux revoir ce choix dans Planning."
        : !readiness ? "Confirme ta récupération dans Planning avant de démarrer."
        : "Aucun mouvement principal compatible avec ton profil et le temps disponible pour cette séance.",
      okText: "Compris"
    });
    return false;
  }

  function controlsHtml() {
    if (!State.getProfile()) return "";
    const saved = selection();
    const options = Rules.goalOptions(State.getGoalId());
    const preferred = saved?.focus || (options.length === 1 ? options[0] : "");
    return `<details ${saved ? "open" : ""}><summary>La Voie du Héros · Planning personnalisé</summary>
      <label>Priorité sportive <select id="heroPlanningFocus">
      <option value="">Choisir une priorité</option>
      ${Rules.goalIds.map((id) => `<option value="${id}" ${id === preferred ? "selected" : ""}>${escape(Rules.getRule(id, "beginner").title)}</option>`).join("")}
      </select></label>
      <button type="button" class="primary-btn" data-hero-plan="apply">${saved ? "Appliquer la priorité" : "Personnaliser le planning"}</button>
      ${saved || planning().enabled() ? '<button type="button" class="ghost-btn" data-hero-plan="disable">Revenir au planning habituel</button>' : ""}
      <p id="heroPlanningStatus" role="status"></p>
    </details>`;
  }

  function render(summary, grid) {
    const saved = selection();
    if (!saved) return false;
    const sport = State.getSportProfile();
    const checked = assess(sport);
    const id = primaryProgramId();
    const program = Programs.getProgram(id);
    const repeat = id && Programs.getRepeatWeek(id);
    const weekNumber = id ? (repeat?.weekNumber || Programs.getPlanningBossWeekNumber(id)) : 1;
    const done = id ? Programs.getCompletedProgramWeekDays(id, weekNumber) : new Set();
    const essential = id ? Programs.getProgramDaysForWeek(id, weekNumber).filter((day) => !day.optional).slice(0, 3) : [];
    const pending = essential.filter((day) => repeat ? Number(day.day) >= Number(repeat.nextDay) : !done.has(Number(day.day)));
    const boss = id && Programs.getProgramBoss(id, weekNumber);
    const bossUnlocked = boss && !repeat && Programs.isProgramBossUnlocked(id, weekNumber);
    const bossDefeated = boss && State.getAllEntries().some((entry) => entry.type === "program-boss"
      && entry.programId === id && Programs.getProgramEntryPosition(entry).weekNumber === weekNumber);
    const slots = sessionSlots(checked.rule ? sport : { ...sport, sessionsPerWeek: 0 }, checked.rule?.frequency[1] || 0);
    const complements = checked.rule && !window.FitnessRpgAdaptiveCoach?.adjustment().blocked
      ? compatibleComplements(checked.rule, sport) : [];
    const two = [0, 1].map((index) => complements.find((item) => item.id === saved.complements?.[index]) || complements[index % complements.length]);
    const plannedDays = pending.slice(0, slots.essentials.length);

    summary.innerHTML = `<div class="planning-compact-header"><strong>${escape(program?.title || "Aucun programme actif")}</strong>
      <span>Semaine ${weekNumber} · ${essential.filter((day) => done.has(Number(day.day))).length}/${essential.length} séances essentielles validées</span></div>
      ${controlsHtml()}
      ${recoveryHtml()}
      ${window.FitnessRpgAdaptiveCoach?.planningHtml("data-hero-plan", saved.focus) || ""}
      ${window.FitnessRpgSport.trainingRecommendationHtml(sport)}
      <p>${checked.rule ? `Temps disponible · ${sport.preferredDuration} min par séance. Les compléments sont facultatifs.`
        : "Le planning personnalisé attend un profil compatible ou un avis professionnel."}</p>
      ${pending.length > plannedDays.length && checked.rule ? "<p>Les séances essentielles restantes peuvent être reportées à la semaine suivante.</p>" : ""}
      ${boss ? `<p>${escape(boss.title)} · ${bossDefeated ? "Vaincu" : bossUnlocked ? "Débloqué" : "Après les séances essentielles"}</p>` : ""}
      ${bossUnlocked && !bossDefeated && checked.rule ? '<button type="button" class="secondary-btn" data-hero-plan="boss">Voir la mission du boss</button>' : ""}
      ${essential.length && pending.length === 0 && checked.rule ? '<button type="button" class="secondary-btn" data-hero-plan="repeat">Recommencer cette semaine</button>' : ""}
      ${complements.length ? `<details><summary>Deux compléments facultatifs</summary>
        <p>Tu peux les faire séparément, selon tes disponibilités.</p>
        ${two.map((item) => `<button type="button" class="secondary-btn" data-hero-plan="exercise" data-exercise="${item.id}">${escape(item.title)}</button>`).join("")}
        <p>Changer les compléments</p>
        ${two.map((selected, index) => `<label>Complément ${index + 1} <select id="heroComplement${index}">
          ${complements.map((item) => `<option value="${item.id}" ${item.id === selected.id ? "selected" : ""}>${escape(item.title)}</option>`).join("")}</select></label>`).join("")}
        <button type="button" class="secondary-btn" data-hero-plan="complements">Enregistrer les compléments</button></details>`
        : "<p>Compléments facultatifs · aucune suggestion compatible pour le moment.</p>"}
      ${window.FitnessRpgHeroDashboard?.html(checked.rule) || ""}
      ${window.FitnessRpgWeightDashboard?.heroRewardsHtml(rewardEligibility()) || ""}
      ${planning().activityFormHtml("data-hero-plan")}
      <p>${planning().recordedMinutes()} min d’endurance cette semaine</p>`;

    grid.innerHTML = labels.map((label, index) => {
      const day = plannedDays[slots.essentials.indexOf(index)];
      const complement = two[slots.extras.indexOf(index)];
      const adapted = day && adaptWorkout(id, day);
      const content = day ? `<h2>${escape(day.title)}</h2><p>Essentielle · ${adapted.exercises.length
        ? `${Math.round(adapted.minutes * 10) / 10} min max estimées · ${adapted.substitutions} variante(s) · ${adapted.omitted} mouvement(s) écarté(s)` : "à adapter"}</p>
        ${adapted.exercises.length && (!repeat || Number(day.day) === repeat.nextDay)
          ? `<button type="button" class="secondary-btn" data-hero-plan="day" data-day="${day.day}">Démarrer la séance</button>` : ""}`
        : complement ? `<h2>${escape(complement.title)}</h2><p>Complément facultatif</p>
          <button type="button" class="secondary-btn" data-hero-plan="exercise" data-exercise="${complement.id}">Voir le mouvement</button>` : "<h2>Repos</h2>";
      return `<article class="planning-day-card card"><div class="planning-day-top"><strong>${label}</strong></div>${content}</article>`;
    }).join("");
    return true;
  }

  function handle(button) {
    const profile = State.getProfile();
    if (!profile) return;
    const action = button.dataset.heroPlan;
    if (action === "apply") {
      const focus = document.querySelector("#heroPlanningFocus").value;
      if (!Rules.goalIds.includes(focus)) {
        document.querySelector("#heroPlanningStatus").textContent = "Choisis une priorité sportive.";
        return;
      }
      if (selection()?.focus !== focus) profile.heroPlanning = { goalId: State.getGoalId(), focus };
      profile.weightPlanningEnabled = false;
    } else if (action === "disable") {
      profile.heroPlanning = null;
      profile.weightPlanningEnabled = false;
    } else if (action === "recovery") {
      if (!selection()) return;
      if (saveRecovery(document.querySelector("#heroRecovery").value)) {
        Render.renderPlanningPage();
        document.querySelector("#heroRecoveryStatus").textContent = "Récupération enregistrée pour aujourd’hui.";
      } else {
        document.querySelector("#heroRecoveryStatus").textContent = "Choisis une réponse pour continuer.";
      }
      return;
    } else if (action.startsWith("coach-")) {
      if (selection()) window.FitnessRpgAdaptiveCoach?.handlePlanning(action);
      return;
    } else if (action === "claim-reward") {
      const claimed = window.FitnessRpgWeightDashboard?.claim(button.dataset.milestone, "hero");
      Render.renderPlanningPage();
      const panel = document.querySelector("#heroPlanningRewards");
      if (panel) {
        panel.open = true;
        panel.querySelector("#heroPlanningRewardStatus").textContent = claimed ? "Trophée, XP et pièces ajoutés." : "Récompense indisponible.";
      }
      return;
    } else if (action === "dashboard-save") {
      if (selection()) window.FitnessRpgHeroDashboard?.handle(assess()?.rule, button);
      return;
    } else if (action === "log") {
      planning().handleActivityForm();
      return;
    } else {
      const saved = selection();
      if (!saved) return;
      if (action === "complements") {
        const compatible = compatibleComplements(assess()?.rule, State.getSportProfile());
        const ids = [0, 1].map((index) => document.querySelector(`#heroComplement${index}`).value);
        if (!ids.every((id) => compatible.some((item) => item.id === id))) return;
        saved.complements = ids;
      } else if (action === "exercise") {
        window.FitnessRpgNavigation.openExercises();
        window.FitnessRpgExercises.openExerciseDetails(button.dataset.exercise);
        return;
      } else {
        const id = primaryProgramId();
        const week = Programs.getRepeatWeek(id)?.weekNumber || Programs.getPlanningBossWeekNumber(id);
        const day = Number(button.dataset.day || 1);
        Programs.openProgramDetail(id, { weekNumber: week, dayNumber: day });
        if (action === "day") Programs.validateProgramDay(id, day, week);
        if (action === "repeat") Programs.startRepeatWeek(id, week);
        if (action === "boss") document.querySelector(".program-boss-choice")?.scrollIntoView({ block: "start" });
        return;
      }
    }
    State.saveProfile();
    Render.renderPlanningPage();
  }

  window.FitnessRpgHeroPlanning = { controlsHtml, render, handle, adaptWorkout, allowWorkout, saveRecovery, rewardEligibility, sessionSlots, compatibleComplements };
})();
