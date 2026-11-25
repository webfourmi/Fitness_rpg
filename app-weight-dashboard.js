(() => {
  "use strict";

  const State = window.FitnessRpgState;
  const Planning = window.FitnessRpgWeightPlanning;
  const Render = window.FitnessRpgRender;
  const stages = window.FitnessRpgExerciseAdaptation.programmeIds;
  const milestones = {
    "weight-traveler": { xp: 20, gold: 10, description: "Cumule 30 minutes d’endurance dans une semaine, sur au moins deux jours." },
    "weight-strength": { xp: 25, gold: 10, description: "Valide deux jours de renforcement dans le parcours, la même semaine." },
    "weight-rest": { xp: 15, gold: 5, description: "Honore une journée de repos prévue au planning." },
    "weight-phoenix": { xp: 50, gold: 25, description: "Termine les trois campagnes et valide une séance avec une variante." }
  };
  const measure = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 });

  function stats() {
    const profile = State.getProfile();
    const dates = State.getWeekKeys();
    const entries = State.getWeekEntries();
    const endurance = Planning.recordedDays();
    const recovery = profile.adaptiveCoach?.history?.find((item) => item.recovery)?.recovery;
    return {
      endurance: Math.floor([...endurance.values()].reduce((sum, value) => sum + value, 0)),
      enduranceDays: [...endurance.values()].filter((value) => value > 0).length,
      strength: new Set(entries.filter((item) => item.weightStrength).map(State.getEntryDateKey)).size,
      active: dates.filter((key) => (endurance.get(key) || 0) > 0 || entries.some((item) =>
        State.getEntryDateKey(item) === key && ["program", "program-boss", "exercise", "custom-program", "challenge"].includes(item.type))).length,
      rest: dates.filter((key) => profile.weightRest?.[key] && !(endurance.get(key) > 0)
        && !State.getEntriesForDate(key).length).length,
      completed: stages.filter((id) => State.isGoalProgramComplete(id)).length,
      usedVariant: State.getAllEntries().some((item) => item.weightVariant),
      recovery: { good: "Bonne", partial: "Partielle", poor: "Difficile" }[recovery] || "Non renseignée"
    };
  }

  function eligible(id, summary) {
    switch (id) {
      case "weight-traveler": return summary.endurance >= 30 && summary.enduranceDays >= 2;
      case "weight-strength": return summary.strength >= 2;
      case "weight-rest": return summary.rest >= 1;
      case "weight-phoenix": return summary.completed === stages.length && summary.usedVariant;
      default: return false;
    }
  }

  function canRest() {
    const today = State.todayKey();
    const index = State.getWeekKeys().indexOf(today);
    return [1, 3, 6].includes(index) && !State.getActiveProgramSession()
      && !State.getEntriesForDate(today).length && !(Planning.recordedDays().get(today) > 0);
  }

  function saveField(key, value) {
    const profile = State.getProfile();
    const previous = profile[key];
    profile[key] = value;
    try {
      State.saveProfile();
      return true;
    } catch (error) {
      profile[key] = previous;
      console.error("Fitness RPG · suivi non enregistré", error);
      return false;
    }
  }

  function claim(id) {
    if (!Planning.enabled() || !Object.hasOwn(milestones, id) || !eligible(id, stats())) return false;
    const campApi = window.FitnessRpgCamp;
    const item = campApi.getTrophy(id);
    const profile = State.getProfile();
    const camp = campApi.migrate(profile);
    const key = JSON.stringify(["weight-milestone", id]);
    if (camp.claims[key] || camp.owned.includes(id)) return false;
    const { xp, gold } = milestones[id];
    const previousXp = profile.totalXp;
    profile.camp = {
      ...camp, claims: { ...camp.claims, [key]: true }, owned: [...camp.owned, id], gold: camp.gold + gold
    };
    try {
      State.addXp(xp, item.name, {
        type: "weight-milestone", title: item.name, text: `Trophée obtenu · +${xp} XP · +${gold} PO`, xp
      });
      return true;
    } catch (error) {
      // La sauvegarde du passage de niveau peut échouer après le crédit du trophée.
      if (profile.totalXp === previousXp) profile.camp = camp;
      console.error("Fitness RPG · récompense du parcours", error);
      return profile.totalXp !== previousXp;
    }
  }

  function trend(entries, unit) {
    const points = entries.filter((item) => Number.isFinite(item.value) && item.value > 0 && typeof item.date === "string")
      .sort((a, b) => a.date.localeCompare(b.date));
    const first = points[0];
    const last = points.at(-1);
    if (!last) return "Aucune mesure enregistrée";
    const value = (item) => `${measure.format(item.value)} ${unit}`;
    const date = (item) => Render.escapeHtml(item.date.split("-").reverse().join("/"));
    return first === last ? `Dernière mesure · ${value(last)} le ${date(last)}`
      : `${value(first)} le ${date(first)} → ${value(last)} le ${date(last)}`;
  }

  function html() {
    const profile = State.getProfile();
    const summary = stats();
    const showMeasures = profile.weightDashboardMeasures === true;
    const camp = window.FitnessRpgCamp;
    const restRecorded = profile.weightRest?.[State.todayKey()];
    return `<section aria-label="Suivi du parcours">
      <h2>Suivi du parcours</h2>
      <div class="planning-week-progress">
        <div><strong>${summary.endurance} min</strong><span>Endurance</span></div>
        <div><strong>${summary.strength} j</strong><span>Renforcement</span></div>
        <div><strong>${summary.active}/7 j</strong><span>Régularité</span></div>
        <div><strong>${summary.completed}/3</strong><span>Campagnes terminées</span></div>
        <div><strong>${summary.rest} j</strong><span>Repos prévu</span></div>
        <div><strong>${summary.recovery}</strong><span>Dernière récupération renseignée</span></div>
      </div>
      ${restRecorded ? "<p>Repos enregistré aujourd’hui.</p>" : canRest()
        ? '<button class="secondary-btn" type="button" data-weight-plan="dashboard-rest">Choisir le repos aujourd’hui</button>' : ""}
      <details><summary>Récompenses du parcours</summary><ul>${Object.entries(milestones).map(([id, reward]) => {
        const item = camp.getTrophy(id);
        const owned = profile.camp?.owned.includes(id);
        return `<li><strong>${item.name}</strong><p>${reward.description}</p>
          ${owned ? "<span>Dans ton vestiaire</span>" : eligible(id, summary)
            ? `<button class="primary-btn" type="button" data-weight-plan="dashboard-claim" data-milestone="${id}">Recevoir · ${reward.xp} XP et ${reward.gold} PO</button>` : ""}</li>`;
      }).join("")}</ul></details>
      <button class="ghost-btn" type="button" data-weight-plan="dashboard-measures">${showMeasures ? "Masquer" : "Afficher"} mes mesures</button>
      ${showMeasures ? `<section aria-label="Mesures facultatives">
        <p>Poids · ${trend(State.getWeights(), "kg")}</p>
        <p>Tour de taille · ${trend(Object.entries(profile.weightWaist || {}).map(([date, value]) => ({ date, value })), "cm")}</p>
        <button class="secondary-btn" type="button" data-mobile-destination="statistics">Ouvrir les statistiques de poids</button>
        <label>Tour de taille aujourd’hui (cm) <input id="weightWaist" type="number" inputmode="decimal" step="any" min="1" max="500" required></label>
        <button class="secondary-btn" type="button" data-weight-plan="dashboard-waist">Enregistrer le tour de taille</button>
      </section>` : ""}
      <p id="weightDashboardStatus" role="status"></p>
    </section>`;
  }

  function handle(button) {
    const profile = State.getProfile();
    const today = State.todayKey();
    const action = button.dataset.weightPlan;
    let message = "";
    if (action === "dashboard-measures") saveField("weightDashboardMeasures", !profile.weightDashboardMeasures);
    else if (action === "dashboard-rest" && canRest()) saveField("weightRest", { ...profile.weightRest, [today]: true });
    else if (action === "dashboard-claim") message = claim(button.dataset.milestone)
      ? "Trophée, XP et pièces ajoutés." : "Récompense indisponible.";
    else if (action === "dashboard-waist") {
      const field = document.querySelector("#weightWaist");
      if (!field?.reportValidity()) return;
      message = saveField("weightWaist", { ...profile.weightWaist, [today]: field.valueAsNumber })
        ? "Tour de taille enregistré." : "Enregistrement impossible.";
    }
    Render.renderPlanningPage();
    document.querySelector("#weightDashboardStatus").textContent = message;
  }

  window.FitnessRpgWeightDashboard = { stats, claim, html, handle };
})();
