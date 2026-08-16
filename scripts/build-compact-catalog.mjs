import fs from 'node:fs'
const root=new URL('../',import.meta.url)
const load=(p)=>JSON.parse(fs.readFileSync(new URL(p,root)))
const compactTemplate=t=>({id:t.id,name:t.name,type:t.type,subtype:t.subtype,format:t.format,status:t.status,tags:t.tags,recipe:t.recipe,pack:t.pack,implementation:t.implementation,...(t.duration?{duration:t.duration}:{})})
const compactMotion=m=>({id:m.id,name:m.name,engine:m.engine,category:m.category,intensity:m.intensity,tags:m.tags,bestFor:m.bestFor})
for(const [src,dst] of [
  ['src/registry/templates.v03.carousels.json','claude/catalog.v03.carousels.compact.json'],
  ['src/registry/templates.v03.reels.json','claude/catalog.v03.reels.compact.json'],
  ['src/registry/templates.v03.stories.json','/tmp/stories.compact.json'],
  ['src/registry/templates.v03.utility.json','/tmp/utility.compact.json']
]){if(dst.startsWith('/tmp'))continue;fs.writeFileSync(new URL(dst,root),JSON.stringify(load(src).map(compactTemplate)))}
const other=[...load('src/registry/templates.v03.stories.json'),...load('src/registry/templates.v03.utility.json')].map(compactTemplate)
fs.writeFileSync(new URL('claude/catalog.v03.other.compact.json',root),JSON.stringify(other))
fs.writeFileSync(new URL('claude/motions.v03.a.compact.json',root),JSON.stringify(load('src/registry/motions.v03.a.json').map(compactMotion)))
fs.writeFileSync(new URL('claude/motions.v03.b.compact.json',root),JSON.stringify(load('src/registry/motions.v03.b.json').map(compactMotion)))
const campaigns=load('src/registry/campaigns.json').map(c=>({id:c.id,name:c.name,status:c.status,tags:c.tags,templates:c.templates}))
fs.writeFileSync(new URL('claude/campaigns.compact.json',root),JSON.stringify(campaigns))
console.log('extension compact catalogs rebuilt')
