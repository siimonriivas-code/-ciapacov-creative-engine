import {Img,interpolate,useCurrentFrame,useVideoConfig} from 'remotion'
import type {ReactNode,CSSProperties} from 'react'
import {clamp,ease,type VideoBrand} from '../compositions/shared'

const prog=(frame:number,start:number,end:number)=>interpolate(frame,[start,end],[0,1],{...clamp,easing:ease})
const slot=(brand:VideoBrand)=>brand.surfaceAlt??brand.surface

export function RefractionWindow({children,brand,startSeconds=0,durationSeconds=1.2}:{children:ReactNode;brand:VideoBrand;startSeconds?:number;durationSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+durationSeconds)*fps);const size=interpolate(p,[0,1],[18,78],clamp)
  return <div style={{position:'relative',overflow:'hidden',height:'100%'}}><div style={{position:'absolute',inset:0,opacity:.32}}>{children}</div><div style={{position:'absolute',inset:0,clipPath:`circle(${size}% at ${30+p*35}% ${58-p*12}%)`,transform:`scale(${1+.025*p})`,filter:'contrast(1.04) saturate(1.03)'}}>{children}</div><div style={{position:'absolute',width:`${size*1.6}%`,aspectRatio:'1',left:`${30+p*35}%`,top:`${58-p*12}%`,translate:'-50% -50%',borderRadius:'50%',border:`2px solid ${brand.accent}`,opacity:.6-p*.22,pointerEvents:'none'}}/></div>
}

export function WaveHandoff({wave,brand,startSeconds=0,durationSeconds=1.5}:{wave:ReactNode;brand:VideoBrand;startSeconds?:number;durationSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+durationSeconds)*fps)
  return <div style={{position:'absolute',left:'-18%',right:'-18%',bottom:0,height:'34%',transform:`translateX(${interpolate(p,[0,1],[-18,18],clamp)}%)`,color:brand.primary,pointerEvents:'none'}}>{wave}</div>
}

export function RippleDatum({value,label,brand,startSeconds=0}:{value:string;label:string;brand:VideoBrand;startSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+1.2)*fps)
  return <div style={{position:'relative',height:'100%',minHeight:360,display:'grid',placeItems:'center'}}>{[1,2,3].map((n)=><div key={n} style={{position:'absolute',width:120+n*92*p,height:120+n*92*p,borderRadius:'50%',border:`${Math.max(1,4-n)}px solid ${n===1?brand.accent:brand.primary}`,opacity:(1-p*.42)/n}}/>)}<div style={{position:'relative',textAlign:'center',zIndex:2,transform:`scale(${.86+.14*p})`,opacity:p}}><strong style={{display:'block',fontSize:'clamp(72px,14vw,170px)',lineHeight:.78,letterSpacing:'-.06em'}}>{value}</strong><span style={{display:'block',marginTop:24,fontSize:'clamp(18px,3vw,34px)',fontWeight:800,color:brand.muted??brand.ink}}>{label}</span></div></div>
}

export function TerritoryDrift({children,brand,startSeconds=0,durationSeconds=5}:{children?:ReactNode;brand:VideoBrand;startSeconds?:number;durationSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+durationSeconds)*fps)
  return <div style={{position:'relative',height:'100%',overflow:'hidden',background:slot(brand)}}><div style={{position:'absolute',inset:'-18%',transform:`translate(${interpolate(p,[0,1],[-6,6],clamp)}%,${interpolate(p,[0,1],[4,-5],clamp)}%) rotate(-7deg)`,background:`repeating-linear-gradient(0deg,transparent 0 52px,${brand.line} 52px 54px),repeating-linear-gradient(90deg,transparent 0 64px,${brand.line} 64px 66px)`,opacity:.55}}/><div style={{position:'absolute',left:'14%',top:'18%',width:'60%',height:'54%',border:`2px solid ${brand.accent}`,borderRadius:48,background:'color-mix(in srgb, white 24%, transparent)',backdropFilter:'blur(2px)'}}/><div style={{position:'relative',zIndex:2,height:'100%'}}>{children}</div></div>
}

