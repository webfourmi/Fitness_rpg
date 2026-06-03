const APP_VERSION = "0.1.6";
const STORAGE_KEY = "sportRpgV1Profile";
const LOG_LIMIT = 12;

const avatarLabels = {
  homme20: "Homme · 20 ans",
  femme20: "Femme · 20 ans",
  homme50: "Homme · 50 ans",
  femme50: "Femme · 50 ans",
};

const quests = [
  { id: "warmup", title: "Échauffement", description: "5 min de mobilité douce", xp: 10, stat: "Discipline" },
  { id: "walk", title: "Marche active", description: "30 min dehors ou tapis", xp: 35, stat: "Endurance" },
  { id: "bike15", title: "Vélo", description: "15 min à rythme confortable", xp: 25, stat: "Cardio" },
  { id: "bike", title: "Vélo", description: "20 min à rythme confortable", xp: 35, stat: "Cardio" },
  { id: "pilates10", title: "Pilates", description: "10 min de renforcement doux", xp: 15, stat: "Stabilité" },
  { id: "pilates30", title: "Pilates", description: "30 min de renforcement doux", xp: 40, stat: "Stabilité" },
  { id: "pilates45", title: "Pilates", description: "45 min de renforcement doux", xp: 55, stat: "Stabilité" },
  { id: "squats", title: "Squats", description: "3 séries de 10 répétitions", xp: 25, stat: "Force" },
  { id: "core", title: "Gainage", description: "3 x 30 secondes", xp: 25, stat: "Stabilité" },
  { id: "stretch", title: "Étirements", description: "10 min de récupération", xp: 15, stat: "Souplesse" },
];

const questPoseMap = {
  warmup: "warmup",
  walk: "walk",
  bike15: "bike",
  bike: "bike",
  pilates10: "core",
  pilates30: "core",
  pilates45: "core",
  squats: "squats",
  core: "core",
  stretch: "stretch",
};

