import { btn } from './ui/button.js'
import { useState, createContext, useContext } from 'react'
export const TopLevel = createContext(false)
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Plus, ShieldCheck, Clock, Mail, AlertTriangle, CalendarClock, FileSpreadsheet, ArrowLeftRight, Sparkles, TrendingDown, XCircle, Copy } from 'lucide-react'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'
import HeroMockup from './HeroMockup.jsx'
import * as C from '../data/content.js'

const Bullets = ({ items }) => (
  <ul className="list">{items.map((b,i)=> <Reveal as="li" key={b} delay={i*.06} y={12}><span className="check"><Check size={13} strokeWidth={3}/></span><span>{b}</span></Reveal>)}</ul>
)
const Head = ({ eyebrow, title, lead, center }) => { const top = useContext(TopLevel); const H = top?'h1':'h2'; return (
  <div className={`sec-head ${center?'center':''}`}>
    {eyebrow && <Reveal><span className="eyebrow">{eyebrow}</span></Reveal>}
    <Reveal delay={.05}><H className="h2">{title}</H></Reveal>
    {lead && <Reveal delay={.1}><p className="lead">{lead}</p></Reveal>}
  </div>
)}

export function Hero(){
  const words = 'Stop Updating Inventory Manually.'.split(' ')
  return (
    <section className="hero">
      <div className="hero-bg grid-bg" aria-hidden="true"/>
      <div className="hero-orb" aria-hidden="true"/>
      <div className="wrap hero-in">
        <div className="hero-copy">
          <Reveal><span className="eyebrow">Shopify inventory sync</span></Reveal>
          <h1 className="hero-h1">
            {words.map((w,i)=> <motion.span key={i} className="w" initial={{opacity:0,y:'60%'}} animate={{opacity:1,y:0}} transition={{delay:.1+i*.07,duration:.8,ease:[.22,1,.36,1]}}>{w} </motion.span>)}
            <motion.span className="accent" style={{display:'inline'}} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.5,duration:.9}}>Let StockSync Pro Do the Work.</motion.span>
          </h1>
          <Reveal delay={.3}><p className="hero-sub">Sync supplier inventory with your Shopify store in minutes. Upload CSV or Excel files, match SKUs, update stock and prices, and keep your product catalog accurate without the manual work.</p></Reveal>
          <Reveal delay={.4} className="hero-ctas">
            <Link to="/signup" className={btn('primary','md')}>Get Started Free <ArrowRight size={18} className="arrow"/></Link>
            <Link to="/features" className={btn('ghost','md')}>Explore Features</Link>
          </Reveal>
          <Reveal delay={.5}><p className="hero-trust"><ShieldCheck size={18}/>Smarter inventory management for growing Shopify businesses.</p></Reveal>
        </div>
        <div className="hero-visual"><HeroMockup/></div>
      </div>
    </section>
  )
}

export function Problem(){
  return (
    <section className="section problem" id="problem">
      <div className="wrap split">
        <div>
          <Head eyebrow="The problem" title="Inventory Management Shouldn't Slow Down Your Business"/>
          <Reveal><p className="body-lg">Managing inventory through spreadsheets can waste valuable time and lead to costly mistakes. Outdated stock levels, mismatched SKUs, incorrect prices, and manual updates can affect your store's performance.</p></Reveal>
          <Reveal delay={.08}><p className="body-lg strong"><b>StockSync Pro</b> simplifies the process by turning supplier files into organized, reviewable inventory updates.</p></Reveal>
        </div>
        <div className="problem-side">
          <Reveal className="chaos card" aria-hidden="true">
            <div className="chaos-h"><FileSpreadsheet size={16}/>supplier_stock_final_v7.xlsx</div>
            {[['SPK-001','14','$24.00',''],['SPK-0O2','—','$31.5O','err'],['SPK-003','-3','$12.00','err'],['SPK-001','14','$24.00','dup'],['SPK-005','8','$19.99','']].map((r,i)=> <div key={i} className={`chaos-r ${r[3]}`}><span>{r[0]}</span><span>{r[1]}</span><span>{r[2]}</span>{r[3]==='err'?<XCircle size={14}/>:r[3]==='dup'?<Copy size={14}/>:<span/>}</div>)}
          </Reveal>
          <div className="card problem-list"><Bullets items={C.problemBullets}/></div>
        </div>
      </div>
    </section>
  )
}

