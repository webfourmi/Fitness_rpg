// ============================================================
// Fitness RPG - app-stats.js
// V5.9 - Tableau de statistiques
// ------------------------------------------------------------
// Rôle :
// - calculer les statistiques à partir de l'historique existant ;
// - afficher l'activité, l'XP, les catégories et les programmes ;
// - ne modifier aucune donnée du héros.
// ============================================================

window.FitnessRpgStats = {
  currentPeriod: "30",
  allowedPeriods: ["7", "30", "90", "365", "all"]
};

window.FitnessRpgStats.escapeHtml = function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

window.FitnessRpgStats.pad = function pad(value) {
  return String(value).padStart(2, "0");
};

window.FitnessRpgStats.toDateKey = function toDateKey(value) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const date = value instanceof Date ? value : new Date(value);
  if (!Number.isFinite(date.getTime())) return "";

  return [
    date.getFullYear(),
    window.FitnessRpgStats.pad(date.getMonth() + 1),
    window.FitnessRpgStats.pad(date.getDate())
  ].join("-");
};

window.FitnessRpgStats.dateFromKey = function dateFromKey(dateKey) {
  const match = String(dateKey || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12, 0, 0, 0);
  return Number.isFinite(date.getTime()) ? date : null;
};

window.FitnessRpgStats.addDays = function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + Number(amount || 0));
  return next;
};

window.FitnessRpgStats.diffDays = function diffDays(first, second) {
  const a = Date.UTC(first.getFullYear(), first.getMonth(), first.getDate());
  const b = Date.UTC(second.getFullYear(), second.getMonth(), second.getDate());
  return Math.round((b - a) / 86400000);
};

window.FitnessRpgStats.formatNumber = function formatNumber(value, maximumFractionDigits = 0) {
  return Number(value || 0).toLocaleString("fr-FR", { maximumFractionDigits });
};

window.FitnessRpgStats.formatDuration = function formatDuration(seconds) {
  const safe = Math.max(0, Math.round(Number(seconds || 0)));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);

  if (hours > 0) return `${hours} h ${window.FitnessRpgStats.pad(minutes)} min`;
  return `${minutes} min`;
};

window.FitnessRpgStats.getEntries = function getEntries() {
  return (window.FitnessRpgState?.getAllEntries?.() || [])
    .filter(Boolean)
    .map((entry) => ({
      ...entry,
      dateKey: window.FitnessRpgStats.toDateKey(entry.date || entry.at)
    }))
    .filter((entry) => entry.dateKey)
    .sort((a, b) => String(a.dateKey).localeCompare(String(b.dateKey)));
};

window.FitnessRpgStats.getWeights = function getWeights() {
  return (window.FitnessRpgState?.getWeights?.() || [])
    .filter((entry) => Number.isFinite(Number(entry?.value)))
    .map((entry) => ({
      ...entry,
      value: Number(entry.value),
      dateKey: window.FitnessRpgStats.toDateKey(entry.date || entry.at)
    }))
    .filter((entry) => entry.dateKey)
    .sort((a, b) => String(a.dateKey).localeCompare(String(b.dateKey)));
};

window.FitnessRpgStats.getPeriod = function getPeriod(periodId = null) {
  const id = window.FitnessRpgStats.allowedPeriods.includes(String(periodId))
    ? String(periodId)
    : window.FitnessRpgStats.currentPeriod;

  const today = new Date();
  today.setHours(12, 0, 0, 0);

  if (id === "all") {
    const dates = [
      ...window.FitnessRpgStats.getEntries().map((entry) => entry.dateKey),
      ...window.FitnessRpgStats.getWeights().map((entry) => entry.dateKey)
    ].sort();
    const firstDate = window.FitnessRpgStats.dateFromKey(dates[0]) || today;

    return {
      id,
      label: dates.length ? "Depuis le début de l’aventure" : "Toute l’aventure",
      start: firstDate,
      end: today,
      dayCount: Math.max(1, window.FitnessRpgStats.diffDays(firstDate, today) + 1)
    };
  }

  const days = Math.max(1, Number(id) || 30);
  const start = window.FitnessRpgStats.addDays(today, -(days - 1));
  const labels = {
    "7": "Les 7 derniers jours",
    "30": "Les 30 derniers jours",
    "90": "Les 90 derniers jours",
    "365": "Les 12 derniers mois"
  };

  return { id, label: labels[id] || `${days} jours`, start, end: today, dayCount: days };
};

