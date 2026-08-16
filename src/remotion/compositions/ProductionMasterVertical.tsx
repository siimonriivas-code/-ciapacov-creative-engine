import {AbsoluteFill,Img,Sequence,interpolate,useCurrentFrame,useVideoConfig} from 'remotion'
import {PersistentChrome,SafeFrame,clamp,ease,type VideoBrand} from './shared'

type Variant='launch'|'documentary'|'before-after'|'timeline'|'testimonial'|'alert'
type Props={
  brand:VideoBrand; variant:Variant; title:string; subtitle?:string; kicker?:string; quote?:string; attribution?:string;
  items?:string[]; metrics?:{value:string;label:string}[]; media?:{hero?:string;before?:string;after?:string}; label?:string; durationSeconds?:number
}

const card=(brand:VideoBrand)=>({background:brand.surface,border:`2px solid ${brand.line}`,borderRadius:30,boxShadow:'0 20px 55px rgba(0,0,0,.08)'})
const fade=(frame:number,start:number,end:number)=>interpolate(frame,[start,end],[0,1],{...clamp,easing:ease})
const rise=(frame:number,start:number,end:number)=>interpolate(frame,[start,end],[34,0],{...clamp,easing:ease})

function MediaSlot({src,label,brand}:{src?:string;label:string;brand:VideoBrand}){
  return <div style={{...card(brand),height:'100%',overflow:'hidden',position:'relative',background:brand.secondary}}>
    {src?<Img src={src} style={{width:'100%',height:'100%',objectFit:'cover'}}/>:<div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',color:brand.ink,fontSize:26,fontWeight:800,letterSpacing:2,textAlign:'center',padding:40}}>MEDIA VERIFICADA<br/><span style={{fontSize:18,fontWeight:600,opacity:.65}}>{label}</span></div>}
  </div>
}

export function ProductionMasterVertical({brand,variant,title,subtitle,kicker='PRODUCTION MASTER',quote,attribution,items=[],metrics=[],media={},label}:Props){
  const frame=useCurrentFrame();const {fps}=useVideoConfig();
  const op=fade(frame,0,.7*fps),y=rise(frame,0,.8*fps)
  return <SafeFrame brand={brand}>
    <AbsoluteFill>
      <div style={{position:'absolute',top:0,left:0,right:0,opacity:op,transform:`translateY(${y}px)`}}>
        <div style={{fontSize:22,fontWeight:900,letterSpacing:4,color:brand.accent}}>{kicker}</div>
        <div style={{fontSize:76,lineHeight:.98,fontWeight:900,marginTop:18,maxWidth:880}}>{title}</div>
        {subtitle&&<div style={{fontSize:31,lineHeight:1.2,marginTop:24,maxWidth:850,opacity:.78}}>{subtitle}</div>}
      </div>

      {variant==='launch'&&<Sequence from={Math.round(fps*.8)}><div style={{position:'absolute',top:430,left:0,right:0,bottom:170,display:'grid',gridTemplateRows:'1fr auto',gap:30}}><MediaSlot src={media.hero} label="hero documental opcional" brand={brand}/><div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>{(metrics.length?metrics:[{value:'01',label:'beneficio'},{value:'02',label:'dato'},{value:'03',label:'siguiente paso'}]).slice(0,3).map((m,i)=><div key={i} style={{...card(brand),padding:28}}><b style={{fontSize:46,color:brand.primary}}>{m.value}</b><div style={{fontSize:20,marginTop:8}}>{m.label}</div></div>)}</div></div></Sequence>}

      {variant==='documentary'&&<Sequence from={Math.round(fps*.6)}><div style={{position:'absolute',top:390,left:0,right:0,bottom:170,display:'grid',gridTemplateRows:'1.4fr .8fr',gap:28}}><MediaSlot src={media.hero} label="evidencia real" brand={brand}/><div style={{display:'grid',gridTemplateColumns:'1.2fr .8fr',gap:20}}><div style={{...card(brand),padding:30,fontSize:26,lineHeight:1.25}}>{items[0]||'Contexto e intervención verificada.'}</div><div style={{...card(brand),padding:30}}><b style={{fontSize:54,color:brand.primary}}>{metrics[0]?.value||'00'}</b><div style={{fontSize:20}}>{metrics[0]?.label||'métrica validada'}</div></div></div></div></Sequence>}

      {variant==='before-after'&&<Sequence from={Math.round(fps*.6)}><div style={{position:'absolute',top:410,left:0,right:0,bottom:190,display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}><div style={{display:'grid',gridTemplateRows:'auto 1fr',gap:16}}><b style={{fontSize:25,letterSpacing:3}}>ANTES</b><MediaSlot src={media.before} label="evidencia previa" brand={brand}/></div><div style={{display:'grid',gridTemplateRows:'auto 1fr',gap:16}}><b style={{fontSize:25,letterSpacing:3,color:brand.primary}}>DESPUÉS</b><MediaSlot src={media.after} label="evidencia posterior" brand={brand}/></div><div style={{position:'absolute',left:'50%',bottom:28,transform:'translateX(-50%)',background:brand.accent,color:'#fff',borderRadius:999,padding:'18px 34px',fontWeight:900,fontSize:24}}>{metrics[0]?.value||'DELTA VERIFICADO'}</div></div></Sequence>}

      {variant==='timeline'&&<Sequence from={Math.round(fps*.6)}><div style={{position:'absolute',top:430,left:20,right:20}}>{(items.length?items:['Etapa 1','Etapa 2','Etapa 3','Etapa 4']).slice(0,5).map((x,i)=>{const start=fps*(.9+i*.35);const o=fade(frame,start,start+fps*.35);return <div key={i} style={{display:'grid',gridTemplateColumns:'80px 1fr',gap:24,alignItems:'center',marginBottom:36,opacity:o}}><div style={{width:64,height:64,borderRadius:'50%',background:brand.primary,color:'#fff',display:'grid',placeItems:'center',fontSize:22,fontWeight:900}}>{String(i+1).padStart(2,'0')}</div><div style={{...card(brand),padding:'24px 30px',fontSize:28,fontWeight:750}}>{x}</div></div>})}</div></Sequence>}

      {variant==='testimonial'&&<Sequence from={Math.round(fps*.5)}><div style={{position:'absolute',top:390,left:0,right:0,bottom:190,display:'grid',gridTemplateRows:'1fr auto',gap:28}}><MediaSlot src={media.hero} label="testimonio autorizado" brand={brand}/><div style={{...card(brand),padding:34}}><div style={{fontSize:40,lineHeight:1.12,fontWeight:850}}>“{quote||'Cita autorizada del testimonio.'}”</div><div style={{fontSize:21,marginTop:18,color:brand.accent,fontWeight:800}}>{attribution||'IDENTIDAD AUTORIZADA'}</div></div></div></Sequence>}

      {variant==='alert'&&<Sequence from={Math.round(fps*.5)}><div style={{position:'absolute',top:430,left:0,right:0}}><div style={{...card(brand),padding:46,borderTop:`12px solid ${brand.accent}`}}><div style={{fontSize:28,fontWeight:900,color:brand.accent,letterSpacing:3}}>{label||'AVISO OPERATIVO'}</div><div style={{fontSize:50,lineHeight:1.06,fontWeight:900,marginTop:22}}>{items[0]||'Situación confirmada'}</div><div style={{fontSize:28,lineHeight:1.3,marginTop:28,opacity:.8}}>{items[1]||'Zona, acción y siguiente actualización verificadas.'}</div></div>{items.slice(2,5).map((x,i)=><div key={i} style={{marginTop:18,...card(brand),padding:'22px 28px',fontSize:24}}>{x}</div>)}</div></Sequence>}
    </AbsoluteFill>
    <PersistentChrome brand={brand} label={label||kicker}/>
  </SafeFrame>
}
