import type {MediaMatch,MediaPlan,MediaRecord,MediaRole,ProductionMaster} from '../types'

const norm=(s:string)=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
const overlap=(need:string[],have:string[])=>{const set=new Set(have.map(norm));return need.filter(x=>set.has(norm(x))).length}

export function scoreMediaForRole(role:MediaRole,media:MediaRecord,domain?:string):MediaMatch{
  const reasons:string[]=[]
  if(media.status==='blocked')return {role,media:null,score:0,state:'missing',reasons:['asset bloqueado']}
  if(role.realOnly&&media.status==='demo')return {role,media:null,score:0,state:'missing',reasons:['el rol exige evidencia real']}
  if(!role.allowDemo&&media.status==='demo')return {role,media:null,score:0,state:'missing',reasons:['demo no permitido en producción']}
  if(!role.kinds.includes(media.kind))return {role,media:null,score:0,state:'missing',reasons:['tipo incompatible']}
  if(role.id==='MEDIA-ROLE-TESTIMONIAL'&&media.consent!=='verified')return {role,media:null,score:0,state:'missing',reasons:['testimonio sin consentimiento verificado']}
  if(role.id==='MEDIA-ROLE-VOICE'&&media.consent==='unknown')return {role,media:null,score:0,state:'missing',reasons:['estado de consentimiento de voz sin resolver']}
  const required=overlap(role.requiredTags,media.tags)
  if(required<role.requiredTags.length)return {role,media:null,score:0,state:'missing',reasons:['faltan tags obligatorios']}
  let score=50
  reasons.push('tipo y tags obligatorios compatibles')
  if(role.orientation==='any'||media.orientation==='any'||role.orientation===media.orientation){score+=12;reasons.push('orientación compatible')}
  const pref=overlap(role.preferredTags,media.tags);score+=Math.min(18,pref*6);if(pref)reasons.push(`${pref} preferencia(s) coinciden`)
  if(domain&&media.domains.includes(domain)){score+=12;reasons.push('dominio coincide')}
  if(media.consent==='verified'){score+=4;reasons.push('consentimiento verificado')}
  if(media.status==='approved'){score+=8;reasons.push('media aprobado')}
  const state=media.status==='approved'?'ready':'review'
  return {role,media,score:Math.min(100,score),state,reasons}
}

export function bestMediaForRole(role:MediaRole,library:MediaRecord[],domain?:string):MediaMatch{
  const ranked=library.map(m=>scoreMediaForRole(role,m,domain)).filter(x=>x.media).sort((a,b)=>b.score-a.score)
  return ranked[0]||{role,media:null,score:0,state:'missing',reasons:['no hay media compatible en la biblioteca verificada']}
}

export function buildMediaPlan(pm:ProductionMaster,roles:MediaRole[],library:MediaRecord[],domain?:string):MediaPlan{
  const byId=new Map(roles.map(r=>[r.id,r]))
  const resolve=(ids:string[])=>ids.map(id=>byId.get(id)).filter(Boolean).map(r=>bestMediaForRole(r as MediaRole,library,domain))
  const required=resolve(pm.requiredMediaRoles)
  const recommended=resolve(pm.recommendedMediaRoles)
  const requiredReady=required.filter(x=>x.state==='ready').length
  const recommendedReady=recommended.filter(x=>x.state==='ready').length
  const requiredScore=required.length?requiredReady/required.length:1
  const recommendedScore=recommended.length?recommendedReady/recommended.length:1
  const readiness=Math.round(requiredScore*80+recommendedScore*20)
  const blockers=required.filter(x=>x.state!=='ready').map(x=>`${x.role.name}: ${x.reasons[0]||'media pendiente'}`)
  return {required,recommended,readiness,blockers}
}

export function mediaLibrarySummary(library:MediaRecord[]){
  const approved=library.filter(x=>x.status==='approved').length
  const review=library.filter(x=>x.status==='review').length
  const blocked=library.filter(x=>x.status==='blocked').length
  const demo=library.filter(x=>x.status==='demo').length
  return {total:library.length,approved,review,blocked,demo}
}
