import {AbsoluteFill} from 'remotion'
import {GovernedLottie} from '../components/GovernedLottie'
import animationData from '../../motion/lottie/ce-water-orbit-qa.json'

export function LottieRuntimeQA(){
  return <AbsoluteFill style={{background:'#ffffff',display:'grid',placeItems:'center'}}>
    <div style={{width:400,height:400}}>
      <GovernedLottie assetId="FP-LOTTIE-QA-001" animationData={animationData} productionReady loop />
    </div>
  </AbsoluteFill>
}
