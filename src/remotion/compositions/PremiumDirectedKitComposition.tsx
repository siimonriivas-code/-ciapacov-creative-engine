import kitsRaw from '../../registry/premium-template-kits.json'
import {PremiumMaterial,type PremiumMaterialId} from '../components/PremiumMaterials'
import {PremiumDirectedContent,type DirectedProps,type DirectedKit} from './PremiumDirectedContent'
import type {VideoBrand} from './shared'

export type PremiumDirectedKitProps=DirectedProps
export type PremiumDirectedKit=DirectedKit & {compositionId:string;architectureId:string;motionIds:string[];durations:number[];formats:string[];objective:string;avoid:string[]}
export const premiumDirectedKits=kitsRaw as PremiumDirectedKit[]

const darkStyle=(styleId:string)=>styleId.includes('CINEMATIC')
const styleToken=(styleId:string)=>styleId.replace('STYLE-','').toLowerCase()

function DirectedBackdrop({brand,kit}:{brand:VideoBrand;kit:PremiumDirectedKit}){
 const dark=darkStyle(kit.styleId);const token=styleToken(kit.styleId);const bg=dark?brand.ink:brand.surface;const line=dark?`color-mix(in srgb, ${brand.surface} 18%, transparent)`:brand.line
 return <div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none'}}>
   {token.includes('liquid')&&<><div style={{position:'absolute',right:-180,top:170,width:680,height:860,borderRadius:'48% 52% 38% 62% / 58% 43% 57% 42%',background:`color-mix(in srgb, ${brand.secondary} 60%, transparent)`,opacity:.52}}/><div style={{position:'absolute',right:70,top:360,width:360,height:360,borderRadius:'50%',border:`1px solid ${brand.primary}`,opacity:.3}}/></>}
   {token.includes('spatial')&&<><div style={{position:'absolute',left:-130,top:420,width:650,height:650,borderRadius:'50%',background:brand.secondary,filter:'blur(70px)',opacity:.25}}/><div style={{position:'absolute',right:-80,top:260,width:470,height:470,borderRadius:'50%',background:brand.primary,filter:'blur(110px)',opacity:.08}}/></>}
   {token.includes('technical')&&<div style={{position:'absolute',inset:0,background:`repeating-linear-gradient(0deg,transparent 0 52px,${line} 52px 53px),repeating-linear-gradient(90deg,transparent 0 64px,${line} 64px 65px)`,opacity:.18}}/>}
   {token.includes('documentary')&&<><div style={{position:'absolute',left:55,top:220,width:290,height:28,background:brand.secondary,rotate:'-2deg',opacity:.75}}/><div style={{position:'absolute',right:75,bottom:245,width:300,height:30,background:dark?brand.surface:brand.ink,rotate:'1.4deg',opacity:.88}}/></>}
   {token.includes('tactile')&&<div style={{position:'absolute',left:60,right:60,top:280,bottom:260,background:`color-mix(in srgb, ${brand.secondary} 20%, ${bg})`,boxShadow:'20px 26px 0 rgba(0,0,0,.04)',rotate:'-.6deg',opacity:.55}}/>}
   {token.includes('mosaic')&&<div style={{position:'absolute',right:45,top:240,width:420,height:420,display:'grid',gridTemplateColumns:'1.4fr .8fr 1fr',gridTemplateRows:'1fr .7fr',gap:10,opacity:.38}}>{Array.from({length:6}).map((_,i)=><div key={i} style={{background:i===1?brand.accent:i===4?brand.secondary:bg,border:`1px solid ${line}`,borderRadius:i===0?28:8,gridRow:i===0?'span 2':undefined}}/>)}</div>}
   {token.includes('data')&&<>{[0,1,2].map(i=><div key={i} style={{position:'absolute',right:80+i*65,top:340+i*80,width:190+i*70,height:190+i*70,borderRadius:'50%',border:`${i===0?4:1}px solid ${i===0?brand.accent:line}`,opacity:.28}}/>)}</>}
   {token.includes('quiet')&&<div style={{position:'absolute',left:80,right:80,top:110,height:1,background:line}}/>}
 </div>
}

function DirectedChrome({brand,kit,footer}:{brand:VideoBrand;kit:PremiumDirectedKit;footer?:string}){
 const dark=darkStyle(kit.styleId);const fg=dark?brand.surface:brand.ink;const muted=dark?brand.secondary:(brand.muted??brand.ink);const bg=dark?brand.ink:brand.surface;const line=dark?`color-mix(in srgb, ${brand.surface} 18%, transparent)`:brand.line
 return <><div style={{position:'absolute',top:72,left:78,right:78,height:20,display:'flex',alignItems:'center',gap:12,zIndex:80}}><span style={{width:68,height:6,borderRadius:999,background:brand.accent}}/><span style={{height:1,flex:1,background:line}}/><span style={{fontSize:10,fontWeight:900,letterSpacing:1.5,color:muted}}>{kit.id}</span></div><div style={{position:'absolute',left:0,right:0,bottom:0,height:116,borderTop:`1px solid ${line}`,background:`color-mix(in srgb, ${bg} 94%, transparent)`,display:'grid',gridTemplateColumns:'1fr auto',alignItems:'center',gap:24,padding:'0 78px',zIndex:80,color:muted}}><span style={{fontSize:10,fontWeight:900,letterSpacing:1.7}}>IDENTIDAD DESDE EL DESIGN SYSTEM ACTIVO</span><span style={{fontSize:12,fontWeight:850,color:fg}}>{footer??kit.name}</span></div></>
}

export function PremiumDirectedKitComposition(p:PremiumDirectedKitProps){
 const kit=premiumDirectedKits.find(x=>x.id===p.kitId)??premiumDirectedKits[0]
 const dark=darkStyle(kit.styleId)
 const bg=dark?p.brand.ink:p.brand.surface
 const fg=dark?p.brand.surface:p.brand.ink
 const line=dark?`color-mix(in srgb, ${p.brand.surface} 18%, transparent)`:p.brand.line
 const material=(kit.materialIds[0]??'MAT-EDITORIAL-RULES') as PremiumMaterialId
 const brandForMaterial={...p.brand,surface:bg,ink:fg,line}
 return <div style={{position:'absolute',inset:0,background:bg,color:fg,overflow:'hidden',fontFamily:p.brand.fontFamily??'Arial, sans-serif'}}><PremiumMaterial id={material} brand={brandForMaterial}/><DirectedBackdrop brand={p.brand} kit={kit}/><PremiumDirectedContent p={p} kit={kit}/><DirectedChrome brand={p.brand} kit={kit} footer={p.footer}/></div>
}
