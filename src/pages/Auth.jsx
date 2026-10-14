import { cx } from '../styles/ui.js'
import { btn } from '../components/ui/button.js'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import Logo from '../components/Logo.jsx'
export default function Auth({ mode }){
  const signup = mode==='signup'; const nav = useNavigate()
  const [v,setV]=useState({name:'',email:'',password:''}); const [err,setErr]=useState({}); const [show,setShow]=useState(false)
  const submit = e => { e.preventDefault(); const er={}
    if (signup && v.name.trim().length<2) er.name='Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) er.email='Please enter a valid email address.'
    if (v.password.length<8) er.password='Password must be at least 8 characters.'
    setErr(er); if (!Object.keys(er).length) nav('/app') }
  return (
    <div className={cx('auth')}>
      <div className={cx('auth-form')}>
        <Logo/>
        <motion.div className={cx('auth-in')} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6,ease:[.22,1,.36,1]}}>
          <h1>{signup?'Create your account':'Welcome back'}</h1>
          <p className={cx('lead')}>{signup?'Start syncing supplier inventory with your Shopify store.':'Log in to review and sync your inventory.'}</p>
          <form onSubmit={submit} noValidate>
            {signup && <div className={cx(`field ${err.name?'has-err':''}`)}><label htmlFor="n">Full name</label><input id="n" autoComplete="name" value={v.name} onChange={e=>setV({...v,name:e.target.value})}/>{err.name&&<p className={cx('err')} role="alert">{err.name}</p>}</div>}
            <div className={cx(`field ${err.email?'has-err':''}`)}><label htmlFor="e">Email</label><input id="e" type="email" autoComplete="email" value={v.email} onChange={e=>setV({...v,email:e.target.value})}/>{err.email&&<p className={cx('err')} role="alert">{err.email}</p>}</div>
            <div className={cx(`field ${err.password?'has-err':''}`)}><label htmlFor="p">Password</label>
              <div className={cx('pw')}><input id="p" type={show?'text':'password'} autoComplete={signup?'new-password':'current-password'} value={v.password} onChange={e=>setV({...v,password:e.target.value})}/><button type="button" onClick={()=>setShow(s=>!s)} aria-label={show?'Hide password':'Show password'}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></div>
              {err.password&&<p className={cx('err')} role="alert">{err.password}</p>}</div>
            <button className={cx(btn('primary','md', 'w-full'))} type="submit">{signup?'Get Started Free':'Log In'} <ArrowRight size={18} className={cx('arrow')}/></button>
          </form>
          <p className={cx('auth-switch')}>{signup?<>Already have an account? <Link to="/login">Log in</Link></>:<>New to StockSync Pro? <Link to="/signup">Create an account</Link></>}</p>
          <p className={cx('note')}>Demo UI — any valid email and 8+ character password opens the dashboard preview.</p>
        </motion.div>
      </div>
      <aside className={cx('auth-art')} aria-hidden="true">
        <div className={cx('auth-quote')}>
          <h2>Less Manual Work. Better Inventory Control. More Time to Grow.</h2>
          {['Upload CSV or Excel supplier files','Review every change before it syncs','Track every update in sync history'].map(t=> <p key={t}><CheckCircle2 size={18}/>{t}</p>)}
        </div>
      </aside>
    </div>
  )
}
