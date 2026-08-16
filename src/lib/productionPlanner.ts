import type {AssetRecord, CreativeBrief, Domain, MasterStoryboard, MediaRecord, MediaRole, OperationalMaster, ProductionMaster, ProductionPlan, ResolvedVisualDirection, Template} from '../types'
import {routeMasters} from './domainRouter'
import {resolveAssets} from './assetResolver'
import {visualDirectionPrompt} from './visualDirector'
import {resolveProductionRuntime,runtimePrompt} from './productionRuntime'

export function buildProductionPlans(args:{
  brief:CreativeBrief|string;
  domains:Domain[];
  masters:OperationalMaster[];
  storyboards:MasterStoryboard[];
  templates:Template[];
  assets:AssetRecord[];
  productionMasters?:ProductionMaster[];
  mediaRoles?:MediaRole[];
  mediaLibrary?:MediaRecord[];
  limit?:number;
}):ProductionPlan[]{
  const {brief,domains,masters,storyboards,templates,assets}=args
  const ranked=routeMasters(masters,domains,brief,args.limit??3)
  const storyboardByMaster=new Map(storyboards.map(s=>[s.masterId,s]))
  const templateById=new Map(templates.map(t=>[t.id,t]))
  const duration=typeof brief==='string'?undefined:brief.duration
  return ranked.flatMap(master=>{
    const storyboard=storyboardByMaster.get(master.id)
    if(!storyboard)return []
    const resolution=resolveAssets(master,assets)
    const requiredReady=resolution.required.filter(x=>x.state==='ready').length
    const requiredTotal=Math.max(1,resolution.required.length)
    const recommendedReady=resolution.recommended.filter(x=>x.state==='ready').length
    const recommendedTotal=Math.max(1,resolution.recommended.length)
    const requiredScore=requiredReady/requiredTotal
    const recommendedScore=resolution.recommended.length?recommendedReady/recommendedTotal:1
    const readiness=Math.round((requiredScore*.75+recommendedScore*.25)*100)
    const blockers=resolution.gaps.map(g=>g.state==='slot'
      ? `${g.capability}: requiere asset oficial/verificado`
      : `${g.capability}: no existe asset compatible`)
    const runtime=args.productionMasters&&args.mediaRoles&&args.mediaLibrary
      ? resolveProductionRuntime({master,productionMasters:args.productionMasters,mediaRoles:args.mediaRoles,mediaLibrary:args.mediaLibrary,duration})
      : undefined
    return [{
      master,storyboard,
      templates:master.templateIds.map(id=>templateById.get(id)).filter(Boolean) as Template[],
      requiredAssets:resolution.required,recommendedAssets:resolution.recommended,readiness,blockers,runtime
    }]
  })
}

export function productionPrompt(plan:ProductionPlan,direction?:ResolvedVisualDirection){
  const beats=plan.storyboard.beats.map((b,i)=>`${i+1}. ${b.purpose} [${b.fields.join(', ')}]`).join('\n')
  const templates=plan.templates.slice(0,4).map(t=>`${t.id} · ${t.name}`).join('\n')
  const blockers=[...plan.blockers,...(plan.runtime?.mediaPlan?.blockers||[])]
  const blockerText=blockers.length?blockers.map(x=>`- ${x}`).join('\n'):'- ninguno'
  const visual=direction?`\n\n${visualDirectionPrompt(direction)}\nLa dirección visual define composición; el Design System activo sigue controlando identidad.`:''
  const runtime=plan.runtime?`\n\n${runtimePrompt(plan.runtime)}\nNo sustituyas media factual faltante con generación sintética.`:''
  return `Usa ${plan.master.id} · ${plan.master.name} como Master operativo.\nDesign System activo = autoridad de identidad.\nNo inventes datos ni assets oficiales.${visual}${runtime}\n\nStoryboard:\n${beats}\n\nTemplates candidatos:\n${templates}\n\nBloqueos:\n${blockerText}\n\nCarga únicamente el Master, storyboard, dirección visual, Production Master, template elegido, recipe, motions y media/assets resueltos.`
}
