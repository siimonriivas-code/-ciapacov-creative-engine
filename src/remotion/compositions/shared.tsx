import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import type { ReactNode } from 'react'
export type VideoBrand={surface:string;ink:string;primary:string;secondary:string;accent:string;line:string;surfaceAlt?:string;muted?:string;fontFamily?:string}
export const ease=Easing.bezier(.16,1,.3,1)
export const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const}
export function PersistentChrome({brand,label='CREATIVE ENGINE'}:{brand:VideoBrand;label?:string}){
  const frame=useCurrentFrame();const {fps}=useVideoConfig();const y=interpolate(frame,[0,.6*fps],[18,0],{...clamp,easing:ease});const opacity=interpolate(frame,[0,.45*fps],[0,1],clamp);const muted=brand.muted??brand.ink
  return <>
    <div style={{position:'absolute',top:74,left:78,right:78,height:18,display:'flex',alignItems:'center',gap:10,translate:`0 ${y}px`,opacity,pointerEvents:'none'}}>
      <span style={{display:'block',width:70,height:6,background:brand.accent,borderRadius:999}}/>
      <span style={{display:'block',height:1,flex:1,background:brand.line}}/>
      <span style={{padding:'5px 8px',border:`1px solid ${brand.line}`,borderRadius:999,background:brand.surface,fontSize:10,fontWeight:900,letterSpacing:1.4,color:muted}}>DESIGN SYSTEM SLOT</span>
    </div>
    <div style={{position:'absolute',left:0,right:0,bottom:0,height:118,background:brand.surface,borderTop:`1px solid ${brand.line}`,display:'grid',gridTemplateColumns:'1fr auto',alignItems:'center',gap:24,padding:'0 78px',color:muted,pointerEvents:'none'}}>
      <span style={{display:'flex',alignItems:'center',gap:12,fontSize:11,fontWeight:900,letterSpacing:1.8}}><i style={{display:'block',width:7,height:7,borderRadius:'50%',background:brand.accent}}/>IDENTIDAD DESDE EL DESIGN SYSTEM ACTIVO</span>
      <span style={{fontSize:11,fontWeight:850,letterSpacing:1.6,color:brand.ink}}>{label}</span>
    </div>
  </>
}
export function SafeFrame({children,brand}:{children:ReactNode;brand:VideoBrand}){return <AbsoluteFill style={{background:brand.surface,color:brand.ink,fontFamily:brand.fontFamily??'Arial, sans-serif'}}><div style={{position:'absolute',inset:'180px 88px 210px 88px'}}>{children}</div></AbsoluteFill>}
