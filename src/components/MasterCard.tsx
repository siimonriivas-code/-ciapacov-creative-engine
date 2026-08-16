import type {AssetRecord,OperationalMaster,Template} from '../types'
import {resolveAssets} from '../lib/assetResolver'
export function MasterCard({master,templates,assets,onOpen}:{master:OperationalMaster;templates:Template[];assets:AssetRecord[];onOpen:(t:Template)=>void}){
  const plan=resolveAssets(master,assets)
  const linked=master.templateIds.map(id=>templates.find(t=>t.id===id)).filter(Boolean) as Template[]
  return <article className="masterCard"><div className="masterCard__head"><code>{master.id}</code><span className={`status status--${master.status}`}>{master.status}</span></div><h3>{master.name}</h3><p>{master.objective}</p><div className="chips">{master.formats.map(x=><span key={x}>{x}</span>)}</div><div className="masterCard__health"><b>{plan.gaps.length?`${plan.gaps.length} requisito(s) externo(s)`:'Assets base listos'}</b><span>{plan.warnings.length} preferencia(s) por completar</span></div><div className="masterCard__templates">{linked.slice(0,5).map(t=><button key={t.id} onClick={()=>onOpen(t)}><b>{t.id}</b><span>{t.name}</span></button>)}</div></article>
}
