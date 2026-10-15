import { cx } from '../styles/ui.js'
import { btn } from '../components/ui/button.js'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, ShoppingBag, FileSpreadsheet, FileText, Lock, KeyRound, Eye, Trash2, ServerCog, ShieldCheck, Store, TrendingUp, Building2, Circle } from 'lucide-react'
import { PageHero, FinalCta } from '../components/Sections.jsx'
import Reveal from '../components/Reveal.jsx'

export function Integrations(){
  const items=[
    { I:ShoppingBag, n:'Shopify', s:'Store connection', d:'Read products and variants, then update inventory quantities and prices through the Shopify Admin API, limited to the permissions you approve. Live store sync is in development; the current demo simulates it.', tag:'Planned' },
    { I:FileText, n:'CSV files', s:'Supplier import', d:'Upload comma-separated supplier files. Columns are detected and mapped to SKU, quantity and price.', tag:'Available' },
    { I:FileSpreadsheet, n:'Excel (.xlsx, .xls)', s:'Supplier import', d:'Upload Excel workbooks from suppliers. The first worksheet is read in your browser and goes through the same validation as CSV.', tag:'Available' },
  ]
  return (<>
    <PageHero eyebrow="Integrations" title="Works With the Tools You Already Use" lead="StockSync Pro connects your Shopify store with the supplier files you already receive. No invented integrations — just the ones the workflow needs."/>
    <section className={cx('section')} style={{paddingTop:40}}><div className={cx('wrap int-grid')}>
      {items.map(({I,n,s,d,tag},i)=> <Reveal key={n} delay={i*.08} className={cx('card int')}><div className={cx('int-top')}><span className={cx('int-ic')}><I size={26}/></span><span className={cx(`tagp ${tag==='Available'?'core':''}`)}>{tag}</span></div><small>{s}</small><h2>{n}</h2><p>{d}</p></Reveal>)}
    </div></section>
    <FinalCta/>
  </>)
}

export function Security(){
  const items=[[KeyRound,'Least-privilege Shopify access','StockSync Pro requests only the Shopify permissions needed for products and inventory.'],[Eye,'Review before sync','No change reaches your store until you preview and confirm it.'],[ShieldCheck,'Encrypted in transit','All traffic between your browser, StockSync Pro and Shopify uses HTTPS.'],[ServerCog,'Audit trail','Every sync is recorded with updated, skipped and failed products.'],[Trash2,'Your data, your call','Request deletion of uploaded supplier files and history at any time.'],[Lock,'Account protection','Secure password storage and session handling for every account.']]
  return (<>
    <PageHero eyebrow="Security & Data" title="Built Around Control and Transparency" lead="Inventory data runs your business. Here is how StockSync Pro is designed to handle it."/>
    <section className={cx('section')} style={{paddingTop:40}}><div className={cx('wrap sec-grid')}>
      {items.map(([I,t,d],i)=> <Reveal key={t} delay={(i%3)*.08} className={cx('card secc')}><span className={cx('int-ic')}><I size={22}/></span><h2>{t}</h2><p>{d}</p></Reveal>)}
    </div>
    <div className={cx('wrap')}><p className={cx('note')} style={{marginTop:28}}>These are design principles for a product in development, not third-party certifications.</p></div></section>
    <FinalCta/>
  </>)
}

export function UseCases(){
  const cases=[
    { id:'small-stores', I:Store, t:'Small Stores', s:'One store, a few suppliers', p:'Replace copy-paste spreadsheet updates with a simple upload, match and review routine.', b:['Upload a supplier CSV in seconds','Catch mismatched SKUs before they reach your store','Keep a simple history of every update'], plan:'Starter' },
    { id:'growing-brands', I:TrendingUp, t:'Growing Brands', s:'More suppliers, more SKUs', p:'Each supplier sends a different spreadsheet. Save a mapping once and reuse it on every import.', b:['Separate supplier profiles and mappings','Bulk inventory and price updates','Low-stock alerts and detailed reports'], plan:'Professional' },
    { id:'agencies', I:Building2, t:'Agencies', s:'Multiple client stores', p:'Manage supplier inventory for several Shopify stores from one place, with store-specific settings.', b:['Multiple Shopify stores','Store-specific supplier configurations','Team workflow support'], plan:'Agency' },
  ]
  return (<>
    <PageHero eyebrow="Use cases" title="Built for Shopify Businesses at Every Stage" lead="Whether you run one store or many, the workflow stays the same: upload, match, review, sync."/>
    <section className={cx('section')} style={{paddingTop:40}}><div className={cx('wrap uc-list')}>
      {cases.map(({id,I,t,s,p,b,plan},i)=> (
        <Reveal key={id} className={cx(`uc card ${i%2?'alt':''}`)} id={id}>
          <div className={cx('uc-l')}><span className={cx('int-ic')}><I size={26}/></span><small>{s}</small><h2>{t}</h2><p>{p}</p><Link to="/pricing" className={cx(btn('ghost','sm'))}>See the {plan} plan <ArrowRight size={16} className={cx('arrow')}/></Link></div>
          <ul className={cx('list uc-r')}>{b.map(x=> <li key={x}><span className={cx('check')}><Check size={13} strokeWidth={3}/></span>{x}</li>)}</ul>
        </Reveal>
      ))}
    </div></section>
    <FinalCta/>
  </>)
}

