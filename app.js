
const APP_VERSION = "0.1.1";
const STORAGE_KEY = "sportRpgV1Profile";
const LOG_LIMIT = 12;

const avatarLabels = {
  homme20: "Homme · 20 ans",
  femme20: "Femme · 20 ans",
  homme50: "Homme · 50 ans",
  femme50: "Femme · 50 ans",
};

const stageLabels = [
  { min: 30, label: "Héros confirmé", stage: 5 },
  { min: 20, label: "Athlétique", stage: 4 },
  { min: 10, label: "Sportif régulier", stage: 3 },
  { min: 5, label: "Mise en forme", stage: 2 },
  { min: 1, label: "Débutant", stage: 1 },
];

const quests = [
  { id: "warmup", title: "Échauffement", description: "5 min de mobilité douce", xp: 10, stat: "Discipline" },
  { id: "walk", title: "Marche active", description: "30 min dehors ou tapis", xp: 35, stat: "Endurance" },
  { id: "bike", title: "Vélo", description: "20 min à rythme confortable", xp: 35, stat: "Cardio" },
  { id: "squats", title: "Squats", description: "3 séries de 10 répétitions", xp: 25, stat: "Force" },
  { id: "core", title: "Gainage", description: "3 x 30 secondes", xp: 25, stat: "Stabilité" },
  { id: "stretch", title: "Étirements", description: "10 min de récupération", xp: 15, stat: "Souplesse" },
];

