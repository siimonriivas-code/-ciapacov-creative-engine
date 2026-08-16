import fs from 'node:fs'
import crypto from 'node:crypto'
import path from 'node:path'

const [, , manifestPath]=process.argv
if(!manifestPath){console.error('Usage: npm run ingest:media -- /absolute/path/to/media-manifest.json');process.exit(1)}
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'))
const records=Array.isArray(manifest)?manifest:[manifest]
const target=new URL('../src/registry/media-library.json',import.meta.url)
const library=JSON.parse(fs.readFileSync(target,'utf8'))
const allowedKinds=new Set(['photo','video','audio','map','logo','image','document'])
const allowedStatus=new Set(['approved','review','blocked'])
const consentStates=new Set(['verified','not-required','unknown'])

for(const rec of records){
  if(!rec.id||!rec.title||!rec.kind||!rec.uri)throw new Error('Each media record requires id, title, kind and uri')
  if(!allowedKinds.has(rec.kind))throw new Error(`${rec.id}: unsupported kind ${rec.kind}`)
  if(!allowedStatus.has(rec.status))throw new Error(`${rec.id}: status must be approved, review or blocked; demo cannot be ingested`)
  if(!rec.license?.kind||!rec.license?.usage)throw new Error(`${rec.id}: license.kind and license.usage are required`)
  if(rec.consent&&!consentStates.has(rec.consent))throw new Error(`${rec.id}: invalid consent state`)
  const humanMedia=['photo','video','audio'].includes(rec.kind)
  if(rec.status==='approved'&&humanMedia&&!['verified','not-required'].includes(rec.consent))throw new Error(`${rec.id}: approved photo/video/audio requires explicit verified or not-required consent state`)
  if((rec.tags||[]).includes('testimonial')&&rec.consent!=='verified')throw new Error(`${rec.id}: testimonial media requires verified consent`)
  if(library.some(x=>x.id===rec.id))throw new Error(`${rec.id}: duplicate media id`)
  const normalized={orientation:'any',tags:[],domains:[],locations:[],source:'user-supplied',consent:'unknown',...rec}
  if(rec.localFile){
    const absolute=path.resolve(rec.localFile)
    if(!fs.existsSync(absolute))throw new Error(`${rec.id}: localFile not found`)
    normalized.checksum=crypto.createHash('sha256').update(fs.readFileSync(absolute)).digest('hex')
    delete normalized.localFile
  }
  library.push(normalized)
}
fs.writeFileSync(target,JSON.stringify(library,null,2)+'\n')
console.log(`OK: ingested ${records.length} media record(s); library now has ${library.length}`)
