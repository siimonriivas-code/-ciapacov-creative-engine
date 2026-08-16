import type {BrandBridge,OperationalMaster,ProductionMaster,ProductionPlan,QACheck,QAResult,QAScenario,ResolvedVisualDirection} from '../types'
import {forbiddenBrandTerms} from './brandBridge'

export function evaluateScenario(args:{scenario:QAScenario;bridge:BrandBridge;plan:ProductionPlan;direction?:ResolvedVisualDirection;renderText?:string}):QAResult{
  const {scenario,bridge,plan,direction}=args
  const checks:QACheck[]=[]
  const add=(id:string,label:string,pass:boolean,detail:string)=>checks.push({id,label,pass,detail})
  add('bridge','Brand Bridge',scenario.brandBridgeId===bridge.id,`${bridge.id}`)
  add('master','Operational Master',plan.master.id===scenario.expected.operationalMasterId,`${plan.master.id} / esperado ${scenario.expected.operationalMasterId}`)
  add('production-master','Production Master',plan.runtime?.productionMaster?.id===scenario.expected.productionMasterId,`${plan.runtime?.productionMaster?.id||'ninguno'} / esperado ${scenario.expected.productionMasterId}`)
  add('composition','Composition',plan.runtime?.compositionId===scenario.expected.compositionId,`${plan.runtime?.compositionId||'ninguna'} / esperado ${scenario.expected.compositionId}`)
  add('duration','Duración',plan.runtime?.durationSeconds===scenario.brief.duration,`${plan.runtime?.durationSeconds||'n/a'}s / esperado ${scenario.brief.duration||'n/a'}s`)
  add('architecture','Dirección visual',!direction||direction.architecture.id===scenario.expected.primaryArchitectureId,`${direction?.architecture.id||'pendiente'} / preferida ${scenario.expected.primaryArchitectureId}`)
  const noMediaBlockers=(plan.runtime?.mediaPlan?.blockers||[]).length===0
  add('media','Media requerida',noMediaBlockers,noMediaBlockers?'sin bloqueos requeridos':(plan.runtime?.mediaPlan?.blockers||[]).join('; '))
  if(args.renderText){
    const forbidden=[...new Set([...scenario.forbiddenPhrases,...forbiddenBrandTerms(args.renderText,bridge)])]
    const hits=forbidden.filter(x=>args.renderText!.toLowerCase().includes(x.toLowerCase()))
    add('forbidden-copy','Lenguaje prohibido',hits.length===0,hits.length?hits.join(', '):'sin coincidencias')
    const missing=scenario.requiredPhrases.filter(x=>!args.renderText!.toLowerCase().includes(x.toLowerCase()))
    add('required-copy','Lenguaje requerido',missing.length===0,missing.length?`faltan: ${missing.join(', ')}`:'presente')
  }
  const passed=checks.filter(x=>x.pass).length
  const score=Math.round(passed/Math.max(1,checks.length)*100)
  return {scenarioId:scenario.id,score,checks,blocking:checks.filter(x=>!x.pass&&['bridge','master','production-master','composition','duration','forbidden-copy'].includes(x.id)).map(x=>x.detail)}
}

export function scenarioSummary(s:QAScenario,masters:OperationalMaster[],productionMasters:ProductionMaster[]){
  const master=masters.find(x=>x.id===s.expected.operationalMasterId)
  const pm=productionMasters.find(x=>x.id===s.expected.productionMasterId)
  return {id:s.id,name:s.name,master:master?.name||s.expected.operationalMasterId,productionMaster:pm?.name||s.expected.productionMasterId,composition:s.expected.compositionId,duration:s.brief.duration||null,sourceStatus:s.sourceStatus}
}
