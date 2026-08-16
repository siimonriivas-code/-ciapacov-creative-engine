import fs from 'node:fs'
const base=new URL('../',import.meta.url)
const read=p=>JSON.parse(fs.readFileSync(new URL(p,base),'utf8'))
const domains=read('src/registry/domains.json'), masters=read('src/registry/masters.json'), assets=read('src/registry/assets.json'), refs=read('src/registry/references.json')
const compact={version:'0.5',domains:domains.map(d=>({i:d.id,n:d.name,k:d.keywords,m:d.recommendedMasters})),masters:masters.map(m=>({i:m.id,d:m.domain,n:m.name,f:m.formats,t:m.templateIds,r:m.requiredCapabilities,p:m.recommendedCapabilities,s:m.status})),assets:assets.map(a=>({i:a.id,n:a.name,c:a.category,k:a.capabilities,a:a.availability,s:a.status,f:a.file||undefined})),references:refs.map(r=>({i:r.id,n:r.name,k:r.kind,p:r.policy}))}
fs.writeFileSync(new URL('claude/ecosystem.compact.json',base),JSON.stringify(compact))
console.log(`OK: ${domains.length} domains, ${masters.length} masters, ${assets.length} assets, ${refs.length} reference sources`)
