import {registerRoot,Composition} from 'remotion'
import {AguaRoutePremium45QA} from './compositions/AguaRoutePremium45QA'

const PremiumAcceptanceRoot=()=> <Composition id="CE-QA-AguaRoutePremium45" component={AguaRoutePremium45QA} width={1080} height={1920} fps={30} durationInFrames={1350}/>

registerRoot(PremiumAcceptanceRoot)
