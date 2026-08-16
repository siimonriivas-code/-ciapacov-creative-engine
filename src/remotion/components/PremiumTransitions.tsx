import type {CSSProperties} from 'react'
import type {VideoBrand} from '../compositions/shared'

export type PremiumTransitionId='PTR-LIQUID-WIPE'|'PTR-REFRACTION-PASS'|'PTR-EDITORIAL-RULE'|'PTR-TYPE-MASK'|'PTR-PAPER-SLIDE'|'PTR-DOC-CROP'|'PTR-CINEMA-MATTE'|'PTR-DEPTH-PASS'|'PTR-SCAN-LINE'|'PTR-MOSAIC-REFLOW'|'PTR-DATA-ORBIT'|'PTR-QUIET-FADE'
export const premiumTransitionIds:PremiumTransitionId[]=['PTR-LIQUID-WIPE','PTR-REFRACTION-PASS','PTR-EDITORIAL-RULE','PTR-TYPE-MASK','PTR-PAPER-SLIDE','PTR-DOC-CROP','PTR-CINEMA-MATTE','PTR-DEPTH-PASS','PTR-SCAN-LINE','PTR-MOSAIC-REFLOW','PTR-DATA-ORBIT','PTR-QUIET-FADE']
const clamp=(n:number)=>Math.max(0,Math.min(1,n))
const lerp=(a:number,b:number,t:number)=>a+(b-a)*clamp(t)
const layer:CSSProperties={position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden'}

export function PremiumTransition({id,progress,brand}:{id:PremiumTransitionId;progress:number;brand:VideoBrand}){
  const p=clamp(progress)
  if(id==='PTR-LIQUID-WIPE'){
    const x=lerp(-128,128,p)
    return <div style={layer}><div style={{position:'absolute',left:`${x}%`,top:'-20%',width:'72%',height:'140%',borderRadius:'48% 52% 43% 57% / 58% 42% 58% 42%',background:`color-mix(in srgb, ${brand.secondary} 88%, ${brand.surface})`,boxShadow:`-30px 0 0 color-mix(in srgb, ${brand.primary} 28%, transparent),30px 0 0 color-mix(in srgb, ${brand.surface} 72%, transparent)`,rotate:'8deg'}}/></div>
  }
  if(id==='PTR-REFRACTION-PASS'){
    const x=lerp(-48,112,p)
    return <div style={layer}><div style={{position:'absolute',left:`${x}%`,top:'-8%',width:'34%',height:'116%',borderRadius:'50%',background:`linear-gradient(90deg,transparent,color-mix(in srgb, ${brand.secondary} 58%, transparent),color-mix(in srgb, ${brand.surface} 80%, transparent),transparent)`,border:`1px solid color-mix(in srgb, ${brand.primary} 38%, transparent)`,transform:'skewX(-8deg)'}}/></div>
  }
  if(id==='PTR-EDITORIAL-RULE'){
    const width=lerp(0,100,p);const y=lerp(42,58,p)
    return <div style={layer}><div style={{position:'absolute',left:0,top:`${y}%`,width:`${width}%`,height:5,background:brand.accent}}/><div style={{position:'absolute',left:`${Math.max(0,width-3)}%`,top:`calc(${y}% - 8px)`,width:20,height:20,borderRadius:'50%',background:brand.accent}}/></div>
  }
  if(id==='PTR-TYPE-MASK'){
    const width=lerp(0,110,p)
    return <div style={layer}><div style={{position:'absolute',left:0,top:'18%',width:`${width}%`,height:'62%',background:brand.ink}}/><div style={{position:'absolute',left:`${Math.max(0,width-18)}%`,top:'12%',width:'22%',height:'74%',background:brand.accent,opacity:.88}}/></div>
  }
  if(id==='PTR-PAPER-SLIDE'){
    const x=lerp(-115,115,p)
    return <div style={layer}><div style={{position:'absolute',left:`${x}%`,top:'4%',width:'82%',height:'92%',background:brand.surface,border:`1px solid ${brand.line}`,boxShadow:'22px 26px 0 rgba(0,0,0,.06)',rotate:'-3deg'}}/><div style={{position:'absolute',left:`${x+7}%`,top:'9%',width:'72%',height:'84%',background:`color-mix(in srgb, ${brand.secondary} 36%, ${brand.surface})`,rotate:'2deg',zIndex:-1}}/></div>
  }
  if(id==='PTR-DOC-CROP'){
    const inset=lerp(46,4,p)
    return <div style={layer}><div style={{position:'absolute',inset:`${inset}% 7%`,border:`3px solid ${brand.accent}`,boxShadow:`0 0 0 9999px color-mix(in srgb, ${brand.ink} 55%, transparent)`}}/><div style={{position:'absolute',left:'10%',bottom:'8%',width:`${lerp(18,62,p)}%`,height:18,background:brand.secondary,rotate:'-1deg'}}/></div>
  }
  if(id==='PTR-CINEMA-MATTE'){
    const h=lerp(50,0,Math.abs(p-.5)*2)
    return <div style={layer}><div style={{position:'absolute',left:0,right:0,top:0,height:`${h}%`,background:brand.ink}}/><div style={{position:'absolute',left:0,right:0,bottom:0,height:`${h}%`,background:brand.ink}}/><div style={{position:'absolute',left:'8%',right:'8%',top:'50%',height:2,background:brand.accent,opacity:1-Math.abs(p-.5)*2}}/></div>
  }
  if(id==='PTR-DEPTH-PASS'){
    const x1=lerp(-80,130,p),x2=lerp(-125,95,p)
    return <div style={{...layer,perspective:900}}><div style={{position:'absolute',left:`${x1}%`,top:'-15%',width:'72%',height:'130%',background:`color-mix(in srgb, ${brand.secondary} 84%, ${brand.surface})`,transform:'rotateY(-28deg) rotateZ(7deg)',boxShadow:'0 45px 100px rgba(0,0,0,.12)'}}/><div style={{position:'absolute',left:`${x2}%`,top:'8%',width:'54%',height:'90%',background:`color-mix(in srgb, ${brand.primary} 22%, ${brand.surface})`,transform:'rotateY(-18deg) rotateZ(-4deg)',opacity:.76}}/></div>
  }
  if(id==='PTR-SCAN-LINE'){
    const x=lerp(0,100,p)
    return <div style={layer}><div style={{position:'absolute',left:`${x}%`,top:0,bottom:0,width:4,background:brand.accent,boxShadow:`0 0 28px ${brand.accent}`}}/><div style={{position:'absolute',left:0,top:0,bottom:0,width:`${x}%`,background:`color-mix(in srgb, ${brand.secondary} 14%, transparent)`}}/></div>
  }
  if(id==='PTR-MOSAIC-REFLOW'){
    return <div style={{...layer,display:'grid',gridTemplateColumns:'1.2fr .8fr 1fr',gridTemplateRows:'1fr .72fr',gap:8,padding:18}}>{Array.from({length:6}).map((_,i)=>{const phase=clamp(p*1.45-i*.08);return <div key={i} style={{background:i===1?brand.accent:i===4?brand.secondary:brand.surface,border:`1px solid ${brand.line}`,borderRadius:i===0?28:8,gridRow:i===0?'span 2':undefined,transform:`translate(${lerp((i%2?1:-1)*120,0,phase)}px,${lerp((i%3-1)*90,0,phase)}px) scale(${lerp(.82,1,phase)})`,opacity:phase}}/>})}</div>
  }
  if(id==='PTR-DATA-ORBIT'){
    const angle=p*Math.PI*1.7;const x=50+Math.cos(angle)*38,y=50+Math.sin(angle)*32
    return <div style={layer}>{[0,1,2].map(i=><div key={i} style={{position:'absolute',left:'50%',top:'50%',translate:'-50% -50%',width:220+i*130,height:220+i*130,borderRadius:'50%',border:`${i===0?3:1}px solid ${i===0?brand.accent:brand.line}`,opacity:.28+i*.08}}/>)}<div style={{position:'absolute',left:`calc(${x}% - 11px)`,top:`calc(${y}% - 11px)`,width:22,height:22,borderRadius:'50%',background:brand.accent,boxShadow:`0 0 0 9px color-mix(in srgb, ${brand.accent} 12%, transparent)`}}/></div>
  }
  const opacity=1-Math.abs(p-.5)*2
  const lineW=lerp(18,68,p)
  return <div style={layer}><div style={{position:'absolute',inset:0,background:brand.surface,opacity:opacity*.82}}/><div style={{position:'absolute',left:'50%',top:'50%',translate:'-50% -50%',width:`${lineW}%`,height:2,background:brand.line}}/><div style={{position:'absolute',left:'50%',top:'50%',translate:'-50% -50%',width:10,height:10,borderRadius:'50%',background:brand.accent,opacity:.5+opacity*.5}}/></div>
}
