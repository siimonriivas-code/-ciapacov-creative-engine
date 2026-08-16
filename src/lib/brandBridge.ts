import type {BrandBridge,CreativeBrief} from '../types'
import type {BrandContract} from '../brand/contract'

const norm=(s:string)=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
const css=(token:{cssVar:string;fallback:string})=>`var(${token.cssVar}, ${token.fallback})`

export function suggestBrandBridge(brief:CreativeBrief|string,bridges:BrandBridge[]){
  const text=norm(typeof brief==='string'?brief:[brief.topic,brief.objective||'',...(brief.materials||[])].join(' '))
  const ranked=bridges.map(bridge=>({bridge,score:bridge.keywords.reduce((n,k)=>n+(text.includes(norm(k))?1:0),0)})).sort((a,b)=>b.score-a.score)
  return ranked[0]?.score?ranked[0].bridge:bridges.find(x=>x.id==='BRIDGE-GENERIC')||bridges[0]||null
}

export function bridgeToBrandContract(bridge:BrandBridge):BrandContract{
  return {
    primary:css(bridge.tokens.primary),secondary:css(bridge.tokens.secondary),accent:css(bridge.tokens.accent),
    surface:css(bridge.tokens.surface),surfaceAlt:css(bridge.tokens.surfaceAlt),ink:css(bridge.tokens.ink),
    muted:css(bridge.tokens.muted),line:css(bridge.tokens.line),fontFamily:css(bridge.tokens.fontFamily),radiusUi:'8px'
  }
}

export function bridgePrompt(bridge:BrandBridge){
  const preferred=bridge.contentRules.preferredTerms.length?bridge.contentRules.preferredTerms.map(x=>`- preferir: ${x}`).join('\n'):'- sin términos específicos'
  const forbidden=bridge.contentRules.forbiddenTerms.length?bridge.contentRules.forbiddenTerms.map(x=>`- prohibido: ${x}`).join('\n'):'- sin términos específicos'
  const motion=bridge.motionRules.map(x=>`- ${x}`).join('\n')
  return `Brand Bridge: ${bridge.id} · ${bridge.name}\nDesign System: ${bridge.designSystem}\nAutoridad de identidad: ${bridge.governance.identityAuthority}\nNo empaquetar logos oficiales: ${bridge.governance.bundleOfficialAssets?'sí':'no'}\nNo empaquetar fuentes: ${bridge.governance.bundleFonts?'sí':'no'}\n\nLenguaje:\n${preferred}\n${forbidden}\n\nMotion:\n${motion}`
}

export function forbiddenBrandTerms(text:string,bridge:BrandBridge){
  const n=norm(text)
  return bridge.contentRules.forbiddenTerms.filter(term=>n.includes(norm(term)))
}
