// ============================================================
// Fitness RPG - app-media.js
// Version V5-clean
// ------------------------------------------------------------
// Rôle de ce fichier :
// - gérer la musique locale ;
// - gérer la pulse épique ;
// - gérer l’affichage plein écran des images héros / coach.
//
// Règle importante :
// ce fichier ne contient aucune version.
// Il ne modifie jamais document.title.
// ============================================================

window.FitnessRpgMedia = {
  audioContext: null,
  pulseTimer: null,
  pulseActive: false,
  timerSoundContext: null
};

// ============================================================
// Helpers
// ============================================================

window.FitnessRpgMedia.setMusicStatus = function setMusicStatus(text) {
  window.FitnessRpgState.musicStatus = text || "Aucune musique choisie.";

  const status = document.querySelector("#musicStatus");
  if (status) status.textContent = window.FitnessRpgState.musicStatus;
};

window.FitnessRpgMedia.getAudioPlayer = function getAudioPlayer() {
  return document.querySelector("#audioPlayer");
};

// ============================================================
// Son de fin de timer
// ============================================================

window.FitnessRpgMedia.playTimerEndSound = function playTimerEndSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const notes = [
      { frequency: 660, start: 0 },
      { frequency: 880, start: 0.16 },
      { frequency: 1046, start: 0.32 }
    ];

    notes.forEach((note) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(note.frequency, now + note.start);

      gain.gain.setValueAtTime(0.001, now + note.start);
      gain.gain.exponentialRampToValueAtTime(0.18, now + note.start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.start + 0.14);

      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start(now + note.start);
      oscillator.stop(now + note.start + 0.16);
    });

    window.setTimeout(() => {
      ctx.close?.();
    }, 900);
  } catch {
    // Son non disponible : on ne bloque jamais l’application.
  }
};

// ============================================================
// Sons timer : décompte et départ
// ============================================================

window.FitnessRpgMedia.playTimerCountdownBeep = function playTimerCountdownBeep() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(520, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.14);

    window.setTimeout(() => {
      ctx.close?.();
    }, 300);
  } catch {
    // Son non disponible : on ne bloque jamais l’application.
  }
};

window.FitnessRpgMedia.playTimerStartSound = function playTimerStartSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const notes = [
      { frequency: 740, start: 0 },
      { frequency: 980, start: 0.12 }
    ];

    notes.forEach((note) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(note.frequency, now + note.start);

      gain.gain.setValueAtTime(0.001, now + note.start);
      gain.gain.exponentialRampToValueAtTime(0.16, now + note.start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.start + 0.16);

      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start(now + note.start);
      oscillator.stop(now + note.start + 0.18);
    });

    window.setTimeout(() => {
      ctx.close?.();
    }, 500);
  } catch {
    // Son non disponible : on ne bloque jamais l’application.
  }
};

// ============================================================
// Musique locale
// ============================================================

window.FitnessRpgMedia.handleAudioFile = async function handleAudioFile(event) {
  const file = event.target.files?.[0];
  const audio = window.FitnessRpgMedia.getAudioPlayer();

  if (!file || !audio) return;

  window.FitnessRpgMedia.stopPulse();

  const url = URL.createObjectURL(file);

  audio.src = url;
  audio.load();

  window.FitnessRpgMedia.setMusicStatus(`Morceau chargé : ${file.name}`);

  try {
    await audio.play();
    window.FitnessRpgMedia.setMusicStatus(`Lecture : ${file.name}`);
  } catch {
    window.FitnessRpgMedia.setMusicStatus(`Morceau chargé : ${file.name}. Appuie sur ▶ dans le lecteur.`);
  }
};

window.FitnessRpgMedia.updateAudioEvents = function updateAudioEvents() {
  const audio = window.FitnessRpgMedia.getAudioPlayer();

  if (!audio || audio.dataset.v5MediaReady === "true") return;

  audio.dataset.v5MediaReady = "true";

  audio.addEventListener("play", () => {
    window.FitnessRpgMedia.stopPulse();

    if (audio.src) {
      window.FitnessRpgMedia.setMusicStatus("Lecture audio en cours.");
    }
  });

  audio.addEventListener("pause", () => {
    if (audio.src) {
      window.FitnessRpgMedia.setMusicStatus("Audio en pause.");
    }
  });

  audio.addEventListener("ended", () => {
    window.FitnessRpgMedia.setMusicStatus("Morceau terminé.");
  });
};

// ============================================================
// Pulse épique
// ============================================================