window.FitnessRpgStats.getPreviousPeriod = function getPreviousPeriod(period) {
  if (!period || period.id === "all") return null;

  const end = window.FitnessRpgStats.addDays(period.start, -1);
  const start = window.FitnessRpgStats.addDays(end, -(period.dayCount - 1));

  return {
    id: `previous-${period.id}`,
    label: "Période précédente",
    start,
    end,
    dayCount: period.dayCount
  };
};

window.FitnessRpgStats.comparison = function comparison(current, previous) {
  const currentValue = Number(current || 0);
  const previousValue = Number(previous || 0);

  if (previousValue === 0) {
    return currentValue === 0
      ? { className: "neutral", label: "Stable" }
      : { className: "positive", label: "Nouvelle activité" };
  }

  const percent = Math.round(((currentValue - previousValue) / Math.abs(previousValue)) * 100);
  if (percent === 0) return { className: "neutral", label: "Stable" };

  return {
    className: percent > 0 ? "positive" : "negative",
    label: `${percent > 0 ? "+" : ""}${percent}% vs période précédente`
  };
};

window.FitnessRpgStats.comparisonHtml = function comparisonHtml(current, previous, available = true) {
  if (!available) return '<span class="statistics-trend neutral">Toute l’aventure</span>';
  const trend = window.FitnessRpgStats.comparison(current, previous);
  return `<span class="statistics-trend ${trend.className}">${window.FitnessRpgStats.escapeHtml(trend.label)}</span>`;
};

window.FitnessRpgStats.isInPeriod = function isInPeriod(dateKey, period) {
  const date = window.FitnessRpgStats.dateFromKey(dateKey);
  if (!date) return false;
  return date >= period.start && date <= period.end;
};

window.FitnessRpgStats.setPeriod = function setPeriod(periodId) {
  const safe = String(periodId || "30");
  if (!window.FitnessRpgStats.allowedPeriods.includes(safe)) return;
  window.FitnessRpgStats.currentPeriod = safe;
  window.FitnessRpgStats.renderPage();
};

window.FitnessRpgStats.getEntrySeconds = function getEntrySeconds(entry) {
  const unit = String(entry?.unit || "").trim().toLowerCase();
  const amount = Number(entry?.amount || 0);
  if (!Number.isFinite(amount) || amount <= 0) return 0;

  if (["min", "minute", "minutes"].includes(unit)) return amount * 60;
  if (["sec", "seconde", "secondes"].includes(unit)) return amount;
  return 0;
};

window.FitnessRpgStats.isRepetitionEntry = function isRepetitionEntry(entry) {
  const unit = String(entry?.unit || "").toLowerCase();
  return unit.includes("rép") || unit.includes("rep");
};

window.FitnessRpgStats.getBestStreak = function getBestStreak(entries) {
  const dates = [...new Set(entries.map((entry) => entry.dateKey))]
    .map(window.FitnessRpgStats.dateFromKey)
    .filter(Boolean)
    .sort((a, b) => a - b);

  let best = 0;
  let current = 0;
  let previous = null;

  dates.forEach((date) => {
    current = previous && window.FitnessRpgStats.diffDays(previous, date) === 1
      ? current + 1
      : 1;
    best = Math.max(best, current);
    previous = date;
  });

  return best;
};

window.FitnessRpgStats.getCategoryLabel = function getCategoryLabel(entry) {
  if (entry.type === "program-boss") return "Boss de programme";
  if (entry.type === "program") return entry.programTitle || "Programmes";
  if (entry.type === "custom-program") return "Programmes personnalisés";
  return entry.sportTitle || entry.categoryTitle || entry.sportId || "Autres exercices";
};

window.FitnessRpgStats.countBy = function countBy(items, getKey) {
  const map = new Map();
  items.forEach((item) => {
    const key = String(getKey(item) || "Autres");
    map.set(key, (map.get(key) || 0) + 1);
  });
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "fr"));
};

window.FitnessRpgStats.getBucketMode = function getBucketMode(period) {
  if (period.id === "7" || period.id === "30") return "day";
  if (period.id === "90") return "week";
  return "month";
};

window.FitnessRpgStats.startOfWeek = function startOfWeek(date) {
  const result = new Date(date);
  const day = result.getDay();
  result.setDate(result.getDate() - (day === 0 ? 6 : day - 1));
  result.setHours(12, 0, 0, 0);
  return result;
};

window.FitnessRpgStats.startOfMonth = function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1, 12, 0, 0, 0);
};

