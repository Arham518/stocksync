import { btn } from '../components/ui/button.js'
import { useState } from 'react'
import { CheckCircle2, Store, UserPlus } from 'lucide-react'
import { team } from '../data/mock.js'
const roles = ['Owner','Admin','Editor','Viewer']
import { PageHead } from './ui.jsx'
const Toggle = ({ id, label, hint, on, set }) => (
  <div className="tg-row"><div><label htmlFor={id}><b>{label}</b></label><small>{hint}</small></div>
    <button id={id} role="switch" aria-checked={on} className={`tg ${on?'on':''}`} onClick={()=>set(!on)}><i/></button></div>
)
export default function Settings(){
  const [t,setT]=useState({ review:true, price:false, lowstock:true, fail:true, summary:false, schedule:false })
  const [th,setTh]=useState(10); const [members,setMembers]=useState(team); const [saved,setSaved]=useState(false)
  const s = k => v => { setSaved(false); setT({...t,[k]:v}) }
  return (<>
    <PageHead title="Settings" sub="Store connection, sync rules and notifications."/>
    <div className="set-grid">
      <section className="card panel"><div className="panel-h"><h2>Shopify store</h2></div>
        <div className="store"><span className="file-ic"><Store size={20}/></span><div><b>acme-supply.myshopify.com</b><small>Connected · inventory & product permissions</small></div><span className="badge b-ok">Connected</span></div>
        <div className="field" style={{marginTop:18}}><label htmlFor="th">Low-stock threshold</label><input id="th" type="number" min="0" value={th} onChange={e=>{setTh(e.target.value);setSaved(false)}}/></div>
      </section>
      <section className="card panel"><div className="panel-h"><h2>Sync rules</h2></div>
        <Toggle id="t1" label="Require review before sync" hint="Recommended. Preview every change first." on={t.review} set={s('review')}/>
        <Toggle id="t2" label="Apply price changes" hint="Off by default. Prices are previewed separately." on={t.price} set={s('price')}/>
        <Toggle id="t3" label="Scheduled synchronization" hint="Requires supported data sources and Shopify API permissions." on={t.schedule} set={s('schedule')}/>
      </section>
      <section className="card panel"><div className="panel-h"><h2>Notifications</h2></div>
        <Toggle id="t4" label="Low-stock notifications" hint="Email when products fall below threshold." on={t.lowstock} set={s('lowstock')}/>
        <Toggle id="t5" label="Import and sync failure alerts" hint="Email when a file or sync fails." on={t.fail} set={s('fail')}/>
        <Toggle id="t6" label="Automated update summaries" hint="Daily summary of inventory changes." on={t.summary} set={s('summary')}/>
      </section>
    </div>
    <section className="card panel mt-5" aria-labelledby="tm">
      <div className="panel-h"><h2 id="tm">Team members</h2><button className="icon-btn" aria-label="Invite member"><UserPlus size={17}/></button></div>
      <ul className="grid gap-2">{members.map((m,i)=> (
        <li key={m.email} className="flex flex-wrap items-center gap-3 rounded-xl border border-line p-3">
          <span className="avatar">{m.name.split(' ').map(w=>w[0]).join('')}</span>
          <div className="min-w-0 flex-1"><b className="block text-sm text-ink">{m.name}</b><small className="text-muted">{m.email}</small></div>
          <div className="field"><label htmlFor={`r${i}`} className="sr-only">Role for {m.name}</label>
            <select id={`r${i}`} value={m.role} disabled={m.role==='Owner'} onChange={e=>{setSaved(false);setMembers(members.map((x,j)=>j===i?{...x,role:e.target.value}:x))}}>{roles.map(r=> <option key={r}>{r}</option>)}</select></div>
        </li>))}</ul>
    </section>
    <div className="set-foot">{saved && <span className="alert ok-a" role="status"><CheckCircle2 size={16}/>Settings saved</span>}<button className={btn('primary','md')} onClick={()=>setSaved(true)}>Save changes</button></div>
  </>)
}
