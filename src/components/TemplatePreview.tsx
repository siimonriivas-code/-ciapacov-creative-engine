import { motion } from 'motion/react'
import type { Template } from '../types'

export function TemplatePreview({template:t}:{template:Template}){
  const route=t.route
  const data=t.data
  return <div className={`preview preview--${t.type}`}>
    <div className="preview__safe">
      <motion.div className="preview__eyebrow" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}>CREATIVE ENGINE</motion.div>
      <motion.div className="preview__title" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.45}}>{t.name}</motion.div>
      {data && <motion.div className="preview__stat" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{delay:.12}}>00</motion.div>}
      {route ? <RouteSketch/> : <GraphicSketch/>}
      <div className="preview__footer"><span>{t.format}</span><span>{t.id}</span></div>
    </div>
  </div>
}
function RouteSketch(){return <svg className="preview__route" viewBox="0 0 300 110"><motion.path d="M8 88 C72 12 120 122 190 45 S265 28 292 10" fill="none" stroke="var(--ce-primary)" strokeWidth="5" strokeLinecap="round" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.5}}/><circle cx="8" cy="88" r="7" fill="var(--ce-accent)"/><circle cx="292" cy="10" r="7" fill="var(--ce-accent)"/></svg>}
function GraphicSketch(){return <div className="preview__graphic"><motion.i initial={{x:30,opacity:0}} animate={{x:0,opacity:1}}/><motion.i initial={{scale:.7,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:.12}}/><motion.i initial={{y:18,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.2}}/></div>}
