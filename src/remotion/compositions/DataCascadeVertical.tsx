import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion'
import {clamp,ease,PersistentChrome,SafeFrame,type VideoBrand} from './shared'

type Metric={value:string;label:string;annotation?:string}
export function DataCascadeVertical({brand,title,metrics,durationSeconds=20,source='FUENTE / PERIODO REQUERIDOS'}:{brand:VideoBrand;title:string;metrics:Metric[];durationSeconds?:number;source?:string}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const safeMetrics=metrics.length?metrics:[{value:'00',label:'Métrica validada'}]
  const start=1.3*fps,end=Math.max(5,durationSeconds-3.2)*fps;const progress=interpolate(frame,[start,end],[0,1],clamp)
  const activeIndex=Math.min(safeMetrics.length-1,Math.floor(progress*safeMetrics.length));const active=safeMetrics[activeIndex]
  const segmentStart=start+(activeIndex/safeMetrics.length)*(end-start);const enter=interpolate(frame,[segmentStart,segmentStart+.6*fps],[0,1],{...clamp,easing:ease});const y=interpolate(enter,[0,1],[52,0],clamp)
  const surfaceAlt=brand.surfaceAlt??brand.surface;const muted=brand.muted??brand.ink
  return <SafeFrame brand={brand}>
    <div style={{position:'absolute',inset:-88,pointerEvents:'none',overflow:'hidden'}}>
      <div style={{position:'absolute',left:'67%',top:0,bottom:0,width:1,background:brand.line}}/>
      <div style={{position:'absolute',left:0,right:0,top:'72%',height:1,background:brand.line}}/>
      <div style={{position:'absolute',right:-120,top:100,width:460,height:460,borderRadius:'50%',border:`1px solid ${brand.line}`,opacity:.45}}/>
      <div style={{position:'absolute',right:-10,top:210,width:240,height:240,borderRadius:'50%',background:brand.secondary,opacity:.25}}/>
    </div>

    <div style={{position:'relative',zIndex:2,marginTop:54}}>
      <div style={{display:'flex',alignItems:'center',gap:14,fontSize:22,fontWeight:900,letterSpacing:3.4,color:brand.accent}}><span style={{width:48,height:5,background:brand.accent}}/>RESULTADOS</div>
      <div style={{fontSize:90,lineHeight:.9,fontWeight:900,letterSpacing:-4.5,maxWidth:790,marginTop:28}}>{title}</div>
    </div>

    <div style={{position:'absolute',left:0,right:0,top:430,height:720,display:'grid',gridTemplateColumns:'1fr 190px',gap:28,alignItems:'stretch'}}>
      <div style={{position:'relative',background:surfaceAlt,border:`1px solid ${brand.line}`,borderRadius:34,padding:'52px 46px',overflow:'hidden'}}>
        <div style={{position:'absolute',left:0,top:0,bottom:0,width:12,background:activeIndex===0?brand.accent:brand.primary}}/>
        <div style={{fontSize:21,fontWeight:900,letterSpacing:3,color:brand.accent}}>DATO {String(activeIndex+1).padStart(2,'0')}</div>
        <div style={{fontSize:190,lineHeight:.78,fontWeight:950,letterSpacing:-10,marginTop:74,color:activeIndex===0?brand.accent:brand.ink,transform:`translateY(${y}px)`,opacity:enter}}>{active.value}</div>
        <div style={{fontSize:37,lineHeight:1.04,fontWeight:820,maxWidth:630,marginTop:42,transform:`translateY(${y*.45}px)`,opacity:enter}}>{active.label}</div>
        {active.annotation&&<div style={{fontSize:21,lineHeight:1.25,color:muted,maxWidth:600,marginTop:22,opacity:enter}}>{active.annotation}</div>}
      </div>
      <div style={{display:'grid',gridTemplateRows:`repeat(${safeMetrics.length},1fr)`,gap:10}}>
        {safeMetrics.map((m,i)=>{const selected=i===activeIndex;return <div key={`${m.label}-${i}`} style={{background:selected?brand.accent:brand.surface,border:`1px solid ${selected?brand.accent:brand.line}`,borderRadius:22,padding:'18px 16px',display:'flex',flexDirection:'column',justifyContent:'space-between',color:selected?brand.surface:brand.ink,transition:'none'}}>
          <span style={{fontSize:15,fontWeight:900,letterSpacing:2,opacity:.78}}>{String(i+1).padStart(2,'0')}</span>
          <strong style={{fontSize:selected?34:27,lineHeight:.9,letterSpacing:-1.4,wordBreak:'break-word'}}>{m.value}</strong>
        </div>})}
      </div>
    </div>

    <div style={{position:'absolute',left:0,right:0,top:1195,display:'grid',gridTemplateColumns:'1fr auto',gap:20,alignItems:'center'}}>
      <div style={{height:8,borderRadius:999,background:brand.line,overflow:'hidden'}}><div style={{height:'100%',width:`${Math.max(3,progress*100)}%`,background:brand.primary,borderRadius:999}}/></div>
      <div style={{fontSize:18,fontWeight:900,letterSpacing:2,color:muted}}>{String(activeIndex+1).padStart(2,'0')} / {String(safeMetrics.length).padStart(2,'0')}</div>
    </div>

    <div style={{position:'absolute',left:0,bottom:210,fontSize:20,fontWeight:700,letterSpacing:1.4,color:muted}}>{source}</div>
    <PersistentChrome brand={brand} label="DATA THEATER"/>
  </SafeFrame>
}