window.FitnessRpgStats.bucketKey = function bucketKey(date, mode) {
  if (mode === "week") return window.FitnessRpgStats.toDateKey(window.FitnessRpgStats.startOfWeek(date));
  if (mode === "month") return `${date.getFullYear()}-${window.FitnessRpgStats.pad(date.getMonth() + 1)}`;
  return window.FitnessRpgStats.toDateKey(date);
};

window.FitnessRpgStats.bucketLabel = function bucketLabel(date, mode) {
  if (mode === "week") {
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  }
  if (mode === "month") {
    return date.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" });
  }
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
};

window.FitnessRpgStats.buildActivityBuckets = function buildActivityBuckets(entries, period) {
  const mode = window.FitnessRpgStats.getBucketMode(period);
  let cursor = mode === "week"
    ? window.FitnessRpgStats.startOfWeek(period.start)
    : mode === "month"
      ? window.FitnessRpgStats.startOfMonth(period.start)
      : new Date(period.start);
  const end = period.end;
  const buckets = [];
  const map = new Map();

  while (cursor <= end) {
    const key = window.FitnessRpgStats.bucketKey(cursor, mode);
    const bucket = {
      key,
      label: window.FitnessRpgStats.bucketLabel(cursor, mode),
      entries: 0,
      xp: 0
    };
    buckets.push(bucket);
    map.set(key, bucket);

    if (mode === "week") cursor = window.FitnessRpgStats.addDays(cursor, 7);
    else if (mode === "month") cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1, 12, 0, 0, 0);
    else cursor = window.FitnessRpgStats.addDays(cursor, 1);
  }

  entries.forEach((entry) => {
    const date = window.FitnessRpgStats.dateFromKey(entry.dateKey);
    const bucket = date ? map.get(window.FitnessRpgStats.bucketKey(date, mode)) : null;
    if (!bucket) return;
    bucket.entries += 1;
    bucket.xp += Number(entry.xp || 0);
  });

  return buckets;
};

window.FitnessRpgStats.buildBarChart = function buildBarChart(buckets) {
  if (!buckets.length) return "";

  const width = 760;
  const height = 220;
  const left = 38;
  const right = 12;
  const top = 22;
  const bottom = 38;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;
  const maxValue = Math.max(1, ...buckets.map((bucket) => bucket.entries));
  const slot = chartWidth / buckets.length;
  const barWidth = Math.max(3, Math.min(22, slot * 0.62));
  const labelEvery = Math.max(1, Math.ceil(buckets.length / 8));

  const grid = [0, 0.5, 1].map((ratio) => {
    const y = top + chartHeight - chartHeight * ratio;
    const value = Math.round(maxValue * ratio);
    return `<line class="grid-line" x1="${left}" y1="${y}" x2="${width-right}" y2="${y}"></line>
      <text class="axis-label" x="${left-7}" y="${y+4}" text-anchor="end">${value}</text>`;
  }).join("");

  const bars = buckets.map((bucket, index) => {
    const value = bucket.entries;
    const barHeight = value > 0 ? Math.max(3, (value / maxValue) * chartHeight) : 0;
    const x = left + index * slot + (slot - barWidth) / 2;
    const y = top + chartHeight - barHeight;
    const label = index % labelEvery === 0 || index === buckets.length - 1
      ? `<text class="axis-label" x="${x + barWidth / 2}" y="${height-14}" text-anchor="middle">${window.FitnessRpgStats.escapeHtml(bucket.label)}</text>`
      : "";
    const valueLabel = value > 0 && buckets.length <= 14
      ? `<text class="value-label" x="${x + barWidth / 2}" y="${Math.max(12, y-5)}" text-anchor="middle">${value}</text>`
      : "";

    return `<rect class="bar" x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${barWidth.toFixed(2)}" height="${barHeight.toFixed(2)}" rx="3">
      <title>${window.FitnessRpgStats.escapeHtml(bucket.label)} : ${value} activité${value > 1 ? "s" : ""}, ${bucket.xp} XP</title>
    </rect>${valueLabel}${label}`;
  }).join("");

  return `<svg class="statistics-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Activités par période">${grid}${bars}</svg>`;
};

