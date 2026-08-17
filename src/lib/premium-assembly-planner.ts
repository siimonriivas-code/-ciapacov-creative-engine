export type PremiumKit={id:string;name:string;productionMasterId:string;styleId:string;materialIds:string[];motionIds:string[];durations:number[];formats:string[]}
export type PremiumTransition={id:string;compatibleStyles:string[];bestFor:string[]}
export type CaptionSystem={id:string;bestFor:string[]}
export type SoundPreset={productionMasterId:string;musicRole:string|null;roles:string[];syncPriority:string;rhythm:string}
export type GenShot={id:string;semanticClass:string;preferredMode:string;bestFor:string[]}

export type PremiumAssemblyRequest={
  productionMasterId:string
  selectedStyleId:string
  durationSeconds:number
  format?:string
  needsCaptions?:boolean
  hasVerifiedAudio?:boolean
  bpm?:number
  allowGenerative?:boolean
  generativePurpose?:string
}

export type PremiumAssemblyPlan={
  productionMasterId:string
  selectedStyleId:string
  kit:{id:string;name:string;compositionId:string;materials:string[];motion:string[]}
  transition:{id:string;reason:string}|null
  caption:{id:string;reason:string}|null
  audio:{presetFound:boolean;verifiedAudioAvailable:boolean;musicRole:string|null;roles:string[];syncPriority:string|null;bpm:number|null;status:'READY'|'READY_WITHOUT_AUDIO'|'NOT_REQUESTED'}
  generative:{enabled:boolean;shotId:string|null;semanticClass:string|null;mode:string|null;status:'NOT_NEEDED'|'PLAN_ONLY'}
  readiness:{deterministicReady:boolean;warnings:string[];blockers:string[]}
}

const compositionId=(kitId:string)=>`CE-KIT-${kitId.replace('PTK-','')}`
const styleToken=(id:string)=>id.replace('STYLE-','').toLowerCase()

function captionForStyle(styleId:string,captions:CaptionSystem[]){
  const s=styleToken(styleId)
  const wanted=s.includes('technical')?'CAP-TECH-RAIL':s.includes('documentary')||s.includes('cinematic')?'CAP-DOCUMENTARY':s.includes('quiet')?'CAP-QUIET':s.includes('kinetic')?'CAP-KINETIC-EMPHASIS':'CAP-EDITORIAL-LOWER'
  return captions.find(x=>x.id===wanted)??captions[0]
}

function transitionForStyle(styleId:string,transitions:PremiumTransition[]){
  return transitions.find(x=>x.compatibleStyles.includes(styleId))??transitions.find(x=>x.id==='PTR-QUIET-FADE')??transitions[0]
}

export function resolvePremiumAssembly(
  req:PremiumAssemblyRequest,
  kits:PremiumKit[],
  transitions:PremiumTransition[],
  captions:CaptionSystem[],
  soundPresets:SoundPreset[],
  genShots:GenShot[]
):PremiumAssemblyPlan{
  const candidates=kits.filter(k=>k.productionMasterId===req.productionMasterId&&k.styleId===req.selectedStyleId)
  if(!candidates.length)throw new Error(`No Premium Template Kit for ${req.productionMasterId} + ${req.selectedStyleId}`)
  const exactDuration=candidates.find(k=>k.durations.includes(req.durationSeconds))
  const kit=exactDuration??candidates[0]
  const warnings:string[]=[];const blockers:string[]=[]
  if(!kit.durations.includes(req.durationSeconds))warnings.push(`KIT_DURATION_VARIANT_REQUIRED: ${kit.id} does not declare ${req.durationSeconds}s; composition metadata/beat timing must be adapted before final export.`)
  if(req.format&&!kit.formats.includes(req.format))warnings.push(`KIT_FORMAT_ADAPTATION_REQUIRED: ${kit.id} does not declare ${req.format}.`)

  const transition=transitionForStyle(req.selectedStyleId,transitions)
  const caption=req.needsCaptions?captionForStyle(req.selectedStyleId,captions):undefined
  if(req.needsCaptions&&!caption)blockers.push('CAPTION_SYSTEM_MISSING')

  const sound=soundPresets.find(x=>x.productionMasterId===req.productionMasterId)
  const audioStatus:req['hasVerifiedAudio'] extends true?'READY':'READY_WITHOUT_AUDIO' = undefined as never
  const requestedAudio=req.hasVerifiedAudio===true
  if(req.bpm&&!requestedAudio)warnings.push('BPM_IGNORED_WITHOUT_VERIFIED_AUDIO: do not synchronize to rights-unknown music.')

  let shot:GenShot|undefined
  if(req.allowGenerative){
    const purpose=(req.generativePurpose??'').toLowerCase()
    shot=genShots.find(x=>x.bestFor.some(v=>purpose.includes(v.toLowerCase())||v.toLowerCase().includes(purpose)))??genShots.find(x=>x.semanticClass==='SCENE-CONCEPTUAL')
    if(!shot)warnings.push('NO_GOVERNED_GENERATIVE_SHOT_MATCH: deterministic production remains available.')
  }

  return {
    productionMasterId:req.productionMasterId,
    selectedStyleId:req.selectedStyleId,
    kit:{id:kit.id,name:kit.name,compositionId:compositionId(kit.id),materials:kit.materialIds,motion:kit.motionIds},
    transition:transition?{id:transition.id,reason:`Compatible with ${req.selectedStyleId}; use only where a scene handoff needs continuity.`}:null,
    caption:caption?{id:caption.id,reason:`Selected from style behavior for ${req.selectedStyleId}; captions remain deterministic and safe-area governed.`}:null,
    audio:{presetFound:Boolean(sound),verifiedAudioAvailable:requestedAudio,musicRole:sound?.musicRole??null,roles:sound?.roles??[],syncPriority:sound?.syncPriority??null,bpm:requestedAudio&&req.bpm?req.bpm:null,status:requestedAudio?'READY':sound?'READY_WITHOUT_AUDIO':'NOT_REQUESTED'},
    generative:{enabled:Boolean(req.allowGenerative&&shot),shotId:shot?.id??null,semanticClass:shot?.semanticClass??null,mode:shot?.preferredMode??null,status:req.allowGenerative&&shot?'PLAN_ONLY':'NOT_NEEDED'},
    readiness:{deterministicReady:blockers.length===0,warnings,blockers}
  }
}

export function assertPremiumAssemblyReady(plan:PremiumAssemblyPlan){
  if(!plan.kit.id||!plan.kit.compositionId)throw new Error('Premium assembly requires an executable kit composition')
  if(!plan.kit.materials.length)throw new Error('Premium assembly requires purposeful material selection')
  if(!plan.kit.motion.length)throw new Error('Premium assembly requires purposeful motion selection')
  if(plan.readiness.blockers.length)throw new Error(`Premium assembly blocked: ${plan.readiness.blockers.join(', ')}`)
  return true
}
