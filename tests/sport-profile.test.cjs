const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const vm = require("node:vm");
const test = require("node:test");

function boot() {
  const data = new Map();
  const localStorage = {
    get length() { return data.size; },
    key: (index) => [...data.keys()][index],
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key)
  };
  const window = { setTimeout() {} };
  const document = { readyState: "loading", addEventListener() {}, querySelector: () => null };
  const context = vm.createContext({ window, document, localStorage, console, Blob });
  for (const file of ["app-config.js", "app-state.js", "app-render.js", "app-programs.js", "app-sport.js", "app-backup.js"]) {
    vm.runInContext(readFileSync(join(__dirname, "..", file), "utf8"), context, { filename: file });
  }

  const state = window.FitnessRpgState;
  state.setProfile(state.createDefaultProfile({ name: "Test", gender: "femme" }));
  return { state, sport: window.FitnessRpgSport, backup: window.FitnessRpgBackup, localStorage };
}

test("le profil reste facultatif et un ancien profil conserve ses acquis", () => {
  const { state, sport, localStorage } = boot();
  const stored = { ...state.getProfile(), sportProfile: { level: "advanced" }, totalXp: 420, badges: ["test"] };
  localStorage.setItem(state.getKeys().profile, JSON.stringify(stored));
  state.loadProfile();
  assert.equal(state.getSportProfile().trainingProfile, null);
  assert.equal(sport.getTrainingRecommendation(state.getSportProfile()), null);
  assert.equal(state.getSportProfile().level, "advanced");
  assert.equal(state.getProfile().totalXp, 420);
  assert.equal(state.getProfile().badges[0], "test");
});

test("le niveau est indépendant de l’âge et des mesures, les limitations priment", () => {
  const { state, sport } = boot();
  const advice = () => sport.getTrainingRecommendation(state.getSportProfile());
  const training = { ageGroup: "65+", activity: "regular", weightKg: 80 };
  state.updateSportProfile({ level: "advanced", preferredDuration: 25, trainingProfile: training });
  assert.equal(advice().level, "advanced");
  assert.equal(advice().includeBalance, true);
  assert.equal(advice().initialMinutes, 25);
  const regular = JSON.stringify(advice());
  state.updateSportProfile({ trainingProfile: { ...training, weightKg: 120 } });
  assert.equal(JSON.stringify(advice()), regular);
  state.updateSportProfile({ preferredDuration: 7, trainingProfile: { ...training, activity: "inactive", limitations: ["knees"] } });
  assert.equal(advice().mode, "gradual-start");
  assert.equal(advice().initialMinutes, 7);
  assert.equal(advice().avoidImpact, true);
  state.updateSportProfile({ trainingProfile: { ...training, medicalRestriction: true } });
  assert.equal(advice().mode, "professional-review");
  assert.equal(advice().initialMinutes, null);
});

test("les données complémentaires survivent à un export et un import puis peuvent être effacées", () => {
  const { state, backup } = boot();
  state.updateSportProfile({ level: "intermediate", trainingProfile: { ageGroup: "40-64", waistCm: 84.5, weightKg: -2 } });
  const validation = backup.validateBackupObject(JSON.parse(JSON.stringify(backup.buildBackup())));
  assert.equal(validation.valid, true, validation.errors.join(", "));
  state.updateSportProfile({ trainingProfile: null });
  backup.applyRecordsTransaction(validation.records);
  state.loadProfile();
  assert.equal(state.getSportProfile().trainingProfile.waistCm, 84.5);
  assert.equal(state.getSportProfile().trainingProfile.weightKg, null);
  assert.equal(state.getSportProfile().trainingProfile.version, 1);
  state.updateSportProfile({ trainingProfile: null });
  state.loadProfile();
  assert.equal(state.getSportProfile().trainingProfile, null);
  assert.equal(state.getSportProfile().level, "intermediate");
});
