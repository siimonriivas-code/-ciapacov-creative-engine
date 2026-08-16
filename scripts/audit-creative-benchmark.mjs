#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const file=process.argv[2]
if(!file){console.error('Usage: node scripts/audit-creative-benchmark.mjs <plan.json>');process.exit(2)}
const plan=JSON.parse(fs.readFileSync(path.resolve(file),'utf8'))
const config=JSON.parse(fs.readFileSync(new URL('../src/registry/creative-benchmark-gates.json',import.meta.url),'utf8'))
const scenes=Array.isArray(plan.scenes)?plan.scenes:[]
if(!scenes.length){console.error('Plan has no scenes');process.exit(2)}
const duration=Number(plan.durationSeconds||0)
const sum=(arr)=>arr.reduce((a,b)=>a+b,0)
const uniq=(arr)=>new Set(arr.filter(Boolean)).size
const ratio=(n,d)=>d?Number((n/d).toFixed(3)):0
const results=[]
const push=(id,score,detail)=>results.push({id,score:Math.max(0,Math.min(1,score)),detail})

const highPriorityMax=Math.max(...scenes.map(s=>Number(s.highPriorityMessages??1)))
push('BENCH-HIERARCHY',highPriorityMax<=2?1:highPriorityMax===3?.55:.15,`max simultaneous priorities: ${highPriorityMax}`)

const layouts=scenes.map(s=>s.layoutFamily)
let maxRun=1,run=1
for(let i=1;i<layouts.length;i++){if(layouts[i]===layouts[i-1]){run++;maxRun=Math.max(maxRun,run)}else run=1}
const compositionScore=duration<=20?1:(uniq(layouts)>=3&&maxRun<=2?1:uniq(layouts)>=2&&maxRun<=3?.65:.25)
push('BENCH-COMPOSITION',compositionScore,`${uniq(layouts)} unique layouts · max repeated run ${maxRun}`)

const primaryFrames=scenes.filter(s=>s.surfaceRole==='primary-full').length
const primaryShare=ratio(primaryFrames,scenes.length)
push('BENCH-COLOR',primaryShare<=.4?1:primaryShare<=.6?.6:.15,`full-frame primary share ${primaryShare}`)

const materialIds=[...new Set(scenes.flatMap(s=>Array.isArray(s.materialIds)?s.materialIds:[]))]
const intentionalQuiet=plan.intentionalSingleMaterial===true
const materialScore=duration<=15?1:(materialIds.length>=2?1:intentionalQuiet?.9:.35)
push('BENCH-MATERIAL',materialScore,`${materialIds.length} purposeful material systems${intentionalQuiet?' · quiet exception':''}`)

const motions=scenes.flatMap(s=>Array.isArray(s.motions)?s.motions:[])
const purposeful=motions.filter(m=>['hierarchy','continuity','state','depth','narrative','data','focus'].includes(m.purpose)).length
const motionShare=ratio(purposeful,motions.length||1)
push('BENCH-MOTION',motions.length===0?(duration<=8?.8:.35):motionShare>=.8?1:motionShare>=.6?.7:.25,`${purposeful}/${motions.length} motions purposeful`)

const transitions=scenes.slice(1).map(s=>s.transition).filter(Boolean)
const continuityTransitions=transitions.filter(t=>['object-continuity','mask-handoff','camera-continuity','typographic-wipe','liquid-handoff','depth-pass','timeline-carry','hard-editorial-cut'].includes(t)).length
const transitionShare=ratio(continuityTransitions,transitions.length||1)
push('BENCH-TRANSITION',transitions.length===0?.8:transitionShare>=.75?1:transitionShare>=.5?.65:.25,`${continuityTransitions}/${transitions.length} continuity transitions`)

const heroCount=scenes.filter(s=>s.hero===true).length
push('BENCH-HERO',duration<20?1:heroCount>=1?1:.25,`${heroCount} hero beats`)

const depthScenes=scenes.filter(s=>['layered-2d','parallax','multi-plane','pseudo-3d','camera-space'].includes(s.depth)).length
const depthExpected=plan.styleAllowsDepth!==false
push('BENCH-DEPTH',!depthExpected?1:depthScenes>=Math.max(1,Math.floor(scenes.length*.25))?1:depthScenes? .7:.35,`${depthScenes}/${scenes.length} scenes use staged depth`)

const typeScenes=scenes.filter(s=>['hero','editorial','kinetic','number-led','caption-led'].includes(s.typographyRole)).length
push('BENCH-TYPE',typeScenes>=Math.max(1,Math.floor(scenes.length*.5))?1:typeScenes? .65:.25,`${typeScenes}/${scenes.length} scenes use typography compositionally`)

const readabilityFails=scenes.filter(s=>s.safeAreaPass===false||s.criticalTextReadable===false||s.microtext===true).length
push('BENCH-READABILITY',readabilityFails===0?1:readabilityFails===1?.35:0,`${readabilityFails} readability/safe-area failures`)

const factualViolations=scenes.filter(s=>s.generatedDocumentary===true||s.inventedOfficialMap===true||s.inventedOfficialVehicle===true||s.unverifiedTestimonial===true||s.factsBakedIntoGenerativeVideo===true).length
push('BENCH-FACTUAL',factualViolations===0?1:0,`${factualViolations} factual separation violations`)

const weights=new Map(config.gates.map(g=>[g.id,g.weight]))
const maxWeight=sum([...weights.values()])
const score=Math.round(sum(results.map(r=>r.score*(weights.get(r.id)||0)))/maxWeight*100)
const blockers=[]
for(const s of scenes){
 if(s.generatedDocumentary===true)blockers.push(`${s.id}: generated-documentary-evidence`)
 if(s.inventedOfficialMap===true)blockers.push(`${s.id}: invented-official-map`)
 if(s.inventedOfficialVehicle===true)blockers.push(`${s.id}: invented-official-vehicle`)
 if(s.unverifiedTestimonial===true)blockers.push(`${s.id}: unverified-testimonial`)
 if(s.factsBakedIntoGenerativeVideo===true)blockers.push(`${s.id}: facts-baked-into-generative-video`)
 if(s.safeAreaPass===false)blockers.push(`${s.id}: safe-area-failure`)
 if(s.criticalTextReadable===false)blockers.push(`${s.id}: unreadable-critical-text`)
}
const pass=score>=config.passScore&&blockers.length===0
const output={id:plan.id,score,pass,passScore:config.passScore,sceneCount:scenes.length,results,blockers}
console.log(JSON.stringify(output,null,2))
process.exit(pass?0:1)