export function Roadmap(){
  const cols=[['Now','Available in the demo',['CSV and Excel supplier imports','SKU matching and validation','Review workflow with simulated sync','Manual column mapping']],['Next','Planned',['Live Shopify store connection','Saved supplier column mappings','Low-stock email alerts','Sync history from real runs']],['Later','Exploring',['Scheduled synchronization','Multi-store management for agencies','Team roles and permissions','Automated update summaries']]]
  return (<>
    <PageHero eyebrow="Roadmap" title="What We're Building" lead="StockSync Pro is in active development. This roadmap shows planned work — it is not a list of past releases, and priorities may change."/>
    <section className={cx('section')} style={{paddingTop:40}}><div className={cx('wrap rm-grid')}>
      {cols.map(([h,s,items],i)=> <Reveal key={h} delay={i*.1} className={cx(`card rm rm-${i}`)}><div className={cx('rm-h')}><h2>{h}</h2><span className={cx('tagp')}>{s}</span></div><ul>{items.map(x=> <li key={x}><Circle size={10}/>{x}</li>)}</ul></Reveal>)}
    </div></section>
    <FinalCta/>
  </>)
}

export function Docs(){
  const steps=[
    ['Create your account','Sign up and open the dashboard. You can explore every screen before connecting a store.'],
    ['Connect your Shopify store (planned)','Live store connection is in development. Today the demo compares files with a sample catalog.'],
    ['Add a supplier profile','Go to Suppliers, add a supplier and name it the way your team knows it.'],
    ['Map columns','Choose which supplier columns hold SKU, quantity and price. The mapping is reused on every future import.'],
    ['Upload a supplier file','Open Imports and upload a CSV. StockSync Pro checks rows, duplicate SKUs and invalid quantities.'],
    ['Review changes','Matched products, missing records, quantity differences and proposed price updates are shown side by side.'],
    ['Confirm and sync','Select the updates you want and confirm. Flagged rows are never synced automatically.'],
    ['Check the report','Sync History lists updated, skipped and failed products for every run.'],
  ]
  return (<>
    <PageHero eyebrow="Help Center" title="Getting Started With StockSync Pro" lead="A step-by-step guide from your first supplier file to your first Shopify sync."/>
    <section className={cx('section')} style={{paddingTop:40}}><div className={cx('wrap docs')}>
      <aside className={cx('docs-toc card')} aria-label="On this page"><b>On this page</b>{steps.map(([t],i)=> <a key={t} href={`#step-${i+1}`}>{i+1}. {t}</a>)}</aside>
      <div className={cx('docs-body')}>
        {steps.map(([t,d],i)=> <Reveal as="article" key={t} id={`step-${i+1}`} className={cx('doc-step')}><span>{i+1}</span><div><h2>{t}</h2><p>{d}</p></div></Reveal>)}
        <div className={cx('card doc-help')}><h2>Need more help?</h2><p>Read the FAQ or contact the team.</p><div className={cx('row-btns')}><Link to="/faq" className={cx(btn('ghost','sm'))}>Read the FAQ</Link><Link to="/contact" className={cx(btn('primary','sm'))}>Contact us</Link></div></div>
      </div>
    </div></section>
  </>)
}

export function About(){
  return (<>
    <PageHero eyebrow="About" title="Less Manual Work. Better Inventory Control. More Time to Grow." lead="StockSync Pro exists because supplier spreadsheets and Shopify inventory shouldn't take hours to reconcile."/>
    <section className={cx('section')} style={{paddingTop:40}}><div className={cx('wrap about')}>
      <Reveal className={cx('about-l')}><h2>Why we're building it</h2><p>Shopify merchants who rely on suppliers receive inventory in every format imaginable. Updating stock and prices by hand is slow and error-prone, and one mismatched SKU can mean overselling or a wrong price.</p><p>StockSync Pro turns those files into organized, reviewable inventory updates, so merchants stay in control of every change.</p></Reveal>
      <Reveal className={cx('about-r')} delay={.1}>{[['Control first','Every change is previewed before it reaches your store.'],['Honest by default','No silent updates against uncertain matches.'],['Built for real workflows','Different suppliers, different spreadsheets — handled with reusable mappings.']].map(([t,d])=> <div key={t} className={cx('card val')}><h3>{t}</h3><p>{d}</p></div>)}</Reveal>
    </div></section>
    <FinalCta/>
  </>)
}
