import { cx } from '../styles/ui.js'
import { btn } from './ui/button.js'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import { menus } from '../data/site.js'
export default function Navbar(){
  const [scrolled,setScrolled]=useState(false); const [open,setOpen]=useState(false); const [mega,setMega]=useState(null); const [acc,setAcc]=useState(null)
  const { pathname, hash } = useLocation(); const timer = useRef()
  useEffect(()=>{ const f=()=>setScrolled(window.scrollY>12); f(); window.addEventListener('scroll',f,{passive:true}); return ()=>window.removeEventListener('scroll',f) },[])
  useEffect(()=>{ setOpen(false); setMega(null) },[pathname,hash])
  useEffect(()=>{ document.body.style.overflow = open?'hidden':''; const k=e=>{ if(e.key==='Escape'){ setOpen(false); setMega(null) } }; window.addEventListener('keydown',k); return ()=>window.removeEventListener('keydown',k) },[open])
  const enter = l => { clearTimeout(timer.current); setMega(l) }
  const leave = () => { timer.current = setTimeout(()=>setMega(null),140) }
  return (
    <header className={cx(`nav ${scrolled||mega?'is-scrolled':''}`)}>
      <div className={cx('wrap nav-in')}>
        <Logo/>
        <nav className={cx('nav-links')} aria-label="Primary">
          {menus.map(m=> (
            <div key={m.label} className={cx('dd')} onMouseEnter={()=>enter(m.label)} onMouseLeave={leave}>
              <button className={cx(`nav-link ${mega===m.label?'active':''}`)} aria-expanded={mega===m.label} aria-haspopup="true" onClick={()=>setMega(mega===m.label?null:m.label)}>{m.label}<ChevronDown size={15} className={cx('dd-chev')}/></button>
              <AnimatePresence>{mega===m.label && (
                <motion.div className={cx(`mega ${m.items.length>5?'two':''}`)} initial={{opacity:0,y:10,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:6,scale:.98}} transition={{duration:.22,ease:[.22,1,.36,1]}}>
                  {m.items.map(([h,l,d,ic])=> <Link key={h} to={h} className={cx('mega-item')}><span className={cx('mi-ic')}><Icon name={ic} size={18}/></span><span><b>{l}</b><small>{d}</small></span></Link>)}
                </motion.div>)}
              </AnimatePresence>
            </div>
          ))}
          <NavLink to="/pricing" className={cx(({isActive})=>`nav-link ${isActive?'active':''}`)}>Pricing</NavLink>
        </nav>
        <div className={cx('nav-cta')}>
          <Link to="/login" className={cx('nav-login')}>Log In</Link>
          <Link to="/get-started" className={cx(btn('primary','sm'))}>Get Started Free <ArrowRight size={16} className={cx('arrow')}/></Link>
          <button className={cx('burger')} aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(o=>!o)}>{open?<X size={22}/>:<Menu size={22}/>}</button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className={cx('mnav')} initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.3,ease:[.22,1,.36,1]}}>
            <nav aria-label="Mobile">
              {menus.map(m=> (
                <div key={m.label}>
                  <button className={cx('mnav-link')} aria-expanded={acc===m.label} onClick={()=>setAcc(acc===m.label?null:m.label)}>{m.label}<ChevronDown size={18} style={{transform:acc===m.label?'rotate(180deg)':'none',transition:'transform .3s'}}/></button>
                  <AnimatePresence initial={false}>{acc===m.label && (
                    <motion.div className={cx('mnav-sub')} initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} style={{overflow:'hidden'}}>
                      {m.items.map(([h,l,,ic])=> <Link key={h} to={h}><Icon name={ic} size={16}/>{l}</Link>)}
                    </motion.div>)}</AnimatePresence>
                </div>
              ))}
              <NavLink to="/pricing" className={cx('mnav-link')}>Pricing<ArrowRight size={18}/></NavLink>
              <NavLink to="/contact" className={cx('mnav-link')}>Contact<ArrowRight size={18}/></NavLink>
            </nav>
            <div className={cx('mnav-cta')}>
              <Link to="/login" className={cx(btn('ghost','md', 'w-full'))}>Log In</Link>
              <Link to="/get-started" className={cx(btn('primary','md', 'w-full'))}>Get Started Free</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
