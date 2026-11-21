"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),vm=require("node:vm"),path=require("node:path");
const source=fs.readFileSync(path.join(__dirname,"../app-challenges.js"),"utf8");
function setup(){
 const store=new Map(),profile={totalXp:0,camp:{gold:0,claims:{}}};
 const nodes={};let click;
 const document={
  readyState:"loading",addEventListener(name,cb){if(name==="click")click=cb;},
  getElementById(id){return nodes[id]||null;},
  querySelector(){return null;},createElement(){return {id:"",className:"",innerHTML:"",remove(){}};},
  body:{appendChild(node){nodes[node.id]=node;}}
 };
 const window={FitnessRpgState:{getProfile:()=>profile,saveProfile(){store.set("profile",JSON.stringify(profile));}},
  FitnessRpgConfig:{levelInfo:xp=>({level:1+Math.floor(xp/100)})},
  FitnessRpgCamp:{migrate:p=>p.camp,rewardLevels(p,oldLevel,newLevel){p.camp.gold+=(newLevel-oldLevel)*20;return (newLevel-oldLevel)*20;}},
  FitnessRpgRender:{renderAll(){}},FitnessRpgProgress:{queueLevelUpModal(){}}};
 const localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)};
 vm.runInNewContext(source,{window,document,localStorage,console,Date,Math,Number,JSON,structuredClone,performance:{now:()=>0},setInterval:()=>1,clearInterval(){},alert(){},confirm:()=>true});
 function action(name){click({target:{closest(){return {dataset:{action:name}};}}});}
 return {store,profile,action,window,document,nodes};
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
