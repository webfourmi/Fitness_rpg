// Référentiel de conception pour le futur planning La Voie du Héros.
(() => {
  "use strict";

  const version = 1;
  const sources = Object.freeze({
    who: "https://www.who.int/europe/news-room/fact-sheets/item/physical-activity",
    acsm: "https://doi.org/10.1249/MSS.0000000000003897",
    has: "https://www.has-sante.fr/jcms/p_3360220/fr/synthese-prescription-d-activite-physique-surpoids-obesite-de-l-adulte",
    mobility: "https://pubmed.ncbi.nlm.nih.gov/21694556/"
  });

  const resistance = ["squat", "lunge", "hipExtension", "hinge", "push", "pull"];
  const mobility = ["shoulderMobility", "hipMobility", "backMobility", "lowMobility"];
  const mixed = ["cardio", ...resistance];
  const progression = (parameter, step, unit) => ({ parameter, step, unit });
  const time = (step) => progression("duration", step, "minutes");
  const sets = progression("sets", 1, "sets");
  const reps = progression("repetitions", 1, "repetitions");
  const controlled = progression("quality", null, null);
  const rule = (minDays, maxDays, volumeKind, minVolume, maxVolume, effortMax, recovery, advance) =>
    ({ frequency: [minDays, maxDays], volume: { kind: volumeKind, range: [minVolume, maxVolume] }, effortMax, recovery, advance });

  const goals = {
    "perte-poids": {
      title: "Perte de poids", families: mixed, metrics: ["enduranceMinutes", "activeDays", "strengthDays", "optionalMeasurements"],
      references: ["who", "has"], levels: [
        rule(2, 3, "enduranceMinutes", 5, 15, 4, "easy", time(1)),
        rule(3, 4, "enduranceMinutes", 10, 25, 5, "alternate", time(1)),
        rule(3, 5, "enduranceMinutes", 15, 40, 6, "alternate", time(2))
      ]
    },
    "prise-muscle": {
      title: "Prise de muscle", families: [...resistance, "overhead", "verticalPull"], metrics: ["load", "sets", "repetitions"],
      references: ["acsm"], levels: [
        rule(2, 2, "setsPerMovement", 1, 2, 5, "sameMuscles", reps),
        rule(2, 3, "setsPerMovement", 2, 3, 6, "sameMuscles", sets),
        rule(2, 4, "setsPerMovement", 2, 4, 7, "sameMuscles", sets)
      ]
    },
    force: {
      title: "Force", families: [...resistance, "overhead", "verticalPull"], metrics: ["comparableLoad", "comparableRepetitions"],
      references: ["acsm"], levels: [
        rule(2, 2, "setsPerMovement", 1, 2, 5, "sameMuscles", reps),
        rule(2, 3, "setsPerMovement", 2, 3, 6, "sameMuscles", controlled),
        rule(2, 3, "setsPerMovement", 2, 3, 7, "sameMuscles", controlled)
      ]
    },
    endurance: {
      title: "Endurance", families: ["cardio"], metrics: ["duration", "distance", "effort"],
      references: ["who"], levels: [
        rule(2, 3, "enduranceMinutes", 5, 15, 4, "easy", time(1)),
        rule(3, 4, "enduranceMinutes", 10, 30, 5, "alternate", time(2)),
        rule(3, 5, "enduranceMinutes", 20, 45, 6, "alternate", time(2))
      ]
    },
    souplesse: {
      title: "Souplesse", families: mobility, metrics: ["comfortableRange", "ease"],
      references: ["mobility"], levels: [
        rule(2, 3, "movementMinutes", 5, 10, 3, "easy", controlled),
        rule(2, 4, "movementMinutes", 8, 15, 3, "easy", time(1)),
        rule(3, 5, "movementMinutes", 10, 20, 4, "easy", time(1))
      ]
    },
    "remise-en-forme": {
      title: "Remise en forme", families: mixed, metrics: ["activeDays", "enduranceMinutes", "tolerance"],
      references: ["who", "acsm"], levels: [
        rule(2, 3, "sessionMinutes", 5, 15, 4, "easy", time(1)),
        rule(3, 4, "sessionMinutes", 10, 25, 5, "alternate", time(1)),
        rule(3, 5, "sessionMinutes", 15, 35, 6, "alternate", time(2))
      ]
    },
    "equilibre-autonomie": {
      title: "Équilibre et autonomie", families: ["balance", "squat", "lunge", "heelRaise", "trunk"], metrics: ["stability", "ease", "supportUsed"],
      references: ["who", "acsm"], levels: [
        rule(2, 3, "movementMinutes", 5, 10, 3, "easy", controlled),
        rule(3, 3, "movementMinutes", 7, 15, 4, "alternate", controlled),
        rule(3, 4, "movementMinutes", 10, 20, 5, "alternate", controlled)
      ]
    },
    entretien: {
      title: "Entretien physique", families: [...mixed, ...mobility, "balance"], metrics: ["activeDays", "movementDiversity"],
      references: ["who"], levels: [
        rule(2, 3, "sessionMinutes", 5, 15, 4, "easy", controlled),
        rule(3, 4, "sessionMinutes", 10, 25, 5, "alternate", controlled),
        rule(3, 5, "sessionMinutes", 15, 35, 6, "alternate", controlled)
      ]
    },
    "posture-stabilite": {
      title: "Posture et stabilité", families: ["trunk", "hipExtension", "pull", "backMobility", "shoulderMobility"], metrics: ["movementControl", "tolerance"],
      references: ["acsm", "mobility"], levels: [
        rule(2, 3, "movementMinutes", 5, 10, 4, "easy", controlled),
        rule(2, 4, "movementMinutes", 8, 15, 5, "alternate", controlled),
        rule(3, 4, "movementMinutes", 10, 20, 6, "alternate", controlled)
      ]
    }
  };

  const legacyGoals = {
    gainage: ["posture-stabilite"], pilates: ["equilibre-autonomie", "posture-stabilite", "souplesse"],
    "reprise-douce": ["remise-en-forme"], cardio: ["endurance"], renforcement: ["force", "prise-muscle"],
    regularite: ["entretien"], mobilite: ["souplesse", "equilibre-autonomie", "posture-stabilite"]
  };
  const levels = ["beginner", "intermediate", "advanced"];

  function goalOptions(id) {
    if (Object.hasOwn(goals, id)) return [id];
    return Object.hasOwn(legacyGoals, id) ? [...legacyGoals[id]] : [];
  }

  function getRule(id, level) {
    const index = levels.indexOf(level);
    if (!Object.hasOwn(goals, id) || index < 0) return null;
    const { levels: rules, ...goal } = goals[id];
    return structuredClone({ version, id, level, ...goal, ...rules[index] });
  }

  function assess(id, sport) {
    const options = goalOptions(id);
    const profile = sport?.trainingProfile;
    if (profile?.medicalRestriction) return { status: "professional-review", options, rule: null };
    if (options.length !== 1) return { status: options.length ? "choose-goal" : "unknown-goal", options, rule: null };

    const rule = getRule(options[0], sport?.level);
    if (!rule) return { status: "level-required", options, rule: null };
    const limited = profile?.activity === "inactive" || profile?.recovery === "difficult"
      || profile?.limitations?.length > 0 || sport?.kneeFriendly;
    if (limited) {
      rule.effortMax = Math.min(rule.effortMax, 4);
      rule.advance = null;
    }
    const availability = profile?.availableDays?.length || 7;
    const weeklySlots = Math.min(availability, sport?.sessionsPerWeek || 7);
    rule.frequency = rule.frequency.map((days) => Math.min(days, weeklySlots));
    const minutes = Number(sport?.preferredDuration);
    if (Number.isFinite(minutes) && minutes > 0 && rule.volume.kind.endsWith("Minutes")) {
      rule.volume.range = rule.volume.range.map((value) => Math.min(value, minutes, limited ? 10 : Infinity));
    }
    return { status: limited ? "adapt" : "ready", options, rule };
  }

  window.FitnessRpgGoalRules = { version, sources, goalIds: Object.freeze(Object.keys(goals)), goalOptions, getRule, assess };
})();
