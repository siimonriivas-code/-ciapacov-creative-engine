import fs from 'node:fs'
const read=p=>JSON.parse(fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8'))
const production=read('src/registry/production-masters.json')
const architectures=read('src/registry/visual-architectures.json')
const styles=read('src/registry/creative-style-families.json')
const presets=read('src/registry/premium-style-presets.json')
const modules=read('src/registry/premium-motion-modules.json')
const implementations=read('src/registry/premium-motion-implementations.json')
const recipes=read('src/registry/production-style-recipes.json')
const fail=[]
const by=(arr,key='id')=>new Map(arr.map(x=>[x[key],x]))
const productionById=by(production)
const architectureById=by(architectures)
const styleById=by(styles)
const presetByArchitecture=by(presets,'architectureId')
const moduleById=by(modules)
const implById=by(implementations)

if(production.length!==9)fail.push(`expected 9 Production Masters, got ${production.length}`)
if(architectures.length!==12)fail.push(`expected 12 visual architectures, got ${architectures.length}`)
if(presets.length!==12)fail.push(`expected 12 premium architecture presets, got ${presets.length}`)
if(recipes.length!==9)fail.push(`expected one premium recipe per Production Master, got ${recipes.length}`)

let directionCount=0
for(const architecture of architectures){
  const preset=presetByArchitecture.get(architecture.id)
  if(!preset){fail.push(`${architecture.id}: missing premium style preset`);continue}
  if(!Array.isArray(preset.directions)||preset.directions.length!==3){fail.push(`${architecture.id}: expected exactly three curated style directions`);continue}
  const seen=new Set()
  for(const direction of preset.directions){
    directionCount++
    if(seen.has(direction.styleId))fail.push(`${architecture.id}: duplicate ${direction.styleId}`)
    seen.add(direction.styleId)
    const style=styleById.get(direction.styleId)
    if(!style)fail.push(`${architecture.id}: unknown style ${direction.styleId}`)
    else if(!style.compatibleArchitectures.includes(architecture.id))fail.push(`${architecture.id}: ${direction.styleId} is not declared compatible`)
    if(!direction.role||!direction.reason)fail.push(`${architecture.id}/${direction.styleId}: role + reason required`)
  }
}
if(directionCount!==36)fail.push(`expected 36 curated style directions, got ${directionCount}`)

const recipeIds=new Set()
let beatCount=0
let motionAssignments=0
for(const recipe of recipes){
  if(recipeIds.has(recipe.productionMasterId))fail.push(`${recipe.productionMasterId}: duplicate premium recipe`)
  recipeIds.add(recipe.productionMasterId)
  const pm=productionById.get(recipe.productionMasterId)
  if(!pm){fail.push(`${recipe.productionMasterId}: unknown Production Master`);continue}
  const primaryArchitecture=pm.visualArchitectures?.[0]
  if(!architectureById.has(primaryArchitecture))fail.push(`${recipe.productionMasterId}: unknown primary architecture ${primaryArchitecture}`)
  const preset=presetByArchitecture.get(primaryArchitecture)
  if(!styleById.has(recipe.primaryStyleId))fail.push(`${recipe.productionMasterId}: unknown primary style ${recipe.primaryStyleId}`)
  if(preset&&!preset.directions.some(x=>x.styleId===recipe.primaryStyleId))fail.push(`${recipe.productionMasterId}: primary style ${recipe.primaryStyleId} is not curated for ${primaryArchitecture}`)
  if(!recipe.principle)fail.push(`${recipe.productionMasterId}: missing creative principle`)
  if(!Array.isArray(recipe.beats)||recipe.beats.length!==6)fail.push(`${recipe.productionMasterId}: expected exactly six premium beat recipes`)
  const beatIds=new Set()
  for(const beat of recipe.beats??[]){
    beatCount++
    if(beatIds.has(beat.id))fail.push(`${recipe.productionMasterId}: duplicate beat ${beat.id}`)
    beatIds.add(beat.id)
    if(!beat.purpose)fail.push(`${recipe.productionMasterId}/${beat.id}: purpose required`)
    if(!Array.isArray(beat.motion)||!beat.motion.length)fail.push(`${recipe.productionMasterId}/${beat.id}: at least one motion module required`)
    for(const motionId of beat.motion??[]){
      motionAssignments++
      if(!moduleById.has(motionId))fail.push(`${recipe.productionMasterId}/${beat.id}: unknown motion ${motionId}`)
      if(!implById.has(motionId))fail.push(`${recipe.productionMasterId}/${beat.id}: motion ${motionId} is not executable`)
    }
  }
}
for(const pm of production)if(!recipeIds.has(pm.id))fail.push(`${pm.id}: missing premium production recipe`)
if(beatCount!==54)fail.push(`expected 54 beat-level recipes, got ${beatCount}`)

const plannerUrl=new URL('../src/lib/premium-production-planner.ts',import.meta.url)
if(!fs.existsSync(plannerUrl))fail.push('missing src/lib/premium-production-planner.ts')
else{
  const planner=fs.readFileSync(plannerUrl,'utf8')
  for(const token of ['resolvePremiumPlan','assertPremiumPlanReady','executableCoverage','styleDirections'])if(!planner.includes(token))fail.push(`premium production planner missing ${token}`)
}

if(fail.length){console.error(fail.join('\n'));process.exit(1)}
console.log(`OK premium recipes: ${directionCount} curated style directions; ${recipes.length} Production Master recipes; ${beatCount} beat plans; ${motionAssignments} purposeful motion assignments; 100% executable references`)
