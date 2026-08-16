import type {Domain, OperationalMaster, CreativeBrief} from '../types'

const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()

export function inferDomain(domains:Domain[], brief:CreativeBrief|string){
  const text=normalize(typeof brief==='string'?brief:[brief.topic,brief.objective,brief.tone,...(brief.materials||[]),...(brief.constraints||[])].filter(Boolean).join(' '))
  const ranked=domains.map(d=>{
    let score=0
    for(const k of d.keywords){const n=normalize(k); if(text.includes(n))score+=n.includes(' ')?8:4}
    if(text.includes(normalize(d.name)))score+=12
    return {domain:d,score}
  }).sort((a,b)=>b.score-a.score)
  return ranked[0]?.score>0?ranked[0].domain:null
}

export function routeMasters(masters:OperationalMaster[], domains:Domain[], brief:CreativeBrief|string, limit=4){
  const text=normalize(typeof brief==='string'?brief:[brief.topic,brief.format,brief.objective,brief.tone,...(brief.materials||[]),...(brief.constraints||[])].filter(Boolean).join(' '))
  const domain=inferDomain(domains,brief)
  return masters.map(m=>{
    let score=m.status==='premium'?12:6
    if(domain && m.domain===domain.id)score+=24
    if(typeof brief!=='string' && brief.format && m.formats.includes(brief.format))score+=16
    const hay=normalize([m.id,m.name,m.objective,...m.formats,...m.materials].join(' '))
    for(const w of text.split(/\s+/).filter(x=>x.length>2))if(hay.includes(w))score+=2
    return {master:m,score}
  }).sort((a,b)=>b.score-a.score).slice(0,limit).map(x=>x.master)
}
