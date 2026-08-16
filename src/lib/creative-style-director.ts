export type CreativeStyleFamily={
  id:string
  name:string
  intent:string
  surfaceStrategy:string
  contrastStrategy:string
  motionSignature:string
  colorBehavior:{mode:string;maxDominantBrandRoles:number;requireNeutralSurface:boolean;avoidMonochromeFlood:boolean}
  bestFor:string[]
  avoid:string[]
  compatibleArchitectures:string[]
}

export type StyleBrief={
  architectureId:string
  domain?:string
  objective?:string
  format?:string
  tone?:string
  tags?:string[]
  wantsCinematic?:boolean
  wantsDocumentary?:boolean
  wantsData?:boolean
  wantsFriendly?:boolean
}

export type StyleCandidate={family:CreativeStyleFamily;score:number;reasons:string[]}

const norm=(v:string|undefined)=>String(v??'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')

function overlap(hay:string[],needle:string[]){const n=new Set(needle.map(norm));return hay.reduce((acc,x)=>acc+(n.has(norm(x))?1:0),0)}

export function rankCreativeStyles(brief:StyleBrief,families:CreativeStyleFamily[]):StyleCandidate[]{
  const words=[brief.domain,brief.objective,brief.format,brief.tone,...(brief.tags??[])].filter(Boolean).map(x=>norm(String(x)))
  return families.map(family=>{
    let score=0
    const reasons:string[]=[]
    if(family.compatibleArchitectures.includes(brief.architectureId)){score+=8;reasons.push('architecture-fit')}
    const semantic=overlap(family.bestFor,words)
    if(semantic){score+=semantic*2;reasons.push(`semantic-fit:${semantic}`)}
    if(brief.wantsCinematic&&['STYLE-SPATIAL-DEPTH','STYLE-CINEMATIC-MASKS','STYLE-LIQUID-LUMINOUS'].includes(family.id)){score+=4;reasons.push('cinematic-fit')}
    if(brief.wantsDocumentary&&family.id==='STYLE-DOCUMENTARY-COLLAGE'){score+=5;reasons.push('documentary-fit')}
    if(brief.wantsData&&family.id==='STYLE-DATA-THEATER'){score+=5;reasons.push('data-fit')}
    if(brief.wantsFriendly&&['STYLE-TACTILE-PAPER','STYLE-PLAYFUL-GEOMETRY'].includes(family.id)){score+=4;reasons.push('friendly-fit')}
    if(family.colorBehavior.avoidMonochromeFlood){score+=1;reasons.push('anti-monochrome')}
    return {family,score,reasons}
  }).sort((a,b)=>b.score-a.score||a.family.id.localeCompare(b.family.id))
}

export function chooseDistinctStyleDirections(brief:StyleBrief,families:CreativeStyleFamily[],count=3){
  const ranked=rankCreativeStyles(brief,families)
  const chosen:StyleCandidate[]=[]
  for(const item of ranked){
    if(chosen.length>=count)break
    const signatures=chosen.map(x=>norm(x.family.motionSignature))
    const surfaces=chosen.map(x=>norm(x.family.surfaceStrategy))
    const isTooSimilar=signatures.includes(norm(item.family.motionSignature))||surfaces.includes(norm(item.family.surfaceStrategy))
    if(!isTooSimilar)chosen.push(item)
  }
  return chosen
}

export type AntiGenericAuditInput={
  sceneCount:number
  dominantPrimaryScenes:number
  neutralSurfaceScenes:number
  uniqueLayoutFamilies:number
  repeatedCardScenes:number
  decorativeElementCount:number
  purposefulElementCount:number
}

export type AntiGenericAudit={score:number;pass:boolean;warnings:string[]}

export function auditAntiGeneric(input:AntiGenericAuditInput):AntiGenericAudit{
  const warnings:string[]=[]
  let score=100
  const scenes=Math.max(1,input.sceneCount)
  const primaryShare=input.dominantPrimaryScenes/scenes
  const neutralShare=input.neutralSurfaceScenes/scenes
  const repeatedShare=input.repeatedCardScenes/scenes
  if(primaryShare>.6){score-=25;warnings.push('MONOCHROME_FLOOD: primary brand role dominates more than 60% of scenes.')}
  if(neutralShare<.2){score-=12;warnings.push('NO_BREATHING_SURFACE: fewer than 20% of scenes provide a neutral visual reset.')}
  if(input.uniqueLayoutFamilies<Math.min(3,scenes)){score-=18;warnings.push('LOW_COMPOSITION_VARIETY: use at least three materially different scene compositions when duration allows.')}
  if(repeatedShare>.4){score-=20;warnings.push('CARD_REPETITION: too many scenes repeat the same card grammar.')}
  if(input.decorativeElementCount>input.purposefulElementCount){score-=15;warnings.push('DECORATION_OVER_FUNCTION: decorative elements outnumber purposeful narrative elements.')}
  return {score:Math.max(0,score),pass:score>=80,warnings}
}

export const premiumCompositionRules=[
  'Do not default to a full-frame primary brand color merely because it exists in the Design System.',
  'Use brand color as hierarchy and meaning; allow neutral surfaces, photography, texture and negative space to carry composition.',
  'A multi-beat reel should not repeat one card layout with only text changes.',
  'Every decorative element must support hierarchy, continuity, evidence, location, time, data or transition.',
  'Prefer one strong visual idea per beat over many generic icons.',
  'Use contrast in scale, crop, surface, density and motion before adding more color.',
  'Official identity remains governed by the active Design System; style families never override brand tokens.'
] as const
