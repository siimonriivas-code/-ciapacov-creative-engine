#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const file=process.argv[2]
if(!file){console.error('Usage: node scripts/build-beat-grid.mjs <config.json> [out.json]');process.exit(2)}
const cfg=JSON.parse(fs.readFileSync(path.resolve(file),'utf8'))
const bpm=Number(cfg.bpm);const fps=Number(cfg.fps??30);const durationSeconds=Number(cfg.durationSeconds)
if(!(bpm>0)||!(fps>0)||!(durationSeconds>0)){console.error('bpm, fps and durationSeconds must be > 0');process.exit(2)}
const secondsPerBeat=60/bpm;const totalFrames=Math.round(durationSeconds*fps);const totalBeats=Math.ceil(durationSeconds/secondsPerBeat)
const beats=[]
for(let i=0;i<=totalBeats;i++){
  const second=i*secondsPerBeat
  if(second>durationSeconds+1e-9)break
  const frame=Math.min(totalFrames-1,Math.round(second*fps))
  beats.push({beat:i+1,second:Number(second.toFixed(3)),frame,bar:Math.floor(i/4)+1,beatInBar:(i%4)+1})
}
const eighths=[]
const eighthSec=secondsPerBeat/2
for(let i=0;i<=Math.ceil(durationSeconds/eighthSec);i++){
  const second=i*eighthSec;if(second>durationSeconds+1e-9)break
  eighths.push({index:i+1,second:Number(second.toFixed(3)),frame:Math.min(totalFrames-1,Math.round(second*fps))})
}
const output={bpm,fps,durationSeconds,totalFrames,secondsPerBeat:Number(secondsPerBeat.toFixed(4)),beats,eighths,usage:{majorSceneChanges:'prefer bar boundaries or deliberate off-beat exceptions',transitions:'align start/end to beat or eighth-note grid when music-led',heroBeat:'choose an intentional bar/beat rather than arbitrary timestamp',rule:'visual meaning wins over forced sync; do not stretch factual reading time just to hit a beat'}}
const text=JSON.stringify(output,null,2)+'\n'
const outArg=process.argv[3]
if(outArg){fs.writeFileSync(path.resolve(outArg),text);console.log(path.resolve(outArg))}else process.stdout.write(text)
