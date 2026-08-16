import fs from 'node:fs'
const read=p=>JSON.parse(fs.readFileSync(new URL(`../${p}`,import.meta.url),'utf8'))
const masters=read('src/registry/masters.json')
const pms=read('src/registry/production-masters.json')
const roles=read('src/registry/media-roles.json')
const media=read('src/registry/media-library.json')
const visuals=read('src/registry/visual-architectures.json')
const ids=a=>new Set(a.map(x=>x.id))
const masterIds=ids(masters), roleIds=ids(roles), visualIds=ids(visuals)
const fail=[]
if(pms.length!==9)fail.push(`expected 9 production masters, got ${pms.length}`)
if(roles.length!==12)fail.push(`expected 12 media roles, got ${roles.length}`)
const coverage=new Map(masters.map(m=>[m.id,0]))
for(const pm of pms){
  if(!pm.compositionId?.startsWith('CE-'))fail.push(`${pm.id}: invalid compositionId`)
  if(pm.status!=='production-ready')fail.push(`${pm.id}: not production-ready`)
  for(const id of pm.masterIds){if(!masterIds.has(id))fail.push(`${pm.id}: unknown master ${id}`);else coverage.set(id,(coverage.get(id)||0)+1)}
  for(const id of [...pm.requiredMediaRoles,...pm.recommendedMediaRoles])if(!roleIds.has(id))fail.push(`${pm.id}: unknown media role ${id}`)
  for(const id of pm.visualArchitectures)if(!visualIds.has(id))fail.push(`${pm.id}: unknown visual architecture ${id}`)
  if(!pm.durationSeconds?.length)fail.push(`${pm.id}: no durations`)
}
for(const [id,count] of coverage)if(count!==1)fail.push(`${id}: production master coverage ${count}, expected exactly 1`)
for(const r of roles){if(!r.kinds?.length)fail.push(`${r.id}: no media kinds`);if(r.realOnly&&r.allowDemo)fail.push(`${r.id}: realOnly role cannot allow demo`)}
for(const m of media){
  if(!['approved','review','blocked','demo'].includes(m.status))fail.push(`${m.id}: invalid status`)
  if(m.status==='approved'&&(!m.license?.kind||!m.license?.usage))fail.push(`${m.id}: approved media missing license metadata`)
  if(!m.uri)fail.push(`${m.id}: missing uri`)
}
if(fail.length){console.error(fail.join('\n'));process.exit(1)}
console.log(`OK v0.8: ${pms.length} production masters cover ${masters.length} operational masters; ${roles.length} media roles; ${media.length} verified media records`)
