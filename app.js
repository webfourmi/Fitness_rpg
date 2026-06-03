const APP_VERSION = "0.2.1";
const STORAGE_KEY = "sportRpgV1Profile";
const LOG_LIMIT = 12;

const genderLabels = { homme: "Homme", femme: "Femme" };

const sports = [
  { id: "warmup", icon: "🔥", title: "Échauffement", description: "Mobilité douce pour préparer la séance.", exercises: [
    { id: "warmup", title: "Échauffement", unit: "min", defaultValue: 5, min: 1, step: 1, xpPerUnit: 2, stat: "Discipline", pose: "warmup" },
  ]},
  { id: "walk", icon: "🚶", title: "Marche active", description: "Dehors ou sur tapis.", exercises: [
    { id: "walk", title: "Marche active", unit: "min", defaultValue: 30, min: 5, step: 5, xpPerUnit: 1.2, stat: "Endurance", pose: "walk" },
  ]},
  { id: "bike", icon: "🚴", title: "Vélo", description: "Intérieur ou extérieur, rythme confortable.", exercises: [
    { id: "bike", title: "Vélo", unit: "min", defaultValue: 15, min: 5, step: 5, xpPerUnit: 1.7, stat: "Cardio", pose: "bike" },
  ]},
  { id: "pilates", icon: "🧘", title: "Pilates", description: "Renforcement doux, posture et stabilité.", exercises: [
    { id: "pilates", title: "Pilates", unit: "min", defaultValue: 10, min: 5, step: 5, xpPerUnit: 1.3, stat: "Stabilité", pose: "core" },
  ]},
  { id: "strength", icon: "💪", title: "Renforcement", description: "Pompes, mountain climbing, squats et gainage.", exercises: [
    { id: "pushups", title: "Pompes", unit: "répétitions", defaultValue: 10, min: 1, step: 1, xpPerUnit: 1.2, stat: "Force", pose: "core" },
    { id: "mountain", title: "Mountain climbing", unit: "répétitions", defaultValue: 60, min: 10, step: 10, xpPerUnit: 0.3, stat: "Cardio-force", pose: "core" },
    { id: "squats", title: "Squats", unit: "répétitions", defaultValue: 10, min: 1, step: 1, xpPerUnit: 1.1, stat: "Force", pose: "squats" },
    { id: "core", title: "Gainage", unit: "sec", defaultValue: 90, min: 10, step: 5, xpPerUnit: 0.28, stat: "Stabilité", pose: "core" },
  ]},
  { id: "musculation", icon: "🏋️", title: "Musculation", description: "Séance complète de musculation.", exercises: [
    { id: "muscu", title: "Musculation", unit: "min", defaultValue: 30, min: 10, step: 5, xpPerUnit: 1.5, stat: "Force", pose: "core" },
  ]},
  { id: "stretch", icon: "🌿", title: "Étirements", description: "Récupération et souplesse.", exercises: [
    { id: "stretch", title: "Étirements", unit: "min", defaultValue: 10, min: 5, step: 5, xpPerUnit: 1.5, stat: "Souplesse", pose: "stretch" },
  ]},
];

const exercises = sports.flatMap((sport) => sport.exercises.map((exercise) => ({ ...exercise, sportId: sport.id, sportTitle: sport.title })));
const exerciseById = Object.fromEntries(exercises.map((exercise) => [exercise.id, exercise]));
const questPoseMap = Object.fromEntries(exercises.map((exercise) => [exercise.id, exercise.pose]));
const oldToNewExerciseIds = {
  bike15: "bike", pilates10: "pilates", pilates30: "pilates", pilates45: "pilates",
  pushups10: "pushups", pushups15: "pushups", pushups20: "pushups", pushups25: "pushups", pushups30: "pushups",
  mountain60: "mountain", mountain80: "mountain", mountain100: "mountain",
  squats10: "squats", squats20: "squats", squats30: "squats", squats40: "squats",
  muscu30: "muscu", muscu45: "muscu",
};
const strengthExerciseIds = ["pushups", "mountain", "squats", "core", "muscu"];

