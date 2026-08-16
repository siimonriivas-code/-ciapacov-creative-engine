import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const root=path.resolve(new URL('../',import.meta.url).pathname)
const [manifestArg,sourceArg]=process.argv.slice(2)
if(!manifestArg||!sourceArg){console.error('Usage: npm run ingest:asset -- <manifest.json> <local-file>');process.exit(2)}
const manifestPath=path.resolve(manifestArg), sourcePath=path.resolve(sourceArg)
if(!fs.existsSync(manifestPath)||!fs.existsSync(sourcePath)){console.error('Manifest or source file not found.');process.exit(2)}
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'))
for(const key of ['id','name','category','capabilities','status','source','license'])if(manifest[key]===undefined)throw new Error(`manifest missing ${key}`)
if(!Array.isArray(manifest.capabilities)||!manifest.capabilities.length)throw new Error('capabilities must be a non-empty array')
const forbiddenLicenses=new Set(['unknown','reference-only','unverified'])
if(!manifest.license?.kind||forbiddenLicenses.has(manifest.license.kind))throw new Error('Asset license is unknown/reference-only/unverified. Ingestion blocked.')
const allowedExt=new Set(['.svg','.png','.jpg','.jpeg','.webp','.gif','.mp4','.webm','.json','.lottie','.dotlottie'])
const ext=path.extname(sourcePath).toLowerCase()
if(!allowedExt.has(ext))throw new Error(`Unsupported extension ${ext}`)
if(!/^[A-Z0-9][A-Z0-9_-]+$/.test(manifest.id))throw new Error('ID must use uppercase A-Z, numbers, _ or -')
const safeCategory=String(manifest.category).replace(/[^a-z0-9_-]/gi,'-').toLowerCase()
const outDir=path.join(root,'public','assets','ingested',safeCategory);fs.mkdirSync(outDir,{recursive:true})
const outFile=path.join(outDir,`${manifest.id}${ext}`)
if(fs.existsSync(outFile))throw new Error(`Asset already exists: ${outFile}`)
fs.copyFileSync(sourcePath,outFile)
const sha256=crypto.createHash('sha256').update(fs.readFileSync(outFile)).digest('hex')
const registryPath=path.join(root,'src','registry','assets.json')
const registry=JSON.parse(fs.readFileSync(registryPath,'utf8'))
if(registry.some(x=>x.id===manifest.id))throw new Error(`Registry ID already exists: ${manifest.id}`)
const rel=path.relative(root,outFile).split(path.sep).join('/')
registry.push({...manifest,file:rel,availability:'bundled',license:{...manifest.license},tags:manifest.tags||manifest.capabilities,notes:manifest.notes||'',integrity:{sha256}})
fs.writeFileSync(registryPath,JSON.stringify(registry,null,2)+'\n')
console.log(JSON.stringify({ok:true,id:manifest.id,file:rel,sha256},null,2))
