function initSportDistanceV45() {
  if (window.__sportDistanceV45Ready) return;
  window.__sportDistanceV45Ready = true;

  function markDistanceExercises() {
    if (typeof exerciseById === "undefined" || typeof sports === "undefined") return;

    ["walk", "bike"].forEach((id) => {
      if (exerciseById[id]) exerciseById[id].distanceAllowed = true;
    });

    if (!exerciseById.run_treadmill) {
      const runningSport = {
        id: "run",
        icon: "🏃",
        title: "Course",
        description: "Course sur tapis ou en extérieur, avec temps et distance.",
        exercises: [
          { id: "run_treadmill", title: "Course sur tapis", unit: "min", defaultValue: 15, min: 5, step: 5, xpPerUnit: 2, stat: "Cardio", pose: "walk", distanceAllowed: true },
          { id: "run_outdoor", title: "Course extérieure", unit: "min", defaultValue: 20, min: 5, step: 5, xpPerUnit: 2.1, stat: "Cardio", pose: "walk", distanceAllowed: true }
        ]
      };
      sports.splice(2, 0, runningSport);
      runningSport.exercises.forEach((exercise) => {
        const enriched = { ...exercise, sportId: runningSport.id, sportTitle: runningSport.title };
        exercises.push(enriched);
        exerciseById[enriched.id] = enriched;
        questPoseMap[enriched.id] = enriched.pose;
      });
    }

    Object.values(coaches || {}).forEach((coach) => {
      coach.byQuest = coach.byQuest || {};
      coach.byQuest.run_treadmill = coach.byQuest.run_treadmill || ["Course sur tapis : trouve ton rythme, puis garde-le comme un métronome héroïque."];
      coach.byQuest.run_outdoor = coach.byQuest.run_outdoor || ["Course extérieure : chaque mètre trace une ligne de plus sur ta carte d’aventure."];
    });
  }

  function distanceText(distanceKm) {
    const value = Number(distanceKm);
    if (!Number.isFinite(value) || value <= 0) return "";
    return ` · ${value.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} km`;
  }

  const oldCompleteExercise = typeof completeExercise === "function" ? completeExercise : null;
  completeExercise = function completeExerciseWithDistance(id, amount, distanceKm = null) {
    const exercise = exerciseById[id];
    if (!exercise) return;

    if (!exercise.distanceAllowed || distanceKm === null || distanceKm === "") {
      oldCompleteExercise?.(id, amount);
      return;
    }

    const value = Number(amount);
    if (!Number.isFinite(value) || value < exercise.min) {
      alert(`Entre une valeur d’au moins ${exercise.min} ${exercise.unit}.`);
      return;
    }

    const distance = Number(String(distanceKm).replace(",", "."));
    if (!Number.isFinite(distance) || distance < 0) {
      alert("Entre une distance en km valide, ou laisse le champ à 0.");
      return;
    }

    const oldLevel = levelInfo(profile.totalXp).level;
    const xp = calcXp(exercise, value);
    const list = entriesToday();
    list.push({
      id: exercise.id,
      sportId: exercise.sportId,
      sportTitle: exercise.sportTitle,
      title: exercise.title,
      amount: value,
      unit: exercise.unit,
      distanceKm: distance > 0 ? distance : null,
      xp,
      at: new Date().toISOString()
    });
    setEntries(list);
    updateStreak();
    profile.totalXp += xp;
    profile.xp += xp;
    pose = exercise.pose || "victory";
    log(`+${xp} XP · ${exercise.sportTitle} · ${exercise.title} (${value} ${exercise.unit}${distanceText(distance)})`);
    const newLevel = levelInfo(profile.totalXp).level;
    if (newLevel > oldLevel) {
      pose = "levelup";
      log(`Niveau ${newLevel} atteint !`);
      el.coachMsg.textContent = msg("levelUp");
    } else {
      el.coachMsg.textContent = exerciseMessage(id);
    }
    save();
    render();
  };

  renderExercises = function renderExercisesWithDistance(todayEntries) {
    markDistanceExercises();
    el.questsList.innerHTML = "";
    sports.forEach((sport) => {
      const article = document.createElement("article");
      const isOpen = openedSportId === sport.id;
      const doneCount = todayEntries.filter((entry) => exerciseById[normalizedEntryId(entry)]?.sportId === sport.id).length;
      article.className = `sport-item${isOpen ? " open" : ""}`;
      article.innerHTML = `<button class="sport-toggle" type="button"><span class="sport-icon">${sport.icon}</span><span><strong>${sport.title}</strong><small>${sport.description}</small></span><em>${doneCount} fait${doneCount > 1 ? "s" : ""}</em></button><div class="duration-grid ${isOpen ? "" : "hidden"}"></div>`;
      article.querySelector(".sport-toggle").onclick = () => {
        openedSportId = openedSportId === sport.id ? null : sport.id;
        renderExercises(entriesToday());
      };

      const grid = article.querySelector(".duration-grid");
      sport.exercises.forEach((exercise) => {
        const enriched = exerciseById[exercise.id] || exercise;
        const doneForExercise = todayEntries.filter((entry) => normalizedEntryId(entry) === enriched.id).length;
        const card = document.createElement("div");
        const estimate = calcXp(enriched, enriched.defaultValue);
        card.className = "duration-btn";
        const distanceInput = enriched.distanceAllowed
          ? `<label class="amount-label distance-label">Distance km<input class="exercise-distance" type="number" min="0" step="0.1" value="0" data-exercise-id="${enriched.id}"></label>`
          : "";
        card.innerHTML = `<strong>${enriched.title}</strong><span>${enriched.stat}</span><label class="amount-label">${enriched.unit}<input class="exercise-amount" type="number" min="${enriched.min}" step="${enriched.step}" value="${enriched.defaultValue}" data-exercise-id="${enriched.id}"></label>${distanceInput}<span class="xp-preview">≈ ${estimate} XP</span><button class="primary-btn validate-exercise-btn" type="button" data-exercise-id="${enriched.id}">Valider</button>${doneForExercise ? `<span class="done-note">Déjà validé ${doneForExercise} fois aujourd’hui</span>` : ""}`;
        const input = card.querySelector(".exercise-amount");
        const distance = card.querySelector(".exercise-distance");
        const preview = card.querySelector(".xp-preview");
        input.addEventListener("input", () => { preview.textContent = `≈ ${calcXp(enriched, Number(input.value) || 0)} XP`; });
        card.querySelector(".validate-exercise-btn").onclick = () => completeExercise(enriched.id, input.value, distance?.value ?? null);
        grid.appendChild(card);
      });
      el.questsList.appendChild(article);
    });
  };

  summaries = function summariesWithDistance() {
    const todayEntries = entriesToday();
    const last = todayEntries.at(-1);
    if (last && typeof last === "object") {
      el.questSummary.textContent = `Dernière entrée : ${last.sportTitle} · ${last.title} (${last.amount} ${last.unit}${distanceText(last.distanceKm)})`;
    } else if (last) {
      const exercise = exerciseById[normalizedEntryId(last)];
      el.questSummary.textContent = exercise ? `Dernière entrée : ${exercise.sportTitle} · ${exercise.title}` : "Dernière entrée enregistrée";
    } else {
      el.questSummary.textContent = "Aucune entrée validée aujourd’hui.";
    }
    el.musicSummary.textContent = musicStatus;
  };

  function openImageFullscreen(img, title) {
    if (!img?.src) return;
    let overlay = document.querySelector("#imageFullscreenOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "imageFullscreenOverlay";
      overlay.className = "image-fullscreen-overlay hidden";
      overlay.innerHTML = `<button id="imageFullscreenBack" class="ghost-btn" type="button">← Retour</button><img id="imageFullscreenImg" alt="Image agrandie"><p id="imageFullscreenTitle"></p>`;
      document.body.appendChild(overlay);
      overlay.querySelector("#imageFullscreenBack").onclick = () => overlay.classList.add("hidden");
      overlay.addEventListener("click", (event) => { if (event.target === overlay) overlay.classList.add("hidden"); });
    }
    overlay.querySelector("#imageFullscreenImg").src = img.src;
    overlay.querySelector("#imageFullscreenTitle").textContent = title || img.alt || "Image";
    overlay.classList.remove("hidden");
  }

  document.addEventListener("click", (event) => {
    const heroImg = event.target.closest("#heroPortrait img, #heroPortrait svg");
    if (heroImg) {
      const img = document.querySelector("#heroPortrait img");
      if (img) openImageFullscreen(img, profile?.name || "Héros");
      else {
        const svg = document.querySelector("#heroPortrait svg");
        if (!svg) return;
        const data = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([data], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const proxyImg = { src: url, alt: profile?.name || "Héros" };
        openImageFullscreen(proxyImg, profile?.name || "Héros");
      }
    }

    const coachImg = event.target.closest("#coachPortrait");
    if (coachImg) openImageFullscreen(coachImg, coaches?.[profile?.coach]?.fullName || "Coach");
  }, true);

  markDistanceExercises();
  if (profile) render();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSportDistanceV45);
} else {
  initSportDistanceV45();
}
