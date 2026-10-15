import { cx } from '../styles/ui.js'
import { btn } from '../components/ui/button.js'
import { useState } from 'react'
import { CheckCircle2, Store, UserPlus } from '../components/icons.js'
import { team } from '../data/mock.js'
const roles = ['Owner','Admin','Editor','Viewer']
import { PageHead } from './ui.jsx'
const Toggle = ({ id, label, hint, on, set }) => (
  <div className={cx('tg-row')}><div><label htmlFor={id}><b>{label}</b></label><small>{hint}</small></div>
    <button id={id} role="switch" aria-checked={on} className={cx(`tg ${on?'on':''}`)} onClick={()=>set(!on)}><i/></button></div>
)
export default function Settings(){
  const [t,setT]=useState({ review:true, price:false, lowstock:true, fail:true, summary:false, schedule:false })
  const [th,setTh]=useState(10); const [members,setMembers]=useState(team); const [saved,setSaved]=useState(false)
  const s = k => v => { setSaved(false); setT({...t,[k]:v}) }
  return (<>
    <PageHead title="Settings" sub="Store connection, sync rules and notifications."/>
    <div className={cx('set-grid')}>
      <section className={cx('card panel')}><div className={cx('panel-h')}><h2>Shopify store</h2></div>
        <div className={cx('store')}><span className={cx('file-ic')}><Store size={20}/></span><div><b>acme-supply.myshopify.com</b><small>Demo store · live Shopify connection coming soon</small></div><span className={cx('badge b-warn')}>Not connected</span></div>
        <div className={cx('field')} style={{marginTop:18}}><label htmlFor="th">Low-stock threshold</label><input id="th" type="number" min="0" value={th} onChange={e=>{setTh(e.target.value);setSaved(false)}}/></div>
      </section>
      <section className={cx('card panel')}><div className={cx('panel-h')}><h2>Sync rules</h2></div>
        <Toggle id="t1" label="Require review before sync" hint="Recommended. Preview every change first." on={t.review} set={s('review')}/>
        <Toggle id="t2" label="Apply price changes" hint="Off by default. Prices are previewed separately." on={t.price} set={s('price')}/>
        <Toggle id="t3" label="Scheduled synchronization" hint="Coming soon. Requires supported data sources and Shopify API permissions." on={t.schedule} set={s('schedule')}/>
      </section>
      <section className={cx('card panel')}><div className={cx('panel-h')}><h2>Notifications</h2></div>
        <Toggle id="t4" label="Low-stock notifications" hint="Coming soon. Email when products fall below threshold." on={t.lowstock} set={s('lowstock')}/>
        <Toggle id="t5" label="Import and sync failure alerts" hint="Coming soon. Email when a file or sync fails." on={t.fail} set={s('fail')}/>
        <Toggle id="t6" label="Automated update summaries" hint="Coming soon. Daily summary of inventory changes." on={t.summary} set={s('summary')}/>
      </section>
    </div>
    <section className={cx('card panel mt-5')} aria-labelledby="tm">
      <div className={cx('panel-h')}><h2 id="tm">Team members</h2><button className={cx('icon-btn')} aria-label="Invite member"><UserPlus size={17}/></button></div>
      <ul className={cx('grid gap-2')}>{members.map((m,i)=> (
        <li key={m.email} className={cx('flex flex-wrap items-center gap-3 rounded-xl border border-line p-3')}>
          <span className={cx('avatar')}>{m.name.split(' ').map(w=>w[0]).join('')}</span>
          <div className={cx('min-w-0 flex-1')}><b className={cx('block text-sm text-ink')}>{m.name}</b><small className={cx('text-muted')}>{m.email}</small></div>
          <div className={cx('field')}><label htmlFor={`r${i}`} className={cx('sr-only')}>Role for {m.name}</label>
            <select id={`r${i}`} value={m.role} disabled={m.role==='Owner'} onChange={e=>{setSaved(false);setMembers(members.map((x,j)=>j===i?{...x,role:e.target.value}:x))}}>{roles.map(r=> <option key={r}>{r}</option>)}</select></div>
        </li>))}</ul>
    </section>
    <div className={cx('set-foot')}>{saved && <span className={cx('alert ok-a')} role="status"><CheckCircle2 size={16}/>Settings saved</span>}<button className={cx(btn('primary','md'))} onClick={()=>setSaved(true)}>Save changes</button></div>
  </>)
}