window.FitnessRpgStats.buildWeightChart = function buildWeightChart(weights) {
  if (!weights.length) return "";

  const width = 760;
  const height = 220;
  const left = 46;
  const right = 16;
  const top = 24;
  const bottom = 38;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;
  const values = weights.map((entry) => entry.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min === max) { min -= 1; max += 1; }
  const padding = Math.max(0.5, (max - min) * 0.12);
  min -= padding;
  max += padding;

  const points = weights.map((entry, index) => {
    const ratioX = weights.length === 1 ? 0.5 : index / (weights.length - 1);
    const ratioY = (entry.value - min) / (max - min);
    return {
      ...entry,
      x: left + ratioX * chartWidth,
      y: top + chartHeight - ratioY * chartHeight
    };
  });

  const grid = [0, 0.5, 1].map((ratio) => {
    const y = top + chartHeight - chartHeight * ratio;
    const value = min + (max - min) * ratio;
    return `<line class="grid-line" x1="${left}" y1="${y}" x2="${width-right}" y2="${y}"></line>
      <text class="axis-label" x="${left-7}" y="${y+4}" text-anchor="end">${window.FitnessRpgStats.formatNumber(value, 1)}</text>`;
  }).join("");

  const polyline = points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
  const labelEvery = Math.max(1, Math.ceil(points.length / 6));
  const dots = points.map((point, index) => {
    const label = index % labelEvery === 0 || index === points.length - 1
      ? `<text class="axis-label" x="${point.x}" y="${height-14}" text-anchor="middle">${window.FitnessRpgStats.escapeHtml(point.dateKey.slice(5))}</text>`
      : "";
    return `<circle class="weight-dot" cx="${point.x}" cy="${point.y}" r="4">
      <title>${window.FitnessRpgStats.escapeHtml(point.dateKey)} : ${window.FitnessRpgStats.formatNumber(point.value, 1)} kg</title>
    </circle>${label}`;
  }).join("");

  return `<svg class="statistics-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Évolution du poids">${grid}<polyline class="weight-line" points="${polyline}"></polyline>${dots}</svg>`;
};

window.FitnessRpgStats.rankingHtml = function rankingHtml(items, emptyText) {
  if (!items.length) return `<p class="statistics-empty">${window.FitnessRpgStats.escapeHtml(emptyText)}</p>`;
  const max = Math.max(1, ...items.map((item) => item.count));

  return `<ol class="statistics-ranking-list">${items.map((item, index) => `
    <li class="statistics-ranking-item">
      <div class="statistics-ranking-top">
        <span>${index + 1}. ${window.FitnessRpgStats.escapeHtml(item.label)}</span>
        <strong>${item.count}</strong>
      </div>
      <div class="statistics-mini-bar"><span style="width:${Math.round((item.count/max)*100)}%"></span></div>
    </li>`).join("")}</ol>`;
};

window.FitnessRpgStats.getProgramStats = function getProgramStats() {
  const activeProgramId = window.FitnessRpgState?.getActiveProgramId?.();
  return (window.FitnessRpgConfig?.programs || []).map((program) => {
    try {
      const progress = window.FitnessRpgPrograms?.getProgramProgressDetails?.(program.id);
      return progress ? { program, progress } : null;
    } catch {
      return null;
    }
  }).filter((item) => {
    if (!item || item.progress.total <= 0) return false;
    return item.progress.entries.length > 0 || item.program.id === activeProgramId;
  }).sort((a, b) => {
    const activeA = a.program.id === activeProgramId ? 1 : 0;
    const activeB = b.program.id === activeProgramId ? 1 : 0;
    return activeB - activeA || b.progress.percent - a.progress.percent;
  }).slice(0, 6);
};

window.FitnessRpgStats.programsHtml = function programsHtml(items) {
  if (!items.length) {
    return '<p class="statistics-empty">Aucun programme commencé pour le moment.</p>';
  }

  return `<ul class="statistics-program-list">${items.map(({ program, progress }) => {
    const bossText = progress.bossTotal > 0
      ? ` · ${progress.bossesDefeated}/${progress.bossTotal} boss`
      : "";
    return `<li class="statistics-program-item">
      <div class="statistics-program-top">
        <span>${window.FitnessRpgStats.escapeHtml(program.icon || "📜")} ${window.FitnessRpgStats.escapeHtml(program.title)}</span>
        <strong>${progress.percent}%</strong>
      </div>
      <div class="statistics-mini-bar"><span style="width:${progress.percent}%"></span></div>
      <span>${progress.completed}/${progress.total} séances${bossText} · ${progress.totalXp} XP</span>
    </li>`;
  }).join("")}</ul>`;
};