const coaches = {
  korvan: {
    name: "Korvan",
    fullName: "Coach Korvan le Barbare",
    image: "assets/coach/korvan/idle.jpg",
    fallbackImage: "assets/coach/korvan/image.jpg",
    poses: {
      idle: "assets/coach/korvan/idle.jpg",
      welcome: "assets/coach/korvan/welcome.jpg",
      explain: "assets/coach/korvan/explain.jpg",
      motivate: "assets/coach/korvan/motivate.jpg",
      warmup: "assets/coach/korvan/warmup.jpg",
      walk: "assets/coach/korvan/walk.jpg",
      bike: "assets/coach/korvan/bike.jpg",
      squats: "assets/coach/korvan/squats.jpg",
      core: "assets/coach/korvan/core.jpg",
      stretch: "assets/coach/korvan/stretch.jpg",
      victory: "assets/coach/korvan/victory.jpg",
      levelup: "assets/coach/korvan/levelup.jpg",
    },
    start: [
      "Debout. Le corps ne devient pas fort en négociant avec le canapé.",
      "Aujourd’hui, tu gagnes ta ration de gloire.",
      "Les muscles dorment. Réveille-les.",
    ],
    complete: [
      "Quête accomplie. Tu n’es pas venu pour rien.",
      "La faiblesse recule d’un pas. Continue.",
    ],
    levelUp: [
      "Niveau supérieur. Ton nom mérite une ligne de plus dans la saga.",
      "Ton corps se renforce. Les ennemis prennent des notes.",
    ],
    byQuest: {
      warmup: ["Échauffe-toi. Même une hache doit être levée avant la bataille."],
      walk: ["Marche. Chaque pas écrase un peu plus l’ancien toi."],
      bike15: ["Quinze minutes de roue. C’est assez pour réveiller le souffle."],
      bike: ["Pédale. Que tes jambes deviennent des roues de guerre."],
      pilates10: ["Dix minutes de contrôle. Même un barbare doit tenir son centre."],
      pilates30: ["Trente minutes de discipline lente. Voilà une force qui ne crie pas."],
      pilates45: ["Quarante-cinq minutes. Ton tronc devient une forteresse."],
      squats: ["Plie les jambes. Le sol doit comprendre qui commande."],
      core: ["Tiens. Un tronc solide porte mieux la légende."],
      stretch: ["La récupération n’est pas une faiblesse. C’est l’affûtage de la lame."],
    },
  },
  xara: {
    name: "Xara",
    fullName: "Coach Xara la Guerrière",
    image: "assets/coach/xara/image.jpg",
    start: ["Allez, guerrier. On commence proprement, on finit fièrement.", "Pas besoin d’être parfait. Besoin d’être présent."],
    complete: ["Bien joué. Ton futur toi vient d’applaudir.", "Tu as tenu. C’est comme ça qu’on construit une légende."],
    levelUp: ["Niveau supérieur ! Tu avances avec panache."],
    byQuest: {
      warmup: ["Une bonne guerrière ne charge pas à froid."],
      walk: ["Garde l’allure. La régularité gagne plus de combats que l’orgueil."],
      bike15: ["Quinze minutes bien tenues. C’est un vrai tour de chauffe."],
      bike: ["Trouve ton rythme. Respiration stable, jambes efficaces."],
      pilates10: ["Contrôle court, utile et précis. Très bon choix."],
      pilates30: ["Trente minutes de maîtrise. Le corps devient plus fiable."],
      pilates45: ["Longue séance, belle discipline. Tu as tenu la ligne."],
      squats: ["Dos solide, jambes actives. C’est une fondation."],
      core: ["Tiens la position. Le combat se gagne aussi dans l’immobilité."],
      stretch: ["Récupère avec sérieux. La souplesse protège le guerrier."],
    },
  },
  violette: {
    name: "Violette",
    fullName: "Coach Violette la Halfeline",
    image: "assets/coach/violette/image.jpg",
    start: ["On y va doucement, mais on y va vraiment !", "Petit pas, grand progrès. Aujourd’hui, on avance."],
    complete: ["Bravo ! Une quête de plus dans la besace.", "Tu avances mieux que tu ne le crois, continue !"],
    levelUp: ["Niveau supérieur ! Ça mérite presque un second petit déjeuner."],
    byQuest: {
      warmup: ["On réveille doucement la machine."],
      walk: ["Une bonne marche, c’est une aventure qui a mis de bonnes chaussures."],
      bike15: ["Petite sortie vélo, joli pactole d’XP !"],
      bike: ["Tes jambes tournent, ton XP monte. Belle affaire !"],
      pilates10: ["Dix minutes bien placées. Petit effort, vrai progrès."],
      pilates30: ["Trente minutes de Pilates, ça mérite une médaille moelleuse."],
      pilates45: ["Quarante-cinq minutes ! Là, le coussin applaudit."],
      squats: ["Hop, on descend, on remonte."],
      core: ["Ça tremble ? Parfait, ça veut dire que ça travaille."],
      stretch: ["On s’étire, on respire, on remet le corps en mode velours."],
    },
  },
  elmin: {
    name: "Elmin",
    fullName: "Coach Elmin le Mage",
    image: "assets/coach/elmin/image.jpg",
    start: ["Concentre-toi. Chaque répétition est un sort bien exécuté.", "La régularité est une magie discrète, mais puissante."],
    complete: ["Excellent. L’effort a été canalisé avec précision.", "Très bien. Tu gagnes en maîtrise autant qu’en force."],
    levelUp: ["Niveau supérieur. Les résultats suivent la discipline."],
    byQuest: {
      warmup: ["Le rituel commence par la préparation."],
      walk: ["La marche est une magie ancienne : simple, lente, efficace."],
      bike15: ["Un cycle court, mais utile. L’endurance se nourrit aussi de régularité."],
      bike: ["Pédale avec méthode. Le souffle est ton métronome."],
      pilates10: ["Dix minutes de précision. Le centre s’éveille."],
      pilates30: ["Trente minutes de contrôle. La posture gagne en pouvoir."],
      pilates45: ["Quarante-cinq minutes de concentration. Le sort tient."],
      squats: ["Les jambes sont les piliers du temple. Renforçons-les."],
      core: ["La stabilité est une forme de puissance silencieuse."],
      stretch: ["La souplesse est une magie lente. Ne la brusque pas."],
    },
  },
};

