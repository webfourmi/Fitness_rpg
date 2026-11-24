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
    Object.assign(state.profile.camp, { gold: 100, owned: ["emerald-cloak", "trophy-astral-dragon"],
      equipped: { cape: "emerald-cloak" } });
    state.saveProfile();
    window.FitnessRpgNavigation.openMobileDestination("camp");
    const wardrobe = document.querySelector("#campContent");
    const preview = wardrobe.querySelector('[data-fitting-action="preview"][data-camp-item="trophy-astral-dragon"]');
    const slot = preview.closest("details");
    if (!slot.open) slot.querySelector("summary").click();
    check(preview.getClientRects().length, "Le bouton Essayer du vestiaire est visible");
    preview.click();
    check(wardrobe.querySelector(".camp-fitting .camp-avatar--trophee-astral"), "Aperçu au camp");
    wardrobe.querySelector('[data-fitting-action="cancel"]').click();
    check(!wardrobe.querySelector(".camp-fitting") && state.profile.camp.equipped.cape === "emerald-cloak", "Annulation");
    render.queueWorkoutSummary({ type: "program-boss", title: "Victoire", rewards: [
      { text: "Trophée obtenu · Cape étoilée", trophyId: "trophy-astral-dragon" }] });
    render.renderWorkoutSummaryOverlay();
    const card = document.querySelector("#workoutSummaryCard");
    card.querySelector('[data-fitting-action="preview"]').click();
    const fitting = card.querySelector(".camp-fitting");
    check(fitting.querySelector(".camp-avatar--trophee-astral"), "Aperçu dans le bilan");
    const bounds = fitting.getBoundingClientRect();
    check(bounds.width > 0 && bounds.right <= innerWidth && bounds.left >= 0, "Largeur de l’essayage");
    fitting.querySelector('[data-fitting-action="confirm"]').click();
    state.loadProfile();
    check(state.profile.camp.equipped.cape === "trophy-astral-dragon", "Équipement persistant");
    check(state.profile.camp.gold === 100 && state.profile.totalXp === 0, "Soldes conservés");
    check(!card.querySelector(".camp-fitting") && card.querySelector('[data-fitting-action="preview"]').disabled, "Bilan confirmé");
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
        console.log(`Vestiaire et trophée validés dans Chrome (fenêtre ${width} px).`);
      } finally {
        fs.rmSync(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
      }
    }
  } finally {
    server.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
