import fs from 'node:fs'
import path from 'node:path'

const root=path.resolve(new URL('../',import.meta.url).pathname)
const presets=JSON.parse(fs.readFileSync(path.join(root,'src/registry/first-party-lottie-presets.json'),'utf8'))
const outDir=path.join(root,'public/motion/first-party')
fs.mkdirSync(outDir,{recursive:true})

const C={primary:[0.0,0.55,0.85,1],accent:[0.54,0.18,0.33,1],secondary:[0.71,0.94,0.98,1],ink:[0.09,0.13,0.15,1],surface:[1,1,1,1],line:[0.77,0.82,0.84,1]}
const ease={i:{x:[0.667],y:[1]},o:{x:[0.333],y:[0]}}
const k=(t,s,e)=>({...ease,t,s:Array.isArray(s)?s:[s],e:Array.isArray(e)?e:[e]})
const anim=(frames)=>({a:1,k:[...frames,{t:frames.at(-1).t+(frames.at(-1).hold??30),s:frames.at(-1).e}]})
const stat=v=>({a:0,k:v})
const tr=({p=[0,0],s=[100,100],r=0,o=100,animated={}}={})=>({p:animated.p??stat(p),a:stat([0,0]),s:animated.s??stat(s),r:animated.r??stat(r),o:animated.o??stat(o),sk:stat(0),sa:stat(0)})
const ellipse=(size,pos=[0,0],name='Ellipse')=>({d:1,ty:'el',s:stat(size),p:stat(pos),nm:name})
const rect=(size,pos=[0,0],round=0,name='Rect')=>({d:1,ty:'rc',s:stat(size),p:stat(pos),r:stat(round),nm:name})
const pathShape=(vertices,closed=true,name='Path')=>({ty:'sh',ks:stat({i:vertices.map(()=>[0,0]),o:vertices.map(()=>[0,0]),v:vertices,c:closed}),nm:name})
const fill=(color,name='Fill')=>({ty:'fl',c:stat(color),o:stat(100),r:1,bm:0,nm:name})
const stroke=(color,w=5,opacity=100,name='Stroke')=>({ty:'st',c:stat(color),o:stat(opacity),w:stat(w),lc:2,lj:2,ml:4,bm:0,nm:name})
const group=(items,name='Group',transform={})=>({ty:'gr',it:[...items,{ty:'tr',...tr(transform),nm:'Transform'}],nm:name,np:items.length,cix:2,bm:0,ix:1,mn:'ADBE Vector Group',hd:false})
const layer=(ind,name,shapes,{p=[200,200],s=[100,100],r=0,o=100,animated={}}={})=>({ddd:0,ind,ty:4,nm:name,sr:1,ks:{o:animated.o??stat(o),r:animated.r??stat(r),p:animated.p??stat([...p,0]),a:stat([0,0,0]),s:animated.s??stat([...s,100])},ao:0,shapes,ip:0,op:300,st:0,bm:0})
const base=(name,op,layers,w=400,h=400)=>({v:'5.12.2',fr:30,ip:0,op,w,h,nm:name,ddd:0,assets:[],layers:layers.map((x,i)=>({...x,ind:i+1,op})),markers:[]})
const pulseScale=(op,lo=85,hi=110)=>anim([k(0,[lo,lo,100],[hi,hi,100]),k(op/2,[hi,hi,100],[lo,lo,100])])
const fadeIn=(start=0,end=18)=>anim([k(start,0,100),k(end,100,100)])

