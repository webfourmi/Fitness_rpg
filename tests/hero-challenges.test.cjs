"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm"),path=require("node:path");
const source=fs.readFileSync(path.join(__dirname,"../app-challenges.js"),"utf8");
function setup(){
 const store=new Map(),profile={totalXp:0,camp:{gold:0,claims:{}}};
 const nodes={};let tick, now=0;
 const lessonPanel={innerHTML:""};
 const document={
  readyState:"loading",addEventListener(){},
  getElementById(id){return nodes[id]||null;},
  querySelector(){return null;},createElement(){return {id:"",className:"",innerHTML:"",querySelector(selector){return selector===".hero-challenge-lesson"?lessonPanel:null;},remove(){}};},
  body:{appendChild(node){nodes[node.id]=node;}}
 };
 const window={FitnessRpgState:{getProfile:()=>profile,saveProfile(){store.set("profile",JSON.stringify(profile));}},
  FitnessRpgConfig:{levelInfo:xp=>({level:1+Math.floor(xp/100)})},
  FitnessRpgCamp:{migrate:p=>p.camp,rewardLevels(p,oldLevel,newLevel){p.camp.gold+=(newLevel-oldLevel)*20;return (newLevel-oldLevel)*20;}},
  FitnessRpgRender:{renderAll(){}},FitnessRpgProgress:{queueLevelUpModal(){}}};
 const localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)};
 const context={window,document,localStorage,console,Date,Math,Number,JSON,structuredClone,performance:{now:()=>now},setInterval(callback){tick=callback;return 1;},clearInterval(){tick=null;},alert(){},confirm:()=>true};
 for(const file of ["app-data.js","app-challenge-lessons.js"]){
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,"..",file),"utf8"),context);
 }
 vm.runInNewContext(source,context);
 function click(dataset){
  window.FitnessRpgChallenges.handleClick({closest(selector){
   return selector==="#heroChallengesOverlay button"?{dataset}:null;
  }});
 }
 const action=action=>click({action});
 const open=challenge=>click({challenge});
 const advance=(ms)=>{now+=ms;tick?.();};
 return {store,profile,action,open,advance,window,document,nodes,lessonPanel};
}
test("les récompenses sont créditées en XP et PO et ne se dupliquent pas",()=>{
 const x=setup(),day=x.window.FitnessRpgChallenges.today();
 x.store.set("fitnessRpgHeroChallengesV1",JSON.stringify({squats:{lastDay:day,history:[{date:day,score:25,status:"completed",seconds:60}]}}));
 x.action("back");
 assert.equal(x.profile.totalXp,70);
 assert.equal(x.profile.camp.gold,35);
 x.action("back");
 assert.equal(x.profile.totalXp,70);
 assert.equal(x.profile.camp.gold,35);
});
test("la participation suivante rapporte 5 XP et 2 PO sans nouveau record",()=>{
 const x=setup();x.store.set("fitnessRpgHeroChallengesV1",JSON.stringify({squats:{history:[
 {date:"2026-11-18",score:30,status:"completed",seconds:60},
 {date:"2026-11-19",score:20,status:"completed",seconds:60}
 ]}}));
 x.action("back");
 assert.equal(x.profile.totalXp,75);
 assert.equal(x.profile.camp.gold,37);
});
test("une tentative abandonnée ne donne aucune récompense",()=>{
 const x=setup();x.store.set("fitnessRpgHeroChallengesV1",JSON.stringify({squats:{history:[{date:"2026-11-18",status:"abandoned"}]}}));
 x.action("back");assert.equal(x.profile.totalXp,0);assert.equal(x.profile.camp.gold,0);
});
test("les créances déjà enregistrées dans le profil ne sont pas payées deux fois après redémarrage",()=>{
 const x=setup();const day=x.window.FitnessRpgChallenges.today();
 x.store.set("fitnessRpgHeroChallengesV1",JSON.stringify({squats:{history:[{date:day,score:30,status:"completed"}]}}));
 x.action("back");const old=x.profile.totalXp;
 x.action("back");assert.equal(x.profile.totalXp,old);
});

test("six démonstrations distinctes avec variantes et consignes",()=>{
 const x=setup(),library=x.window.FitnessRpgChallengeLessons;
 const ids=x.window.FitnessRpgChallenges.CHALLENGES.map(challenge=>challenge.id);
 const diagrams=new Set();
 for(const id of ids){
  const lesson=library.lessons[id];
  const standard=library.diagram(lesson,false);
  const variant=library.diagram(lesson,true);
  assert.match(standard,/repeatCount="indefinite"/);
  assert.notEqual(standard,variant);
  assert.ok(lesson.tip && lesson.variant && lesson.easier);
  diagrams.add(standard);
 }
 assert.equal(diagrams.size,6);
 assert.equal(x.store.size,0);
});

test("chaque coach du profil s’affiche et réagit au premier record",()=>{
 const ids=["korvan","xara","violette","elmin","bazul","satyne"];
 const reactions=new Set();
 for(const id of ids){
  const x=setup();
  const coach=x.window.FitnessRpgData.coaches[id];
  x.profile.coachId=id;
  x.open("squats");
  assert.ok(x.lessonPanel.innerHTML.includes(coach.image));
  assert.ok(x.lessonPanel.innerHTML.includes(coach.name));
  assert.equal(x.store.size,0);
  x.action("prepare");
  assert.ok(x.nodes.heroChallengesOverlay.innerHTML.includes(coach.start[0]));
  assert.equal(x.window.FitnessRpgChallenges.hasActiveAttempt(),true);
  for(let i=0;i<10;i++) x.advance(1000);
  x.action("finish");
  x.nodes.heroChallengeScore={value:"24"};
  x.action("save");
  const result=x.nodes.heroChallengesOverlay.innerHTML;
  assert.match(result,/Nouveau record/);
  assert.ok(result.includes(coach.image));
  reactions.add(result.match(/<strong>[^<]+<\/strong><p>([^<]+)<\/p>/)[1]);
  assert.equal(x.profile.totalXp,70);
  assert.equal(x.profile.camp.gold,35);
  assert.equal(x.window.FitnessRpgChallenges.read().squats.best,24);
  assert.equal(x.window.FitnessRpgChallenges.hasActiveAttempt(),false);
 }
 assert.equal(reactions.size,6);
});
