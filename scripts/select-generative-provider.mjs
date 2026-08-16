#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const inputPath=process.argv[2]
if(!inputPath){console.error('Usage: node scripts/select-generative-provider.mjs <requirements.json>');process.exit(2)}
const req=JSON.parse(fs.readFileSync(path.resolve(inputPath),'utf8'))
const catalog=JSON.parse(fs.readFileSync(new URL('../src/registry/generative-provider-catalog.json',import.meta.url),'utf8'))
const norm=(x)=>String(x??'').toLowerCase()
const durationFits=(p,d)=>{
  if(!d)return true
  if(Array.isArray(p.durationsSeconds))return p.durationsSeconds.includes(d)
  if(Array.isArray(p.durationRangeSeconds))return d>=p.durationRangeSeconds[0]&&d<=p.durationRangeSeconds[1]
  return true
}
const resolutionRank=(r)=>{
  const s=norm(r)
  if(s.includes('4k')||s.includes('3840')||s.includes('2160x3840')||s.includes('1792'))return 4
  if(s.includes('1080')||s.includes('1024'))return 3
  if(s.includes('768')||s.includes('1280')||s.includes('720'))return 2
  if(s.includes('540')||s.includes('480'))return 1
  return 0
}
const profileMaxResolution=(p)=>Math.max(0,...(p.resolutions??[]).map(resolutionRank))
const wantsRank=resolutionRank(req.minResolution)
const rows=catalog.providers.map(p=>{
  let score=0;const reasons=[];const misses=[]
  const modes=(p.modes??[]).map(norm)
  if(req.mode){const wanted=norm(req.mode);if(modes.some(m=>m===wanted||m.includes(wanted)||wanted.includes(m))){score+=22;reasons.push(`mode:${req.mode}`)}else misses.push(`mode:${req.mode}`)}
  if(req.durationSeconds){if(durationFits(p,Number(req.durationSeconds))){score+=12;reasons.push(`duration:${req.durationSeconds}s`)}else misses.push(`duration:${req.durationSeconds}s`)}
  if(req.portrait===true){if(p.portrait===true){score+=10;reasons.push('portrait')}else if(typeof p.portrait==='string'){score+=2;reasons.push('portrait-needs-revalidation')}else misses.push('portrait')}
  if(req.firstFrame===true){if(p.firstFrame===true){score+=12;reasons.push('first-frame')}else misses.push('first-frame')}
  if(req.lastFrame===true){if(p.lastFrame===true){score+=14;reasons.push('last-frame')}else misses.push('last-frame')}
  if(req.referenceImages===true){if(p.referenceImages===true){score+=9;reasons.push('reference-images')}else misses.push('reference-images')}
  if(req.videoToVideo===true){if(p.videoToVideo===true||typeof p.videoToVideo==='string'&&p.videoToVideo!=='not-asserted-in-current-profile'){score+=13;reasons.push('video-to-video')}else misses.push('video-to-video')}
  if(req.generatedAudio===true){if(p.generatedAudio===true){score+=7;reasons.push('generated-audio')}else misses.push('generated-audio')}
  if(wantsRank){const max=profileMaxResolution(p);if(max>=wantsRank){score+=8;reasons.push(`resolution>=${req.minResolution}`)}else if(max>0)misses.push(`resolution>=${req.minResolution}`)}
  if(req.preferExplicitCamera===true){if(p.cameraControl==='explicit-command-syntax'){score+=8;reasons.push('explicit-camera')}else if(p.cameraControl){score+=2}}
  if(req.preferIntegrated===true){if(p.executionStatus==='integrated-live'){score+=18;reasons.push('integrated-live')}else if(p.executionStatus==='integrated-dry-run'){score+=12;reasons.push('integrated-dry-run')}else score-=3}
  const hardMisses=misses.length
  if(hardMisses)score-=hardMisses*18
  return {id:p.id,provider:p.provider,model:p.model,executionStatus:p.executionStatus,score,reasons,misses,executionAllowed:p.executionStatus==='integrated-live',dryRunAllowed:p.executionStatus==='integrated-dry-run'||p.executionStatus==='integrated-live'}
}).sort((a,b)=>b.score-a.score)
const output={requirements:req,verifiedAt:catalog.verifiedAt,recommendations:rows.slice(0,5),rule:'A routing recommendation is not execution permission. adapter-candidate profiles require a governed adapter, current-doc revalidation and explicit credentials before any API call.'}
console.log(JSON.stringify(output,null,2))
