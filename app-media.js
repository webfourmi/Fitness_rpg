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
