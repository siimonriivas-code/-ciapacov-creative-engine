import fs from 'node:fs'
const base=new URL('../',import.meta.url)
const read=p=>JSON.parse(fs.readFileSync(new URL(p,base),'utf8'))
const pms=read('src/registry/production-masters.json')
const roles=read('src/registry/media-roles.json')
const media=read('src/registry/media-library.json')
const compact={version:'0.8',productionMasters:pms.map(x=>({i:x.id,n:x.name,c:x.compositionId,v:x.variant,m:x.masterIds,f:x.formats,d:x.durationSeconds,a:x.visualArchitectures,r:x.requiredMediaRoles,p:x.recommendedMediaRoles,s:x.status})),mediaRoles:roles.map(x=>({i:x.id,n:x.name,k:x.kinds,o:x.orientation,r:x.requiredTags,p:x.preferredTags,real:x.realOnly})),media:media.filter(x=>x.status==='approved').map(x=>({i:x.id,t:x.title,k:x.kind,u:x.uri,o:x.orientation,g:x.tags,d:x.domains,l:x.locations,s:x.status}))}
fs.mkdirSync(new URL('claude/',base),{recursive:true})
fs.writeFileSync(new URL('claude/production.compact.json',base),JSON.stringify(compact))
console.log(`OK: ${pms.length} production masters, ${roles.length} media roles, ${compact.media.length} approved media records`)
