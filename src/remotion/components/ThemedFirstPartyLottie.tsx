import {useMemo} from 'react'
import {GovernedLottie} from './GovernedLottie'
import {themeFirstPartyLottie,type LottieBrandRoles} from '../../lib/lottie-theme'

type Props={assetId:string;animationData:unknown;brand:LottieBrandRoles;loop?:boolean}

export function ThemedFirstPartyLottie({assetId,animationData,brand,loop=true}:Props){
  const themed=useMemo(()=>themeFirstPartyLottie(animationData as never,brand),[animationData,brand.primary,brand.secondary,brand.accent,brand.ink,brand.surface,brand.line])
  return <GovernedLottie assetId={assetId} animationData={themed} productionReady loop={loop}/>
}
