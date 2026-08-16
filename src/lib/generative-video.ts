export type GenerativeSceneClass='SCENE-FACTUAL-EVIDENCE'|'SCENE-FACTUAL-OVERLAY'|'SCENE-CONCEPTUAL'|'SCENE-CONTROLLED-I2V'|'SCENE-TRANSITION'
export type GenerativeMode='text-to-video'|'image-to-video'

export type GenerativeSceneRequest={
  id:string
  semanticClass:GenerativeSceneClass
  purpose:string
  prompt:string
  mode:GenerativeMode
  firstFrameImage?:string
  durationSeconds?:6|10
  resolution?:'768P'|'1080P'
  cameraCommands?:string[]
  factualOverlays?:string[]
}

export type MiniMaxVideoPayload={
  model:'MiniMax-Hailuo-2.3'|'MiniMax-Hailuo-2.3-Fast'
  prompt:string
  duration:6|10
  resolution:'768P'|'1080P'
  prompt_optimizer:boolean
  first_frame_image?:string
}

export type GenerativePreflight={allowed:boolean;blockers:string[];warnings:string[];normalizedPrompt:string}

const prohibitedClasses=new Set<GenerativeSceneClass>(['SCENE-FACTUAL-EVIDENCE','SCENE-FACTUAL-OVERLAY'])
const suspiciousEvidenceTerms=[
  'actual official vehicle','official vehicle','real beneficiary','actual beneficiary','real event','actual event','documentary proof','official map','actual location','real purifier'
]
const factualPixelTerms=['logo','phone number','precio','price','mxn','pesos','route schedule','rutas','fecha','date','certified','certificado','coespris']

function clean(value:string){return value.trim().replace(/\s+/g,' ')}

export function preflightGenerativeScene(scene:GenerativeSceneRequest):GenerativePreflight{
  const blockers:string[]=[]
  const warnings:string[]=[]
  const prompt=clean(scene.prompt)
  const lower=prompt.toLowerCase()
  if(prohibitedClasses.has(scene.semanticClass))blockers.push(`${scene.semanticClass} must use deterministic or verified factual media, not generated pixels.`)
  if(scene.mode==='image-to-video'&&!scene.firstFrameImage)blockers.push('Image-to-video requires firstFrameImage.')
  if(scene.mode==='text-to-video'&&scene.firstFrameImage)warnings.push('firstFrameImage is ignored by a text-to-video plan.')
  if(suspiciousEvidenceTerms.some(term=>lower.includes(term)))blockers.push('Prompt appears to request fabricated documentary or official evidence.')
  if(factualPixelTerms.some(term=>lower.includes(term)))warnings.push('Keep factual text, logos, prices, routes, dates and claims in deterministic overlays instead of generated pixels.')
  if((scene.factualOverlays??[]).length)warnings.push('Factual overlays are declared; render them in Remotion/HTML/SVG after the generated clip is produced.')
  const duration=scene.durationSeconds??6
  const resolution=scene.resolution??'1080P'
  if(duration===10&&resolution==='1080P')blockers.push('MiniMax-Hailuo-2.3 supports 10s at 768P; 1080P is limited to 6s.')
  if((scene.cameraCommands??[]).length>3)warnings.push('Prefer no more than three simultaneous camera commands for predictable control.')
  return {allowed:blockers.length===0,blockers,warnings,normalizedPrompt:prompt}
}

export function buildMiniMaxPayload(scene:GenerativeSceneRequest,model:'MiniMax-Hailuo-2.3'|'MiniMax-Hailuo-2.3-Fast'='MiniMax-Hailuo-2.3'):MiniMaxVideoPayload{
  const preflight=preflightGenerativeScene(scene)
  if(!preflight.allowed)throw new Error(`Generative scene blocked: ${preflight.blockers.join(' | ')}`)
  if(model==='MiniMax-Hailuo-2.3-Fast'&&scene.mode==='text-to-video')throw new Error('MiniMax-Hailuo-2.3-Fast is registered for image-to-video only.')
  const duration=scene.durationSeconds??6
  const resolution=scene.resolution??(duration===10?'768P':'1080P')
  const commandPrefix=(scene.cameraCommands??[]).length?`[${(scene.cameraCommands??[]).join(',')}] `:''
  const payload:MiniMaxVideoPayload={
    model,
    prompt:`${commandPrefix}${preflight.normalizedPrompt}`.slice(0,2000),
    duration,
    resolution,
    prompt_optimizer:false
  }
  if(scene.mode==='image-to-video'&&scene.firstFrameImage)payload.first_frame_image=scene.firstFrameImage
  return payload
}

export type GenerativeClipRecord={
  id:string
  providerId:string
  model:string
  mode:GenerativeMode
  semanticClass:GenerativeSceneClass
  prompt:string
  generatedAt:string
  sourceFrameUri?:string
  outputUri?:string
  reviewStatus:'review'|'approved'|'rejected'
  rightsStatus:'provider-terms-review'|'cleared'|'blocked'
  notes?:string
}

export function createGenerativeClipRecord(scene:GenerativeSceneRequest,providerId:string,model:string,generatedAt:string):GenerativeClipRecord{
  return {
    id:`GENCLIP-${scene.id}`,
    providerId,
    model,
    mode:scene.mode,
    semanticClass:scene.semanticClass,
    prompt:clean(scene.prompt),
    generatedAt,
    sourceFrameUri:scene.firstFrameImage,
    reviewStatus:'review',
    rightsStatus:'provider-terms-review'
  }
}