const coaches = {
  korvan: {
    name: "Korvan",
    fullName: "Coach Korvan le Barbare",
    image: "assets/coach/korvan/idle.jpg",
    fallbackImage: "assets/coach/korvan/image.jpg",
    poses: {
      idle: "assets/coach/korvan/idle.jpg", welcome: "assets/coach/korvan/welcome.jpg", explain: "assets/coach/korvan/explain.jpg", motivate: "assets/coach/korvan/motivate.jpg",
      warmup: "assets/coach/korvan/warmup.jpg", walk: "assets/coach/korvan/walk.jpg", bike: "assets/coach/korvan/bike.jpg", squats: "assets/coach/korvan/squats.jpg",
      core: "assets/coach/korvan/core.jpg", stretch: "assets/coach/korvan/stretch.jpg", victory: "assets/coach/korvan/victory.jpg", levelup: "assets/coach/korvan/levelup.jpg",
    },
    start: ["Debout. Le corps ne devient pas fort en négociant avec le canapé.", "Aujourd’hui, tu gagnes ta ration de gloire.", "Les muscles dorment. Réveille-les."],
    complete: ["Quête accomplie. Tu n’es pas venu pour rien.", "La faiblesse recule d’un pas. Continue."],
    levelUp: ["Niveau supérieur. Ton nom mérite une ligne de plus dans la saga.", "Ton corps se renforce. Les ennemis prennent des notes."],
    byQuest: {
      warmup: ["Échauffe-toi. Même une hache doit être levée avant la bataille."], walk: ["Marche. Chaque pas écrase un peu plus l’ancien toi."], bike: ["Pédale. Que tes jambes deviennent des roues de guerre."], pilates: ["Contrôle et discipline. Même un barbare doit tenir son centre."],
      pushups: ["Les pompes ont parlé. Le sol a perdu."], mountain: ["Mountain climbing. La montagne n’a qu’à bien se tenir."], squats: ["Les jambes forgent leur réputation."], muscu: ["La forge a bien chauffé. Voilà du métal solide."], core: ["Tiens. Un tronc solide porte mieux la légende."], stretch: ["La récupération n’est pas une faiblesse. C’est l’affûtage de la lame."],
    },
  },
  xara: {
    name: "Xara",
    fullName: "Coach Xara la Guerrière",
    image: "assets/coach/xara/xara_idle.jpg",
    fallbackImage: "assets/coach/xara/image.jpg",
    poses: {
      idle: "assets/coach/xara/xara_idle.jpg", welcome: "assets/coach/xara/xara_welcome.jpg", explain: "assets/coach/xara/xara_explain.jpg", motivate: "assets/coach/xara/xara_motivate.jpg",
      warmup: "assets/coach/xara/xara_warmup.jpg", walk: "assets/coach/xara/xara_walk.jpg", bike: "assets/coach/xara/xara_bike.jpg", squats: "assets/coach/xara/xara_squats.jpg",
      core: "assets/coach/xara/xara_core.jpg", stretch: "assets/coach/xara/xara_stretchup.jpg", victory: "assets/coach/xara/xara_victory.jpg", levelup: "assets/coach/xara/xara_levelup.jpg",
    },
    start: ["Allez, guerrier. On commence proprement, on finit fièrement.", "Pas besoin d’être parfait. Besoin d’être présent."],
    complete: ["Bien joué. Ton futur toi vient d’applaudir.", "Tu as tenu. C’est comme ça qu’on construit une légende."],
    levelUp: ["Niveau supérieur ! Tu avances avec panache."],
    byQuest: {
      warmup: ["Une bonne guerrière ne charge pas à froid."], walk: ["Garde l’allure. La régularité gagne plus de combats que l’orgueil."], bike: ["Trouve ton rythme. Respiration stable, jambes efficaces."], pilates: ["Contrôle précis. Très bon choix."],
      pushups: ["Pompes propres. Appuis solides."], mountain: ["Rythme propre, bassin stable."], squats: ["Les jambes construisent la victoire."], muscu: ["Séance carrée. Travail sérieux."], core: ["Tiens la position. Le combat se gagne aussi dans l’immobilité."], stretch: ["Récupère avec sérieux. La souplesse protège le guerrier."],
    },
  },
  violette: {
    name: "Violette", fullName: "Coach Violette la Halfeline", image: "assets/coach/violette/image.jpg",
    start: ["On y va doucement, mais on y va vraiment !", "Petit pas, grand progrès. Aujourd’hui, on avance."], complete: ["Bravo ! Une quête de plus dans la besace.", "Tu avances mieux que tu ne le crois, continue !"], levelUp: ["Niveau supérieur ! Ça mérite presque un second petit déjeuner."],
    byQuest: { warmup: ["On réveille doucement la machine."], walk: ["Une bonne marche, c’est une aventure qui a mis de bonnes chaussures."], bike: ["Tes jambes tournent, ton XP monte. Belle affaire !"], pilates: ["Pilates bien placé. Petit effort, vrai progrès."], stretch: ["On s’étire, on respire, on remet le corps en mode velours."] },
  },
  elmin: {
    name: "Elmin", fullName: "Coach Elmin le Mage", image: "assets/coach/elmin/image.jpg",
    start: ["Concentre-toi. Chaque répétition est un sort bien exécuté.", "La régularité est une magie discrète, mais puissante."], complete: ["Excellent. L’effort a été canalisé avec précision.", "Très bien. Tu gagnes en maîtrise autant qu’en force."], levelUp: ["Niveau supérieur. Les résultats suivent la discipline."],
    byQuest: { warmup: ["Le rituel commence par la préparation."], walk: ["La marche est une magie ancienne : simple, lente, efficace."], bike: ["Pédale avec méthode. Le souffle est ton métronome."], pilates: ["Le centre s’éveille."], stretch: ["La souplesse est une magie lente. Ne la brusque pas."] },
  },
  bazul: {
    name: "Bazul",
    fullName: "Coach Bazul le Nain",
    image: "assets/coach/bazul/image.jpg",
    start: ["Allez, on s’y met. Une montagne ne se taille pas en la regardant.", "Pieds au sol, souffle stable. On construit solide.", "Pas besoin d’élégance. Besoin de régularité et de pierre dure."],
    complete: ["Bon travail. C’est propre, dense, compact. Du vrai ouvrage nain.", "Une entrée de plus dans la pierre. Ça compte.", "Tu as fait le boulot. Maintenant on recommencera, et mieux encore."],
    levelUp: ["Niveau supérieur ! Voilà une progression qu’on pourrait graver sur une enclume.", "Tu montes d’un rang. La forge intérieure chauffe bien."],
    byQuest: {
      warmup: ["On chauffe les articulations. Même le granit fissure si on le brusque."], walk: ["Marche ferme. Talon solide, regard devant."], bike: ["Pédale rond. Une roue bien menée vaut un marteau bien tenu."], pilates: ["Le centre d’abord. Une bonne voûte tient par sa clef."],
      pushups: ["Pompes validées. Bras solides, poitrine haute."], mountain: ["Mountain climbing. Grimpe dans l’axe, pas comme un gobelin ivre."], squats: ["Squats. Les jambes sont les piliers de la forteresse."], muscu: ["Musculation faite. La forge a gagné du minerai."], core: ["Gainage. Tronc verrouillé comme une porte de mine."], stretch: ["Étirements. On entretient l’outil après le travail."],
    },
  },
  satyne: {
    name: "Satyne",
    fullName: "Coach Satyne la Sorcière",
    image: "assets/coach/satyne/image.jpg",
    start: ["Viens, mon petit sort d’endurance. On va réveiller les muscles endormis.", "Un souffle, un geste, une goutte d’effort. La potion commence.", "Aujourd’hui, on transforme la fatigue en poussière d’étoile."],
    complete: ["Rituel accompli. Ton corps vient de gagner un ingrédient rare.", "Très bien. Je sens l’énergie circuler, et elle a de jolies dents.", "Une belle entrée dans le grimoire. Continue, l’alchimie prend."],
    levelUp: ["Niveau supérieur ! La métamorphose est en marche.", "Le cercle s’illumine. Tu viens de franchir un seuil."],
    byQuest: {
      warmup: ["Échauffement lancé. On délie les charnières du pantin héroïque."], walk: ["Marche active. Chaque pas trace un glyphe sous tes pieds."], bike: ["Vélo. Fais tourner la roue, fais monter l’incantation."], pilates: ["Pilates. Le centre du corps devient un petit chaudron stable."],
      pushups: ["Pompes. La terre reçoit ton pacte, puis te repousse."], mountain: ["Mountain climbing. Grimpe, grimpe, le démon du cardio te suit."], squats: ["Squats. Plie, remonte, cueille la force dans les genoux."], muscu: ["Musculation. Une pincée de fer, deux gouttes de volonté."], core: ["Gainage. Ne bouge plus. Même les ombres prennent exemple."], stretch: ["Étirements. On rallonge les fils de la marionnette sans les casser."],
    },
  },
};

