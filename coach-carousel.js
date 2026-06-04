function initCoachCarousel() {
  const grid = document.querySelector("#coachChoiceGrid");
  if (!grid || grid.dataset.carouselReady === "true") return;

  grid.dataset.carouselReady = "true";

  const shell = document.createElement("div");
  shell.className = "coach-carousel-shell";

  const leftButton = document.createElement("button");
  leftButton.className = "coach-arrow coach-arrow-left";
  leftButton.type = "button";
  leftButton.setAttribute("aria-label", "Coach précédent");
  leftButton.textContent = "‹";

  const viewport = document.createElement("div");
  viewport.className = "coach-carousel-viewport";

  const rightButton = document.createElement("button");
  rightButton.className = "coach-arrow coach-arrow-right";
  rightButton.type = "button";
  rightButton.setAttribute("aria-label", "Coach suivant");
  rightButton.textContent = "›";

  grid.parentNode.insertBefore(shell, grid);
  viewport.appendChild(grid);
  shell.appendChild(leftButton);
  shell.appendChild(viewport);
  shell.appendChild(rightButton);

  const cards = Array.from(grid.querySelectorAll(".coach-choice-card"));

  function getActiveIndex() {
    const index = cards.findIndex((card) => card.querySelector('input[name="coach"]')?.checked);
    return index >= 0 ? index : 0;
  }

  function selectIndex(index) {
    if (!cards.length) return;
    const normalized = (index + cards.length) % cards.length;
    const input = cards[normalized].querySelector('input[name="coach"]');
    if (input) {
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
    centerCard(normalized);
  }

  function centerCard(index = getActiveIndex()) {
    const card = cards[index];
    if (!card) return;
    const viewportRect = viewport.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const offset = cardRect.left - viewportRect.left - viewportRect.width / 2 + cardRect.width / 2;
    viewport.scrollBy({ left: offset, behavior: "smooth" });
  }

  leftButton.addEventListener("click", () => selectIndex(getActiveIndex() - 1));
  rightButton.addEventListener("click", () => selectIndex(getActiveIndex() + 1));

  cards.forEach((card, index) => {
    card.addEventListener("click", () => setTimeout(() => centerCard(index), 0));
  });

  grid.addEventListener("change", () => setTimeout(() => centerCard(), 0));

  setTimeout(() => centerCard(), 80);
}

function initQuestCarousel() {
  const list = document.querySelector("#questsList");
  if (!list || list.dataset.questCarouselReady === "true") return;

  list.dataset.questCarouselReady = "true";

  const shell = document.createElement("div");
  shell.className = "quest-carousel-shell";

  const leftButton = document.createElement("button");
  leftButton.className = "quest-arrow quest-arrow-left";
  leftButton.type = "button";
  leftButton.setAttribute("aria-label", "Catégorie précédente");
  leftButton.textContent = "‹";

  const viewport = document.createElement("div");
  viewport.className = "quest-carousel-viewport";

  const rightButton = document.createElement("button");
  rightButton.className = "quest-arrow quest-arrow-right";
  rightButton.type = "button";
  rightButton.setAttribute("aria-label", "Catégorie suivante");
  rightButton.textContent = "›";

  list.parentNode.insertBefore(shell, list);
  viewport.appendChild(list);
  shell.appendChild(leftButton);
  shell.appendChild(viewport);
  shell.appendChild(rightButton);

  function getCards() {
    return Array.from(list.querySelectorAll(".sport-item"));
  }

  function getActiveIndex() {
    const cards = getCards();
    const openIndex = cards.findIndex((card) => card.classList.contains("open"));
    return openIndex >= 0 ? openIndex : 0;
  }

  function centerCard(index = getActiveIndex()) {
    const cards = getCards();
    const card = cards[index];
    if (!card) return;
    const viewportRect = viewport.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const offset = cardRect.left - viewportRect.left - viewportRect.width / 2 + cardRect.width / 2;
    viewport.scrollBy({ left: offset, behavior: "smooth" });
  }

  function move(delta) {
    const cards = getCards();
    if (!cards.length) return;
    const index = getActiveIndex();
    const next = (index + delta + cards.length) % cards.length;
    const toggle = cards[next].querySelector(".sport-toggle");
    if (toggle) toggle.click();
    setTimeout(() => centerCard(next), 40);
  }

  leftButton.addEventListener("click", () => move(-1));
  rightButton.addEventListener("click", () => move(1));

  list.addEventListener("click", (event) => {
    const item = event.target.closest(".sport-item");
    if (!item) return;
    setTimeout(() => {
      const cards = getCards();
      centerCard(cards.indexOf(item));
    }, 40);
  });

  const observer = new MutationObserver(() => setTimeout(() => centerCard(), 40));
  observer.observe(list, { childList: true });

  setTimeout(() => centerCard(), 120);
}

function mangaHeroSvg(currentStage) {
  const heroProfile = typeof profile !== "undefined" && profile ? profile : { gender: "homme", age: 20 };
  const age = Number(heroProfile.age || 20);
  const gender = heroProfile.gender || "homme";
  const mature = age >= 40;
  const title = gender === "femme" ? (mature ? "Héroïne confirmée" : "Jeune héroïne") : (mature ? "Héros confirmé" : "Jeune héros");
  const skin = mature ? "#d2a07c" : "#e0b18b";
  const hair = gender === "femme" ? (mature ? "#5a3528" : "#3b241b") : (mature ? "#3b2b22" : "#241813");
  const armor = currentStage >= 4 ? "#f0b84f" : currentStage >= 2 ? "#5d8ff5" : "#6d7385";
  const cloth = currentStage >= 4 ? "#7c1f1f" : currentStage >= 2 ? "#2f4c88" : "#4e5363";
  const glow = currentStage >= 4 ? "#f0b84f" : currentStage >= 2 ? "#8db8ff" : "#9aa3b8";
  const line = "#1c1614";
  const eye = "#2c2c34";
  const hairShape = gender === "femme"
    ? `<path d="M124 112 C128 76 149 58 187 71 C200 75 208 89 209 111 C205 101 199 96 191 93 C192 124 192 154 198 186 L182 186 C177 168 174 152 171 138 L149 138 C146 152 143 168 138 186 L122 186 C128 154 128 124 129 93 C126 98 124 104 124 112 Z" fill="${hair}"/>`
    : `<path d="M126 116 C130 80 152 62 188 76 C198 80 204 90 205 110 C194 94 180 90 166 91 C152 92 138 99 126 116 Z" fill="${hair}"/>`;
  const body = gender === "femme"
    ? `<path d="M118 364 C124 246 142 224 160 224 C178 224 196 246 202 364 Z" fill="url(#armor)"/><path d="M132 230 C142 218 178 218 188 230 L180 252 C170 245 150 245 140 252 Z" fill="${cloth}" opacity=".95"/><path d="M118 250 L102 330 L122 330 L136 276 Z" fill="${armor}" opacity=".88"/><path d="M202 250 L184 276 L198 330 L218 330 Z" fill="${armor}" opacity=".88"/>`
    : `<path d="M110 364 C116 246 136 220 160 220 C184 220 204 246 210 364 Z" fill="url(#armor)"/><path d="M126 228 C140 214 180 214 194 228 L184 252 C172 244 148 244 136 252 Z" fill="${cloth}" opacity=".95"/><path d="M112 248 L94 330 L118 330 L138 272 Z" fill="${armor}" opacity=".88"/><path d="M208 248 L182 272 L202 330 L226 330 Z" fill="${armor}" opacity=".88"/>`;
  const matureMarks = mature
    ? `<path d="M139 149 L134 153" stroke="#b98f76" stroke-width="1" opacity=".55"/><path d="M181 149 L186 153" stroke="#b98f76" stroke-width="1" opacity=".55"/>`
    : "";
  const beard = gender === "homme" && mature
    ? `<path d="M146 154 Q152 169 160 171 Q168 169 174 154" fill="#694c3a"/>`
    : "";

  return `<svg viewBox="0 0 320 430" role="img" aria-label="${title} stade ${currentStage}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a1d2b"/><stop offset="100%" stop-color="#10131d"/></linearGradient>
      <radialGradient id="glow" cx="50%" cy="42%" r="42%"><stop offset="0%" stop-color="${glow}" stop-opacity=".35"/><stop offset="100%" stop-color="${glow}" stop-opacity="0"/></radialGradient>
      <linearGradient id="armor" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${armor}"/><stop offset="100%" stop-color="#2c3040"/></linearGradient>
    </defs>
    <rect width="320" height="430" fill="url(#bg)"/>
    <circle cx="160" cy="188" r="${92 + currentStage * 10}" fill="url(#glow)"/>
    <ellipse cx="160" cy="388" rx="108" ry="18" fill="${glow}" opacity=".18"/>
    ${body}
    <path d="M128 118 C132 88 147 77 160 77 C173 77 187 88 191 118 L187 149 C183 171 173 183 160 183 C147 183 137 171 133 149 Z" fill="${skin}" stroke="${line}" stroke-width="2"/>
    ${hairShape}
    <ellipse cx="146" cy="129" rx="10.2" ry="6.1" fill="#fff"/>
    <ellipse cx="174" cy="129" rx="10.2" ry="6.1" fill="#fff"/>
    <ellipse cx="146" cy="130" rx="4.1" ry="4.8" fill="${eye}"/>
    <ellipse cx="174" cy="130" rx="4.1" ry="4.8" fill="${eye}"/>
    <circle cx="147" cy="128" r="1.2" fill="#fff"/>
    <circle cx="175" cy="128" r="1.2" fill="#fff"/>
    <path d="M136 121 Q146 114 156 121" stroke="${line}" stroke-width="2.3" fill="none"/>
    <path d="M164 121 Q174 114 184 121" stroke="${line}" stroke-width="2.3" fill="none"/>
    <path d="M158 132 Q160 140 157 145" stroke="#8d6a55" stroke-width="1.6" fill="none"/>
    <path d="M147 153 Q160 160 173 153" stroke="#8a4b48" stroke-width="2" fill="none"/>
    ${beard}${matureMarks}
    <text x="160" y="36" fill="#f6f1e8" text-anchor="middle" font-size="18" font-weight="800">${title}</text>
    <text x="160" y="58" fill="${glow}" text-anchor="middle" font-size="14" font-weight="700">Stade ${currentStage}</text>
  </svg>`;
}

function applyMangaHeroSvg() {
  try {
    if (typeof heroSvg === "function") {
      heroSvg = mangaHeroSvg;
      if (typeof render === "function") render();
    }
  } catch (error) {
    console.warn("Impossible d’appliquer le portrait manga", error);
  }
}

function initCarousels() {
  initCoachCarousel();
  initQuestCarousel();
  applyMangaHeroSvg();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCarousels);
} else {
  initCarousels();
}
