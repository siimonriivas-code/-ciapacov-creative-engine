import fs from 'node:fs'
const read=p=>JSON.parse(fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8'))
const materials=read('src/registry/premium-material-systems.json')
const fail=[]
if(materials.length!==18)fail.push(`expected exactly 18 premium material systems, got ${materials.length}`)
const ids=new Set(),families=new Set()
for(const m of materials){
  if(ids.has(m.id))fail.push(`duplicate material ${m.id}`);ids.add(m.id);families.add(m.family)
  if(!m.name||!m.family||!m.intensity)fail.push(`${m.id}: incomplete metadata`)
  if(!Array.isArray(m.surfaceRoles)||m.surfaceRoles.length<2)fail.push(`${m.id}: at least two Design System surface roles required`)
  if(!Array.isArray(m.bestFor)||!m.bestFor.length)fail.push(`${m.id}: bestFor required`)
  if(!Array.isArray(m.avoid)||!m.avoid.length)fail.push(`${m.id}: avoid rules required`)
}
for(const family of ['liquid','tactile','editorial','territory','technical','data','documentary','cinematic','modular'])if(!families.has(family))fail.push(`missing premium material family ${family}`)
const impl=fs.readFileSync(new URL('../src/remotion/components/PremiumMaterials.tsx',import.meta.url),'utf8')
for(const id of ids)if(!impl.includes(`'${id}'`))fail.push(`${id}: executable PremiumMaterial variant missing`)
if(!impl.includes('executablePremiumMaterialIds'))fail.push('PremiumMaterials executable inventory missing')
if(fail.length){console.error(fail.join('\n'));process.exit(1)}
console.log(`OK premium materials: ${materials.length} executable procedural systems across ${families.size} material families`)