function orbit(p){
  const op=p.durationFrames;return base(p.name,op,[
    layer(1,'Ring',[group([ellipse([230,230]),stroke(C.line,4,65)])]),
    layer(2,'Dot',[group([ellipse([34,34],[0,-115]),fill(C.primary)])],{animated:{r:anim([k(0,0,360)])}}),
    layer(3,'Accent',[group([ellipse([14,14],[0,115]),fill(C.accent)])],{animated:{r:anim([k(0,0,-360)])}})
  ])
}
function dropletPulse(p){const op=p.durationFrames;const drop=pathShape([[0,-48],[32,-4],[24,32],[0,48],[-24,32],[-32,-4]],true,'Drop');return base(p.name,op,[layer(1,'Droplet',[group([drop,fill(C.primary)])],{animated:{s:pulseScale(op,88,108)}}),layer(2,'Highlight',[group([ellipse([12,18],[-10,-15]),fill(C.surface)])],{animated:{o:anim([k(0,35,85),k(op/2,85,35)])}}})])}
function ripples(p){const op=p.durationFrames;return base(p.name,op,[0,1,2].map((n)=>layer(n+1,`Ripple ${n+1}`,[group([ellipse([80,80]),stroke(n===0?C.accent:C.primary,5-n,80)])],{animated:{s:anim([k(n*12,[40,40,100],[145,145,100]),k(n*12+op*.72,[145,145,100],[155,155,100])]),o:anim([k(n*12,80,0),k(n*12+op*.72,0,0)])}})).flat()}
function liquidLoop(p){const op=p.durationFrames;const blob=pathShape([[0,-105],[86,-66],[112,20],[54,96],[-44,108],[-114,34],[-88,-60]],true,'Blob');return base(p.name,op,[layer(1,'Blob',[group([blob,fill(C.secondary)])],{animated:{r:anim([k(0,-8,12),k(op/2,12,-8)]),s:anim([k(0,[92,104,100],[108,94,100]),k(op/2,[108,94,100],[92,104,100])])}}),layer(2,'Core',[group([ellipse([118,118]),fill(C.primary)])],{animated:{p:anim([k(0,[175,210,0],[230,178,0]),k(op/2,[230,178,0],[175,210,0])]),s:pulseScale(op,76,94)}}),layer(3,'Accent',[group([ellipse([28,28]),fill(C.accent)])],{animated:{p:anim([k(0,[270,244,0],[135,164,0]),k(op/2,[135,164,0],[270,244,0])])}})])}
function nodeArrival(p){const op=p.durationFrames;return base(p.name,op,[layer(1,'Halo',[group([ellipse([150,150]),stroke(C.accent,3,45)])],{animated:{s:anim([k(0,[30,30,100],[105,105,100])]),o:anim([k(0,70,0),k(op*.7,0,0)])}}),layer(2,'Node',[group([ellipse([70,70]),fill(C.surface),stroke(C.primary,8,100),ellipse([18,18]),fill(C.accent)])],{animated:{s:anim([k(0,[10,10,100],[115,115,100]),k(op*.42,[115,115,100],[100,100,100])])}})])}
function pathFlow(p){const op=p.durationFrames;return base(p.name,op,[layer(1,'Track',[group([rect([280,16],[0,0],8),fill(C.line)])]),layer(2,'Flow',[group([rect([72,16],[0,0],8),fill(C.primary)])],{animated:{p:anim([k(0,[60,200,0],[340,200,0]),k(op*.86,[340,200,0],[60,200,0])])}})])}
function pinBreathe(p){const op=p.durationFrames;const pin=pathShape([[0,-64],[42,-26],[32,26],[0,70],[-32,26],[-42,-26]],true,'Pin');return base(p.name,op,[layer(1,'Pin',[group([pin,fill(C.accent),ellipse([28,28],[0,-20]),fill(C.surface)])],{animated:{s:pulseScale(op,94,104)}}),layer(2,'Ground',[group([ellipse([112,34],[0,86]),stroke(C.line,4,70)])],{animated:{s:anim([k(0,[75,75,100],[110,110,100]),k(op/2,[110,110,100],[75,75,100])]),o:anim([k(0,65,22),k(op/2,22,65)])}})])}
function radar(p){const op=p.durationFrames;return base(p.name,op,[layer(1,'Outer',[group([ellipse([250,250]),stroke(C.line,3,70),ellipse([160,160]),stroke(C.line,3,55),ellipse([70,70]),fill(C.accent)])]),layer(2,'Sweep',[group([rect([8,120],[0,-60],4),fill(C.primary)])],{animated:{r:anim([k(0,0,360)])}})])}
function metricRing(p){const op=p.durationFrames;return base(p.name,op,[layer(1,'Base',[group([ellipse([230,230]),stroke(C.line,18,100)])]),layer(2,'Progress',[group([ellipse([230,230]),stroke(C.primary,18,100)])],{animated:{s:anim([k(0,[30,30,100],[100,100,100])]),o:fadeIn(0,18)}}),layer(3,'Accent',[group([ellipse([42,42],[0,-115]),fill(C.accent)])],{animated:{r:anim([k(0,-90,170)])}})])}
function barCascade(p){const op=p.durationFrames;const hs=[70,125,185,235];return base(p.name,op,hs.map((h,i)=>layer(i+1,`Bar ${i+1}`,[group([rect([54,h],[0,-h/2],12),fill(i===3?C.accent:i===2?C.primary:C.secondary)])],{p:[92+i*74,315],animated:{s:anim([k(i*8,[100,5,100],[100,100,100])])}}))}
function counterHalo(p){const op=p.durationFrames;return base(p.name,op,[layer(1,'Halo',[group([ellipse([250,250]),stroke(C.accent,3,55)])],{animated:{s:pulseScale(op,85,106),o:anim([k(0,45,18),k(op/2,18,45)])}}),layer(2,'Core',[group([ellipse([130,130]),stroke(C.line,6,100)])],{animated:{r:anim([k(0,0,360)])}})])}
function networkPulse(p){const op=p.durationFrames;const pts=[[115,110],[285,110],[200,200],[115,290],[285,290]];const lines=[[0,2],[1,2],[2,3],[2,4]];const layers=[];lines.forEach(([a,b],i)=>{const A=pts[a],B=pts[b],cx=(A[0]+B[0])/2,cy=(A[1]+B[1])/2,len=Math.hypot(B[0]-A[0],B[1]-A[1]),rot=Math.atan2(B[1]-A[1],B[0]-A[0])*180/Math.PI;layers.push(layer(layers.length+1,`Link ${i+1}`,[group([rect([len,8],[0,0],4),fill(C.line)])],{p:[cx,cy],r:rot}))});pts.forEach((pt,i)=>layers.push(layer(layers.length+1,`Node ${i+1}`,[group([ellipse([42,42]),fill(i===2?C.accent:C.primary)])],{p:pt,animated:{s:pulseScale(op,88+i*2,104+i*2)}})));return base(p.name,op,layers)}
function pipelineFlow(p){const op=p.durationFrames;return base(p.name,op,[layer(1,'Pipe',[group([rect([310,68],[0,0],34),fill(C.line),rect([286,42],[0,0],21),fill(C.surface)])]),...[-1,0,1].map((n)=>layer(2+n+1,`Flow ${n+2}`,[group([ellipse([22,22]),fill(C.primary)])],{animated:{p:anim([k(n*18,[55,200,0],[345,200,0]),k(op*.78+n*18,[345,200,0],[55,200,0])])}}))])}
function houseRise(p){const op=p.durationFrames;const xs=[100,200,300];const layers=[];xs.forEach((x,i)=>{layers.push(layer(layers.length+1,`House ${i+1}`,[group([rect([78,68],[0,22],10),fill(i===1?C.primary:C.secondary),pathShape([[-48,-8],[0,-48],[48,-8]],true,'Roof'),fill(i===1?C.accent:C.ink),rect([18,34],[0,38],3),fill(C.surface)])],{p:[x,230],animated:{p:anim([k(i*8,[x,320,0],[x,230,0])]),o:anim([k(i*8,0,100)])}}))});return base(p.name,op,layers)}
function underline(p){const op=p.durationFrames;return base(p.name,op,[layer(1,'Underline',[group([rect([290,14],[0,0],7),fill(C.accent)])],{animated:{s:anim([k(0,[0,100,100],[100,100,100])])}})])}
function quoteMark(p){const op=p.durationFrames;return base(p.name,op,[layer(1,'Quote Left',[group([ellipse([58,58],[-48,-10]),fill(C.accent),rect([26,58],[-62,28],12),fill(C.accent),ellipse([58,58],[48,-10]),fill(C.accent),rect([26,58],[34,28],12),fill(C.accent)])],{animated:{s:anim([k(0,[20,20,100],[108,108,100]),k(op*.55,[108,108,100],[100,100,100])]),o:fadeIn(0,14)}})])}
function checkSweep(p){const op=p.durationFrames;const tick=pathShape([[-64,0],[-16,46],[78,-58]],false,'Tick');return base(p.name,op,[layer(1,'Circle',[group([ellipse([250,250]),stroke(C.primary,16,100)])],{animated:{s:anim([k(0,[10,10,100],[100,100,100])])}}),layer(2,'Tick',[group([tick,stroke(C.primary,22,100)])],{animated:{s:anim([k(op*.22,[0,0,100],[118,118,100]),k(op*.68,[118,118,100],[100,100,100])]),o:anim([k(op*.22,0,100)])}})])}
function compass(p){const op=p.durationFrames;const needle=pathShape([[0,-110],[22,16],[0,2],[-22,16]],true,'Needle');return base(p.name,op,[layer(1,'Ring',[group([ellipse([260,260]),stroke(C.line,4,100),ellipse([190,190]),stroke(C.line,2,80)])]),layer(2,'Needle',[group([needle,fill(C.accent),ellipse([26,26]),fill(C.ink)])],{animated:{r:anim([k(0,-30,330)])}})])}

const builders={orbit,'droplet-pulse':dropletPulse,ripples,'liquid-loop':liquidLoop,'node-arrival':nodeArrival,'path-flow':pathFlow,'pin-breathe':pinBreathe,radar,'metric-ring':metricRing,'bar-cascade':barCascade,'counter-halo':counterHalo,'network-pulse':networkPulse,'pipeline-flow':pipelineFlow,'house-rise':houseRise,underline,'quote-mark':quoteMark,'check-sweep':checkSweep,compass}
let count=0
for(const preset of presets){const fn=builders[preset.generator];if(!fn)throw new Error(`No Lottie generator for ${preset.generator}`);const data=fn(preset);const file=path.join(outDir,`${preset.id}.json`);fs.writeFileSync(file,JSON.stringify(data));count++}
console.log(`Built ${count} first-party Lottie assets in ${path.relative(root,outDir)}`)
