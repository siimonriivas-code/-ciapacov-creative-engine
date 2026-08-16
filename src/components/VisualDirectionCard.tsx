import type {ResolvedVisualDirection} from '../types'
import {VisualPreview} from './VisualPreview'
export function VisualDirectionCard({item,selected,onSelect}:{item:ResolvedVisualDirection;selected?:boolean;onSelect?:()=>void}){
  return <button className={`visualDirectionCard ${selected?'is-selected':''}`} onClick={onSelect} type="button">
    <VisualPreview architecture={item.architecture}/>
    <div className="visualDirectionCard__meta"><code>{item.architecture.id}</code><b>{item.label} · {item.architecture.name}</b><p>{item.reason}</p><span>{item.architecture.density} density · {item.architecture.motion} motion</span></div>
  </button>
}
