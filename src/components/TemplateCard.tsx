import type { Template } from '../types'
import { TemplatePreview } from './TemplatePreview'
export function TemplateCard({t,onOpen,isFavorite,onFavorite,isCompared,onCompare}:{t:Template;onOpen:(t:Template)=>void;isFavorite:boolean;onFavorite:(id:string)=>void;isCompared:boolean;onCompare:(t:Template)=>void}){
  return <article className={`card ${isFavorite?'card--favorite':''}`} onClick={()=>onOpen(t)}>
    <div className="card__previewWrap"><TemplatePreview template={t}/><div className="card__actions"><button className={isFavorite?'is-on':''} title="Favorito" onClick={e=>{e.stopPropagation();onFavorite(t.id)}}>★</button><button className={isCompared?'is-on':''} title="Comparar" onClick={e=>{e.stopPropagation();onCompare(t)}}>↔</button></div></div>
    <div className="card__body"><div className="card__meta"><code>{t.id}</code><span className={`status status--${t.status}`}>{t.status}</span></div><h3>{t.name}</h3><p>{t.description}</p><div className="chips">{t.tags.slice(0,4).map(x=><span key={x}>{x}</span>)}</div></div>
  </article>
}
