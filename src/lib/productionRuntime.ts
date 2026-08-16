import type {MediaRecord,MediaRole,OperationalMaster,ProductionMaster,ProductionRuntimePlan} from '../types'
import {buildMediaPlan} from './mediaIntelligence'

export function productionMasterFor(master:OperationalMaster|undefined,productionMasters:ProductionMaster[]){
  if(!master)return null
  return productionMasters.find(pm=>pm.masterIds.includes(master.id))||null
}

export function resolveProductionRuntime(args:{master:OperationalMaster|undefined;productionMasters:ProductionMaster[];mediaRoles:MediaRole[];mediaLibrary:MediaRecord[];duration?:number}):ProductionRuntimePlan{
  const pm=productionMasterFor(args.master,args.productionMasters)
  if(!pm)return {productionMaster:null,mediaPlan:null,compositionId:null,durationSeconds:null}
  const mediaPlan=buildMediaPlan(pm,args.mediaRoles,args.mediaLibrary,args.master?.domain)
  const requested=args.duration
  const durationSeconds=requested&&pm.durationSeconds.includes(requested)?requested:pm.durationSeconds[Math.floor(pm.durationSeconds.length/2)]||pm.durationSeconds[0]||30
  return {productionMaster:pm,mediaPlan,compositionId:pm.compositionId,durationSeconds}
}

export function runtimePrompt(runtime:ProductionRuntimePlan){
  if(!runtime.productionMaster)return 'No hay Production Master ejecutable asociado.'
  const pm=runtime.productionMaster
  const required=runtime.mediaPlan?.required.map(x=>`- ${x.role.id}: ${x.media?x.media.id:'PENDIENTE'} (${x.state})`).join('\n')||'- ninguno'
  const recommended=runtime.mediaPlan?.recommended.map(x=>`- ${x.role.id}: ${x.media?x.media.id:'opcional pendiente'} (${x.state})`).join('\n')||'- ninguno'
  return `Production Master: ${pm.id} · ${pm.name}\nRemotion composition: ${pm.compositionId}\nDuración objetivo: ${runtime.durationSeconds}s\n\nMedia requerida:\n${required}\n\nMedia recomendada:\n${recommended}`
}