const coaches = {
  korvan: {
    name: "Korvan",
    fullName: "Coach Korvan le Barbare",
    image: "assets/coaches/korvan-sheet.png",
    intro: "Barbare motivant, direct et énergique.",
    start: [
      "Debout. Le corps ne devient pas fort en négociant avec le canapé.",
      "Aujourd’hui, tu gagnes ta ration de gloire.",
      "Les muscles dorment. Réveille-les.",
      "Une quête t’attend. Elle ne va pas transpirer à ta place.",
    ],
    byQuest: {
      warmup: [
        "Échauffe-toi. Même une hache doit être levée avant la bataille.",
        "Prépare les muscles. Le combat commence avant le premier coup."
      ],
      walk: [
        "Marche. Chaque pas écrase un peu plus l’ancien toi.",
        "La route ne récompense pas ceux qui restent assis."
      ],
      bike: [
        "Pédale. Que tes jambes deviennent des roues de guerre.",
        "Encore un tour. Le souffle forge l’endurance."
      ],
      squats: [
        "Plie les jambes. Le sol doit comprendre qui commande.",
        "Descends, remonte. Voilà comment on négocie avec la gravité."
      ],
      core: [
        "Tiens. Un tronc solide porte mieux la légende.",
        "Ne tremble pas. Ou tremble, mais reste en place."
      ],
      stretch: [
        "Étire-toi. Même les guerriers doivent entretenir leurs chaînes.",
        "La récupération n’est pas une faiblesse. C’est l’affûtage de la lame."
      ],
    },
    complete: [
      "Quête accomplie. Tu n’es pas venu pour rien.",
      "La faiblesse recule d’un pas. Continue.",
      "Ta sueur paie son tribut à la légende.",
      "Tu as vaincu l’inertie. C’est déjà un monstre respectable.",
    ],
    levelUp: [
      "Niveau supérieur. Ton nom mérite une ligne de plus dans la saga.",
      "Ton corps se renforce. Les ennemis prennent des notes.",
      "Voilà. Le héros avance, et le canapé tremble.",
    ],
  },
  xara: {
    name: "Xara",
    fullName: "Coach Xara la Guerrière",
    image: "assets/coaches/xara-sheet.png",
    intro: "Guerrière disciplinée et déterminée.",
    start: [
      "Allez, guerrier. On commence proprement, on finit fièrement.",
      "Pas besoin d’être parfait. Besoin d’être présent.",
      "Aujourd’hui, on travaille la force et la volonté.",
      "Garde le rythme. La victoire adore les gens réguliers.",
    ],
    byQuest: {
      warmup: [
        "On prépare le terrain. Une bonne guerrière ne charge pas à froid.",
        "Mobilité d’abord. La précision commence ici."
      ],
      walk: [
        "Garde l’allure. La régularité gagne plus de combats que l’orgueil.",
        "Chaque pas compte. Même les grandes victoires avancent à pied."
      ],
      bike: [
        "Trouve ton rythme. Respiration stable, jambes efficaces.",
        "Pédale proprement. La vitesse vient après le contrôle."
      ],
      squats: [
        "Dos solide, jambes actives. C’est une fondation, pas une punition.",
        "Encore une répétition. C’est là que tu construis ton appui."
      ],
      core: [
        "Tiens la position. Le combat se gagne aussi dans l’immobilité.",
        "Respire. Reste stable. Tu es plus solide que tu ne le crois."
      ],
      stretch: [
        "Récupère avec sérieux. La souplesse protège le guerrier.",
        "On relâche les tensions. Demain dépend aussi de cette minute."
      ],
    },
    complete: [
      "Bien joué. Ton futur toi vient d’applaudir.",
      "Tu as tenu. C’est comme ça qu’on construit une légende.",
      "Quête validée. Repos mérité, abandon interdit.",
      "Tu contrôles ton souffle, tu contrôles le combat.",
    ],
    levelUp: [
      "Niveau supérieur ! Tu avances avec panache.",
      "Nouvelle étape franchie. Ta discipline commence à se voir.",
      "Tu progresses. Et cette fois, tout le monde l’a remarqué.",
    ],
  },
  violette: {
    name: "Violette",
    fullName: "Coach Violette la Halfeline",
    image: "assets/coaches/violette-sheet.png",
    intro: "Halfeline positive, légère et encourageante.",
    start: [
      "On y va doucement, mais on y va vraiment !",
      "Petit pas, grand progrès. Aujourd’hui, on avance.",
      "Même une courte séance peut être une belle victoire.",
      "Prêt ? On transforme l’effort en aventure.",
    ],
    byQuest: {
      warmup: [
        "On réveille doucement la machine. Pas besoin de bousculer le dragon.",
        "Petit échauffement, grande différence. C’est parti."
      ],
      walk: [
        "Une bonne marche, c’est une aventure qui a mis de bonnes chaussures.",
        "Pas après pas. Tu avances, et c’est déjà énorme."
      ],
      bike: [
        "Pédale tranquille, héros. Le vent fait le reste.",
        "Tes jambes tournent, ton XP monte. Belle affaire !"
      ],
      squats: [
        "Hop, on descend, on remonte. Comme chercher une pièce sous la table.",
        "Tes jambes travaillent dur. Elles mériteront une ovation miniature."
      ],
      core: [
        "Tiens bon ! Même les halfelins savent devenir des statues.",
        "Ça tremble ? Parfait, ça veut dire que ça travaille."
      ],
      stretch: [
        "On s’étire, on respire, on remet le corps en mode velours.",
        "La récupération, c’est le petit coussin secret des héros réguliers."
      ],
    },
    complete: [
      "Bravo ! Une quête de plus dans la besace.",
      "Tu avances mieux que tu ne le crois, continue !",
      "C’était propre, régulier et très bien joué.",
      "Une petite victoire aujourd’hui, une grande forme demain.",
    ],
    levelUp: [
      "Niveau supérieur ! Ça mérite presque un second petit déjeuner.",
      "Tu montes en puissance, et ça se voit déjà !",
      "Quel progrès ! Tu deviens vraiment impressionnant.",
    ],
  },
  elmin: {
    name: "Elmin",
    fullName: "Coach Elmin le Mage",
    image: "assets/coaches/elmin-sheet.png",
    intro: "Mage calme, posé et stratégique.",
    start: [
      "Concentre-toi. Chaque répétition est un sort bien exécuté.",
      "La régularité est une magie discrète, mais puissante.",
      "Aujourd’hui, nous renforçons le corps avec méthode.",
      "Le progrès n’est pas bruyant. Il est constant.",
    ],
    byQuest: {
      warmup: [
        "Échauffement lancé. Le rituel commence par la préparation.",
        "Chaque articulation réveillée réduit le chaos de l’effort."
      ],
      walk: [
        "La marche est une magie ancienne : simple, lente, efficace.",
        "Continue. Les grands trajets sont faits de petites décisions répétées."
      ],
      bike: [
        "Cadence stable. L’endurance répond bien aux cycles réguliers.",
        "Pédale avec méthode. Le souffle est ton métronome."
      ],
      squats: [
        "Contrôle la descente, maîtrise la remontée. Très bon exercice de pouvoir.",
        "Les jambes sont les piliers du temple. Renforçons-les."
      ],
      core: [
        "Reste immobile. La stabilité est une forme de puissance silencieuse.",
        "Respiration calme, centre solide. Le sort tient."
      ],
      stretch: [
        "La souplesse est une magie lente. Ne la brusque pas.",
        "Étire sans forcer. Le corps apprend mieux quand on ne le menace pas."
      ],
    },
    complete: [
      "Excellent. L’effort a été canalisé avec précision.",
      "Très bien. Tu gagnes en maîtrise autant qu’en force.",
      "Quête validée. L’énergie a été investie judicieusement.",
      "Le corps apprend vite quand l’esprit reste stable.",
    ],
    levelUp: [
      "Niveau supérieur. Les résultats suivent la discipline.",
      "Ta progression devient visible. Continue sur cette voie.",
      "Une étape de plus. Le rituel du progrès fonctionne.",
    ],
  },
};

