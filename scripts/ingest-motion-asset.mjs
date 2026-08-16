import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const root=path.resolve(new URL('../',import.meta.url).pathname)
const [manifestArg,sourceArg]=process.argv.slice(2)
if(!manifestArg||!sourceArg){console.error('Usage: npm run ingest:motion -- <manifest.json> <local-file>');process.exit(2)}
const manifestPath=path.resolve(manifestArg)
const sourcePath=path.resolve(sourceArg)
if(!fs.existsSync(manifestPath)||!fs.existsSync(sourcePath)){console.error('Manifest or source file not found.');process.exit(2)}

const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'))
for(const key of ['id','name','format','category','source','license','provenance','status'])if(manifest[key]===undefined)throw new Error(`manifest missing ${key}`)
if(!/^[A-Z0-9][A-Z0-9_-]+$/.test(manifest.id))throw new Error('ID must use uppercase A-Z, numbers, _ or -')
if(!manifest.license?.kind||['unknown','unverified','reference-only'].includes(String(manifest.license.kind)))throw new Error('Motion asset license is not production-usable.')
if(!manifest.provenance?.provider||!manifest.provenance?.sourceUrl)throw new Error('provenance.provider and provenance.sourceUrl are required')
if(manifest.provenance.provider!=='first-party'&&!manifest.license?.proof)throw new Error('Third-party motion assets require license.proof before ingestion.')

const allowedExt=new Set(['.json','.lottie','.dotlottie','.svg','.mp4','.webm','.mov'])
const ext=path.extname(sourcePath).toLowerCase()
if(!allowedExt.has(ext))throw new Error(`Unsupported motion asset extension ${ext}`)
const expected={'.json':'lottie-json','.lottie':'dotlottie','.dotlottie':'dotlottie','.svg':'svg','.mp4':'video','.webm':'video-alpha','.mov':'video'}
if(expected[ext]&&manifest.format!==expected[ext])throw new Error(`Manifest format ${manifest.format} does not match ${ext}; expected ${expected[ext]}`)

const registryPath=path.join(root,'src','registry','external-motion-assets.json')
const registry=JSON.parse(fs.readFileSync(registryPath,'utf8'))
if(registry.assets.some(x=>x.id===manifest.id))throw new Error(`Motion asset ID already exists: ${manifest.id}`)

const safeCategory=String(manifest.category).replace(/[^a-z0-9_-]/gi,'-').toLowerCase()
const outDir=path.join(root,'public','motion','licensed',safeCategory)
fs.mkdirSync(outDir,{recursive:true})
const outFile=path.join(outDir,`${manifest.id}${ext}`)
if(fs.existsSync(outFile))throw new Error(`Motion asset already exists: ${outFile}`)
fs.copyFileSync(sourcePath,outFile)
const bytes=fs.readFileSync(outFile)
const sha256=crypto.createHash('sha256').update(bytes).digest('hex')
const rel=path.relative(root,outFile).split(path.sep).join('/')

const record={
  ...manifest,
  file:rel,
  integrity:{sha256,bytes:bytes.length},
  review:{deterministicRender:'pending',brandAdaptation:'pending',visualQA:'pending'},
  productionReady:false
}
registry.assets.push(record)
fs.writeFileSync(registryPath,JSON.stringify(registry,null,2)+'\n')
console.log(JSON.stringify({ok:true,id:manifest.id,file:rel,sha256,productionReady:false,next:'Run deterministic smoke render and brand-adaptation review.'},null,2))
