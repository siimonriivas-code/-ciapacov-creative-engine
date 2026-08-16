import { useMemo, useState } from 'react'
import templatesRaw from './registry/templates.json'
import campaignsRaw from './registry/campaigns.json'
import domainsRaw from './registry/domains.json'
import mastersRaw from './registry/masters.json'
import assetsRaw from './registry/assets.json'
import referencesRaw from './registry/references.json'
import type { AssetRecord, Campaign, Domain, OperationalMaster, ReferenceSource, Template } from './types'
import { demoBrand, brandToCssVars } from './brand/contract'
import { matches } from './lib/search'
import { routeCampaigns } from './lib/campaignRouter'
import { routeMasters } from './lib/domainRouter'
import { Director } from './components/Director'
import { TemplateCard } from './components/TemplateCard'
import { DetailPanel } from './components/DetailPanel'
import { CampaignCard } from './components/CampaignCard'
import { CompareTray } from './components/CompareTray'
import { MasterCard } from './components/MasterCard'
import { AssetCard } from './components/AssetCard'
import { ReferenceCard } from './components/ReferenceCard'
import { BriefWorkbench } from './components/BriefWorkbench'
import { useLocalSet } from './hooks'
import './styles.css'
import './styles.v05.css'

const templates=templatesRaw as Template[]
const campaigns=campaignsRaw as Campaign[]
const domains=domainsRaw as Domain[]
const masters=mastersRaw as OperationalMaster[]
const assets=assetsRaw as AssetRecord[]
const references=referencesRaw as ReferenceSource[]
const TYPES=[['all','Todo'],['carousel','Carruseles'],['reel','Reels'],['story','Stories'],['data','Datos'],['route','Rutas'],['presentation','Presentaciones']] as const
const COLLECTIONS=[['all','Todos'],['premium','Premium'],['favorites','★ Favoritos']] as const

type Mode='templates'|'campaigns'|'masters'|'assets'|'references'
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
  const routedMasters=useMemo(()=>routeMasters(masters,domains,q,20),[q])
  const filteredAssets=useMemo(()=>assets.filter(a=>!q.trim()||[a.id,a.name,a.category,...a.capabilities,...a.tags].join(' ').toLowerCase().includes(q.toLowerCase())),[q])
  const toggleCompare=(t:Template)=>setCompare(prev=>prev.some(x=>x.id===t.id)?prev.filter(x=>x.id!==t.id):prev.length<3?[...prev,t]:[prev[1],prev[2],t])
  return <main style={brandToCssVars(demoBrand)}>
    <Director templates={templates} campaigns={campaigns} query={q} setQuery={setQ} onOpen={setSelected} onCampaignMode={()=>setMode('campaigns')}/>
    <BriefWorkbench domains={domains} masters={masters} templates={templates} assets={assets} onOpen={setSelected}/>
    <nav className="modeTabs">
      <button className={mode==='templates'?'active':''} onClick={()=>setMode('templates')}>Plantillas <span>{templates.length}</span></button>
      <button className={mode==='campaigns'?'active':''} onClick={()=>setMode('campaigns')}>Campaign Kits <span>{campaigns.length}</span></button>
      <button className={mode==='masters'?'active':''} onClick={()=>setMode('masters')}>Domain Masters <span>{masters.length}</span></button>
      <button className={mode==='assets'?'active':''} onClick={()=>setMode('assets')}>Asset Vault <span>{assets.length}</span></button>
      <button className={mode==='references'?'active':''} onClick={()=>setMode('references')}>Reference Library <span>{references.length}</span></button>
    </nav>
    {mode==='templates'?<>
      <section className="toolbar"><div><div className="filters">{TYPES.map(([v,l])=><button key={v} className={type===v?'active':''} onClick={()=>setType(v)}>{l}</button>)}</div><div className="filters filters--sub">{COLLECTIONS.map(([v,l])=><button key={v} className={collection===v?'active':''} onClick={()=>setCollection(v)}>{l}</button>)}</div></div><span>{filtered.length} resultados</span></section>
      <section className="grid">{filtered.map(t=><TemplateCard key={t.id} t={t} onOpen={setSelected} isFavorite={favorites.values.has(t.id)} onFavorite={favorites.toggle} isCompared={compare.some(x=>x.id===t.id)} onCompare={toggleCompare}/>)}</section>
    </>:mode==='campaigns'?<section className="campaignView"><div className="campaignView__intro"><span className="kicker">MULTI-FORMAT SYSTEMS</span><h2>Un brief, varias piezas coordinadas.</h2><p>Los kits apuntan a templates existentes: no duplican código ni obligan a cargar toda la biblioteca.</p></div><div className="kitGrid">{routedCampaigns.map(c=><CampaignCard key={c.id} campaign={c} templates={templates} onOpen={setSelected}/>)}</div></section>
    :mode==='masters'?<section className="campaignView"><div className="campaignView__intro"><span className="kicker">DOMAIN LIBRARY</span><h2>Masters pensados para el trabajo real.</h2><p>Agua Bienestar, obras, brigadas, cultura del agua, testimonios, ambiente, avisos, resultados y agenda institucional.</p></div><div className="masterGrid">{routedMasters.map(m=><MasterCard key={m.id} master={m} templates={templates} assets={assets} onOpen={setSelected}/>)}</div></section>
    :mode==='assets'?<section className="campaignView"><div className="campaignView__intro"><span className="kicker">ASSET VAULT</span><h2>Primitivas propias + slots controlados.</h2><p>Los assets bundled son originales y reutilizables. Los slots oficiales nunca se fabrican: deben venir del Design System o de la Media Library verificada.</p></div><div className="assetGrid">{filteredAssets.map(a=><AssetCard key={a.id} asset={a}/>)}</div></section>
    :<section className="campaignView"><div className="campaignView__intro"><span className="kicker">REFERENCE LIBRARY</span><h2>Inspiración sin convertir el repo en un espejo de marketplaces.</h2><p>La referencia puede orientar; la ingestión requiere licencia, procedencia y control.</p></div><div className="referenceGrid">{references.map(r=><ReferenceCard key={r.id} item={r}/>)}</div></section>}
    <DetailPanel t={selected} onClose={()=>setSelected(null)}/>
    <CompareTray items={compare} onRemove={id=>setCompare(x=>x.filter(t=>t.id!==id))} onClear={()=>setCompare([])} onOpen={setSelected}/>
    <footer><b>CIAPACOV Creative Engine v0.5 · Creative Ecosystem</b><span>{templates.length} templates · {masters.length} domain masters · {assets.filter(a=>a.availability==='bundled').length} bundled assets · {campaigns.length} kits</span><span>Active Design System controls production identity.</span></footer>
  </main>
}
