import {motion} from 'motion/react'
import type {ReactNode} from 'react'
import type {Template} from '../types'
export const EASE=[0.22,1,0.36,1] as const
export function Frame({children,t,variant}:{children:ReactNode;t:Template;variant?:string}){const vertical=['reel','story'].includes(t.type);return <div className={`premium premium--${vertical?'vertical':'landscape'} premium--${t.subtype} ${variant?`premiumFamily--${variant}`:''}`}><div className="premium__safe">{children}<div className="premium__meta"><span>{t.id}</span><span>{t.format}</span></div></div></div>}
export function Eyebrow({children}:{children:ReactNode}){return <motion.div className="premium__eyebrow" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{duration:.35,ease:EASE}}>{children}</motion.div>}
export function Title({children}:{children:ReactNode}){return <motion.div className="premium__headline" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.58,ease:EASE}}>{children}</motion.div>}
