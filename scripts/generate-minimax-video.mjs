import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const sleep=ms=>new Promise(r=>setTimeout(r,ms))
const args=process.argv.slice(2)
const planArg=args.find(x=>!x.startsWith('--'))
const execute=args.includes('--execute')
const outArg=args.find(x=>x.startsWith('--out='))?.slice(6)
if(!planArg){
  console.error('Usage: node scripts/generate-minimax-video.mjs <scene-plan.json> [--execute] [--out=out/clip.mp4]')
  process.exit(2)
}
const planPath=path.resolve(planArg)
if(!fs.existsSync(planPath)){console.error(`Plan not found: ${planPath}`);process.exit(2)}
const plan=JSON.parse(fs.readFileSync(planPath,'utf8'))

const forbiddenClasses=new Set(['SCENE-FACTUAL-EVIDENCE','SCENE-FACTUAL-OVERLAY'])
const allowedModels=new Set(['MiniMax-Hailuo-2.3','MiniMax-Hailuo-2.3-Fast'])
const allowedModes=new Set(['text-to-video','image-to-video'])
const factualTerms=['official vehicle','actual official','real beneficiary','actual beneficiary','real event','actual event','official map','documentary proof','real purifier']
const factualOverlayTerms=['logo','phone number','precio','price','mxn','pesos','route schedule','rutas programadas','certified','certificado','coespris']
const blockers=[]
const warnings=[]

for(const key of ['id','semanticClass','purpose','prompt','mode'])if(plan[key]===undefined)blockers.push(`missing ${key}`)
if(forbiddenClasses.has(plan.semanticClass))blockers.push(`${plan.semanticClass} cannot use generative video.`)
if(!allowedModes.has(plan.mode))blockers.push(`unsupported mode ${plan.mode}`)
const model=plan.model??'MiniMax-Hailuo-2.3'
if(!allowedModels.has(model))blockers.push(`model ${model} is not in the governed provider registry`)
if(model==='MiniMax-Hailuo-2.3-Fast'&&plan.mode==='text-to-video')blockers.push('MiniMax-Hailuo-2.3-Fast is governed as image-to-video only.')
if(plan.mode==='image-to-video'&&!plan.firstFrameImage)blockers.push('image-to-video requires firstFrameImage')
const duration=Number(plan.durationSeconds??6)
const resolution=plan.resolution??(duration===10?'768P':'1080P')
if(![6,10].includes(duration))blockers.push('durationSeconds must be 6 or 10')
if(duration===10&&resolution==='1080P')blockers.push('Hailuo 2.3/2.3 Fast support 10s at 768P, not 1080P.')
if(!['768P','1080P'].includes(resolution))blockers.push(`unsupported resolution ${resolution}`)
const prompt=String(plan.prompt??'').trim().replace(/\s+/g,' ')
if(prompt.length>2000)blockers.push(`prompt exceeds 2000 characters (${prompt.length})`)
const lower=prompt.toLowerCase()
if(factualTerms.some(x=>lower.includes(x)))blockers.push('prompt appears to request fabricated official/documentary evidence')
if(factualOverlayTerms.some(x=>lower.includes(x)))warnings.push('prompt may contain factual/official overlay content; keep those elements in deterministic Remotion layers instead')
if(Array.isArray(plan.factualOverlays)&&plan.factualOverlays.length)warnings.push('factualOverlays declared: do not bake them into generated pixels')

const camera=Array.isArray(plan.cameraCommands)?plan.cameraCommands:[]
if(camera.length>3)warnings.push('more than three camera commands may reduce predictability')
const commandPrefix=camera.length?`[${camera.join(',')}] `:''
const payload={model,prompt:`${commandPrefix}${prompt}`.slice(0,2000),duration,resolution,prompt_optimizer:false}
if(plan.mode==='image-to-video')payload.first_frame_image=plan.firstFrameImage

const dryRun={allowed:blockers.length===0,executeRequested:execute,planId:plan.id,semanticClass:plan.semanticClass,model,mode:plan.mode,duration,resolution,warnings,blockers,payload:{...payload,first_frame_image:payload.first_frame_image?'[SUPPLIED]':undefined}}
console.log(JSON.stringify(dryRun,null,2))
if(blockers.length)process.exit(1)
if(!execute){
  console.log('\nDRY RUN ONLY. Re-run with --execute and MINIMAX_API_KEY set to submit a paid generation task.')
  process.exit(0)
}