export function RouteLens({items,activeIndex,brand}:{items:string[];activeIndex:number;brand:VideoBrand}){
  const count=Math.max(1,items.length)
  return <div style={{display:'grid',gridTemplateColumns:`repeat(${Math.min(count,5)},minmax(0,1fr))`,gap:10,alignItems:'stretch'}}>{items.slice(0,5).map((item,i)=>{const active=i===Math.max(0,Math.min(activeIndex,count-1));return <div key={`${item}-${i}`} style={{minHeight:150,padding:active?'24px 20px':'18px 16px',background:active?slot(brand):brand.surface,border:`${active?3:1}px solid ${active?brand.accent:brand.line}`,borderRadius:active?28:16,display:'flex',flexDirection:'column',justifyContent:'space-between',transform:`scale(${active?1.05:.94})`,opacity:active?1:.48}}><span style={{fontSize:12,fontWeight:900,letterSpacing:2,color:active?brand.accent:brand.muted??brand.ink}}>{String(i+1).padStart(2,'0')}</span><strong style={{fontSize:active?25:18,lineHeight:1.02}}>{item}</strong></div>})}</div>
}

export function BaselineTravel({primary,secondary,brand,startSeconds=0,durationSeconds=2}:{primary:string;secondary:string;brand:VideoBrand;startSeconds?:number;durationSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+durationSeconds)*fps)
  return <div><div style={{fontSize:'clamp(46px,8vw,110px)',fontWeight:930,lineHeight:.9,letterSpacing:'-.05em'}}>{primary}</div><div style={{marginTop:22,height:48,overflow:'hidden',borderTop:`1px solid ${brand.line}`,borderBottom:`1px solid ${brand.line}`,display:'flex',alignItems:'center'}}><div style={{whiteSpace:'nowrap',fontSize:18,fontWeight:800,letterSpacing:2.2,color:brand.muted??brand.ink,transform:`translateX(${interpolate(p,[0,1],[18,-16],clamp)}%)`}}>{secondary} · {secondary} · {secondary}</div></div></div>
}

export function ScaleRelay({first,second,brand,startSeconds=0,durationSeconds=2}:{first:string;second:string;brand:VideoBrand;startSeconds?:number;durationSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+durationSeconds)*fps)
  return <div style={{display:'grid',gap:18}}><div style={{fontSize:'clamp(28px,6vw,74px)',lineHeight:.92,fontWeight:900,transform:`scale(${1-.22*p})`,transformOrigin:'left bottom',opacity:1-.48*p,color:brand.ink}}>{first}</div><div style={{fontSize:'clamp(38px,9vw,118px)',lineHeight:.88,fontWeight:950,transform:`scale(${.76+.24*p})`,transformOrigin:'left top',color:brand.accent,opacity:.45+.55*p}}>{second}</div></div>
}

export function EditorialMarginNote({children,note,brand,startSeconds=0}:{children:ReactNode;note:string;brand:VideoBrand;startSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+.7)*fps)
  return <div style={{display:'grid',gridTemplateColumns:'1fr minmax(130px,.25fr)',gap:26}}><div>{children}</div><aside style={{borderLeft:`4px solid ${brand.accent}`,paddingLeft:16,transform:`translateX(${(1-p)*22}px)`,opacity:p,fontSize:13,lineHeight:1.35,fontWeight:700,color:brand.muted??brand.ink}}>{note}</aside></div>
}

export function ComparisonGate({left,right,labelLeft,labelRight,brand,startSeconds=0,durationSeconds=2}:{left:ReactNode;right:ReactNode;labelLeft:string;labelRight:string;brand:VideoBrand;startSeconds?:number;durationSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+durationSeconds)*fps);const split=interpolate(p,[0,1],[35,65],clamp)
  return <div style={{position:'relative',height:'100%',overflow:'hidden',background:slot(brand)}}><div style={{position:'absolute',inset:0,clipPath:`inset(0 ${100-split}% 0 0)`}}>{left}</div><div style={{position:'absolute',inset:0,clipPath:`inset(0 0 0 ${split}%)`}}>{right}</div><div style={{position:'absolute',left:`${split}%`,top:0,bottom:0,width:4,translate:'-50% 0',background:brand.accent}}/><span style={{position:'absolute',left:18,top:18,padding:'8px 10px',background:brand.surface,fontSize:12,fontWeight:900}}>{labelLeft}</span><span style={{position:'absolute',right:18,top:18,padding:'8px 10px',background:brand.accent,color:brand.surface,fontSize:12,fontWeight:900}}>{labelRight}</span></div>
}

