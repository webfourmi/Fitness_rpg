// ============================================================
// Fitness RPG - app-programs.js
// Version V5-clean
// ------------------------------------------------------------
// Rôle de ce fichier :
// - gérer les programmes complets ;
// - gérer la progression semaine / jour ;
// - calculer la quête du jour à partir du planning ;
// - démarrer et terminer une séance de programme ;
// - fournir les actions appelées par app-navigation.js.
//
// Règle importante :
// ce fichier ne contient aucune version.
// Il ne modifie jamais document.title.
// Les clics sont centralisés dans app-navigation.js.
// ============================================================

window.FitnessRpgPrograms = {};

// ============================================================
// Helpers UI
// ============================================================

window.FitnessRpgPrograms.showMessage = function showMessage(options = {}) {
  if (window.FitnessRpgRender?.showModal) {
    window.FitnessRpgRender.showModal(options);
    return;
  }

  window.alert(options.message || options.title || "Message");
};

window.FitnessRpgPrograms.scrollToProgramDetail = function scrollToProgramDetail() {
  window.setTimeout(() => {
    document.querySelector("#programDetail")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 80);
};

window.FitnessRpgPrograms.setCoachMessage = function setCoachMessage(message) {
  const coachMessage = document.querySelector("#coachMessage");
  if (coachMessage) coachMessage.textContent = message || "";
};

// ============================================================
// Reprise et remplacement sécurisé d’une séance active
// ============================================================

window.FitnessRpgPrograms.isSameActiveProgramSession = function isSameActiveProgramSession(
  activeSession,
  nextSession = {}
) {
  if (!activeSession || !nextSession.programId) return false;

  const activeType = activeSession.type === "program-boss"
    ? "program-boss"
    : "program";
  const nextType = nextSession.type === "program-boss"
    ? "program-boss"
    : "program";

  if (activeType !== nextType) return false;
  if (activeSession.programId !== nextSession.programId) return false;
  if (Number(activeSession.weekNumber || 1) !== Number(nextSession.weekNumber || 1)) {
    return false;
  }

  if (activeType === "program-boss") {
    return String(activeSession.bossVariant || "indoor")
      === String(nextSession.bossVariant || "indoor");
  }

  return Number(activeSession.dayNumber || 1) === Number(nextSession.dayNumber || 1);
};

window.FitnessRpgPrograms.getProgramSessionLabel = function getProgramSessionLabel(session = null) {
  if (!session) return "Séance de programme";

  const program = window.FitnessRpgPrograms.getProgram(session.programId);
  const programTitle = program?.title || "Programme";
  const weekNumber = Number(session.weekNumber || 1);

  if (session.type === "program-boss") {
    const boss = window.FitnessRpgPrograms.getProgramBoss(
      session.programId,
      weekNumber
    );
    const variant = window.FitnessRpgPrograms.getProgramBossVariant(
      session.programId,
      weekNumber,
      session.bossVariant || "indoor"
    );

    return `${programTitle} · Boss semaine ${weekNumber} · ${variant?.title || boss?.title || "Mission"}`;
  }

  const dayNumber = Number(session.dayNumber || 1);
  const day = window.FitnessRpgPrograms.getProgramDay(
    session.programId,
    dayNumber,
    weekNumber
  );

  return `${programTitle} · Semaine ${weekNumber} · Jour ${dayNumber} · ${day?.title || "Séance"}`;
};

window.FitnessRpgPrograms.prepareProgramSessionStart = function prepareProgramSessionStart(
  nextSession = {}
) {
  const activeSession = window.FitnessRpgState.getActiveProgramSession?.();

  if (!activeSession) {
    return { allowed: true, resume: false, session: null };
  }

  if (window.FitnessRpgPrograms.isSameActiveProgramSession(activeSession, nextSession)) {
    return { allowed: true, resume: true, session: activeSession };
  }

  const currentLabel = window.FitnessRpgPrograms.getProgramSessionLabel(activeSession);
  const nextLabel = window.FitnessRpgPrograms.getProgramSessionLabel(nextSession);
  const confirmed = window.confirm(
    "Une séance est déjà en cours.\n\n" +
    `Séance actuelle : ${currentLabel}\n` +
    `Nouvelle séance : ${nextLabel}\n\n` +
    "Remplacer la séance actuelle ? Sa progression non terminée sera supprimée."
  );

  if (!confirmed) {
    return { allowed: false, resume: false, session: activeSession };
  }

  window.FitnessRpgState.clearActiveProgramSession?.();
  return { allowed: true, resume: false, session: null };
};

window.FitnessRpgPrograms.resumeActiveProgramSession = function resumeActiveProgramSession() {
  const session = window.FitnessRpgState.getActiveProgramSession?.();

  if (!session) {
    window.FitnessRpgPrograms.showMessage({
      icon: "⚠️",
      title: "Aucune séance en cours",
      message: "Il n’y a aucune séance à reprendre.",
      okText: "Compris"
    });
    return;
  }

  const program = window.FitnessRpgPrograms.getProgram(session.programId);

  if (!program) {
    window.FitnessRpgPrograms.showMessage({
      icon: "⚠️",
      title: "Programme introuvable",
      message: "La séance est enregistrée, mais son programme est introuvable.",
      okText: "Compris"
    });
    return;
  }

  const weekNumber = Number(session.weekNumber || 1);
  const firstDay = window.FitnessRpgPrograms.getProgramDaysForWeek(
    session.programId,
    weekNumber
  )[0];
  const dayNumber = session.type === "program-boss"
    ? Number(firstDay?.day || 1)
    : Number(session.dayNumber || 1);

  window.FitnessRpgPrograms.setProgramBrowserSelection(
    session.programId,
    weekNumber,
    dayNumber,
    session
  );

  window.FitnessRpgNavigation?.setPage?.("programs");
  window.FitnessRpgRender?.renderProgramDetail?.(session.programId);
  window.FitnessRpgPrograms.scrollToProgramDetail();
};

window.FitnessRpgPrograms.abandonActiveProgramSession = function abandonActiveProgramSession() {
  const session = window.FitnessRpgState.getActiveProgramSession?.();
  if (!session) return;

  const label = window.FitnessRpgPrograms.getProgramSessionLabel(session);
  const confirmed = window.confirm(
    `Abandonner « ${label} » ?\n\n` +
    "La progression de cette séance en cours sera supprimée. " +
    "Les séances déjà terminées, l’XP et le journal seront conservés."
  );

  if (!confirmed) return;

  window.FitnessRpgState.clearActiveProgramSession?.();
  window.FitnessRpgState.setPose?.("idle");
  window.FitnessRpgRender?.renderAll?.();

  window.FitnessRpgPrograms.showMessage({
    icon: "🛡️",
    title: "Séance abandonnée",
    message: "La séance en cours a été supprimée. Ton historique et tes XP sont intacts.",
    okText: "Compris"
  });
};


// ============================================================
// Helpers programmes
// ============================================================

window.FitnessRpgPrograms.getProgram = function getProgram(programId) {
  return window.FitnessRpgConfig?.getProgramById?.(programId) || null;
};

window.FitnessRpgPrograms.getProgramDetail = function getProgramDetail(programId) {
  return window.FitnessRpgData?.getProgramDetail?.(programId) || null;
};

window.FitnessRpgPrograms.getProgramWeeks = function getProgramWeeks(programId) {
  const detail = window.FitnessRpgPrograms.getProgramDetail(programId);

  if (!detail) return [];

  if (Array.isArray(detail.weeks) && detail.weeks.length) {
    return detail.weeks.map((week, index) => ({
      week: Number(week.week || week.weekNumber || index + 1),
      title: week.title || `Semaine ${index + 1}`,
      days: Array.isArray(week.days)
        ? week.days
        : (Array.isArray(detail.days) ? detail.days : []),
      progression: week.progression || week.note || ""
    }));
  }

  const baseDays = Array.isArray(detail.days) ? detail.days : [];
  const weekLines = Array.isArray(detail.progression)
    ? detail.progression.filter((line) => /^\s*Semaine\s+\d+/i.test(String(line || "")))
    : [];

  const weekCount = Math.max(
    1,
    weekLines.length || Number(detail.weekCount || 0) || 1
  );

  return Array.from({ length: weekCount }, (_, index) => ({
    week: index + 1,
    title: `Semaine ${index + 1}`,
    days: baseDays,
    progression: weekLines[index] || ""
  }));
};

window.FitnessRpgPrograms.getProgramWeek = function getProgramWeek(programId, weekNumber = 1) {
  const weeks = window.FitnessRpgPrograms.getProgramWeeks(programId);
  const safeWeekNumber = Math.max(1, Number(weekNumber) || 1);

  return weeks.find((week) => Number(week.week) === safeWeekNumber)
    || weeks[0]
    || null;
};

window.FitnessRpgPrograms.getProgramDaysForWeek = function getProgramDaysForWeek(programId, weekNumber = 1) {
  const week = window.FitnessRpgPrograms.getProgramWeek(programId, weekNumber);

  if (week && Array.isArray(week.days) && week.days.length) {
    return week.days;
  }

  const detail = window.FitnessRpgPrograms.getProgramDetail(programId);
  return Array.isArray(detail?.days) ? detail.days : [];
};

window.FitnessRpgPrograms.getProgramDay = function getProgramDay(programId, dayNumber, weekNumber = 1) {
  const days = window.FitnessRpgPrograms.getProgramDaysForWeek(programId, weekNumber);

  if (!Array.isArray(days) || !days.length) return null;

  return days.find((day) => Number(day.day) === Number(dayNumber))
    || days[0]
    || null;
};

window.FitnessRpgPrograms.getProgramBosses = function getProgramBosses(programId) {
  const detail = window.FitnessRpgPrograms.getProgramDetail(programId);
  return Array.isArray(detail?.bosses) ? detail.bosses : [];
};

window.FitnessRpgPrograms.getProgramBoss = function getProgramBoss(programId, weekNumber = 1) {
  const bosses = window.FitnessRpgPrograms.getProgramBosses(programId);
  const safeWeekNumber = Math.max(1, Number(weekNumber) || 1);

  return bosses.find((boss) => Number(boss.week || boss.weekNumber || 1) === safeWeekNumber)
    || null;
};

window.FitnessRpgPrograms.getProgramBossVariant = function getProgramBossVariant(
  programId,
  weekNumber = 1,
  variantId = "indoor"
) {
  const boss = window.FitnessRpgPrograms.getProgramBoss(programId, weekNumber);

  if (!boss) return null;

  const variants = boss.variants || {};
  const wantedVariant = String(variantId || "indoor");

  if (variants[wantedVariant]) return variants[wantedVariant];
  if (variants.indoor) return variants.indoor;
  if (variants.outdoor) return variants.outdoor;

  const firstVariant = Object.values(variants)[0];
  if (firstVariant) return firstVariant;

  if (Array.isArray(boss.exercises) && boss.exercises.length) {
    return {
      id: "single",
      label: "⚔️ Boss",
      title: boss.title,
      mission: boss.coachLine || boss.subtitle || "",
      difficultyLabel: boss.difficultyLabel || "",
      exercises: boss.exercises
    };
  }

  return null;
};

window.FitnessRpgPrograms.getPlanningBossWeekNumber = function getPlanningBossWeekNumber(programId) {
  const weeks = window.FitnessRpgPrograms.getProgramWeeks(programId);
  const days = window.FitnessRpgPrograms.getProgramDaysForWeek(programId, 1);

  const weekCount = Math.max(1, weeks.length || 1);
  const daysPerWeek = Math.max(1, days.length || 3);
  const completedCount = window.FitnessRpgPrograms.getCompletedProgramSessionCount(programId);
  const bossWeekNumber = Math.ceil(Math.max(1, completedCount) / daysPerWeek);

  return Math.min(weekCount, Math.max(1, bossWeekNumber));
};

window.FitnessRpgPrograms.getActiveProgramWorkout = function getActiveProgramWorkout(session = null) {
  const activeSession = session || window.FitnessRpgState?.getActiveProgramSession?.();

  if (!activeSession) return null;

  if (activeSession.type === "program-boss") {
    const boss = window.FitnessRpgPrograms.getProgramBoss(
      activeSession.programId,
      activeSession.weekNumber || 1
    );

    const variant = window.FitnessRpgPrograms.getProgramBossVariant(
      activeSession.programId,
      activeSession.weekNumber || 1,
      activeSession.bossVariant || "indoor"
    );

    if (!boss || !variant) return null;

    return {
      ...variant,
      type: "program-boss",
      boss,
      title: boss.title,
      subtitle: variant.title || boss.subtitle || "",
      xp: boss.xp || 50,
      badgeId: boss.badgeId || null,
      exercises: Array.isArray(variant.exercises) ? variant.exercises : []
    };
  }

  return window.FitnessRpgPrograms.getProgramDay(
    activeSession.programId,
    activeSession.dayNumber,
    activeSession.weekNumber || 1
  );
};

window.FitnessRpgPrograms.getCompletedProgramWeekDays = function getCompletedProgramWeekDays(
  programId,
  weekNumber = 1
) {
  const entries = window.FitnessRpgState?.getAllEntries?.() || [];
  const safeWeekNumber = Number(weekNumber) || 1;

  return new Set(
    entries
      .filter((entry) => {
        return entry.type === "program"
          && entry.programId === programId
          && Number(entry.weekNumber || 1) === safeWeekNumber;
      })
      .map((entry) => Number(entry.dayNumber))
      .filter((dayNumber) => Number.isFinite(dayNumber) && dayNumber > 0)
  );
};

window.FitnessRpgPrograms.isProgramBossUnlocked = function isProgramBossUnlocked(
  programId,
  weekNumber = 1
) {
  const days = window.FitnessRpgPrograms.getProgramDaysForWeek(programId, weekNumber);
  const completedDays = window.FitnessRpgPrograms.getCompletedProgramWeekDays(
    programId,
    weekNumber
  );

  if (!Array.isArray(days) || !days.length) return false;

  return days.every((day) => completedDays.has(Number(day.day)));
};

window.FitnessRpgPrograms.getRecommendedProgram = function getRecommendedProgram() {
  return window.FitnessRpgState?.getRecommendedProgram?.()
    || window.FitnessRpgConfig?.getProgramById?.("eveil-heros")
    || null;
};

window.FitnessRpgPrograms.getRecommendedProgramId = function getRecommendedProgramId() {
  return window.FitnessRpgPrograms.getRecommendedProgram()?.id || "eveil-heros";
};

window.FitnessRpgPrograms.formatDayExercises = function formatDayExercises(day) {
  if (!day || !Array.isArray(day.exercises)) return "";

  return day.exercises.map((item) => {
    const exercise = window.FitnessRpgData?.getExerciseById?.(item.exerciseId);
    const phase = item.phase || "Exercice";
    const amount = window.FitnessRpgPrograms.formatExerciseAmount(item);

    return `${phase} : ${exercise?.title || item.exerciseId} (${amount})`;
  }).join(" · ");
};

// ============================================================
// Helpers affichage cycles / défis
// ============================================================

window.FitnessRpgPrograms.parseProgramPhase = function parseProgramPhase(rawPhase = "") {
  const phase = String(rawPhase || "").trim();
  const challengeMatch = phase.match(/défi\s*(\d+)(?:\s*·\s*cycle\s*(\d+))?/i);

  if (challengeMatch) {
    return {
      type: "challenge",
      icon: "⚔️",
      key: `defi-${challengeMatch[1]}`,
      title: `Défi ${challengeMatch[1]}`,
      cycle: Number(challengeMatch[2] || 1)
    };
  }

  const cycleMatch = phase.match(/^cycle\s*(\d+)/i);

  if (cycleMatch) {
    return {
      type: "challenge",
      icon: "⚔️",
      key: "defi",
      title: "Défi",
      cycle: Number(cycleMatch[1] || 1)
    };
  }

  if (/échauffement/i.test(phase)) {
    return {
      type: "warmup",
      icon: "🔥",
      key: "echauffement",
      title: "Échauffement",
      cycle: 1
    };
  }

  if (/retour|calme|respiration|étirement|etirement|récup/i.test(phase)) {
    return {
      type: "cooldown",
      icon: "🧘",
      key: "retour-calme",
      title: "Retour au calme",
      cycle: 1
    };
  }

  return {
    type: "phase",
    icon: "✨",
    key: phase.toLowerCase().replace(/[^a-z0-9]+/gi, "-") || "phase",
    title: phase || "Exercices",
    cycle: 1
  };
};

window.FitnessRpgPrograms.getProgramExerciseBlocks = function getProgramExerciseBlocks(exercises = []) {
  const blocks = [];
  const blockMap = new Map();

  (Array.isArray(exercises) ? exercises : []).forEach((item, index) => {
    const meta = window.FitnessRpgPrograms.parseProgramPhase(item?.phase);
    const blockKey = meta.key;

    if (!blockMap.has(blockKey)) {
      const block = {
        key: blockKey,
        type: meta.type,
        icon: meta.icon,
        title: meta.title,
        cycles: [],
        cycleMap: new Map()
      };

      blockMap.set(blockKey, block);
      blocks.push(block);
    }

    const block = blockMap.get(blockKey);
    const cycleNumber = meta.cycle || 1;

    if (!block.cycleMap.has(cycleNumber)) {
      const cycle = {
        number: cycleNumber,
        items: []
      };

      block.cycleMap.set(cycleNumber, cycle);
      block.cycles.push(cycle);
    }

    block.cycleMap.get(cycleNumber).items.push({
      ...item,
      originalIndex: index
    });
  });

  blocks.forEach((block) => {
    block.cycles.sort((a, b) => a.number - b.number);
    block.cycleCount = block.cycles.length;
    delete block.cycleMap;
  });

  return blocks;
};

window.FitnessRpgPrograms.getProgramExerciseStepMeta = function getProgramExerciseStepMeta(
  exercises = [],
  index = 0
) {
  const blocks = window.FitnessRpgPrograms.getProgramExerciseBlocks(exercises);

  for (const block of blocks) {
    for (const cycle of block.cycles) {
      const position = cycle.items.findIndex((item) => {
        return Number(item.originalIndex) === Number(index);
      });

      if (position >= 0) {
        return {
          block,
          cycle,
          position,
          blockLabel: `${block.icon} ${block.title}`,
          cycleLabel: block.cycleCount > 1
            ? `Cycle ${cycle.number} / ${block.cycleCount}`
            : "",
          stepLabel: `Exercice ${position + 1} / ${cycle.items.length}`
        };
      }
    }
  }

  return null;
};

window.FitnessRpgPrograms.formatExerciseAmount = function formatExerciseAmount(item) {
  if (!item) return "";
  return `${item.amount ?? ""} ${item.unit || ""}`.trim();
};

// ============================================================
// Boss de programme
// ============================================================

window.FitnessRpgPrograms.startProgramBossSession = function startProgramBossSession(
  programId,
  weekNumber = 1,
  variantId = "indoor"
) {
  if (!window.FitnessRpgState?.hasProfile?.()) {
    window.FitnessRpgPrograms.showMessage({
      icon: "🧙",
      title: "Héros requis",
      message: "Crée d’abord ton héros.",
      okText: "Compris"
    });
    return;
  }

  const boss = window.FitnessRpgPrograms.getProgramBoss(programId, weekNumber);
  const variant = window.FitnessRpgPrograms.getProgramBossVariant(
    programId,
    weekNumber,
    variantId
  );

  if (!boss || !variant) {
    window.FitnessRpgPrograms.showMessage({
      icon: "⚠️",
      title: "Boss introuvable",
      message: "Impossible de trouver ce boss.",
      okText: "Compris"
    });
    return;
  }

  if (!window.FitnessRpgPrograms.isProgramBossUnlocked(programId, weekNumber)) {
    window.FitnessRpgPrograms.showMessage({
      icon: "🔒",
      title: "Boss verrouillé",
      message: boss.lockedMessage || "Termine les séances de la semaine pour débloquer ce boss.",
      okText: "Compris"
    });
    return;
  }

  const startDecision = window.FitnessRpgPrograms.prepareProgramSessionStart({
    type: "program-boss",
    programId,
    weekNumber: Number(weekNumber || 1),
    dayNumber: 0,
    bossVariant: variant.id || variantId || "indoor"
  });

  if (!startDecision.allowed) return;

  if (startDecision.resume) {
    window.FitnessRpgPrograms.resumeActiveProgramSession();
    return;
  }

  if (typeof window.FitnessRpgState.startProgramBossSession === "function") {
    window.FitnessRpgState.startProgramBossSession(programId, weekNumber, variantId);
  } else {
    window.FitnessRpgState.activeProgramSession = {
      id: window.FitnessRpgState.createId
        ? window.FitnessRpgState.createId("program-boss-session")
        : `program-boss-${Date.now()}`,
      type: "program-boss",
      programId,
      weekNumber: Number(weekNumber || 1),
      dayNumber: 0,
      bossVariant: variantId || "indoor",
      startedAt: window.FitnessRpgState.nowIso
        ? window.FitnessRpgState.nowIso()
        : new Date().toISOString(),
      completedExerciseIds: [],
      completedExerciseKeys: []
    };
  }

  const activeSession = window.FitnessRpgState.getActiveProgramSession?.()
    || window.FitnessRpgState.activeProgramSession;

  if (activeSession) {
    activeSession.type = "program-boss";
    activeSession.programId = programId;
    activeSession.weekNumber = Number(weekNumber || 1);
    activeSession.dayNumber = 0;
    activeSession.bossVariant = variant.id || variantId || "indoor";
    activeSession.completedExerciseIds = Array.isArray(activeSession.completedExerciseIds)
      ? activeSession.completedExerciseIds
      : [];
    activeSession.completedExerciseKeys = Array.isArray(activeSession.completedExerciseKeys)
      ? activeSession.completedExerciseKeys
      : [];
  }

  window.FitnessRpgState.saveActiveProgramSession?.();
  window.FitnessRpgRender?.renderProgramDetail?.(programId);

  const coachLine = variant.mission || boss.coachLine || "Le boss t’attend.";
  window.FitnessRpgPrograms.setCoachMessage(coachLine);

  window.setTimeout(() => {
    document.querySelector("#activeProgramSession")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 80);
};

// ============================================================
// XP programme
// ============================================================

window.FitnessRpgPrograms.calculateProgramDayXp = function calculateProgramDayXp(
  programId,
  dayNumber,
  weekNumber = 1
) {
  const program = window.FitnessRpgPrograms.getProgram(programId);
  const day = program
    ? window.FitnessRpgPrograms.getProgramDay(programId, dayNumber, weekNumber)
    : null;

  if (!program || !day) return 10;
  if (day.xp) return Number(day.xp);

  const baseXp = Number(program.xp || 10);
  const exerciseCount = Array.isArray(day.exercises) ? day.exercises.length : 1;
  const bonus = Math.max(0, exerciseCount - 3) * 2;

  return Math.max(5, Math.round(baseXp + bonus));
};

window.FitnessRpgPrograms.describeProgramDay = function describeProgramDay(
  programId,
  dayNumber,
  weekNumber = 1
) {
  const program = window.FitnessRpgPrograms.getProgram(programId);
  const day = window.FitnessRpgPrograms.getProgramDay(programId, dayNumber, weekNumber);

  if (!program || !day) return "Séance de programme";

  return `${program.title} · Semaine ${weekNumber} · Jour ${day.day} · ${day.title}`;
};

// ============================================================
// Sélection semaine / jour dans la page programme
// ============================================================

window.FitnessRpgPrograms.programBrowser = {
  programId: null,
  weekNumber: null,
  dayNumber: null
};

window.FitnessRpgPrograms.getCompletedProgramSessionCount = function getCompletedProgramSessionCount(programId) {
  const entries = window.FitnessRpgState?.getAllEntries?.() || [];

  return entries.filter((entry) => {
    return entry.type === "program" && entry.programId === programId;
  }).length;
};

window.FitnessRpgPrograms.getSuggestedProgramPosition = function getSuggestedProgramPosition(programId) {
  const weeks = window.FitnessRpgPrograms.getProgramWeeks(programId);
  const weekCount = Math.max(1, weeks.length || 1);
  const firstWeekDays = window.FitnessRpgPrograms.getProgramDaysForWeek(programId, 1);
  const daysPerWeek = Math.max(1, firstWeekDays.length || 1);
  const completedCount = window.FitnessRpgPrograms.getCompletedProgramSessionCount(programId);
  const totalSlots = Math.max(1, weekCount * daysPerWeek);
  const slotIndex = Math.min(completedCount, totalSlots - 1);
  const weekNumber = Math.floor(slotIndex / daysPerWeek) + 1;
  const dayIndex = slotIndex % daysPerWeek;
  const weekDays = window.FitnessRpgPrograms.getProgramDaysForWeek(programId, weekNumber);
  const day = weekDays[dayIndex] || weekDays[0] || { day: 1 };

  return {
    weekNumber,
    dayNumber: Number(day.day) || 1,
    completedCount,
    weekCount,
    daysPerWeek
  };
};

window.FitnessRpgPrograms.setProgramBrowserSelection = function setProgramBrowserSelection(
  programId,
  weekNumber,
  dayNumber,
  context = {}
) {
  const weeks = window.FitnessRpgPrograms.getProgramWeeks(programId);
  const weekCount = Math.max(1, weeks.length || 1);
  const safeWeek = Math.min(weekCount, Math.max(1, Number(weekNumber) || 1));
  const days = window.FitnessRpgPrograms.getProgramDaysForWeek(programId, safeWeek);
  const fallbackDay = days[0]?.day || 1;
  const wantedDay = Number(dayNumber || fallbackDay);
  const hasDay = days.some((day) => Number(day.day) === wantedDay);
  const safeDay = hasDay ? wantedDay : fallbackDay;

  window.FitnessRpgPrograms.programBrowser = {
    programId,
    weekNumber: safeWeek,
    dayNumber: safeDay,
    planningDateKey: context.planningDateKey || null,
    planningIndex: Number.isFinite(Number(context.planningIndex))
      ? Number(context.planningIndex)
      : null,
    planningDayLabel: context.planningDayLabel || null,
    planningTitle: context.planningTitle || null,
    planningSource: context.planningSource || null
  };

  window.FitnessRpgState.selectedProgramId = programId;
  return window.FitnessRpgPrograms.programBrowser;
};

window.FitnessRpgPrograms.getProgramBrowserSelection = function getProgramBrowserSelection(programId) {
  const browser = window.FitnessRpgPrograms.programBrowser || {};

  if (browser.programId === programId && browser.weekNumber && browser.dayNumber) {
    return browser;
  }

  const suggested = window.FitnessRpgPrograms.getSuggestedProgramPosition(programId);

  return window.FitnessRpgPrograms.setProgramBrowserSelection(
    programId,
    suggested.weekNumber,
    suggested.dayNumber
  );
};

window.FitnessRpgPrograms.changeProgramWeek = function changeProgramWeek(delta) {
  const browser = window.FitnessRpgPrograms.programBrowser || {};
  if (!browser.programId) return;

  const nextWeek = Number(browser.weekNumber || 1) + Number(delta || 0);

  window.FitnessRpgPrograms.setProgramBrowserSelection(
    browser.programId,
    nextWeek,
    browser.dayNumber,
    browser
  );

  window.FitnessRpgRender?.renderProgramDetail?.(browser.programId);
};

window.FitnessRpgPrograms.changeProgramDay = function changeProgramDay(delta) {
  const browser = window.FitnessRpgPrograms.programBrowser || {};
  if (!browser.programId) return;

  const days = window.FitnessRpgPrograms.getProgramDaysForWeek(
    browser.programId,
    browser.weekNumber || 1
  );

  if (!days.length) return;

  const currentIndex = Math.max(
    0,
    days.findIndex((day) => Number(day.day) === Number(browser.dayNumber))
  );

  const nextIndex = Math.min(
    days.length - 1,
    Math.max(0, currentIndex + Number(delta || 0))
  );

  const nextDay = days[nextIndex] || days[0];

  window.FitnessRpgPrograms.setProgramBrowserSelection(
    browser.programId,
    browser.weekNumber || 1,
    nextDay.day,
    browser
  );

  window.FitnessRpgRender?.renderProgramDetail?.(browser.programId);
};

window.FitnessRpgPrograms.getSelectedProgramDay = function getSelectedProgramDay(programId) {
  const selection = window.FitnessRpgPrograms.getProgramBrowserSelection(programId);

  return window.FitnessRpgPrograms.getProgramDay(
    programId,
    selection.dayNumber,
    selection.weekNumber
  );
};

window.FitnessRpgPrograms.getSelectedProgramWeek = function getSelectedProgramWeek(programId) {
  const selection = window.FitnessRpgPrograms.getProgramBrowserSelection(programId);
  return window.FitnessRpgPrograms.getProgramWeek(programId, selection.weekNumber);
};

// ============================================================
// Ouverture programme
// ============================================================

window.FitnessRpgPrograms.openProgramList = function openProgramList() {
  const list = document.querySelector("#programList");
  const detail = document.querySelector("#programDetail");

  window.FitnessRpgState.selectedProgramId = null;
  window.FitnessRpgPrograms.programBrowser = {
    programId: null,
    weekNumber: null,
    dayNumber: null
  };

  if (list) list.classList.remove("hidden");

  if (detail) {
    detail.classList.add("hidden");
    detail.innerHTML = "";
  }

  window.FitnessRpgRender?.renderProgramList?.();
};

window.FitnessRpgPrograms.openProgramDetail = function openProgramDetail(programId, options = {}) {
  const program = window.FitnessRpgPrograms.getProgram(programId);

  if (!program) {
    window.FitnessRpgPrograms.showMessage({
      icon: "⚠️",
      title: "Programme introuvable",
      message: "Impossible d’ouvrir ce programme.",
      okText: "Compris"
    });
    return;
  }

  const suggested = window.FitnessRpgPrograms.getSuggestedProgramPosition(programId);
  const current = window.FitnessRpgPrograms.programBrowser || {};

  const weekNumber = options.weekNumber
    || (current.programId === programId ? current.weekNumber : null)
    || suggested.weekNumber;

  const dayNumber = options.dayNumber
    || (current.programId === programId ? current.dayNumber : null)
    || suggested.dayNumber;

  window.FitnessRpgPrograms.setProgramBrowserSelection(
    programId,
    weekNumber,
    dayNumber,
    {
      planningDateKey: options.planningDateKey || null,
      planningIndex: options.planningIndex,
      planningDayLabel: options.planningDayLabel || null,
      planningTitle: options.planningTitle || null,
      planningSource: options.planningSource || null
    }
  );

  if (window.FitnessRpgState?.getPage?.() !== "programs") {
    window.FitnessRpgNavigation?.setPage?.("programs");
  }

  window.FitnessRpgRender?.renderProgramDetail?.(programId);
  window.FitnessRpgPrograms.scrollToProgramDetail();
};

window.FitnessRpgPrograms.goToPlanning = function goToPlanning() {
  window.FitnessRpgState?.setPage?.("planning");
  window.FitnessRpgRender?.renderAll?.();

  window.setTimeout(() => {
    document.querySelector("#pagePlanning")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 80);
};

window.FitnessRpgPrograms.resetProgramProgress = function resetProgramProgress(programId) {
  const program = window.FitnessRpgPrograms.getProgram(programId);

  if (!program) {
    window.FitnessRpgPrograms.showMessage({
      icon: "⚠️",
      title: "Programme introuvable",
      message: "Impossible de réinitialiser ce programme.",
      okText: "Compris"
    });
    return;
  }

  const confirmed = window.confirm(
    `Réinitialiser le programme "${program.title}" ?\n\n` +
    "Les séances et boss validés de ce programme seront effacés.\n" +
    "L’XP total, le niveau et le journal général seront conservés."
  );

  if (!confirmed) return;

  const result = window.FitnessRpgState.resetProgramProgress?.(programId) || {
    removedEntries: 0,
    removedBadges: 0
  };

  window.FitnessRpgPrograms.programBrowser = {
    programId,
    weekNumber: 1,
    dayNumber: 1
  };

  window.FitnessRpgState.selectedProgramId = programId;

  window.FitnessRpgPrograms.showMessage({
    icon: "♻️",
    title: "Programme réinitialisé",
    message:
      `${program.title} repart à la semaine 1, jour 1.\n\n` +
      `Séances supprimées : ${result.removedEntries}\n` +
      "Les badges déjà gagnés sont conservés.",
    okText: "Parfait"
  });

  window.FitnessRpgRender?.renderAll?.();

  window.setTimeout(() => {
    window.FitnessRpgPrograms.openProgramDetail(programId, {
      weekNumber: 1,
      dayNumber: 1
    });
  }, 80);
};

window.FitnessRpgPrograms.chooseProgram = function chooseProgram(programId) {
  const program = window.FitnessRpgPrograms.getProgram(programId);

  if (!program) {
    window.FitnessRpgPrograms.showMessage({
      icon: "⚠️",
      title: "Programme introuvable",
      message: "Impossible de choisir ce programme.",
      okText: "Compris"
    });
    return;
  }

  if (!window.FitnessRpgState?.hasProfile?.()) {
    window.FitnessRpgPrograms.showMessage({
      icon: "🧙",
      title: "Héros requis",
      message: "Crée d’abord ton héros avant de choisir un programme.",
      okText: "Créer mon héros",
      onOk: () => {
        window.FitnessRpgNavigation?.openHeroSetup?.();
      }
    });
    return;
  }

  window.FitnessRpgState.setActiveProgramId(programId);
  window.FitnessRpgPrograms.setCoachMessage(
    `Programme actuel : ${program.title}. Le planning est recalculé.`
  );
  window.FitnessRpgRender?.renderAll?.();
};

// ============================================================
// Planning hebdomadaire
// ============================================================

window.FitnessRpgPrograms.getTodayPlanIndex = function getTodayPlanIndex() {
  const day = new Date().getDay();
  return day === 0 ? 6 : day - 1;
};

window.FitnessRpgPrograms.getWeeklyPlan = function getWeeklyPlan(goalId) {
  const plans = {
    "perte-poids": [
      ["Lun", "Marche douce", "marche-aventurier", "goal"],
      ["Mar", "Éveil du héros", "eveil-heros", "goal"],
      ["Mer", "Marche active", "marche-aventurier", "goal"],
      ["Jeu", "Tour de mage", "tour-mage", "goal"],
      ["Ven", "Marche ou vélo léger", "marche-aventurier", "goal"],
      ["Sam", "Cœur de dragon", "coeur-dragon", "goal"],
      ["Dim", "Repos actif", "tour-mage", "goal"]
    ],
    "reprise-douce": [
      ["Lun", "Éveil du héros", "eveil-heros", "goal"],
      ["Mar", "Repos ou marche douce", "marche-aventurier", "goal"],
      ["Mer", "Éveil du héros", "eveil-heros", "goal"],
      ["Jeu", "Tour de mage", "tour-mage", "goal"],
      ["Ven", "Repos", null, "rest"],
      ["Sam", "Éveil du héros", "eveil-heros", "goal"],
      ["Dim", "Marche tranquille", "marche-aventurier", "goal"]
    ],
    cardio: [
      ["Lun", "Cavalier de la route", "cavalier-route", "goal"],
      ["Mar", "Tour de mage", "tour-mage", "goal"],
      ["Mer", "Vélo ou cardio", "cavalier-route", "goal"],
      ["Jeu", "Repos actif", "marche-aventurier", "goal"],
      ["Ven", "Cœur de dragon", "coeur-dragon", "goal"],
      ["Sam", "Marche longue", "marche-aventurier", "goal"],
      ["Dim", "Repos", null, "rest"]
    ],
    renforcement: [
      ["Lun", "Forge du guerrier", "forge-guerrier", "goal"],
      ["Mar", "Rempart du héros", "rempart-heros", "goal"],
      ["Mer", "Bras du héros", "bras-heros", "goal"],
      ["Jeu", "Marche douce", "marche-aventurier", "goal"],
      ["Ven", "Forge du guerrier", "forge-guerrier", "goal"],
      ["Sam", "Défi boss hebdo", "boss-hebdo", "boss"],
      ["Dim", "Repos", null, "rest"]
    ],
    regularite: [
      ["Lun", "Marche de l’aventurier", "marche-aventurier", "goal"],
      ["Mar", "Éveil du héros", "eveil-heros", "goal"],
      ["Mer", "Marche courte", "marche-aventurier", "goal"],
      ["Jeu", "Tour de mage", "tour-mage", "goal"],
      ["Ven", "Marche de l’aventurier", "marche-aventurier", "goal"],
      ["Sam", "Programme libre", "eveil-heros", "goal"],
      ["Dim", "Repos actif", "tour-mage", "goal"]
    ],
    mobilite: [
      ["Lun", "Tour de mage", "tour-mage", "goal"],
      ["Mar", "Marche douce", "marche-aventurier", "goal"],
      ["Mer", "Rempart du héros", "rempart-heros", "goal"],
      ["Jeu", "Repos", null, "rest"],
      ["Ven", "Tour de mage", "tour-mage", "goal"],
      ["Sam", "Éveil du héros", "eveil-heros", "goal"],
      ["Dim", "Respiration et étirements", "tour-mage", "goal"]
    ]
  };

  return plans[goalId] || plans["reprise-douce"];
};

window.FitnessRpgPrograms.getCompletedMainSessionsThisWeek = function getCompletedMainSessionsThisWeek() {
  const weekKeys = window.FitnessRpgState?.getWeekKeys?.() || [];
  const mainWeekKeys = weekKeys.slice(0, 5);

  return mainWeekKeys.filter((dateKey) => {
    return (window.FitnessRpgState?.getEntriesForDate?.(dateKey) || []).some((entry) => {
      return entry.type === "program";
    });
  }).length;
};

window.FitnessRpgPrograms.getObjectiveProgramIds = function getObjectiveProgramIds(goalId) {
  const goal = window.FitnessRpgConfig?.getGoalById?.(goalId);

  if (Array.isArray(goal?.programProgression) && goal.programProgression.length) {
    return goal.programProgression;
  }

  if (goal?.recommendedProgramId) return [goal.recommendedProgramId];
  return ["eveil-heros", "marche-aventurier"];
};

window.FitnessRpgPrograms.getObjectiveProgramForSlot = function getObjectiveProgramForSlot(
  goalId,
  slotIndex
) {
  const activeProgramId = window.FitnessRpgState?.getActiveProgramId?.();
  const objectiveIds = window.FitnessRpgPrograms.getObjectiveProgramIds(goalId);
  const ids = objectiveIds.filter((programId) => {
    return programId && programId !== activeProgramId;
  });

  const safeIds = ids.length ? ids : objectiveIds;
  return safeIds[slotIndex % safeIds.length] || "eveil-heros";
};

window.FitnessRpgPrograms.getCombinedWeeklyPlan = function getCombinedWeeklyPlan(goalId) {
  const activeProgramId =
    window.FitnessRpgState?.getActiveProgramId?.()
    || window.FitnessRpgConfig?.getGoalById?.(goalId)?.recommendedProgramId
    || "eveil-heros";

  const activeProgram = window.FitnessRpgConfig?.getProgramById?.(activeProgramId);
  const objectiveProgram1Id = window.FitnessRpgPrograms.getObjectiveProgramForSlot(goalId, 0);
  const objectiveProgram2Id = window.FitnessRpgPrograms.getObjectiveProgramForSlot(goalId, 1);
  const objectiveProgram1 = window.FitnessRpgConfig?.getProgramById?.(objectiveProgram1Id);
  const objectiveProgram2 = window.FitnessRpgConfig?.getProgramById?.(objectiveProgram2Id);
  const completedMainSessions = window.FitnessRpgPrograms.getCompletedMainSessionsThisWeek();
  const bossWeekNumber = window.FitnessRpgPrograms.getPlanningBossWeekNumber(activeProgramId);
  const programBoss = window.FitnessRpgPrograms.getProgramBoss(
    activeProgramId,
    bossWeekNumber
  );

  const programBossDays = programBoss
    ? window.FitnessRpgPrograms.getProgramDaysForWeek(activeProgramId, bossWeekNumber)
    : [];

  const completedProgramBossDays = programBoss
    ? window.FitnessRpgPrograms.getCompletedProgramWeekDays(activeProgramId, bossWeekNumber)
    : new Set();

  const bossUnlocked = programBoss
    ? window.FitnessRpgPrograms.isProgramBossUnlocked(activeProgramId, bossWeekNumber)
    : completedMainSessions >= 5;

  const bossTitle = programBoss ? programBoss.title : "Défi boss hebdo";
  const bossProgramId = programBoss ? activeProgramId : "boss-hebdo";
  const bossSource = programBoss ? "program-boss" : "boss";
  const bossProgress = programBoss
    ? `${completedProgramBossDays.size}/${programBossDays.length}`
    : `${completedMainSessions}/5`;

  return [
    ["Lun", activeProgram?.title || "Programme choisi", activeProgramId, "active-program"],
    ["Mar", objectiveProgram1?.title || "Séance objectif", objectiveProgram1Id, "goal"],
    ["Mer", activeProgram?.title || "Programme choisi", activeProgramId, "active-program"],
    ["Jeu", objectiveProgram2?.title || "Séance objectif", objectiveProgram2Id, "goal"],
    ["Ven", activeProgram?.title || "Programme choisi", activeProgramId, "active-program"],
    bossUnlocked
      ? ["Sam", bossTitle, bossProgramId, bossSource, bossWeekNumber]
      : [
          "Sam",
          programBoss
            ? `Boss verrouillé · ${programBoss.title} · ${bossProgress} séances`
            : `Boss verrouillé · ${bossProgress} séances`,
          null,
          "boss-locked",
          bossWeekNumber
        ],
    ["Dim", "Repos", null, "rest"]
  ];
};

window.FitnessRpgPrograms.getTodayPlanningItem = function getTodayPlanningItem() {
  const goalId = window.FitnessRpgState?.getGoalId?.() || "reprise-douce";
  const plan = window.FitnessRpgPrograms.getCombinedWeeklyPlan(goalId);
  const todayIndex = window.FitnessRpgPrograms.getTodayPlanIndex();
  const item = plan[todayIndex] || plan[0] || [];

  return {
    index: todayIndex,
    dayLabel: item[0] || "Lun",
    title: item[1] || "Séance",
    programId: item[2] || null,
    source: item[3] || "goal",
    bossWeekNumber: Number(item[4] || 1),
    plan
  };
};

window.FitnessRpgPrograms.getSuggestedDayNumberForPlanItem = function getSuggestedDayNumberForPlanItem(item) {
  if (!item?.programId) return 1;
  return window.FitnessRpgPrograms.getSuggestedProgramPosition(item.programId).dayNumber;
};

window.FitnessRpgPrograms.getSuggestedWeekNumberForPlanItem = function getSuggestedWeekNumberForPlanItem(item) {
  if (!item?.programId) return 1;
  return window.FitnessRpgPrograms.getSuggestedProgramPosition(item.programId).weekNumber;
};

window.FitnessRpgPrograms.getTodayPlanningQuest = function getTodayPlanningQuest() {
  const item = window.FitnessRpgPrograms.getTodayPlanningItem();
  const program = item.programId
    ? window.FitnessRpgPrograms.getProgram(item.programId)
    : null;

  if (item.source === "boss-locked") {
    const missing = window.FitnessRpgPrograms.getMissingMainSessionsThisWeek();
    const firstMissing = missing[0] || null;

    return {
      ...item,
      type: "boss-locked",
      program: null,
      day: null,
      weekNumber: 1,
      dayNumber: 1,
      title: "Boss verrouillé",
      subtitle: "Défi du samedi non débloqué",
      description: firstMissing
        ? `Rattrape : ${firstMissing.dayLabel} · ${firstMissing.title}`
        : "Valide les séances nécessaires pour débloquer le boss."
    };
  }

  if (item.source === "program-boss") {
    const boss = window.FitnessRpgPrograms.getProgramBoss(
      item.programId,
      item.bossWeekNumber || 1
    );

    return {
      ...item,
      type: "program-boss",
      program,
      boss,
      weekNumber: item.bossWeekNumber || 1,
      dayNumber: 0,
      title: boss?.title || "Boss de programme",
      subtitle: `${item.dayLabel} · Boss semaine ${item.bossWeekNumber || 1}`,
      description: boss?.subtitle || "Choisis une mission intérieure ou extérieure."
    };
  }

  if (!item.programId || !program) {
    return {
      ...item,
      type: item.source === "boss" ? "boss" : "rest",
      program: null,
      day: null,
      weekNumber: 1,
      dayNumber: 1,
      title: item.title || "Repos",
      subtitle: item.dayLabel,
      description: item.source === "boss"
        ? "Défi hebdomadaire."
        : "Repos ou récupération douce."
    };
  }

  const weekNumber = window.FitnessRpgPrograms.getSuggestedWeekNumberForPlanItem(item);
  const dayNumber = window.FitnessRpgPrograms.getSuggestedDayNumberForPlanItem(item);
  const day = window.FitnessRpgPrograms.getProgramDay(
    item.programId,
    dayNumber,
    weekNumber
  );

  return {
    ...item,
    type: "program",
    program,
    day,
    weekNumber,
    dayNumber,
    title: program.title,
    subtitle: `Aujourd’hui · ${item.dayLabel} · Semaine ${weekNumber} · Jour ${dayNumber}`,
    description: day
      ? `${day.title} · ${day.difficultyLabel || program.duration}`
      : `${program.objective} · ${program.duration}`
  };
};

window.FitnessRpgPrograms.getTodayQuest = function getTodayQuest() {
  return window.FitnessRpgPrograms.getTodayPlanningQuest();
};

// ============================================================
// Séances futures / objectif
// ============================================================

window.FitnessRpgPrograms.getCompletedProgramDays = function getCompletedProgramDays(programId) {
  const entries = window.FitnessRpgState?.getAllEntries?.() || [];

  return new Set(
    entries
      .filter((entry) => entry.type === "program" && entry.programId === programId)
      .map((entry) => {
        const weekNumber = Number(entry.weekNumber || 1);
        const dayNumber = Number(entry.dayNumber || 0);

        if (dayNumber) return `${weekNumber}-${dayNumber}`;

        const match = String(entry.title || "").match(/Jour\s+(\d+)/i);
        return match ? `1-${Number(match[1])}` : null;
      })
      .filter(Boolean)
  );
};

window.FitnessRpgPrograms.getNextProgramSession = function getNextProgramSession(programId) {
  const weeks = window.FitnessRpgPrograms.getProgramWeeks(programId);
  const completed = window.FitnessRpgPrograms.getCompletedProgramDays(programId);
  const program = window.FitnessRpgPrograms.getProgram(programId);

  for (const week of weeks) {
    const days = Array.isArray(week.days) ? week.days : [];

    for (const day of days) {
      const weekNumber = Number(week.week || 1);
      const dayNumber = Number(day.day || 1);
      const key = `${weekNumber}-${dayNumber}`;

      if (!completed.has(key)) {
        return {
          type: "program",
          source: "active-program",
          programId,
          program,
          weekNumber,
          dayNumber,
          day,
          title: program?.title || "Programme",
          subtitle: `Semaine ${weekNumber} · Jour ${dayNumber} · ${day.title}`,
          description: program
            ? `${program.objective} · ${program.duration}`
            : "Séance du programme choisi."
        };
      }
    }
  }

  return null;
};

window.FitnessRpgPrograms.getNextGoalSession = function getNextGoalSession() {
  const goalId = window.FitnessRpgState?.getGoalId?.() || "reprise-douce";
  const goal = window.FitnessRpgConfig?.getGoalById?.(goalId);
  const activeProgramId = window.FitnessRpgState?.getActiveProgramId?.();
  const progression = Array.isArray(goal?.programProgression)
    ? goal.programProgression
    : [];

  const fallbackProgression = [
    "eveil-heros",
    "marche-aventurier",
    "coeur-dragon"
  ];

  const programIds = progression.length ? progression : fallbackProgression;
  const objectiveOnlyIds = programIds.filter((programId) => {
    return programId !== activeProgramId;
  });

  for (const programId of objectiveOnlyIds.length ? objectiveOnlyIds : programIds) {
    const session = window.FitnessRpgPrograms.getNextProgramSession(programId);

    if (session) {
      return {
        ...session,
        source: "goal",
        goalId,
        goal
      };
    }
  }

  return window.FitnessRpgPrograms.getNextProgramSession("eveil-heros");
};

// ============================================================
// Démarrage depuis planning / rattrapage
// ============================================================

window.FitnessRpgPrograms.openPlanningProgram = function openPlanningProgram(options = {}) {
  const programId = options.programId;
  if (!programId) return;

  const item = {
    index: Number(options.planningIndex || 0),
    dayLabel: options.planningDayLabel || "",
    title: options.planningTitle || "",
    programId,
    source: options.planningSource || "planning",
    dateKey: options.planningDateKey || ""
  };

  const weekNumber = window.FitnessRpgPrograms.getSuggestedWeekNumberForPlanItem(item);
  const dayNumber = window.FitnessRpgPrograms.getSuggestedDayNumberForPlanItem(item);

  window.FitnessRpgPrograms.openProgramDetail(programId, {
    weekNumber,
    dayNumber,
    planningDateKey: item.dateKey,
    planningIndex: item.index,
    planningDayLabel: item.dayLabel,
    planningTitle: item.title,
    planningSource: item.source
  });
};

window.FitnessRpgPrograms.startTodayPlanningSession = function startTodayPlanningSession() {
  if (!window.FitnessRpgState?.hasProfile?.()) {
    window.FitnessRpgPrograms.showMessage({
      icon: "🧙",
      title: "Héros requis",
      message: "Crée d’abord ton héros.",
      okText: "Créer mon héros",
      onOk: () => {
        window.FitnessRpgNavigation?.openHeroSetup?.();
      }
    });
    return;
  }

  const quest = window.FitnessRpgPrograms.getTodayPlanningQuest();

  if (quest.source === "boss-locked") {
    window.FitnessRpgPrograms.startWeeklyCatchupSession();
    return;
  }

  if (quest.type === "program-boss") {
    window.FitnessRpgPrograms.openProgramDetail(quest.programId, {
      weekNumber: quest.weekNumber || 1,
      dayNumber: 1
    });

    window.setTimeout(() => {
      document.querySelector(".program-boss-choice")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 120);
    return;
  }

  if (!quest.programId || quest.type === "rest" || quest.type === "boss") {
    window.FitnessRpgPrograms.showMessage({
      icon: quest.type === "boss" ? "🐉" : "🌙",
      title: quest.type === "boss" ? "Défi hebdomadaire" : "Jour de repos",
      message: quest.type === "boss"
        ? "Aucun boss de programme n’est disponible pour cette séance."
        : "Aujourd’hui, c’est repos. Ton héros a aussi droit à sa taverne.",
      okText: "Compris"
    });
    return;
  }

  window.FitnessRpgPrograms.openProgramDetail(quest.programId, {
    weekNumber: quest.weekNumber || 1,
    dayNumber: quest.dayNumber || 1
  });

  window.setTimeout(() => {
    window.FitnessRpgPrograms.validateProgramDay(
      quest.programId,
      quest.dayNumber || 1,
      quest.weekNumber || 1
    );
  }, 120);
};

window.FitnessRpgPrograms.getMissingMainSessionsThisWeek = function getMissingMainSessionsThisWeek() {
  const goalId = window.FitnessRpgState?.getGoalId?.() || "reprise-douce";
  const plan = window.FitnessRpgPrograms.getCombinedWeeklyPlan(goalId);
  const weekKeys = window.FitnessRpgState?.getWeekKeys?.() || [];

  return plan.slice(0, 5).map((item, index) => {
    const [dayLabel, title, programId, source] = item;
    const dateKey = weekKeys[index];
    const entries = window.FitnessRpgState?.getEntriesForDate?.(dateKey) || [];

    const done = programId
      ? entries.some((entry) => {
          return entry.type === "program" && entry.programId === programId;
        })
      : false;

    return {
      index,
      dayLabel,
      title,
      programId,
      source,
      dateKey,
      plan,
      done
    };
  }).filter((item) => item.programId && !item.done);
};

window.FitnessRpgPrograms.startWeeklyCatchupSession = function startWeeklyCatchupSession() {
  const missing = window.FitnessRpgPrograms.getMissingMainSessionsThisWeek();

  if (!missing.length) {
    window.FitnessRpgPrograms.showMessage({
      icon: "✅",
      title: "Semaine complète",
      message: "Toutes les séances principales sont déjà validées.",
      okText: "Parfait"
    });
    return;
  }

  const item = missing[0];
  const weekNumber = window.FitnessRpgPrograms.getSuggestedWeekNumberForPlanItem(item);
  const dayNumber = window.FitnessRpgPrograms.getSuggestedDayNumberForPlanItem(item);

  const planningContext = {
    planningDateKey: item.dateKey,
    planningIndex: item.index,
    planningDayLabel: item.dayLabel,
    planningTitle: item.title,
    planningSource: `catchup-${item.source || "planning"}`
  };

  window.FitnessRpgPrograms.openProgramDetail(item.programId, {
    weekNumber,
    dayNumber,
    ...planningContext
  });

  window.setTimeout(() => {
    window.FitnessRpgPrograms.validateProgramDay(
      item.programId,
      dayNumber,
      weekNumber,
      planningContext
    );
  }, 120);
};

// ============================================================
// Quête du jour
// ============================================================

window.FitnessRpgPrograms.openTodayProgram = function openTodayProgram() {
  const quest = window.FitnessRpgPrograms.getTodayPlanningQuest();
  if (!quest) return;

  if (quest.source === "boss-locked") {
    window.FitnessRpgPrograms.startWeeklyCatchupSession();
    return;
  }

  if (quest.type === "program-boss") {
    window.FitnessRpgPrograms.openProgramDetail(quest.programId, {
      weekNumber: quest.weekNumber || 1,
      dayNumber: 1
    });
    return;
  }

  if (!quest.programId || quest.type === "rest" || quest.type === "boss") {
    window.FitnessRpgPrograms.showMessage({
      icon: quest.type === "boss" ? "🐉" : "🌙",
      title: quest.type === "boss" ? "Défi hebdomadaire" : "Jour de repos",
      message: quest.type === "boss"
        ? "Aucun boss de programme n’est disponible pour cette séance."
        : "Aujourd’hui, ton planning indique repos ou récupération douce.",
      okText: "Compris"
    });
    return;
  }

  window.FitnessRpgPrograms.openProgramDetail(quest.programId, {
    weekNumber: quest.weekNumber || 1,
    dayNumber: quest.dayNumber || 1
  });
};

window.FitnessRpgPrograms.validateTodayRecommendedProgram = function validateTodayRecommendedProgram() {
  const quest = window.FitnessRpgPrograms.getTodayPlanningQuest();

  if (
    !quest?.programId
    || quest.type === "program-boss"
    || quest.type === "boss-locked"
    || quest.type === "boss"
    || quest.type === "rest"
  ) {
    window.FitnessRpgPrograms.openTodayProgram();
    return;
  }

  window.FitnessRpgPrograms.validateProgramDay(
    quest.programId,
    quest.dayNumber || 1,
    quest.weekNumber || 1
  );
};

// ============================================================
// Validation d’une séance de programme
// ============================================================

window.FitnessRpgPrograms.validateProgramDay = function validateProgramDay(
  programId,
  dayNumber,
  weekNumber = 1,
  options = {}
) {
  if (!window.FitnessRpgState?.hasProfile?.()) {
    window.FitnessRpgPrograms.showMessage({
      icon: "🧙",
      title: "Héros requis",
      message: "Crée d’abord ton héros.",
      okText: "Créer mon héros",
      onOk: () => {
        window.FitnessRpgNavigation?.openHeroSetup?.();
      }
    });
    return;
  }

  const program = window.FitnessRpgPrograms.getProgram(programId);
  const day = window.FitnessRpgPrograms.getProgramDay(programId, dayNumber, weekNumber);

  if (!program || !day) {
    window.FitnessRpgPrograms.showMessage({
      icon: "⚠️",
      title: "Séance introuvable",
      message: "Programme ou séance introuvable.",
      okText: "Compris"
    });
    return;
  }

  const browser = window.FitnessRpgPrograms.programBrowser || {};
  const browserMatches =
    browser.programId === programId
    && Number(browser.weekNumber || 1) === Number(weekNumber || 1)
    && Number(browser.dayNumber || 1) === Number(dayNumber || 1);

  const planningContext = {
    planningDateKey: options.planningDateKey || (browserMatches ? browser.planningDateKey : null),
    planningIndex: options.planningIndex ?? (browserMatches ? browser.planningIndex : null),
    planningDayLabel: options.planningDayLabel || (browserMatches ? browser.planningDayLabel : null),
    planningTitle: options.planningTitle || (browserMatches ? browser.planningTitle : null),
    planningSource: options.planningSource || (browserMatches ? browser.planningSource : null)
  };

  const startDecision = window.FitnessRpgPrograms.prepareProgramSessionStart({
    type: "program",
    programId,
    weekNumber: Number(weekNumber || 1),
    dayNumber: Number(dayNumber || 1)
  });

  if (!startDecision.allowed) return;

  if (startDecision.resume) {
    window.FitnessRpgPrograms.setProgramBrowserSelection(
      programId,
      weekNumber,
      dayNumber,
      startDecision.session || planningContext
    );
    window.FitnessRpgRender?.renderProgramDetail?.(programId);
    window.FitnessRpgPrograms.scrollToProgramDetail();
    return;
  }

  const activeSession = window.FitnessRpgState.startProgramSession?.(
    programId,
    dayNumber,
    weekNumber,
    planningContext
  );

  const session = activeSession || window.FitnessRpgState.getActiveProgramSession?.();

  if (!session) {
    window.FitnessRpgPrograms.showMessage({
      icon: "⚠️",
      title: "Démarrage impossible",
      message: "La séance n’a pas pu être démarrée.",
      okText: "Compris"
    });
    return;
  }

  session.type = "program";
  session.programId = programId;
  session.dayNumber = Number(dayNumber || 1);
  session.weekNumber = Number(weekNumber || 1);
  session.planningDateKey = planningContext.planningDateKey || null;
  session.planningIndex = planningContext.planningIndex ?? null;
  session.planningDayLabel = planningContext.planningDayLabel || null;
  session.planningTitle = planningContext.planningTitle || null;
  session.planningSource = planningContext.planningSource || null;
  session.completedExerciseIds = Array.isArray(session.completedExerciseIds)
    ? session.completedExerciseIds
    : [];
  session.completedExerciseKeys = Array.isArray(session.completedExerciseKeys)
    ? session.completedExerciseKeys
    : [];

  window.FitnessRpgState.saveActiveProgramSession?.();

  window.FitnessRpgPrograms.setProgramBrowserSelection(
    programId,
    weekNumber,
    dayNumber,
    planningContext
  );

  window.FitnessRpgRender?.renderProgramDetail?.(programId);

  window.setTimeout(() => {
    document.querySelector("#activeProgramSession")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 80);
};

window.FitnessRpgPrograms.validateProgramExercise = function validateProgramExercise(
  exerciseId,
  exerciseKey = null
) {
  const session = window.FitnessRpgState?.getActiveProgramSession?.();
  if (!session) return;

  const key = exerciseKey || exerciseId;
  window.FitnessRpgState.completeProgramSessionExercise?.(key);
  window.FitnessRpgState.saveActiveProgramSession?.();

  const exercise = window.FitnessRpgData?.getExerciseById?.(exerciseId);
  const coachId = window.FitnessRpgState?.getCoachId?.();

  if (exercise && coachId) {
    const message = window.FitnessRpgData?.getCoachMessage?.(
      coachId,
      "complete",
      exercise.id
    );

    if (message) window.FitnessRpgPrograms.setCoachMessage(message);
  }

  window.FitnessRpgRender?.renderProgramDetail?.(session.programId);
};

window.FitnessRpgPrograms.getCompletedExerciseKeys = function getCompletedExerciseKeys(session = null) {
  const activeSession = session || window.FitnessRpgState?.getActiveProgramSession?.();
  if (!activeSession) return [];

  const completed = activeSession.completedExerciseKeys
    || activeSession.completedExerciseIds
    || [];

  return Array.isArray(completed) ? completed : [];
};

window.FitnessRpgPrograms.isActiveProgramSessionComplete = function isActiveProgramSessionComplete() {
  const session = window.FitnessRpgState?.getActiveProgramSession?.();
  if (!session) return false;

  const workout = window.FitnessRpgPrograms.getActiveProgramWorkout(session);

  if (!workout || !Array.isArray(workout.exercises) || !workout.exercises.length) {
    return false;
  }

  const completed = window.FitnessRpgPrograms.getCompletedExerciseKeys(session);

  return workout.exercises.every((item, index) => {
    const key = `${index}-${item.exerciseId}`;
    return completed.includes(key) || completed.includes(item.exerciseId);
  });
};

window.FitnessRpgPrograms.resolveBadgeRewardMessage = function resolveBadgeRewardMessage(badgeId) {
  if (!badgeId) return "";

  const badge = (window.FitnessRpgData?.badges || []).find((item) => {
    return item.id === badgeId;
  });

  const badgeTitle = badge?.title || badgeId;

  if (window.FitnessRpgState?.hasBadge?.(badgeId)) {
    return `Badge déjà gagné : ${badgeTitle}.`;
  }

  const unlocked = window.FitnessRpgState?.unlockBadge?.(badgeId);
  return unlocked
    ? `Badge débloqué : ${badgeTitle}.`
    : `Badge déjà gagné : ${badgeTitle}.`;
};

window.FitnessRpgPrograms.finishProgramSession = function finishProgramSession() {
  const session = window.FitnessRpgState?.getActiveProgramSession?.();
  if (!session) return;

  if (session.type === "program-boss") {
    window.FitnessRpgPrograms.finishProgramBossSession();
    return;
  }

  if (!window.FitnessRpgPrograms.isActiveProgramSessionComplete()) {
    window.FitnessRpgPrograms.showMessage({
      icon: "🛡️",
      title: "Séance incomplète",
      message: "Valide tous les exercices avant de terminer la séance.",
      okText: "Compris"
    });
    return;
  }

  const program = window.FitnessRpgPrograms.getProgram(session.programId);
  const day = window.FitnessRpgPrograms.getProgramDay(
    session.programId,
    session.dayNumber,
    session.weekNumber || 1
  );

  if (!program || !day) {
    window.FitnessRpgPrograms.showMessage({
      icon: "⚠️",
      title: "Séance introuvable",
      message: "Impossible de terminer cette séance.",
      okText: "Compris"
    });
    return;
  }

  const xp = window.FitnessRpgProgress?.calculateProgramSessionXp
    ? window.FitnessRpgProgress.calculateProgramSessionXp(
        session.programId,
        session.dayNumber,
        session.weekNumber || 1
      )
    : window.FitnessRpgPrograms.calculateProgramDayXp(
        session.programId,
        session.dayNumber,
        session.weekNumber || 1
      );

  const difficulty = window.FitnessRpgProgress?.getProgramDayDifficulty?.(day) || {
    label: day.difficultyLabel || "Séance"
  };

  const weekNumber = Number(session.weekNumber || 1);
  const dayNumber = Number(session.dayNumber || day.day || 1);
  const title = `${program.title} · Semaine ${weekNumber} · Jour ${dayNumber} · ${day.title}`;
  const entryDate = session.planningDateKey || window.FitnessRpgState?.todayKey?.();

  window.FitnessRpgState.addTrainingEntry?.({
    date: entryDate,
    type: "program",
    sportId: "program",
    sportTitle: "Programme",
    programId: program.id,
    programTitle: program.title,
    weekNumber,
    dayNumber,
    planningDateKey: session.planningDateKey || null,
    planningIndex: session.planningIndex ?? null,
    planningDayLabel: session.planningDayLabel || null,
    planningTitle: session.planningTitle || null,
    planningSource: session.planningSource || null,
    title,
    amount: 1,
    unit: "séance",
    xp
  });

  window.FitnessRpgState.addJournalEntry?.({
    type: "program",
    title,
    text: `${difficulty.label} terminée : ${(day.exercises || []).length} exercices validés.`,
    xp
  });

  window.FitnessRpgState.setPose?.("victory");
  window.FitnessRpgState.clearActiveProgramSession?.();

  const coachId = window.FitnessRpgState.getCoachId?.();
  const message = window.FitnessRpgData?.getCoachMessage?.(coachId, "complete");

  window.FitnessRpgPrograms.setCoachMessage(
    `${message || "Séance terminée !"} +${xp} XP.`
  );

  window.FitnessRpgProgress?.checkBadges?.();
  window.FitnessRpgProgress?.checkWeeklyPlanningBonus?.();
  window.FitnessRpgRender?.renderAll?.();

  window.setTimeout(() => {
    window.FitnessRpgRender?.renderProgramDetail?.(program.id);
    window.FitnessRpgPrograms.scrollToProgramDetail();
  }, 80);
};

window.FitnessRpgPrograms.finishProgramBossSession = function finishProgramBossSession() {
  const session = window.FitnessRpgState?.getActiveProgramSession?.();

  if (!session || session.type !== "program-boss") return;

  if (!window.FitnessRpgPrograms.isActiveProgramSessionComplete()) {
    window.FitnessRpgPrograms.showMessage({
      icon: "🛡️",
      title: "Boss incomplet",
      message: "Valide tous les exercices avant de terminer le boss.",
      okText: "Compris"
    });
    return;
  }

  const program = window.FitnessRpgPrograms.getProgram(session.programId);
  const boss = window.FitnessRpgPrograms.getProgramBoss(
    session.programId,
    session.weekNumber || 1
  );

  const variant = window.FitnessRpgPrograms.getProgramBossVariant(
    session.programId,
    session.weekNumber || 1,
    session.bossVariant || "indoor"
  );

  const safeVariant = variant || {
    id: session.bossVariant || "indoor",
    label: session.bossVariant === "outdoor"
      ? "🌲 Boss Extérieur"
      : "🏠 Boss Intérieur",
    title: boss?.title || "Boss",
    exercises: boss?.exercises || []
  };

  if (!program || !boss) {
    window.FitnessRpgPrograms.showMessage({
      icon: "⚠️",
      title: "Boss introuvable",
      message: "Impossible de terminer ce boss.",
      okText: "Compris"
    });
    return;
  }

  const xp = Number(boss.xp || 50);
  const weekNumber = Number(session.weekNumber || 1);
  const title = `${program.title} · Semaine ${weekNumber} · ${boss.title} · ${safeVariant.label || safeVariant.title}`;

  window.FitnessRpgState.addTrainingEntry?.({
    type: "program-boss",
    sportId: "program-boss",
    sportTitle: "Boss de programme",
    programId: program.id,
    programTitle: program.title,
    weekNumber,
    dayNumber: 0,
    bossTitle: boss.title,
    bossVariant: safeVariant.id || session.bossVariant || "indoor",
    badgeId: boss.badgeId || null,
    title,
    amount: 1,
    unit: "boss",
    xp
  });

  window.FitnessRpgState.addJournalEntry?.({
    type: "program-boss",
    title,
    text: `${boss.title} vaincu en version ${safeVariant.label || safeVariant.id || "boss"}.`,
    xp
  });

  const badgeMessage = window.FitnessRpgPrograms.resolveBadgeRewardMessage(boss.badgeId);
  const chestReward = boss.chest
    ? window.FitnessRpgRewards?.drawChestFamiliarReward?.()
    : null;

  const chestMessage = chestReward?.success
    ? window.FitnessRpgRewards?.getChestRewardMessage?.(chestReward)
    : "";

  window.FitnessRpgState.setPose?.("victory");
  window.FitnessRpgState.clearActiveProgramSession?.();

  const victoryMessage = boss.chest
    ? `Boss final vaincu ! +${xp} XP. Coffre de récompense débloqué.`
    : `Boss vaincu ! +${xp} XP.`;

  window.FitnessRpgPrograms.setCoachMessage(
    [victoryMessage, badgeMessage, chestMessage].filter(Boolean).join(" ")
  );

  window.FitnessRpgProgress?.checkBadges?.();
  window.FitnessRpgRender?.renderAll?.();

  if (chestReward?.success) {
    window.setTimeout(() => {
      window.FitnessRpgRender?.showChestRewardModal?.(chestReward);
    }, 150);
  }

  window.setTimeout(() => {
    window.FitnessRpgRender?.renderProgramDetail?.(program.id);
    window.FitnessRpgPrograms.scrollToProgramDetail();
  }, 80);
};

// ============================================================
// Timer pour les exercices de programme
// ============================================================

window.FitnessRpgPrograms.getActiveProgramItemByKey = function getActiveProgramItemByKey(
  exerciseKey,
  fallbackExerciseId = null
) {
  const session = window.FitnessRpgState?.getActiveProgramSession?.();
  if (!session) return null;

  const workout = window.FitnessRpgPrograms.getActiveProgramWorkout(session);
  if (!workout || !Array.isArray(workout.exercises)) return null;

  if (exerciseKey) {
    const index = Number(String(exerciseKey).split("-")[0]);

    if (Number.isInteger(index) && index >= 0 && workout.exercises[index]) {
      return workout.exercises[index];
    }
  }

  return workout.exercises.find((item) => {
    return item.exerciseId === fallbackExerciseId;
  }) || null;
};

window.FitnessRpgPrograms.getActiveProgramItem = function getActiveProgramItem(exerciseId) {
  return window.FitnessRpgPrograms.getActiveProgramItemByKey(null, exerciseId);
};

window.FitnessRpgPrograms.programItemToSeconds = function programItemToSeconds(item) {
  if (!item) return 0;

  const amount = Number(item.amount || 0);
  const unit = String(item.unit || "").toLowerCase();

  if (!Number.isFinite(amount) || amount <= 0) return 0;
  if (unit === "sec" || unit === "seconde" || unit === "secondes") {
    return Math.round(amount);
  }
  if (unit === "min" || unit === "minute" || unit === "minutes") {
    return Math.round(amount * 60);
  }

  return 0;
};

window.FitnessRpgPrograms.openProgramExerciseTimer = function openProgramExerciseTimer(
  exerciseId,
  exerciseKey = null
) {
  const item = window.FitnessRpgPrograms.getActiveProgramItemByKey(
    exerciseKey,
    exerciseId
  );
  const exercise = window.FitnessRpgData?.getExerciseById?.(exerciseId);

  if (!item || !exercise) {
    window.FitnessRpgPrograms.showMessage({
      icon: "⚠️",
      title: "Exercice introuvable",
      message: "Impossible de trouver cet exercice dans la séance.",
      okText: "Compris"
    });
    return;
  }

  const seconds = window.FitnessRpgPrograms.programItemToSeconds(item);

  if (seconds <= 0) {
    window.FitnessRpgPrograms.showMessage({
      icon: "⏱️",
      title: "Timer indisponible",
      message: "Cet exercice n’a pas de durée à minuter.",
      okText: "Compris"
    });
    return;
  }

  if (typeof window.FitnessRpgExercises?.runTimer !== "function") {
    window.FitnessRpgPrograms.showMessage({
      icon: "⏱️",
      title: "Timer indisponible",
      message: "Le module du timer n’est pas chargé.",
      okText: "Compris"
    });
    return;
  }

  window.FitnessRpgExercises.runTimer({
    exercise,
    seconds,
    title: `${exercise.title} · ${window.FitnessRpgPrograms.formatExerciseAmount(item)}`,
    onValidate: () => {
      window.FitnessRpgPrograms.validateProgramExercise(exerciseId, exerciseKey);
    }
  });
};

// ============================================================
// Marquage visuel
// ============================================================

window.FitnessRpgPrograms.markCompletedProgramDays = function markCompletedProgramDays() {
  const profile = window.FitnessRpgState?.getProfile?.();
  if (!profile) return;

  const entries = window.FitnessRpgState?.getAllEntries?.() || [];

  document.querySelectorAll(".start-program-day-btn").forEach((button) => {
    const programId = button.dataset.programId;
    const weekNumber = Number(button.dataset.week || 1);
    const dayNumber = Number(button.dataset.day || 1);

    const done = entries.some((entry) => {
      return entry.type === "program"
        && entry.programId === programId
        && Number(entry.weekNumber || 1) === weekNumber
        && Number(entry.dayNumber || 0) === dayNumber;
    });

    button.classList.toggle("validated", done);
    button.textContent = done ? "Séance déjà terminée" : "Démarrer cette séance";
  });
};

// ============================================================
// Après rendu et compatibilité
// ============================================================

window.FitnessRpgPrograms.afterRender = function afterRender() {
  window.FitnessRpgPrograms.markCompletedProgramDays();
};

window.FitnessRpgPrograms.handleDocumentClick = function handleDocumentClick() {
  // Rien ici volontairement : app-navigation.js centralise les événements.
};

window.FitnessRpgPrograms.init = function initPrograms() {
  // Rien ici volontairement : app-navigation.js centralise les événements.
};
