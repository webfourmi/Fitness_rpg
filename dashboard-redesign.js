function initDashboardRedesign() {
  if (window.__dashboardRedesignReady) return;
  window.__dashboardRedesignReady = true;

  const WEIGHT_KEY = "sportRpgV1Weights";
  let activeWeightRange = "week";

  document.body.classList.add("dashboard-redesign");

  function injectToolPageStyles() {
    if (document.querySelector("#toolPageStyles")) return;

    const style = document.createElement("style");
    style.id = "toolPageStyles";
    style.textContent = `
      .tool-icon-bar {
        grid-template-columns: repeat(5, minmax(48px, 1fr));
      }

      .dashboard-redesign #logCard {
        display: none;
      }

      .custom-tool-page.hidden {
        display: none;
      }

      .custom-tool-page {
        display: grid;
        gap: 14px;
      }

      .tool-page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
      }

      .tool-page-header h2 {
        margin: 0;
      }

      .journal-page-list {
        display: grid;
        gap: 10px;
        padding: 0;
        margin: 0;
        list-style: none;
      }

      .journal-page-list li {
        padding: 12px;
        border-radius: 14px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.035);
        line-height: 1.4;
      }

      .weight-form {
        display: grid;
        grid-template-columns: 1fr 1fr auto;
        gap: 10px;
        align-items: end;
      }

      .weight-form label {
        display: grid;
        gap: 6px;
        color: var(--muted);
        font-weight: 700;
      }

      .weight-form input {
        width: 100%;
        padding: 11px 12px;
        border-radius: 12px;
        border: 1px solid var(--line);
        background: var(--panel-2);
        color: var(--text);
      }

      .weight-summary-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }

      .weight-summary-item {
        padding: 12px;
        border-radius: 14px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.035);
        text-align: center;
      }

      .weight-summary-item strong {
        display: block;
        font-size: 1.2rem;
        color: var(--accent);
      }

      .weight-summary-item span {
        color: var(--muted);
        font-size: .82rem;
      }

      .weight-range-tabs {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
      }

      .weight-range-tabs button {
        border: 1px solid var(--line);
        border-radius: 14px;
        background: rgba(255,255,255,.035);
        color: var(--text);
        padding: 10px;
        font-weight: 800;
      }

      .weight-range-tabs button.active {
        border-color: rgba(240,184,79,.55);
        background: rgba(240,184,79,.14);
        color: var(--accent);
      }

      .weight-chart-card {
        padding: 12px;
        border-radius: 16px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.03);
      }

      #weightChart {
        width: 100%;
        height: 230px;
        display: block;
      }

      .weight-list {
        display: grid;
        gap: 8px;
        padding: 0;
        margin: 0;
        list-style: none;
      }

      .weight-list li {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        padding: 10px 12px;
        border-radius: 12px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,.03);
      }

      .weight-list button {
        border: 0;
        background: transparent;
        color: var(--muted);
        cursor: pointer;
        font-weight: 900;
      }

      @media(max-width:780px) {
        .tool-icon-bar {
          grid-template-columns: repeat(5, 1fr);
        }

        .tool-page-header {
          display: grid;
        }

        .tool-page-header .ghost-btn {
          width: 100%;
        }

        .weight-form {
          grid-template-columns: 1fr;
        }

        .weight-summary-grid {
          grid-template-columns: 1fr 1fr 1fr;
          gap: 6px;
        }

        .weight-summary-item {
          padding: 9px 5px;
        }

        .weight-summary-item strong {
          font-size: .98rem;
        }

        .weight-summary-item span {
          font-size: .7rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function todayString() {
    try {
      if (typeof today === "function") return today();
    } catch {}
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function loadWeights() {
    try {
      const raw = JSON.parse(localStorage.getItem(WEIGHT_KEY) || "[]");
      return Array.isArray(raw)
        ? raw.filter((entry) => entry && entry.date && Number.isFinite(Number(entry.weight)))
        : [];
    } catch {
      return [];
    }
  }

  function saveWeights(entries) {
    const cleaned = entries
      .filter((entry) => entry && entry.date && Number.isFinite(Number(entry.weight)))
      .map((entry) => ({ date: entry.date, weight: Number(entry.weight) }))
      .sort((a, b) => a.date.localeCompare(b.date));
    localStorage.setItem(WEIGHT_KEY, JSON.stringify(cleaned));
  }

  function rangeDays(range) {
    if (range === "year") return 365;
    if (range === "month") return 30;
    return 7;
  }

  function formatWeight(value) {
    return `${Number(value).toFixed(1).replace(".", ",")} kg`;
  }

  function ensureToolPages() {
    const dashboard = document.querySelector("#dashboard");
    const logCard = document.querySelector("#logCard");
    if (!dashboard) return;

    if (!document.querySelector("#journalToolPage")) {
      const journal = document.createElement("section");
      journal.id = "journalToolPage";
      journal.className = "card custom-tool-page hidden";
      journal.innerHTML = `
        <div class="tool-page-header">
          <div>
            <p class="eyebrow">Journal</p>
            <h2>Exploits récents</h2>
            <p class="muted">Les dernières quêtes validées par ton héros.</p>
          </div>
          <button class="ghost-btn tool-back-btn" type="button">Retour</button>
        </div>
        <ul id="journalPageList" class="journal-page-list"></ul>
      `;
      dashboard.insertBefore(journal, logCard || null);
    }

    if (!document.querySelector("#weightToolPage")) {
      const weight = document.createElement("section");
      weight.id = "weightToolPage";
      weight.className = "card custom-tool-page hidden";
      weight.innerHTML = `
        <div class="tool-page-header">
          <div>
            <p class="eyebrow">Balance</p>
            <h2>Suivi du poids</h2>
            <p class="muted">Enregistre ton poids et observe la tendance sur une semaine, un mois ou une année.</p>
          </div>
          <button class="ghost-btn tool-back-btn" type="button">Retour</button>
        </div>
        <form id="weightForm" class="weight-form">
          <label>Date
            <input id="weightDateInput" type="date" />
          </label>
          <label>Poids en kg
            <input id="weightValueInput" type="number" min="20" max="300" step="0.1" placeholder="Ex : 82.5" />
          </label>
          <button class="primary-btn" type="submit">Enregistrer</button>
        </form>
        <div id="weightSummary" class="weight-summary-grid"></div>
        <div class="weight-range-tabs">
          <button type="button" data-weight-range="week">Semaine</button>
          <button type="button" data-weight-range="month">Mois</button>
          <button type="button" data-weight-range="year">Année</button>
        </div>
        <div class="weight-chart-card">
          <canvas id="weightChart" width="680" height="260"></canvas>
        </div>
        <ul id="weightList" class="weight-list"></ul>
      `;
      dashboard.insertBefore(weight, logCard || null);

      weight.querySelector("#weightForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const dateInput = weight.querySelector("#weightDateInput");
        const valueInput = weight.querySelector("#weightValueInput");
        const date = dateInput.value || todayString();
        const value = Number(valueInput.value);

        if (!Number.isFinite(value) || value <= 0) {
          alert("Entre un poids valide.");
          return;
        }

        const entries = loadWeights().filter((entry) => entry.date !== date);
        entries.push({ date, weight: value });
        saveWeights(entries);
        valueInput.value = "";
        renderWeightPage();
      });

      weight.querySelectorAll("[data-weight-range]").forEach((button) => {
        button.addEventListener("click", () => {
          activeWeightRange = button.dataset.weightRange;
          renderWeightPage();
        });
      });
    }

    document.querySelectorAll(".tool-back-btn").forEach((button) => {
      button.onclick = closeCustomPages;
    });
  }

  function setDashboardCoreVisible(visible) {
    document.querySelector(".hero-card")?.classList.toggle("hidden", !visible);
    document.querySelector("#sportHub")?.classList.toggle("hidden", !visible);
    document.querySelector("#logCard")?.classList.add("hidden");
  }

  function hideStandardPages() {
    ["#musicPage", "#questsPage", "#weekPage", "#badgesPage"].forEach((selector) => {
      document.querySelector(selector)?.classList.add("hidden");
    });
  }

  function closeCustomPages() {
    document.querySelectorAll(".custom-tool-page").forEach((page) => page.classList.add("hidden"));
    setDashboardCoreVisible(true);
    hideStandardPages();
  }

  function showCustomPage(pageId) {
    ensureToolPages();
    hideStandardPages();
    setDashboardCoreVisible(false);

    document.querySelectorAll(".custom-tool-page").forEach((page) => page.classList.add("hidden"));
    const page = document.querySelector(`#${pageId}`);
    page?.classList.remove("hidden");
    page?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderJournalPage() {
    ensureToolPages();
    const list = document.querySelector("#journalPageList");
    if (!list) return;

    const entries = profile?.log?.length ? profile.log : ["Aucune quête accomplie pour l’instant."];
    list.innerHTML = "";
    entries.forEach((entry) => {
      const li = document.createElement("li");
      li.textContent = entry;
      list.appendChild(li);
    });
  }

  function filteredWeights(entries) {
    const days = rangeDays(activeWeightRange);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days + 1);
    cutoff.setHours(0, 0, 0, 0);
    return entries.filter((entry) => new Date(`${entry.date}T00:00:00`) >= cutoff);
  }

  function drawWeightChart(entries) {
    const canvas = document.querySelector("#weightChart");
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.max(320, Math.floor(rect.width * ratio));
    canvas.height = Math.floor(230 * ratio);

    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.scale(ratio, ratio);

    const width = w / ratio;
    const height = h / ratio;
    const pad = 28;

    ctx.fillStyle = "rgba(255,255,255,.035)";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255,255,255,.12)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i += 1) {
      const y = pad + ((height - pad * 2) / 3) * i;
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(width - pad, y);
      ctx.stroke();
    }

    if (entries.length < 2) {
      ctx.fillStyle = "rgba(245,242,232,.72)";
      ctx.font = "14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(entries.length ? "Ajoute un second poids pour tracer la courbe." : "Aucun poids enregistré pour cette période.", width / 2, height / 2);
      return;
    }

    const weights = entries.map((entry) => Number(entry.weight));
    const min = Math.min(...weights);
    const max = Math.max(...weights);
    const spread = Math.max(1, max - min);

    const xFor = (index) => pad + ((width - pad * 2) * index) / Math.max(1, entries.length - 1);
    const yFor = (value) => height - pad - ((value - min) / spread) * (height - pad * 2);

    ctx.strokeStyle = "rgba(240,184,79,.95)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    entries.forEach((entry, index) => {
      const x = xFor(index);
      const y = yFor(Number(entry.weight));
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    entries.forEach((entry, index) => {
      const x = xFor(index);
      const y = yFor(Number(entry.weight));
      ctx.fillStyle = "#f0b84f";
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = "rgba(245,242,232,.72)";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(formatWeight(max), pad, pad - 8);
    ctx.fillText(formatWeight(min), pad, height - 8);
  }

  function renderWeightPage() {
    ensureToolPages();
    const page = document.querySelector("#weightToolPage");
    if (!page) return;

    const dateInput = page.querySelector("#weightDateInput");
    if (dateInput && !dateInput.value) dateInput.value = todayString();

    const entries = loadWeights().sort((a, b) => a.date.localeCompare(b.date));
    const visible = filteredWeights(entries);
    const summary = page.querySelector("#weightSummary");
    const list = page.querySelector("#weightList");

    const latest = entries.at(-1);
    const previous = entries.at(-2);
    const diff = latest && previous ? latest.weight - previous.weight : null;

    summary.innerHTML = `
      <article class="weight-summary-item"><strong>${latest ? formatWeight(latest.weight) : "—"}</strong><span>Dernier poids</span></article>
      <article class="weight-summary-item"><strong>${diff === null ? "—" : `${diff > 0 ? "+" : ""}${diff.toFixed(1).replace(".", ",")} kg`}</strong><span>Écart précédent</span></article>
      <article class="weight-summary-item"><strong>${entries.length}</strong><span>Mesures</span></article>
    `;

    page.querySelectorAll("[data-weight-range]").forEach((button) => {
      button.classList.toggle("active", button.dataset.weightRange === activeWeightRange);
    });

    list.innerHTML = "";
    entries.slice(-8).reverse().forEach((entry) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${entry.date}</span><strong>${formatWeight(entry.weight)}</strong><button type="button" aria-label="Supprimer la mesure">×</button>`;
      li.querySelector("button").addEventListener("click", () => {
        saveWeights(loadWeights().filter((item) => !(item.date === entry.date && Number(item.weight) === Number(entry.weight))));
        renderWeightPage();
      });
      list.appendChild(li);
    });

    drawWeightChart(visible);
  }

  function moveCoachAndTools() {
    injectToolPageStyles();
    ensureToolPages();

    const sportHub = document.querySelector("#sportHub");
    const coachCard = document.querySelector(".coach-panel-card");
    const hubGrid = document.querySelector(".hub-nav-grid");
    const exercisesButton = document.querySelector("#openQuestsBtn");
    const musicButton = document.querySelector("#openMusicBtn");
    const badgesButton = document.querySelector("#openBadgesBtn");
    const weekButton = document.querySelector("#openWeekBtn");

    if (!sportHub || !coachCard || !exercisesButton) return;

    let mainRow = document.querySelector("#mainTrainingRow");
    if (!mainRow) {
      mainRow = document.createElement("div");
      mainRow.id = "mainTrainingRow";
      mainRow.className = "main-training-row";
      const intro = sportHub.querySelector("div");
      intro?.insertAdjacentElement("afterend", mainRow);
    }

    if (coachCard.parentElement !== mainRow) mainRow.appendChild(coachCard);
    if (exercisesButton.parentElement !== mainRow) mainRow.appendChild(exercisesButton);

    let toolbar = document.querySelector("#toolIconBar");
    if (!toolbar) {
      toolbar = document.createElement("div");
      toolbar.id = "toolIconBar";
      toolbar.className = "tool-icon-bar";
      mainRow.insertAdjacentElement("afterend", toolbar);
    }

    [musicButton, badgesButton, weekButton].forEach((button) => {
      if (!button) return;
      button.classList.add("tool-icon-btn");
      if (button.parentElement !== toolbar) toolbar.appendChild(button);
    });

    let journalButton = document.querySelector("#openJournalBtn");
    if (!journalButton) {
      journalButton = document.createElement("button");
      journalButton.id = "openJournalBtn";
      journalButton.className = "tool-icon-btn";
      journalButton.type = "button";
      journalButton.innerHTML = `<span>📜</span><strong>Journal</strong><small>Exploits</small>`;
      toolbar.appendChild(journalButton);
    }
    journalButton.onclick = () => {
      renderJournalPage();
      showCustomPage("journalToolPage");
    };

    let weightButton = document.querySelector("#openWeightBtn");
    if (!weightButton) {
      weightButton = document.createElement("button");
      weightButton.id = "openWeightBtn";
      weightButton.className = "tool-icon-btn";
      weightButton.type = "button";
      weightButton.innerHTML = `<span>⚖️</span><strong>Poids</strong><small>Balance</small>`;
      toolbar.appendChild(weightButton);
    }
    weightButton.onclick = () => {
      renderWeightPage();
      showCustomPage("weightToolPage");
    };

    if (hubGrid) hubGrid.remove();

    if (typeof currentView !== "undefined" && currentView !== "dashboard") {
      document.querySelectorAll(".custom-tool-page").forEach((page) => page.classList.add("hidden"));
    }
  }

  moveCoachAndTools();

  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__dashboardRenderPatched) {
    window.__dashboardRenderPatched = true;
    render = function patchedRender() {
      oldRender();
      moveCoachAndTools();
    };
    render();
  }

 window.FitnessRpgConfig?.setVersionLabels?.();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDashboardRedesign);
} else {
  initDashboardRedesign();
}
