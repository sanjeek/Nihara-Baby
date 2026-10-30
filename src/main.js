import * as THREE from 'three';
import './style.css';
import {createActivities} from './activities.js';
import {createStory} from './story.js';

 document.querySelector('#app').innerHTML=`<header class="top"><div class="brand"><div class="brand-icon">🧸</div><div><h1>Nihara Adventure<span style="color:#bd9d65">.</span></h1><p>LITTLE STEPS. BIG DISCOVERIES.</p></div></div><nav class="nav"><span class="label">A little world of wonder</span><span class="pill">✦ &nbsp; Chapter 01</span><button class="icon-btn" id="restart" aria-label="Restart game">↻</button><button class="icon-btn" id="story-book" aria-label="Read chapter story">📖</button><button class="icon-btn" id="help" aria-label="Help">?</button></nav></header><div class="layout"><aside class="sidebar"><p class="eyebrow">YOUR LITTLE ADVENTURE</p><button class="room active" data-chapter="0"><span>🧸</span><div><strong>The Nursery</strong><small>Your adventure starts here</small></div></button><button class="room" data-chapter="1"><span>🛋️</span><div><strong>Living Room</strong><small>Explore this chapter</small></div><span class="lock">→</span></button><button class="room" data-chapter="2"><span>🌿</span><div><strong>The Garden</strong><small>Explore this chapter</small></div><span class="lock">→</span></button><div class="journey"><b>✧ &nbsp; Small steps, big magic</b>Every great adventure begins with a little curiosity. Take your time and explore.</div></aside><main class="stage"><div id="scene" style="height:100%"></div><div class="hud"><div class="level-card"><small>CHAPTER 01 · A COZY BEGINNING</small><h2>The Nursery</h2><p>Find three little stars. Bring Teddy home.</p></div><div class="stars" id="stars">☆ ☆ ☆ <small>0 / 3</small></div></div><div class="chapter-tabs" aria-label="Choose chapter"><button data-chapter="0">1 · Nursery</button><button data-chapter="1">2 · Living room</button><button data-chapter="2">3 · Garden</button></div><div class="toast" id="toast"></div><div class="bottom"><div class="hint"><strong>Hold the arrow buttons to move.</strong><br><span class="key">W A S D</span> or keyboard arrows to move &nbsp; <span class="key">SPACE</span> to jump</div><div class="badge">🌱 &nbsp; Explore at your own pace</div></div><div class="touch"><span></span><button data-key="ArrowUp">▲</button><span></span><button data-key="ArrowLeft">◀</button><button data-key="ArrowDown">▼</button><button data-key="ArrowRight">▶</button></div><button class="jump" data-key="Space">↑<br><small>JUMP</small></button><div class="help hidden" id="helpbox">Collect the three golden stars, then walk up to Teddy at the back of each chapter.<br>Move: WASD / arrow keys<br>Jump: Space<br>Restart: ↻<br>On mobile, use the on-screen buttons.</div><div class="overlay hidden" id="win"><div class="modal"><div class="emoji">🧸 ✨</div><h2>A little adventure, complete.</h2><p>You found every star and made it back to Teddy. The biggest discoveries start with the smallest steps.</p><button class="primary" id="next">Next chapter &nbsp; ↗</button><button class="secondary" id="again">Replay chapter</button></div></div></main></div>`;