const apiKey=process.env.MINIMAX_API_KEY
if(!apiKey){console.error('MINIMAX_API_KEY is required for --execute and must not be committed to the repository.');process.exit(2)}
const headers={Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'}

async function jsonRequest(url,options={}){
  const response=await fetch(url,options)
  const body=await response.text()
  let data
  try{data=JSON.parse(body)}catch{throw new Error(`${response.status} ${response.statusText}: ${body.slice(0,500)}`)}
  if(!response.ok)throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(data)}`)
  if(data.base_resp&&data.base_resp.status_code!==0)throw new Error(`MiniMax API error ${data.base_resp.status_code}: ${data.base_resp.status_msg}`)
  return data
}

console.log('\nSubmitting governed MiniMax generation task...')
const created=await jsonRequest('https://api.minimax.io/v1/video_generation',{method:'POST',headers,body:JSON.stringify(payload)})
if(!created.task_id)throw new Error('MiniMax did not return task_id')
const taskId=String(created.task_id)
console.log(`task_id=${taskId}`)

let fileId=null
let finalStatus=null
const maxPolls=Number(process.env.MINIMAX_MAX_POLLS??90)
for(let i=0;i<maxPolls;i++){
  await sleep(10000)
  const query=new URL('https://api.minimax.io/v1/query/video_generation')
  query.searchParams.set('task_id',taskId)
  const status=await jsonRequest(query,{headers:{Authorization:`Bearer ${apiKey}`}})
  finalStatus=status.status
  console.log(`poll ${i+1}/${maxPolls}: ${finalStatus}`)
  if(finalStatus==='Success'){fileId=String(status.file_id);break}
  if(finalStatus==='Fail')throw new Error(`MiniMax video generation failed: ${JSON.stringify(status)}`)
}
if(!fileId)throw new Error(`MiniMax task did not complete before timeout. Last status: ${finalStatus}`)

const fileUrl=new URL('https://api.minimax.io/v1/files/retrieve')
fileUrl.searchParams.set('file_id',fileId)
const retrieved=await jsonRequest(fileUrl,{headers:{Authorization:`Bearer ${apiKey}`}})
const downloadUrl=retrieved.file?.download_url
if(!downloadUrl)throw new Error('MiniMax file retrieve response did not include download_url')

const response=await fetch(downloadUrl)
if(!response.ok)throw new Error(`Video download failed: ${response.status} ${response.statusText}`)
const bytes=Buffer.from(await response.arrayBuffer())
const out=path.resolve(outArg??path.join('out','generative',`${plan.id}.mp4`))
fs.mkdirSync(path.dirname(out),{recursive:true})
fs.writeFileSync(out,bytes)
const sha256=crypto.createHash('sha256').update(bytes).digest('hex')
const metadata={
  id:`GENCLIP-${plan.id}`,
  providerId:model==='MiniMax-Hailuo-2.3-Fast'?'GEN-MINIMAX-HAILUO-23-FAST':'GEN-MINIMAX-HAILUO-23',
  model,
  mode:plan.mode,
  semanticClass:plan.semanticClass,
  purpose:plan.purpose,
  prompt,
  cameraCommands:camera,
  durationSeconds:duration,
  resolution,
  generatedAt:new Date().toISOString(),
  sourceFrameUri:plan.firstFrameImage??null,
  taskId,
  fileId,
  outputFile:out,
  sha256,
  bytes:bytes.length,
  reviewStatus:'review',
  rightsStatus:'provider-terms-review',
  factualOverlays:plan.factualOverlays??[],
  warnings
}
fs.writeFileSync(`${out}.metadata.json`,JSON.stringify(metadata,null,2)+'\n')
console.log(JSON.stringify({ok:true,output:out,metadata:`${out}.metadata.json`,sha256,reviewStatus:'review'},null,2))
console.log('Generated media remains REVIEW. Human visual/factual review is required before production approval.')
