import { cx } from '../styles/ui.js'
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
  <ul className={cx('list')}>{items.map((b,i)=> <Reveal as="li" key={b} delay={i*.06} y={12}><span className={cx('check')}><Check size={13} strokeWidth={3}/></span><span>{b}</span></Reveal>)}</ul>
)
const Head = ({ eyebrow, title, lead, center }) => { const top = useContext(TopLevel); const H = top?'h1':'h2'; return (
  <div className={cx(`sec-head ${center?'center':''}`)}>
    {eyebrow && <Reveal><span className={cx('eyebrow')}>{eyebrow}</span></Reveal>}
    <Reveal delay={.05}><H className={cx('h2')}>{title}</H></Reveal>
    {lead && <Reveal delay={.1}><p className={cx('lead')}>{lead}</p></Reveal>}
  </div>
)}

export function Hero(){
  const words = 'Stop Updating Inventory Manually.'.split(' ')
  return (
    <section className={cx('hero')}>
      <div className={cx('hero-bg grid-bg')} aria-hidden="true"/>
      <div className={cx('hero-orb')} aria-hidden="true"/>
      <div className={cx('wrap hero-in')}>
        <div className={cx('hero-copy')}>
          <Reveal><span className={cx('eyebrow')}>Shopify inventory sync</span></Reveal>
          <h1 className={cx('hero-h1')}>
            {words.map((w,i)=> <motion.span key={i} className={cx('w')} initial={{opacity:0,y:'60%'}} animate={{opacity:1,y:0}} transition={{delay:.1+i*.07,duration:.8,ease:[.22,1,.36,1]}}>{w} </motion.span>)}
            <motion.span className={cx('accent')} style={{display:'inline'}} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.5,duration:.9}}>Let StockSync Pro Do the Work.</motion.span>
          </h1>
          <Reveal delay={.3}><p className={cx('hero-sub')}>Sync supplier inventory with your Shopify store in minutes. Upload CSV or Excel files, match SKUs, update stock and prices, and keep your product catalog accurate without the manual work.</p></Reveal>
          <Reveal delay={.4} className={cx('hero-ctas')}>
            <Link to="/signup" className={cx(btn('primary','md'))}>Get Started Free <ArrowRight size={18} className={cx('arrow')}/></Link>
            <Link to="/features" className={cx(btn('ghost','md'))}>Explore Features</Link>
          </Reveal>
          <Reveal delay={.5}><p className={cx('hero-trust')}><ShieldCheck size={18}/>Smarter inventory management for growing Shopify businesses.</p></Reveal>
        </div>
        <div className={cx('hero-visual')}><HeroMockup/></div>
      </div>
    </section>
  )
}

export function Problem(){
  return (
    <section className={cx('section problem')} id="problem">
      <div className={cx('wrap split')}>
        <div>
          <Head eyebrow="The problem" title="Inventory Management Shouldn't Slow Down Your Business"/>
          <Reveal><p className={cx('body-lg')}>Managing inventory through spreadsheets can waste valuable time and lead to costly mistakes. Outdated stock levels, mismatched SKUs, incorrect prices, and manual updates can affect your store's performance.</p></Reveal>
          <Reveal delay={.08}><p className={cx('body-lg strong')}><b>StockSync Pro</b> simplifies the process by turning supplier files into organized, reviewable inventory updates.</p></Reveal>
        </div>
        <div className={cx('problem-side')}>
          <Reveal className={cx('chaos card')} aria-hidden="true">
            <div className={cx('chaos-h')}><FileSpreadsheet size={16}/>supplier_stock_final_v7.xlsx</div>
            {[['SPK-001','14','$24.00',''],['SPK-0O2','—','$31.5O','err'],['SPK-003','-3','$12.00','err'],['SPK-001','14','$24.00','dup'],['SPK-005','8','$19.99','']].map((r,i)=> <div key={i} className={cx(`chaos-r ${r[3]}`)}><span>{r[0]}</span><span>{r[1]}</span><span>{r[2]}</span>{r[3]==='err'?<XCircle size={14}/>:r[3]==='dup'?<Copy size={14}/>:<span/>}</div>)}
          </Reveal>
          <div className={cx('card problem-list')}><Bullets items={C.problemBullets}/></div>
        </div>
      </div>
    </section>
  )
}

