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
  let timer=null, started=0, elapsed=0, phase="idle", selected=null, committed=false;
  const root=()=>document.getElementById("heroChallengesOverlay");
  const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function clearTimer(){if(timer!==null){clearInterval(timer);timer=null;}}
  function close(){if(phase==="running"){if(!confirm("Abandonner cette tentative officielle ?"))return;abandon();}clearTimer();phase="idle";root()?.remove();}
  function entry(id){return read()[id]||{history:[]};}
  function showList(){
    clearTimer();phase="idle";selected=null;
    const rows=CHALLENGES.map(c=>{const e=entry(c.id),done=e.lastDay===today();
      return '<button class="hero-challenge-item" data-challenge="'+c.id+'"><span>'+c.icon+'</span><span><strong>'+escapeHtml(c.name)+'</strong><small>'+escapeHtml(c.exercise)+' · Record : '+(e.best??"—")+' '+escapeHtml(c.unit)+'</small></span><span>'+(done?"✓":"›")+'</span></button>';
    }).join("");
    draw('<h2>⚔️ Les Épreuves du Héros</h2><p>Une tentative officielle par épreuve et par jour. Les records sont personnels.</p>'+rows);
  }
  function draw(html){
    if(!root()){const node=document.createElement("div");node.id="heroChallengesOverlay";node.className="hero-challenge-overlay";document.body.appendChild(node);}
    root().innerHTML='<section class="hero-challenge-dialog" role="dialog" aria-modal="true" aria-label="Épreuves du Héros"><button type="button" class="hero-challenge-close" data-action="close" aria-label="Fermer">✕</button>'+html+'</section>';
  }
  function open(id){
    const c=CHALLENGES.find(x=>x.id===id);if(!c)return;
    selected=c;phase="idle";const e=entry(c.id),done=e.lastDay===today();
    draw('<button data-action="back" class="hero-challenge-secondary">← Épreuves</button><h2>'+c.icon+' '+escapeHtml(c.name)+'</h2><p>'+escapeHtml(c.exercise)+' · '+(c.hold?"Maintenir la position, jusqu’à 3 minutes.":"Maximum de répétitions correctes en 60 secondes.")+'</p><p class="hero-challenge-record">🏆 Record personnel : <strong>'+(e.best??"—")+'</strong> '+escapeHtml(c.unit)+'</p>'+(done?'<p class="hero-challenge-notice">Tentative officielle déjà effectuée aujourd’hui. Reviens demain !</p>':'<button class="hero-challenge-primary" data-action="prepare">Commencer l’épreuve</button>')+'<p class="hero-challenge-note">Arrête en cas de douleur ou de malaise. Échauffe-toi avant de commencer.</p>');
  }
  function prepare(){
    if(!selected||entry(selected.id).lastDay===today())return open(selected?.id);
    phase="preparing";let remaining=10;
    draw('<h2>Prépare-toi</h2><p>Positionne-toi et vérifie ta technique.</p><div class="hero-challenge-clock" id="heroChallengeClock">10</div><button data-action="cancel" class="hero-challenge-secondary">Annuler</button>');
    clearTimer();timer=setInterval(()=>{if(phase!=="preparing")return clearTimer();remaining--;const el=document.getElementById("heroChallengeClock");if(el)el.textContent=remaining;if(remaining<=0)start();},1000);
  }
  function start(){
    clearTimer();if(!selected)return;
    const data=read(),e=data[selected.id]||{history:[]};
    if(e.lastDay===today())return open(selected.id);
    e.lastDay=today();e.pending={date:today(),startedAt:Date.now()};data[selected.id]=e;
    if(!save(data)){phase="idle";draw('<h2>Stockage indisponible</h2><p>Impossible de sauvegarder la tentative. Vérifie l’espace de stockage du navigateur.</p><button data-action="back">Retour</button>');return;}
    committed=true;phase="running";started=performance.now();elapsed=0;
    draw('<h2>'+escapeHtml(selected.name)+'</h2><p>Épreuve en cours</p><div class="hero-challenge-clock" id="heroChallengeClock">'+selected.seconds+'</div><button data-action="finish" class="hero-challenge-primary">'+(selected.hold?"Arrêter le maintien":"Terminer maintenant")+'</button><button data-action="abandon" class="hero-challenge-secondary">Abandonner</button>');
    timer=setInterval(()=>{if(phase!=="running")return clearTimer();elapsed=Math.min(selected.seconds,Math.floor((performance.now()-started)/1000));const el=document.getElementById("heroChallengeClock");if(el)el.textContent=Math.max(0,selected.seconds-elapsed);if(elapsed>=selected.seconds)finish();},100);
  }
  function finish(){
    if(phase!=="running")return;elapsed=Math.min(selected.seconds,Math.floor((performance.now()-started)/1000));clearTimer();phase="score";
    draw('<h2>Épreuve terminée !</h2><p>Temps écoulé : '+elapsed+' secondes</p><label for="heroChallengeScore">Résultat ('+escapeHtml(selected.unit)+')</label><input id="heroChallengeScore" type="number" min="0" max="9999" step="1" inputmode="numeric" value="'+(selected.hold?elapsed:"")+'"><button class="hero-challenge-primary" data-action="save">Valider mon résultat</button><button class="hero-challenge-secondary" data-action="abandon">Abandonner</button>');
  }
  function abandon(){
    clearTimer();if(selected){const d=read(),e=d[selected.id];if(e?.pending){e.history=Array.isArray(e.history)?e.history:[];e.history.push({date:today(),status:"abandoned"});delete e.pending;save(d);}}
    committed=false;phase="idle";if(selected)open(selected.id);else showList();
  }
  function record(){
    if(phase!=="score"||!selected)return;
    const field=document.getElementById("heroChallengeScore"),score=Number(field?.value);
    if(!field?.value.trim()||!Number.isSafeInteger(score)||score<0||score>9999||(selected.hold&&score>elapsed)){alert("Saisis un résultat entier valide.");return;}
    const data=read(),e=data[selected.id];if(!e?.pending||e.pending.date!==today())return;
    const previous=e.best??null,newRecord=previous===null||score>previous;
    e.best=Math.max(previous??0,score);e.history=Array.isArray(e.history)?e.history:[];e.history.push({date:today(),score,status:"completed",seconds:elapsed});
    delete e.pending;if(!save(data)){alert("Sauvegarde impossible. Réessaie.");return;}
    committed=false;phase="result";
    draw('<h2>'+(newRecord?"🏆 Nouveau record !":"Épreuve validée !")+'</h2><p class="hero-challenge-record">'+score+' '+escapeHtml(selected.unit)+'</p><p>Meilleur score : '+e.best+' '+escapeHtml(selected.unit)+'</p><p class="hero-challenge-note">Les récompenses XP et pièces seront reliées à l’économie centrale lors de l’intégration complète.</p><button class="hero-challenge-primary" data-action="back">Retour aux épreuves</button>');
  }
  document.addEventListener("click",event=>{
    const button=event.target.closest("[data-action],[data-challenge],#openHeroChallengesButton");if(!button)return;
    if(button.id==="openHeroChallengesButton"){showList();return;}
    if(button.dataset.challenge){open(button.dataset.challenge);return;}
    switch(button.dataset.action){case"close":close();break;case"back":showList();break;case"prepare":prepare();break;case"cancel":clearTimer();open(selected.id);break;case"finish":finish();break;case"abandon":abandon();break;case"save":record();break;}
  });
  function mount(){
    if(document.getElementById("openHeroChallengesButton"))return;
    const target=document.querySelector(".training-tool-grid")||document.querySelector("#todayCard");
    if(!target)return;
    const b=document.createElement("button");b.id="openHeroChallengesButton";b.type="button";b.innerHTML="🏆 <span>Épreuves</span>";target.appendChild(b);
    const data=read();Object.keys(data).forEach(id=>{const e=data[id];if(e?.pending){e.history=Array.isArray(e.history)?e.history:[];e.history.push({date:e.pending.date,status:"interrupted"});delete e.pending;save(data);}});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount);else mount();
  window.FitnessRpgChallenges={today,read,CHALLENGES};
})();
