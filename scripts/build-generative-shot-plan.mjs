#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const [archetypeId,outArg,...rest]=process.argv.slice(2)
if(!archetypeId){console.error('Usage: node scripts/build-generative-shot-plan.mjs <GENSHOT-ID> [out.json] [--mode=image-to-video] [--duration=6] [--resolution=1080P]');process.exit(2)}
const lib=JSON.parse(fs.readFileSync(new URL('../src/registry/generative-shot-archetypes.json',import.meta.url),'utf8'))
const shot=lib.shots.find(x=>x.id===archetypeId)
if(!shot){console.error(`Unknown archetype ${archetypeId}`);process.exit(2)}
const opts=Object.fromEntries(rest.filter(x=>x.startsWith('--')&&x.includes('=')).map(x=>{const [k,...v]=x.slice(2).split('=');return[k,v.join('=')]}))
const mode=opts.mode??shot.preferredMode
const duration=Number(opts.duration??shot.duration[0])
const resolution=opts.resolution??(duration===10?'768P':'1080P')
const plan={
  id:`${shot.id}-${duration}S`,
  archetypeId:shot.id,
  semanticClass:shot.semanticClass,
  purpose:shot.bestFor[0],
  prompt:shot.promptCore,
  mode,
  model:'MiniMax-Hailuo-2.3',
  durationSeconds:duration,
  resolution,
  cameraCommands:shot.camera.slice(0,3),
  firstFrameImage:mode==='image-to-video'?'REQUIRED_APPROVED_FIRST_FRAME':undefined,
  factualOverlays:[],
  deterministicOverlayContract:{identity:true,facts:true,typography:true,logos:true,phoneNumbers:true,prices:true,metrics:true},
  avoid:shot.avoid,
  reviewStatus:'plan-only'
}
const text=JSON.stringify(plan,null,2)+'\n'
if(outArg&&!outArg.startsWith('--')){const out=path.resolve(outArg);fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,text);console.log(out)}else process.stdout.write(text)
