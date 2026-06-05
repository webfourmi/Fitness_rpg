function initMobileMusicFix() {
  if (window.__mobileMusicFixReady) return;
  window.__mobileMusicFixReady = true;

  function setStatus(text) {
    const summary = document.querySelector("#currentMusicSummary");
    if (summary) summary.textContent = text;
    try {
      if (typeof musicStatus !== "undefined") musicStatus = text;
    } catch {}
  }

  function ensurePicker() {
    const controls = document.querySelector(".music-controls");
    const input = document.querySelector("#audioFileInput");
    const audio = document.querySelector("#audioPlayer");
    if (!controls || !input || !audio) return;

    input.classList.add("music-input-hidden-mobile");
    input.setAttribute("accept", "audio/*");

    let picker = document.querySelector("#mobileMusicPicker");
    if (!picker) {
      picker = document.createElement("div");
      picker.id = "mobileMusicPicker";
      picker.className = "mobile-music-picker";
      picker.innerHTML = `
        <button id="chooseMusicFileBtn" class="primary-btn" type="button">Choisir une musique</button>
        <span id="musicFileName" class="music-file-name">Aucun fichier sélectionné.</span>
        <p class="music-help">Sur mobile, le navigateur demande une action directe : touche ce bouton, choisis un fichier audio, puis lance la lecture.</p>
      `;
      controls.insertBefore(picker, audio);
    }

    const chooseBtn = picker.querySelector("#chooseMusicFileBtn");
    const fileName = picker.querySelector("#musicFileName");

    chooseBtn.onclick = () => input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      audio.src = url;
      audio.load();
      fileName.textContent = file.name;
      setStatus(`Musique choisie : ${file.name}`);
      audio.play().catch(() => {
        setStatus("Musique prête. Touche lecture pour démarrer.");
      });
    };
  }

  ensurePicker();

  const observer = new MutationObserver(() => ensurePicker());
  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMobileMusicFix);
} else {
  initMobileMusicFix();
}