window.FitnessRpgStats.buildModel = function buildModel() {
  const period = window.FitnessRpgStats.getPeriod();
  const allEntries = window.FitnessRpgStats.getEntries();
  const entries = allEntries.filter((entry) => window.FitnessRpgStats.isInPeriod(entry.dateKey, period));
  const allWeights = window.FitnessRpgStats.getWeights();
  const weights = allWeights.filter((entry) => window.FitnessRpgStats.isInPeriod(entry.dateKey, period));
  const profile = window.FitnessRpgState?.getProfile?.() || {};
  const activeDays = [...new Set(entries.map((entry) => entry.dateKey))];
  const xp = entries.reduce((sum, entry) => sum + Number(entry.xp || 0), 0);
  const distance = entries.reduce((sum, entry) => sum + Number(entry.distanceKm || 0), 0);
  const repetitions = entries
    .filter(window.FitnessRpgStats.isRepetitionEntry)
    .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const measuredSeconds = entries.reduce((sum, entry) => sum + window.FitnessRpgStats.getEntrySeconds(entry), 0);
  const programSessions = entries.filter((entry) => ["program", "custom-program"].includes(entry.type)).length;
  const bosses = entries.filter((entry) => entry.type === "program-boss").length;
  const categories = window.FitnessRpgStats.countBy(entries, window.FitnessRpgStats.getCategoryLabel);
  const exercises = window.FitnessRpgStats.countBy(
    entries.filter((entry) => entry.exerciseId),
    (entry) => entry.title || entry.exerciseId
  );
  const weekdays = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const weekdayRanking = window.FitnessRpgStats.countBy(entries, (entry) => {
    const date = window.FitnessRpgStats.dateFromKey(entry.dateKey);
    return date ? weekdays[date.getDay()] : "Jour inconnu";
  });
  const regularity = Math.round((activeDays.length / Math.max(1, period.dayCount)) * 100);
  const weightDelta = weights.length >= 2 ? weights.at(-1).value - weights[0].value : null;
  const previousPeriod = window.FitnessRpgStats.getPreviousPeriod(period);
  const previousEntries = previousPeriod
    ? allEntries.filter((entry) => window.FitnessRpgStats.isInPeriod(entry.dateKey, previousPeriod))
    : [];
  const previousActiveDays = [...new Set(previousEntries.map((entry) => entry.dateKey))];
  const previousXp = previousEntries.reduce((sum, entry) => sum + Number(entry.xp || 0), 0);

  return {
    period,
    previousPeriod,
    previousEntries,
    previousActiveDays,
    previousXp,
    allEntries,
    entries,
    weights,
    profile,
    activeDays,
    xp,
    distance,
    repetitions,
    measuredSeconds,
    programSessions,
    bosses,
    categories,
    exercises,
    weekdayRanking,
    regularity,
    weightDelta,
    bestStreak: window.FitnessRpgStats.getBestStreak(allEntries),
    buckets: window.FitnessRpgStats.buildActivityBuckets(entries, period),
    programs: window.FitnessRpgStats.getProgramStats()
  };
};

