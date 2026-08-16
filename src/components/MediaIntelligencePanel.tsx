import type {MediaRecord,MediaRole} from '../types'
import {mediaLibrarySummary} from '../lib/mediaIntelligence'

export function MediaIntelligencePanel({roles,library}:{roles:MediaRole[];library:MediaRecord[]}){
  const s=mediaLibrarySummary(library)
  return <section className="mediaIntelligenceView"><div className="campaignView__intro"><span className="kicker">MEDIA INTELLIGENCE</span><h2>La biblioteca factual empieza vacía a propósito.</h2><p>El motor no inventa fotos, testimonios, mapas, vehículos ni infraestructura. Indexa únicamente media autorizada y la asigna a roles de producción por tipo, tags, orientación, dominio y estado de aprobación.</p></div><div className="mediaStats"><span><b>{s.total}</b> registros</span><span><b>{s.approved}</b> aprobados</span><span><b>{s.review}</b> revisión</span><span><b>{s.blocked}</b> bloqueados</span></div><div className="mediaRoleGrid">{roles.map(r=><article key={r.id}><small>{r.id}</small><h3>{r.name}</h3><p>{r.notes}</p><div>{r.kinds.map(k=><span key={k}>{k}</span>)}</div><b>{r.realOnly?'REAL ONLY':'FLEXIBLE'} · {r.orientation}</b></article>)}</div>{library.length===0&&<div className="mediaEmpty"><b>0 media factual cargada.</b><span>Esto no bloquea el motor creativo; sólo impide que marque como “ready” una producción que exige evidencia real.</span></div>}</section>
}
