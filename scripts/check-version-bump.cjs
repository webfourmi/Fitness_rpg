#!/usr/bin/env node
"use strict";

// Interdit une mise à jour de code/ressources livrée sans incrément de version.
// Utilisation en CI : node scripts/check-version-bump.cjs SHA_BASE

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const base = process.argv[2];
if (!base || !/^[a-f0-9]{7,40}$/i.test(base)) {
  console.error("SHA de référence manquant ou invalide.");
  process.exit(1);
}
function git(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}
function versionFrom(config) {
  const match = config.match(/^\s*assetVersion:\s*"(\d+(?:\.\d+)*)"/m);
  if (!match) throw new Error("assetVersion introuvable dans app-config.js");
  return match[1];
}
function compare(a, b) {
  const left = a.split(".").map(Number), right = b.split(".").map(Number);
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    const diff = (left[i] || 0) - (right[i] || 0);
    if (diff) return diff;
  }
  return 0;
}
try {
  const changed = git(["diff", "--name-only", base, "HEAD"]).split("\n").filter(Boolean);
  const requiresVersion = changed.filter((filename) => (
    !/^(?:docs\/|tests\/|scripts\/|\.github\/)/.test(filename)
    && !["README.md", "AGENTS.md"].includes(filename)
  ));
  if (!requiresVersion.length) {
    console.log("Aucun fichier de l'application modifié, incrément inutile.");
    process.exit(0);
  }

  const previous = versionFrom(git(["show", base + ":app-config.js"]));
  const current = versionFrom(fs.readFileSync(path.join(root, "app-config.js"), "utf8"));
  if (compare(current, previous) <= 0) {
    throw new Error(
      "Livraison modifiant l'application sans nouvelle version : " +
      previous + " → " + current + ". " +
      "Modifier app-config.js, index.html, service-worker.js et version.json."
    );
  }
  console.log("Version correcte : " + previous + " → " + current);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
