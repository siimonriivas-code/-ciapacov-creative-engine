export type PremiumStyleDirection={styleId:string;role:string;reason:string}
export type PremiumStylePreset={architectureId:string;directions:PremiumStyleDirection[]}
export type PremiumBeat={id:string;purpose:string;motion:string[]}
export type PremiumProductionRecipe={productionMasterId:string;primaryStyleId:string;principle:string;beats:PremiumBeat[]}
export type MotionImplementation={id:string;implementation:string[];runtime:string;status:string}

export type PremiumPlanRequest={
  architectureId:string
  productionMasterId:string
  selectedStyleId?:string
  autoSelectStyle?:boolean
}

export type PremiumPlan={
  architectureId:string
  productionMasterId:string
  styleDirections:PremiumStyleDirection[]
  selectedStyleId:string
  selectionReason:string
  principle:string
  beats:{id:string;purpose:string;motion:{id:string;runtime:string;implementation:string[]}[]}[]
  executableCoverage:number
}

export function resolvePremiumPlan(
  request:PremiumPlanRequest,
  presets:PremiumStylePreset[],
  recipes:PremiumProductionRecipe[],
  implementations:MotionImplementation[]
):PremiumPlan{
  const preset=presets.find(x=>x.architectureId===request.architectureId)
  if(!preset)throw new Error(`No premium style preset for architecture ${request.architectureId}`)
  if(preset.directions.length!==3)throw new Error(`${request.architectureId} must expose exactly three curated premium style directions`)
  const recipe=recipes.find(x=>x.productionMasterId===request.productionMasterId)
  if(!recipe)throw new Error(`No premium production recipe for ${request.productionMasterId}`)
  const selected=request.selectedStyleId??(request.autoSelectStyle===false?'':preset.directions.find(x=>x.styleId===recipe.primaryStyleId)?.styleId??preset.directions[0]?.styleId)
  if(!selected)throw new Error('Premium style selection is required when autoSelectStyle=false')
  const direction=preset.directions.find(x=>x.styleId===selected)
  if(!direction)throw new Error(`${selected} is not one of the three curated directions for ${request.architectureId}`)
  const implById=new Map(implementations.map(x=>[x.id,x]))
  let requested=0,executable=0
  const beats=recipe.beats.map(beat=>({
    id:beat.id,
    purpose:beat.purpose,
    motion:beat.motion.map(id=>{
      requested++
      const impl=implById.get(id)
      if(!impl)throw new Error(`${request.productionMasterId}/${beat.id}: motion ${id} has no executable implementation`)
      executable++
      return {id,runtime:impl.runtime,implementation:impl.implementation}
    })
  }))
  return {
    architectureId:request.architectureId,
    productionMasterId:request.productionMasterId,
    styleDirections:preset.directions,
    selectedStyleId:selected,
    selectionReason:direction.reason,
    principle:recipe.principle,
    beats,
    executableCoverage:requested?executable/requested:1
  }
}

export function assertPremiumPlanReady(plan:PremiumPlan){
  if(plan.styleDirections.length!==3)throw new Error('Premium plan requires exactly three curated style directions')
  if(plan.executableCoverage!==1)throw new Error(`Premium plan motion coverage is ${(plan.executableCoverage*100).toFixed(1)}%, expected 100%`)
  if(!plan.beats.length)throw new Error('Premium plan requires storyboard beats')
  if(plan.beats.some(x=>!x.motion.length))throw new Error('Every premium beat needs at least one purposeful motion module')
  return true
}
