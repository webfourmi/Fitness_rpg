function initQuestDrilldown() {
  if (window.__questDrilldownReady) return;
  window.__questDrilldownReady = true;

  let selectedSportId = null;

  function getTodayEntriesSafe() {
    try {
      if (typeof entriesToday === "function") return entriesToday();
    } catch {}
    return [];
  }

  function getNormalizedId(entry) {
    try {
      if (typeof normalizedEntryId === "function") return normalizedEntryId(entry);
    } catch {}
    return typeof entry === "string" ? entry : entry?.id;
  }

  function getExerciseXp(exercise, value) {
    try {
      if (typeof calcXp === "function") return calcXp(exercise, value);
    } catch {}
    return Math.max(1, Math.round((exercise.xpBase || 0) + value * exercise.xpPerUnit));
  }

  function getEntryXp(entry) {
    if (entry && typeof entry === "object" && Number.isFinite(Number(entry.xp))) return Number(entry.xp);
    const id = getNormalizedId(entry);
    const exercise = typeof exerciseById !== "undefined" ? exerciseById[id] : null;
    return exercise ? getExerciseXp(exercise, exercise.defaultValue) : 0;
  }

  function getEntryTitle(entry) {
    if (entry && typeof entry === "object") {
      return `${entry.sportTitle || "Exercice"} · ${entry.title || getNormalizedId(entry)}${entry.amount ? ` (${entry.amount} ${entry.unit || ""})` : ""}`;
    }
    const id = getNormalizedId(entry);
    const exercise = typeof exerciseById !== "undefined" ? exerciseById[id] : null;
    return exercise ? `${exercise.sportTitle} · ${exercise.title}` : "Aucune activité";
  }

  function getLastReusableEntry(todayEntries) {
    const last = todayEntries.at(-1);
    if (!last) return null;
    const id = getNormalizedId(last);
    const exercise = typeof exerciseById !== "undefined" ? exerciseById[id] : null;
    if (!exercise) return null;
    const amount = last && typeof last === "object" && Number.isFinite(Number(last.amount)) ? Number(last.amount) : exercise.defaultValue;
    return { exercise, amount };
  }

  function ensureSessionSummary(list) {
    let summary = document.querySelector("#questSessionSummary");
    if (summary) return summary;

    summary = document.createElement("section");
    summary.id = "questSessionSummary";
    summary.className = "quest-session-summary";

    const shell = list.closest(".quest-carousel-shell") || list.parentElement;
    shell.parentNode.insertBefore(summary, shell);
    return summary;
  }

  function renderSessionSummary(todayEntries) {
    const list = document.querySelector("#questsList");
    if (!list) return;

    const summary = ensureSessionSummary(list);
    const totalXp = todayEntries.reduce((sum, entry) => sum + getEntryXp(entry), 0);
    const lastReusable = getLastReusableEntry(todayEntries);
    const lastText = todayEntries.length ? getEntryTitle(todayEntries.at(-1)) : "Aucune activité validée aujourd’hui.";

    summary.innerHTML = `
      <div class="quest-session-main">
        <article class="quest-session-stat">
          <strong>${todayEntries.length}</strong>
          <span>activité${todayEntries.length > 1 ? "s" : ""}</span>
        </article>
        <article class="quest-session-stat">
          <strong>${totalXp}</strong>
          <span>XP du jour</span>
        </article>
        <article class="quest-session-last">
          <span>Dernière activité</span>
          <strong>${lastText}</strong>
        </article>
      </div>
      <div class="quest-session-actions">
        <button id="repeatLastExerciseBtn" class="secondary-btn" type="button" ${lastReusable ? "" : "disabled"}>↻ Refaire le dernier exercice</button>
        <button id="finishSessionBtn" class="primary-btn" type="button">Séance terminée</button>
      </div>
    `;

    const repeatButton = summary.querySelector("#repeatLastExerciseBtn");
    repeatButton?.addEventListener("click", () => {
      const latest = getLastReusableEntry(getTodayEntriesSafe());
      if (latest && typeof completeExercise === "function") completeExercise(latest.exercise.id, latest.amount);
    });

    const finishButton = summary.querySelector("#finishSessionBtn");
    finishButton?.addEventListener("click", () => {
      const currentEntries = getTodayEntriesSafe();
      const currentTotal = currentEntries.reduce((sum, entry) => sum + getEntryXp(entry), 0);

      try {
        if (typeof pose !== "undefined") pose = "victory";
        if (typeof el !== "undefined" && el.coachMsg) {
          el.coachMsg.textContent = currentEntries.length
            ? `Séance terminée : ${currentEntries.length} activité${currentEntries.length > 1 ? "s" : ""}, ${currentTotal} XP. Beau travail.`
            : "Séance ouverte. Choisis une activité et on allume la forge.";
        }
        if (currentEntries.length && typeof log === "function") log(`Séance terminée · ${currentEntries.length} activité${currentEntries.length > 1 ? "s" : ""} · ${currentTotal} XP du jour`);
        if (typeof save === "function") save();
        if (typeof render === "function") render();
      } catch (error) {
        console.warn("Impossible de terminer la séance", error);
      }
    });
  }

  function buildExerciseCard(exercise, todayEntries) {
    const doneForExercise = todayEntries.filter((entry) => getNormalizedId(entry) === exercise.id).length;
    const estimate = getExerciseXp(exercise, exercise.defaultValue);
    const card = document.createElement("article");
    card.className = "exercise-detail-card exercise-detail-card-v32";
    card.innerHTML = `
      <div class="exercise-card-head">
        <strong>${exercise.title}</strong>
        <span>${exercise.stat}</span>
      </div>
      <label class="amount-label">
        ${exercise.unit}
        <input class="exercise-amount" type="number" min="${exercise.min}" step="${exercise.step}" value="${exercise.defaultValue}" data-exercise-id="${exercise.id}">
      </label>
      <div class="exercise-step-row">
        <button class="ghost-btn exercise-minus-btn" type="button">−</button>
        <button class="ghost-btn exercise-plus-btn" type="button">+</button>
      </div>
      <span class="xp-preview">≈ ${estimate} XP</span>
      <button class="primary-btn validate-exercise-btn" type="button" data-exercise-id="${exercise.id}">Valider</button>
      ${doneForExercise ? `<span class="done-note">Déjà validé ${doneForExercise} fois aujourd’hui</span>` : ""}
    `;

    const input = card.querySelector(".exercise-amount");
    const preview = card.querySelector(".xp-preview");

    function updatePreview() {
      preview.textContent = `≈ ${getExerciseXp(exercise, Number(input.value) || 0)} XP`;
    }

    card.querySelector(".exercise-minus-btn")?.addEventListener("click", () => {
      const value = Number(input.value) || exercise.defaultValue;
      input.value = Math.max(exercise.min, value - exercise.step);
      updatePreview();
    });

    card.querySelector(".exercise-plus-btn")?.addEventListener("click", () => {
      const value = Number(input.value) || exercise.defaultValue;
      input.value = value + exercise.step;
      updatePreview();
    });

    input.addEventListener("input", updatePreview);

    card.querySelector(".validate-exercise-btn").addEventListener("click", () => {
      if (typeof completeExercise === "function") completeExercise(exercise.id, input.value);
    });

    return card;
  }

  function ensureDetailPage(list) {
    let detail = document.querySelector("#questDetailPage");
    if (detail) return detail;

    detail = document.createElement("div");
    detail.id = "questDetailPage";
    detail.className = "quest-detail-page hidden";

    const shell = list.closest(".quest-carousel-shell") || list.parentElement;
    shell.parentNode.insertBefore(detail, shell.nextSibling);
    return detail;
  }

  function renderDetailPage(sport, todayEntries) {
    const list = document.querySelector("#questsList");
    if (!list) return;

    const detail = ensureDetailPage(list);
    const sportEntries = todayEntries.filter((entry) => {
      const exerciseId = getNormalizedId(entry);
      const exercise = typeof exerciseById !== "undefined" ? exerciseById[exerciseId] : null;
      return exercise?.sportId === sport.id;
    });
    const sportXp = sportEntries.reduce((sum, entry) => sum + getEntryXp(entry), 0);

    detail.classList.remove("hidden");
    detail.innerHTML = `
      <div class="quest-detail-header">
        <div class="quest-detail-title">
          <span class="quest-detail-icon">${sport.icon}</span>
          <div>
            <p class="eyebrow">Exercices</p>
            <h3>${sport.title}</h3>
            <p>${sport.description}</p>
          </div>
        </div>
        <button id="backToQuestCategoriesBtn" class="ghost-btn" type="button">Retour aux catégories</button>
      </div>
      <div class="quest-category-summary">
        <span>${sportEntries.length} activité${sportEntries.length > 1 ? "s" : ""} aujourd’hui</span>
        <strong>${sportXp} XP</strong>
      </div>
      <div class="exercise-detail-grid"></div>
    `;

    const grid = detail.querySelector(".exercise-detail-grid");
    sport.exercises.forEach((exercise) => grid.appendChild(buildExerciseCard(exercise, todayEntries)));

    detail.querySelector("#backToQuestCategoriesBtn").addEventListener("click", () => {
      selectedSportId = null;
      detail.classList.add("hidden");
      detail.innerHTML = "";
      list.querySelectorAll(".sport-item").forEach((item) => item.classList.remove("open"));
      const carousel = list.closest(".quest-carousel-shell");
      carousel?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderCategoryCards(todayEntries) {
    const list = document.querySelector("#questsList");
    if (!list || typeof sports === "undefined") return;

    renderSessionSummary(todayEntries);
    list.innerHTML = "";

    sports.forEach((sport) => {
      const doneCount = todayEntries.filter((entry) => {
        const exerciseId = getNormalizedId(entry);
        const exercise = typeof exerciseById !== "undefined" ? exerciseById[exerciseId] : null;
        return exercise?.sportId === sport.id;
      }).length;

      const article = document.createElement("article");
      article.className = `sport-item${selectedSportId === sport.id ? " open" : ""}`;
      article.innerHTML = `
        <button class="sport-toggle" type="button" data-sport-id="${sport.id}">
          <span class="sport-icon">${sport.icon}</span>
          <span><strong>${sport.title}</strong><small>${sport.description}</small></span>
          <em>${doneCount} fait${doneCount > 1 ? "s" : ""}</em>
        </button>
      `;

      article.querySelector(".sport-toggle").addEventListener("click", () => {
        selectedSportId = sport.id;
        list.querySelectorAll(".sport-item").forEach((item) => item.classList.remove("open"));
        article.classList.add("open");
        renderDetailPage(sport, getTodayEntriesSafe());
      });

      list.appendChild(article);
    });

    if (selectedSportId) {
      const selectedSport = sports.find((sport) => sport.id === selectedSportId);
      if (selectedSport) renderDetailPage(selectedSport, todayEntries);
    }
  }

  try {
    if (typeof renderExercises === "function") {
      renderExercises = renderCategoryCards;
      if (typeof render === "function") render();
    }
  } catch (error) {
    console.warn("Impossible d’appliquer la page d’exercices V3.2", error);
  }

  document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((el) => {
    el.textContent = "0.3.2";
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initQuestDrilldown);
} else {
  initQuestDrilldown();
}
