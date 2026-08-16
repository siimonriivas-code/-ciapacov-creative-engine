import {useCurrentFrame,useVideoConfig} from 'remotion'
import {PremiumTransition,premiumTransitionIds} from '../components/PremiumTransitions'

const brand={surface:'#ffffff',surfaceAlt:'#f4f7f8',ink:'#172126',muted:'#627078',primary:'#087fb6',secondary:'#d8f2fa',accent:'#8a2f53',line:'#d8e1e5'}

export function PremiumTransitionQA(){
  const frame=useCurrentFrame();const{fps}=useVideoConfig();const segment=fps*2;const index=Math.min(premiumTransitionIds.length-1,Math.floor(frame/segment));const local=(frame%segment)/(segment-1);const id=premiumTransitionIds[index]
  return <div style={{position:'absolute',inset:0,background:brand.surface,color:brand.ink,fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
    <div style={{position:'absolute',inset:0,display:'grid',gridTemplateColumns:'1fr 1fr'}}><div style={{background:brand.surface,display:'grid',placeItems:'center'}}><div style={{fontSize:50,fontWeight:900}}>BEAT A</div></div><div style={{background:brand.surfaceAlt,display:'grid',placeItems:'center'}}><div style={{fontSize:50,fontWeight:900}}>BEAT B</div></div></div>
    <div style={{position:'absolute',left:40,top:34,zIndex:100,padding:'10px 14px',background:brand.ink,color:brand.surface,fontSize:14,fontWeight:900,letterSpacing:2}}>{id}</div>
    <PremiumTransition id={id} progress={local} brand={brand}/>
  </div>
}