export function ImpactConstellation({metrics,brand,startSeconds=0}:{metrics:{value:string;label:string}[];brand:VideoBrand;startSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const points=[[50,50],[22,28],[78,24],[18,74],[80,72],[50,14]]
  return <div style={{position:'relative',height:'100%',minHeight:440}}><svg viewBox="0 0 1000 700" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>{metrics.slice(1,6).map((_,i)=>{const p=prog(frame,(startSeconds+.15+i*.12)*fps,(startSeconds+.7+i*.12)*fps);return <line key={i} x1="500" y1="350" x2={500+(points[i+1][0]-50)*10*p} y2={350+(points[i+1][1]-50)*7*p} stroke={brand.line} strokeWidth="4"/>})}</svg>{metrics.slice(0,6).map((m,i)=>{const p=prog(frame,(startSeconds+i*.12)*fps,(startSeconds+.55+i*.12)*fps);const [x,y]=points[i];const hero=i===0;return <div key={`${m.label}-${i}`} style={{position:'absolute',left:`${x}%`,top:`${y}%`,translate:'-50% -50%',width:hero?190:130,height:hero?190:130,borderRadius:'50%',background:hero?brand.accent:brand.surface,border:`${hero?0:2}px solid ${i%2?brand.primary:brand.line}`,color:hero?brand.surface:brand.ink,display:'grid',placeItems:'center',textAlign:'center',padding:16,transform:`scale(${.2+.8*p})`,opacity:p,zIndex:hero?2:1}}><div><strong style={{fontSize:hero?42:26,lineHeight:.86,display:'block'}}>{m.value}</strong><span style={{fontSize:hero?13:10,lineHeight:1.1,display:'block',marginTop:8}}>{m.label}</span></div></div>})}</div>
}

export function ContactSheetBuild({media,brand,startSeconds=0}:{media:{src?:string;label:string}[];brand:VideoBrand;startSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const safe=media.slice(0,6);const hero=Math.min(safe.length-1,Math.max(0,Math.floor(prog(frame,(startSeconds+1.2)*fps,(startSeconds+3.4)*fps)*safe.length)))
  return <div style={{display:'grid',gridTemplateColumns:'1.4fr .7fr .9fr',gridAutoRows:170,gap:9,height:'100%'}}>{safe.map((m,i)=>{const p=prog(frame,(startSeconds+i*.1)*fps,(startSeconds+.5+i*.1)*fps);const selected=i===hero;return <div key={`${m.label}-${i}`} style={{position:'relative',gridColumn:selected?'span 2':undefined,gridRow:selected?'span 2':undefined,overflow:'hidden',background:slot(brand),border:`1px solid ${selected?brand.accent:brand.line}`,opacity:p,transform:`translateY(${(1-p)*18}px)`}}>{m.src?<Img src={m.src} style={{width:'100%',height:'100%',objectFit:'cover'}}/>:<div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',fontSize:12,fontWeight:800,color:brand.muted??brand.ink}}>VERIFIED MEDIA</div>}<span style={{position:'absolute',left:10,bottom:10,background:brand.surface,padding:'5px 7px',fontSize:9,fontWeight:850}}>{m.label}</span></div>})}</div>
}

export function CaptionTracker({children,caption,brand,startSeconds=0,durationSeconds=4}:{children:ReactNode;caption:string;brand:VideoBrand;startSeconds?:number;durationSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+durationSeconds)*fps)
  return <div style={{position:'relative',height:'100%',overflow:'hidden'}}><div style={{height:'100%',transform:`scale(${1+.035*p}) translate(${p*-1.4}%,${p*1.2}%)`}}>{children}</div><div style={{position:'absolute',left:`${8+p*3}%`,bottom:`${8+p*2}%`,maxWidth:'68%',padding:'12px 16px',background:brand.surface,color:brand.ink,borderLeft:`5px solid ${brand.accent}`,fontSize:15,fontWeight:760,lineHeight:1.25}}>{caption}</div></div>
}

export function FieldAnnotation({children,label,brand,x=70,y=36,startSeconds=0}:{children:ReactNode;label:string;brand:VideoBrand;x?:number;y?:number;startSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+.8)*fps)
  return <div style={{position:'relative',height:'100%'}}>{children}<svg viewBox="0 0 1000 700" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}><circle cx={x*10} cy={y*7} r="12" fill={brand.accent}/><path d={`M ${x*10} ${y*7} L ${(x-12*p)*10} ${(y+12*p)*7} L ${(x-28*p)*10} ${(y+12*p)*7}`} fill="none" stroke={brand.accent} strokeWidth="5" strokeLinecap="round"/></svg><div style={{position:'absolute',left:`${Math.max(2,x-28)}%`,top:`${Math.min(86,y+12)}%`,opacity:p,background:brand.surface,border:`1px solid ${brand.line}`,padding:'9px 12px',fontSize:12,fontWeight:850,maxWidth:220}}>{label}</div></div>
}

export function SlowEvidencePush({src,brand,startSeconds=0,durationSeconds=5,alt='Verified evidence'}:{src?:string;brand:VideoBrand;startSeconds?:number;durationSeconds?:number;alt?:string}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+durationSeconds)*fps)
  return <div style={{position:'relative',height:'100%',overflow:'hidden',background:slot(brand)}}>{src?<Img src={src} alt={alt} style={{width:'100%',height:'100%',objectFit:'cover',transform:`scale(${1+.045*p}) translate(${p*-1.3}%,${p*.8}%)`}}/>:<div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',fontSize:14,fontWeight:850,color:brand.muted??brand.ink}}>VERIFIED MEDIA REQUIRED</div>}</div>
}

export function SplitAperture({children,brand,startSeconds=0,durationSeconds=.9}:{children:ReactNode;brand:VideoBrand;startSeconds?:number;durationSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+durationSeconds)*fps);const shift=p*102
  return <div style={{position:'relative',overflow:'hidden',height:'100%'}}>{children}<div style={{position:'absolute',left:0,top:0,bottom:0,width:'50.5%',background:brand.surface,transform:`translateX(${-shift}%)`}}/><div style={{position:'absolute',right:0,top:0,bottom:0,width:'50.5%',background:brand.accent,transform:`translateX(${shift}%)`}}/></div>
}

export function MatchShape({children,brand,startSeconds=0,durationSeconds=1.1}:{children:ReactNode;brand:VideoBrand;startSeconds?:number;durationSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+durationSeconds)*fps);const w=interpolate(p,[0,.55,1],[70,22,105],clamp);const h=interpolate(p,[0,.55,1],[70,22,105],clamp);const radius=interpolate(p,[0,.55,1],[50,50,8],clamp)
  return <div style={{position:'relative',height:'100%',overflow:'hidden'}}>{children}<div style={{position:'absolute',left:'50%',top:'50%',translate:'-50% -50%',width:`${w}%`,height:`${h}%`,borderRadius:`${radius}%`,border:`7px solid ${brand.accent}`,pointerEvents:'none',opacity:interpolate(p,[0,.8,1],[1,1,0],clamp)}}/></div>
}

