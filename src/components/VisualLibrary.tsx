import type {MasterVisualMap,OperationalMaster,VisualArchitecture} from '../types'
import {directionsForMaster} from '../lib/visualDirector'
import {VisualDirectionCard} from './VisualDirectionCard'

export function VisualLibrary({masters,maps,architectures,query}:{masters:OperationalMaster[];maps:MasterVisualMap[];architectures:VisualArchitecture[];query:string}){
  const q=query.trim().toLowerCase()
  const visible=masters.filter(m=>!q||[m.id,m.name,m.objective].join(' ').toLowerCase().includes(q))
  return <section className="campaignView visualLibrary"><div className="campaignView__intro"><span className="kicker">VISUAL PRODUCTION LIBRARY v0.7</span><h2>20 Masters · 60 direcciones visuales.</h2><p>Cada Master ofrece tres arquitecturas realmente distintas antes de abrir un template. Todas heredan identidad del Design System activo.</p></div>
    <div className="visualLibrary__masters">{visible.map(m=><article key={m.id} className="visualMaster"><header><code>{m.id}</code><h3>{m.name}</h3><p>{m.objective}</p></header><div className="visualMaster__directions">{directionsForMaster(m,maps,architectures).map(d=><VisualDirectionCard key={d.architecture.id} item={d}/>)}</div></article>)}</div>
  </section>
}
