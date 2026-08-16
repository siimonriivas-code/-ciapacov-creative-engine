import fs from 'node:fs'
const read=p=>JSON.parse(fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8'))
const scenarios=read('src/registry/integration-scenarios.json')
const domains=read('src/registry/domains.json')
const masters=read('src/registry/masters.json')
const pms=read('src/registry/production-masters.json')
const maps=read('src/registry/master-visual-map.json')
const bridges=read('src/registry/brand-bridges.json')
const qa=read('src/registry/qa-scenarios.json')
const ids=a=>new Set(a.map(x=>x.id))
const domainIds=ids(domains),masterIds=ids(masters),pmIds=ids(pms),bridgeIds=ids(bridges)
const fail=[]
if(scenarios.length<6)fail.push(`expected at least 6 integration scenarios, got ${scenarios.length}`)
for(const s of scenarios){
  if(!domainIds.has(s.expected.domainId))fail.push(`${s.id}: missing domain ${s.expected.domainId}`)
  if(!masterIds.has(s.expected.operationalMasterId))fail.push(`${s.id}: missing master ${s.expected.operationalMasterId}`)
  if(!pmIds.has(s.expected.productionMasterId))fail.push(`${s.id}: missing production master ${s.expected.productionMasterId}`)
  if(!bridgeIds.has(s.brandBridgeId))fail.push(`${s.id}: missing brand bridge ${s.brandBridgeId}`)
  const master=masters.find(x=>x.id===s.expected.operationalMasterId)
  const pm=pms.find(x=>x.id===s.expected.productionMasterId)
  const map=maps.find(x=>x.masterId===s.expected.operationalMasterId)
  if(master?.domain!==s.expected.domainId)fail.push(`${s.id}: master/domain mismatch`)
  if(!pm?.masterIds.includes(s.expected.operationalMasterId))fail.push(`${s.id}: production master does not cover operational master`)
  if(pm?.compositionId!==s.expected.compositionId)fail.push(`${s.id}: composition mismatch`)
  if(!pm?.durationSeconds.includes(s.brief.duration))fail.push(`${s.id}: unsupported duration ${s.brief.duration}`)
  if(map?.directions?.[0]?.architectureId!==s.expected.primaryArchitectureId)fail.push(`${s.id}: primary architecture mismatch`)
}
const ab=scenarios.find(x=>x.id==='INT-AB-ROUTE-45')
const abQa=qa.find(x=>x.id==='QA-AB-ROUTE-45S-V1')
if(!ab||!abQa)fail.push('Agua Bienestar integration lock missing')
else{
  if(ab.policy!=='qa-scenario:QA-AB-ROUTE-45S-V1')fail.push('Agua Bienestar scenario is not tied to factual QA lock')
  if(ab.expected.operationalMasterId!==abQa.expected.operationalMasterId||ab.expected.productionMasterId!==abQa.expected.productionMasterId||ab.expected.compositionId!==abQa.expected.compositionId)fail.push('Agua Bienestar integration scenario diverges from QA factual lock')
}
const requiredFiles=['claude/START_HERE.md','claude/handoff.compact.json','docs/CLAUDE_DESIGN_INTEGRATION.md']
for(const file of requiredFiles)if(!fs.existsSync(new URL(`../${file}`,import.meta.url)))fail.push(`missing handoff file ${file}`)
if(fail.length){console.error(fail.join('\n'));process.exit(1)}
console.log(`OK v1.0: ${scenarios.length} integration scenarios; ${bridges.length} brand bridges; handoff contract present`)
