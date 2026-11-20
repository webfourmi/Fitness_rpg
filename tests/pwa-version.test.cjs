"use strict";

const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const config = read("app-config.js");
const html = read("index.html");
const worker = read("service-worker.js");
const pwaSource = read("app-pwa.js");
const manifest = JSON.parse(read("version.json"));
const nextVersion = manifest.version.replace(/\d+$/, (patch) => String(Number(patch) + 1));

function property(source, name) {
  const value = source.match(new RegExp("\\b" + name + ':\\s*"([^"]+)"'));
  assert.ok(value, "Propriété manquante : " + name);
  return value[1];
}
function createPwa(remoteVersion) {
  const win = {
    FitnessRpgConfig: { assetVersion: manifest.version },
    localStorage: { getItem: () => null, setItem: () => undefined },
    location: {
      href: "https://example.org/Fitness_rpg/",
      replace: (next) => { win.lastNavigation = next; },
      reload: () => { win.reloaded = true; }
    }
  };
  const context = {
    window: win,
    document: { readyState: "loading", addEventListener() {}, querySelector: () => null },
    navigator: { onLine: true, serviceWorker: { controller: {} } },
    URL, Date, console,
    fetch: async () => ({
      ok: true,
      json: async () => ({ version: remoteVersion, notes: "Une nouvelle aventure." })
    })
  };
  vm.runInNewContext(pwaSource, context, { filename: "app-pwa.js" });
  const pwa = win.FitnessRpgPwa;
  pwa.registration = { update: async () => undefined };
  return { pwa, win, context };
}

test("tous les fichiers publiés partagent la même version", () => {
  const version = manifest.version;
  assert.match(version, /^\d+\.\d+\.\d+$/);
  assert.equal(property(config, "version"), version);
  assert.equal(property(config, "displayVersion"), "V" + version);
  assert.equal(property(config, "assetVersion"), version);
  assert.ok(worker.includes(`const APP_VERSION = "${version}";`));

  const indexVersions = [...html.matchAll(/\?v=(\d+(?:\.\d+)+)/g)].map((match) => match[1]);
  const workerVersions = [...worker.matchAll(/\?v=(\d+(?:\.\d+)+)/g)].map((match) => match[1]);
  assert.ok(indexVersions.length >= 20, "Les ressources de index.html doivent être versionnées.");
  assert.ok(workerVersions.length >= 20, "Les ressources du SW doivent être versionnées.");
  assert.ok(indexVersions.every((value) => value === version));
  assert.ok(workerVersions.every((value) => value === version));
  assert.match(worker, /"\.\/version\.json"/);
  assert.match(html, /id="pwaUpdateButton"/);
  assert.match(html, /data-pwa-action="check-update"/);
});

test("comparaison sémantique des versions", () => {
  const { pwa } = createPwa(nextVersion);
  assert.equal(pwa.compareVersions("6.6.12", "6.6.9"), 1);
  assert.equal(pwa.compareVersions("6.7.0", "6.6.99"), 1);
  assert.equal(pwa.compareVersions("V6.6.12", "6.6.12"), 0);
  assert.equal(pwa.compareVersions("6.6.11", "6.6.12"), -1);
});

test("une version distante plus récente déclenche Installer MAJ", async () => {
  const { pwa } = createPwa(nextVersion);
  await pwa.checkForUpdate();
  assert.equal(pwa.availableVersion, nextVersion);
  assert.equal(pwa.isUpdateAvailable(), true);
  pwa.showPrompt = (options) => { pwa.lastPrompt = options; };
  pwa.showUpdatePrompt();
  assert.equal(pwa.lastPrompt.primaryLabel, "Installer MAJ");
  assert.ok(pwa.lastPrompt.message.includes(`Version ${manifest.version} → ${nextVersion}.`));
});

test("pas de proposition quand la version distante est égale ou antérieure", async () => {
  const { pwa, context } = createPwa("6.6.11");
  await pwa.checkForUpdate();
  assert.equal(pwa.availableVersion, null);
  assert.equal(pwa.isUpdateAvailable(), false);
  context.fetch = async () => ({ok:true, json: async () => ({version:"6.6.12"})});
  await pwa.checkForUpdate();
  assert.equal(pwa.isUpdateAvailable(), false);
});

test("une MAJ ne recharge pas une séance et propose une navigation réseau ensuite", async () => {
  const { pwa, win } = createPwa(nextVersion);
  await pwa.checkForUpdate();
  pwa.getElements = () => ({ primary: null });
  pwa.hasActiveWorkout = () => true;
  pwa.applyUpdate();
  assert.equal(win.lastNavigation, undefined);
  pwa.hasActiveWorkout = () => false;
  pwa.applyUpdate();
  assert.equal(new URL(win.lastNavigation).searchParams.get("maj"), nextVersion);
});

test("un bouton MAJ reste accessible même après avoir fermé le bandeau", async () => {
  const { pwa } = createPwa(nextVersion);
  await pwa.checkForUpdate();
  const button = {
    classList: { toggle(name, hidden) { button.hidden = hidden; } },
    setAttribute() {},
    disabled: false
  };
  pwa.getElements = () => ({ updateButton: button });
  pwa.updateDismissed = true;
  pwa.refreshUpdateButton();
  assert.equal(button.hidden, false);
  assert.equal(button.disabled, false);
});
