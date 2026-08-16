import type { Template } from '../types'

const normalize = (s:string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
const statusWeight = { premium: 14, approved: 7, experimental: 1 } as const

const synonymGroups: Record<string,string[]> = {
  route:['ruta','rutas','calendario','colonia','colonias','recorrido','territorio','vehiculo','camion','domicilio'],
  data:['dato','datos','cifra','cifras','resultado','resultados','porcentaje','precio','avance','inversion','beneficiarios'],
  photo:['foto','fotos','fotografia','obra','territorio','documental','testimonio','evidencia'],
  explain:['explicar','explicador','como funciona','proceso','pasos','etapas','flujo'],
  report:['informe','reporte','resultados','gestion','balance','resumen'],
  launch:['lanzamiento','arranque','nuevo','anuncio','presentacion'],
  compare:['antes','despues','comparativo','comparacion','transformacion'],
  quote:['cita','frase','testimonio','declaracion'],
}

function intentHits(query:string){
  const q=normalize(query)
  return Object.entries(synonymGroups).filter(([,words])=>words.some(w=>q.includes(normalize(w)))).map(([key])=>key)
}

export function scoreTemplate(t:Template, query:string) {
  const q = normalize(query)
  const words = q.split(/\s+/).filter(Boolean)
  const hay = normalize([t.id,t.name,t.type,t.subtype,t.format,t.description,...t.tags].join(' '))
  let score = statusWeight[t.status]
  for (const word of words) {
    if (normalize(t.name).includes(word)) score += 9
    if (normalize(t.tags.join(' ')).includes(word)) score += 7
    if (hay.includes(word)) score += 2
  }
  const intents=intentHits(query)
  if (/reel|video|anim/.test(q) && t.type==='reel') score += 16
  if (/carrusel|carousel/.test(q) && t.type==='carousel') score += 16
  if (/story|historia vertical/.test(q) && t.type==='story') score += 16
  if (/presentacion|diapositiva|slide/.test(q) && t.type==='presentation') score += 16
  if (intents.includes('route') && t.route) score += 12
  if (intents.includes('data') && t.data) score += 11
  if (intents.includes('photo') && t.photo==='required') score += 9
  if (intents.includes('explain') && /explain|process|steps|logic|continuous/.test(t.subtype+' '+t.recipe)) score += 10
  if (intents.includes('report') && /report|executive|results|metric/.test(t.subtype+' '+t.recipe)) score += 10
  if (intents.includes('launch') && /launch|cover|announcement|hero/.test(t.subtype+' '+t.recipe)) score += 10
  if (intents.includes('compare') && /comparison|before|transform/.test(t.subtype+' '+t.recipe)) score += 10
  if (intents.includes('quote') && /quote|interview|testimonial/.test(t.subtype+' '+t.recipe)) score += 8
  return score
}

function similarity(a:Template,b:Template){
  let s=0
  if(a.type===b.type)s+=.1
  if(a.subtype===b.subtype)s+=.35
  if(a.recipe===b.recipe)s+=.35
  const A=new Set(a.tags.map(normalize)), B=new Set(b.tags.map(normalize))
  const overlap=[...A].filter(x=>B.has(x)).length
  s+=Math.min(.3, overlap*.07)
  return s
}

export function routeTemplates(templates:Template[], query:string, limit=6) {
  const ranked=templates.map(t=>({t,score:query.trim()?scoreTemplate(t,query):statusWeight[t.status]})).sort((a,b)=>b.score-a.score)
  const chosen:Template[]=[]
  const remaining=[...ranked]
  while(chosen.length<limit && remaining.length){
    let bestIndex=0,bestValue=-Infinity
    for(let i=0;i<Math.min(remaining.length,40);i++){
      const candidate=remaining[i]
      const penalty=chosen.length?Math.max(...chosen.map(c=>similarity(c,candidate.t)))*12:0
      const value=candidate.score-penalty
      if(value>bestValue){bestValue=value;bestIndex=i}
    }
    chosen.push(remaining.splice(bestIndex,1)[0].t)
  }
  return chosen
}