let profile = null;
let currentView = "setup";
let pose = "idle";
let audioCtx = null;
let pulseTimer = null;
let pulseOn = false;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const el = {
  setupPanel: $("#setupPanel"), dashboard: $("#dashboard"), homePanel: $("#homePanel"), editorPanel: $("#editorPanel"), heroCreationFields: $("#heroCreationFields"),
  homeHeroSummary: $("#homeHeroSummary"), homeCoachSummary: $("#homeCoachSummary"), setupTitle: $("#setupTitle"), setupHelp: $("#setupHelp"),
  appVersionLabel: $("#appVersionLabel"), appVersionLabelEditor: $("#appVersionLabelEditor"), name: $("#playerNameInput"), avatar: $("#avatarSelect"),
  create: $("#createProfileBtn"), cont: $("#continueProfileBtn"), changeCoach: $("#changeCoachBtn"), newHero: $("#startCreateHeroBtn"), saveCoach: $("#saveCoachBtn"), cancel: $("#cancelSetupBtn"),
  reset: $("#resetProfileBtn"), home: $("#homeBtn"), heroPortrait: $("#heroPortrait"), heroName: $("#heroName"), avatarLabel: $("#avatarLabel"), rank: $("#rankLabel"),
  level: $("#levelLabel"), xp: $("#xpLabel"), bar: $("#xpBar"), total: $("#totalXpLabel"), streak: $("#streakLabel"), done: $("#doneTodayLabel"),
  coachName: $("#coachName"), coachPortrait: $("#coachPortrait"), coachMsg: $("#coachMessage"), newMsg: $("#newCoachMessageBtn"), choice: $("#coachChoiceGrid"),
  sportHub: $("#sportHub"), musicPage: $("#musicPage"), questsPage: $("#questsPage"), weekPage: $("#weekPage"), badgesPage: $("#badgesPage"),
  musicSummary: $("#currentMusicSummary"), questSummary: $("#currentQuestSummary"), openMusic: $("#openMusicBtn"), openQuests: $("#openQuestsBtn"), openWeek: $("#openWeekBtn"), openBadges: $("#openBadgesBtn"),
  questsList: $("#questsList"), resetDaily: $("#resetDailyBtn"), weekList: $("#weekList"), badgesList: $("#badgesList"), logCard: $("#logCard"), logList: $("#logList"), clearLog: $("#clearLogBtn"),
  audioInput: $("#audioFileInput"), audio: $("#audioPlayer"), pulse: $("#pulseMusicBtn"), stop: $("#stopPulseBtn"),
};

