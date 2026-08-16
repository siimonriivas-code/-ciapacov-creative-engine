import fs from 'node:fs'
import path from 'node:path'
const root=path.resolve(new URL('../',import.meta.url).pathname)
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'))
const planArg=process.argv[2]
if(!planArg){console.error('Usage: node scripts/audit-premium-production.mjs <production-plan.json>');process.exit(2)}
const plan=JSON.parse(fs.readFileSync(path.resolve(planArg),'utf8'))
const styles=read('src/registry/creative-style-families.json')
const motions=read('src/registry/premium-motion-modules.json')
const implementations=read('src/registry/premium-motion-implementations.json')
const external=read('src/registry/external-motion-assets.json')
const scenePolicy=read('src/registry/generative-scene-policies.json')
const blockers=[];const warnings=[]

const style=styles.find(x=>x.id===plan.styleFamilyId)
if(!style)blockers.push(`Unknown styleFamilyId ${plan.styleFamilyId}`)
const motionIds=new Set(motions.map(x=>x.id));const executableIds=new Set(implementations.map(x=>x.id));
for(const id of plan.motionModuleIds??[]){if(!motionIds.has(id))blockers.push(`Unknown premium motion module ${id}`);else if(!executableIds.has(id))warnings.push(`${id} is spec-ready but does not yet have an executable first-party implementation.`)}
const extById=new Map(external.assets.map(x=>[x.id,x]))
for(const id of plan.externalMotionAssetIds??[]){const asset=extById.get(id);if(!asset)blockers.push(`External motion asset ${id} is not in governed registry.`);else if(!asset.productionReady)blockers.push(`External motion asset ${id} is not production-ready.`)}

const scenes=Array.isArray(plan.scenes)?plan.scenes:[]
if(!scenes.length)blockers.push('Production plan must include scenes.')
const sceneCount=Math.max(1,scenes.length)
const primaryScenes=scenes.filter(x=>x.surfaceRole==='primary').length
const neutralScenes=scenes.filter(x=>['surface','surfaceAlt','neutral','media'].includes(x.surfaceRole)).length
const layouts=scenes.map(x=>String(x.layoutFamily??'unknown'))
const uniqueLayouts=new Set(layouts).size
const counts=new Map();for(const x of layouts)counts.set(x,(counts.get(x)??0)+1)
const mostRepeated=Math.max(0,...counts.values())
const decorative=scenes.reduce((n,x)=>n+Number(x.decorativeElements??0),0)
const purposeful=scenes.reduce((n,x)=>n+Number(x.purposefulElements??0),0)
let score=100
if(primaryScenes/sceneCount>.6){score-=25;warnings.push('MONOCHROME_FLOOD: primary role dominates more than 60% of scenes.')}
if(neutralScenes/sceneCount<.2){score-=12;warnings.push('NO_BREATHING_SURFACE: fewer than 20% of scenes use neutral/media-led surfaces.')}
if(uniqueLayouts<Math.min(3,sceneCount)){score-=18;warnings.push('LOW_COMPOSITION_VARIETY: production needs more materially distinct layouts.')}
if(mostRepeated/sceneCount>.4){score-=20;warnings.push(`LAYOUT_REPETITION: ${mostRepeated}/${sceneCount} scenes use the same layout family.`)}
if(decorative>purposeful){score-=15;warnings.push('DECORATION_OVER_FUNCTION: decorative elements outnumber purposeful narrative elements.')}

const classById=new Map(scenePolicy.classes.map(x=>[x.id,x]))
for(const scene of scenes){
  if(scene.generative){
    const policy=classById.get(scene.generative.semanticClass)
    if(!policy)blockers.push(`${scene.id}: unknown generative semantic class ${scene.generative.semanticClass}`)
    else if(!policy.generativeAllowed)blockers.push(`${scene.id}: ${policy.id} forbids generated pixels.`)
    if(scene.generative.bakesFactualOverlay===true)blockers.push(`${scene.id}: factual overlays cannot be baked into generative pixels.`)
    if(!scene.generative.providerId)blockers.push(`${scene.id}: generated scene missing providerId.`)
  }
  if(scene.claimsDocumentary===true&&scene.mediaStatus!=='verified-approved')blockers.push(`${scene.id}: documentary claim requires verified-approved media.`)
}

score=Math.max(0,score)
const pass=blockers.length===0&&score>=80
const result={id:plan.id??'UNNAMED',styleFamily:style?.name??null,sceneCount,antiGeneric:{score,pass:score>=80,primaryShare:Number((primaryScenes/sceneCount).toFixed(3)),neutralShare:Number((neutralScenes/sceneCount).toFixed(3)),uniqueLayouts,mostRepeatedLayoutScenes:mostRepeated,decorativeElements:decorative,purposefulElements:purposeful},productionReady:pass,blockers,warnings}
console.log(JSON.stringify(result,null,2))
if(!pass)process.exit(1)
