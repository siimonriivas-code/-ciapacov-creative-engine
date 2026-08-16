import fs from 'node:fs'
const read=p=>JSON.parse(fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8'))
const write=(p,v)=>fs.writeFileSync(new URL(`../${p}`,import.meta.url),JSON.stringify(v))
const bridges=read('src/registry/brand-bridges.json')
const scenarios=read('src/registry/qa-scenarios.json')
write('claude/qa.compact.json',{
  version:'0.9',
  bridges:bridges.map(b=>({i:b.id,n:b.name,ds:b.designSystem,k:b.keywords,p:b.contentRules.preferredTerms,f:b.contentRules.forbiddenTerms,m:b.motionRules,g:b.governance})),
  scenarios:scenarios.map(s=>({i:s.id,n:s.name,b:s.brandBridgeId,brief:s.brief,e:s.expected,f:s.facts,s:s.schedule,r:s.requiredPhrases,x:s.forbiddenPhrases,rules:s.rules,src:s.sourceStatus}))
})
console.log(`OK: ${bridges.length} brand bridges, ${scenarios.length} QA scenarios -> claude/qa.compact.json`)
