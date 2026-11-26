// Recette du vestiaire dans un profil Chrome temporaire, sur une copie locale de l'application.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const http = require("node:http");
const { promisify } = require("node:util");
const exec = promisify(require("node:child_process").execFile);
const root = path.resolve(__dirname, "..");

function exerciseWardrobe() {
  const check = (ok, label) => { if (!ok) throw Error(label); };
  try {
    const state = window.FitnessRpgState;
    const camp = window.FitnessRpgCamp;
    const render = window.FitnessRpgRender;
    state.createProfile({ name: "Test", gender: "femme" });
    const nav = document.querySelector("#mobilePrimaryNav");
    const mobile = matchMedia("(max-width: 699px)").matches;
    const checkNavigation = (label) => {
      const bounds = nav.getBoundingClientRect();
      check(mobile ? bounds.height > 0 && bounds.bottom <= innerHeight : bounds.height === 0, label);
    };
    window.FitnessRpgNavigation.goHome();
    checkNavigation("Barre mobile visible à l’accueil avec un profil");
    camp.resolveOvernight();
    const portraits = document.createElement("div");
    portraits.style.cssText = "position:absolute;left:0;top:0;width:180px";
    document.body.appendChild(portraits);
    for (const [gender, eyeLine] of [["homme", .087], ["femme", .119]]) {
      state.profile.gender = gender;
      for (const id of ["garnet-headband", "boss-gear-2", "trophy-sylph-ribbon", "trophy-campaign-grand-maitre-arcanes"]) {
        state.profile.camp.equipped.head = id;
        portraits.innerHTML = camp.avatar("Portrait de test", 'style="width:180px;height:279.27px"');
        const portrait = portraits.firstElementChild;
        const image = portrait.querySelector("img").getBoundingClientRect();
        const accessory = portrait.querySelector(".camp-avatar-headband").getBoundingClientRect();
        check(image.height > 0 && accessory.height > 0, "Portrait et coiffe visibles");
        check(accessory.bottom <= image.top + image.height * eyeLine, "Front dégagé au-dessus des yeux : " + gender + " / " + id);
        check(getComputedStyle(portrait, "::after").clipPath.startsWith("polygon"), "Blason à deux couches");
      }
    }
    delete state.profile.camp.equipped.head;
    state.profile.gender = "femme";
    portraits.remove();
    state.setGoal("pilates");
    window.FitnessRpgNavigation.openMobileDestination("goal");
    const goalList = document.querySelector("#goalChoiceList");
    check(goalList.textContent.includes("Tour du Mage") && goalList.textContent.includes("Prochaine étape"), "Parcours Pilates");
    state.profile.camp.claims[JSON.stringify(["campaign", "tour-mage"])] = true;
    render.renderGoalPage();
    check(state.getRecommendedProgram().id === "maitre-flux", "Recommandation après Tour du Mage");
    const catalog = goalList.querySelector("details");
    catalog.querySelector("summary").click();
    check(catalog.open && catalog.querySelectorAll("[data-program-id]").length === 15, "Catalogue des quinze programmes");
    catalog.querySelector('[data-program-id="cavalier-route"]').click();
    check(document.querySelector("#programDetail").dataset.programId === "cavalier-route", "Ouvrir un programme depuis le catalogue");
    window.FitnessRpgNavigation.openMobileDestination("programs");
    for (const [program, name, art] of [
      ["ballet-sylphes", "Ruban des Sylphes", "ribbon"],
      ["marche-aventurier", "Boussole des sentiers", "compass"],
      ["forge-guerrier", "Cape de la Forge", "ember"]
    ]) {
      render.renderProgramDetail(program);
      const preview = document.querySelector("#programDetail .program-trophy");
      check(preview?.textContent.includes(name) && preview.textContent.includes("boss obligatoires"), name);
      const bounds = preview.querySelector(".trophy-art--" + art).getBoundingClientRect();
      check(bounds.width > 0 && bounds.right <= innerWidth, "Illustration visible");
    }
    Object.assign(state.profile.camp, { gold: 100, owned: ["emerald-cloak", "trophy-trail-compass"],
      equipped: { cape: "emerald-cloak" } });
    state.saveProfile();
    window.FitnessRpgNavigation.openMobileDestination("camp");
    const wardrobe = document.querySelector("#campContent");
    const preview = wardrobe.querySelector('[data-fitting-action="preview"][data-camp-item="trophy-trail-compass"]');
    const slot = preview.closest("details");
    if (!slot.open) slot.querySelector("summary").click();
    check(preview.getClientRects().length, "Le bouton Essayer du vestiaire est visible");
    preview.click();
    check(wardrobe.querySelector(".camp-fitting .camp-avatar--trophee-sentiers"), "Aperçu au camp");
    wardrobe.querySelector('[data-fitting-action="cancel"]').click();
    check(!wardrobe.querySelector(".camp-fitting") && state.profile.camp.equipped.cape === "emerald-cloak", "Annulation");
    render.queueWorkoutSummary({ type: "program-boss", title: "Victoire", rewards: [
      { text: "Trophée obtenu · Boussole des sentiers", trophyId: "trophy-trail-compass" }] });
    render.renderWorkoutSummaryOverlay();
    const card = document.querySelector("#workoutSummaryCard");
    card.querySelector('[data-fitting-action="preview"]').click();
    const fitting = card.querySelector(".camp-fitting");
    check(fitting.querySelector(".camp-avatar--trophee-sentiers"), "Aperçu dans le bilan");
    const bounds = fitting.getBoundingClientRect();
    check(bounds.width > 0 && bounds.right <= innerWidth && bounds.left >= 0, "Largeur de l’essayage");
    fitting.querySelector('[data-fitting-action="confirm"]').click();
    state.loadProfile();
    check(state.profile.camp.equipped.broche === "trophy-trail-compass", "Équipement persistant");
    check(state.profile.camp.gold === 100 && state.profile.totalXp === 0, "Soldes conservés");
    check(!card.querySelector(".camp-fitting") && card.querySelector('[data-fitting-action="preview"]').disabled, "Bilan confirmé");
    state.setGoal("perte-poids");
    window.FitnessRpgNavigation.openMobileDestination("planning");
    document.querySelector('#planningSummary [data-mobile-destination="hero-menu"]').click();
    const panel = document.querySelector("#sportProfilePanel");
    panel.querySelector("#sportTrainingFields summary").click();
    const fields = panel.querySelector("#sportTrainingFields");
    check(fields.querySelector("#sportAgeGroup").getClientRects().length, "Formulaire sportif visible");
    check(fields.getBoundingClientRect().right <= innerWidth && fields.scrollWidth <= fields.clientWidth + 1,
      "Formulaire dans la largeur disponible");
    panel.querySelector("#sportLevelSelect").value = "advanced";
    panel.querySelector("#sportAgeGroup").value = "65+";
    panel.querySelector("#sportHabitualActivity").value = "inactive";
    panel.querySelector("#sportUsualRecovery").value = "variable";
    panel.querySelector('[name="sportAvailableDay"][value="fri"]').checked = true;
    check(panel.querySelector('[data-mobile-destination="goal"]'), "Lien vers l’objectif commun du héros");
    panel.querySelector("#sportDurationInput").value = "7";
    panel.querySelector("#sportMeasure-weightKg").value = "82.5";
    panel.querySelector("#saveSportProfileButton").click();
    state.loadProfile();
    const sport = state.getSportProfile();
    const recommendation = window.FitnessRpgSport.getTrainingRecommendation(sport);
    check(sport.trainingProfile.recovery === "variable" && sport.trainingProfile.availableDays.includes("fri"),
      "Récupération et disponibilités conservées après rechargement");
    check(sport.trainingProfile.weightKg === 82.5 && recommendation.level === "advanced", "Profil sportif persistant");
    check(recommendation.initialMinutes === 7 && recommendation.includeBalance, "Reprise fractionnée et équilibre");
    check(panel.querySelector('[role="status"]').textContent.includes("enregistré"), "Confirmation d’enregistrement");
    panel.querySelector("#sportLevelSelect").value = "beginner";
    const equipment = panel.querySelector('input[name="sportEquipment"][value="wall"]');
    equipment.closest("details").open = true;
    equipment.click();
    panel.querySelector("#saveSportProfileButton").click();
    state.loadProfile();
    check(state.getSportProfile().equipment.includes("wall"), "Mur enregistré dans le matériel");
    window.FitnessRpgExercises.openExerciseDetails("pushups");
    check(document.querySelector("#rpgModalMessage").textContent.includes("Option selon ton profil · Pompes murales"),
      "Variante issue du profil affichée dans le grimoire");
    document.querySelector("#rpgModalOkButton").click();
    window.confirm = () => false;
    panel.querySelector("#clearTrainingProfileButton").click();
    check(state.getSportProfile().trainingProfile !== null, "Annulation de l’effacement");
    window.confirm = () => true;
    panel.querySelector("#clearTrainingProfileButton").click();
    state.loadProfile();
    check(state.getSportProfile().trainingProfile === null && state.profile.camp.gold === 100, "Effacement ciblé et acquis conservés");
    window.FitnessRpgNavigation.openMobileDestination("planning");
    document.querySelector('[data-weight-plan="toggle"]').click();
    const planning = document.querySelector("#planningWeekGrid");
    check(planning.querySelectorAll('[data-weight-plan="day"]').length === 3, "Trois séances essentielles ouvertes");
    document.querySelector("#weightActivityMinutes").value = "12";
    document.querySelector('[data-weight-plan="log"]').click();
    check(document.querySelector("#planningSummary").textContent.includes("12 min d’endurance"), "Minutes externes reportées");
    planning.querySelector('[data-weight-plan="day"]').click();
    check(state.getActiveProgramSession()?.weightPlanningWorkout, "Ouverture d’une séance adaptée du planning");
    check(state.loadActiveProgramSession()?.adaptedExercises.length, "Séance adaptée conservée à la reprise");
    const xpBeforeStop = state.getProfile().totalXp;
    const goldBeforeStop = state.getProfile().camp.gold;
    const stopButton = document.querySelector('[data-coach-stop="pain"]');
    check(stopButton, "Arrêt pour douleur accessible en séance");
    stopButton.click();
    check(!state.getActiveProgramSession(), "La séance s’arrête immédiatement");
    check(state.getProfile().totalXp === xpBeforeStop && state.getProfile().camp.gold === goldBeforeStop,
      "L’arrêt de sécurité conserve les acquis");
    state.loadProfile();
    check(state.getProfile().adaptiveCoach.safety.paused.length === 1, "Mouvement suspendu après rechargement");
    const originalToday = state.todayKey();
    state.todayKey = () => state.getWeekKeys()[originalToday === state.getWeekKeys()[6] ? 3 : 6];
    window.FitnessRpgNavigation.openMobileDestination("planning");
    const planningInfo = document.querySelector("#weightPlanningInfo");
    check(planningInfo.open, "La suspension reste visible au retour dans le planning");
    planningInfo.querySelector("summary").click();
    const measures = planningInfo.nextElementSibling.querySelector('[data-weight-plan="dashboard-measures"]');
    check(measures?.textContent.includes("Afficher mes mesures"), "Mesures juste sous les informations");
    measures.click();
    check(document.querySelector('[aria-label="Mesures facultatives"]'), "Affichage des mesures");
    document.querySelector('[data-weight-plan="dashboard-measures"]').click();
    check(!document.querySelector('[aria-label="Mesures facultatives"]'), "Masquage des mesures");
    const dashboard = document.querySelector('[aria-label="Suivi du parcours"]');
    check(dashboard && !dashboard.querySelector('[aria-label="Mesures facultatives"]'), "Suivi visible, mesures masquées par défaut");
    dashboard.querySelector('[data-weight-plan="dashboard-rest"]').click();
    const restReward = document.querySelector('[data-milestone="weight-rest"]');
    check(restReward, "Le repos prévu ouvre le trophée");
    restReward.click();
    const balance = state.getProfile().camp.gold;
    restReward.click();
    state.loadProfile();
    check(state.getProfile().camp.owned.filter(id => id === "weight-rest").length === 1, "Trophée enregistré une seule fois");
    check(state.getProfile().camp.gold === balance, "Bourse inchangée au second clic");
    window.FitnessRpgNavigation.openMobileDestination("camp");
    check(document.querySelector("#campContent").textContent.includes("Sage du campement"), "Récompense visible dans le vestiaire");
    const titles = () => document.querySelector("#campTitles");
    check(!titles().open, "Titres repliés par défaut");
    titles().querySelector("summary").click();
    const titleCard = () => titles().querySelector(".camp-item strong").textContent;
    const firstTitle = titleCard();
    titles().querySelector('[data-camp-title-step="1"]').click();
    check(titles().open && titleCard() !== firstTitle, "Le titre suivant est affiché sans replier la section");
    check(document.activeElement.dataset.campTitleStep === "1", "Focus conservé sur la flèche");
    titles().querySelector('[data-camp-title-step="-1"]').click();
    check(titleCard() === firstTitle, "Retour au titre précédent");
    titles().querySelector("summary").click();
    check(!titles().open, "La section Titres peut être repliée");
    window.FitnessRpgNavigation.openMobileDestination("planning");
    document.querySelector('[data-weight-plan="day"]').click();
    const guided = state.getActiveProgramSession();
    checkNavigation("Barre mobile visible pendant la séance guidée");
    if (mobile) {
      const dock = document.querySelector(".guided-action-dock").getBoundingClientRect();
      const bar = nav.getBoundingClientRect();
      check(dock.height > 0 && dock.bottom < bar.top && dock.right <= innerWidth,
        "Commandes de séance visibles au-dessus de la barre mobile");
    }
    const programs = window.FitnessRpgPrograms;
    const movements = programs.getActiveProgramWorkout(guided).exercises;
    movements.forEach((item, index) => state.completeProgramSessionExercise(`${index}-${item.exerciseId}`));
    programs.finishProgramSession();
    const earnedXp = state.getProfile().totalXp;
    const earnedGold = state.getProfile().camp.gold;
    programs.finishProgramSession();
    check(state.getAllEntries().filter(item => item.id === guided.id).length === 1, "Une seule entrée après double validation");
    check(state.getJournal().filter(item => item.sessionId === guided.id).length === 1, "Une seule ligne de journal");
    check(state.getProfile().totalXp === earnedXp && state.getProfile().camp.gold === earnedGold, "Récompenses de séance uniques");
    state.setActiveProgramId("marche-aventurier");
    state.updateSportProfile({ preferredDuration: 7, sessionsPerWeek: 3, trainingProfile: { activity: "regular" } });
    window.FitnessRpgNavigation.openMobileDestination("planning");
    document.querySelector("#heroPlanningFocus").value = "endurance";
    document.querySelector('[data-hero-plan="apply"]').click();
    check(document.querySelector("#planningSummary").textContent.includes("Marche de l’aventurier"), "Programme principal préservé");
    check(document.querySelectorAll('#planningWeekGrid [data-hero-plan="day"]').length === 3, "Trois séances essentielles du programme actif");
    document.querySelector("#heroRecovery").value = "ready";
    document.querySelector('[data-hero-plan="recovery"]').click();
    check(document.querySelector("#heroRecoveryStatus").textContent.includes("enregistrée"), "Récupération confirmée");
    document.querySelector('#planningWeekGrid [data-hero-plan="day"]').click();
    const heroSession = state.getActiveProgramSession();
    check(heroSession?.heroPlanningWorkout && heroSession.adaptedExercises.length, "Séance lancée depuis La Voie du Héros");
    check(state.loadActiveProgramSession().heroPlanningWorkout, "Séance personnalisée conservée après rechargement");
    check(document.querySelector('[data-coach-stop="pain"]'), "Arrêt de sécurité disponible dans La Voie du Héros");
    document.body.dataset.wardrobeTest = "passed";
  } catch (error) {
    document.body.dataset.wardrobeTest = String(error);
  }
}

