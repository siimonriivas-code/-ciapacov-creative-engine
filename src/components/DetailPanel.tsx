import {useState} from 'react'
import type { Template } from '../types'
import {TemplatePreview} from './TemplatePreview'
export function DetailPanel({t,onClose}:{t:Template|null;onClose:()=>void}){
  const[copied,setCopied]=useState(false)
  if(!t)return null
  const prompt=`Usa ${t.id} (${t.name}) del CIAPACOV Creative Engine como arquitectura base. Lee únicamente su registro, recipe e implementación relacionada. Mantén el Design System activo como autoridad absoluta de marca. Sustituye todo demo content por contenido y assets verificados. Respeta formato ${t.format}, densidad ${t.density} y nivel de motion ${t.motion}. No cargues templates no relacionados.`
  const copy=async()=>{await navigator.clipboard.writeText(prompt);setCopied(true);setTimeout(()=>setCopied(false),1200)}
  return <div className="backdrop" onClick={onClose}><aside className="detail" onClick={e=>e.stopPropagation()}><button className="detail__close" onClick={onClose}>×</button><div className="detail__preview"><TemplatePreview template={t}/></div><code>{t.id}</code><h2>{t.name}</h2><p>{t.description}</p><dl><div><dt>Formato</dt><dd>{t.format}</dd></div><div><dt>Pack</dt><dd>{t.pack}</dd></div><div><dt>Densidad</dt><dd>{t.density}</dd></div><div><dt>Motion</dt><dd>{t.motion}</dd></div><div><dt>Recipe</dt><dd>{t.recipe}</dd></div><div><dt>Estado</dt><dd>{t.status}</dd></div></dl><label className="detail__promptLabel">PROMPT DIRECTO PARA CLAUDE DESIGN</label><textarea readOnly value={prompt}/><button className="primary" onClick={copy}>{copied?'Copiado ✓':'Copiar prompt'}</button></aside></div>
}
