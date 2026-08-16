import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { clamp,ease,PersistentChrome,SafeFrame,type VideoBrand } from './shared'

type RouteGroup={label:string;items:string[]}
type Point={x:number;y:number}
const ROUTE_PATH='M72 752 C166 206 382 822 506 430 C608 110 716 558 846 142'
const cubic=(p0:Point,p1:Point,p2:Point,p3:Point,t:number):Point=>{const u=1-t;return{x:u*u*u*p0.x+3*u*u*t*p1.x+3*u*t*t*p2.x+t*t*t*p3.x,y:u*u*u*p0.y+3*u*u*t*p1.y+3*u*t*t*p2.y+t*t*t*p3.y}}
const routePoint=(progress:number):Point=>{const p=Math.max(0,Math.min(1,progress));if(p<.58){const t=p/.58;return cubic({x:72,y:752},{x:166,y:206},{x:382,y:822},{x:506,y:430},t)}const t=(p-.58)/.42;return cubic({x:506,y:430},{x:608,y:110},{x:716,y:558},{x:846,y:142},t)}
const normalizeGroups=(stops:string[],groups?:RouteGroup[]):RouteGroup[]=>groups?.length?groups:stops.map((s,i)=>({label:`PARADA ${String(i+1).padStart(2,'0')}`,items:[s]}))