let profile = null, currentView = "setup", pose = "idle", audioCtx = null, pulseTimer = null, pulseOn = false, openedSportId = null;
let musicStatus = "Aucune musique choisie.";
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const el = {
  setupPanel: $("#setupPanel"), dashboard: $("#dashboard"), homePanel: $("#homePanel"), editorPanel: $("#editorPanel"), heroCreationFields: $("#heroCreationFields"), homeHeroSummary: $("#homeHeroSummary"), homeCoachSummary: $("#homeCoachSummary"), setupTitle: $("#setupTitle"), setupHelp: $("#setupHelp"), appVersionLabel: $("#appVersionLabel"), appVersionLabelEditor: $("#appVersionLabelEditor"), name: $("#playerNameInput"), age: $("#playerAgeInput"), create: $("#createProfileBtn"), cont: $("#continueProfileBtn"), changeCoach: $("#changeCoachBtn"), newHero: $("#startCreateHeroBtn"), saveCoach: $("#saveCoachBtn"), cancel: $("#cancelSetupBtn"), reset: $("#resetProfileBtn"), home: $("#homeBtn"), heroPortrait: $("#heroPortrait"), heroName: $("#heroName"), avatarLabel: $("#avatarLabel"), rank: $("#rankLabel"), level: $("#levelLabel"), xp: $("#xpLabel"), bar: $("#xpBar"), total: $("#totalXpLabel"), streak: $("#streakLabel"), done: $("#doneTodayLabel"), coachName: $("#coachName"), coachPortrait: $("#coachPortrait"), coachMsg: $("#coachMessage"), newMsg: $("#newCoachMessageBtn"), choice: $("#coachChoiceGrid"), genderChoice: $("#genderChoiceGrid"), sportHub: $("#sportHub"), musicPage: $("#musicPage"), questsPage: $("#questsPage"), weekPage: $("#weekPage"), badgesPage: $("#badgesPage"), musicSummary: $("#currentMusicSummary"), questSummary: $("#currentQuestSummary"), openMusic: $("#openMusicBtn"), openQuests: $("#openQuestsBtn"), openWeek: $("#openWeekBtn"), openBadges: $("#openBadgesBtn"), questsList: $("#questsList"), resetDaily: $("#resetDailyBtn"), weekList: $("#weekList"), badgesList: $("#badgesList"), logCard: $("#logCard"), logList: $("#logList"), clearLog: $("#clearLogBtn"), audioInput: $("#audioFileInput"), audio: $("#audioPlayer"), pulse: $("#pulseMusicBtn"), stop: $("#stopPulseBtn")
};

