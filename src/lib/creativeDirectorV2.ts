import type {AssetRecord, CreativeBrief, Domain, OperationalMaster, Template} from '../types'
import {routeTemplates} from './router'
import {inferDomain,routeMasters} from './domainRouter'
import {resolveAssets} from './assetResolver'

export function resolveCreativeBrief(input:{brief:CreativeBrief;domains:Domain[];masters:OperationalMaster[];templates:Template[];assets:AssetRecord[]}){
  const {brief,domains,masters,templates,assets}=input
  const query=[brief.topic,brief.format,brief.objective,brief.tone,...(brief.materials||[]),...(brief.constraints||[])].filter(Boolean).join(' ')
  const domain=inferDomain(domains,brief)
  const masterPicks=routeMasters(masters,domains,brief,4)
  const templatePicks=routeTemplates(templates,query,6)
  const primary=masterPicks[0]||null
  const assetPlan=primary?resolveAssets(primary,assets):null
  return {domain,masters:masterPicks,templates:templatePicks,assetPlan,query}
}
