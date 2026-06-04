function initMusicPulseFix() {
  if (window.__musicPulseFixReady) return;
  window.__musicPulseFixReady = true;

  const pulseButton = document.querySelector("#pulseMusicBtn");
  const stopButton = document.querySelector("#stopPulseBtn");
  const summary = document.querySelector("#currentMusicSummary");

  if (!pulseButton || !stopButton) return;

  const oldStopPulse = typeof window.stopPulse === "function" ? window.stopPulse : null;

  let ctx = null;
  let timer = null;
  let beat = 0;
  let isPlaying = false;

  function setStatus(text) {
    if (summary) summary.textContent = text;
    if (typeof musicStatus !== "undefined") {
      try { musicStatus = text; } catch {}
    }
  }

  function makeContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      setStatus("Audio non compatible avec ce navigateur.");
      return null;
    }

    if (!ctx || ctx.state === "closed") {
      ctx = new AudioContextClass();
    }

    return ctx;
  }

  function playBeat(strong = false) {
    if (!ctx) return;

    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(strong ? 0.32 : 0.22, now + 0.015);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    master.connect(ctx.destination);

    const low = ctx.createOscillator();
    low.type = "triangle";
    low.frequency.setValueAtTime(strong ? 150 : 220, now);
    low.frequency.exponentialRampToValueAtTime(strong ? 70 : 120, now + 0.16);
    low.connect(master);
    low.start(now);
    low.stop(now + 0.2);

    const click = ctx.createOscillator();
    const clickGain = ctx.createGain();
    click.type = "square";
    click.frequency.setValueAtTime(strong ? 880 : 660, now);
    clickGain.gain.setValueAtTime(0.0001, now);
    clickGain.gain.exponentialRampToValueAtTime(strong ? 0.12 : 0.08, now + 0.01);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    click.connect(clickGain).connect(ctx.destination);
    click.start(now);
    click.stop(now + 0.09);
  }

  async function startFixedPulse() {
    try {
      if (oldStopPulse) oldStopPulse();
    } catch {}

    if (isPlaying) return;

    ctx = makeContext();
    if (!ctx) return;

    try {
      if (ctx.state === "suspended") await ctx.resume();
    } catch (error) {
      setStatus("Audio bloqué : touche encore une fois le bouton Pulse épique.");
      return;
    }

    if (ctx.state !== "running") {
      setStatus("Audio bloqué par le navigateur. Retouche Pulse épique.");
      return;
    }

    isPlaying = true;
    beat = 0;
    pulseButton.textContent = "Pulse en cours";
    setStatus("Pulse épique en cours");

    playBeat(true);
    timer = window.setInterval(() => {
      beat += 1;
      playBeat(beat % 4 === 0);
    }, 420);
  }

  function stopFixedPulse() {
    if (timer) window.clearInterval(timer);
    timer = null;
    isPlaying = false;
    pulseButton.textContent = "Pulse épique";
    setStatus("Pulse arrêtée");
  }

  pulseButton.onclick = startFixedPulse;
  stopButton.onclick = stopFixedPulse;

  window.startFixedPulse = startFixedPulse;
  window.stopFixedPulse = stopFixedPulse;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMusicPulseFix);
} else {
  initMusicPulseFix();
}