let profile = null;
let currentView = "setup"; // setup | home | dashboard | coach
let audioContext = null;
let pulseTimer = null;
let pulseOscillator = null;

const el = {
  setupPanel: document.querySelector("#setupPanel"),
  dashboard: document.querySelector("#dashboard"),
  appVersionLabel: document.querySelector("#appVersionLabel"),
  playerNameInput: document.querySelector("#playerNameInput"),
  avatarSelect: document.querySelector("#avatarSelect"),
  createProfileBtn: document.querySelector("#createProfileBtn"),
  resetProfileBtn: document.querySelector("#resetProfileBtn"),
  homeBtn: document.querySelector("#homeBtn"),
  continueProfileBtn: document.querySelector("#continueProfileBtn"),
  heroPortrait: document.querySelector("#heroPortrait"),
  heroName: document.querySelector("#heroName"),
  avatarLabel: document.querySelector("#avatarLabel"),
  rankLabel: document.querySelector("#rankLabel"),
  levelLabel: document.querySelector("#levelLabel"),
  xpLabel: document.querySelector("#xpLabel"),
  xpBar: document.querySelector("#xpBar"),
  totalXpLabel: document.querySelector("#totalXpLabel"),
  streakLabel: document.querySelector("#streakLabel"),
  doneTodayLabel: document.querySelector("#doneTodayLabel"),
  coachName: document.querySelector("#coachName"),
  coachPortrait: document.querySelector("#coachPortrait"),
  coachMessage: document.querySelector("#coachMessage"),
  newCoachMessageBtn: document.querySelector("#newCoachMessageBtn"),
  questsList: document.querySelector("#questsList"),
  resetDailyBtn: document.querySelector("#resetDailyBtn"),
  logList: document.querySelector("#logList"),
  clearLogBtn: document.querySelector("#clearLogBtn"),
  audioFileInput: document.querySelector("#audioFileInput"),
  audioPlayer: document.querySelector("#audioPlayer"),
  pulseMusicBtn: document.querySelector("#pulseMusicBtn"),
  stopPulseBtn: document.querySelector("#stopPulseBtn"),
  coachChoiceGrid: document.querySelector("#coachChoiceGrid"),
  homePanel: document.querySelector("#homePanel"),
  editorPanel: document.querySelector("#editorPanel"),
  heroCreationFields: document.querySelector("#heroCreationFields"),
  homeHeroSummary: document.querySelector("#homeHeroSummary"),
  homeCoachSummary: document.querySelector("#homeCoachSummary"),
  setupTitle: document.querySelector("#setupTitle"),
  setupHelp: document.querySelector("#setupHelp"),
  appVersionLabel: document.querySelector("#appVersionLabel"),
  appVersionLabelEditor: document.querySelector("#appVersionLabelEditor"),
  continueProfileBtn: document.querySelector("#continueProfileBtn"),
  changeCoachBtn: document.querySelector("#changeCoachBtn"),
  startCreateHeroBtn: document.querySelector("#startCreateHeroBtn"),
  saveCoachBtn: document.querySelector("#saveCoachBtn"),
  cancelSetupBtn: document.querySelector("#cancelSetupBtn"),
  
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function createDefaultProfile(name, avatar, coach) {
  return {
    name,
    avatar,
    coach,
    xp: 0,
    totalXp: 0,
    completedByDate: {},
    streak: 0,
    lastActiveDate: null,
    log: [],
  };
}

function loadProfile() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    profile = saved ? JSON.parse(saved) : null;
    currentView = profile ? "home" : "setup";
  } catch {
    profile = null;
    currentView = "setup";
  }
}

