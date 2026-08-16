import type {MasterVisualMap,OperationalMaster,ResolvedVisualDirection,VisualArchitecture} from '../types'

export function directionsForMaster(master:OperationalMaster|null|undefined,maps:MasterVisualMap[],architectures:VisualArchitecture[],format?:string):ResolvedVisualDirection[]{
  if(!master)return []
  const map=maps.find(x=>x.masterId===master.id)
  if(!map)return []
  const byId=new Map(architectures.map(a=>[a.id,a]))
  const enriched=map.directions.flatMap(d=>{
    const architecture=byId.get(d.architectureId)
    if(!architecture)return []
    const formatFit=!format || master.formats.includes(format) && architecture.formats.includes(format)
    return [{...d,architecture,formatFit}] as ResolvedVisualDirection[]
  })
  return enriched.sort((a,b)=>(Number(b.formatFit)-Number(a.formatFit)) || a.priority-b.priority)
}

export function visualDirectionPrompt(direction:ResolvedVisualDirection){
  const a=direction.architecture
  return `Dirección visual: ${a.id} · ${a.name}\nFirma: ${a.signature}\nCarácter de motion: ${a.motion}\nDensidad: ${a.density}\nEvitar: ${a.avoid.join(', ')||'ninguno'}.`
}
