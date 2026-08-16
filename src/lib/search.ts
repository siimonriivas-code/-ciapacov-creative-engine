import type { Template } from '../types'
const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
export function matches(t:Template, query:string, type='all'){
  if(type!=='all' && t.type!==type) return false
  if(!query.trim()) return true
  const q=normalize(query); const hay=normalize([t.id,t.name,t.description,t.type,t.subtype,...t.tags].join(' '))
  return q.split(/\s+/).every(w=>hay.includes(w))
}
