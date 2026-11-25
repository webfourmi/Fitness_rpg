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
    panel.querySelector("#sportDurationInput").value = "7";
    panel.querySelector("#sportMeasure-weightKg").value = "82.5";
    panel.querySelector("#saveSportProfileButton").click();
    state.loadProfile();
    const sport = state.getSportProfile();
    const recommendation = window.FitnessRpgSport.getTrainingRecommendation(sport);
    check(sport.trainingProfile.weightKg === 82.5 && recommendation.level === "advanced", "Profil sportif persistant");
    check(recommendation.initialMinutes === 7 && recommendation.includeBalance, "Reprise fractionnée et équilibre");
    check(panel.querySelector('[role="status"]').textContent.includes("enregistré"), "Confirmation d’enregistrement");
    window.confirm = () => false;
    panel.querySelector("#clearTrainingProfileButton").click();
    check(state.getSportProfile().trainingProfile !== null, "Annulation de l’effacement");
    window.confirm = () => true;
    panel.querySelector("#clearTrainingProfileButton").click();
    state.loadProfile();
    check(state.getSportProfile().trainingProfile === null && state.profile.camp.gold === 100, "Effacement ciblé et acquis conservés");
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
        console.log(`Vestiaire, trophées et profil sportif validés dans Chrome (fenêtre ${width} px).`);
      } finally {
        fs.rmSync(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
      }
    }
  } finally {
    server.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