async function main() {
  const index = fs.readFileSync(path.join(root, "index.html"), "utf8").replace("</body>",
    `<script>window.addEventListener("load", ${exerciseWardrobe.toString()});</script></body>`);
  const mime = { ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".json": "application/json",
    ".webmanifest": "application/manifest+json", ".png": "image/png" };
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/") return res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"}).end(index);
    const file = path.resolve(root, "." + url.pathname);
    if (!file.startsWith(root + path.sep) || !fs.statSync(file, { throwIfNoEntry: false })?.isFile()) {
      return res.writeHead(404).end();
    }
    res.setHeader("Content-Type", mime[path.extname(file)] || "application/octet-stream");
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  try {
    for (const width of [360, 1280]) {
      const profile = fs.mkdtempSync(path.join(os.tmpdir(), "fitness-wardrobe-"));
      try {
        const { stdout } = await exec(process.env.CHROME_BIN || "google-chrome", [
          "--headless", "--disable-gpu", "--no-sandbox", "--no-first-run", "--disable-dev-shm-usage",
          "--hide-scrollbars", `--user-data-dir=${profile}`, `--window-size=${width},850`,
          "--virtual-time-budget=2500", "--dump-dom", `http://127.0.0.1:${server.address().port}/`
        ], { timeout: 35000, maxBuffer: 8 * 1024 * 1024 });
        assert.equal(stdout.match(/<body\b[^>]*data-wardrobe-test="([^"]+)"/)?.[1], "passed");
        console.log(`Vestiaire, trophées, profil sportif et variante du grimoire validés dans Chrome (fenêtre ${width} px).`);
      } finally {
        fs.rmSync(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
      }
    }
  } finally {
    server.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
