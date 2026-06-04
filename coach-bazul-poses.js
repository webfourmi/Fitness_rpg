function initBazulPoses() {
  try {
    if (typeof coaches === "undefined" || !coaches.bazul) return;

    coaches.bazul.image = "assets/coach/bazul/bazul_idle.jpg";
    coaches.bazul.fallbackImage = "assets/coach/bazul/image.jpg";
    coaches.bazul.poses = {
      idle: "assets/coach/bazul/bazul_idle.jpg",
      welcome: "assets/coach/bazul/bazul_welcome.jpg",
      explain: "assets/coach/bazul/bazul_explain.jpg",
      motivate: "assets/coach/bazul/bazul_motivate.jpg",
      warmup: "assets/coach/bazul/bazul_warmup.jpg",
      walk: "assets/coach/bazul/bazul_walk.jpg",
      bike: "assets/coach/bazul/bazul_bike.jpg",
      squats: "assets/coach/bazul/bazul_squats.jpg",
      core: "assets/coach/bazul/bazul_core.jpg",
      stretch: "assets/coach/bazul/bazul_stretchup.jpg",
      victory: "assets/coach/bazul/bazul_victory.jpg",
      levelup: "assets/coach/bazul/bazul_levelup.jpg",
    };

    coaches.bazul.byQuest = {
      ...coaches.bazul.byQuest,
      warmup: ["On chauffe les articulations. Même le granit fissure si on le brusque."],
      walk: ["Marche ferme. Talon solide, regard devant."],
      bike: ["Pédale rond. Une roue bien menée vaut un marteau bien tenu."],
      pilates: ["Le centre d’abord. Une bonne voûte tient par sa clef."],
      pushups: ["Pompes validées. Bras solides, poitrine haute."],
      mountain: ["Mountain climbing. Grimpe dans l’axe, pas comme un gobelin ivre."],
      squats: ["Squats. Les jambes sont les piliers de la forteresse."],
      muscu: ["Musculation faite. La forge a gagné du minerai."],
      core: ["Gainage. Tronc verrouillé comme une porte de mine."],
      stretch: ["Étirements. On entretient l’outil après le travail."],
    };

    document.querySelectorAll('img[src="assets/coach/bazul/image.jpg"]').forEach((img) => {
      img.src = coaches.bazul.poses.idle;
    });

    if (typeof syncCards === "function") syncCards();
    if (typeof render === "function") render();
  } catch (error) {
    console.warn("Impossible d’appliquer les poses de Bazul", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBazulPoses);
} else {
  initBazulPoses();
}
