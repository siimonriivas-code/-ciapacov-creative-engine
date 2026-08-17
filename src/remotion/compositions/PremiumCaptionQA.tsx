import {useCurrentFrame,useVideoConfig} from 'remotion'
import {PremiumCaptions,type PremiumCaptionSystemId} from '../components/PremiumCaptions'

const brand={surface:'#ffffff',surfaceAlt:'#f4f7f8',ink:'#172126',muted:'#627078',primary:'#087fb6',secondary:'#d8f2fa',accent:'#8a2f53',line:'#d8e1e5'}
const systems:PremiumCaptionSystemId[]=['CAP-EDITORIAL-LOWER','CAP-DOCUMENTARY','CAP-QUIET','CAP-TECH-RAIL','CAP-KINETIC-EMPHASIS','CAP-ACCESSIBLE-HC']

export function PremiumCaptionQA(){
 const frame=useCurrentFrame();const{fps}=useVideoConfig();const segment=fps*2;const index=Math.min(systems.length-1,Math.floor(frame/segment));const systemId=systems[index]
 const start=index*2000,end=start+2000
 const captions=[{text:'Información clara, legible y dentro del área segura.',startMs:start,endMs:end}]
 return <div style={{position:'absolute',inset:0,background:brand.surface,color:brand.ink,fontFamily:'Arial, sans-serif',overflow:'hidden'}}><div style={{position:'absolute',inset:'180px 96px 320px',border:`1px dashed ${brand.line}`,display:'grid',placeItems:'center',background:`linear-gradient(145deg,${brand.surface},${brand.surfaceAlt})`}}><div style={{textAlign:'center'}}><div style={{fontSize:18,fontWeight:900,letterSpacing:2.4,color:brand.accent}}>SAFE AREA QA</div><div style={{fontSize:54,lineHeight:1.02,fontWeight:900,maxWidth:700,marginTop:24}}>Subtítulos con jerarquía, contraste y respiración.</div></div></div><div style={{position:'absolute',left:48,top:48,padding:'10px 14px',background:brand.ink,color:brand.surface,fontSize:13,fontWeight:900,letterSpacing:2,zIndex:100}}>{systemId}</div><PremiumCaptions captions={captions} systemId={systemId} brand={brand}/></div>
}
