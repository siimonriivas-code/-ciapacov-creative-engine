import { useMemo, useState } from 'react'
import templatesRaw from './registry/templates.json'
import carouselsV03 from './registry/templates.v03.carousels.json'
import reelsV03 from './registry/templates.v03.reels.json'
import storiesV03 from './registry/templates.v03.stories.json'
import utilityV03 from './registry/templates.v03.utility.json'
import campaignsRaw from './registry/campaigns.json'
import type { Campaign, Template } from './types'
import { demoBrand, brandToCssVars } from './brand/contract'
import { matches } from './lib/search'
import { routeCampaigns } from './lib/campaignRouter'
import { Director } from './components/Director'
import { TemplateCard } from './components/TemplateCard'
import { DetailPanel } from './components/DetailPanel'
import { CampaignCard } from './components/CampaignCard'
import { CompareTray } from './components/CompareTray'
import { useLocalSet } from './hooks'
import './styles.css'
import './styles.v03.css'
import './styles.v04.ui.css'
import './styles.v04.families.css'

const templates=[...(templatesRaw as Template[]),...(carouselsV03 as Template[]),...(reelsV03 as Template[]),...(storiesV03 as Template[]),...(utilityV03 as Template[])]
const campaigns=campaignsRaw as Campaign[]
const TYPES=[['all','Todo'],['carousel','Carruseles'],['reel','Reels'],['story','Stories'],['data','Datos'],['route','Rutas'],['presentation','Presentaciones']] as const
const COLLECTIONS=[['all','Todos'],['premium','Premium'],['favorites','★ Favoritos']] as const

type Mode='templates'|'campaigns'
export default function App(){
  const[q,setQ]=useState('')
  const[type,setType]=useState('all')
  const[collection,setCollection]=useState('all')
  const[mode,setMode]=useState<Mode>('templates')
  const[selected,setSelected]=useState<Template|null>(null)
  const[compare,setCompare]=useState<Template[]>([])
  const favorites=useLocalSet('ce-favorites-v1')
  const filtered=useMemo(()=>templates.filter(t=>matches(t,q,type)).filter(t=>collection==='premium'?t.status==='premium':collection==='favorites'?favorites.values.has(t.id):true),[q,type,collection,favorites.values])
  const routedCampaigns=useMemo(()=>routeCampaigns(campaigns,templates,q,8),[q])
  const toggleCompare=(t:Template)=>setCompare(prev=>prev.some(x=>x.id===t.id)?prev.filter(x=>x.id!==t.id):prev.length<3?[...prev,t]:[prev[1],prev[2],t])
  return <main style={brandToCssVars(demoBrand)}>
    <Director templates={templates} campaigns={campaigns} query={q} setQuery={setQ} onOpen={setSelected} onCampaignMode={()=>setMode('campaigns')}/>
    <nav className="modeTabs"><button className={mode==='templates'?'active':''} onClick={()=>setMode('templates')}>Plantillas <span>{templates.length}</span></button><button className={mode==='campaigns'?'active':''} onClick={()=>setMode('campaigns')}>Campaign Kits <span>{campaigns.length}</span></button></nav>
    {mode==='templates'?<>
      <section className="toolbar"><div><div className="filters">{TYPES.map(([v,l])=><button key={v} className={type===v?'active':''} onClick={()=>setType(v)}>{l}</button>)}</div><div className="filters filters--sub">{COLLECTIONS.map(([v,l])=><button key={v} className={collection===v?'active':''} onClick={()=>setCollection(v)}>{l}</button>)}</div></div><span>{filtered.length} resultados</span></section>
      <section className="grid">{filtered.map(t=><TemplateCard key={t.id} t={t} onOpen={setSelected} isFavorite={favorites.values.has(t.id)} onFavorite={favorites.toggle} isCompared={compare.some(x=>x.id===t.id)} onCompare={toggleCompare}/>)}</section>
    </>:<section className="campaignView"><div className="campaignView__intro"><span className="kicker">MULTI-FORMAT SYSTEMS</span><h2>Un brief, varias piezas coordinadas.</h2><p>Los kits apuntan a templates existentes: no duplican código ni obligan a cargar toda la biblioteca.</p></div><div className="kitGrid">{routedCampaigns.map(c=><CampaignCard key={c.id} campaign={c} templates={templates} onOpen={setSelected}/>)}</div></section>}
    <DetailPanel t={selected} onClose={()=>setSelected(null)}/>
    <CompareTray items={compare} onRemove={id=>setCompare(x=>x.filter(t=>t.id!==id))} onClear={()=>setCompare([])} onOpen={setSelected}/>
    <footer><b>CIAPACOV Creative Engine v0.4</b><span>80 templates · 48 motions · 8 campaign kits · 3 Remotion masters</span><span>Demo appearance only · active Design System controls production brand.</span></footer>
  </main>
}