window.FitnessRpgMedia.startPulse = async function startPulse() {
  window.FitnessRpgMedia.stopPulse();

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      alert("Le navigateur ne prend pas en charge l’audio Web.");
      return;
    }

    const audioContext = new AudioContextClass();

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    window.FitnessRpgMedia.audioContext = audioContext;
    window.FitnessRpgMedia.pulseActive = true;

    let beat = 0;

    window.FitnessRpgMedia.pulseTimer = window.setInterval(() => {
      if (!window.FitnessRpgMedia.audioContext) return;

      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = beat % 4 === 0 ? 220 : 330;

      gain.gain.setValueAtTime(0.001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, audioContext.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.22);

      oscillator.connect(gain).connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.24);

      beat += 1;
    }, 420);

    window.FitnessRpgMedia.setMusicStatus("Pulse épique en cours.");
  } catch {
    window.FitnessRpgMedia.setMusicStatus("Impossible de lancer la pulse épique.");
  }
};

window.FitnessRpgMedia.stopPulse = function stopPulse() {
  if (window.FitnessRpgMedia.pulseTimer) {
    window.clearInterval(window.FitnessRpgMedia.pulseTimer);
  }

  window.FitnessRpgMedia.pulseTimer = null;

  if (window.FitnessRpgMedia.audioContext) {
    window.FitnessRpgMedia.audioContext.close();
  }

  window.FitnessRpgMedia.audioContext = null;

  if (window.FitnessRpgMedia.pulseActive) {
    window.FitnessRpgMedia.setMusicStatus("Pulse arrêtée.");
  }

  window.FitnessRpgMedia.pulseActive = false;
};

// ============================================================
// Plein écran image
// ============================================================

window.FitnessRpgMedia.openImageOverlay = function openImageOverlay(src, title = "Image") {
  const overlay = document.querySelector("#imageOverlay");
  const img = document.querySelector("#imageOverlayImg");
  const label = document.querySelector("#imageOverlayTitle");

  if (!overlay || !img) return;

  img.src = src;
  img.alt = title;

  if (label) label.textContent = title;

  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
};

window.FitnessRpgMedia.closeImageOverlay = function closeImageOverlay() {
  const overlay = document.querySelector("#imageOverlay");
  const img = document.querySelector("#imageOverlayImg");

  if (!overlay) return;

  overlay.classList.add("hidden");
  overlay.setAttribute("aria-hidden", "true");

  if (img) img.src = "";
};

window.FitnessRpgMedia.openHeroImage = function openHeroImage() {
  const img = document.querySelector("#heroImage");

  if (!img?.src) return;

  const profile = window.FitnessRpgState.getProfile?.();
  const title = profile?.name || "Héros";

  window.FitnessRpgMedia.openImageOverlay(img.src, title);
};

window.FitnessRpgMedia.openCoachImage = function openCoachImage() {
  const img = document.querySelector("#coachImage");

  if (!img?.src) return;

  const coachId = window.FitnessRpgState.getCoachId?.() || "korvan";
  const coach = window.FitnessRpgData.getCoach(coachId);

  window.FitnessRpgMedia.openImageOverlay(img.src, coach.fullName || "Coach");
};

// ============================================================
// Clics
// ============================================================

window.FitnessRpgMedia.handleDocumentClick = function handleDocumentClick(event) {
  const target = event.target;

  if (target.closest("#pulseMusicButton")) {
    window.FitnessRpgMedia.startPulse();
    return;
  }

  if (target.closest("#stopMusicButton")) {
    window.FitnessRpgMedia.stopPulse();

    const audio = window.FitnessRpgMedia.getAudioPlayer();
    if (audio) audio.pause();

    window.FitnessRpgMedia.setMusicStatus("Musique arrêtée.");
    return;
  }

  if (target.closest("#heroImageFrame")) {
    window.FitnessRpgMedia.openHeroImage();
    return;
  }

  if (target.closest("#coachImage")) {
    window.FitnessRpgMedia.openCoachImage();
    return;
  }

  if (target.closest("#closeImageOverlayButton")) {
    window.FitnessRpgMedia.closeImageOverlay();
    return;
  }

  const overlay = target.closest("#imageOverlay");

  if (overlay && target.id === "imageOverlay") {
    window.FitnessRpgMedia.closeImageOverlay();
  }
};

window.FitnessRpgMedia.handleDocumentKeydown = function handleDocumentKeydown(event) {
  if (event.key === "Escape") {
    window.FitnessRpgMedia.closeImageOverlay();
  }
};

// ============================================================
// Initialisation
// ============================================================

window.FitnessRpgMedia.init = function initMedia() {
  const input = document.querySelector("#audioFileInput");

  if (input && input.dataset.v5MediaReady !== "true") {
    input.dataset.v5MediaReady = "true";
    input.addEventListener("change", window.FitnessRpgMedia.handleAudioFile);
  }

  window.FitnessRpgMedia.updateAudioEvents();

  document.addEventListener("click", window.FitnessRpgMedia.handleDocumentClick);
  document.addEventListener("keydown", window.FitnessRpgMedia.handleDocumentKeydown);
};

