import {useMemo,useState} from 'react'

type StyleFamily={id:string;name:string;intent:string;surfaceStrategy:string;contrastStrategy:string;motionSignature:string;colorBehavior:{maxDominantBrandRoles:number;requireNeutralSurface:boolean;avoidMonochromeFlood:boolean};bestFor:string[];avoid:string[];compatibleArchitectures:string[]}
type StylePreset={architectureId:string;directions:{styleId:string;role:string;reason:string}[]}
type MotionModule={id:string;name:string;category:string;engine:string;status:string;signature:string;bestFor:string[];brandAdaptation:string;avoid:string[]}
type MotionImplementation={id:string;implementation:string[];runtime:string;status:string}
type Provider={id:string;provider:string;model:string;status:string;modes:string[];durations:Record<string,number[]>;strengths:string[];preferredUse:string[];forbiddenUse:string[]}
type Policy={principle:string;classes:{id:string;label:string;generativeAllowed:boolean;examples:string[];rule:string}[];preflight:string[]}

export function PremiumVisualLab({styles,presets,motions,implementations,providers,policy}:{styles:StyleFamily[];presets:StylePreset[];motions:MotionModule[];implementations:MotionImplementation[];providers:Provider[];policy:Policy}){
  const[category,setCategory]=useState('all')
  const[selectedArchitecture,setSelectedArchitecture]=useState(presets[0]?.architectureId??'')
  const categories=useMemo(()=>['all',...Array.from(new Set(motions.map(x=>x.category)))],[motions])
  const filtered=category==='all'?motions:motions.filter(x=>x.category===category)
  const selectedPreset=presets.find(x=>x.architectureId===selectedArchitecture)??presets[0]
  const styleById=useMemo(()=>new Map(styles.map(x=>[x.id,x])),[styles])
  const executableIds=useMemo(()=>new Set(implementations.filter(x=>x.status==='executable').map(x=>x.id)),[implementations])
  const directionCount=presets.reduce((n,p)=>n+p.directions.length,0)
  return <section className="premiumLab">
    <header className="premiumHero">
      <span className="kicker">PREMIUM VISUAL & GENERATIVE MOTION · v1.1</span>
      <h2>Más dirección de arte. Menos diseño genérico.</h2>
      <p>Las familias visuales controlan composición, contraste y carácter de motion sin convertirse en otra paleta. La identidad sigue viniendo del Design System activo.</p>
      <div className="premiumHero__stats"><b>{styles.length}<span>familias visuales</span></b><b>{directionCount}<span>direcciones curadas</span></b><b>{implementations.length}/{motions.length}<span>motion ejecutable</span></b><b>{providers.length}<span>perfiles generativos</span></b></div>
    </header>

    <div className="premiumSectionHead"><div><span className="kicker">CURATED ART DIRECTION</span><h3>Tres caminos, no tres colores</h3></div><p>Cada arquitectura tiene exactamente tres tratamientos premium curados para que Claude elija una composición realmente distinta antes de producir.</p></div>
    <div className="presetPicker"><label>Arquitectura visual<select value={selectedArchitecture} onChange={e=>setSelectedArchitecture(e.target.value)}>{presets.map(p=><option key={p.architectureId} value={p.architectureId}>{p.architectureId}</option>)}</select></label><span>{selectedPreset?.directions.length??0} direcciones curadas</span></div>
    <div className="curatedDirectionGrid">{selectedPreset?.directions.map((d,i)=>{const s=styleById.get(d.styleId);return <article key={d.styleId} className={`curatedDirection curatedDirection--${i}`}><div className="curatedDirection__role">{d.role}</div><div className="curatedDirection__number">0{i+1}</div><h4>{s?.name??d.styleId}</h4><p>{d.reason}</p><footer><span>{d.styleId}</span><b>{s?.colorBehavior.avoidMonochromeFlood?'ANTI-MONOCHROME':'REVIEW'}</b></footer></article>})}</div>

    <div className="premiumSectionHead"><div><span className="kicker">ART DIRECTION LIBRARY</span><h3>Style families</h3></div><p>Las 12 familias son sistemas de superficie, jerarquía y movimiento. Nunca reemplazan la identidad del Design System.</p></div>
    <div className="styleFamilyGrid">{styles.map((s,i)=><article className={`styleFamily styleFamily--${i%4}`} key={s.id}>
      <div className="styleFamily__index">{String(i+1).padStart(2,'0')}</div>
      <div className="styleFamily__meta"><span>{s.id}</span><span>{s.compatibleArchitectures.length} arquitecturas</span></div>
      <h4>{s.name}</h4><p>{s.intent}</p>
      <div className="styleFamily__surface"><i/><span>{s.surfaceStrategy}</span></div>
      <dl><div><dt>Motion</dt><dd>{s.motionSignature}</dd></div><div><dt>Contraste</dt><dd>{s.contrastStrategy}</dd></div></dl>
      <div className="tagRow">{s.bestFor.slice(0,4).map(x=><span key={x}>{x}</span>)}</div>
      <div className="styleFamily__gate">{s.colorBehavior.avoidMonochromeFlood?'ANTI-MONOCHROME ON':'REVIEW'} · máximo {s.colorBehavior.maxDominantBrandRoles} roles dominantes</div>
    </article>)}</div>

    <div className="premiumSectionHead"><div><span className="kicker">MOTION ASSET VAULT</span><h3>Premium modules</h3></div><p>{implementations.length}/{motions.length} módulos ya tienen implementación first-party ejecutable. El motion se elige por función narrativa, no para llenar espacio.</p></div>
    <div className="premiumFilters">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c==='all'?'Todo':c}<span>{c==='all'?motions.length:motions.filter(x=>x.category===c).length}</span></button>)}</div>
    <div className="motionModuleGrid">{filtered.map((m,i)=><article className="motionModule" key={m.id}>
      <div className="motionModule__top"><span>{m.category}</span><b>{m.engine}</b></div>
      <div className="motionModule__glyph"><i style={{transform:`rotate(${(i%6)*12-24}deg)`}}/><i/><i/></div>
      <h4>{m.name}</h4><p>{m.signature}</p>
      <footer><span>{m.id}</span><span className={executableIds.has(m.id)?'motionReady':'motionReview'}>{executableIds.has(m.id)?'EXECUTABLE':'REVIEW'}</span></footer>
    </article>)}</div>

    <div className="premiumSplit">
      <div><div className="premiumSectionHead premiumSectionHead--compact"><div><span className="kicker">GENERATIVE VIDEO</span><h3>Provider layer</h3></div></div>{providers.map(p=><article className="providerCard" key={p.id}><div><span>{p.provider}</span><b>{p.model}</b></div><div className="providerCard__modes">{p.modes.map(x=><span key={x}>{x}</span>)}</div><p>{p.strengths.join(' · ')}</p><small>{p.preferredUse.join(' / ')}</small></article>)}</div>
      <div><div className="premiumSectionHead premiumSectionHead--compact"><div><span className="kicker">FACTUAL BOUNDARY</span><h3>Scene classes</h3></div></div><div className="scenePolicyList">{policy.classes.map(c=><article key={c.id} className={c.generativeAllowed?'allowed':'blocked'}><strong>{c.generativeAllowed?'GENERATIVE OK':'GENERATIVE BLOCK'}</strong><h4>{c.label}</h4><p>{c.rule}</p></article>)}</div></div>
    </div>
  </section>
}
