import type {Template} from '../types'
export function CompareTray({items,onRemove,onClear,onOpen}:{items:Template[];onRemove:(id:string)=>void;onClear:()=>void;onOpen:(t:Template)=>void}){
  if(!items.length)return null
  return <aside className="compareTray"><div className="compareTray__head"><b>Comparar {items.length}/3</b><button onClick={onClear}>Limpiar</button></div><div className="compareTray__grid">{items.map(t=><div key={t.id}><button className="compareTray__open" onClick={()=>onOpen(t)}><code>{t.id}</code><strong>{t.name}</strong><span>{t.type} · {t.format}</span><span>{t.density} · motion {t.motion}</span></button><button className="compareTray__remove" onClick={()=>onRemove(t.id)}>×</button></div>)}</div></aside>
}
