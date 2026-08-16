import fs from 'node:fs'
const read=p=>JSON.parse(fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8'))
const scenarios=read('src/registry/qa-scenarios.json')
const bridges=read('src/registry/brand-bridges.json')
const masters=read('src/registry/masters.json')
const pms=read('src/registry/production-masters.json')
const maps=read('src/registry/master-visual-map.json')
const scenario=scenarios.find(x=>x.id==='QA-AB-ROUTE-45S-V1')
if(!scenario)throw new Error('QA scenario missing')
const bridge=bridges.find(x=>x.id===scenario.brandBridgeId)
const master=masters.find(x=>x.id===scenario.expected.operationalMasterId)
const pm=pms.find(x=>x.id===scenario.expected.productionMasterId)
const visual=maps.find(x=>x.masterId===master?.id)?.directions?.[0]?.architectureId
const checks=[
  ['bridge',!!bridge&&bridge.id===scenario.brandBridgeId],
  ['operational-master',!!master&&master.id==='AB-MASTER-02'],
  ['production-master',!!pm&&pm.id==='PM-ROUTE'],
  ['composition',pm?.compositionId==='CE-RouteJourney'],
  ['duration',pm?.durationSeconds?.includes(45)===true],
  ['primary-architecture',visual==='VIS-ROUTE-JOURNEY'],
  ['schedule-groups',scenario.schedule?.length===5],
  ['facts',scenario.facts?.garrafonLiters===20&&scenario.facts?.deliveryPriceMxn===10&&scenario.facts?.infoLine==='312 311 9041'&&scenario.facts?.purifiersOperating===25],
  ['sanitary-wording',scenario.facts?.sanitaryWording==='Acompañamiento de COESPRIS']
]
const failed=checks.filter(([,ok])=>!ok).map(([id])=>id)
const text=`Agua Bienestar · rutas programadas · ${scenario.facts.garrafonLiters} litros · $${scenario.facts.deliveryPriceMxn} a domicilio · Línea Agua Bienestar ${scenario.facts.infoLine} · ${scenario.facts.sanitaryWording}`
for(const phrase of scenario.requiredPhrases)if(!text.toLowerCase().includes(phrase.toLowerCase()))failed.push(`required:${phrase}`)
for(const phrase of scenario.forbiddenPhrases)if(text.toLowerCase().includes(phrase.toLowerCase()))failed.push(`forbidden:${phrase}`)
const brand={
  surface:bridge.tokens.surface.fallback,ink:bridge.tokens.ink.fallback,primary:bridge.tokens.primary.fallback,
  secondary:bridge.tokens.surfaceAlt.fallback,accent:bridge.tokens.accent.fallback,line:bridge.tokens.line.fallback
}
const props={brand,title:'Agua Bienestar · rutas programadas',stops:scenario.schedule.map(x=>`${x.day}: ${x.destinations.join(' · ')}`),durationSeconds:45}
fs.writeFileSync('/tmp/ab-route-qa-props.json',JSON.stringify(props))
const report={scenario:scenario.id,score:Math.round((checks.length-failed.length)/checks.length*100),failed,master:master?.id,productionMaster:pm?.id,composition:pm?.compositionId,durationSeconds:45,visualArchitecture:visual,brandBridge:bridge?.id,propsFile:'/tmp/ab-route-qa-props.json'}
console.log(JSON.stringify(report,null,2))
if(failed.length)process.exit(1)
