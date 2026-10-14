import { cx } from '../styles/ui.js'
import { motion, useReducedMotion } from 'framer-motion'
export default function Reveal({ children, delay=0, y=28, x=0, as='div', className, style, ...rest }){
  const reduce = useReducedMotion()
  const M = motion[as]
  return (
    <M className={cx(className)} style={style} initial={reduce?false:{ opacity:0, y, x, filter:'blur(6px)' }} whileInView={{ opacity:1, y:0, x:0, filter:'blur(0px)' }} viewport={{ once:true, margin:'-60px' }} transition={{ duration:.8, delay, ease:[.22,1,.36,1] }} {...rest}>
      {children}
    </M>
  )
}
