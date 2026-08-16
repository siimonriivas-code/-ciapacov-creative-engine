import fs from 'node:fs'
const base=new URL('../',import.meta.url)
const load=(p)=>JSON.parse(fs.readFileSync(new URL(p,base)))
const exists=(p)=>fs.existsSync(new URL(p,base))

// v0.5 keeps the canonical 80-template registry in templates.json.
// Motion and recipe registries may still be physically split across the
// v0.3 compatibility files, so validation merges those without duplicating
// the canonical template registry.
const templates=load('src/registry/templates.json')
const motions=[
  ...load('src/registry/motions.json'),
  ...(exists('src/registry/motions.v03.a.json')?load('src/registry/motions.v03.a.json'):[]),
  ...(exists('src/registry/motions.v03.b.json')?load('src/registry/motions.v03.b.json'):[])
]
const recipes={
  ...load('src/registry/recipes.json'),
  ...(exists('src/registry/recipes.v03.a.json')?load('src/registry/recipes.v03.a.json'):{}),
  ...(exists('src/registry/recipes.v03.b.json')?load('src/registry/recipes.v03.b.json'):{}),
  ...(exists('src/registry/recipes.v03.c.json')?load('src/registry/recipes.v03.c.json'):{})
}
const campaigns=load('src/registry/campaigns.json')

let errors=[]
const dup=(arr)=>arr.filter((x,i)=>arr.indexOf(x)!==i)
const templateIds=new Set(templates.map(x=>x.id))
for(const x of dup(templates.map(x=>x.id)))errors.push(`duplicate template ${x}`)
for(const x of dup(motions.map(x=>x.id)))errors.push(`duplicate motion ${x}`)
for(const x of dup(campaigns.map(x=>x.id)))errors.push(`duplicate campaign ${x}`)
for(const t of templates){
  for(const k of ['id','name','type','subtype','format','status','tags','recipe','pack','implementation'])if(t[k]===undefined)errors.push(`${t.id}: missing ${k}`)
  if(!recipes[t.recipe])errors.push(`${t.id}: unknown recipe ${t.recipe}`)
  if(t.demoContent!=='non-production')errors.push(`${t.id}: demoContent must be non-production`)
}
for(const c of campaigns){
  for(const id of c.templates)if(!templateIds.has(id))errors.push(`${c.id}: unknown template ${id}`)
  if(c.templates.length<3)errors.push(`${c.id}: campaign should contain at least 3 templates`)
}
if(templates.length<80)errors.push(`expected at least 80 templates, found ${templates.length}`)
if(motions.length<48)errors.push(`expected at least 48 motions, found ${motions.length}`)
if(campaigns.length<8)errors.push(`expected at least 8 campaigns, found ${campaigns.length}`)
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`OK: ${templates.length} templates, ${motions.length} motions, ${Object.keys(recipes).length} recipes, ${campaigns.length} campaigns`)
