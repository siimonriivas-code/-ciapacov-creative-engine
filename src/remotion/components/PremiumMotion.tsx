import {Img,interpolate,useCurrentFrame,useVideoConfig} from 'remotion'
import type {ReactNode} from 'react'
import {clamp,ease,type VideoBrand} from '../compositions/shared'

const p=(frame:number,start:number,end:number)=>interpolate(frame,[start,end],[0,1],{...clamp,easing:ease})

export function HeadlineMaskStack({lines,brand,startSeconds=0}:{lines:string[];brand:VideoBrand;startSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig()
  return <div style={{display:'grid',gap:4}}>{lines.map((line,i)=>{const local=p(frame,(startSeconds+i*.16)*fps,(startSeconds+.72+i*.16)*fps);return <div key={`${line}-${i}`} style={{overflow:'hidden'}}><div style={{fontSize:'clamp(42px,8vw,108px)',fontWeight:930,lineHeight:.88,letterSpacing:'-.055em',transform:`translateY(${(1-local)*108}%)`,opacity:local,color:i===lines.length-1?brand.accent:brand.ink}}>{line}</div></div>})}</div>
}

export function TravelingMatte({children,brand,startSeconds=0,durationSeconds=.85,direction='left'}:{children:ReactNode;brand:VideoBrand;startSeconds?:number;durationSeconds?:number;direction?:'left'|'right'|'up'|'down'}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const progress=p(frame,startSeconds*fps,(startSeconds+durationSeconds)*fps)
  const horizontal=direction==='left'||direction==='right';const sign=(direction==='right'||direction==='down')?1:-1
  const x=horizontal?sign*(1-progress)*110:0;const y=!horizontal?sign*(1-progress)*110:0
  return <div style={{position:'relative',overflow:'hidden'}}>{children}<div style={{position:'absolute',inset:0,background:brand.accent,transform:`translate(${x}%,${y}%)`,zIndex:4}}/></div>
}

export function MetricHandoff({metrics,brand,startSeconds=0,holdSeconds=2}:{metrics:{value:string;label:string}[];brand:VideoBrand;startSeconds?:number;holdSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const count=Math.max(1,metrics.length);const index=Math.min(count-1,Math.max(0,Math.floor((frame/fps-startSeconds)/holdSeconds)));const active=metrics[index]??{value:'00',label:'Métrica'};const localStart=(startSeconds+index*holdSeconds)*fps;const local=p(frame,localStart,localStart+.55*fps)
  return <div style={{display:'grid',gridTemplateColumns:'1fr 170px',gap:22,alignItems:'end'}}><div><div style={{fontSize:'clamp(84px,15vw,190px)',fontWeight:950,lineHeight:.78,letterSpacing:'-.07em',transform:`translateY(${(1-local)*34}px)`,opacity:local}}>{active.value}</div><div style={{height:7,background:brand.line,marginTop:24,overflow:'hidden'}}><div style={{height:'100%',width:`${((index+local)/count)*100}%`,background:brand.primary}}/></div></div><div style={{fontSize:'clamp(17px,2.4vw,28px)',fontWeight:790,lineHeight:1.06,color:brand.muted??brand.ink}}>{active.label}<div style={{fontSize:12,letterSpacing:2,color:brand.accent,marginTop:16,fontWeight:900}}>{String(index+1).padStart(2,'0')} / {String(count).padStart(2,'0')}</div></div></div>
}

export function EvidenceStack({sources,brand,startSeconds=0}:{sources:{src?:string;label:string}[];brand:VideoBrand;startSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const shown=sources.slice(0,4)
  return <div style={{position:'relative',height:'100%',minHeight:420}}>{shown.map((item,i)=>{const local=p(frame,(startSeconds+i*.2)*fps,(startSeconds+.65+i*.2)*fps);const rotation=[-4,3,-1,5][i]??0;return <div key={`${item.label}-${i}`} style={{position:'absolute',left:`${i*9}%`,top:`${i*6}%`,width:'72%',height:'70%',background:brand.surfaceAlt??brand.surface,border:`1px solid ${brand.line}`,boxShadow:'0 18px 46px rgba(0,0,0,.1)',transform:`translateY(${(1-local)*44}px) rotate(${rotation*local}deg)`,opacity:local,overflow:'hidden',zIndex:i+1}}>{item.src?<Img src={item.src} style={{width:'100%',height:'100%',objectFit:'cover'}}/>:<div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',fontSize:15,fontWeight:850,letterSpacing:1.5,color:brand.muted??brand.ink}}>VERIFIED MEDIA SLOT</div>}<div style={{position:'absolute',left:16,bottom:14,background:brand.surface,color:brand.ink,padding:'7px 9px',fontSize:11,fontWeight:850}}>{item.label}</div></div>})}</div>
}

export function NetworkBuild({nodes,brand,startSeconds=0}:{nodes:{label:string;x:number;y:number}[];brand:VideoBrand;startSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();return <div style={{position:'relative',height:'100%',minHeight:420}}><svg viewBox="0 0 1000 700" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>{nodes.slice(0,-1).map((node,i)=>{const next=nodes[i+1];const local=p(frame,(startSeconds+.35+i*.28)*fps,(startSeconds+.9+i*.28)*fps);return <line key={`line-${i}`} x1={node.x} y1={node.y} x2={node.x+(next.x-node.x)*local} y2={node.y+(next.y-node.y)*local} stroke={i%2?brand.accent:brand.primary} strokeWidth="8" strokeLinecap="round"/>})}{nodes.map((node,i)=>{const local=p(frame,(startSeconds+i*.28)*fps,(startSeconds+.48+i*.28)*fps);return <g key={`${node.label}-${i}`} transform={`translate(${node.x} ${node.y}) scale(${Math.max(.01,local)})`}><circle r="34" fill={brand.surface} stroke={i%2?brand.accent:brand.primary} strokeWidth="9"/><circle r="9" fill={i%2?brand.accent:brand.primary}/></g>})}</svg>{nodes.map((node,i)=>{const local=p(frame,(startSeconds+.2+i*.28)*fps,(startSeconds+.65+i*.28)*fps);return <div key={`label-${node.label}-${i}`} style={{position:'absolute',left:`${node.x/10}%`,top:`${node.y/7}%`,translate:'-50% 38px',fontSize:13,fontWeight:800,letterSpacing:.7,opacity:local,whiteSpace:'nowrap'}}>{node.label}</div>})}</div>
}

export function FlowPulse({brand,startSeconds=0,durationSeconds=3}:{brand:VideoBrand;startSeconds?:number;durationSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const local=interpolate(frame,[startSeconds*fps,(startSeconds+durationSeconds)*fps],[0,1],clamp);const x=(local%1)*100
  return <div style={{position:'relative',height:28,background:brand.line,borderRadius:999,overflow:'hidden'}}><div style={{position:'absolute',left:`${x}%`,top:0,bottom:0,width:'22%',translate:'-100% 0',background:`linear-gradient(90deg,transparent,${brand.primary},${brand.accent},transparent)`}}/></div>
}

export function ChartFocusSweep({children,brand,startSeconds=0,durationSeconds=1.4}:{children:ReactNode;brand:VideoBrand;startSeconds?:number;durationSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const local=p(frame,startSeconds*fps,(startSeconds+durationSeconds)*fps)
  return <div style={{position:'relative',overflow:'hidden'}}><div style={{clipPath:`inset(0 ${(1-local)*100}% 0 0)`}}>{children}</div><div style={{position:'absolute',left:`${local*100}%`,top:0,bottom:0,width:4,background:brand.accent,boxShadow:`0 0 24px ${brand.accent}`}}/></div>
}

export function ThreePlaneParallax({background,midground,foreground,startSeconds=0}:{background?:ReactNode;midground:ReactNode;foreground?:ReactNode;startSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const local=p(frame,startSeconds*fps,(startSeconds+2.2)*fps)
  return <div style={{position:'relative',height:'100%',overflow:'hidden',perspective:900}}><div style={{position:'absolute',inset:'-4%',transform:`translate3d(${(1-local)*-16}px,${(1-local)*8}px,-80px) scale(1.08)`}}>{background}</div><div style={{position:'absolute',inset:0,transform:`translate3d(${(1-local)*18}px,${(1-local)*18}px,0)`,opacity:.45+.55*local}}>{midground}</div><div style={{position:'absolute',inset:0,transform:`translate3d(${(1-local)*38}px,${(1-local)*26}px,80px)`}}>{foreground}</div></div>
}

export const executablePremiumMotionIds=[
  'PMM-TYPE-001','PMM-TRANS-001','PMM-DATA-002','PMM-DOC-001','PMM-SYSTEM-001','PMM-SYSTEM-002','PMM-DATA-003','PMM-SPATIAL-001'
] as const
