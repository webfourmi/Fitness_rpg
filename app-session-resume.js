// ============================================================
// Fitness RPG - reprise de séance active
// ============================================================

(() => {
  const Programs = window.FitnessRpgPrograms;
  const Render = window.FitnessRpgRender;
  const Navigation = window.FitnessRpgNavigation;
  const State = window.FitnessRpgState;

  if (!Programs || !Render || !Navigation || !State) return;

  function getSessionLabel(session) {
    if (!session) return "Séance de programme";

    const program = Programs.getProgram?.(session.programId)
      || window.FitnessRpgConfig?.getProgramById?.(session.programId);
    const programTitle = program?.title || "Programme";
    const weekNumber = Number(session.weekNumber || 1);

    if (session.type === "program-boss") {
      const boss = Programs.getProgramBoss?.(session.programId, weekNumber);
      const variant = Programs.getProgramBossVariant?.(
        session.programId,
        weekNumber,
        session.bossVariant || "indoor"
      );

      return `${programTitle} · Boss semaine ${weekNumber} · ${variant?.title || boss?.title || "Mission"}`;
    }

    const dayNumber = Number(session.dayNumber || 1);
    const day = Programs.getProgramDay?.(session.programId, dayNumber, weekNumber);

    return `${programTitle} · Semaine ${weekNumber} · Jour ${dayNumber} · ${day?.title || "Séance"}`;
  }

  function isSameSession(activeSession, nextSession) {
    if (!activeSession || !nextSession?.programId) return false;

    const activeType = activeSession.type === "program-boss" ? "program-boss" : "program";
    const nextType = nextSession.type === "program-boss" ? "program-boss" : "program";

    if (activeType !== nextType) return false;
    if (activeSession.programId !== nextSession.programId) return false;
    if (Number(activeSession.weekNumber || 1) !== Number(nextSession.weekNumber || 1)) return false;

    if (activeType === "program-boss") {
      return String(activeSession.bossVariant || "indoor")
        === String(nextSession.bossVariant || "indoor");
    }

    return Number(activeSession.dayNumber || 1) === Number(nextSession.dayNumber || 1);
  }

  function prepareStart(nextSession) {
    const activeSession = State.getActiveProgramSession?.();

    if (!activeSession) return { allowed: true, resume: false };
    if (isSameSession(activeSession, nextSession)) {
      return { allowed: true, resume: true, session: activeSession };
    }

    const confirmed = window.confirm(
      "Une séance est déjà en cours.\n\n" +
      `Séance actuelle : ${getSessionLabel(activeSession)}\n` +
      `Nouvelle séance : ${getSessionLabel(nextSession)}\n\n` +
      "Remplacer la séance actuelle ? Sa progression non terminée sera supprimée."
    );

    if (!confirmed) return { allowed: false, resume: false };

    State.clearActiveProgramSession?.();
    return { allowed: true, resume: false };
  }

  Programs.resumeActiveProgramSession = function resumeActiveProgramSession() {
    const session = State.getActiveProgramSession?.();

    if (!session) {
      Programs.showMessage?.({
        icon: "⚠️",
        title: "Aucune séance en cours",
        message: "Il n’y a aucune séance à reprendre.",
        okText: "Compris"
      });
      return;
    }

    const program = Programs.getProgram?.(session.programId);

    if (!program) {
      Programs.showMessage?.({
        icon: "⚠️",
        title: "Programme introuvable",
        message: "La séance est enregistrée, mais son programme est introuvable.",
        okText: "Compris"
      });
      return;
    }

    const weekNumber = Number(session.weekNumber || 1);
    const firstDay = Programs.getProgramDaysForWeek?.(session.programId, weekNumber)?.[0];
    const dayNumber = session.type === "program-boss"
      ? Number(firstDay?.day || 1)
      : Number(session.dayNumber || 1);

    Programs.setProgramBrowserSelection?.(
      session.programId,
      weekNumber,
      dayNumber,
      session
    );

    Navigation.setPage?.("programs");
    Render.renderProgramDetail?.(session.programId);
    Programs.scrollToProgramDetail?.();
  };

  Programs.abandonActiveProgramSession = function abandonActiveProgramSession() {
    const session = State.getActiveProgramSession?.();
    if (!session) return;

    const confirmed = window.confirm(
      `Abandonner « ${getSessionLabel(session)} » ?\n\n` +
      "La progression de cette séance en cours sera supprimée. " +
      "Les séances déjà terminées, l’XP et le journal seront conservés."
    );

    if (!confirmed) return;

    State.clearActiveProgramSession?.();
    State.setPose?.("idle");
    Render.renderAll?.();

    Programs.showMessage?.({
      icon: "🛡️",
      title: "Séance abandonnée",
      message: "La séance en cours a été supprimée. Ton historique et tes XP sont intacts.",
      okText: "Compris"
    });
  };

  Render.renderActiveSessionResumeCard = function renderActiveSessionResumeCard() {
    const card = document.querySelector("#activeSessionResumeCard");
    if (!card) return;

    const session = State.getActiveProgramSession?.();

    if (!session) {
      card.classList.add("hidden");
      card.innerHTML = "";
      return;
    }

    const program = Programs.getProgram?.(session.programId);
    const workout = Programs.getActiveProgramWorkout?.(session);
    const exercises = Array.isArray(workout?.exercises) ? workout.exercises : [];
    const total = exercises.length;
    const done = Math.min(total, State.getProgramSessionCompletedCount?.() || 0);
    const remaining = Math.max(0, total - done);
    const progress = total ? Math.round((done / total) * 100) : 0;
    const isBoss = session.type === "program-boss";
    const position = isBoss
      ? `Boss · Semaine ${Number(session.weekNumber || 1)}`
      : `Semaine ${Number(session.weekNumber || 1)} · Jour ${Number(session.dayNumber || 1)}`;

    card.innerHTML = `
      <div class="active-session-resume-header">
        <div>
          <p class="eyebrow">${isBoss ? "🐉 Boss en cours" : "⚔️ Séance en cours"}</p>
          <h2>${Render.escapeHtml(program?.title || "Programme")}</h2>
        </div>
        <strong>${done}/${total}</strong>
      </div>

      <p class="active-session-resume-position">${position}</p>
      <p class="active-session-resume-title">${Render.escapeHtml(workout?.title || workout?.subtitle || "Séance en cours")}</p>

      <div class="active-session-resume-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}">
        <span style="width:${progress}%"></span>
      </div>

      <div class="active-session-resume-meta">
        <span>${done} validé${done > 1 ? "s" : ""}</span>
        <span>${remaining} restant${remaining > 1 ? "s" : ""}</span>
      </div>

      <div class="active-session-resume-actions">
        <button id="resumeActiveProgramSessionButton" class="primary-btn" type="button">Reprendre la séance</button>
        <button id="abandonActiveProgramSessionButton" class="ghost-btn" type="button">Abandonner</button>
      </div>
    `;

    card.classList.remove("hidden");
  };

  const originalRenderTraining = Render.renderTraining;
  Render.renderTraining = function renderTrainingWithSessionResume() {
    originalRenderTraining?.();
    Render.renderActiveSessionResumeCard();
  };

  const originalValidateProgramDay = Programs.validateProgramDay;
  Programs.validateProgramDay = function guardedValidateProgramDay(
    programId,
    dayNumber,
    weekNumber = 1,
    options = {}
  ) {
    const decision = prepareStart({
      type: "program",
      programId,
      dayNumber: Number(dayNumber || 1),
      weekNumber: Number(weekNumber || 1)
    });

    if (!decision.allowed) return;
    if (decision.resume) {
      Programs.resumeActiveProgramSession();
      return;
    }

    return originalValidateProgramDay?.(programId, dayNumber, weekNumber, options);
  };

  const originalStartBoss = Programs.startProgramBossSession;
  Programs.startProgramBossSession = function guardedStartProgramBossSession(
    programId,
    weekNumber = 1,
    variantId = "indoor"
  ) {
    const decision = prepareStart({
      type: "program-boss",
      programId,
      weekNumber: Number(weekNumber || 1),
      dayNumber: 0,
      bossVariant: variantId || "indoor"
    });

    if (!decision.allowed) return;
    if (decision.resume) {
      Programs.resumeActiveProgramSession();
      return;
    }

    return originalStartBoss?.(programId, weekNumber, variantId);
  };

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element
      ? event.target
      : event.target?.parentElement;

    if (!target) return;

    if (target.closest("#resumeActiveProgramSessionButton")) {
      event.preventDefault();
      event.stopPropagation();
      Programs.resumeActiveProgramSession();
      return;
    }

    if (target.closest("#abandonActiveProgramSessionButton")) {
      event.preventDefault();
      event.stopPropagation();
      Programs.abandonActiveProgramSession();
    }
  }, true);
})();
