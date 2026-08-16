import type {CSSProperties} from 'react'
import type {Campaign,Template} from '../types'
export function CampaignCard({campaign,templates,onOpen}:{campaign:Campaign;templates:Template[];onOpen:(t:Template)=>void}){
  const linked=campaign.templates.map(id=>templates.find(t=>t.id===id)).filter(Boolean) as Template[]
  return <article className="kit"><div className="kit__head"><code>{campaign.id}</code><span className={`status status--${campaign.status}`}>{campaign.status}</span></div><h3>{campaign.name}</h3><p>{campaign.description}</p><div className="kit__stack">{linked.map((t,i)=><button key={t.id} onClick={()=>onOpen(t)} style={{'--i':i} as CSSProperties}><b>{t.id}</b><span>{t.name}</span><small>{t.format}</small></button>)}</div></article>
}
