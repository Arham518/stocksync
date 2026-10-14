import { cx } from '../styles/ui.js'
import { btn } from '../components/ui/button.js'
import { useState } from 'react'
import { Mail, MessageSquare, CheckCircle2, Send } from 'lucide-react'
import { PageHero } from '../components/Sections.jsx'
import Reveal from '../components/Reveal.jsx'
const init = { name:'', email:'', company:'', topic:'General question', message:'' }
export default function Contact(){
  const [v,setV]=useState(init); const [err,setErr]=useState({}); const [sent,setSent]=useState(false)
  const set = k => e => setV({...v,[k]:e.target.value})
  const submit = e => {
    e.preventDefault(); const er={}
    if (v.name.trim().length<2) er.name='Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) er.email='Please enter a valid email address.'
    if (v.message.trim().length<10) er.message='Please write at least 10 characters.'
    setErr(er); if (!Object.keys(er).length){ setSent(true); setV(init) }
  }
  const F = ({ id, label, children }) => (<div className={cx(`field ${err[id]?'has-err':''}`)}><label htmlFor={id}>{label}</label>{children}{err[id] && <p className={cx('err')} id={`${id}-err`} role="alert">{err[id]}</p>}</div>)
  return (<>
    <PageHero eyebrow="Contact" title="Let's Talk Inventory" lead="Questions about StockSync Pro, supplier formats or plans? Send a message and the team will get back to you."/>
    <section className={cx('section')} style={{paddingTop:40}}>
      <div className={cx('wrap contact-grid')}>
        <Reveal className={cx('contact-side')}>
          <div className={cx('card cs-card')}><Mail size={22}/><h3>Write to us</h3><p>Use the form to send a message about your store or suppliers.</p></div>
          <div className={cx('card cs-card')}><MessageSquare size={22}/><h3>Product questions</h3><p>Ask about CSV/Excel formats, SKU matching and Shopify permissions.</p></div>
        </Reveal>
        <Reveal className={cx('card form-card')} delay={.1}>
          {sent ? (
            <div className={cx('sent')} role="status"><CheckCircle2 size={44}/><h2>Message received</h2><p>Thanks for reaching out. This is a demo form, so nothing was sent to a server.</p><button className={cx(btn('ghost','md'))} onClick={()=>setSent(false)}>Send another</button></div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className={cx('row2')}>
                {F({id:'name',label:'Full name',children:<input id="name" value={v.name} onChange={set('name')} aria-invalid={!!err.name} autoComplete="name" placeholder="Jane Cooper"/>})}
                {F({id:'email',label:'Work email',children:<input id="email" type="email" value={v.email} onChange={set('email')} aria-invalid={!!err.email} autoComplete="email" placeholder="jane@store.com"/>})}
              </div>
              <div className={cx('row2')}>
                {F({id:'company',label:'Store / company (optional)',children:<input id="company" value={v.company} onChange={set('company')} placeholder="Your Shopify store"/>})}
                {F({id:'topic',label:'Topic',children:<select id="topic" value={v.topic} onChange={set('topic')}><option>General question</option><option>Pricing & plans</option><option>Supplier file formats</option><option>Partnership</option></select>})}
              </div>
              {F({id:'message',label:'Message',children:<textarea id="message" rows={6} value={v.message} onChange={set('message')} aria-invalid={!!err.message} placeholder="Tell us about your suppliers and catalog size…"/>})}
              <button className={cx(btn('primary','md'))} type="submit">Send Message <Send size={16} className={cx('arrow')}/></button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  </>)
}
