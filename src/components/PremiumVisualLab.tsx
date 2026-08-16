import {useMemo,useState} from 'react'

type StyleFamily={id:string;name:string;intent:string;surfaceStrategy:string;contrastStrategy:string;motionSignature:string;colorBehavior:{maxDominantBrandRoles:number;requireNeutralSurface:boolean;avoidMonochromeFlood:boolean};bestFor:string[];avoid:string[];compatibleArchitectures:string[]}
type MotionModule={id:string;name:string;category:string;engine:string;status:string;signature:string;bestFor:string[];brandAdaptation:string;avoid:string[]}
type Provider={id:string;provider:string;model:string;status:string;modes:string[];durations:Record<string,number[]>;strengths:string[];preferredUse:string[];forbiddenUse:string[]}
type Policy={principle:string;classes:{id:string;label:string;generativeAllowed:boolean;examples:string[];rule:string}[];preflight:string[]}

export function PremiumVisualLab({styles,motions,providers,policy}:{styles:StyleFamily[];motions:MotionModule[];providers:Provider[];policy:Policy}){
  const[category,setCategory]=useState('all')
  const categories=useMemo(()=>['all',...Array.from(new Set(motions.map(x=>x.category)))],[motions])
  const filtered=category==='all'?motions:motions.filter(x=>x.category===category)
  return <section className="premiumLab">
    <header className="premiumHero">
      <span className="kicker">PREMIUM VISUAL & GENERATIVE MOTION · v1.1</span>
      <h2>Más dirección de arte. Menos diseño genérico.</h2>
      <p>Las familias visuales controlan composición, contraste y carácter de motion sin convertirse en otra paleta. La identidad sigue viniendo del Design System activo.</p>
      <div className="premiumHero__stats"><b>{styles.length}<span>familias visuales</span></b><b>{motions.length}<span>módulos motion</span></b><b>{providers.length}<span>perfiles generativos</span></b><b>{policy.classes.length}<span>clases de escena</span></b></div>
    </header>

    <div className="premiumSectionHead"><div><span className="kicker">ART DIRECTION</span><h3>Style families</h3></div><p>Tres direcciones deben diferir en superficie, jerarquía, espacio y movimiento; no sólo en color.</p></div>
    <div className="styleFamilyGrid">{styles.map((s,i)=><article className={`styleFamily styleFamily--${i%4}`} key={s.id}>
      <div className="styleFamily__index">{String(i+1).padStart(2,'0')}</div>
      <div className="styleFamily__meta"><span>{s.id}</span><span>{s.compatibleArchitectures.length} arquitecturas</span></div>
      <h4>{s.name}</h4><p>{s.intent}</p>
      <div className="styleFamily__surface"><i/><span>{s.surfaceStrategy}</span></div>
      <dl><div><dt>Motion</dt><dd>{s.motionSignature}</dd></div><div><dt>Contraste</dt><dd>{s.contrastStrategy}</dd></div></dl>
      <div className="tagRow">{s.bestFor.slice(0,4).map(x=><span key={x}>{x}</span>)}</div>
      <div className="styleFamily__gate">{s.colorBehavior.avoidMonochromeFlood?'ANTI-MONOCHROME ON':'REVIEW'} · máximo {s.colorBehavior.maxDominantBrandRoles} roles dominantes</div>
    </article>)}</div>

    <div className="premiumSectionHead"><div><span className="kicker">MOTION ASSET VAULT</span><h3>Premium modules</h3></div><p>Especificaciones semánticas para que cada movimiento tenga función narrativa.</p></div>
    <div className="premiumFilters">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c==='all'?'Todo':c}<span>{c==='all'?motions.length:motions.filter(x=>x.category===c).length}</span></button>)}</div>
    <div className="motionModuleGrid">{filtered.map((m,i)=><article className="motionModule" key={m.id}>
      <div className="motionModule__top"><span>{m.category}</span><b>{m.engine}</b></div>
      <div className="motionModule__glyph"><i style={{transform:`rotate(${(i%6)*12-24}deg)`}}/><i/><i/></div>
      <h4>{m.name}</h4><p>{m.signature}</p>
      <footer><span>{m.id}</span><span>{m.status}</span></footer>
    </article>)}</div>

    <div className="premiumSplit">
      <div><div className="premiumSectionHead premiumSectionHead--compact"><div><span className="kicker">GENERATIVE VIDEO</span><h3>Provider layer</h3></div></div>{providers.map(p=><article className="providerCard" key={p.id}><div><span>{p.provider}</span><b>{p.model}</b></div><div className="providerCard__modes">{p.modes.map(x=><span key={x}>{x}</span>)}</div><p>{p.strengths.join(' · ')}</p><small>{p.preferredUse.join(' / ')}</small></article>)}</div>
      <div><div className="premiumSectionHead premiumSectionHead--compact"><div><span className="kicker">FACTUAL BOUNDARY</span><h3>Scene classes</h3></div></div><div className="scenePolicyList">{policy.classes.map(c=><article key={c.id} className={c.generativeAllowed?'allowed':'blocked'}><strong>{c.generativeAllowed?'GENERATIVE OK':'GENERATIVE BLOCK'}</strong><h4>{c.label}</h4><p>{c.rule}</p></article>)}</div></div>
    </div>
  </section>
}
