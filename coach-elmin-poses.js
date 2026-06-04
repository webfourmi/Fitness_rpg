function initElminPoses() {
  try {
    if (typeof coaches === "undefined" || !coaches.elmin) return;

    coaches.elmin.image = "assets/coach/elmin/elmin_idle.jpg";
    coaches.elmin.fallbackImage = "assets/coach/elmin/image.jpg";
    coaches.elmin.poses = {
      idle: "assets/coach/elmin/elmin_idle.jpg",
      welcome: "assets/coach/elmin/elmin_welcome.jpg",
      explain: "assets/coach/elmin/elmin_explain.jpg",
      motivate: "assets/coach/elmin/elmin_motivate.jpg",
      warmup: "assets/coach/elmin/elmin_warmup.jpg",
      walk: "assets/coach/elmin/elmin_walk.jpg",
      bike: "assets/coach/elmin/elmin_bike.jpg",
      squats: "assets/coach/elmin/elmin_squats.jpg",
      core: "assets/coach/elmin/elmin_core.jpg",
      stretch: "assets/coach/elmin/elmin_stretch.jpg",
      victory: "assets/coach/elmin/elmin_victory.jpg",
      levelup: "assets/coach/elmin/elmin_levelup.jpg",
    };

    coaches.elmin.byQuest = {
      ...coaches.elmin.byQuest,
      warmup: ["Le rituel commence par la préparation. Chaque articulation devient un cercle de pouvoir."],
      walk: ["La marche est une magie ancienne : simple, lente, efficace."],
      bike: ["Pédale avec méthode. Le souffle est ton métronome."],
      pilates: ["Le centre s’éveille. Voilà une concentration utile."],
      pushups: ["Pompes canalisées. Le sort de force prend forme."],
      mountain: ["Mountain climbing. Cadence stable, énergie contrôlée."],
      squats: ["Squats accomplis. Les jambes apprennent leur formule."],
      muscu: ["Musculation terminée. Les runes de force brillent un peu plus."],
      core: ["Gainage. Immobilité parfaite, puissance silencieuse."],
      stretch: ["La souplesse est une magie lente. Ne la brusque pas."],
    };

    document.querySelectorAll('img[src="assets/coach/elmin/image.jpg"]').forEach((img) => {
      img.src = coaches.elmin.poses.idle;
    });

    if (typeof syncCards === "function") syncCards();
    if (typeof render === "function") render();
  } catch (error) {
    console.warn("Impossible d’appliquer les poses d’Elmin", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initElminPoses);
} else {
  initElminPoses();
}