function today() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(profile)); }
function load() { try { profile = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); currentView = profile ? "home" : "setup"; } catch { profile = null; currentView = "setup"; } }
function need(level) { return 100 + (level - 1) * 25; }
function levelInfo(xp) { let level = 1, remaining = xp; while (remaining >= need(level)) { remaining -= need(level); level += 1; } return { level, currentXp: remaining, nextXp: need(level) }; }
function stage(level) { if (level >= 30) return 5; if (level >= 20) return 4; if (level >= 10) return 3; if (level >= 5) return 2; return 1; }
function rank(stageNumber) { return ["", "Débutant", "Mise en forme", "Sportif régulier", "Athlétique", "Héros confirmé"][stageNumber]; }
function coachImg(id, wantedPose = "idle") { const coach = coaches[id]; return coach?.poses?.[wantedPose] || coach?.fallbackImage || coach?.image || ""; }
function safeCoachImage(img, id, wantedPose = "idle") { const coach = coaches[id], preferred = coachImg(id, wantedPose), fallback = coach?.fallbackImage || coach?.image || preferred; img.onerror = () => { img.onerror = null; if (!img.src.endsWith(fallback)) img.src = fallback; }; img.src = preferred; }
function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
function selectedCoach() { return $('input[name="coach"]:checked')?.value || "korvan"; }
function msg(type) { const coach = coaches[profile.coach]; return pick(coach[type] || coach.start); }
function questMsg(questId) { const coach = coaches[profile.coach], list = coach.byQuest?.[questId]; return list ? pick(list) : msg("complete"); }
function log(text) { profile.log.unshift(`${new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} · ${text}`); profile.log = profile.log.slice(0, LOG_LIMIT); }
function doneToday() { return profile.completedByDate[today()] || []; }
function setDone(list) { profile.completedByDate[today()] = list; }
function updateStreak() { const t = today(); if (profile.lastActiveDate === t) return; const y = new Date(); y.setDate(y.getDate() - 1); const ky = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, "0")}-${String(y.getDate()).padStart(2, "0")}`; profile.streak = profile.lastActiveDate === ky ? profile.streak + 1 : 1; profile.lastActiveDate = t; }

function complete(id) {
  const quest = quests.find((q) => q.id === id), completed = doneToday();
  if (!quest || completed.includes(id)) return;
  const oldLevel = levelInfo(profile.totalXp).level;
  completed.push(id); setDone(completed); updateStreak(); profile.totalXp += quest.xp; profile.xp += quest.xp;
  pose = questPoseMap[id] || "victory"; log(`+${quest.xp} XP · ${quest.title}`);
  const newLevel = levelInfo(profile.totalXp).level;
  if (newLevel > oldLevel) { pose = "levelup"; log(`Niveau ${newLevel} atteint !`); el.coachMsg.textContent = msg("levelUp"); }
  else el.coachMsg.textContent = questMsg(id);
  save(); render();
}

function render() {
  const hasProfile = Boolean(profile), isDashboard = hasProfile && ["dashboard", "music", "quests", "week", "badges"].includes(currentView);
  if (el.appVersionLabel) el.appVersionLabel.textContent = APP_VERSION;
  if (el.appVersionLabelEditor) el.appVersionLabelEditor.textContent = APP_VERSION;
  el.home?.classList.toggle("hidden", !isDashboard);

  if (!isDashboard) {
    el.setupPanel.classList.remove("hidden"); el.dashboard.classList.add("hidden");
    const isHome = hasProfile && currentView === "home", isCoach = hasProfile && currentView === "coach";
    el.homePanel.classList.toggle("hidden", !isHome); el.editorPanel.classList.toggle("hidden", isHome);
    if (isHome) { const info = levelInfo(profile.totalXp); el.homeHeroSummary.textContent = `${profile.name} · ${avatarLabels[profile.avatar]} · Niveau ${info.level} · ${profile.totalXp} XP`; el.homeCoachSummary.textContent = `Coach actuel : ${coaches[profile.coach].fullName}`; return; }
    el.heroCreationFields.classList.toggle("hidden", isCoach); el.create.classList.toggle("hidden", isCoach); el.saveCoach.classList.toggle("hidden", !isCoach); el.cancel.classList.toggle("hidden", !hasProfile);
    el.setupTitle.textContent = isCoach ? "Changer de coach" : "Créer ton héros";
    el.setupHelp.textContent = isCoach ? "Choisis un nouveau coach. Ton XP et ton niveau seront conservés." : "Choisis ton avatar et ton coach pour commencer.";
    if (isCoach) selectCoach(profile.coach); syncCards(); return;
  }

  el.setupPanel.classList.add("hidden"); el.dashboard.classList.remove("hidden");
  const pages = { dashboard: el.sportHub, music: el.musicPage, quests: el.questsPage, week: el.weekPage, badges: el.badgesPage };
  Object.entries(pages).forEach(([name, panel]) => panel?.classList.toggle("hidden", currentView !== name));
  el.logCard?.classList.toggle("hidden", currentView !== "dashboard");
  if (currentView === "music") pose = "motivate"; if (currentView === "quests") pose = "explain"; if (currentView === "week") pose = "welcome"; if (currentView === "badges") pose = "victory";
  const info = levelInfo(profile.totalXp), currentStage = stage(info.level), completed = doneToday(), coach = coaches[profile.coach];
  el.heroName.textContent = profile.name; el.avatarLabel.textContent = avatarLabels[profile.avatar]; el.rank.textContent = `${rank(currentStage)} · stade ${currentStage}`; el.level.textContent = `Niveau ${info.level}`; el.xp.textContent = `${info.currentXp} / ${info.nextXp} XP`; el.bar.style.width = `${Math.min(100, Math.round((info.currentXp / info.nextXp) * 100))}%`; el.total.textContent = profile.totalXp; el.streak.textContent = profile.streak; el.done.textContent = completed.length; el.coachName.textContent = coach.fullName; safeCoachImage(el.coachPortrait, profile.coach, pose); el.coachPortrait.alt = coach.fullName; el.heroPortrait.innerHTML = heroSvg(currentStage);
  renderQuests(completed); renderWeek(); renderBadges(); renderLog(); summaries();
}

function renderQuests(completed) { el.questsList.innerHTML = ""; quests.forEach((quest) => { const isDone = completed.includes(quest.id), item = document.createElement("article"); item.className = `quest-item${isDone ? " done" : ""}`; item.innerHTML = `<div class="quest-title-row"><strong>${quest.title}</strong><span class="quest-xp">+${quest.xp} XP</span></div><p class="quest-meta">${quest.description}</p><p class="quest-meta">Stat : ${quest.stat}</p><button class="${isDone ? "ghost-btn" : "primary-btn"}" ${isDone ? "disabled" : ""}>${isDone ? "Déjà accomplie" : "Valider la quête"}</button>`; item.querySelector("button").onclick = () => complete(quest.id); el.questsList.appendChild(item); }); }
function renderWeek() { if (!el.weekList || !profile) return; const start = new Date(), day = (start.getDay() + 6) % 7; start.setDate(start.getDate() - day); const names = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]; el.weekList.innerHTML = ""; for (let i = 0; i < 7; i += 1) { const d = new Date(start); d.setDate(start.getDate() + i); const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`, count = (profile.completedByDate[key] || []).length, item = document.createElement("div"); item.className = `week-day${key === today() ? " today" : ""}${count ? " active" : ""}`; item.innerHTML = `<strong>${names[i]}</strong><span>${count} quête${count > 1 ? "s" : ""}</span>`; el.weekList.appendChild(item); } }
function allDone() { return Object.values(profile?.completedByDate || {}).flat(); }
function count(id) { return allDone().filter((questId) => questId === id).length; }
function renderBadges() { if (!el.badgesList || !profile) return; const total = allDone().length, full = Object.values(profile.completedByDate || {}).some((completed) => quests.every((quest) => completed.includes(quest.id))); const badges = [["👣", "Premier pas", "Valider une première quête.", total >= 1], ["🔥", "Élan du héros", "Valider 3 quêtes au total.", total >= 3], ["🏆", "Journée complète", "Valider toutes les quêtes d’une journée.", full], ["📅", "Régulier", "Atteindre 3 jours de série.", profile.streak >= 3], ["🚴", "Cycliste novice", "Valider 5 séances de vélo.", count("bike") + count("bike15") >= 5], ["🧘", "Pilates novice", "Valider 3 séances de Pilates.", count("pilates10") + count("pilates30") + count("pilates45") >= 3], ["💪", "Force tranquille", "Valider 10 quêtes de force, gainage ou Pilates.", count("squats") + count("core") + count("pilates10") + count("pilates30") + count("pilates45") >= 10]]; el.badgesList.innerHTML = ""; badges.forEach((badge) => { const item = document.createElement("article"); item.className = `badge-item${badge[3] ? " unlocked" : ""}`; item.innerHTML = `<div class="badge-icon">${badge[0]}</div><div><strong>${badge[1]}</strong><p>${badge[2]}</p><span>${badge[3] ? "Débloqué" : "Verrouillé"}</span></div>`; el.badgesList.appendChild(item); }); }
function renderLog() { el.logList.innerHTML = ""; const entries = profile.log.length ? profile.log : ["Aucune quête accomplie pour l’instant."]; entries.forEach((entry) => { const li = document.createElement("li"); li.textContent = entry; el.logList.appendChild(li); }); }
function summaries() { const completed = doneToday(), lastQuest = quests.find((quest) => quest.id === completed.at(-1)); el.questSummary.textContent = lastQuest ? `Dernière quête : ${lastQuest.title} · ${lastQuest.description}` : "Aucune quête validée aujourd’hui."; el.musicSummary.textContent = pulseOn ? "Pulse épique en cours" : el.audio?.src ? "Musique locale chargée" : "Aucune musique choisie."; }
function syncCards() { $$(".coach-choice-card").forEach((card) => { const id = card.dataset.coachCard, input = card.querySelector('input[name="coach"]'); card.classList.toggle("active", input.checked); const img = card.querySelector("img"); if (img && coaches[id]) { safeCoachImage(img, id, "idle"); img.alt = coaches[id].fullName; } }); }
function selectCoach(id) { const input = $(`input[name="coach"][value="${id}"]`); if (input) input.checked = true; syncCards(); }
function heroSvg(currentStage) { return `<svg viewBox="0 0 320 430"><rect width="320" height="430" fill="#151722"/><circle cx="160" cy="190" r="${90 + currentStage * 10}" fill="#f0b84f" opacity=".${currentStage + 1}"/><ellipse cx="160" cy="386" rx="104" ry="20" fill="#f0b84f" opacity=".18"/><path d="M110 365 C120 230 200 230 210 365Z" fill="${currentStage >= 4 ? "#f0b84f" : currentStage >= 2 ? "#4f8ef0" : "#6f7688"}"/><circle cx="160" cy="125" r="45" fill="#d6b274"/><path d="M116 116 C122 62 198 62 204 116 C190 92 132 92 116 116Z" fill="#2b1b13"/><circle cx="145" cy="126" r="4"/><circle cx="175" cy="126" r="4"/><path d="M146 146 C153 152 167 152 174 146" stroke="#3b2419" stroke-width="4" fill="none"/><text x="160" y="38" fill="#f5f2e8" text-anchor="middle" font-size="18" font-weight="800">${rank(currentStage)}</text><text x="160" y="62" fill="#f0b84f" text-anchor="middle" font-size="14" font-weight="700">Stade ${currentStage}</text></svg>`; }
function startPulse() { stopPulse(); audioCtx = new (window.AudioContext || window.webkitAudioContext)(); pulseOn = true; let beat = 0; pulseTimer = setInterval(() => { const oscillator = audioCtx.createOscillator(), gain = audioCtx.createGain(); oscillator.frequency.value = beat++ % 4 ? 330 : 220; gain.gain.setValueAtTime(0.001, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.11, audioCtx.currentTime + 0.02); gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18); oscillator.connect(gain).connect(audioCtx.destination); oscillator.start(); oscillator.stop(audioCtx.currentTime + 0.2); }, 420); }
function stopPulse() { pulseOn = false; if (pulseTimer) clearInterval(pulseTimer); pulseTimer = null; if (audioCtx) audioCtx.close(); audioCtx = null; }

