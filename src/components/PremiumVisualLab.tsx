import {useMemo,useState} from 'react'
import kitsRaw from '../registry/premium-template-kits.json'
import materialsRaw from '../registry/premium-material-systems.json'
import lottieRaw from '../registry/first-party-lottie-presets.json'
import shotsRaw from '../registry/generative-shot-archetypes.json'
import benchmarkRaw from '../registry/creative-benchmark-gates.json'
import '../styles.v11.curated.css'

type StyleFamily={id:string;name:string;intent:string;surfaceStrategy:string;contrastStrategy:string;motionSignature:string;colorBehavior:{maxDominantBrandRoles:number;requireNeutralSurface:boolean;avoidMonochromeFlood:boolean};bestFor:string[];avoid:string[];compatibleArchitectures:string[]}
type StylePreset={architectureId:string;directions:{styleId:string;role:string;reason:string}[]}
type MotionModule={id:string;name:string;category:string;engine:string;status:string;signature:string;bestFor:string[];brandAdaptation:string;avoid:string[]}
type MotionImplementation={id:string;implementation:string[];runtime:string;status:string}
type Provider={id:string;provider:string;model:string;status:string;modes:string[];durations:Record<string,number[]>;strengths:string[];preferredUse:string[];forbiddenUse:string[]}
type Policy={principle:string;classes:{id:string;label:string;generativeAllowed:boolean;examples:string[];rule:string}[];preflight:string[]}
type PremiumKit={id:string;name:string;productionMasterId:string;compositionId:string;architectureId:string;styleId:string;materialIds:string[];motionIds:string[];durations:number[];formats:string[];objective:string;avoid:string[]}
type Material={id:string;name:string;family:string;surfaceRoles:string[];intensity:string;bestFor:string[];avoid:string[]}
type LottiePreset={id:string;name:string;category:string;generator:string;durationFrames:number;loop:boolean;roles:string[];bestFor:string[];avoid:string[]}
type GenShot={id:string;name:string;semanticClass:string;preferredMode:string;duration:number[];camera:string[];promptCore:string;bestFor:string[];avoid:string[]}
type GenShotRegistry={version:string;purpose:string;shots:GenShot[];selectionRules:string[]}
type BenchmarkGate={id:string;name:string;weight:number;target:string}
type Benchmark={version:string;purpose:string;passScore:number;gates:BenchmarkGate[];automaticBlockers:string[];antiPatterns:string[]}

const kits=kitsRaw as PremiumKit[]
const materials=materialsRaw as Material[]
const lotties=lottieRaw as LottiePreset[]
const shots=(shotsRaw as GenShotRegistry).shots
const benchmark=benchmarkRaw as Benchmark
const masterLabel=(id:string)=>id.replace('PM-','').replaceAll('-',' ')