function saveProfile() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function xpNeededForLevel(level) {
  return 100 + (level - 1) * 25;
}

function getLevelInfo(totalXp) {
  let level = 1;
  let remaining = totalXp;
  while (remaining >= xpNeededForLevel(level)) {
    remaining -= xpNeededForLevel(level);
    level += 1;
  }
  return {
    level,
    currentXp: remaining,
    nextXp: xpNeededForLevel(level),
  };
}

function getStage(level) {
  return stageLabels.find((stage) => level >= stage.min) ?? stageLabels.at(-1);
}

function getSelectedCoachId() {
  const checked = document.querySelector('input[name="coach"]:checked');
  return checked?.value ?? "korvan";
}
function selectCoach(coachId) {
  const input = document.querySelector(`input[name="coach"][value="${coachId}"]`);
  if (input) {
    input.checked = true;
  }
  syncCoachChoiceCards();
}

function randomCoachMessage(moment) {
  const coach = coaches[profile.coach];
  const list = coach[moment] ?? coach.start;
  return list[Math.floor(Math.random() * list.length)];
}
function randomQuestMessage(questId) {
  const coach = coaches[profile.coach];
  const questMessages = coach.byQuest?.[questId];

  if (questMessages && questMessages.length > 0) {
    return questMessages[Math.floor(Math.random() * questMessages.length)];
  }

  return randomCoachMessage("complete");
}
function addLog(text) {
  const time = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  profile.log.unshift(`${time} · ${text}`);
  profile.log = profile.log.slice(0, LOG_LIMIT);
}

function getCompletedToday() {
  return profile.completedByDate[todayKey()] ?? [];
}

function setCompletedToday(list) {
  profile.completedByDate[todayKey()] = list;
}

