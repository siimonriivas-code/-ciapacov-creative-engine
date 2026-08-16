import type { Template } from '../types'

const normalize = (s:string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
const statusWeight = { premium: 12, approved: 6, experimental: 1 } as const

export function scoreTemplate(t:Template, query:string) {
  const q = normalize(query)
  const words = q.split(/\s+/).filter(Boolean)
  const hay = normalize([t.id,t.name,t.type,t.subtype,t.format,t.description ?? '',...t.tags].join(' '))
  let score = statusWeight[t.status]
  for (const word of words) {
    if (normalize(t.name).includes(word)) score += 8
    if (normalize(t.tags.join(' ')).includes(word)) score += 6
    if (hay.includes(word)) score += 2
  }
  if (/reel|video|anim/.test(q) && t.type==='reel') score += 12
  if (/carrusel|carousel/.test(q) && t.type==='carousel') score += 12
  if (/story|historia/.test(q) && t.type==='story') score += 12
  if (/ruta|calendario|colonia|recorrido/.test(q) && t.route) score += 10
  if (/dato|cifra|resultado|porcentaje|precio/.test(q) && t.data) score += 9
  if (/foto|obra|territorio|documental/.test(q) && t.photo==='required') score += 7
  return score
}

export function routeTemplates(templates:Template[], query:string, limit=6) {
  if (!query.trim()) return [...templates].sort((a,b)=>statusWeight[b.status]-statusWeight[a.status]).slice(0,limit)
  return templates.map(t=>({t,score:scoreTemplate(t,query)})).sort((a,b)=>b.score-a.score).slice(0,limit).map(x=>x.t)
}