export function PremiumVisualLab({styles,presets,motions,implementations,providers,policy}:{styles:StyleFamily[];presets:StylePreset[];motions:MotionModule[];implementations:MotionImplementation[];providers:Provider[];policy:Policy}){
  const[category,setCategory]=useState('all')
  const[selectedArchitecture,setSelectedArchitecture]=useState(presets[0]?.architectureId??'')
  const[selectedMaster,setSelectedMaster]=useState('PM-ROUTE')
  const[lottieCategory,setLottieCategory]=useState('all')
  const categories=useMemo(()=>['all',...Array.from(new Set(motions.map(x=>x.category)))],[motions])
  const lottieCategories=useMemo(()=>['all',...Array.from(new Set(lotties.map(x=>x.category)))],[])
  const filtered=category==='all'?motions:motions.filter(x=>x.category===category)
  const filteredLotties=lottieCategory==='all'?lotties:lotties.filter(x=>x.category===lottieCategory)
  const selectedPreset=presets.find(x=>x.architectureId===selectedArchitecture)??presets[0]
  const styleById=useMemo(()=>new Map(styles.map(x=>[x.id,x])),[styles])
  const executableIds=useMemo(()=>new Set(implementations.filter(x=>x.status==='executable').map(x=>x.id)),[implementations])
  const directionCount=presets.reduce((n,p)=>n+p.directions.length,0)
  const masters=useMemo(()=>Array.from(new Set(kits.map(x=>x.productionMasterId))),[])
  const selectedKits=kits.filter(x=>x.productionMasterId===selectedMaster)
  return <section className="premiumLab">
    <header className="premiumHero">
      <span className="kicker">PREMIUM VISUAL & GENERATIVE MOTION · v1.1</span>
      <h2>Más dirección de arte. Menos diseño genérico.</h2>
      <p>Las familias visuales controlan composición, contraste y carácter de motion sin convertirse en otra paleta. La identidad sigue viniendo del Design System activo.</p>
      <div className="premiumHero__stats"><b>{styles.length}<span>familias visuales</span></b><b>{directionCount}<span>direcciones curadas</span></b><b>{implementations.length}/{motions.length}<span>motion ejecutable</span></b><b>{kits.length}/{kits.length}<span>kits ejecutables</span></b><b>{lotties.length}<span>Lotties first-party</span></b><b>{shots.length}<span>tomas generativas</span></b></div>
    </header>

    <div className="premiumSectionHead"><div><span className="kicker">EXECUTABLE TEMPLATE SYSTEMS</span><h3>27 Premium Template Kits</h3></div><p>Tres composiciones dirigidas por Production Master. No son un mismo layout con tres colores: cada kit tiene gramática, materialidad y motion propios.</p></div>
    <div className="presetPicker"><label>Production Master<select value={selectedMaster} onChange={e=>setSelectedMaster(e.target.value)}>{masters.map(x=><option key={x} value={x}>{x} · {masterLabel(x)}</option>)}</select></label><span>{selectedKits.length} composiciones ejecutables · CE-KIT-*</span></div>
    <div className="curatedDirectionGrid">{selectedKits.map((k,i)=>{const s=styleById.get(k.styleId);return <article key={k.id} className={`curatedDirection curatedDirection--${i}`}><div className="curatedDirection__role">{s?.name??k.styleId}</div><div className="curatedDirection__number">0{i+1}</div><h4>{k.name}</h4><p>{k.objective}</p><div className="tagRow">{k.materialIds.slice(0,3).map(x=><span key={x}>{x.replace('MAT-','')}</span>)}</div><footer><span>CE-KIT-{k.id.replace('PTK-','')}</span><b>EXECUTABLE</b></footer></article>})}</div>

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

    <div className="premiumSectionHead"><div><span className="kicker">MATERIAL SYSTEMS</span><h3>18 superficies procedurales</h3></div><p>Materialidad ejecutable para dar profundidad y carácter sin depender de fondos genéricos ni llenar el frame con el color primario.</p></div>
    <div className="motionModuleGrid">{materials.map((m,i)=><article className="motionModule" key={m.id}><div className="motionModule__top"><span>{m.family}</span><b>{m.intensity}</b></div><div className="motionModule__glyph"><i style={{transform:`rotate(${(i%7)*9-25}deg)`}}/><i/><i/></div><h4>{m.name}</h4><p>{m.bestFor.slice(0,4).join(' · ')}</p><footer><span>{m.id}</span><span className="motionReady">EXECUTABLE</span></footer></article>)}</div>

    <div className="premiumSectionHead"><div><span className="kicker">MOTION ASSET VAULT</span><h3>Premium modules</h3></div><p>{implementations.length}/{motions.length} módulos ya tienen implementación first-party ejecutable. El motion se elige por función narrativa, no para llenar espacio.</p></div>
    <div className="premiumFilters">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c==='all'?'Todo':c}<span>{c==='all'?motions.length:motions.filter(x=>x.category===c).length}</span></button>)}</div>
    <div className="motionModuleGrid">{filtered.map((m,i)=><article className="motionModule" key={m.id}>
      <div className="motionModule__top"><span>{m.category}</span><b>{m.engine}</b></div>
      <div className="motionModule__glyph"><i style={{transform:`rotate(${(i%6)*12-24}deg)`}}/><i/><i/></div>
      <h4>{m.name}</h4><p>{m.signature}</p>
      <footer><span>{m.id}</span><span className={executableIds.has(m.id)?'motionReady':'motionReview'}>{executableIds.has(m.id)?'EXECUTABLE':'REVIEW'}</span></footer>
    </article>)}</div>

    <div className="premiumSectionHead"><div><span className="kicker">FIRST-PARTY LOTTIE</span><h3>18 animaciones reutilizables</h3></div><p>Recursos originales gobernados por roles del Design System. Sirven a rutas, agua, territorio, datos, sistemas, comunidad, tipografía y utilidades.</p></div>
    <div className="premiumFilters">{lottieCategories.map(c=><button key={c} className={lottieCategory===c?'active':''} onClick={()=>setLottieCategory(c)}>{c==='all'?'Todo':c}<span>{c==='all'?lotties.length:lotties.filter(x=>x.category===c).length}</span></button>)}</div>
    <div className="motionModuleGrid">{filteredLotties.map((l,i)=><article className="motionModule" key={l.id}><div className="motionModule__top"><span>{l.category}</span><b>{l.loop?'LOOP':'ONE SHOT'}</b></div><div className="motionModule__glyph"><i style={{transform:`rotate(${(i%8)*11-30}deg)`}}/><i/><i/></div><h4>{l.name}</h4><p>{l.bestFor.slice(0,4).join(' · ')}</p><footer><span>{l.id}</span><span className="motionReady">FIRST-PARTY</span></footer></article>)}</div>

    <div className="premiumSectionHead"><div><span className="kicker">CREATIVE BENCHMARK</span><h3>Piso premium: {benchmark.passScore}/100</h3></div><p>Un PASS automático no prueba belleza, pero impide cerrar una pieza con jerarquía pobre, layouts repetidos, motion decorativo, microtexto o mezcla factual insegura.</p></div>
    <div className="styleFamilyGrid">{benchmark.gates.map((g,i)=><article className={`styleFamily styleFamily--${i%4}`} key={g.id}><div className="styleFamily__index">{g.weight}</div><div className="styleFamily__meta"><span>{g.id}</span><span>peso</span></div><h4>{g.name}</h4><p>{g.target}</p><div className="styleFamily__gate">QUALITY GATE</div></article>)}</div>

    <div className="premiumSectionHead"><div><span className="kicker">GOVERNED CINEMATIC SHOTS</span><h3>18 arquetipos generativos</h3></div><p>MiniMax u otro proveedor puede dar atmósfera, profundidad o explicación conceptual. Nunca sustituye evidencia, identidad oficial ni hechos.</p></div>
    <div className="motionModuleGrid">{shots.map((s,i)=><article className="motionModule" key={s.id}><div className="motionModule__top"><span>{s.semanticClass.replace('SCENE-','')}</span><b>{s.preferredMode}</b></div><div className="motionModule__glyph"><i style={{transform:`rotate(${(i%6)*14-28}deg)`}}/><i/><i/></div><h4>{s.name}</h4><p>{s.bestFor.slice(0,3).join(' · ')} · cámara: {s.camera.join(' / ')}</p><footer><span>{s.id}</span><span className="motionReview">HUMAN REVIEW</span></footer></article>)}</div>

    <div className="premiumSplit">
      <div><div className="premiumSectionHead premiumSectionHead--compact"><div><span className="kicker">GENERATIVE VIDEO</span><h3>Provider layer</h3></div></div>{providers.map(p=><article className="providerCard" key={p.id}><div><span>{p.provider}</span><b>{p.model}</b></div><div className="providerCard__modes">{p.modes.map(x=><span key={x}>{x}</span>)}</div><p>{p.strengths.join(' · ')}</p><small>{p.preferredUse.join(' / ')}</small></article>)}</div>
      <div><div className="premiumSectionHead premiumSectionHead--compact"><div><span className="kicker">FACTUAL BOUNDARY</span><h3>Scene classes</h3></div></div><div className="scenePolicyList">{policy.classes.map(c=><article key={c.id} className={c.generativeAllowed?'allowed':'blocked'}><strong>{c.generativeAllowed?'GENERATIVE OK':'GENERATIVE BLOCK'}</strong><h4>{c.label}</h4><p>{c.rule}</p></article>)}</div></div>
    </div>
  </section>
}