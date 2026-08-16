import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const root=path.resolve(new URL('../',import.meta.url).pathname)
const presets=JSON.parse(fs.readFileSync(path.join(root,'src/registry/first-party-lottie-presets.json'),'utf8'))
const dir=path.join(root,'public/motion/first-party')
const fail=[]
if(presets.length!==18)fail.push(`expected 18 first-party Lottie presets, got ${presets.length}`)
const ids=new Set()
const categories=new Set()
const report=[]
for(const preset of presets){
  if(ids.has(preset.id))fail.push(`duplicate preset ${preset.id}`);ids.add(preset.id);categories.add(preset.category)
  if(!preset.name||!preset.generator||!preset.durationFrames||!Array.isArray(preset.roles)||!preset.roles.length)fail.push(`${preset.id}: incomplete metadata`)
  if(!Array.isArray(preset.bestFor)||!preset.bestFor.length)fail.push(`${preset.id}: bestFor required`)
  if(!Array.isArray(preset.avoid)||!preset.avoid.length)fail.push(`${preset.id}: avoid rules required`)
  const file=path.join(dir,`${preset.id}.json`)
  if(!fs.existsSync(file)){fail.push(`${preset.id}: generated JSON missing`);continue}
  const raw=fs.readFileSync(file)
  let data;try{data=JSON.parse(raw)}catch{fail.push(`${preset.id}: invalid JSON`);continue}
  if(typeof data.v!=='string'||data.fr!==30||data.ip!==0||data.op!==preset.durationFrames)fail.push(`${preset.id}: invalid base Lottie metadata`)
  if(data.w!==400||data.h!==400)fail.push(`${preset.id}: expected 400x400 artboard`)
  if(!Array.isArray(data.layers)||!data.layers.length)fail.push(`${preset.id}: layers missing`)
  if(!data.layers?.some(layer=>JSON.stringify(layer).includes('"a":1')))fail.push(`${preset.id}: no animated property detected`)
  const sha256=crypto.createHash('sha256').update(raw).digest('hex')
  report.push({id:preset.id,category:preset.category,durationFrames:preset.durationFrames,layers:data.layers?.length??0,bytes:raw.length,sha256})
}
for(const category of ['water','route','map','data','system','community','typography','utility'])if(!categories.has(category))fail.push(`missing Lottie category ${category}`)
if(report.length!==18)fail.push(`expected 18 generated reports, got ${report.length}`)
if(fail.length){console.error(fail.join('\n'));process.exit(1)}
fs.mkdirSync(path.join(root,'validation'),{recursive:true})
fs.writeFileSync(path.join(root,'validation/first-party-lottie-report.json'),JSON.stringify({version:'1.1',count:report.length,categories:[...categories].sort(),assets:report},null,2)+'\n')
console.log(`OK first-party Lottie pack: ${report.length} assets across ${categories.size} categories; all JSON valid and animated`)