el.create.onclick = () => { const id = selectedCoach(); profile = { name: el.name.value.trim() || "Héros", avatar: el.avatar.value, coach: id, xp: 0, totalXp: 0, completedByDate: {}, streak: 0, lastActiveDate: null, log: [] }; currentView = "dashboard"; pose = "welcome"; log(`Aventure commencée avec ${coaches[id].name}.`); save(); render(); el.coachMsg.textContent = msg("start"); };
el.reset.onclick = () => { if (confirm("Réinitialiser tout le profil ?")) { stopPulse(); localStorage.removeItem(STORAGE_KEY); profile = null; currentView = "setup"; pose = "idle"; render(); } };
el.home.onclick = () => { currentView = "home"; pose = "welcome"; render(); };
el.cont.onclick = () => { currentView = "dashboard"; pose = "idle"; render(); };
el.newHero.onclick = () => { currentView = "setup"; render(); };
el.changeCoach.onclick = () => { currentView = "coach"; selectCoach(profile.coach); render(); };
el.saveCoach.onclick = () => { const id = selectedCoach(); profile.coach = id; pose = "welcome"; log(`Nouveau coach choisi : ${coaches[id].name}.`); save(); currentView = "home"; render(); };
el.cancel.onclick = () => { currentView = profile ? "home" : "setup"; render(); };
el.newMsg.onclick = () => { pose = "motivate"; el.coachMsg.textContent = msg("start"); render(); };
el.resetDaily.onclick = () => { setDone([]); log("Les quêtes du jour sont de nouveau ouvertes."); save(); render(); };
el.clearLog.onclick = () => { profile.log = []; save(); renderLog(); };
el.audioInput.onchange = (event) => { const file = event.target.files?.[0]; if (file) { stopPulse(); el.audio.src = URL.createObjectURL(file); el.audio.play(); summaries(); } };
el.pulse.onclick = () => { startPulse(); summaries(); };
el.stop.onclick = () => { stopPulse(); summaries(); };
el.openMusic.onclick = () => { currentView = "music"; render(); };
el.openQuests.onclick = () => { currentView = "quests"; render(); };
el.openBadges.onclick = () => { currentView = "badges"; render(); };
el.openWeek.onclick = () => { currentView = "week"; render(); };
$$(".back-dashboard-btn").forEach((button) => { button.onclick = () => { currentView = "dashboard"; render(); }; });
el.choice?.addEventListener("change", syncCards);
$$(".coach-choice-card").forEach((card) => { card.onclick = () => { card.querySelector('input[name="coach"]').checked = true; syncCards(); }; });

load();
syncCards();
render();