function updateStreak() {
  const today = todayKey();
  if (profile.lastActiveDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  profile.streak = profile.lastActiveDate === yesterdayKey ? profile.streak + 1 : 1;
  profile.lastActiveDate = today;
}

function completeQuest(questId) {
  const quest = quests.find((item) => item.id === questId);
  if (!quest) return;

  const completed = getCompletedToday();
  if (completed.includes(questId)) return;

  const oldLevel = getLevelInfo(profile.totalXp).level;

  completed.push(questId);
  setCompletedToday(completed);
  updateStreak();
  profile.totalXp += quest.xp;
  profile.xp += quest.xp;

  const newLevel = getLevelInfo(profile.totalXp).level;
  addLog(`+${quest.xp} XP · ${quest.title}`);

  if (newLevel > oldLevel) {
    const message = randomCoachMessage("levelUp");
    addLog(`Niveau ${newLevel} atteint !`);
    el.coachMessage.textContent = message;
    el.heroPortrait.classList.remove("level-up-flash");
    void el.heroPortrait.offsetWidth;
    el.heroPortrait.classList.add("level-up-flash");
  } else {
    el.coachMessage.textContent = randomQuestMessage(quest.id);
  }

  saveProfile();
  render();
}

function render() {
  const hasProfile = Boolean(profile);
  const isDashboard = hasProfile && currentView === "dashboard";

  if (el.appVersionLabel) el.appVersionLabel.textContent = APP_VERSION;
  if (el.appVersionLabelEditor) el.appVersionLabelEditor.textContent = APP_VERSION;

  el.homeBtn.classList.toggle("hidden", !isDashboard);

  if (!isDashboard) {
    el.setupPanel.classList.remove("hidden");
    el.dashboard.classList.add("hidden");

    const isHome = hasProfile && currentView === "home";
    const isCoachChange = hasProfile && currentView === "coach";
    const isSetup = !hasProfile || currentView === "setup";

    el.homePanel.classList.toggle("hidden", !isHome);
    el.editorPanel.classList.toggle("hidden", isHome);

    if (isHome) {
      const levelInfo = getLevelInfo(profile.totalXp);
      const coach = coaches[profile.coach];

      el.homeHeroSummary.textContent =
        `${profile.name} · ${avatarLabels[profile.avatar]} · Niveau ${levelInfo.level} · ${profile.totalXp} XP`;

      el.homeCoachSummary.textContent =
        `Coach actuel : ${coach.fullName}`;

      return;
    }

    el.heroCreationFields.classList.toggle("hidden", isCoachChange);
    el.createProfileBtn.classList.toggle("hidden", isCoachChange);
    el.saveCoachBtn.classList.toggle("hidden", !isCoachChange);
    el.cancelSetupBtn.classList.toggle("hidden", !hasProfile);

    if (isCoachChange) {
      el.setupTitle.textContent = "Changer de coach";
      el.setupHelp.textContent = "Choisis un nouveau coach. Ton XP et ton niveau seront conservés.";
      selectCoach(profile.coach);
    } else if (isSetup) {
      el.setupTitle.textContent = "Créer ton héros";
      el.setupHelp.textContent = "Choisis ton avatar et ton coach pour commencer.";
    }

    syncCoachChoiceCards();
    return;
  }

  el.setupPanel.classList.add("hidden");
  el.dashboard.classList.remove("hidden");

  const levelInfo = getLevelInfo(profile.totalXp);
  const stage = getStage(levelInfo.level);
  const completed = getCompletedToday();
  const percent = Math.min(100, Math.round((levelInfo.currentXp / levelInfo.nextXp) * 100));
  const coach = coaches[profile.coach];

  el.heroName.textContent = profile.name;
  el.avatarLabel.textContent = avatarLabels[profile.avatar];
  el.rankLabel.textContent = `${stage.label} · stade ${stage.stage}`;
  el.levelLabel.textContent = `Niveau ${levelInfo.level}`;
  el.xpLabel.textContent = `${levelInfo.currentXp} / ${levelInfo.nextXp} XP`;
  el.xpBar.style.width = `${percent}%`;
  el.totalXpLabel.textContent = profile.totalXp;
  el.streakLabel.textContent = profile.streak;
  el.doneTodayLabel.textContent = completed.length;
  el.coachName.textContent = coach.fullName;
  el.coachPortrait.src = coach.image;
  el.coachPortrait.alt = coach.fullName;
  el.heroPortrait.innerHTML = getHeroSvg(profile.avatar, stage.stage);

  renderQuests(completed);
  renderLog();
}

function renderQuests(completed) {
  el.questsList.innerHTML = "";

  quests.forEach((quest) => {
    const isDone = completed.includes(quest.id);
    const item = document.createElement("article");
    item.className = `quest-item${isDone ? " done" : ""}`;
    item.innerHTML = `
      <div class="quest-title-row">
        <strong>${quest.title}</strong>
        <span class="quest-xp">+${quest.xp} XP</span>
      </div>
      <p class="quest-meta">${quest.description}</p>
      <p class="quest-meta">Stat : ${quest.stat}</p>
      <button class="${isDone ? "ghost-btn" : "primary-btn"}" type="button" ${isDone ? "disabled" : ""}>
        ${isDone ? "Déjà accomplie" : "Valider la quête"}
      </button>
    `;
    item.querySelector("button").addEventListener("click", () => completeQuest(quest.id));
    el.questsList.appendChild(item);
  });
}

function renderLog() {
  el.logList.innerHTML = "";
  const logs = profile.log.length ? profile.log : ["Aucune quête accomplie pour l’instant."];
  logs.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    el.logList.appendChild(li);
  });
}

