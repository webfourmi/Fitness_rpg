(() => {
  "use strict";

  const State = window.FitnessRpgState;
  const Render = window.FitnessRpgRender;
  const Sport = window.FitnessRpgSport;
  const messages = {
    urgent: "Arrête tout effort. En cas de douleur thoracique, de malaise ou d’essoufflement brutal ou marqué, appelle le 15 ou le 112 en France.",
    pause: "Suspends le mouvement concerné et demande un avis professionnel avant de le reprendre.",
    reduce: "Prends du repos si la fatigue persiste. Le prochain entraînement sera raccourci.",
    hold: "Garde le rythme actuel et ajuste les pauses à ta récupération.",
    offer: "Deux bilans comparables étaient faciles. Tu peux essayer d’allonger légèrement un seul mouvement d’endurance."
  };

  const history = () => State.getProfile()?.adaptiveCoach?.history || [];
  const safety = () => State.getProfile()?.adaptiveCoach?.safety || { paused: [] };
  const easy = (item) => item.effort >= 1 && item.effort <= 4 && item.pain === "none"
    && item.fatigue === "low" && item.recovery === "good";

  function decide(report, prior) {
    if (report.alert) return "urgent";
    if (report.pain === "significant") return "pause";
    if (report.effort >= 8 || report.fatigue === "high" || report.recovery === "poor" || report.pain === "unusual") return "reduce";
    const previous = prior[0];
    if (easy(report) && (!report.focus || report.progressionAllowed) && previous?.programId === report.programId
      && previous.type === report.type && previous.focus === report.focus
      && previous.result === "hold" && easy(previous)) return "offer";
    return "hold";
  }

  function save(next) {
    const profile = State.getProfile();
    if (!profile) return false;
    const previous = profile.adaptiveCoach;
    profile.adaptiveCoach = next;
    try {
      State.saveProfile();
      return true;
    } catch (error) {
      profile.adaptiveCoach = previous;
      console.error("Fitness RPG · bilan non enregistré", error);
      return false;
    }
  }

  function record(draft, input) {
    if (!draft?.sourceSessionId || history().some((item) => item.sessionId === draft.sourceSessionId)) return null;
    const allowed = (value, values) => values.includes(value) ? value : null;
    const report = {
      sessionId: draft.sourceSessionId, programId: draft.programId, type: draft.type, date: State.todayKey(),
      ...(draft.heroPlanningFocus && { focus: draft.heroPlanningFocus, progressionAllowed: draft.heroProgressionAllowed }),
      effort: Number.isInteger(input.effort) && input.effort >= 1 && input.effort <= 10 ? input.effort : null,
      pain: allowed(input.pain, ["none", "unusual", "significant"]),
      fatigue: allowed(input.fatigue, ["low", "medium", "high"]),
      recovery: allowed(input.recovery, ["good", "partial", "poor"]),
      alert: input.alert === true,
      exerciseId: draft.exercises?.find((item) => item.exerciseId === input.exerciseId)?.exerciseId || null
    };
    report.result = decide(report, history());
    report.choice = report.result === "offer" ? "pending" : null;
    const previous = safety();
    const next = {
      urgent: Boolean(previous.urgent || report.result === "urgent"),
      review: Boolean(previous.review || (report.result === "pause" && !report.exerciseId)),
      paused: report.result === "pause" && report.exerciseId
        ? [...new Set([...previous.paused, report.exerciseId])] : previous.paused
    };
    return save({ safety: next, history: [report, ...history()].slice(0, 150) }) ? report : null;
  }

  function adjustment(programId, type, focus) {
    const lock = safety();
    const latest = history()[0];
    return {
      blocked: Boolean(lock.urgent || lock.review), paused: lock.paused,
      factor: latest?.result === "reduce" ? 0.75 : 1,
      increase: Boolean(!lock.urgent && !lock.review && !lock.paused.length
        && latest?.choice === "accepted" && latest.programId === programId && latest.type === type && latest.focus === focus)
    };
  }

  function choose(choice) {
    const [latest, ...rest] = history();
    const lock = safety();
    if (latest?.choice !== "pending" || !["accepted", "declined"].includes(choice)
      || lock.urgent || lock.review || lock.paused.length) return false;
    return save({ safety: lock, history: [{ ...latest, choice }, ...rest] });
  }

  function consume() {
    const [latest, ...rest] = history();
    if (latest?.choice !== "accepted") return false;
    return save({ safety: safety(), history: [{ ...latest, choice: "applied" }, ...rest] });
  }

  const escape = (value) => Render.escapeHtml(value);
  const coach = () => escape(window.FitnessRpgData.getCoach(State.getCoachId?.())?.name || "Coach");

  function planningHtml(attribute = "data-weight-plan", focus = undefined) {
    const [latest] = history();
    if (!latest) return "";
    const lock = safety();
    const paused = lock.urgent || lock.review || lock.paused.length;
    const message = lock.urgent ? messages.urgent : paused ? messages.pause
      : latest.focus && latest.result === "offer" ? "Deux bilans comparables étaient faciles. Tu peux essayer une petite progression pour ton objectif."
      : messages[latest.result];
    return `<section aria-label="Coach adaptatif"><strong>${coach()}</strong><p>${message}</p>
      ${latest.choice === "pending" && latest.focus === focus && !paused
        ? `<button type="button" class="secondary-btn" ${attribute}="coach-accept">Essayer la progression</button> <button type="button" class="ghost-btn" ${attribute}="coach-decline">Garder mon rythme</button>` : ""}
      ${paused ? `<button type="button" class="ghost-btn" ${attribute}="coach-resume">Reprendre après avis professionnel</button>` : ""}
      <details><summary>Historique des ajustements</summary><ul>${history().slice(0, 8).map((item) =>
        `<li>${escape(item.date)} · ${messages[item.result] || ""}
        ${({ accepted: "Progression acceptée.", declined: "Rythme conservé.", applied: "Progression appliquée." })[item.choice] || ""}</li>`).join("")}</ul></details></section>`;
  }

  function handlePlanning(action) {
    if (action === "coach-resume") {
      if (window.confirm("As-tu reçu un avis professionnel te permettant de reprendre les mouvements suspendus ?")) {
        save({ safety: { urgent: false, review: false, paused: [] }, history: history() });
      }
    } else {
      choose(action === "coach-accept" ? "accepted" : "declined");
    }
    Render.renderPlanningPage();
  }

  function feedbackHtml(draft) {
    const exercises = [...new Map((draft.exercises || []).map((item) => [item.exerciseId, item.title]))];
    const select = (label, id, options, empty = "Non renseigné") => `<label>${label}<select id="${id}">
      <option value="">${empty}</option>${options.map(([key, text]) =>
        `<option value="${escape(key)}">${escape(text)}</option>`).join("")}</select></label>`;
    return `<h3>Bilan rapide avec ${coach()}</h3><div class="sport-profile-grid">
      ${select("Effort ressenti (1 à 10)", "coachEffort", Array.from({ length: 10 }, (_, i) => [i + 1, i + 1]))}
      ${select("Douleur inhabituelle", "coachPain", [["none", "Aucune"], ["unusual", "Légère et passagère"], ["significant", "Importante ou persistante"]])}
      ${select("Mouvement concerné", "coachExercise", exercises, "Je ne sais pas")}
      ${select("Fatigue", "coachFatigue", [["low", "Faible"], ["medium", "Modérée"], ["high", "Épuisement"]])}
      ${select("Récupération ressentie", "coachRecovery", [["good", "Bonne"], ["partial", "Partielle"], ["poor", "Difficile"]])}
      </div><label><input id="coachAlert" type="checkbox"> Douleur thoracique, malaise ou essoufflement brutal ou marqué</label>
      <p id="coachFeedbackStatus" role="status"></p>
      <button class="primary-btn" data-coach-feedback type="button">Enregistrer le bilan</button>
      <button class="sport-rpe-skip ghost-btn" type="button">Ne pas renseigner</button>`;
  }

  function submit(button) {
    const panel = button.closest(".sport-rpe-panel");
    const value = (id) => panel.querySelector(id).value;
    const alert = panel.querySelector("#coachAlert").checked;
    const report = record(Sport.pendingPerformanceDraft, {
      effort: Number(value("#coachEffort")), pain: value("#coachPain"), exerciseId: value("#coachExercise"),
      fatigue: value("#coachFatigue"), recovery: value("#coachRecovery"), alert
    });
    if (!report) {
      panel.querySelector("#coachFeedbackStatus").textContent = alert ? messages.urgent : "Le bilan n’a pas été enregistré.";
      return;
    }
    Sport.savePendingPerformance(report.effort);
    const message = report.focus && report.result === "offer"
      ? "Deux bilans comparables étaient faciles. Tu peux essayer une petite progression pour ton objectif."
      : messages[report.result];
    panel.innerHTML = `<strong>${coach()}</strong><p role="status">${message}</p>
      ${report.result === "offer" ? "<p>Choisis dans le planning si tu souhaites essayer cette progression.</p>" : ""}`;
  }

  function stopSession(kind, exerciseId) {
    const session = State.getActiveProgramSession();
    if (!session?.weightPlanningWorkout && !session?.heroPlanningWorkout) return;
    const alert = kind === "urgent";
    const report = record(Sport.captureSessionDraft(session), { alert, pain: "significant", exerciseId });
    State.clearActiveProgramSession();
    Render.renderProgramDetail?.(session.programId);
    window.FitnessRpgPrograms.showMessage({
      title: alert ? "Arrêt immédiat" : "Séance interrompue",
      message: (alert ? messages.urgent : messages.pause) + (report ? "" : " Le signalement n’a pas pu être sauvegardé."),
      okText: "Compris"
    });
  }

  document.addEventListener("change", (event) => {
    if (event.target.id !== "coachAlert") return;
    const status = event.target.closest(".sport-rpe-panel")?.querySelector("#coachFeedbackStatus");
    if (status) status.textContent = event.target.checked ? messages.urgent : "";
  });

  window.FitnessRpgAdaptiveCoach = { record, choose, consume, adjustment, planningHtml, handlePlanning, feedbackHtml, submit, stopSession };
})();
