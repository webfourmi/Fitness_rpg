function initGoalSelectionPolish() {
  if (window.__goalSelectionPolishReady) return;
  window.__goalSelectionPolishReady = true;

  function injectGoalSelectionStyle() {
    if (document.querySelector("#goalSelectionPolishStyle")) return;

    const style = document.createElement("style");
    style.id = "goalSelectionPolishStyle";
    style.textContent = `
      .goal-card {
        position: relative;
        transition: transform .14s ease, border-color .14s ease, background .14s ease, box-shadow .14s ease;
      }

      .goal-card:hover {
        transform: translateY(-1px);
        border-color: rgba(240,184,79,.38);
        background: rgba(240,184,79,.06);
      }

      .goal-card.active,
      .goal-card[aria-pressed="true"] {
        border: 2px solid rgba(240,184,79,.9) !important;
        background:
          radial-gradient(circle at 12% 10%, rgba(240,184,79,.22), transparent 36%),
          linear-gradient(135deg, rgba(240,184,79,.18), rgba(255,255,255,.05)) !important;
        box-shadow: 0 0 0 2px rgba(240,184,79,.18), 0 10px 24px rgba(240,184,79,.14);
        transform: translateY(-2px);
      }

      .goal-card.active .goal-card-icon,
      .goal-card[aria-pressed="true"] .goal-card-icon {
        background: rgba(240,184,79,.25) !important;
        box-shadow: 0 0 0 2px rgba(240,184,79,.2);
      }

      .goal-selected-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 4px 8px;
        border-radius: 999px;
        background: rgba(74,222,128,.16);
        border: 1px solid rgba(74,222,128,.35);
        color: #9ef0b3;
        font-size: .72rem;
        font-weight: 900;
        letter-spacing: .02em;
        z-index: 2;
      }

      .goal-current-note {
        color: var(--accent) !important;
        font-weight: 900;
      }

      @media(max-width:780px) {
        .goal-selected-badge {
          top: 8px;
          right: 8px;
          font-size: .64rem;
          padding: 3px 7px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function polishGoalCards() {
    const cards = document.querySelectorAll(".goal-card");
    if (!cards.length) return;

    cards.forEach((card) => {
      const isActive = card.classList.contains("active");
      card.setAttribute("aria-pressed", isActive ? "true" : "false");

      card.querySelectorAll(".goal-selected-badge, .goal-current-note").forEach((node) => node.remove());

      if (isActive) {
        card.insertAdjacentHTML("afterbegin", `<span class="goal-selected-badge">✅ Sélectionné</span>`);
        card.insertAdjacentHTML("beforeend", `<p class="goal-current-note">Objectif actuel</p>`);
      }
    });
  }

  injectGoalSelectionStyle();
  polishGoalCards();

  const observer = new MutationObserver(() => {
    window.requestAnimationFrame(polishGoalCards);
  });
  observer.observe(document.body, { childList: true, subtree: true });

  const oldRefresh = window.refreshPersonalGoals;
  if (typeof oldRefresh === "function" && !window.__goalRefreshPolished) {
    window.__goalRefreshPolished = true;
    window.refreshPersonalGoals = function polishedRefreshPersonalGoals() {
      oldRefresh();
      polishGoalCards();
    };
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGoalSelectionPolish);
} else {
  initGoalSelectionPolish();
}
