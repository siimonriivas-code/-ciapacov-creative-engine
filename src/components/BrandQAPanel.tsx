import {useMemo,useState} from 'react'
import type {BrandBridge,OperationalMaster,ProductionMaster,QAScenario} from '../types'
import {scenarioSummary} from '../lib/realProductionQA'

export function BrandQAPanel({bridges,scenarios,masters,productionMasters}:{bridges:BrandBridge[];scenarios:QAScenario[];masters:OperationalMaster[];productionMasters:ProductionMaster[]}){
  const[first]=scenarios
  const[selectedId,setSelectedId]=useState(first?.id||'')
  const selected=scenarios.find(x=>x.id===selectedId)||first
  const bridge=bridges.find(x=>x.id===selected?.brandBridgeId)
  const summary=useMemo(()=>selected?scenarioSummary(selected,masters,productionMasters):null,[selected,masters,productionMasters])
  return <section className="brandQaView">
    <div className="campaignView__intro"><span className="kicker">BRAND BRIDGE + REAL PRODUCTION QA</span><h2>Identidad externa, reglas verificables y pruebas reproducibles.</h2><p>El Engine no contiene logos ni fuentes oficiales. El Bridge traduce el Design System activo a tokens y políticas; QA comprueba routing, copy y producción sin fabricar evidencia.</p></div>
    <div className="brandQaGrid">
      <article className="brandQaCard"><small>BRAND BRIDGES</small><h3>{bridges.length} adapters</h3>{bridges.map(b=><div className="bridgeRow" key={b.id}><b>{b.id}</b><span>{b.designSystem}</span><em>{b.governance.identityAuthority}</em></div>)}</article>
      <article className="brandQaCard"><small>QA SCENARIO</small><select value={selectedId} onChange={e=>setSelectedId(e.target.value)}>{scenarios.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select>{summary&&<><h3>{summary.name}</h3><p>{summary.master} → {summary.productionMaster} → <code>{summary.composition}</code> · {summary.duration}s</p><span className="qaSource">{summary.sourceStatus}</span></>}</article>
    </div>
    {selected&&bridge&&<div className="brandQaDetail">
      <article><small>FACTS LOCK</small><div className="factGrid">{Object.entries(selected.facts).map(([k,v])=><div key={k}><b>{String(v)}</b><span>{k}</span></div>)}</div></article>
      <article><small>LANGUAGE GATE</small><h4>Requerido</h4>{selected.requiredPhrases.map(x=><span className="ruleGood" key={x}>{x}</span>)}<h4>Prohibido</h4>{selected.forbiddenPhrases.map(x=><span className="ruleBad" key={x}>{x}</span>)}</article>
      <article><small>BRAND GOVERNANCE</small>{bridge.motionRules.map(x=><span className="ruleLine" key={x}>{x}</span>)}{selected.rules.map(x=><span className="ruleLine" key={x}>{x}</span>)}</article>
      {selected.schedule&&<article className="scheduleLock"><small>SCHEDULE LOCK</small>{selected.schedule.map(row=><div key={row.day}><b>{row.day}</b><span>{row.destinations.join(' · ')}</span></div>)}</article>}
    </div>}
  </section>
}