// ============================================================
// Patch programme : Champion des Arènes
// ------------------------------------------------------------
// Objectif : afficher les répétitions par exercice, pas les totaux
// cumulés des cycles. Progression : 10 / 14 / 16 / 20 max.
// ============================================================

(function patchChampionArenesRepetitions() {
  const detail = window.FitnessRpgData?.programDetails?.["champion-arenes"];

  if (!detail) return;

  const normalRepExercises = new Set([
    "goblet_squat",
    "bench_press",
    "resistance_band_row",
    "kettlebell_swing",
    "kettlebell_military_press",
    "kettlebell_deadlift",
    "walking_lunges",
    "face_pull",
    "calf_raises",
    "bird_dog",
    "superman"
  ]);

  const lowRepExercises = new Set([
    "assisted_pullups",
    "pullups_clean_max",
    "turkish_get_up"
  ]);

  const timedExercises = new Set([
    "core",
    "side_plank"
  ]);

  const repsByWeek = {
    1: 10,
    2: 14,
    3: 16,
    4: 20
  };

  const lowRepsByWeek = {
    1: 5,
    2: 6,
    3: 8,
    4: 10
  };

  const secondsByWeek = {
    1: 30,
    2: 40,
    3: 50,
    4: 60
  };

  function patchExercise(item, weekNumber) {
    if (!item || !item.exerciseId) return;

    const week = Number(weekNumber || 1);

    if (item.unit === "répétitions" && normalRepExercises.has(item.exerciseId)) {
      item.amount = repsByWeek[week] || item.amount;
      return;
    }

    if (item.unit === "répétitions" && lowRepExercises.has(item.exerciseId)) {
      item.amount = lowRepsByWeek[week] || item.amount;
      return;
    }

    if (item.unit === "sec" && timedExercises.has(item.exerciseId)) {
      item.amount = secondsByWeek[week] || item.amount;
    }
  }

  function patchExerciseList(exercises, weekNumber) {
    if (!Array.isArray(exercises)) return;

    exercises.forEach((item) => patchExercise(item, weekNumber));
  }

  (detail.weeks || []).forEach((week) => {
    const weekNumber = Number(week.week || 1);

    if (weekNumber === 2) {
      week.progression = "On augmente progressivement les répétitions affichées par exercice : 14 répétitions max, sans afficher les totaux de cycles.";
    }

    if (weekNumber === 3) {
      week.progression = "Le programme devient plus dense : 16 répétitions max par exercice, tractions propres et sac de frappe plus présent.";
    }

    if (weekNumber === 4) {
      week.progression = "Dernière semaine : 20 répétitions maximum par exercice, puis technique et combat.";
    }

    (week.days || []).forEach((day) => {
      patchExerciseList(day.exercises, weekNumber);
    });
  });

  (detail.bosses || []).forEach((boss) => {
    const weekNumber = Number(boss.week || 1);

    patchExerciseList(boss.exercises, weekNumber);

    Object.values(boss.variants || {}).forEach((variant) => {
      patchExerciseList(variant.exercises, weekNumber);
    });
  });

  detail.progression = [
    "Semaine 1 : Entrée dans l’Arène · 10 répétitions par exercice pour installer la technique.",
    "Semaine 2 : La Corne du Minotaure · 14 répétitions max par exercice, sans total de cycles.",
    "Semaine 3 : Le Fer et la Cendre · 16 répétitions max par exercice, tractions propres et sac plus long.",
    "Semaine 4 : Champion des Arènes · 20 répétitions maximum par exercice, technique et combat.",
    "Chaque séance utilise l’échauffement standard de 5 min et le retour au calme standard de 5 min.",
    "Chaque semaine propose un boss intérieur et une version extérieure à vélo.",
    "Récompense finale : badge légendaire Champion des Arènes, coffre épique et +250 XP."
  ];

  detail.notes = [
    "Programme avancé : réservé aux joueurs déjà à l’aise avec les mouvements de base.",
    "Choisir des charges permettant de garder une technique propre.",
    "Progression des répétitions : 10 en semaine 1, 14 en semaine 2, 16 en semaine 3, 20 maximum en semaine 4.",
    "Les valeurs affichées sont les répétitions d’un exercice sur un passage, pas le total cumulé des cycles.",
    "Tractions et Turkish Get-Up restent volontairement plus bas : 5, 6, 8 puis 10 répétitions maximum.",
    "Pour les tractions max propre : arrêter dès que la posture se dégrade.",
    "Pour le Turkish Get-Up : privilégier une charge légère et un mouvement lent."
  ];
})();
