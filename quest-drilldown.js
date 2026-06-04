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

  function buildExerciseCard(exercise, todayEntries) {
    const doneForExercise = todayEntries.filter((entry) => getNormalizedId(entry) === exercise.id).length;
    const estimate = getExerciseXp(exercise, exercise.defaultValue);
    const card = document.createElement("article");
    card.className = "exercise-detail-card";
    card.innerHTML = `
      <strong>${exercise.title}</strong>
      <span>${exercise.stat}</span>
      <label class="amount-label">
        ${exercise.unit}
        <input class="exercise-amount" type="number" min="${exercise.min}" step="${exercise.step}" value="${exercise.defaultValue}" data-exercise-id="${exercise.id}">
      </label>
      <span class="xp-preview">≈ ${estimate} XP</span>
      <button class="primary-btn validate-exercise-btn" type="button" data-exercise-id="${exercise.id}">Valider</button>
      ${doneForExercise ? `<span class="done-note">Déjà validé ${doneForExercise} fois aujourd’hui</span>` : ""}
    `;

    const input = card.querySelector(".exercise-amount");
    const preview = card.querySelector(".xp-preview");
    input.addEventListener("input", () => {
      preview.textContent = `≈ ${getExerciseXp(exercise, Number(input.value) || 0)} XP`;
    });

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
    console.warn("Impossible d’appliquer la page d’exercices par catégorie", error);
  }

  document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((el) => {
    el.textContent = "0.2.5";
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initQuestDrilldown);
} else {
  initQuestDrilldown();
}
