import type { Campaign, Template } from '../types'

const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()

export function routeCampaigns(campaigns:Campaign[],templates:Template[],query:string,limit=3){
  const q=normalize(query)
  const words=q.split(/\s+/).filter(Boolean)
  const status={premium:10,approved:5,experimental:1} as const
  return campaigns.map(c=>{
    const linked=c.templates.map(id=>templates.find(t=>t.id===id)).filter(Boolean) as Template[]
    const hay=normalize([c.id,c.name,c.description,...c.tags,...linked.flatMap(t=>[t.name,...t.tags])].join(' '))
    let score=status[c.status]
    for(const word of words){if(hay.includes(word))score+=5}
    if(/campana|paquete|serie|varios formatos|lanzamiento|cobertura/.test(q))score+=4
    return {campaign:c,score}
  }).sort((a,b)=>b.score-a.score).slice(0,limit).map(x=>x.campaign)
}
