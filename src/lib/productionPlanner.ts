import type {AssetRecord, CreativeBrief, Domain, MasterStoryboard, OperationalMaster, ProductionPlan, Template} from '../types'
import {routeMasters} from './domainRouter'
import {resolveAssets} from './assetResolver'

export function buildProductionPlans(args:{
  brief:CreativeBrief|string;
  domains:Domain[];
  masters:OperationalMaster[];
  storyboards:MasterStoryboard[];
  templates:Template[];
  assets:AssetRecord[];
  limit?:number;
}):ProductionPlan[]{
  const {brief,domains,masters,storyboards,templates,assets}=args
  const ranked=routeMasters(masters,domains,brief,args.limit??3)
  const storyboardByMaster=new Map(storyboards.map(s=>[s.masterId,s]))
  const templateById=new Map(templates.map(t=>[t.id,t]))

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
    return [{
      master,
      storyboard,
      templates:master.templateIds.map(id=>templateById.get(id)).filter(Boolean) as Template[],
      requiredAssets:resolution.required,
      recommendedAssets:resolution.recommended,
      readiness,
      blockers
    }]
  })
}

export function productionPrompt(plan:ProductionPlan){
  const beats=plan.storyboard.beats.map((b,i)=>`${i+1}. ${b.purpose} [${b.fields.join(', ')}]`).join('\n')
  const templates=plan.templates.slice(0,4).map(t=>`${t.id} · ${t.name}`).join('\n')
  const blockers=plan.blockers.length?plan.blockers.map(x=>`- ${x}`).join('\n'):'- ninguno'
  return `Usa ${plan.master.id} · ${plan.master.name} como Master operativo.\nDesign System activo = autoridad de identidad.\nNo inventes datos ni assets oficiales.\n\nStoryboard:\n${beats}\n\nTemplates candidatos:\n${templates}\n\nBloqueos de assets:\n${blockers}\n\nCarga únicamente el Master, storyboard, template elegido, recipe, motions y assets resueltos.`
}