window.FitnessRpgStats.renderPage = function renderPage() {
  const container = document.querySelector("#statisticsContent");
  if (!container) return;

  const profile = window.FitnessRpgState?.getProfile?.();

  document.querySelectorAll(".stats-period-btn").forEach((button) => {
    const active = button.dataset.period === window.FitnessRpgStats.currentPeriod;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  if (!profile) {
    container.innerHTML = '<section class="card statistics-empty">Crée ou restaure un héros pour afficher ses statistiques.</section>';
    return;
  }

  const model = window.FitnessRpgStats.buildModel();
  const topCategory = model.categories[0];
  const topExercise = model.exercises[0];
  const topWeekday = model.weekdayRanking[0];
  const latestWeight = model.weights.at(-1);
  const deltaLabel = model.weightDelta === null
    ? "Pas assez de mesures"
    : `${model.weightDelta > 0 ? "+" : ""}${window.FitnessRpgStats.formatNumber(model.weightDelta, 1)} kg`;
  const comparisonAvailable = Boolean(model.previousPeriod);

  container.innerHTML = `
    <section class="statistics-quick-heading card">
      <div><p class="eyebrow">${window.FitnessRpgStats.escapeHtml(model.period.label)}</p><h2>${model.entries.length} activité${model.entries.length > 1 ? "s" : ""}</h2></div>
      <span>${model.period.start.toLocaleDateString("fr-FR")} → ${model.period.end.toLocaleDateString("fr-FR")}</span>
    </section>
    <section class="statistics-summary-grid statistics-summary-essential">
      <article class="statistics-kpi-card"><span class="statistics-kpi-icon">🏃</span><strong>${model.entries.length}</strong><span>activités</span>${window.FitnessRpgStats.comparisonHtml(model.entries.length, model.previousEntries.length, comparisonAvailable)}</article>
      <article class="statistics-kpi-card"><span class="statistics-kpi-icon">📅</span><strong>${model.activeDays.length}</strong><span>jours actifs</span>${window.FitnessRpgStats.comparisonHtml(model.activeDays.length, model.previousActiveDays.length, comparisonAvailable)}</article>
      <article class="statistics-kpi-card"><span class="statistics-kpi-icon">✨</span><strong>${window.FitnessRpgStats.formatNumber(model.xp)}</strong><span>XP gagnés</span>${window.FitnessRpgStats.comparisonHtml(model.xp, model.previousXp, comparisonAvailable)}</article>
      <article class="statistics-kpi-card"><span class="statistics-kpi-icon">🔥</span><strong>${profile.streak || 0}</strong><span>série actuelle</span><small>record : ${model.bestStreak}</small></article>
    </section>
    <section class="statistics-panel card">
      <div class="statistics-panel-header"><div><p class="eyebrow">Rythme</p><h2>Activité</h2></div><strong>${model.regularity}%</strong></div>
      <div class="statistics-chart-wrap">${window.FitnessRpgStats.buildBarChart(model.buckets)}</div>
    </section>
    <section class="statistics-panel card">
      <div class="statistics-panel-header"><div><p class="eyebrow">À retenir</p><h2>Tes repères</h2></div></div>
      <div class="statistics-insights-grid statistics-insights-quick">
        <div class="statistics-insight"><span>🏅</span><div><strong>${window.FitnessRpgStats.escapeHtml(topCategory?.label || "Aucun favori")}</strong><small>activité favorite</small></div></div>
        <div class="statistics-insight"><span>⚔️</span><div><strong>${window.FitnessRpgStats.escapeHtml(topExercise?.label || "Aucun exercice dominant")}</strong><small>exercice fréquent</small></div></div>
        <div class="statistics-insight"><span>🗓️</span><div><strong>${window.FitnessRpgStats.escapeHtml(topWeekday?.label || "Aucun jour favori")}</strong><small>jour le plus actif</small></div></div>
      </div>
    </section>
    <details class="statistics-details card">
      <summary>Voir les détails</summary>
      <div class="statistics-details-content">
        <section class="statistics-compact-metrics">
          <span><strong>${window.FitnessRpgStats.formatDuration(model.measuredSeconds)}</strong> chronométré</span>
          <span><strong>${window.FitnessRpgStats.formatNumber(model.repetitions)}</strong> répétitions</span>
          <span><strong>${window.FitnessRpgStats.formatNumber(model.distance, 1)} km</strong> parcourus</span>
          <span><strong>${latestWeight ? `${window.FitnessRpgStats.formatNumber(latestWeight.value, 1)} kg` : "—"}</strong> dernier poids</span>
        </section>
        <section class="statistics-grid two-columns">
          <article class="statistics-panel"><div class="statistics-panel-header"><h2>Activités favorites</h2></div>${window.FitnessRpgStats.rankingHtml(model.categories.slice(0, 5), "Aucune activité.")}</article>
          <article class="statistics-panel"><div class="statistics-panel-header"><h2>Exercices fréquents</h2></div>${window.FitnessRpgStats.rankingHtml(model.exercises.slice(0, 5), "Aucun exercice.")}</article>
        </section>
        <section class="statistics-grid two-columns">
          <article class="statistics-panel"><div class="statistics-panel-header"><h2>Programmes</h2></div>${window.FitnessRpgStats.programsHtml(model.programs)}</article>
          <article class="statistics-panel"><div class="statistics-panel-header"><h2>Poids</h2></div>${model.weights.length ? `<div class="statistics-weight-summary"><span>${model.weights.length} mesure${model.weights.length > 1 ? "s" : ""}</span><strong>${window.FitnessRpgStats.escapeHtml(deltaLabel)}</strong></div><div class="statistics-chart-wrap">${window.FitnessRpgStats.buildWeightChart(model.weights)}</div>` : '<p class="statistics-empty">Aucune mesure.</p>'}</article>
        </section>
      </div>
    </details>
    <p class="statistics-note">Les durées anciennes non enregistrées ne peuvent pas être reconstituées.</p>
  `;
};
