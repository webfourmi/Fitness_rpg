/* Fitness RPG · Épreuves du Héros. Données indépendantes des sauvegardes existantes. */
(function () {
  "use strict";
  const KEY = "fitnessRpgHeroChallengesV1";
  const CHALLENGES = [
    {id:"squats",name:"Le Trône de Fer",exercise:"Squats",unit:"répétitions",seconds:60,icon:"🏰"},
    {id:"pushups",name:"Le Bouclier du Héros",exercise:"Pompes",unit:"répétitions",seconds:60,icon:"🛡️"},
    {id:"crunches",name:"Le Rituel des Abdominaux",exercise:"Crunchs",unit:"répétitions",seconds:60,icon:"✨"},
    {id:"plank",name:"La Muraille du Gardien",exercise:"Planche",unit:"secondes",seconds:180,icon:"🧱",hold:true},
    {id:"wall",name:"Le Siège de la Forteresse",exercise:"Chaise contre un mur",unit:"secondes",seconds:180,icon:"⚔️",hold:true},
    {id:"jacks",name:"La Danse des Lames",exercise:"Jumping jacks",unit:"répétitions",seconds:60,icon:"🔥"}
  ];
  const today = () => {const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-");};
  const read = () => {try {const v=JSON.parse(localStorage.getItem(KEY)||"{}");return v&&typeof v==="object"?v:{};}catch{return {};}};
  const save = data => {try{localStorage.setItem(KEY,JSON.stringify(data));return true;}catch{return false;}};
  let timer=null, started=0, elapsed=0, phase="idle", selected=null;
  let variant=false, playing=false, opener=null, demoFrame=null;
  const recordLines={
    korvan:"Ton nouveau record mérite une ligne dans la saga !",
    xara:"Un nouveau record gagné à la force de ta discipline !",
    violette:"Ton entraînement porte ses fruits. Savoure ce nouveau record !",
    elmin:"Observe le chemin parcouru. Tu viens d’établir un nouveau record !",
    bazul:"Un nouveau record ! On le grave dans la pierre ?",
    satyne:"Un nouveau record entre dans ta légende. Prends le temps de l’apprécier."
  };
  const root=()=>document.getElementById("heroChallengesOverlay");
  const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function clearTimer(){if(timer!==null){clearInterval(timer);timer=null;}}
  function close(){if(["running","score"].includes(phase)){if(!confirm("Abandonner cette tentative officielle ?"))return;abandon();}clearTimer();phase="idle";root()?.remove();
    opener?.focus();
    opener=null;}
  function entry(id){return read()[id]||{history:[]};}
  function showList(){
    clearTimer();phase="idle";selected=null;payRewards();
    const rows=CHALLENGES.map(c=>{const e=entry(c.id),done=e.lastDay===today();
      return '<button class="hero-challenge-item" data-challenge="'+c.id+'"><span>'+c.icon+'</span><span><strong>'+escapeHtml(c.name)+'</strong><small>'+escapeHtml(c.exercise)+' · Record : '+(e.best??"—")+' '+escapeHtml(c.unit)+'</small></span><span>'+(done?"✓":"›")+'</span></button>';
    }).join("");
    draw('<h2>⚔️ Les Épreuves du Héros</h2><p>Une tentative officielle par épreuve et par jour. Les records sont personnels.</p>'+rows);
  }
  function draw(html){
    stopMotion();
    if(!root()){const node=document.createElement("div");node.id="heroChallengesOverlay";node.className="hero-challenge-overlay";document.body.appendChild(node);}
    root().innerHTML='<section class="hero-challenge-dialog" role="dialog" aria-modal="true" aria-label="Épreuves du Héros"><button type="button" class="hero-challenge-close" data-action="close" aria-label="Fermer">✕</button>'+html+'</section>';
    const title=root().querySelector?.('h2');
    title?.setAttribute('tabindex', '-1');
    title?.focus();
  }
  function coachPanel(stage, message) {
    const coaches=window.FitnessRpgData?.coaches;
    const state=window.FitnessRpgState;
    const coach=coaches?.[state?.getCoachId?.() || state?.getProfile?.()?.coachId] || coaches?.korvan;
    if (!coach) return message ? '<p>'+escapeHtml(message)+'</p>' : "";
    const line=stage==="record" ? recordLines[coach.id] : message || coach[stage]?.[0];
    return '<div class="hero-challenge-coach"><img src="'+escapeHtml(coach.image)
      +'" alt="" width="64" height="64"><div><strong>'+escapeHtml(coach.name)
      +'</strong><p>'+escapeHtml(line || "")+'</p></div></div>';
  }

  function renderLesson() {
    const panel=root()?.querySelector?.(".hero-challenge-lesson");
    const library=window.FitnessRpgChallengeLessons;
    const lesson=library?.lessons[selected.id];
    if (!panel || !lesson) return;
    stopMotion();
    panel.innerHTML=library.diagram(lesson, variant)
      +'<div class="hero-challenge-demo-controls"><button type="button" class="hero-challenge-secondary" data-action="challenge-motion"></button>'
      +'<button type="button" class="hero-challenge-secondary" data-action="challenge-variant" aria-pressed="'+variant+'">Variante · '+escapeHtml(lesson.variant)+'</button></div>'
      +coachPanel("technique", variant ? lesson.easier : lesson.tip)
      +(variant ? '<p class="hero-challenge-note">Variante pour l’entraînement libre, sans enregistrement de score.</p>' : "");
    setMotion(playing);
  }

  function stopMotion() {
    if (demoFrame!==null) window.cancelAnimationFrame(demoFrame);
    demoFrame=null;
  }

  function setMotion(enabled) {
    const svg=root()?.querySelector(".hero-challenge-diagram");
    if (!svg) return;
    const button=root().querySelector('[data-action="challenge-motion"]');
    stopMotion();
    playing=enabled;
    button.textContent=playing ? "Mettre en pause" : "Lire la démonstration";

    // Piloter le temps de la démonstration permet de reprendre exactement à
    // la même pose et de limiter la boucle au seul panneau visible.
    svg.pauseAnimations();
    if (!svg.dataset.ready) {
      svg.setCurrentTime(0);
      svg.dataset.ready="true";
    }
    if (!playing) return;
    const offset=svg.getCurrentTime();
    const start=performance.now();
    const duration=Number(svg.dataset.duration);
    function frame(now) {
      svg.setCurrentTime((offset+Math.max(0,now-start)/1000)%duration);
      demoFrame=window.requestAnimationFrame(frame);
    }
    demoFrame=window.requestAnimationFrame(frame);
  }

  function open(id){
    const c=CHALLENGES.find(x=>x.id===id);if(!c)return;
    selected=c;phase="idle";variant=false;
    playing=!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const e=entry(c.id),done=e.lastDay===today();
    const title = window.FitnessRpgCamp?.getChallengeTitle?.(c.id, e.history);
    const titleHtml = title ? '<p class="hero-challenge-note"><strong>'+escapeHtml(title.name)+'</strong> · '+title.days+' / 5 jours validés'+(title.days === 5 ? ' · Titre débloqué' : '')+'</p>' : '';
    draw('<button data-action="back" class="hero-challenge-secondary">← Épreuves</button><h2>'+c.icon+' '+escapeHtml(c.name)+'</h2><p>'+escapeHtml(c.exercise)+' · '+(c.hold?"Maintenir la position, jusqu’à 3 minutes.":"Maximum de répétitions correctes en 60 secondes.")+'</p><div class="hero-challenge-lesson"></div><p class="hero-challenge-record">🏆 Record personnel : <strong>'+(e.best??"—")+'</strong> '+escapeHtml(c.unit)+'</p>'+titleHtml+(done?'<p class="hero-challenge-notice">Tentative officielle déjà effectuée aujourd’hui. Reviens demain !</p>':'<button class="hero-challenge-primary" data-action="prepare">Commencer l’épreuve</button>')+'<p class="hero-challenge-note">Arrête en cas de douleur ou de malaise. Échauffe-toi avant de commencer.</p>');
    renderLesson();
  }
  function prepare(){
    if(!window.FitnessRpgState?.getProfile?.()){alert("Crée d’abord ton héros pour participer aux épreuves.");return;}
    if(!selected||entry(selected.id).lastDay===today())return open(selected?.id);
    phase="preparing";let remaining=10;
    draw('<h2>Prépare-toi</h2><p>Positionne-toi et vérifie ta technique.</p>'+coachPanel("start")+'<div class="hero-challenge-clock" id="heroChallengeClock">10</div><button data-action="cancel" class="hero-challenge-secondary">Annuler</button>');
    clearTimer();timer=setInterval(()=>{if(phase!=="preparing")return clearTimer();remaining--;const el=document.getElementById("heroChallengeClock");if(el)el.textContent=remaining;if(remaining<=0)start();},1000);
  }
  function start(){
    clearTimer();if(!selected)return;
    const data=read(),e=data[selected.id]||{history:[]};
    if(e.lastDay===today())return open(selected.id);
    e.lastDay=today();e.pending={date:today(),startedAt:Date.now()};data[selected.id]=e;
    if(!save(data)){phase="idle";draw('<h2>Stockage indisponible</h2><p>Impossible de sauvegarder la tentative. Vérifie l’espace de stockage du navigateur.</p><button data-action="back">Retour</button>');return;}
    phase="running";started=performance.now();elapsed=0;
    draw('<h2>'+escapeHtml(selected.name)+'</h2><p>Épreuve en cours</p>'+coachPanel("start")+'<div class="hero-challenge-clock" id="heroChallengeClock">'+selected.seconds+'</div><button data-action="finish" class="hero-challenge-primary">'+(selected.hold?"Arrêter le maintien":"Terminer maintenant")+'</button><button data-action="abandon" class="hero-challenge-secondary">Abandonner</button>');
    timer=setInterval(()=>{if(phase!=="running")return clearTimer();elapsed=Math.min(selected.seconds,Math.floor((performance.now()-started)/1000));const el=document.getElementById("heroChallengeClock");if(el)el.textContent=Math.max(0,selected.seconds-elapsed);if(elapsed>=selected.seconds)finish();},100);
  }
  function finish(){
    if(phase!=="running")return;elapsed=Math.min(selected.seconds,Math.floor((performance.now()-started)/1000));clearTimer();phase="score";
    draw('<h2>Épreuve terminée !</h2><p>Temps écoulé : '+elapsed+' secondes</p><label for="heroChallengeScore">Résultat ('+escapeHtml(selected.unit)+')</label><input id="heroChallengeScore" type="number" min="0" max="9999" step="1" inputmode="numeric" value="'+(selected.hold?elapsed:"")+'"><button class="hero-challenge-primary" data-action="save">Valider mon résultat</button><button class="hero-challenge-secondary" data-action="abandon">Abandonner</button>');
  }
  function abandon(){
    clearTimer();if(selected){const d=read(),e=d[selected.id];if(e?.pending){e.history=Array.isArray(e.history)?e.history:[];e.history.push({date:today(),status:"abandoned"});delete e.pending;save(d);}}
    phase="idle";if(selected)open(selected.id);else showList();
  }

  // Les récompenses sont créditées dans le profil officiel, avec un journal de
  // créances idempotent. Un score sauvegardé mais non payé est régularisé au retour.
  function rewardFor(id, item, previousCompleted, previousBest, previousWeeklyRecord) {
    const first = !previousCompleted;
    const record = previousBest === null || item.score > previousBest;
    const week = item.date.slice(0,7) + "-W" + isoWeek(item.date);
    const recordBonus = record && previousWeeklyRecord !== week;
    return { xp:(first?30:5)+(recordBonus?40:0), gold:(first?15:2)+(recordBonus?20:0), recordBonus, week };
  }
  function isoWeek(day) {
    const d=new Date(day+"T12:00:00");d.setDate(d.getDate()+4-(d.getDay()||7));
    const year=new Date(d.getFullYear(),0,1);
    return Math.ceil((((d-year)/86400000)+1)/7);
  }
  function payRewards() {
    const state=window.FitnessRpgState, config=window.FitnessRpgConfig;
    const profile=state?.getProfile?.();
    if(!profile||!config?.levelInfo||!window.FitnessRpgCamp?.migrate)return {xp:0,gold:0,paid:false};
    const records=read();let xp=0,gold=0,changed=false;
    const oldProfile=structuredClone(profile);
    const ledger=profile.heroChallengeClaims&&typeof profile.heroChallengeClaims==="object"
      ?profile.heroChallengeClaims:{};
    try {
      for(const c of CHALLENGES) {
        const history=Array.isArray(records[c.id]?.history)?records[c.id].history:[];
        let best=null,completed=false,weeklyRecord=null;
        for(const item of history) {
          if(item.status!=="completed"||!Number.isSafeInteger(item.score)||item.score<0)continue;
          const key=c.id+":"+item.date;
          const earned=rewardFor(c.id,item,completed,best,weeklyRecord);
          if(!ledger[key]) {
            xp+=earned.xp;gold+=earned.gold;changed=true;
            ledger[key]={xp:earned.xp,gold:earned.gold};
          }
          if(earned.recordBonus)weeklyRecord=earned.week;
          best=Math.max(best??0,item.score);completed=true;
        }
      }
      if(!changed)return {xp:0,gold:0,paid:true};
      profile.heroChallengeClaims=ledger;
      const before=config.levelInfo(profile.totalXp||0).level;
      profile.totalXp=Number(profile.totalXp||0)+xp;
      const after=config.levelInfo(profile.totalXp).level;
      const camp=window.FitnessRpgCamp.migrate(profile);
      camp.gold+=gold;
      if(after>before)window.FitnessRpgCamp.rewardLevels(profile,before,after);
      state.saveProfile();
      if(after>before)window.FitnessRpgProgress?.queueLevelUpModal?.(before,after,(after-before)*20);
      window.FitnessRpgRender?.renderAll?.();
      return {xp,gold,paid:true};
    }catch(error) {
      Object.keys(profile).forEach(k=>delete profile[k]);Object.assign(profile,oldProfile);
      console.warn("Récompenses des épreuves non sauvegardées :",error);
      return {xp:0,gold:0,paid:false};
    }
  }

  function record(){
    if(phase!=="score"||!selected)return;
    const field=document.getElementById("heroChallengeScore"),score=Number(field?.value);
    if(!field?.value.trim()||!Number.isSafeInteger(score)||score<0||score>9999||(selected.hold&&score>elapsed)){alert("Saisis un résultat entier valide.");return;}
    const data=read(),e=data[selected.id];if(!e?.pending||e.pending.date!==today())return;
    const previous=e.best??null,newRecord=previous===null||score>previous;
    e.best=Math.max(previous??0,score);e.history=Array.isArray(e.history)?e.history:[];e.history.push({date:today(),score,status:"completed",seconds:elapsed});
    delete e.pending;if(!save(data)){alert("Sauvegarde impossible. Réessaie.");return;}
    phase="result";
    const reward=payRewards();
    draw('<h2>'+(newRecord?"🏆 Nouveau record !":"Épreuve validée !")+'</h2><p class="hero-challenge-record">'+score+' '+escapeHtml(selected.unit)+'</p><p>Meilleur score : '+e.best+' '+escapeHtml(selected.unit)+'</p><p class="hero-challenge-note">'+(reward.paid?"Récompenses : +"+reward.xp+" XP · +"+reward.gold+" PO.":"Récompenses en attente de sauvegarde. Elles seront créditées à la prochaine ouverture.")+'</p>'+coachPanel(newRecord?"record":"complete")+'<button class="hero-challenge-primary" data-action="back">Retour aux épreuves</button>');
  }
  function handleClick(target) {
    const trigger=target.closest("#openHeroChallengesButton, [data-open-hero-challenges]");
    if (trigger) {
      opener=trigger;
      showList();
      return true;
    }
    const button=target.closest("#heroChallengesOverlay button");
    if (!button) return false;
    if (button.dataset.challenge) {
      open(button.dataset.challenge);
      return true;
    }
    switch (button.dataset.action) {
      case "close": close(); break;
      case "back": showList(); break;
      case "prepare": prepare(); break;
      case "cancel": clearTimer(); open(selected.id); break;
      case "finish": finish(); break;
      case "abandon": abandon(); break;
      case "save": record(); break;
      case "challenge-motion": setMotion(!playing); break;
      case "challenge-variant":
        variant=!variant;
        renderLesson();
        root().querySelector('[data-action="challenge-variant"]').focus();
        break;
    }
    return true;
  }
  function handleKey(event) {
    const overlay=root();
    if (!overlay) return false;
    if (event.key==="Escape") {
      event.preventDefault();
      close();
      return true;
    }
    if (event.key!=="Tab") return false;
    const controls=overlay.querySelectorAll("button:not(:disabled), input:not(:disabled)");
    const first=controls[0], last=controls[controls.length-1];
    const current=document.activeElement;
    if (!Array.from(controls).includes(current) || current===(event.shiftKey ? first : last)) {
      event.preventDefault();
      (event.shiftKey ? last : first)?.focus();
    }
    return true;
  }

  function mount(){
    const data=read();Object.keys(data).forEach(id=>{const e=data[id];if(e?.pending){e.history=Array.isArray(e.history)?e.history:[];e.history.push({date:e.pending.date,status:"interrupted"});delete e.pending;save(data);}});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount);else mount();
  window.FitnessRpgChallenges={
    today, read, CHALLENGES, handleClick, handleKey,
    hasActiveAttempt: () => ["preparing", "running", "score"].includes(phase)
  };
})();
