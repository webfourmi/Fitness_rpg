function initExerciseExplainer() {
  if (window.__exerciseExplainerReady) return;
  window.__exerciseExplainerReady = true;

  const SEEN_KEY = "sportRpgV442SeenExerciseExplain";

  const explanations = {
    "Marche sur place": ["Marche doucement sans chercher la vitesse.", "Garde le dos droit et les épaules basses.", "Respire normalement, sans bloquer le souffle."],
    "Marche dynamique": ["Augmente légèrement le rythme sans courir.", "Pose les pieds avec contrôle.", "Garde une respiration régulière."],
    "Montées de genoux lentes": ["Monte un genou puis l’autre, sans saut.", "Garde le buste droit.", "Ralentis si tu perds l’équilibre."],
    "Pas chassés": ["Déplace-toi de côté avec de petits pas.", "Genoux légèrement souples.", "Ne croise pas les pieds."],
    "Jumping jack sans saut": ["Ouvre une jambe sur le côté puis reviens au centre.", "Accompagne avec les bras si c’est confortable.", "Reste doux sur les appuis."],
    "Squats": ["Pousse les hanches vers l’arrière comme pour t’asseoir.", "Garde les genoux dans l’axe des pieds.", "Remonte sans verrouiller brutalement les genoux."],
    "Squat chaise": ["Assieds-toi presque sur la chaise puis remonte.", "Garde le dos long.", "Utilise la chaise comme sécurité, pas comme canapé royal."],
    "Pompes murales": ["Pose les mains au mur à hauteur de poitrine.", "Plie les coudes puis repousse doucement.", "Garde le corps aligné."],
    "Pompes inclinées": ["Mains sur un support stable.", "Descends poitrine vers le support.", "Garde le ventre légèrement engagé."],
    "Planche genoux": ["Coudes sous les épaules.", "Genoux au sol, bassin stable.", "Ne creuse pas le bas du dos."],
    "Gainage": ["Reste aligné, nuque longue.", "Respire lentement.", "Arrête si le bas du dos tire trop."],
    "Superman": ["Allongé sur le ventre, lève doucement bras et jambes.", "Ne force pas la nuque.", "Cherche l’allongement plus que la hauteur."],
    "Pont de hanches": ["Allongé sur le dos, pieds au sol.", "Monte le bassin en serrant les fessiers.", "Redescends lentement."],
    "Rotation thoracique": ["Tourne le haut du dos doucement.", "Suis le mouvement avec le regard.", "Ne force pas les lombaires."],
    "Chat-vache": ["À quatre pattes, arrondis puis creuse doucement le dos.", "Le mouvement part de la colonne.", "Respire avec le geste."],
    "Respiration lente": ["Inspire par le nez si possible.", "Expire plus longuement que l’inspiration.", "Relâche les épaules."],
    "Étirements": ["Va chercher une tension douce, jamais une douleur.", "Respire lentement.", "Garde chaque posture confortable."],
    "Étirements mollets/cuisses": ["Étire sans rebondir.", "Garde l’appui stable.", "Change de côté calmement."],
    "Marche confortable": ["Rythme facile, conversation possible.", "Regarde devant toi.", "Respire sans te crisper."],
    "Marche active": ["Rythme plus soutenu, sans courir.", "Bras relâchés mais actifs.", "Réduis si tu t’essouffles trop."],
    "Mountain climbing lent": ["Position de planche adaptée.", "Ramène un genou à la fois.", "Garde le mouvement lent et propre."],
    "Appui sur une jambe": ["Fixe un point devant toi.", "Genou légèrement souple.", "Pose un doigt au mur si besoin."],
    "Ouverture des hanches": ["Mouvement lent et contrôlé.", "Ne force pas l’amplitude.", "Respire dans la posture."]
  };

  function loadSeen() {
    try { return JSON.parse(localStorage.getItem(SEEN_KEY) || "{}"); }
    catch { return {}; }
  }

  function saveSeen(data) {
    localStorage.setItem(SEEN_KEY, JSON.stringify(data));
  }

  function normalizeName(name) {
    return String(name || "").trim();
  }

  function findTips(name) {
    const clean = normalizeName(name);
    if (explanations[clean]) return explanations[clean];
    const key = Object.keys(explanations).find((item) => clean.toLowerCase().includes(item.toLowerCase()) || item.toLowerCase().includes(clean.toLowerCase()));
    return key ? explanations[key] : ["Fais le mouvement lentement et proprement.", "Respire sans bloquer.", "Arrête si une douleur inhabituelle apparaît."];
  }

  function ensurePanel() {
    const current = document.querySelector("#sessionCurrentExercise");
    if (!current) return null;

    let panel = document.querySelector("#exerciseExplainerPanel");
    if (panel) return panel;

    panel = document.createElement("section");
    panel.id = "exerciseExplainerPanel";
    panel.className = "exercise-explainer-panel hidden";
    panel.innerHTML = `
      <p class="eyebrow">Première fois</p>
      <h3 id="exerciseExplainerTitle">Explication de l’exercice</h3>
      <p id="exerciseExplainerIntro">Lis ces repères avant de commencer.</p>
      <ul id="exerciseExplainerTips" class="exercise-explainer-tips"></ul>
      <div class="exercise-explainer-actions">
        <button id="exerciseExplainerNeverBtn" class="ghost-btn" type="button">Ne plus afficher pour cet exercice</button>
        <button id="exerciseExplainerOkBtn" class="primary-btn" type="button">J’ai compris</button>
      </div>
    `;
    current.insertAdjacentElement("afterend", panel);

    panel.querySelector("#exerciseExplainerOkBtn")?.addEventListener("click", () => panel.classList.add("hidden"));
    panel.querySelector("#exerciseExplainerNeverBtn")?.addEventListener("click", () => {
      const name = panel.dataset.exerciseName;
      const seen = loadSeen();
      if (name) seen[name] = true;
      saveSeen(seen);
      panel.classList.add("hidden");
    });
    return panel;
  }

  function currentExerciseName() {
    return document.querySelector("#sessionCurrentExercise .exercise-name")?.textContent?.trim() || "";
  }

  function showExplanationIfFirstTime() {
    window.setTimeout(() => {
      const name = currentExerciseName();
      if (!name) return;
      const seen = loadSeen();
      if (seen[name]) return;

      const panel = ensurePanel();
      if (!panel) return;
      const tips = findTips(name);
      panel.dataset.exerciseName = name;
      panel.querySelector("#exerciseExplainerTitle").textContent = name;
      panel.querySelector("#exerciseExplainerIntro").textContent = "Quelques repères pour faire le mouvement proprement.";
      panel.querySelector("#exerciseExplainerTips").innerHTML = tips.map((tip) => `<li>${tip}</li>`).join("");
      panel.classList.remove("hidden");
    }, 120);
  }

  function handleClick(event) {
    if (!event.target.closest("#sessionStartNextBtn")) return;
    showExplanationIfFirstTime();
  }

  document.addEventListener("click", handleClick, true);

  const observer = new MutationObserver(() => {
    if (document.querySelector("#sessionCurrentExercise .exercise-name")) showExplanationIfFirstTime();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  window.ExerciseExplainer = { showExplanationIfFirstTime };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initExerciseExplainer);
} else {
  initExerciseExplainer();
}