export function DepthOcclusion({children,brand,startSeconds=0,durationSeconds=1}:{children:ReactNode;brand:VideoBrand;startSeconds?:number;durationSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+durationSeconds)*fps);const x=interpolate(p,[0,.48,.52,1],[-120,0,0,120],clamp);const scale=interpolate(p,[0,.48,.52,1],[.7,1.2,1.2,.7],clamp)
  return <div style={{position:'relative',height:'100%',overflow:'hidden'}}>{children}<div style={{position:'absolute',top:'-18%',bottom:'-18%',left:'18%',width:'65%',background:brand.ink,transform:`translateX(${x}%) scale(${scale}) rotate(8deg)`,borderRadius:80,pointerEvents:'none'}}/></div>
}

export function EditorialCut({children,anchor,brand,startSeconds=0}:{children:ReactNode;anchor:string;brand:VideoBrand;startSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+.35)*fps)
  return <div style={{position:'relative',height:'100%'}}>{children}<div style={{position:'absolute',left:18,bottom:18,display:'flex',alignItems:'center',gap:10,padding:'9px 12px',background:brand.surface,border:`1px solid ${brand.line}`,transform:`translateY(${(1-p)*16}px)`,opacity:p}}><span style={{width:34,height:5,background:brand.accent}}/><b style={{fontSize:12,letterSpacing:1.7}}>{anchor}</b></div></div>
}

export function FocusTunnel({children,brand,startSeconds=0,durationSeconds=2.5}:{children:ReactNode;brand:VideoBrand;startSeconds?:number;durationSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+durationSeconds)*fps)
  return <div style={{position:'relative',height:'100%',overflow:'hidden',display:'grid',placeItems:'center'}}>{[0,1,2,3].map(i=><div key={i} style={{position:'absolute',width:`${92-i*15+p*8}%`,height:`${88-i*14+p*8}%`,border:`${i===3?4:1}px solid ${i===3?brand.accent:brand.line}`,borderRadius:24,transform:`scale(${1+p*.06*(i+1)})`,opacity:.82-i*.12}}/>)}<div style={{position:'relative',zIndex:2,width:'62%',height:'58%',transform:`scale(${.92+.08*p})`}}>{children}</div></div>
}