function syncCoachChoiceCards() {
  document.querySelectorAll(".coach-choice-card").forEach((card) => {
    const coachId = card.dataset.coachCard;
    const input = card.querySelector('input[name="coach"]');
    card.classList.toggle("active", input.checked);
    if (coaches[coachId]) {
      const img = card.querySelector("img");
      img.src = coaches[coachId].image;
      img.alt = `Planche du coach ${coaches[coachId].name}`;
    }
  });
}

function getHeroSvg(avatar, stage) {
  const isWoman = avatar.includes("femme");
  const isSenior = avatar.includes("50");
  const hair = isSenior ? "#c7c7c7" : isWoman ? "#4b2b1c" : "#2b1b13";
  const suit = stage >= 4 ? "#f0b84f" : stage >= 2 ? "#4f8ef0" : "#6f7688";
  const auraOpacity = 0.08 + stage * 0.07;
  const weapon = stage >= 4 ? "block" : "none";
  const cape = stage >= 3 ? "block" : "none";
  const glow = stage >= 5 ? "block" : "none";
  const torsoWidth = isWoman ? 82 : 96;
  const shoulderY = isSenior ? 178 : 170;
  const title = stageLabels.find((item) => item.stage === stage)?.label ?? "Héros";

  return `
    <svg viewBox="0 0 320 430" role="img" aria-label="${avatarLabels[avatar]} stade ${stage}">
      <defs>
        <radialGradient id="aura" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stop-color="#f0b84f" stop-opacity="${auraOpacity}" />
          <stop offset="100%" stop-color="#f0b84f" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="floor" x1="0" x2="1">
          <stop offset="0" stop-color="#9be07d" stop-opacity="0.12" />
          <stop offset="1" stop-color="#f0b84f" stop-opacity="0.18" />
        </linearGradient>
      </defs>
      <rect width="320" height="430" fill="#151722" />
      <circle cx="160" cy="190" r="150" fill="url(#aura)" />
      <g display="${glow}" opacity="0.85">
        <path d="M160 25 L170 62 L207 50 L187 83 L220 102 L181 108 L184 148 L160 116 L136 148 L139 108 L100 102 L133 83 L113 50 L150 62 Z" fill="#f0b84f" opacity="0.25" />
      </g>
      <ellipse cx="160" cy="386" rx="104" ry="20" fill="url(#floor)" />
      <g display="${cape}" opacity="0.9">
        <path d="M112 ${shoulderY} C78 225 75 315 96 382 C130 360 190 360 224 382 C245 315 242 225 208 ${shoulderY} Z" fill="#402239" />
      </g>
      <g display="${weapon}">
        <path d="M238 122 L247 121 L230 310 L220 310 Z" fill="#d9dde8" />
        <path d="M216 302 L238 302 L238 320 L216 320 Z" fill="#8a5a2d" />
      </g>
      <path d="M${160 - torsoWidth / 2} ${shoulderY} C${130 - stage * 2} 230 ${130 - stage * 2} 312 118 366 L202 366 C${190 + stage * 2} 312 ${190 + stage * 2} 230 ${160 + torsoWidth / 2} ${shoulderY} Z" fill="${suit}" />
      <path d="M122 ${shoulderY + 20} C88 225 88 280 105 320" stroke="#d6b274" stroke-width="${12 + stage}" stroke-linecap="round" fill="none" />
      <path d="M198 ${shoulderY + 20} C232 225 232 280 215 320" stroke="#d6b274" stroke-width="${12 + stage}" stroke-linecap="round" fill="none" />
      <path d="M136 366 L128 410" stroke="#30384a" stroke-width="22" stroke-linecap="round" />
      <path d="M184 366 L192 410" stroke="#30384a" stroke-width="22" stroke-linecap="round" />
      <circle cx="160" cy="122" r="45" fill="#d6b274" />
      <path d="M116 116 C122 62 198 62 204 116 C190 92 132 92 116 116 Z" fill="${hair}" />
      <path d="M122 111 C136 84 184 84 198 111 C187 101 133 101 122 111 Z" fill="${hair}" opacity="0.9" />
      <circle cx="145" cy="126" r="4" fill="#191919" />
      <circle cx="175" cy="126" r="4" fill="#191919" />
      <path d="M146 146 C153 152 167 152 174 146" stroke="#3b2419" stroke-width="4" stroke-linecap="round" fill="none" />
      <path d="M116 168 C136 188 184 188 204 168" stroke="#ffffff" stroke-opacity="0.23" stroke-width="3" fill="none" />
      <text x="160" y="38" fill="#f5f2e8" text-anchor="middle" font-size="18" font-weight="800">${title}</text>
      <text x="160" y="62" fill="#f0b84f" text-anchor="middle" font-size="14" font-weight="700">Stade ${stage}</text>
    </svg>
  `;
}

