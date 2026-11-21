/* Démonstrations schématiques, indépendantes du score et du chronomètre. */
(function () {
  "use strict";

  // Ordre des points : tête, épaules, bassin, coude/main proches,
  // coude/main éloignés, genou/pied proches, genou/pied éloignés.
  const standing = "133,33 131,55 129,104 137,81 143,101 123,81 119,100 130,135 131,165 120,135 118,165";
  const jackClosed = "150,34 150,54 150,105 126,79 125,100 174,79 175,100 140,134 140,165 160,134 160,165";
  const jackOpen = "150,29 150,49 150,98 115,31 103,9 185,31 197,9 116,129 89,165 184,129 211,165";
  const lessons = {
    squats: {
      tip: "Recule les hanches, garde les talons au sol et les genoux dans l’axe des orteils. Remonte en poussant dans les pieds.",
      variant: "Mini-squat", easier: "Fléchis moins les genoux et remonte dès que tu atteins une profondeur confortable.",
      poses: [standing, "153,57 142,75 106,119 167,81 189,76 158,78 181,72 151,128 131,165 141,128 118,165"],
      easy: "144,44 135,63 115,111 162,71 182,67 155,68 174,64 141,138 131,165 130,138 118,165"
    },
    pushups: {
      tip: "Place les mains sous les épaules. Plie les coudes en gardant le corps aligné, puis repousse le sol.",
      variant: "Pompes au mur", easier: "Pose les mains sur un mur à hauteur de poitrine. Plie les coudes en gardant le corps aligné, puis repousse le mur.",
      poses: ["88,101 110,110 163,131 112,138 113,164 104,137 102,164 198,146 226,164 190,146 218,164",
        "76,139 100,143 160,150 129,135 113,164 121,133 102,164 197,154 226,164 190,153 218,164"],
      easyPoses: ["101,38 112,60 132,108 85,62 58,64 84,69 58,72 143,138 154,165 153,137 165,165",
        "75,44 86,66 119,111 102,86 58,64 94,91 58,72 139,138 154,165 149,137 165,165"],
      easyWall: 53
    },
    crunches: {
      tip: "Pieds au sol et genoux pliés, expire en décollant les omoplates. Redescends lentement, sans tirer sur la nuque.",
      variant: "Crunch de faible amplitude", easier: "Croise les bras sur la poitrine et soulève légèrement les épaules, puis redescends avec contrôle.",
      poses: ["65,150 90,153 145,157 110,136 121,141 110,142 121,148 180,123 211,165 173,127 199,165",
        "76,112 94,127 145,157 110,117 118,133 111,124 121,140 180,123 211,165 173,127 199,165"],
      easy: "70,133 91,142 145,157 112,129 118,142 111,136 117,148 180,123 211,165 173,127 199,165"
    },
    plank: {
      tip: "Place les coudes sous les épaules. Aligne épaules, hanches et chevilles, puis tiens la position en respirant.",
      variant: "Planche sur les genoux", easier: "Pose les genoux au sol et aligne les épaules, les hanches et les genoux. Respire pendant le maintien.",
      hold: true,
      poses: ["65,118 87,127 145,137 88,163 58,163 94,161 66,161 185,146 220,165 178,145 212,165",
        "65,105 87,117 145,132 88,163 58,163 94,161 66,161 185,148 220,165 178,147 212,165"],
      easyPoses: ["65,118 87,127 137,146 88,163 58,163 94,161 66,161 176,164 210,162 169,161 202,157",
        "65,105 87,117 134,140 88,163 58,163 94,161 66,161 176,164 210,162 169,161 202,157"]
    },
    wall: {
      tip: "Appuie le dos au mur, avance les pieds et glisse jusqu’à placer les genoux au-dessus des chevilles. Respire pendant le maintien.",
      variant: "Chaise murale plus haute", easier: "Descends moins bas et tiens la position tant que tu peux garder le dos au mur et respirer régulièrement.",
      hold: true, wall: 97,
      poses: ["111,32 109,54 109,104 127,78 143,100 122,78 135,99 143,131 149,165 135,131 141,165",
        "111,54 109,76 109,126 126,103 144,122 121,102 136,120 151,126 149,165 141,125 141,165"],
      easy: "111,44 109,66 109,116 127,90 143,110 122,89 135,108 146,134 149,165 137,134 141,165"
    },
    jacks: {
      tip: "Saute pour écarter les pieds et lever les bras. Reviens pieds rapprochés en amortissant la réception, genoux souples.",
      variant: "Pas latéraux sans saut", easier: "Écarte un pied sur le côté en levant les bras, puis ramène-le. Alterne les côtés.",
      poses: [jackClosed, "150,22 150,42 150,91 115,39 96,22 185,39 204,22 122,122 101,149 178,122 199,149",
        jackOpen, "150,22 150,42 150,91 115,39 96,22 185,39 204,22 134,119 120,149 166,119 180,149"],
      easyPoses: [jackClosed, "150,34 150,54 150,105 115,34 103,12 185,34 197,12 118,133 88,165 160,134 160,165",
        jackClosed, "150,34 150,54 150,105 115,34 103,12 185,34 197,12 140,134 140,165 182,133 212,165"]
    }
  };

  function diagram(lesson, easier) {
    const poses = easier
      ? lesson.easyPoses || [lesson.poses[0], lesson.easy]
      : lesson.poses;
    const frames = [...poses, poses[0]].map(pose => pose.split(" "));
    const wall = easier ? lesson.easyWall || lesson.wall : lesson.wall;
    const duration = lesson.hold ? 6 : poses.length > 2 ? 3.2 : 2.8;
    const timing = lesson.hold ? ' keyTimes="0;.23;.82;1"' : "";
    if (lesson.hold) frames.splice(2, 0, frames[1]);

    function animate(attribute, values) {
      return `<animate attributeName="${attribute}" values="${values.join(";")}" dur="${duration}s"${timing} repeatCount="indefinite"/>`;
    }
    function line(indices, className) {
      const values = frames.map(frame => indices.map(index => frame[index]).join(" "));
      return `<polyline class="${className}" points="${values[0]}">${animate("points", values)}</polyline>`;
    }
    const [x, y] = frames[0][0].split(",");
    return `<svg class="hero-challenge-diagram" viewBox="0 0 300 181" data-duration="${duration}" aria-hidden="true">
      <path class="hero-challenge-ground" d="M33 170H267${wall ? ` M${wall} 18V170` : ""}"/>
      ${line([6,5,1,2,9,10], "hero-challenge-far")}
      ${line([1,2,7,8], "hero-challenge-body")}
      ${line([1,3,4], "hero-challenge-arm")}
      <circle cx="${x}" cy="${y}" r="11">
        ${animate("cx", frames.map(frame => frame[0].split(",")[0]))}
        ${animate("cy", frames.map(frame => frame[0].split(",")[1]))}
      </circle>
    </svg>`;
  }

  window.FitnessRpgChallengeLessons = { lessons, diagram };
})();
