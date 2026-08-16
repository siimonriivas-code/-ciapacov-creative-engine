import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion'
import {clamp,ease,PersistentChrome,SafeFrame,type VideoBrand} from './shared'

export function ProcessConnectedVertical({brand,title,steps,durationSeconds=30,kicker='PROCESO CONECTADO'}:{brand:VideoBrand;title:string;steps:string[];durationSeconds?:number;kicker?:string}){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const safeSteps=steps.length?steps:['Etapa 1','Etapa 2','Etapa 3']
  const start=1.6*fps,end=Math.max(7,durationSeconds-4.5)*fps;const progress=interpolate(frame,[start,end],[0,1],clamp)
  const activeIndex=Math.min(safeSteps.length-1,Math.floor(progress*safeSteps.length));const surfaceAlt=brand.surfaceAlt??brand.surface;const muted=brand.muted??brand.ink
  return <SafeFrame brand={brand}>
    <div style={{position:'absolute',inset:-88,overflow:'hidden',pointerEvents:'none'}}>
      {Array.from({length:12}).map((_,i)=><div key={`h-${i}`} style={{position:'absolute',left:0,right:0,top:`${(i+1)*7.5}%`,height:1,background:brand.line,opacity:.2}}/>)}
      {Array.from({length:8}).map((_,i)=><div key={`v-${i}`} style={{position:'absolute',top:0,bottom:0,left:`${(i+1)*11}%`,width:1,background:brand.line,opacity:.23}}/>)}
    </div>

    <div style={{position:'relative',zIndex:3,marginTop:54}}>
      <div style={{display:'flex',alignItems:'center',gap:14,fontSize:22,fontWeight:900,letterSpacing:3.2,color:brand.accent}}><span style={{width:48,height:5,background:brand.accent}}/>{kicker}</div>
      <div style={{fontSize:88,lineHeight:.9,fontWeight:900,letterSpacing:-4.6,maxWidth:800,marginTop:28}}>{title}</div>
    </div>

    <div style={{position:'absolute',left:0,right:0,top:410,bottom:270,display:'grid',gridTemplateColumns:'150px 1fr',gap:38}}>
      <div style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <div style={{position:'absolute',top:48,bottom:48,width:8,borderRadius:999,background:brand.line,overflow:'hidden'}}><div style={{position:'absolute',left:0,right:0,top:0,height:`${progress*100}%`,background:brand.primary,borderRadius:999}}/></div>
        {safeSteps.map((_,i)=>{const p=(i+.5)/safeSteps.length;const reached=progress>=p-.08;const active=i===activeIndex;return <div key={i} style={{position:'absolute',top:`${p*100}%`,translate:'0 -50%',width:active?94:72,height:active?94:72,borderRadius:'50%',background:active?brand.accent:reached?brand.primary:brand.surface,border:`6px solid ${brand.surface}`,boxShadow:`0 0 0 2px ${active?brand.accent:reached?brand.primary:brand.line}`,color:(active||reached)?brand.surface:brand.ink,display:'grid',placeItems:'center',fontSize:active?29:23,fontWeight:950,zIndex:2}}>{String(i+1).padStart(2,'0')}</div>})}
      </div>

      <div style={{position:'relative'}}>
        {safeSteps.map((step,i)=>{const p=(i+.5)/safeSteps.length;const localStart=start+(i/safeSteps.length)*(end-start);const op=interpolate(frame,[localStart-.15*fps,localStart+.45*fps],[0,1],clamp);const x=interpolate(frame,[localStart-.15*fps,localStart+.5*fps],[34,0],{...clamp,easing:ease});const active=i===activeIndex;return <div key={`${step}-${i}`} style={{position:'absolute',top:`${p*100}%`,translate:`${x}px -50%`,left:0,right:0,opacity:Math.max(active?1:.4,op*.7),background:active?surfaceAlt:'transparent',border:active?`1px solid ${brand.line}`:'1px solid transparent',borderRadius:28,padding:active?'30px 32px':'20px 32px',boxShadow:active?'0 18px 46px rgba(0,0,0,.06)':'none'}}>
          <div style={{display:'flex',alignItems:'center',gap:14,fontSize:17,fontWeight:900,letterSpacing:2.4,color:active?brand.accent:muted}}>{active&&<span style={{width:30,height:4,background:brand.accent}}/>}ETAPA {String(i+1).padStart(2,'0')}</div>
          <div style={{fontSize:active?43:30,lineHeight:1.02,fontWeight:active?880:720,letterSpacing:active?-1.6:-.7,marginTop:active?14:8,color:brand.ink}}>{step}</div>
        </div>})}
      </div>
    </div>

    <div style={{position:'absolute',left:0,right:0,bottom:205,display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:18,fontWeight:800,letterSpacing:1.8,color:muted}}>
      <span>FLUJO {String(activeIndex+1).padStart(2,'0')} / {String(safeSteps.length).padStart(2,'0')}</span>
      <span>DATOS Y ETAPAS DEBEN SER VERIFICADOS</span>
    </div>
    <PersistentChrome brand={brand} label="TECHNICAL GRID"/>
  </SafeFrame>
}