function startGeneratedPulse() {
  stopGeneratedPulse();
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  let beat = 0;
  pulseTimer = setInterval(() => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = beat % 4 === 0 ? 220 : 330;
    gain.gain.setValueAtTime(0.001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.11, audioContext.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.18);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
    pulseOscillator = oscillator;
    beat += 1;
  }, 420);
}

function stopGeneratedPulse() {
  if (pulseTimer) {
    clearInterval(pulseTimer);
    pulseTimer = null;
  }
  if (pulseOscillator) {
    try { pulseOscillator.stop(); } catch {}
    pulseOscillator = null;
  }
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}

el.createProfileBtn.addEventListener("click", () => {
  const name = el.playerNameInput.value.trim() || "Héros";
  const coachId = getSelectedCoachId();
  profile = createDefaultProfile(name, el.avatarSelect.value, coachId);
  currentView = "dashboard";
  profile.log.push(`${new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} · Aventure commencée avec ${coaches[coachId].name}.`);
  saveProfile();
  render();
  el.coachMessage.textContent = randomCoachMessage("start");
});

el.resetProfileBtn.addEventListener("click", () => {
  const ok = confirm("Réinitialiser tout le profil ?");
  if (!ok) return;
  stopGeneratedPulse();
  localStorage.removeItem(STORAGE_KEY);
  profile = null;
  render();
});

el.newCoachMessageBtn.addEventListener("click", () => {
  if (!profile) return;
  el.coachMessage.textContent = randomCoachMessage("start");
});

el.resetDailyBtn.addEventListener("click", () => {
  if (!profile) return;
  setCompletedToday([]);
  addLog("Les quêtes du jour sont de nouveau ouvertes.");
  saveProfile();
  render();
});

el.clearLogBtn.addEventListener("click", () => {
  if (!profile) return;
  profile.log = [];
  saveProfile();
  renderLog();
});

el.audioFileInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  stopGeneratedPulse();
  const url = URL.createObjectURL(file);
  el.audioPlayer.src = url;
  el.audioPlayer.play();
});

el.pulseMusicBtn.addEventListener("click", startGeneratedPulse);
el.stopPulseBtn.addEventListener("click", stopGeneratedPulse);

el.coachChoiceGrid?.addEventListener("change", (event) => {
  if (event.target.matches('input[name="coach"]')) {
    syncCoachChoiceCards();
  }
});
el.homeBtn.addEventListener("click", () => {
  currentView = "home";
  render();
});

el.continueProfileBtn.addEventListener("click", () => {
  currentView = "dashboard";
  render();
});
el.continueProfileBtn.addEventListener("click", () => {
  currentView = "dashboard";
  render();
});

el.startCreateHeroBtn.addEventListener("click", () => {
  currentView = "setup";
  render();
});

el.changeCoachBtn.addEventListener("click", () => {
  currentView = "coach";
  selectCoach(profile.coach);
  render();
});

el.saveCoachBtn.addEventListener("click", () => {
  if (!profile) return;

  const coachId = getSelectedCoachId();
  profile.coach = coachId;
  addLog(`Nouveau coach choisi : ${coaches[coachId].name}.`);
  saveProfile();

  currentView = "home";
  render();
});

el.cancelSetupBtn.addEventListener("click", () => {
  currentView = profile ? "home" : "setup";
  render();
});

document.querySelectorAll('.coach-choice-card').forEach((card) => {
  card.addEventListener('click', () => {
    const input = card.querySelector('input[name="coach"]');
    input.checked = true;
    syncCoachChoiceCards();
  });
});

loadProfile();
syncCoachChoiceCards();
render();