export function LayerPeel({topLayer,bottomLayer,brand,startSeconds=0,durationSeconds=1.4}:{topLayer:ReactNode;bottomLayer:ReactNode;brand:VideoBrand;startSeconds?:number;durationSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+durationSeconds)*fps)
  return <div style={{position:'relative',height:'100%',overflow:'hidden',background:slot(brand)}}><div style={{position:'absolute',inset:0}}>{bottomLayer}</div><div style={{position:'absolute',inset:0,clipPath:`polygon(0 0, ${100-p*95}% 0, ${82-p*76}% 100%, 0 100%)`,filter:`drop-shadow(${18*p}px 0 22px rgba(0,0,0,.14))`}}>{topLayer}</div></div>
}

export function SectionScanner({children,label,brand,startSeconds=0,durationSeconds=3}:{children:ReactNode;label:string;brand:VideoBrand;startSeconds?:number;durationSeconds?:number}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const p=prog(frame,startSeconds*fps,(startSeconds+durationSeconds)*fps);const x=interpolate(p,[0,1],[4,96],clamp)
  return <div style={{position:'relative',height:'100%',overflow:'hidden'}}>{children}<div style={{position:'absolute',left:`${x}%`,top:0,bottom:0,width:3,background:brand.accent,boxShadow:`0 0 24px ${brand.accent}`}}/><div style={{position:'absolute',left:`${Math.min(78,x+2)}%`,top:16,background:brand.ink,color:brand.surface,padding:'7px 10px',fontSize:10,fontWeight:850,letterSpacing:1.4}}>{label}</div></div>
}

export function OverflowSentinel({children,enabled=false,brand}:{children:ReactNode;enabled?:boolean;brand:VideoBrand}){
  return <div style={{position:'relative',height:'100%'}} data-overflow-sentinel={enabled?'on':'off'}>{children}{enabled&&<div style={{position:'absolute',inset:0,border:`2px dashed ${brand.accent}`,pointerEvents:'none'}}><span style={{position:'absolute',right:5,top:5,padding:'4px 6px',fontSize:9,fontWeight:900,background:brand.accent,color:brand.surface}}>DEV · OVERFLOW BOUNDARY</span></div>}</div>
}

function hexToRgb(hex:string){const clean=hex.replace('#','');if(!/^[0-9a-f]{6}$/i.test(clean))return null;return [parseInt(clean.slice(0,2),16),parseInt(clean.slice(2,4),16),parseInt(clean.slice(4,6),16)]}
function luminance(hex:string){const rgb=hexToRgb(hex);if(!rgb)return null;const mapped=rgb.map(v=>{const s=v/255;return s<=.03928?s/12.92:Math.pow((s+.055)/1.055,2.4)});return .2126*mapped[0]+.7152*mapped[1]+.0722*mapped[2]}
export function contrastRatio(a:string,b:string){const la=luminance(a),lb=luminance(b);if(la===null||lb===null)return null;const hi=Math.max(la,lb),lo=Math.min(la,lb);return (hi+.05)/(lo+.05)}
export function ContrastSentinel({children,foreground,background,enabled=false,minRatio=4.5}:{children:ReactNode;foreground:string;background:string;enabled?:boolean;minRatio?:number}){
  const ratio=contrastRatio(foreground,background);const failed=enabled&&ratio!==null&&ratio<minRatio
  return <div style={{position:'relative',height:'100%'}} data-contrast-ratio={ratio?.toFixed(2)??'unknown'}>{children}{failed&&<div style={{position:'absolute',left:6,top:6,padding:'5px 7px',background:'#000',color:'#fff',fontSize:9,fontWeight:900,zIndex:9999}}>DEV · CONTRAST {ratio?.toFixed(2)}:1 &lt; {minRatio}:1</div>}</div>
}

export const extendedPremiumMotionIds=[
  'PMM-WATER-003','PMM-WATER-004','PMM-WATER-005','PMM-ROUTE-003','PMM-ROUTE-005','PMM-TYPE-002','PMM-TYPE-004','PMM-TYPE-005','PMM-DATA-004','PMM-DATA-005','PMM-DOC-002','PMM-DOC-003','PMM-DOC-004','PMM-DOC-005','PMM-TRANS-002','PMM-TRANS-003','PMM-TRANS-004','PMM-TRANS-005','PMM-SPATIAL-002','PMM-SPATIAL-003','PMM-SYSTEM-003','PMM-UTILITY-002','PMM-UTILITY-003'
] as const

export const premiumMotionCssSafety:CSSProperties={overflow:'hidden',isolation:'isolate'}
