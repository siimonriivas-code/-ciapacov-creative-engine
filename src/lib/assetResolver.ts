import type {AssetRecord, AssetResolution, OperationalMaster} from '../types'

const statusWeight:Record<string,number>={premium:8,approved:6,experimental:2,slot:1,deprecated:-10}

function bestForCapability(assets:AssetRecord[], capability:string){
  return assets.filter(a=>a.capabilities.includes(capability) && a.status!=='deprecated')
    .sort((a,b)=>(b.availability==='bundled'?10:0)+(statusWeight[b.status]||0)-((a.availability==='bundled'?10:0)+(statusWeight[a.status]||0)))[0]||null
}

export function resolveAssets(master:OperationalMaster, assets:AssetRecord[]){
  const req=master.requiredCapabilities.map(cap=>resolve(cap,assets))
  const rec=master.recommendedCapabilities.map(cap=>resolve(cap,assets))
  return {required:req,recommended:rec,gaps:req.filter(x=>x.state!=='ready'),warnings:rec.filter(x=>x.state!=='ready')}
}
function resolve(capability:string, assets:AssetRecord[]):AssetResolution{
  const asset=bestForCapability(assets,capability)
  if(!asset)return {capability,asset:null,state:'missing'}
  if(asset.availability==='bundled')return {capability,asset,state:'ready'}
  return {capability,asset,state:'slot'}
}
