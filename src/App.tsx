import { useMemo, useState } from 'react'
import templatesRaw from '../claude/catalog.compact.json'
import type { Template } from './types'
import { demoBrand, brandToCssVars } from './brand/contract'
import { matches } from './lib/search'
import { Director } from './components/Director'
import { TemplateCard } from './components/TemplateCard'
import { DetailPanel } from './components/DetailPanel'
import './styles.css'
const templates=templatesRaw as Template[]
const TYPES=[['all','Todo'],['carousel','Carruseles'],['reel','Reels'],['story','Stories'],['data','Datos'],['route','Rutas'],['presentation','Presentaciones']] as const
export default function App(){const[q,setQ]=useState('');const[type,setType]=useState('all');const[selected,setSelected]=useState<Template|null>(null);const filtered=useMemo(()=>templates.filter(t=>matches(t,q,type)),[q,type]);return <main style={brandToCssVars(demoBrand)}><Director templates={templates} query={q} setQuery={setQ} onOpen={setSelected}/><section className="toolbar"><div className="filters">{TYPES.map(([v,l])=><button key={v} className={type===v?'active':''} onClick={()=>setType(v)}>{l}</button>)}</div><span>{filtered.length} resultados</span></section><section className="grid">{filtered.map(t=><TemplateCard key={t.id} t={t} onOpen={setSelected}/>)}</section><DetailPanel t={selected} onClose={()=>setSelected(null)}/><footer><b>CIAPACOV Creative Engine v0.2</b><span>Demo appearance only · active Design System controls production brand.</span></footer></main>}