export function Solution(){
  return (
    <section className={cx('section solution')} id="solution">
      <div className={cx('wrap split rev')}>
        <div className={cx('timeline')}>
          <motion.span className={cx('tl-line')} initial={{scaleY:0}} whileInView={{scaleY:1}} viewport={{once:true,margin:'-100px'}} transition={{duration:1.4,ease:[.22,1,.36,1]}}/>
          {C.solutionSteps.map((s,i)=> (
            <Reveal key={s} delay={i*.1} x={-20} y={0} className={cx('tl-item')}><span className={cx('tl-n')}>{String(i+1).padStart(2,'0')}</span><p>{s}</p></Reveal>
          ))}
        </div>
        <div>
          <Head eyebrow="The solution" title="From Supplier Spreadsheet to Shopify in Minutes" lead="StockSync Pro creates a straightforward workflow for managing supplier inventory."/>
          <Reveal delay={.15}><Link to="/how-it-works" className={cx(btn('brand','md'))}>See How It Works <ArrowRight size={18} className={cx('arrow')}/></Link></Reveal>
        </div>
      </div>
    </section>
  )
}

export function Features({ head=true }){
  return (
    <section className={cx('section features')} id="features">
      <div className={cx('wrap')}>
        {head && <Head center eyebrow="Features" title="Everything You Need to Manage Inventory Smarter"/>}
        <div className={cx('feat-grid')}>
          {C.features.map((f,i)=> (
            <Reveal key={f.title} delay={(i%3)*.08} className={cx(`feat card tone-${f.tone}`)}>
              <div className={cx('feat-ic')}><Icon name={f.icon} size={22}/></div>
              <h3>{f.title}</h3><p>{f.text}</p>
              <span className={cx('feat-num')} aria-hidden="true">0{i+1}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HowItWorks(){
  return (
    <section className={cx('section how')} id="how-it-works">
      <div className={cx('wrap')}>
        <Head center eyebrow="How it works" title="Three Simple Steps to Better Inventory Management"/>
        <div className={cx('how-grid')}>
          {C.steps.map((s,i)=> (
            <Reveal key={s.title} delay={i*.12} className={cx('how-step')}>
              <div className={cx('how-ic')}><Icon name={s.icon} size={28}/><span>{i+1}</span></div>
              <p className={cx('how-k')}>Step {i+1}</p>
              <h3>{s.title}</h3><p>{s.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className={cx('center-cta')}><Link to="/signup" className={cx(btn('primary','md'))}>Start Your First Sync <ArrowRight size={18} className={cx('arrow')}/></Link></Reveal>
      </div>
    </section>
  )
}

export function DashboardPreview(){
  const stats=[['Total Products','1,248','tracked'],['Low Stock','104','need attention'],['Out of Stock','48','action required'],['Pending Changes','37','awaiting review']]
  return (
    <section className={cx('section dprev')} id="dashboard">
      <div className={cx('wrap')}>
        <div className={cx('dprev-grid')}>
          <div>
            <Head eyebrow="Dashboard preview" title="Your Entire Inventory Workflow at a Glance" lead="Manage your inventory from a clean, easy-to-understand dashboard."/>
            <div className={cx('dprev-items')}>{C.dashItems.map((d,i)=> <Reveal key={d} delay={i*.05} y={10} className={cx('dprev-item')}><Check size={16}/>{d}</Reveal>)}</div>
            <Reveal><p className={cx('dprev-support')}>Find the information you need without searching through multiple spreadsheets.</p></Reveal>
          </div>
          <Reveal className={cx('dprev-mock')} y={40} aria-label="Product preview of the StockSync Pro dashboard" role="img">
            <div className={cx('dm-stats')}>{stats.map(([k,v,s],i)=> <div key={k} className={cx('dm-stat')}><span>{k}</span><b>{v}</b><small className={cx(`t${i}`)}>{s}</small></div>)}</div>
            <div className={cx('dm-row')}>
              <div className={cx('dm-chart')}>
                <span className={cx('dm-l')}>Updates this week</span>
                <div className={cx('bars')}>{[48,64,52,82,73,38,56].map((h,i)=> <motion.i key={i} initial={{height:0}} whileInView={{height:`${h}%`}} viewport={{once:true}} transition={{delay:.3+i*.06,duration:.8,ease:[.22,1,.36,1]}}/>)}</div>
              </div>
              <div className={cx('dm-sync')}><span className={cx('dm-l')}>Last Sync</span><b><span className={cx('dot')}/>Success</b><small>2 hours ago · 124 updated</small><Link to="/app" className={cx(btn('light','sm'))}>Open Dashboard</Link></div>
            </div>
            <div className={cx('dm-act')}>
              {[['Supplier import · Northline Wholesale','412 rows · 2m ago'],['Price update · Coastal Goods Co.','18 changes · 26m ago']].map(([a,b])=> <div key={a}><span className={cx('dot')}/><p>{a}</p><small>{b}</small></div>)}
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
    <section className={cx('section sup')} id="suppliers">
      <div className={cx('wrap split')}>
        <div>
          <Head eyebrow="Supplier management" title="Keep Every Supplier Organized" lead="Different suppliers use different spreadsheets. StockSync Pro helps you manage those differences with reusable column mappings and supplier-specific settings."/>
          <Bullets items={C.supplierBullets}/>
          <Reveal className={cx('mt')}><Link to="/app/suppliers" className={cx(btn('primary','md'))}>Organize Your Suppliers <ArrowRight size={18} className={cx('arrow')}/></Link></Reveal>
        </div>
        <Reveal className={cx('map card')} y={36}>
          <div className={cx('map-h')}><div><b>Northline Wholesale</b><small>northline_stock.csv</small></div><span className={cx('pill matched')}>Mapping saved</span></div>
          <div className={cx('map-cols')}><small>Supplier column</small><span/><small>StockSync field</small></div>
          {map.map(([a,b],i)=> (
            <motion.div key={a} className={cx('map-r')} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.2+i*.12}}>
              <span className={cx('chip')}>{a}</span><ArrowLeftRight size={16}/><span className={cx('chip brand')}>{b}</span>
            </motion.div>
          ))}
          <div className={cx('map-foot')}><Sparkles size={14}/>Reused automatically on the next import</div>
        </Reveal>
      </div>
    </section>
  )
}

export function Safety(){
  return (
    <section className={cx('section safety')} id="safety">
      <div className={cx('wrap split rev')}>
        <Reveal className={cx('diff card')} y={36}>
          <div className={cx('diff-h')}><ShieldCheck size={18}/>Review before sync</div>
          {[['SPK-002','Qty 3 → 24','ok'],['SPK-005','Price $48 → $44','warn'],['NL-88213','No Shopify match','err'],['SPK-1082','Duplicate SKU','err'],['SPK-1075','Invalid quantity (-2)','err']].map(([s,t,k],i)=> (
            <motion.div key={s+t} className={cx(`diff-r ${k}`)} initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:.15+i*.08}}>
              <code>{s}</code><span>{t}</span><i>{k==='ok'?'Ready':k==='warn'?'Review':'Flagged'}</i>
            </motion.div>
          ))}
        </Reveal>
        <div>
          <Head eyebrow="Accuracy & safety" title="Review First. Sync With Confidence." lead="Inventory changes should never feel like guesswork. StockSync Pro is designed around a review-before-sync workflow."/>
          <Bullets items={C.safetyBullets}/>
          <Reveal><p className={cx('callout')}><ShieldCheck size={18}/>You stay in control of what changes in your Shopify store.</p></Reveal>
        </div>
      </div>
    </section>
  )
}

export function Automation(){
  const ic=[CalendarClock,TrendingDown,AlertTriangle,Mail,Clock]
  return (
    <section className={cx('section auto')} id="automation">
      <div className={cx('wrap')}>
        <div className={cx('auto-box')}>
          <div className={cx('auto-copy')}>
            <Head eyebrow="Automation" title="Spend Less Time on Repetitive Inventory Tasks" lead="Move beyond manual file uploads as your workflow grows."/>
            <Reveal><p className={cx('auto-p')}>With supported supplier formats and properly configured integrations, you can schedule recurring synchronization, receive email notifications, and monitor inventory updates automatically.</p></Reveal>
            <Reveal className={cx('mt')}><Link to="/automation" className={cx(btn('light','md'))}>Explore Automation <ArrowRight size={18} className={cx('arrow')}/></Link></Reveal>
            <p className={cx('auto-note')}>Scheduled syncing requires supported data sources and appropriate Shopify API permissions.</p>
          </div>
          <div className={cx('auto-list')}>
            {C.automation.map((a,i)=>{ const I=ic[i]; return <Reveal key={a} delay={i*.07} x={24} y={0} className={cx('auto-item')}><span><I size={18}/></span>{a}</Reveal> })}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Pricing({ head=true }){
  return (
    <section className={cx('section pricing')} id="pricing">
      <div className={cx('wrap')}>
        {head && <Head center eyebrow="Pricing" title="Choose a Plan That Fits Your Store"/>}
        <div className={cx('price-grid')}>
          {C.plans.map((p,i)=> (
            <Reveal key={p.name} delay={i*.1} className={cx(`plan card ${p.popular?'pop':''}`)}>
              {p.popular && <span className={cx('pop-badge')}>Most Popular</span>}
              <h3>{p.name}</h3><p className={cx('plan-sub')}>{p.sub}</p>
              <div className={cx('plan-price')}>Pricing coming soon</div>
              <ul className={cx('list')}>{p.items.map(it=> <li key={it}><span className={cx('check')}><Check size={13} strokeWidth={3}/></span>{it}</li>)}</ul>
              <Link to="/signup" className={cx(btn(p.popular?'brand':'ghost','md','w-full'))}>Get Started</Link>
            </Reveal>
          ))}
        </div>
        <p className={cx('note center')}>Pricing and usage limits will be announced once plans are finalized.</p>
      </div>
    </section>
  )
}

export function Faq({ head=true }){
  const [open,setOpen]=useState(0)
  return (
    <section className={cx('section faq')} id="faq">
      <div className={cx('wrap faq-wrap')}>
        {head && <Head eyebrow="FAQ" title="Frequently Asked Questions" lead="Everything you need to know about StockSync Pro."/>}
        <div className={cx('faq-list')}>
          {C.faqs.map(([q,a],i)=>{ const on=open===i; return (
            <Reveal key={q} delay={i*.04} y={14} className={cx(`faq-item ${on?'on':''}`)}>
              <h3><button aria-expanded={on} aria-controls={`faq-${i}`} id={`faq-b-${i}`} onClick={()=>setOpen(on?-1:i)}>{q}<span className={cx('faq-ic')}><Plus size={18}/></span></button></h3>
              <AnimatePresence initial={false}>{on && (
                <motion.div id={`faq-${i}`} role="region" aria-labelledby={`faq-b-${i}`} initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.4,ease:[.22,1,.36,1]}} style={{overflow:'hidden'}}>
                  <p className={cx('faq-a')}>{a}</p>
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
    <section className={cx('final')}>
      <div className={cx('wrap')}>
        <Reveal className={cx('final-box')}>
          <div className={cx('final-orb')} aria-hidden="true"/>
          <H>Ready to Simplify Your Shopify Inventory?</H>
          <p>Stop spending unnecessary time updating spreadsheets and checking stock manually. Bring supplier data, product matching, and inventory updates into one organized workflow.</p>
          <div className={cx('final-ctas')}>
            <Link to="/signup" className={cx(btn('brand','md'))}>Get Started Free <ArrowRight size={18} className={cx('arrow')}/></Link>
            <Link to="/features" className={cx(btn('outlineLight','md'))}>View Features</Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function PageHero({ eyebrow, title, lead }){
  return (
    <section className={cx('phero')}>
      <div className={cx('hero-bg grid-bg')} aria-hidden="true"/>
      <div className={cx('wrap phero-in')}>
        <Reveal><span className={cx('eyebrow')}>{eyebrow}</span></Reveal>
        <Reveal delay={.06}><h1>{title}</h1></Reveal>
        {lead && <Reveal delay={.12}><p className={cx('lead')}>{lead}</p></Reveal>}
      </div>
    </section>
  )
}
