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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCoachCarousel);
} else {
  initCoachCarousel();
}
