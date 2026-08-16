import type {VisualArchitecture} from '../types'

export function VisualPreview({architecture:a}:{architecture:VisualArchitecture}){
  const f=a.family
  return <div className={`visualPreview visualPreview--${f}`} aria-label={a.name}>
    <div className="visualPreview__safe">
      <div className="visualPreview__kicker">VISUAL SYSTEM</div>
      {f==='route'?<Route/>:
       f==='map'?<MapStory/>:
       f==='data'?<Data/>:
       f==='timeline'?<Timeline/>:
       f==='comparison'?<Compare/>:
       f==='system'?<System/>:
       f==='quote'?<Quote/>:
       f==='notice'?<Notice/>:
       f==='mosaic'?<Mosaic/>:
       f==='kinetic'?<Kinetic/>:
       f==='photo'?<Photo/>:<Editorial/>}
      <div className="visualPreview__id">{a.id.replace('VIS-','')}</div>
    </div>
  </div>
}
const Line=({w='70%'}:{w?:string})=><i className="vp-line" style={{width:w}}/>
function Editorial(){return <><div className="vp-title"><Line w="76%"/><Line w="52%"/></div><div className="vp-split"><div><Line/><Line w="58%"/><Line w="66%"/></div><b/></div></>}
function Photo(){return <><div className="vp-photo"><span>REAL MEDIA</span></div><div className="vp-caption"><Line/><Line w="62%"/></div><div className="vp-stat">00</div></>}
function Route(){return <><svg className="vp-route" viewBox="0 0 240 120"><path d="M10 104 C55 24 95 132 145 56 S210 42 232 15"/><circle cx="10" cy="104" r="6"/><circle cx="145" cy="56" r="6"/><circle cx="232" cy="15" r="6"/></svg><div className="vp-vehicle">→</div><div className="vp-caption"><Line w="54%"/><Line w="78%"/></div></>}
function Data(){return <><div className="vp-big">00</div><div className="vp-bars"><i/><i/><i/></div><div className="vp-caption"><Line/><Line w="55%"/></div></>}
function Timeline(){return <><div className="vp-title"><Line w="64%"/></div><div className="vp-timeline"><i/><i/><i/><i/></div><div className="vp-caption"><Line/><Line w="70%"/></div></>}
function Compare(){return <><div className="vp-compare"><div>ANTES</div><div>DESPUÉS</div></div><div className="vp-delta">+00</div></>}
function System(){return <><div className="vp-system"><i/><i/><i/><i/><svg viewBox="0 0 100 70"><path d="M15 20 L50 35 L85 16 M50 35 L28 58 M50 35 L78 58"/></svg></div><div className="vp-caption"><Line w="72%"/></div></>}
function Quote(){return <><div className="vp-photo vp-photo--small"><span>REAL MEDIA</span></div><blockquote>“ ”</blockquote><div className="vp-caption"><Line w="56%"/><Line w="38%"/></div></>}
function Notice(){return <><div className="vp-alert">!</div><div className="vp-title"><Line w="72%"/><Line w="45%"/></div><div className="vp-notice"><Line/><Line w="64%"/><Line w="74%"/></div></>}
function Mosaic(){return <><div className="vp-mosaic"><i/><i/><i/><i/></div><div className="vp-caption"><Line w="74%"/><Line w="48%"/></div></>}
function MapStory(){return <><div className="vp-map"><svg viewBox="0 0 200 120"><path d="M18 28 L62 12 L96 36 L142 20 L182 55 L154 102 L94 94 L50 110 L20 72 Z"/><circle cx="62" cy="42" r="7"/><circle cx="126" cy="58" r="7"/><circle cx="95" cy="88" r="7"/></svg></div><div className="vp-caption"><Line w="68%"/></div></>}
function Kinetic(){return <><div className="vp-kinetic"><b>IDEA</b><strong>CLAVE</strong><span>00</span></div><div className="vp-caption"><Line w="42%"/></div></>}