function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(profile))}
function load(){try{profile=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");currentView=profile?"home":"setup"}catch{profile=null;currentView="setup"}}
function need(level){return 100+(level-1)*25}
function levelInfo(xp){let level=1,remaining=xp;while(remaining>=need(level)){remaining-=need(level);level+=1}return{level,currentXp:remaining,nextXp:need(level)}}
function stage(level){if(level>=30)return 5;if(level>=20)return 4;if(level>=10)return 3;if(level>=5)return 2;return 1}
function rank(stageNumber){return["","Débutant","Mise en forme","Sportif régulier","Athlétique","Héros confirmé"][stageNumber]}
function coachImg(id,wantedPose="idle"){const coach=coaches[id];return coach?.poses?.[wantedPose]||coach?.fallbackImage||coach?.image||""}
function safeCoachImage(img,id,wantedPose="idle"){const coach=coaches[id],preferred=coachImg(id,wantedPose),fallback=coach?.fallbackImage||coach?.image||preferred;img.onerror=()=>{img.onerror=null;if(!img.src.endsWith(fallback))img.src=fallback};img.src=preferred}
function pick(list){return list[Math.floor(Math.random()*list.length)]}
function selectedCoach(){return $('input[name="coach"]:checked')?.value||"korvan"}
function selectedGender(){return $('input[name="gender"]:checked')?.value||"homme"}
function profileLabel(){const gender=genderLabels[profile.gender||"homme"],age=profile.age?`${profile.age} ans`:"âge non renseigné";return `${gender} · ${age}`}
function msg(type){const coach=coaches[profile.coach];return pick(coach[type]||coach.start)}
function exerciseMessage(id){const normalized=oldToNewExerciseIds[id]||id,coach=coaches[profile.coach],list=coach.byQuest?.[normalized];return list?pick(list):msg("complete")}
function log(text){profile.log.unshift(`${new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})} · ${text}`);profile.log=profile.log.slice(0,LOG_LIMIT)}
function entriesToday(){const list=profile.completedByDate[today()]||[];return Array.isArray(list)?list:[]}
function setEntries(list){profile.completedByDate[today()]=list}
function entryId(entry){return typeof entry==="string"?entry:entry.id}
function normalizedEntryId(entry){return oldToNewExerciseIds[entryId(entry)]||entryId(entry)}
function updateStreak(){const t=today();if(profile.lastActiveDate===t)return;const y=new Date();y.setDate(y.getDate()-1);const ky=`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}-${String(y.getDate()).padStart(2,"0")}`;profile.streak=profile.lastActiveDate===ky?profile.streak+1:1;profile.lastActiveDate=t}
function calcXp(exercise,amount){return Math.max(1,Math.round((exercise.xpBase||0)+amount*exercise.xpPerUnit))}
function completeExercise(id,amount){const exercise=exerciseById[id];if(!exercise)return;const value=Number(amount);if(!Number.isFinite(value)||value<exercise.min){alert(`Entre une valeur d’au moins ${exercise.min} ${exercise.unit}.`);return}const oldLevel=levelInfo(profile.totalXp).level,xp=calcXp(exercise,value),list=entriesToday();list.push({id:exercise.id,sportId:exercise.sportId,sportTitle:exercise.sportTitle,title:exercise.title,amount:value,unit:exercise.unit,xp,at:new Date().toISOString()});setEntries(list);updateStreak();profile.totalXp+=xp;profile.xp+=xp;pose=exercise.pose||"victory";log(`+${xp} XP · ${exercise.sportTitle} · ${exercise.title} (${value} ${exercise.unit})`);const newLevel=levelInfo(profile.totalXp).level;if(newLevel>oldLevel){pose="levelup";log(`Niveau ${newLevel} atteint !`);el.coachMsg.textContent=msg("levelUp")}else el.coachMsg.textContent=exerciseMessage(id);save();render()}
function render(){const hasProfile=Boolean(profile),isDashboard=hasProfile&&["dashboard","music","quests","week","badges"].includes(currentView);if(el.appVersionLabel)el.appVersionLabel.textContent=APP_VERSION;if(el.appVersionLabelEditor)el.appVersionLabelEditor.textContent=APP_VERSION;el.home?.classList.toggle("hidden",!isDashboard);if(!isDashboard){el.setupPanel.classList.remove("hidden");el.dashboard.classList.add("hidden");const isHome=hasProfile&&currentView==="home",isCoach=hasProfile&&currentView==="coach";el.homePanel.classList.toggle("hidden",!isHome);el.editorPanel.classList.toggle("hidden",isHome);if(isHome){const info=levelInfo(profile.totalXp);el.homeHeroSummary.textContent=`${profile.name} · ${profileLabel()} · Niveau ${info.level} · ${profile.totalXp} XP`;el.homeCoachSummary.textContent=`Coach actuel : ${coaches[profile.coach].fullName}`;return}el.heroCreationFields.classList.toggle("hidden",isCoach);el.create.classList.toggle("hidden",isCoach);el.saveCoach.classList.toggle("hidden",!isCoach);el.cancel.classList.toggle("hidden",!hasProfile);el.setupTitle.textContent=isCoach?"Changer de coach":"Créer ton héros";el.setupHelp.textContent=isCoach?"Choisis un nouveau coach. Ton XP et ton niveau seront conservés.":"Choisis ton profil et ton coach pour commencer.";if(isCoach)selectCoach(profile.coach);syncCards();syncGenderCards();return}el.setupPanel.classList.add("hidden");el.dashboard.classList.remove("hidden");const pages={dashboard:el.sportHub,music:el.musicPage,quests:el.questsPage,week:el.weekPage,badges:el.badgesPage};Object.entries(pages).forEach(([name,panel])=>panel?.classList.toggle("hidden",currentView!==name));el.logCard?.classList.toggle("hidden",currentView!=="dashboard");if(currentView==="music")pose="motivate";if(currentView==="quests")pose="explain";if(currentView==="week")pose="welcome";if(currentView==="badges")pose="victory";const info=levelInfo(profile.totalXp),currentStage=stage(info.level),todayEntries=entriesToday(),coach=coaches[profile.coach];el.heroName.textContent=profile.name;el.avatarLabel.textContent=profileLabel();el.rank.textContent=`${rank(currentStage)} · stade ${currentStage}`;el.level.textContent=`Niveau ${info.level}`;el.xp.textContent=`${info.currentXp} / ${info.nextXp} XP`;el.bar.style.width=`${Math.min(100,Math.round(info.currentXp/info.nextXp*100))}%`;el.total.textContent=profile.totalXp;el.streak.textContent=profile.streak;el.done.textContent=todayEntries.length;el.coachName.textContent=coach.fullName;safeCoachImage(el.coachPortrait,profile.coach,pose);el.coachPortrait.alt=coach.fullName;el.heroPortrait.innerHTML=heroSvg(currentStage);renderExercises(todayEntries);renderWeek();renderBadges();renderLog();summaries()}
function renderExercises(todayEntries){el.questsList.innerHTML="";sports.forEach(sport=>{const article=document.createElement("article"),isOpen=openedSportId===sport.id,doneCount=todayEntries.filter(entry=>exerciseById[normalizedEntryId(entry)]?.sportId===sport.id).length;article.className=`sport-item${isOpen?" open":""}`;article.innerHTML=`<button class="sport-toggle" type="button"><span class="sport-icon">${sport.icon}</span><span><strong>${sport.title}</strong><small>${sport.description}</small></span><em>${doneCount} fait${doneCount>1?"s":""}</em></button><div class="duration-grid ${isOpen?"":"hidden"}"></div>`;article.querySelector(".sport-toggle").onclick=()=>{openedSportId=openedSportId===sport.id?null:sport.id;renderExercises(entriesToday())};const grid=article.querySelector(".duration-grid");sport.exercises.forEach(exercise=>{const doneForExercise=todayEntries.filter(entry=>normalizedEntryId(entry)===exercise.id).length,card=document.createElement("div"),estimate=calcXp(exercise,exercise.defaultValue);card.className="duration-btn";card.innerHTML=`<strong>${exercise.title}</strong><span>${exercise.stat}</span><label class="amount-label">${exercise.unit}<input class="exercise-amount" type="number" min="${exercise.min}" step="${exercise.step}" value="${exercise.defaultValue}" data-exercise-id="${exercise.id}"></label><span class="xp-preview">≈ ${estimate} XP</span><button class="primary-btn validate-exercise-btn" type="button" data-exercise-id="${exercise.id}">Valider</button>${doneForExercise?`<span class="done-note">Déjà validé ${doneForExercise} fois aujourd’hui</span>`:""}`;const input=card.querySelector(".exercise-amount"),preview=card.querySelector(".xp-preview");input.addEventListener("input",()=>{preview.textContent=`≈ ${calcXp(exercise,Number(input.value)||0)} XP`});card.querySelector(".validate-exercise-btn").onclick=()=>completeExercise(exercise.id,input.value);grid.appendChild(card)});el.questsList.appendChild(article)})}
function renderWeek(){if(!el.weekList||!profile)return;const start=new Date(),day=(start.getDay()+6)%7;start.setDate(start.getDate()-day);const names=["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];el.weekList.innerHTML="";for(let i=0;i<7;i+=1){const d=new Date(start);d.setDate(start.getDate()+i);const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`,items=profile.completedByDate[key]||[],count=Array.isArray(items)?items.length:0,item=document.createElement("div");item.className=`week-day${key===today()?" today":""}${count?" active":""}`;item.innerHTML=`<strong>${names[i]}</strong><span>${count} entrée${count>1?"s":""}</span>`;el.weekList.appendChild(item)}}
function allEntries(){return Object.values(profile?.completedByDate||{}).flat()}
function countExercise(id){return allEntries().filter(entry=>normalizedEntryId(entry)===id).length}
function countMany(ids){return ids.reduce((total,id)=>total+countExercise(id),0)}
function renderBadges(){if(!el.badgesList||!profile)return;const total=allEntries().length,full=Object.values(profile.completedByDate||{}).some(items=>Array.isArray(items)&&new Set(items.map(normalizedEntryId)).size>=exercises.length);const badges=[["👣","Premier pas","Valider une première entrée.",total>=1],["🔥","Élan du héros","Valider 3 entrées au total.",total>=3],["🏆","Journée complète","Valider tous les exercices disponibles d’une journée.",full],["📅","Régulier","Atteindre 3 jours de série.",profile.streak>=3],["🚴","Cycliste novice","Valider 5 séances de vélo.",countExercise("bike")>=5],["🧘","Pilates novice","Valider 3 séances de Pilates.",countExercise("pilates")>=3],["💪","Force tranquille","Valider 10 séances de renforcement ou musculation.",countMany(strengthExerciseIds)>=10],["🏋️","Fonte héroïque","Valider 3 séances de musculation.",countExercise("muscu")>=3]];el.badgesList.innerHTML="";badges.forEach(badge=>{const item=document.createElement("article");item.className=`badge-item${badge[3]?" unlocked":""}`;item.innerHTML=`<div class="badge-icon">${badge[0]}</div><div><strong>${badge[1]}</strong><p>${badge[2]}</p><span>${badge[3]?"Débloqué":"Verrouillé"}</span></div>`;el.badgesList.appendChild(item)})}
function renderLog(){el.logList.innerHTML="";const entries=profile.log.length?profile.log:["Aucune quête accomplie pour l’instant."];entries.forEach(entry=>{const li=document.createElement("li");li.textContent=entry;el.logList.appendChild(li)})}
function summaries(){const todayEntries=entriesToday(),last=todayEntries.at(-1);if(last&&typeof last==="object")el.questSummary.textContent=`Dernière entrée : ${last.sportTitle} · ${last.title} (${last.amount} ${last.unit})`;else if(last){const exercise=exerciseById[normalizedEntryId(last)];el.questSummary.textContent=exercise?`Dernière entrée : ${exercise.sportTitle} · ${exercise.title}`:"Dernière entrée enregistrée"}else el.questSummary.textContent="Aucune entrée validée aujourd’hui.";el.musicSummary.textContent=musicStatus}
function syncCards(){$$(".coach-choice-card").forEach(card=>{const id=card.dataset.coachCard,input=card.querySelector('input[name="coach"]');card.classList.toggle("active",input.checked);const img=card.querySelector("img");if(img&&coaches[id]){safeCoachImage(img,id,"idle");img.alt=coaches[id].fullName}})}
function syncGenderCards(){$$(".gender-choice-card").forEach(card=>{const input=card.querySelector('input[name="gender"]');card.classList.toggle("active",input.checked)})}
function selectCoach(id){const input=$(`input[name="coach"][value="${id}"]`);if(input)input.checked=true;syncCards()}
function heroSvg(currentStage){return `<svg viewBox="0 0 320 430"><rect width="320" height="430" fill="#151722"/><circle cx="160" cy="190" r="${90+currentStage*10}" fill="#f0b84f" opacity=".${currentStage+1}"/><ellipse cx="160" cy="386" rx="104" ry="20" fill="#f0b84f" opacity=".18"/><path d="M110 365 C120 230 200 230 210 365Z" fill="${currentStage>=4?"#f0b84f":currentStage>=2?"#4f8ef0":"#6f7688"}"/><circle cx="160" cy="125" r="45" fill="#d6b274"/><path d="M116 116 C122 62 198 62 204 116 C190 92 132 92 116 116Z" fill="#2b1b13"/><circle cx="145" cy="126" r="4"/><circle cx="175" cy="126" r="4"/><path d="M146 146 C153 152 167 152 174 146" stroke="#3b2419" stroke-width="4" fill="none"/><text x="160" y="38" fill="#f5f2e8" text-anchor="middle" font-size="18" font-weight="800">${rank(currentStage)}</text><text x="160" y="62" fill="#f0b84f" text-anchor="middle" font-size="14" font-weight="700">Stade ${currentStage}</text></svg>`}
async function startPulse(){stopPulse();audioCtx=new(window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==="suspended")await audioCtx.resume();pulseOn=true;musicStatus="Pulse épique en cours";let beat=0;pulseTimer=setInterval(()=>{const oscillator=audioCtx.createOscillator(),gain=audioCtx.createGain();oscillator.type="sine";oscillator.frequency.value=beat++%4?330:220;gain.gain.setValueAtTime(0.001,audioCtx.currentTime);gain.gain.exponentialRampToValueAtTime(0.18,audioCtx.currentTime+0.02);gain.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+0.22);oscillator.connect(gain).connect(audioCtx.destination);oscillator.start();oscillator.stop(audioCtx.currentTime+0.24)},420);summaries()}
function stopPulse(){if(pulseTimer)clearInterval(pulseTimer);pulseTimer=null;if(audioCtx)audioCtx.close();audioCtx=null;if(pulseOn)musicStatus="Pulse arrêtée";pulseOn=false}
el.create.onclick=()=>{const id=selectedCoach(),ageValue=Number(el.age.value);profile={name:el.name.value.trim()||"Héros",gender:selectedGender(),age:Number.isFinite(ageValue)&&ageValue>0?ageValue:null,coach:id,xp:0,totalXp:0,completedByDate:{},streak:0,lastActiveDate:null,log:[]};currentView="dashboard";pose="welcome";log(`Aventure commencée avec ${coaches[id].name}.`);save();render();el.coachMsg.textContent=msg("start")};
el.reset.onclick=()=>{if(confirm("Réinitialiser tout le profil ?")){stopPulse();localStorage.removeItem(STORAGE_KEY);profile=null;currentView="setup";pose="idle";render()}};
el.home.onclick=()=>{currentView="home";pose="welcome";render()};el.cont.onclick=()=>{currentView="dashboard";pose="idle";render()};el.newHero.onclick=()=>{currentView="setup";render()};el.changeCoach.onclick=()=>{currentView="coach";selectCoach(profile.coach);render()};el.saveCoach.onclick=()=>{const id=selectedCoach();profile.coach=id;pose="welcome";log(`Nouveau coach choisi : ${coaches[id].name}.`);save();currentView="home";render()};el.cancel.onclick=()=>{currentView=profile?"home":"setup";render()};el.newMsg.onclick=()=>{pose="motivate";el.coachMsg.textContent=msg("start");render()};el.resetDaily.onclick=()=>{setEntries([]);log("Les entrées du jour sont effacées.");save();render()};el.clearLog.onclick=()=>{profile.log=[];save();renderLog()};
el.audioInput.onchange=async(event)=>{const file=event.target.files?.[0];if(!file)return;stopPulse();const url=URL.createObjectURL(file);el.audio.src=url;el.audio.load();musicStatus=`Morceau chargé : ${file.name}`;try{await el.audio.play();musicStatus=`Lecture : ${file.name}`}catch{musicStatus=`Morceau chargé : ${file.name}. Appuie sur ▶ dans le lecteur.`}summaries()};
el.audio.onplay=()=>{if(el.audio.src){musicStatus="Lecture audio en cours";summaries()}};el.audio.onpause=()=>{if(el.audio.src){musicStatus="Audio en pause";summaries()}};el.audio.onended=()=>{musicStatus="Morceau terminé";summaries()};
el.pulse.onclick=()=>{startPulse()};el.stop.onclick=()=>{stopPulse();summaries()};el.openMusic.onclick=()=>{currentView="music";render()};el.openQuests.onclick=()=>{currentView="quests";render()};el.openBadges.onclick=()=>{currentView="badges";render()};el.openWeek.onclick=()=>{currentView="week";render()};$$('.back-dashboard-btn').forEach(button=>{button.onclick=()=>{currentView="dashboard";render()}});el.choice?.addEventListener("change",syncCards);el.genderChoice?.addEventListener("change",syncGenderCards);$$('.coach-choice-card').forEach(card=>{card.onclick=()=>{card.querySelector('input[name="coach"]').checked=true;syncCards()}});$$('.gender-choice-card').forEach(card=>{card.onclick=()=>{card.querySelector('input[name="gender"]').checked=true;syncGenderCards()}});
load();syncCards();syncGenderCards();render();