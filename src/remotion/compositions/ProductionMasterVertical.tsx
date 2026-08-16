import {AbsoluteFill,Img,Sequence,interpolate,useCurrentFrame,useVideoConfig} from 'remotion'
import {PersistentChrome,SafeFrame,clamp,ease,type VideoBrand} from './shared'

type Variant='launch'|'documentary'|'before-after'|'timeline'|'testimonial'|'alert'
type Metric={value:string;label:string}
type Props={
  brand:VideoBrand;variant:Variant;title:string;subtitle?:string;kicker?:string;quote?:string;attribution?:string;
  items?:string[];metrics?:Metric[];media?:{hero?:string;before?:string;after?:string};label?:string;durationSeconds?:number
}
const fade=(frame:number,start:number,end:number)=>interpolate(frame,[start,end],[0,1],{...clamp,easing:ease})
const rise=(frame:number,start:number,end:number)=>interpolate(frame,[start,end],[32,0],{...clamp,easing:ease})

function MediaPlane({src,label,brand,mode='cover'}:{src?:string;label:string;brand:VideoBrand;mode?:'cover'|'contain'}){
  const alt=brand.surfaceAlt??brand.surface
  return <div style={{position:'relative',height:'100%',overflow:'hidden',background:alt,border:`1px solid ${brand.line}`}}>
    {src?<Img src={src} style={{width:'100%',height:'100%',objectFit:mode}}/>:<>
      <div style={{position:'absolute',inset:0,background:`repeating-linear-gradient(135deg,transparent 0 32px,${brand.line} 32px 33px)`,opacity:.45}}/>
      <div style={{position:'absolute',left:30,right:30,bottom:28,fontSize:19,lineHeight:1.15,fontWeight:850,letterSpacing:1.8,color:brand.muted??brand.ink}}>MEDIA VERIFICADA REQUERIDA<br/><span style={{fontSize:15,fontWeight:650,letterSpacing:1}}>{label}</span></div>
    </>}
  </div>
}

function EditorialHeader({brand,kicker,title,subtitle,frame,fps}:{brand:VideoBrand;kicker:string;title:string;subtitle?:string;frame:number;fps:number}){
  const op=fade(frame,0,.65*fps),y=rise(frame,0,.8*fps)
  return <div style={{position:'absolute',top:52,left:0,right:0,opacity:op,transform:`translateY(${y}px)`,zIndex:5}}>
    <div style={{display:'flex',alignItems:'center',gap:14,fontSize:21,fontWeight:900,letterSpacing:3.2,color:brand.accent}}><span style={{width:48,height:5,background:brand.accent}}/>{kicker}</div>
    <div style={{fontSize:80,lineHeight:.94,fontWeight:920,letterSpacing:-3.8,marginTop:22,maxWidth:850}}>{title}</div>
    {subtitle&&<div style={{fontSize:27,lineHeight:1.2,marginTop:20,maxWidth:790,color:brand.muted??brand.ink}}>{subtitle}</div>}
  </div>
}