export function RouteJourneyVertical({brand,title,stops,groups,durationSeconds=30,kicker='RUTAS PROGRAMADAS',highlight,footer}:{brand:VideoBrand;title:string;stops:string[];groups?:RouteGroup[];durationSeconds?:number;kicker?:string;highlight?:string;footer?:string}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const routeGroups=normalizeGroups(stops,groups);const groupCount=Math.max(1,routeGroups.length)
  const titleY=interpolate(frame,[.18*fps,1.05*fps],[38,0],{...clamp,easing:ease});const titleOpacity=interpolate(frame,[.1*fps,.7*fps],[0,1],clamp)
  const routeStart=1.6*fps;const routeEnd=Math.max(7,durationSeconds-5.5)*fps;const progress=interpolate(frame,[routeStart,routeEnd],[0,1],clamp)
  const activeIndex=Math.min(groupCount-1,Math.floor(progress*groupCount));const active=routeGroups[activeIndex]??routeGroups[0]
  const point=routePoint(progress);const pathLength=1050
  const activeStart=routeStart+(activeIndex/groupCount)*(routeEnd-routeStart);const panelIn=interpolate(frame,[activeStart,activeStart+.48*fps],[18,0],{...clamp,easing:ease});const panelOpacity=interpolate(frame,[activeStart,activeStart+.4*fps],[0,1],clamp)
  const neutral=brand.surfaceAlt??brand.surface;const muted=brand.muted??brand.ink
  return <SafeFrame brand={brand}>
    <div style={{position:'absolute',inset:-88,overflow:'hidden',pointerEvents:'none'}}>
      {Array.from({length:8}).map((_,i)=><div key={`v${i}`} style={{position:'absolute',top:0,bottom:0,left:`${(i+1)*11}%`,width:1,background:brand.line,opacity:.28}}/>)}
      {Array.from({length:10}).map((_,i)=><div key={`h${i}`} style={{position:'absolute',left:0,right:0,top:`${(i+1)*9}%`,height:1,background:brand.line,opacity:.18}}/>)}
      <div style={{position:'absolute',right:-160,top:130,width:520,height:520,borderRadius:'50%',border:`1px solid ${brand.line}`,opacity:.45}}/>
      <div style={{position:'absolute',right:-70,top:220,width:340,height:340,borderRadius:'50%',border:`1px solid ${brand.line}`,opacity:.3}}/>
    </div>

    <div style={{position:'relative',zIndex:3,display:'grid',gridTemplateColumns:'1fr auto',alignItems:'start',gap:30,marginTop:50}}>
      <div>
        <div style={{display:'flex',alignItems:'center',gap:16,fontSize:23,fontWeight:900,letterSpacing:3.2,color:brand.accent}}><span style={{width:54,height:5,background:brand.accent,display:'inline-block'}}/>{kicker}</div>
        <div style={{fontSize:88,lineHeight:.92,fontWeight:900,letterSpacing:-4.2,maxWidth:720,marginTop:26,translate:`0 ${titleY}px`,opacity:titleOpacity}}>{title}</div>
      </div>
      <div style={{width:96,height:96,borderRadius:24,border:`2px solid ${brand.line}`,background:neutral,display:'grid',placeItems:'center',marginTop:6}}>
        <div style={{width:30,height:30,background:brand.primary,borderRadius:'52% 48% 55% 45% / 60% 42% 58% 40%',rotate:'45deg'}}/>
      </div>
    </div>

    <div style={{position:'absolute',left:0,right:0,top:360,height:840,zIndex:1}}>
      <svg viewBox="0 0 900 900" style={{position:'absolute',inset:0,width:'100%',height:'100%',overflow:'visible'}}>
        <path d={ROUTE_PATH} fill="none" stroke={brand.line} strokeWidth="38" strokeLinecap="round" opacity=".55"/>
        <path d={ROUTE_PATH} fill="none" stroke={brand.surface} strokeWidth="3" strokeLinecap="round" strokeDasharray="14 16" opacity=".95"/>
        <path d={ROUTE_PATH} fill="none" stroke={brand.primary} strokeWidth="9" strokeLinecap="round" strokeDasharray={pathLength} strokeDashoffset={pathLength*(1-progress)}/>
        {routeGroups.map((g,i)=>{const gp=routePoint((i+.5)/groupCount);const reached=progress>=(i+.35)/groupCount;const activeNode=i===activeIndex;return <g key={`${g.label}-${i}`}>
          <circle cx={gp.x} cy={gp.y} r={activeNode?24:16} fill={reached?brand.surface:neutral} stroke={activeNode?brand.accent:reached?brand.primary:brand.line} strokeWidth={activeNode?8:5}/>
          {activeNode&&<circle cx={gp.x} cy={gp.y} r="7" fill={brand.accent}/>} 
        </g>})}
      </svg>
      <div style={{position:'absolute',left:point.x-17,top:point.y-17,width:34,height:34,borderRadius:'52% 48% 55% 45% / 60% 42% 58% 40%',background:brand.primary,rotate:'45deg',boxShadow:`0 0 0 10px ${brand.surface},0 12px 30px rgba(0,0,0,.12)`}}/>
    </div>

    <div style={{position:'absolute',left:42,right:42,bottom:250,zIndex:4,display:'grid',gridTemplateColumns:'140px 1fr',gap:20,alignItems:'stretch',translate:`0 ${panelIn}px`,opacity:panelOpacity}}>
      <div style={{background:brand.accent,color:brand.surface,borderRadius:26,padding:'26px 22px',display:'flex',flexDirection:'column',justifyContent:'space-between',minHeight:210}}>
        <span style={{fontSize:18,fontWeight:800,letterSpacing:2,opacity:.86}}>TRAMO</span>
        <strong style={{fontSize:54,lineHeight:.86}}>{String(activeIndex+1).padStart(2,'0')}</strong>
        <span style={{fontSize:16,opacity:.82}}>{String(groupCount).padStart(2,'0')} EN TOTAL</span>
      </div>
      <div style={{background:neutral,border:`1px solid ${brand.line}`,borderRadius:26,padding:'28px 30px',boxShadow:'0 20px 48px rgba(0,0,0,.06)',minHeight:210}}>
        <div style={{fontSize:21,fontWeight:900,letterSpacing:2.6,color:brand.accent}}>{active?.label}</div>
        <div style={{display:'grid',gridTemplateColumns:active?.items.length>3?'1fr 1fr':'1fr',gap:'8px 20px',marginTop:18}}>
          {(active?.items??[]).slice(0,8).map((item,i)=><div key={`${item}-${i}`} style={{display:'flex',gap:12,alignItems:'flex-start',fontSize:26,lineHeight:1.08,fontWeight:760,color:brand.ink}}><span style={{width:8,height:8,borderRadius:'50%',background:brand.primary,marginTop:10,flex:'0 0 auto'}}/>{item}</div>)}
        </div>
      </div>
    </div>

    {(highlight||footer)&&<div style={{position:'absolute',left:42,right:42,bottom:190,zIndex:5,display:'flex',alignItems:'center',justifyContent:'space-between',gap:26,fontSize:20,color:muted}}>
      {highlight&&<strong style={{fontSize:24,color:brand.ink}}>{highlight}</strong>}
      {footer&&<span style={{marginLeft:'auto',textAlign:'right'}}>{footer}</span>}
    </div>}
    <PersistentChrome brand={brand} label={kicker}/>
  </SafeFrame>
}
