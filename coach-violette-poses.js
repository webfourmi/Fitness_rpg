function initViolettePoses() {
  try {
    if (typeof coaches === "undefined" || !coaches.violette) return;

    coaches.violette.image = "assets/coach/violette/violette_idle.jpg";
    coaches.violette.fallbackImage = "assets/coach/violette/image.jpg";
    coaches.violette.poses = {
      idle: "assets/coach/violette/violette_idle.jpg",
      welcome: "assets/coach/violette/violette_welcome.jpg",
      explain: "assets/coach/violette/violette_explain.jpg",
      motivate: "assets/coach/violette/violette_motivate.jpg",
      warmup: "assets/coach/violette/violette_warmup.jpg",
      walk: "assets/coach/violette/violette_walk.jpg",
      bike: "assets/coach/violette/violette_bike.jpg",
      squats: "assets/coach/violette/violette_squats.jpg",
      core: "assets/coach/violette/violette_core.jpg",
      stretch: "assets/coach/violette/violette_stretch.jpg",
      victory: "assets/coach/violette/violette_victory.jpg",
      levelup: "assets/coach/violette/violette_levelup.jpg",
    };

    coaches.violette.byQuest = {
      ...coaches.violette.byQuest,
      warmup: ["On réveille doucement la machine. Même les petites bottes aiment un bon échauffement."],
      walk: ["Une bonne marche, c’est une aventure qui a mis de bonnes chaussures."],
      bike: ["Tes jambes tournent, ton XP monte. Belle affaire !"],
      pilates: ["Pilates bien placé. Petit effort, vrai progrès."],
      pushups: ["Pompes validées ! Le sol a été poli avec panache."],
      mountain: ["Mountain climbing ! Tu grimpes sans quitter la pièce, c’est presque de la magie."],
      squats: ["Squats réussis. Les jambes viennent de gagner un petit trésor."],
      muscu: ["Musculation faite. Voilà du muscle dans la besace."],
      core: ["Gainage tenu. Petit corps, grand pilier."],
      stretch: ["On s’étire, on respire, on remet le corps en mode velours."],
    };

    document.querySelectorAll('img[src="assets/coach/violette/image.jpg"]').forEach((img) => {
      img.src = coaches.violette.poses.idle;
    });

    if (typeof syncCards === "function") syncCards();
    if (typeof render === "function") render();
  } catch (error) {
    console.warn("Impossible d’appliquer les poses de Violette", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initViolettePoses);
} else {
  initViolettePoses();
}
