import fs from 'node:fs'
const base=new URL('../',import.meta.url)
const read=p=>JSON.parse(fs.readFileSync(new URL(p,base),'utf8'))
const masters=read('src/registry/masters.json')
const storyboards=read('src/registry/storyboards.json')
const architectures=read('src/registry/visual-architectures.json')
const maps=read('src/registry/master-visual-map.json')
const assets=read('src/registry/assets.json')
const errors=[]
const uniq=(label,xs)=>{const s=new Set;for(const x of xs){if(s.has(x))errors.push(`duplicate ${label} ${x}`);s.add(x)}}
uniq('visual architecture',architectures.map(x=>x.id))
uniq('master visual map',maps.map(x=>x.masterId))
const M=new Set(masters.map(x=>x.id)),A=new Map(architectures.map(x=>[x.id,x]))
const caps=new Set(assets.flatMap(x=>x.capabilities))
for(const a of architectures){
  for(const k of ['id','name','family','density','motion','formats','signature','requires','avoid','description'])if(a[k]===undefined)errors.push(`${a.id}: missing ${k}`)
  for(const c of a.requires)if(!caps.has(c))errors.push(`${a.id}: unresolved required capability ${c}`)
}
for(const m of masters){
  const map=maps.find(x=>x.masterId===m.id)
  if(!map){errors.push(`${m.id}: no visual map`);continue}
  if(map.directions.length!==3)errors.push(`${m.id}: expected exactly 3 visual directions`)
  uniq(`${m.id} direction`,map.directions.map(x=>x.architectureId))
  for(const d of map.directions){
    if(!A.has(d.architectureId))errors.push(`${m.id}: unknown architecture ${d.architectureId}`)
    if(!d.reason || d.reason.length<20)errors.push(`${m.id}/${d.architectureId}: reason too weak`)
  }
}
for(const map of maps)if(!M.has(map.masterId))errors.push(`visual map references unknown master ${map.masterId}`)
if(architectures.length<12)errors.push(`expected >=12 architectures, got ${architectures.length}`)
if(maps.length!==masters.length)errors.push(`expected one visual map per master (${masters.length}), got ${maps.length}`)
if(maps.reduce((n,x)=>n+x.directions.length,0)!==masters.length*3)errors.push('expected exactly 3 visual directions per master')
if(storyboards.length!==masters.length)errors.push('storyboards and masters must stay 1:1')
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`OK v0.7: ${architectures.length} visual architectures, ${maps.length} master maps, ${maps.reduce((n,x)=>n+x.directions.length,0)} visual directions`)