export function Solution(){
  return (
    <section className="section solution" id="solution">
      <div className="wrap split rev">
        <div className="timeline">
          <motion.span className="tl-line" initial={{scaleY:0}} whileInView={{scaleY:1}} viewport={{once:true,margin:'-100px'}} transition={{duration:1.4,ease:[.22,1,.36,1]}}/>
          {C.solutionSteps.map((s,i)=> (
            <Reveal key={s} delay={i*.1} x={-20} y={0} className="tl-item"><span className="tl-n">{String(i+1).padStart(2,'0')}</span><p>{s}</p></Reveal>
          ))}
        </div>
        <div>
          <Head eyebrow="The solution" title="From Supplier Spreadsheet to Shopify in Minutes" lead="StockSync Pro creates a straightforward workflow for managing supplier inventory."/>
          <Reveal delay={.15}><Link to="/how-it-works" className={btn('brand','md')}>See How It Works <ArrowRight size={18} className="arrow"/></Link></Reveal>
        </div>
      </div>
    </section>
  )
}

export function Features({ head=true }){
  return (
    <section className="section features" id="features">
      <div className="wrap">
        {head && <Head center eyebrow="Features" title="Everything You Need to Manage Inventory Smarter"/>}
        <div className="feat-grid">
          {C.features.map((f,i)=> (
            <Reveal key={f.title} delay={(i%3)*.08} className={`feat card tone-${f.tone}`}>
              <div className="feat-ic"><Icon name={f.icon} size={22}/></div>
              <h3>{f.title}</h3><p>{f.text}</p>
              <span className="feat-num" aria-hidden="true">0{i+1}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HowItWorks(){
  return (
    <section className="section how" id="how-it-works">
      <div className="wrap">
        <Head center eyebrow="How it works" title="Three Simple Steps to Better Inventory Management"/>
        <div className="how-grid">
          {C.steps.map((s,i)=> (
            <Reveal key={s.title} delay={i*.12} className="how-step">
              <div className="how-ic"><Icon name={s.icon} size={28}/><span>{i+1}</span></div>
              <p className="how-k">Step {i+1}</p>
              <h3>{s.title}</h3><p>{s.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="center-cta"><Link to="/signup" className={btn('primary','md')}>Start Your First Sync <ArrowRight size={18} className="arrow"/></Link></Reveal>
      </div>
    </section>
  )
}

export function DashboardPreview(){
  const stats=[['Total Products','1,248','tracked'],['Low Stock','104','need attention'],['Out of Stock','48','action required'],['Pending Changes','37','awaiting review']]
  return (
    <section className="section dprev" id="dashboard">
      <div className="wrap">
        <div className="dprev-grid">
          <div>
            <Head eyebrow="Dashboard preview" title="Your Entire Inventory Workflow at a Glance" lead="Manage your inventory from a clean, easy-to-understand dashboard."/>
            <div className="dprev-items">{C.dashItems.map((d,i)=> <Reveal key={d} delay={i*.05} y={10} className="dprev-item"><Check size={16}/>{d}</Reveal>)}</div>
            <Reveal><p className="dprev-support">Find the information you need without searching through multiple spreadsheets.</p></Reveal>
          </div>
          <Reveal className="dprev-mock" y={40} aria-label="Product preview of the StockSync Pro dashboard" role="img">
            <div className="dm-stats">{stats.map(([k,v,s],i)=> <div key={k} className="dm-stat"><span>{k}</span><b>{v}</b><small className={`t${i}`}>{s}</small></div>)}</div>
            <div className="dm-row">
              <div className="dm-chart">
                <span className="dm-l">Updates this week</span>
                <div className="bars">{[48,64,52,82,73,38,56].map((h,i)=> <motion.i key={i} initial={{height:0}} whileInView={{height:`${h}%`}} viewport={{once:true}} transition={{delay:.3+i*.06,duration:.8,ease:[.22,1,.36,1]}}/>)}</div>
              </div>
              <div className="dm-sync"><span className="dm-l">Last Sync</span><b><span className="dot"/>Success</b><small>2 hours ago · 124 updated</small><Link to="/app" className={btn('light','sm')}>Open Dashboard</Link></div>
            </div>
            <div className="dm-act">
              {[['Supplier import · Northline Wholesale','412 rows · 2m ago'],['Price update · Coastal Goods Co.','18 changes · 26m ago']].map(([a,b])=> <div key={a}><span className="dot"/><p>{a}</p><small>{b}</small></div>)}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Suppliers(){
  const map=[['Item Code','SKU'],['On Hand','Quantity'],['Unit Cost','Price']]
  return (
    <section className="section sup" id="suppliers">
      <div className="wrap split">
        <div>
          <Head eyebrow="Supplier management" title="Keep Every Supplier Organized" lead="Different suppliers use different spreadsheets. StockSync Pro helps you manage those differences with reusable column mappings and supplier-specific settings."/>
          <Bullets items={C.supplierBullets}/>
          <Reveal className="mt"><Link to="/app/suppliers" className={btn('primary','md')}>Organize Your Suppliers <ArrowRight size={18} className="arrow"/></Link></Reveal>
        </div>
        <Reveal className="map card" y={36}>
          <div className="map-h"><div><b>Northline Wholesale</b><small>northline_stock.csv</small></div><span className="pill matched">Mapping saved</span></div>
          <div className="map-cols"><small>Supplier column</small><span/><small>StockSync field</small></div>
          {map.map(([a,b],i)=> (
            <motion.div key={a} className="map-r" initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.2+i*.12}}>
              <span className="chip">{a}</span><ArrowLeftRight size={16}/><span className="chip brand">{b}</span>
            </motion.div>
          ))}
          <div className="map-foot"><Sparkles size={14}/>Reused automatically on the next import</div>
        </Reveal>
      </div>
    </section>
  )
}

export function Safety(){
  return (
    <section className="section safety" id="safety">
      <div className="wrap split rev">
        <Reveal className="diff card" y={36}>
          <div className="diff-h"><ShieldCheck size={18}/>Review before sync</div>
          {[['SPK-002','Qty 3 → 24','ok'],['SPK-005','Price $48 → $44','warn'],['NL-88213','No Shopify match','err'],['SPK-1082','Duplicate SKU','err'],['SPK-1075','Invalid quantity (-2)','err']].map(([s,t,k],i)=> (
            <motion.div key={s+t} className={`diff-r ${k}`} initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:.15+i*.08}}>
              <code>{s}</code><span>{t}</span><i>{k==='ok'?'Ready':k==='warn'?'Review':'Flagged'}</i>
            </motion.div>
          ))}
        </Reveal>
        <div>
          <Head eyebrow="Accuracy & safety" title="Review First. Sync With Confidence." lead="Inventory changes should never feel like guesswork. StockSync Pro is designed around a review-before-sync workflow."/>
          <Bullets items={C.safetyBullets}/>
          <Reveal><p className="callout"><ShieldCheck size={18}/>You stay in control of what changes in your Shopify store.</p></Reveal>
        </div>
      </div>
    </section>
  )
}

export function Automation(){
  const ic=[CalendarClock,TrendingDown,AlertTriangle,Mail,Clock]
  return (
    <section className="section auto" id="automation">
      <div className="wrap">
        <div className="auto-box">
          <div className="auto-copy">
            <Head eyebrow="Automation" title="Spend Less Time on Repetitive Inventory Tasks" lead="Move beyond manual file uploads as your workflow grows."/>
            <Reveal><p className="auto-p">With supported supplier formats and properly configured integrations, you can schedule recurring synchronization, receive email notifications, and monitor inventory updates automatically.</p></Reveal>
            <Reveal className="mt"><Link to="/automation" className={btn('light','md')}>Explore Automation <ArrowRight size={18} className="arrow"/></Link></Reveal>
            <p className="auto-note">Scheduled syncing requires supported data sources and appropriate Shopify API permissions.</p>
          </div>
          <div className="auto-list">
            {C.automation.map((a,i)=>{ const I=ic[i]; return <Reveal key={a} delay={i*.07} x={24} y={0} className="auto-item"><span><I size={18}/></span>{a}</Reveal> })}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Pricing({ head=true }){
  return (
    <section className="section pricing" id="pricing">
      <div className="wrap">
        {head && <Head center eyebrow="Pricing" title="Choose a Plan That Fits Your Store"/>}
        <div className="price-grid">
          {C.plans.map((p,i)=> (
            <Reveal key={p.name} delay={i*.1} className={`plan card ${p.popular?'pop':''}`}>
              {p.popular && <span className="pop-badge">Most Popular</span>}
              <h3>{p.name}</h3><p className="plan-sub">{p.sub}</p>
              <div className="plan-price">Pricing coming soon</div>
              <ul className="list">{p.items.map(it=> <li key={it}><span className="check"><Check size={13} strokeWidth={3}/></span>{it}</li>)}</ul>
              <Link to="/signup" className={btn(p.popular?'brand':'ghost','md','w-full')}>Get Started</Link>
            </Reveal>
          ))}
        </div>
        <p className="note center">Pricing and usage limits will be announced once plans are finalized.</p>
      </div>
    </section>
  )
}

export function Faq({ head=true }){
  const [open,setOpen]=useState(0)
  return (
    <section className="section faq" id="faq">
      <div className="wrap faq-wrap">
        {head && <Head eyebrow="FAQ" title="Frequently Asked Questions" lead="Everything you need to know about StockSync Pro."/>}
        <div className="faq-list">
          {C.faqs.map(([q,a],i)=>{ const on=open===i; return (
            <Reveal key={q} delay={i*.04} y={14} className={`faq-item ${on?'on':''}`}>
              <h3><button aria-expanded={on} aria-controls={`faq-${i}`} id={`faq-b-${i}`} onClick={()=>setOpen(on?-1:i)}>{q}<span className="faq-ic"><Plus size={18}/></span></button></h3>
              <AnimatePresence initial={false}>{on && (
                <motion.div id={`faq-${i}`} role="region" aria-labelledby={`faq-b-${i}`} initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.4,ease:[.22,1,.36,1]}} style={{overflow:'hidden'}}>
                  <p className="faq-a">{a}</p>
                </motion.div>)}
              </AnimatePresence>
            </Reveal>) })}
        </div>
      </div>
    </section>
  )
}

export function FinalCta(){
  const top = useContext(TopLevel); const H = top?'h1':'h2'
  return (
    <section className="final">
      <div className="wrap">
        <Reveal className="final-box">
          <div className="final-orb" aria-hidden="true"/>
          <H>Ready to Simplify Your Shopify Inventory?</H>
          <p>Stop spending unnecessary time updating spreadsheets and checking stock manually. Bring supplier data, product matching, and inventory updates into one organized workflow.</p>
          <div className="final-ctas">
            <Link to="/signup" className={btn('brand','md')}>Get Started Free <ArrowRight size={18} className="arrow"/></Link>
            <Link to="/features" className={btn('outlineLight','md')}>View Features</Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function PageHero({ eyebrow, title, lead }){
  return (
    <section className="phero">
      <div className="hero-bg grid-bg" aria-hidden="true"/>
      <div className="wrap phero-in">
        <Reveal><span className="eyebrow">{eyebrow}</span></Reveal>
        <Reveal delay={.06}><h1>{title}</h1></Reveal>
        {lead && <Reveal delay={.12}><p className="lead">{lead}</p></Reveal>}
      </div>
    </section>
  )
}
