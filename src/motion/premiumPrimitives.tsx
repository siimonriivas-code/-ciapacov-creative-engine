import {motion,useReducedMotion} from 'motion/react'
import type {CSSProperties,ReactNode} from 'react'

const EASE=[0.22,1,0.36,1] as const

export function LiquidAperture({children,delay=0}:{children:ReactNode;delay?:number}){
  const reduce=useReducedMotion()
  return <motion.div
    initial={reduce?false:{clipPath:'ellipse(8% 10% at 50% 54%)',opacity:.6}}
    animate={{clipPath:'ellipse(78% 82% at 50% 50%)',opacity:1}}
    transition={{duration:.9,delay,ease:EASE}}
    style={{position:'relative',overflow:'hidden',isolation:'isolate'}}
  >{children}</motion.div>
}

export function PathDroplet({progress=1,accent='var(--ce-accent)'}:{progress?:number;accent?:string}){
  const reduce=useReducedMotion()
  const p=Math.max(0,Math.min(1,progress))
  const path='M18 126 C88 30 146 172 224 92 S350 42 404 28'
  return <svg viewBox="0 0 420 160" aria-hidden="true" style={{width:'100%',height:'100%',overflow:'visible'}}>
    <path d={path} fill="none" stroke="var(--ce-line)" strokeWidth="18" strokeLinecap="round" opacity=".55"/>
    <motion.path d={path} fill="none" stroke={accent} strokeWidth="5" strokeLinecap="round" pathLength={1}
      initial={reduce?false:{pathLength:0}} animate={{pathLength:p}} transition={{duration:1.6,ease:EASE}}/>
    <motion.circle r="9" fill={accent}
      initial={reduce?false:{offsetDistance:'0%'}} animate={{offsetDistance:`${p*100}%`}}
      transition={{duration:1.6,ease:EASE}}
      style={{offsetPath:`path('${path}')`,offsetRotate:'0deg'}}/>
  </svg>
}

export function EditorialWipe({children,from='left'}:{children:ReactNode;from?:'left'|'right'|'top'|'bottom'}){
  const reduce=useReducedMotion()
  const initial:Record<string,string|number>=from==='left'?{x:'-104%'}:from==='right'?{x:'104%'}:from==='top'?{y:'-104%'}:{y:'104%'}
  return <div style={{position:'relative',overflow:'hidden'}}>
    {children}
    {!reduce&&<motion.div initial={{...initial,opacity:1}} animate={{x:0,y:0,opacity:0}} transition={{duration:.72,ease:EASE}}
      style={{position:'absolute',inset:0,background:'var(--ce-surface-alt)',pointerEvents:'none'}}/>}
  </div>
}

export function DepthPlanes({foreground,content,background}:{foreground?:ReactNode;content:ReactNode;background?:ReactNode}){
  const reduce=useReducedMotion()
  return <div style={{position:'relative',overflow:'hidden',minHeight:240,perspective:900}}>
    <motion.div initial={reduce?false:{scale:1.05,x:-10}} animate={{scale:1,x:0}} transition={{duration:1.1,ease:EASE}}
      style={{position:'absolute',inset:0,zIndex:0}}>{background}</motion.div>
    <motion.div initial={reduce?false:{y:22,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.72,delay:.08,ease:EASE}}
      style={{position:'relative',zIndex:2}}>{content}</motion.div>
    <motion.div initial={reduce?false:{x:18,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:.82,delay:.16,ease:EASE}}
      style={{position:'absolute',inset:0,zIndex:3,pointerEvents:'none'}}>{foreground}</motion.div>
  </div>
}

export function DatumStage({value,label,annotation}:{value:string;label:string;annotation?:string}){
  const reduce=useReducedMotion()
  return <div style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(120px,.42fr)',gap:24,alignItems:'end'}}>
    <div>
      <motion.div initial={reduce?false:{opacity:0,y:28,scale:.96}} animate={{opacity:1,y:0,scale:1}} transition={{duration:.68,ease:EASE}}
        style={{fontSize:'clamp(64px,14vw,180px)',lineHeight:.82,fontWeight:900,letterSpacing:'-.06em',color:'var(--ce-ink)'}}>{value}</motion.div>
      <motion.div initial={reduce?false:{scaleX:0}} animate={{scaleX:1}} transition={{duration:.7,delay:.18,ease:EASE}}
        style={{height:6,background:'var(--ce-accent)',transformOrigin:'left',marginTop:16}}/>
    </div>
    <div style={{paddingBottom:4}}>
      <strong style={{display:'block',fontSize:'clamp(18px,3vw,32px)',lineHeight:1.05}}>{label}</strong>
      {annotation&&<span style={{display:'block',marginTop:10,color:'var(--ce-muted)',fontSize:'clamp(12px,1.7vw,18px)'}}>{annotation}</span>}
    </div>
  </div>
}

export function MosaicReflow({items}:{items:ReactNode[]}){
  const reduce=useReducedMotion()
  const spans=['2 / span 5','1 / span 3','5 / span 4','3 / span 4','7 / span 2']
  return <div style={{display:'grid',gridTemplateColumns:'repeat(8,minmax(0,1fr))',gridAutoRows:'minmax(70px,auto)',gap:10}}>
    {items.map((item,i)=><motion.div key={i} initial={reduce?false:{opacity:0,y:18,scale:.97}} animate={{opacity:1,y:0,scale:1}}
      transition={{duration:.5,delay:i*.08,ease:EASE}} style={{gridColumn:spans[i%spans.length],background:'var(--ce-surface-alt)',border:'1px solid var(--ce-line)',overflow:'hidden'}}>{item}</motion.div>)}
  </div>
}

export function AccentStrike({children}:{children:ReactNode}){
  const reduce=useReducedMotion()
  return <span style={{position:'relative',display:'inline-block',zIndex:0}}>
    <span style={{position:'relative',zIndex:1}}>{children}</span>
    <motion.span initial={reduce?false:{scaleX:0}} animate={{scaleX:1}} transition={{duration:.55,ease:EASE}}
      style={{position:'absolute',left:0,right:0,bottom:'.08em',height:'.18em',background:'var(--ce-accent)',transformOrigin:'left',zIndex:0,opacity:.65}}/>
  </span>
}

export function SafeAreaGuide({top=0,right=0,bottom=0,left=0,enabled=false}:{top?:number;right?:number;bottom?:number;left?:number;enabled?:boolean}){
  if(!enabled)return null
  const style:CSSProperties={position:'absolute',top,left,right,bottom,border:'1px dashed var(--ce-accent)',pointerEvents:'none',zIndex:9999,opacity:.65}
  return <div aria-hidden="true" data-development-only="safe-area-guide" style={style}/>
}
