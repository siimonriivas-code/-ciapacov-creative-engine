import fs from 'node:fs'
const read=p=>JSON.parse(fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8'))
const templates=read('src/registry/templates.json')
const masters=read('src/registry/masters.json')
const pms=read('src/registry/production-masters.json')
const bridges=read('src/registry/brand-bridges.json')
const scenarios=read('src/registry/integration-scenarios.json')
const media=read('src/registry/media-library.json')
const handoff={
  version:'1.0',
  purpose:'Minimal Claude Design / Claude Code handoff index. Active Design System controls identity.',
  entry:'claude/START_HERE.md',
  loadingOrder:[
    'claude/handoff.compact.json','claude/ecosystem.compact.json','claude/visual-directions.compact.json',
    'claude/production.compact.json','claude/qa.compact.json','claude/catalog.compact.json','claude/motions.compact.json'
  ],
  rules:{scanWholeRepo:false,activeDesignSystemWins:true,factualMediaMustBeVerified:true,demoDataForbiddenInProduction:true,officialAssetsBundled:false},
  inventory:{templates:templates.length,operationalMasters:masters.length,productionMasters:pms.length,brandBridges:bridges.length,integrationScenarios:scenarios.length,verifiedMedia:media.filter(x=>x.status==='approved').length},
  bridges:bridges.map(x=>({i:x.id,n:x.name,ds:x.designSystem})),
  integration:scenarios.map(x=>({i:x.id,n:x.name,b:x.brandBridgeId,m:x.expected.operationalMasterId,p:x.expected.productionMasterId,c:x.expected.compositionId,a:x.expected.primaryArchitectureId,d:x.brief.duration})),
  nextRead:{domain:'claude/ecosystem.compact.json',visual:'claude/visual-directions.compact.json',runtime:'claude/production.compact.json',brandQa:'claude/qa.compact.json',templates:'claude/catalog.compact.json',motion:'claude/motions.compact.json'}
}
fs.writeFileSync(new URL('../claude/handoff.compact.json',import.meta.url),JSON.stringify(handoff))
console.log(`OK: v1.0 handoff -> ${scenarios.length} integration scenarios, ${pms.length} production masters`)
