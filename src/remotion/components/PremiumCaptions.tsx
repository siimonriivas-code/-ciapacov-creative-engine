import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion'
import type {VideoBrand} from '../compositions/shared'

export type PremiumCaptionSystemId='CAP-EDITORIAL-LOWER'|'CAP-DOCUMENTARY'|'CAP-QUIET'|'CAP-TECH-RAIL'|'CAP-KINETIC-EMPHASIS'|'CAP-ACCESSIBLE-HC'
export type CaptionCue={text:string;startMs:number;endMs:number}
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const}

export function PremiumCaptions({captions,systemId,brand}:{captions:CaptionCue[];systemId:PremiumCaptionSystemId;brand:VideoBrand}){
 const frame=useCurrentFrame();const{fps}=useVideoConfig();const ms=frame/fps*1000;const cue=captions.find(c=>ms>=c.startMs&&ms<c.endMs)
 if(!cue)return null
 const start=cue.startMs/1000*fps,end=cue.endMs/1000*fps;const intro=interpolate(frame,[start,start+.25*fps],[0,1],clamp);const outro=interpolate(frame,[end-.2*fps,end],[1,0],clamp);const opacity=Math.min(intro,outro);const y=interpolate(intro,[0,1],[10,0],clamp)
 const common={position:'absolute' as const,zIndex:90,color:brand.ink,opacity,fontFamily:brand.fontFamily??'Arial, sans-serif'}
 if(systemId==='CAP-EDITORIAL-LOWER')return <div style={{...common,left:96,right:160,bottom:300,transform:`translateY(${y}px)`}}><div style={{display:'inline-block',background:brand.surface,borderLeft:`8px solid ${brand.accent}`,padding:'18px 22px',fontSize:34,lineHeight:1.12,fontWeight:830,boxShadow:'0 12px 35px rgba(0,0,0,.08)'}}>{cue.text}</div></div>
 if(systemId==='CAP-DOCUMENTARY')return <div style={{...common,left:96,right:96,bottom:300,transform:`translateY(${y}px)`,textAlign:'left'}}><span style={{display:'inline',background:`color-mix(in srgb, ${brand.ink} 86%, transparent)`,color:brand.surface,padding:'7px 12px',boxDecorationBreak:'clone',WebkitBoxDecorationBreak:'clone',fontSize:31,lineHeight:1.38,fontWeight:730}}>{cue.text}</span></div>
 if(systemId==='CAP-QUIET')return <div style={{...common,left:150,right:150,bottom:320,textAlign:'center',color:brand.ink}}><div style={{display:'inline-block',padding:'14px 18px',background:`color-mix(in srgb, ${brand.surface} 92%, transparent)`,borderTop:`1px solid ${brand.line}`,fontSize:30,lineHeight:1.25,fontWeight:700}}>{cue.text}</div></div>
 if(systemId==='CAP-TECH-RAIL')return <div style={{...common,left:92,right:160,bottom:286,display:'grid',gridTemplateColumns:'12px 1fr',gap:16,alignItems:'stretch',transform:`translateY(${y}px)`}}><div style={{background:brand.accent}}/><div style={{background:brand.surface,border:`1px solid ${brand.line}`,padding:'16px 20px',fontSize:29,lineHeight:1.2,fontWeight:760}}><span style={{display:'block',fontSize:11,letterSpacing:2.4,color:brand.accent,fontWeight:900,marginBottom:8}}>SUBTÍTULO</span>{cue.text}</div></div>
 if(systemId==='CAP-KINETIC-EMPHASIS')return <div style={{...common,left:110,right:110,bottom:300,textAlign:'center',transform:`translateY(${y}px) scale(${.97+intro*.03})`}}><div style={{fontSize:38,lineHeight:1.05,fontWeight:900,letterSpacing:-1.2,color:brand.ink,textShadow:`0 2px 0 ${brand.surface}`}}>{cue.text}</div><div style={{width:`${interpolate(intro,[0,1],[12,58],clamp)}%`,height:5,background:brand.accent,margin:'14px auto 0'}}/></div>
 return <div style={{...common,left:86,right:86,bottom:286,transform:`translateY(${y}px)`}}><div style={{background:brand.ink,color:brand.surface,padding:'18px 22px',fontSize:31,lineHeight:1.22,fontWeight:760,borderBottom:`6px solid ${brand.accent}`}}>{cue.text}</div></div>
}