const container=document.querySelector('#scene');
const scene=new THREE.Scene();scene.background=new THREE.Color('#dfd5bd');scene.fog=new THREE.Fog('#dfd5bd',25,55);
const camera=new THREE.PerspectiveCamera(43,1,.1,100);
function graphicsError(){
 const message=document.createElement('div');message.className='overlay';
 message.innerHTML='<div class="modal"><div class="emoji">🧸</div><h2>Let’s get your game running</h2><p>Your browser could not start 3D graphics. Open this link directly in an updated Chrome, Edge, or Safari browser. On a computer, enable graphics acceleration in browser settings, then restart the browser.</p><button class="primary" id="reload-game">Try again</button></div>';
 document.querySelector('.stage').appendChild(message);message.querySelector('button').onclick=()=>location.reload();
}
let renderer;
try {renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});} catch(error){graphicsError();throw error;}
renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();graphicsError();});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;container.appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight('#fff7df','#a59a77',2.5));const sun=new THREE.DirectionalLight('#fff0cd',3.4);sun.position.set(-5,14,-5);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-16,right:16,top:16,bottom:-16});sun.shadow.normalBias=.03;scene.add(sun);
let world=new THREE.Group();scene.add(world);
const mats={};function mat(color){return mats[color]??=new THREE.MeshStandardMaterial({color,roughness:.87});}
function box(w,h,d,color,x,y,z,parent=world,r=.08){let geo=new THREE.BoxGeometry(w,h,d);const m=new THREE.Mesh(geo,mat(color));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function ball(x,y,z,s,color,parent=world,scale){const m=new THREE.Mesh(new THREE.SphereGeometry(s,24,16),mat(color));m.position.set(x,y,z);if(scale)m.scale.set(...scale);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function cyl(rad,h,color,x,y,z,parent=world){const m=new THREE.Mesh(new THREE.CylinderGeometry(rad,rad,h,24),mat(color));m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m;}
// A handcrafted dollhouse nursery, with low furniture and a clear exploration path.
box(27,.3,24,'#c7ad85',0,-.2,0);for(let i=-13;i<14;i++)box(.025,.012,24,'#b69b73',i,.0,0);
box(27,9,.25,'#e9dfc8',0,4.4,-10);box(.25,9,24,'#e5dcc8',-13.5,4.4,1);box(27,.28,.2,'#f7edd9',0,.2,-9.8);box(27,.1,.15,'#c8b891',0,3,-9.8);
// Window with glowing sky and crossbars.
box(5.5,4.8,.2,'#f6edd8',-5,5.4,-9.75);box(5,4.3,.12,'#b8d8d4',-5,5.4,-9.58);box(.15,4.4,.15,'#fff6e5',-5,5.4,-9.45);box(5.1,.15,.15,'#fff6e5',-5,5.4,-9.45);box(6,.22,.65,'#fff6e5',-5,3.13,-9.45);for(const x of [-8.2,-1.8])box(.85,6,.4,'#d7b582',x,5,-9.3);
// Rug and stitched bands.
box(17,.045,14,'#e8c8ad',0,.035,1.4);box(16.6,.014,13.6,'#edd5b9',0,.065,1.4);for(let i=-8;i<=8;i++)box(.04,.015,13.5,'#e3c9ab',i,.08,1.4);
// Crib along the back left.
box(5,.35,2.8,'#b99973',-9,1.35,-7.4);box(4.6,.25,2.4,'#eeead6',-9,1.65,-7.4);for(let i=0;i<10;i++){cyl(.065,2.5,'#cdb18c',-11.3+i*.51,2,-6);cyl(.065,2.5,'#cdb18c',-11.3+i*.51,2,-8.8);}box(5.2,.15,.18,'#b99973',-9,3.3,-6);for(const x of [-11.5,-6.5])for(const z of [-8.8,-6])cyl(.11,3.4,'#b99973',x,1.7,z);
// Dresser with drawers and a plant.
box(4,2.8,1.8,'#c4a780',8,1.4,-8.7);for(let i=0;i<3;i++){box(3.7,.73,.1,'#d7bc94',8,.5+i*.85,-7.75);for(const x of [7,9])ball(x,.5+i*.85,-7.63,.08,'#8f7855');}box(4.3,.18,2,'#e8d0aa',8,2.9,-8.7);cyl(.4,.7,'#e7b19b',9,3.34,-8.6);for(let i=0;i<5;i++)ball(9+Math.sin(i*2)*.3,4+i*.08,-8.6+Math.cos(i*2)*.2,.3,'#839870',world,[.6,1.5,.6]);
// Wall art and bunting.
box(1.9,2.3,.17,'#b8976c',2.6,5.8,-9.7);box(1.65,2.05,.1,'#f9ecd2',2.6,5.8,-9.58);ball(2.6,5.9,-9.45,.51,'#d7a55e',world,[1,1,.06]);for(let i=0;i<11;i++){const x=-1+i*.95;const y=7.3-Math.sin(i/10*Math.PI)*.8;const t=new THREE.Mesh(new THREE.ConeGeometry(.22,.45,3),mat(['#cd997f','#e2bd73','#a7b59b'][i%3]));t.rotation.z=Math.PI;t.position.set(x,y,-9.3);world.add(t);}
let platforms=[];function cushion(x,z,w,h,d,color){const m=box(w,h,d,color,x,h/2+.1,z);const seam=box(w+.035,.045,d+.035,'#ead3b6',x,h*.5,z);platforms.push({x,z,w,d,top:h+.1});return m;}
cushion(4,-4.8,3.6,.65,3,'#cf9e96');cushion(4,-6.3,3.6,1.25,1.5,'#c6948f');cushion(2,-4,1.6,.3,2,'#d1b77b');cushion(-4,-1,2.2,.65,2,'#aab9ac');cushion(-5.3,-3,1.5,.4,1.5,'#d9b578');
function toyBlock(x,z,color,letter){box(1.05,1.05,1.05,color,x,.6,z);const canvas=document.createElement('canvas');canvas.width=128;canvas.height=128;const c=canvas.getContext('2d');c.fillStyle=color;c.fillRect(0,0,128,128);c.strokeStyle='#ffffff77';c.lineWidth=6;c.strokeRect(8,8,112,112);c.fillStyle='#fff6dc';c.font='bold 80px serif';c.textAlign='center';c.fillText(letter,64,91);const m=new THREE.Mesh(new THREE.PlaneGeometry(.95,.95),new THREE.MeshStandardMaterial({map:new THREE.CanvasTexture(canvas)}));m.position.set(x,.6,z+.532);world.add(m);}
toyBlock(-5,3,'#b0bca3','B');toyBlock(-6.2,3,'#d4ac74','A');toyBlock(7,-2,'#a2b4b3','C');toyBlock(8.2,-2,'#d09f8c','★');
ball(6,.52,4,.52,'#c98972');const stripe=cyl(.53,.12,'#e8cf8c',6,.52,4);stripe.rotation.z=Math.PI/2;
// Wooden toy train.
box(2,.25,.8,'#b0b69a',-6,.4,6);box(.8,.8,.75,'#b5c1ac',-6.4,.9,6);cyl(.23,.7,'#d9b77c',-5.6,.9,6);for(const x of [-6.6,-5.4])for(const z of [5.5,6.5]){const w=cyl(.25,.15,'#b38a66',x,.3,z);w.rotation.x=Math.PI/2;}
// Cardboard playhouse.
box(2.7,2.4,.12,'#c8a778',-9,1.2,.0);box(.2,2.4,2.8,'#c8a778',-10.3,1.2,1.3);box(.2,2.4,2.8,'#c8a778',-7.7,1.2,1.3);box(2.8,.18,2.9,'#d4b488',-9,2.4,1.3);
function teddy(x,y,z){const g=new THREE.Group();g.position.set(x,y,z);world.add(g);ball(0,.6,0,.55,'#b78657',g,[1,1.15,.8]);ball(0,1.35,0,.48,'#b78657',g);for(const s of [-1,1]){ball(s*.37,1.69,0,.21,'#b78657',g);ball(s*.37,1.69,.12,.12,'#d8b78d',g);ball(s*.53,.75,0,.22,'#b78657',g,[.8,1.5,.8]);ball(s*.32,.17,.18,.25,'#b78657',g);ball(s*.16,1.43,.414,.045,'#372f27',g);}ball(0,1.22,.4,.22,'#dfc29a',g,[1,.8,.5]);ball(0,1.3,.51,.065,'#584333',g);box(.6,.12,.16,'#b26b57',0,.99,.36,g);return g;}
const bear=teddy(4,.76,-4.65);
// Each chapter owns its environment and collision platforms.
const chapters=[{name:'The Nursery',subtitle:'A COZY BEGINNING',world,platforms,goal:bear,stars:[[-4,1.5,-1],[.2,1.05,2.5],[7,1.1,1.5]],hint:'Jump onto the soft cushions to find the first star.'}];
function nextWorld(){world=new THREE.Group();world.visible=false;scene.add(world);platforms=[];}
function roomShell(color){box(27,.3,24,color,0,-.2,0);box(27,8,.25,'#e5dfce',0,4,-10);box(.25,8,24,'#e5dfce',-13.5,4,1);box(27,.25,.2,'#fff2d5',0,.2,-9.8);}
nextWorld();roomShell('#bc9c74');
box(17,.06,14,'#b9c4b1',0,.04,1.4);for(let i=-6;i<=6;i++)box(16,.015,.035,'#d4ddc7',0,.08,i+1);
// Giant sofa, reading corner, coffee table and wooden railway.
box(10,1.2,3.3,'#7f9682',-5,1,-7.5);box(10,2.6,.65,'#7f9682',-5,2.3,-9);for(const x of [-10,.1])box(.65,1.8,3.5,'#718973',x,1.8,-7.5);for(const x of [-8,-5,-2])box(2.8,.3,2.8,'#a4b49a',x,1.75,-7.3);for(const x of [-7,-3]){const pillow=box(1.6,1.5,.5,'#d3ad7c',x,2.5,-8.3);pillow.rotation.z=.15;}
box(3.6,.25,2.4,'#a77f56',8,2.3,-7.3);for(const x of [6.7,9.3])for(const z of [-8,-6.6])cyl(.12,2.2,'#96704c',x,1.1,z);for(let i=0;i<4;i++)box(1.7,.18,1.1,['#b9c3a9','#c18f79','#d5b776','#829d9d'][i],8,2.55+i*.18,-7.3);
cyl(.14,4.8,'#bda47a',-11,2.4,-7);const shade=new THREE.Mesh(new THREE.ConeGeometry(1.1,1.3,24,1,true),mat('#eedabb'));shade.position.set(-11,4.8,-7);world.add(shade);
for(let i=0;i<18;i++){box(.09,.05,.75,'#8b7153',-7+i*.6,.11,5);for(const z of [4.7,5.3])box(.63,.07,.065,'#b4976c',-7+i*.6,.15,z);}
box(1.8,.4,.8,'#a5b096',-4,.45,5);box(.6,.7,.75,'#c5a46a',-4.4,.95,5);for(const x of [-4.6,-3.5])for(const z of [4.5,5.5]){const wheel=cyl(.23,.15,'#7a654d',x,.3,z);wheel.rotation.x=Math.PI/2;}
cushion(-4,-1,2.2,.65,2,'#c3a371');cushion(4,-4.8,3.6,.65,3,'#97ad96');cushion(4,-6.3,3.6,1.25,1.5,'#819b85');cushion(2,-4,1.6,.3,2,'#d8bd8c');
toyBlock(-7,1,'#c79f82','N');toyBlock(8,3,'#94a7a1','A');
chapters.push({name:'Living Room',subtitle:'THE GREAT TOY TRAIL',world,platforms,goal:teddy(4,.76,-4.65),stars:[[-4,1.5,-1],[.2,1.05,2.5],[7,1.1,1.5]],hint:'Follow the toy trail, collect the stars, and jump up to Teddy.'});
nextWorld();box(27,.3,24,'#9eb78a',0,-.2,0);
// Enclosed garden with a dry stream bed, crossing, flowers and pond.
for(let i=-13;i<=13;i++){box(.55,1.9,.18,'#e5d3aa',i,.9,-9);const cap=new THREE.Mesh(new THREE.ConeGeometry(.38,.4,4),mat('#e5d3aa'));cap.position.set(i,2,-9);cap.rotation.y=Math.PI/4;world.add(cap);}for(const y of [.65,1.4])box(27,.15,.15,'#d4bd93',0,y,-8.95);
box(2.5,.04,12,'#b5c9c1',0,.03,-2.5);for(let i=0;i<8;i++)box(2.8,.22,.52,'#bc996b',0,.2,-.2-i*.6);for(const x of [-1.4,1.4])for(const z of [0,-4])cyl(.09,1.15,'#ac8557',x,.65,z);
for(let i=0;i<5;i++)cyl(.6,.13,'#d0c4a6',-2+i*1.4,.12,3.8-Math.sin(i)*.3);
for(const [x,z] of [[-10,-5],[-9,5],[9,-6],[10,5]]){cyl(.3,3.5,'#ad8b61',x,1.7,z);for(let j=0;j<4;j++)ball(x+Math.sin(j*2)*.8,3.5+j*.25,z+Math.cos(j*2)*.7,1.4,'#7c9b69');}
for(let i=0;i<36;i++){const side=i%2?-1:1,x=side*(8+(i%4)*.8),z=-7+(i%12)*1.2;cyl(.035,.65,'#648451',x,.4,z);ball(x,.8,z,.15,'#e0b05e');for(let j=0;j<5;j++)ball(x+Math.sin(j*1.256)*.21,.8,z+Math.cos(j*1.256)*.21,.15,['#d6a0a1','#eddb9d','#acb8d0'][i%3]);}
cushion(-4,-1,2.2,.65,2,'#b6b19a');cushion(4,-4.8,3.6,.65,3,'#c6b48b');cushion(4,-6.3,3.6,1.25,1.5,'#a0a987');cushion(2,-4,1.6,.3,2,'#c4b690');
cyl(.6,.8,'#87a7a2',7,.45,-5);box(.15,1,.15,'#87a7a2',7.7,.8,-5);const spout=cyl(.14,1,'#87a7a2',6.3,.7,-5);spout.rotation.z=-.7;
chapters.push({name:'The Garden',subtitle:'A WORLD IN BLOOM',world,platforms,goal:teddy(4,.76,-4.65),stars:[[-4,1.5,-1],[.2,1.05,2.5],[7,1.1,1.5]],hint:'Explore the flowers and stepping stones. Find Teddy for the grand finale.'});
// New challenge worlds reuse the handcrafted rooms with new routes and moving lifts.
for(let i=0;i<3;i++){
 world=chapters[i].world.clone(true);world.visible=false;scene.add(world);platforms=chapters[i].platforms.map(p=>({...p}));
 const lift=box(1.8,.45,1.8,['#c7a1c0','#91b9c1','#deb874'][i],0,.325,-2.5);
 const surface={x:0,z:-2.5,w:1.8,d:1.8,top:.55};platforms.push(surface);
 chapters.push({name:['Nursery Quest','Toy Trail Challenge','Garden Master'][i],subtitle:['MEMORY & MOVING PLATFORMS','NUMBERS & HIGHER JUMPS','THE ULTIMATE TEDDY QUEST'][i],world,platforms,
 stars:[[-4,1.5,-1],[.2,1.05,2.5],[7,1.1,1.5],[-7,1,4],[4,2.1,-6.3],[0,1.3,-2.5]],
 lift:{mesh:lift,surface,phase:i},hint:'Collect six stars, ride the moving lift, and solve all three brain challenges.'});
}
const icons=['🧸','🛋️','🌿','🧠','🚂','🏆'];
chapters.forEach((c,i)=>{if(i<3)return;const b=document.createElement('button');b.className='room';b.dataset.chapter=i;b.innerHTML='<span>'+icons[i]+'</span><div><strong>'+c.name+'</strong><small>Hard · 6 stars + 3 activities</small></div>';document.querySelector('.journey').before(b);const tab=document.createElement('button');tab.dataset.chapter=i;tab.textContent=(i+1)+' · '+['Quest','Toy trail','Master'][i-3];document.querySelector('.chapter-tabs').appendChild(tab);});
let chapter=0,completed=new Set();
try{const saved=JSON.parse(localStorage.getItem('nihara-progress')||'{}');completed=new Set((saved.completed||[]).filter(i=>Number.isInteger(i)&&i>=0&&i<chapters.length));chapter=Number.isInteger(saved.chapter)&&saved.chapter>=0&&saved.chapter<chapters.length?saved.chapter:0;}catch{}
function saveProgress(){try{localStorage.setItem('nihara-progress',JSON.stringify({chapter,completed:[...completed]}));}catch{}}
world=chapters[chapter].world;platforms=chapters[chapter].platforms;
const baby=new THREE.Group();scene.add(baby);const skin='#e5b792';ball(0,.74,0,.38,'#a2b9a0',baby,[1,1.2,.8]);ball(0,1.38,0,.39,skin,baby);ball(0,1.65,-.05,.36,'#4b382a',baby,[1,.65,1]);for(let i=0;i<10;i++){const a=i/10*Math.PI*2;ball(Math.sin(a)*.3,1.65+Math.sin(i*3)*.06,-.05+Math.cos(a)*.27,.13,'#4b382a',baby);}for(const s of [-1,1]){ball(s*.38,1,0,.13,skin,baby,[.9,1.8,1]);ball(s*.36,1.08,0,.15,'#f5ead5',baby);ball(s*.13,1.4,.35,.038,'#39322b',baby);}ball(0,1.27,.37,.055,skin,baby);box(.4,.3,.13,'#a2b9a0',0,.98,.28,baby);const legs=[];for(const s of [-1,1]){const leg=new THREE.Group();leg.position.set(s*.19,.45,0);baby.add(leg);ball(0,-.15,0,.17,'#a2b9a0',leg,[1,1.6,1]);ball(0,-.34,.07,.16,'#f6ead4',leg,[1,.65,1.4]);legs.push(leg);}
function starMesh(){const shape=new THREE.Shape();for(let i=0;i<10;i++){const a=i*Math.PI/5+Math.PI/2,r=i%2?.22:.46;const x=Math.cos(a)*r,y=Math.sin(a)*r;i?shape.lineTo(x,y):shape.moveTo(x,y);}shape.closePath();const m=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:.13,bevelEnabled:true,bevelThickness:.045,bevelSize:.045,bevelSegments:2,steps:1}),new THREE.MeshStandardMaterial({color:'#f4c45e',metalness:.25,roughness:.3,emissive:'#e5a323',emissiveIntensity:.22}));m.castShadow=true;return m;}
let stars=chapters[chapter].stars.map(p=>{const m=starMesh();m.position.set(...p);scene.add(m);return {m,base:p[1],got:false};});
const keys=new Set();let count=0,won=false,vy=0,ground=.1,time=0,toastTimer;const spawn=new THREE.Vector3(0,.1,6);
function notify(text){const el=document.querySelector('#toast');el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3000);}
function updateHUD(){document.querySelector('#stars').innerHTML=stars.map(s=>s.got?'<b>★</b>':'☆').join(' ')+' <small>'+count+' / '+stars.length+'</small>';}
let paused=false,storyPaused=false,solvedActivities=[];const story=createStory(value=>{storyPaused=value;keys.clear();});const activities=createActivities(state=>{paused=state.paused;solvedActivities=state.solved;keys.clear();});
function reset(){activities.reset(chapter);keys.clear();baby.position.copy(spawn);vy=0;count=0;won=false;stars.forEach(s=>{s.got=false;s.m.visible=true;});updateHUD();document.querySelector('#win').classList.add('hidden');notify(chapters[chapter].hint);}
window.addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();keys.add(e.code);});window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>keys.clear());
document.querySelectorAll('[data-key]').forEach(b=>{b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);keys.add(b.dataset.key);});for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,()=>keys.delete(b.dataset.key));});
document.querySelector('#story-book').onclick=()=>story.open(chapter);document.querySelector('#restart').onclick=()=>{story.close();reset();};document.querySelector('#again').onclick=reset;document.querySelector('#next').onclick=()=>loadChapter(chapter===chapters.length-1?0:chapter+1);document.querySelectorAll('[data-chapter]').forEach(b=>b.onclick=()=>loadChapter(Number(b.dataset.chapter)));document.querySelector('#help').onclick=()=>document.querySelector('#helpbox').classList.toggle('hidden');
function loadChapter(index){
 chapter=index;chapters.forEach((c,i)=>c.world.visible=i===index);world=chapters[index].world;platforms=chapters[index].platforms;
 stars.forEach(s=>{scene.remove(s.m);s.m.geometry.dispose();s.m.material.dispose();});stars=chapters[index].stars.map(p=>{const m=starMesh();m.position.set(...p);scene.add(m);return {m,base:p[1],got:false};});
 document.querySelector('.pill').textContent='✦ Chapter 0'+(index+1);
 document.querySelector('.level-card small').textContent='CHAPTER 0'+(index+1)+' · '+chapters[index].subtitle;
 document.querySelector('.level-card h2').textContent=chapters[index].name;
 document.querySelector('.level-card p').textContent=index<3?'Find three stars. Bring Teddy home.':'Six stars + memory, numbers & patterns. Then find Teddy.';
 document.querySelectorAll('[data-chapter]').forEach(b=>{const n=Number(b.dataset.chapter);b.classList.toggle('active',n===index);b.setAttribute('aria-pressed',String(n===index));const small=b.querySelector('small');if(small)small.textContent=completed.has(n)?'Completed · play again':'Chapter 0'+(n+1)+(n<3?' · ready to explore':' · hard challenges');});
 saveProgress();reset();story.open(chapter);
}
function finishChapter(){
 won=true;keys.clear();completed.add(chapter);saveProgress();
 document.querySelectorAll('[data-chapter]').forEach(b=>{const small=b.querySelector('small');if(small&&Number(b.dataset.chapter)===chapter)small.textContent='Completed · play again';});
 const modal=document.querySelector('#win');modal.querySelector('h2').textContent=chapter===chapters.length-1?'Nihara, you’re an adventure master!':chapters[chapter].name+' complete!';
 modal.querySelector('p').textContent=(chapter<3?'Three stars collected!':'Six stars and three brain challenges completed!')+' Your progress is saved.'+(chapter===2?' Ready for something harder? Three challenge worlds are next.':chapter===5?' You can replay any chapter to practice.':' The next adventure is waiting.');
 document.querySelector('#next').textContent=chapter===chapters.length-1?'Back to the nursery ↗':'Next: '+chapters[chapter+1].name+' ↗';modal.classList.remove('hidden');story.open(chapter,true);
}
function resize(){const w=container.clientWidth,h=container.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();}new ResizeObserver(resize).observe(container);
camera.position.set(12,12,19);camera.lookAt(0,0,-1);loadChapter(chapter);
let last=performance.now();function animate(now){requestAnimationFrame(animate);const dt=Math.min((now-last)/1000,.04);last=now;time+=dt;
 const movingLift=chapters[chapter].lift;if(movingLift&&!paused&&!storyPaused&&!won){const p=movingLift.surface,oldX=p.x;p.x=Math.sin(time*.8+movingLift.phase)*1.6;movingLift.mesh.position.x=p.x;if(Math.abs(baby.position.y-p.top)<.04&&Math.abs(baby.position.x-oldX)<p.w/2+.18&&Math.abs(baby.position.z-p.z)<p.d/2+.18)baby.position.x+=p.x-oldX;const s=stars[5];s.m.position.x=p.x;}
 if(!won&&!paused&&!storyPaused){let dx=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0);let dz=(keys.has('KeyS')||keys.has('ArrowDown')?1:0)-(keys.has('KeyW')||keys.has('ArrowUp')?1:0);const moving=dx||dz;const len=Math.hypot(dx,dz)||1;dx/=len;dz/=len;let nx=THREE.MathUtils.clamp(baby.position.x+dx*3.5*dt,-11.6,11.6),nz=THREE.MathUtils.clamp(baby.position.z+dz*3.5*dt,-6.7,9);let nextGround=.1;for(const p of platforms){if(Math.abs(nx-p.x)<p.w/2+.18&&Math.abs(nz-p.z)<p.d/2+.18){if(baby.position.y>=p.top-.15)nextGround=Math.max(nextGround,p.top);else{nx=baby.position.x;nz=baby.position.z;}}}ground=nextGround;if(keys.has('Space')&&baby.position.y<=ground+.02){vy=5.5;keys.delete('Space');}vy-=13*dt;baby.position.y=Math.max(ground,baby.position.y+vy*dt);if(baby.position.y===ground)vy=Math.max(0,vy);baby.position.x=nx;baby.position.z=nz;if(moving){const target=Math.atan2(dx,dz);baby.rotation.y+=Math.atan2(Math.sin(target-baby.rotation.y),Math.cos(target-baby.rotation.y))*Math.min(1,dt*12);legs[0].rotation.x=Math.sin(time*11)*.5;legs[1].rotation.x=-Math.sin(time*11)*.5;}else legs.forEach(l=>l.rotation.x*=.8);for(const s of stars){if(!s.got&&baby.position.distanceTo(s.m.position)<1.35){s.got=true;s.m.visible=false;count++;updateHUD();notify(count===stars.length?(chapter<3?'All stars! Find Teddy.':'All stars! Finish the brain challenges, then find Teddy.'):'A little star, a big discovery! '+count+' of '+stars.length);}}const dist=Math.hypot(baby.position.x-4,baby.position.z+4.65);if(dist<1.45&&count===stars.length&&(chapter<3||solvedActivities.length===3)){finishChapter();}else if(dist<1.5&&time%4<dt)notify(count<stars.length?'Teddy needs '+(stars.length-count)+' more stars.':'Finish all three brain challenges to help Teddy!');}for(const s of stars){s.m.rotation.y=time*.9;s.m.position.y=s.base+Math.sin(time*2+s.base)*.13;}const desired=new THREE.Vector3(baby.position.x*.35+10,11.5,baby.position.z*.3+15);camera.position.lerp(desired,1-Math.exp(-dt*2));camera.lookAt(baby.position.x*.3,0.7,baby.position.z*.3-1);renderer.render(scene,camera);}requestAnimationFrame(animate);
// Read-only state for smoke testing and diagnostics.
window.adventure={get state(){return {storyPaused,activityPaused:paused,activities:solvedActivities,starTargets:stars.map(s=>s.m.position.toArray()),chapter,completed:[...completed],stars:count,won,position:baby.position.toArray(),renderedFrames:renderer.info.render.frame};}};
