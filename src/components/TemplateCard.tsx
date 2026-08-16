import type { Template } from '../types'
import { TemplatePreview } from './TemplatePreview'
export function TemplateCard({t,onOpen}:{t:Template;onOpen:(t:Template)=>void}){const desc=t.description ?? `${t.type} · ${t.subtype}`;return <article className="card" onClick={()=>onOpen(t)}><TemplatePreview template={t}/><div className="card__body"><div className="card__meta"><code>{t.id}</code><span className={`status status--${t.status}`}>{t.status}</span></div><h3>{t.name}</h3><p>{desc}</p><div className="chips">{t.tags.slice(0,4).map(x=><span key={x}>{x}</span>)}</div></div></article>}
