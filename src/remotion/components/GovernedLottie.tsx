import {Lottie} from '@remotion/lottie'
import type {ComponentProps,CSSProperties} from 'react'

type AnimationData=ComponentProps<typeof Lottie>['animationData']

type GovernedLottieProps={
  assetId:string
  animationData:AnimationData
  productionReady:boolean
  previewAllowed?:boolean
  direction?:'forward'|'backward'
  loop?:boolean
  playbackRate?:number
  renderer?:'svg'|'canvas'|'html'
  style?:CSSProperties
}

/**
 * Production gate around @remotion/lottie.
 *
 * Asset provenance/licensing and deterministic-render review live in
 * src/registry/external-motion-assets.json. This component refuses to silently
 * promote a review asset to production. The caller may explicitly opt into a
 * preview-only render while the asset is under review.
 */
export function GovernedLottie({
  assetId,
  animationData,
  productionReady,
  previewAllowed=false,
  direction='forward',
  loop=false,
  playbackRate=1,
  renderer='svg',
  style
}:GovernedLottieProps){
  if(!productionReady&&!previewAllowed){
    throw new Error(`Motion asset ${assetId} is not production-ready. Complete license/provenance, deterministic render, brand-adaptation and visual QA first.`)
  }
  if(!Number.isFinite(playbackRate)||playbackRate<=0){
    throw new Error(`Motion asset ${assetId} has invalid playbackRate ${playbackRate}.`)
  }
  return <div data-motion-asset-id={assetId} data-motion-status={productionReady?'approved':'preview'} style={{position:'relative',width:'100%',height:'100%',...style}}>
    <Lottie animationData={animationData} direction={direction} loop={loop} playbackRate={playbackRate} renderer={renderer} style={{width:'100%',height:'100%'}}/>
    {!productionReady&&previewAllowed&&<div data-development-only="motion-review-badge" style={{position:'absolute',left:8,bottom:8,padding:'4px 7px',fontSize:10,fontWeight:800,letterSpacing:1,background:'rgba(0,0,0,.72)',color:'#fff',borderRadius:4}}>MOTION REVIEW</div>}
  </div>
}