export function ProductionMasterVertical({brand,variant,title,subtitle,kicker='PRODUCTION MASTER',quote,attribution,items=[],metrics=[],media={},label,durationSeconds=30}:Props){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const alt=brand.surfaceAlt??brand.surface;const muted=brand.muted??brand.ink
  const overall=interpolate(frame,[1.2*fps,Math.max(5,durationSeconds-3)*fps],[0,1],clamp)
  return <SafeFrame brand={brand}>
    <AbsoluteFill>
      <EditorialHeader brand={brand} kicker={kicker} title={title} subtitle={subtitle} frame={frame} fps={fps}/>

      {variant==='launch'&&<Sequence from={Math.round(fps*.7)}><div style={{position:'absolute',top:400,left:0,right:0,bottom:180,display:'grid',gridTemplateColumns:'1.18fr .82fr',gridTemplateRows:'1fr auto',gap:18}}>
        <div style={{gridRow:'1 / span 2',position:'relative',borderRadius:'40px 8px 8px 40px',overflow:'hidden'}}><MediaPlane src={media.hero} label="hero real opcional" brand={brand}/><div style={{position:'absolute',left:28,bottom:28,width:100,height:8,background:brand.accent}}/></div>
        <div style={{background:brand.accent,color:brand.surface,padding:'34px 30px',borderRadius:'8px 34px 8px 8px',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
          <span style={{fontSize:18,fontWeight:900,letterSpacing:2}}>MENSAJE PRINCIPAL</span>
          <strong style={{fontSize:42,lineHeight:.96,letterSpacing:-1.5}}>{metrics[0]?.label||items[0]||'Beneficio verificable'}</strong>
          <b style={{fontSize:66,lineHeight:.85}}>{metrics[0]?.value||'01'}</b>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>{(metrics.slice(1,3).length?metrics.slice(1,3):[{value:'02',label:'dato'},{value:'03',label:'siguiente paso'}]).map((m,i)=><div key={i} style={{background:alt,border:`1px solid ${brand.line}`,padding:'24px 20px',borderRadius:i?'8px 8px 34px 8px':'8px'}}><b style={{fontSize:38,lineHeight:.9,color:brand.ink}}>{m.value}</b><div style={{fontSize:17,lineHeight:1.1,marginTop:10,color:muted}}>{m.label}</div></div>)}</div>
      </div></Sequence>}

      {variant==='documentary'&&<Sequence from={Math.round(fps*.55)}><div style={{position:'absolute',top:390,left:0,right:0,bottom:185}}>
        <div style={{position:'absolute',left:0,top:0,width:'76%',height:'72%',borderRadius:'34px 10px 34px 10px',overflow:'hidden'}}><MediaPlane src={media.hero} label="evidencia real" brand={brand}/></div>
        <div style={{position:'absolute',right:0,top:'18%',width:'31%',minHeight:310,background:brand.accent,color:brand.surface,padding:'30px 28px',borderRadius:'10px 30px 10px 10px',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
          <span style={{fontSize:16,fontWeight:900,letterSpacing:2}}>EVIDENCIA</span><strong style={{fontSize:29,lineHeight:1.04}}>{items[0]||'Contexto e intervención verificada.'}</strong>
        </div>
        <div style={{position:'absolute',left:'10%',right:'4%',bottom:0,height:230,background:alt,border:`1px solid ${brand.line}`,padding:'30px 34px',display:'grid',gridTemplateColumns:'1fr .48fr',gap:28,alignItems:'end'}}>
          <div><div style={{fontSize:18,fontWeight:900,letterSpacing:2.4,color:brand.accent}}>REGISTRO DOCUMENTAL</div><div style={{fontSize:26,lineHeight:1.15,marginTop:14,color:muted}}>{items[1]||'La pieza final debe usar únicamente media aprobada para la intervención narrada.'}</div></div>
          <div style={{borderLeft:`1px solid ${brand.line}`,paddingLeft:26}}><b style={{display:'block',fontSize:62,lineHeight:.8,color:brand.ink}}>{metrics[0]?.value||'00'}</b><span style={{fontSize:18,lineHeight:1.1,color:muted}}>{metrics[0]?.label||'métrica validada'}</span></div>
        </div>
      </div></Sequence>}

      {variant==='before-after'&&<Sequence from={Math.round(fps*.55)}><div style={{position:'absolute',top:410,left:0,right:0,bottom:190,overflow:'hidden',borderRadius:34,border:`1px solid ${brand.line}`,background:alt}}>
        <div style={{position:'absolute',inset:0,display:'grid',gridTemplateColumns:'1fr 1fr'}}><MediaPlane src={media.before} label="evidencia previa" brand={brand}/><MediaPlane src={media.after} label="evidencia posterior" brand={brand}/></div>
        <div style={{position:'absolute',left:'50%',top:0,bottom:0,width:5,background:brand.surface,boxShadow:`0 0 0 1px ${brand.line}`}}/>
        <div style={{position:'absolute',left:26,top:26,background:brand.surface,padding:'13px 18px',fontSize:19,fontWeight:950,letterSpacing:2}}>ANTES</div>
        <div style={{position:'absolute',right:26,top:26,background:brand.accent,color:brand.surface,padding:'13px 18px',fontSize:19,fontWeight:950,letterSpacing:2}}>DESPUÉS</div>
        <div style={{position:'absolute',left:'50%',bottom:34,transform:'translateX(-50%)',background:brand.ink,color:brand.surface,padding:'17px 28px',fontWeight:900,fontSize:24,whiteSpace:'nowrap'}}>{metrics[0]?.value||'CAMBIO VERIFICABLE'} · {metrics[0]?.label||'resultado'}</div>
      </div></Sequence>}

      {variant==='timeline'&&<Sequence from={Math.round(fps*.55)}><div style={{position:'absolute',top:405,left:0,right:0,bottom:190,display:'grid',gridTemplateColumns:'105px 1fr',gap:32}}>
        <div style={{position:'relative'}}><div style={{position:'absolute',left:50,top:28,bottom:28,width:6,background:brand.line}}/><div style={{position:'absolute',left:50,top:28,width:6,height:`${Math.max(2,overall*92)}%`,background:brand.primary}}/>{(items.length?items:['Etapa 1','Etapa 2','Etapa 3','Etapa 4']).slice(0,6).map((_,i)=>{const y=(i+.5)/Math.min(6,Math.max(1,items.length||4))*100;const active=overall>=i/Math.max(1,(items.length||4));return <div key={i} style={{position:'absolute',left:23,top:`${y}%`,translate:'0 -50%',width:60,height:60,borderRadius:'50%',background:active?brand.accent:brand.surface,border:`6px solid ${brand.surface}`,boxShadow:`0 0 0 2px ${active?brand.accent:brand.line}`,color:active?brand.surface:brand.ink,display:'grid',placeItems:'center',fontSize:18,fontWeight:900}}>{String(i+1).padStart(2,'0')}</div>})}</div>
        <div style={{position:'relative'}}>{(items.length?items:['Etapa 1','Etapa 2','Etapa 3','Etapa 4']).slice(0,6).map((x,i)=>{const count=Math.min(6,Math.max(1,items.length||4));const y=(i+.5)/count*100;const activeIndex=Math.min(count-1,Math.floor(overall*count));const active=i===activeIndex;return <div key={i} style={{position:'absolute',left:0,right:0,top:`${y}%`,translate:'0 -50%',padding:'20px 0',borderBottom:`1px solid ${brand.line}`,opacity:active?1:.5}}><div style={{fontSize:17,fontWeight:900,letterSpacing:2,color:active?brand.accent:muted}}>ETAPA {String(i+1).padStart(2,'0')}</div><div style={{fontSize:active?40:28,lineHeight:1.04,fontWeight:active?880:720,marginTop:8}}>{x}</div></div>})}</div>
      </div></Sequence>}

      {variant==='testimonial'&&<Sequence from={Math.round(fps*.45)}><div style={{position:'absolute',top:385,left:0,right:0,bottom:190,display:'grid',gridTemplateRows:'1fr auto',gap:0,border:`1px solid ${brand.line}`,overflow:'hidden',borderRadius:34}}>
        <div style={{position:'relative',minHeight:0}}><MediaPlane src={media.hero} label="testimonio autorizado" brand={brand}/><div style={{position:'absolute',inset:'45% 0 0',background:'linear-gradient(transparent,rgba(0,0,0,.68))'}}/></div>
        <div style={{background:brand.ink,color:brand.surface,padding:'40px 42px 42px'}}><div style={{fontSize:42,lineHeight:1.06,fontWeight:860,letterSpacing:-1.2}}>“{quote||'Cita autorizada del testimonio.'}”</div><div style={{display:'flex',alignItems:'center',gap:14,fontSize:18,marginTop:24,color:brand.secondary,fontWeight:850,letterSpacing:1.6}}><span style={{width:34,height:4,background:brand.accent}}/>{attribution||'IDENTIDAD AUTORIZADA'}</div></div>
      </div></Sequence>}

      {variant==='alert'&&<Sequence from={Math.round(fps*.45)}><div style={{position:'absolute',top:410,left:0,right:0,bottom:190,display:'grid',gridTemplateColumns:'18px 1fr',gap:30}}>
        <div style={{background:brand.accent,borderRadius:999}}/>
        <div style={{display:'flex',flexDirection:'column'}}>
          <div style={{fontSize:18,fontWeight:950,letterSpacing:3,color:brand.accent}}>{label||'AVISO OPERATIVO'}</div>
          <div style={{fontSize:64,lineHeight:.96,fontWeight:930,letterSpacing:-2.5,marginTop:42,maxWidth:790}}>{items[0]||'Situación confirmada'}</div>
          <div style={{fontSize:31,lineHeight:1.22,color:muted,maxWidth:760,marginTop:34}}>{items[1]||'Zona, acción y siguiente actualización verificadas.'}</div>
          <div style={{marginTop:58,borderTop:`1px solid ${brand.line}`}}>{items.slice(2,5).map((x,i)=><div key={i} style={{display:'grid',gridTemplateColumns:'56px 1fr',gap:18,padding:'21px 0',borderBottom:`1px solid ${brand.line}`,fontSize:23,lineHeight:1.1}}><b style={{color:brand.accent}}>{String(i+1).padStart(2,'0')}</b><span>{x}</span></div>)}</div>
          <div style={{marginTop:'auto',background:alt,border:`1px solid ${brand.line}`,padding:'20px 24px',fontSize:17,fontWeight:800,letterSpacing:1.3,color:muted}}>NO INVENTAR HORARIOS, ZONAS O TIEMPOS DE RESTABLECIMIENTO</div>
        </div>
      </div></Sequence>}
    </AbsoluteFill>
    <PersistentChrome brand={brand} label={label||kicker}/>
  </SafeFrame>
}
