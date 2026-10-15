import { cx } from '../styles/ui.js'
import { btn } from '../components/ui/button.js'
import { Link } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts'
import { Package, AlertTriangle, XCircle, GitCompareArrows, CheckCircle2, Info, ArrowUpRight, Upload, FileSpreadsheet } from '../components/icons.js'
import { PageHead, Badge } from './ui.jsx'
import Onboarding from './Onboarding.jsx'
import { trend, stockMix, activity, suppliers } from '../data/mock.js'
const stats = [
  { k:'Total Products', v:'1,248', s:'Tracked across 4 suppliers', I:Package, c:'brand' },
  { k:'Low Stock', v:'104', s:'Below threshold of 10', I:AlertTriangle, c:'amber' },
  { k:'Out of Stock', v:'48', s:'Action required', I:XCircle, c:'red' },
  { k:'Pending Changes', v:'37', s:'Awaiting your review', I:GitCompareArrows, c:'blue' },
]
const aI = { ok:[CheckCircle2,'brand'], warn:[AlertTriangle,'amber'], err:[XCircle,'red'], info:[Info,'blue'] }
export default function Dashboard(){
  return (<>
    <PageHead title="Good morning, Acme Supply" sub="Sample data shown for demonstration.">
      <Link to="/app/imports" className={cx(btn('primary','sm'))}><Upload size={16}/>New Import</Link>
    </PageHead>
    <Onboarding/>
    <div className={cx('stat-grid')}>
      {stats.map(({k,v,s,I,c})=> (
        <div key={k} className={cx(`stat card c-${c}`)}><div className={cx('stat-top')}><span className={cx('stat-ic')}><I size={20}/></span><ArrowUpRight size={18} className={cx('stat-go')}/></div><p>{k}</p><b>{v}</b><small>{s}</small></div>
      ))}
    </div>
    <div className={cx('dash-grid')}>
      <section className={cx('card panel chart-panel')} aria-labelledby="ch1">
        <div className={cx('panel-h')}><h2 id="ch1">Inventory updates</h2><div className={cx('legend')}><span className={cx('lg brand')}/>Updated<span className={cx('lg red')}/>Failed</div></div>
        <div style={{height:260}}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend} margin={{left:-18,right:6,top:10}}>
              <defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b7d58" stopOpacity=".35"/><stop offset="1" stopColor="#0b7d58" stopOpacity="0"/></linearGradient></defs>
              <CartesianGrid stroke="#eef2f0" vertical={false}/>
              <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{fill:'#5d6d66',fontSize:12}}/>
              <YAxis tickLine={false} axisLine={false} tick={{fill:'#5d6d66',fontSize:12}}/>
              <Tooltip contentStyle={{borderRadius:12,border:'1px solid #e6ece9',boxShadow:'0 10px 30px -12px rgba(0,0,0,.2)'}}/>
              <Area type="monotone" dataKey="updated" stroke="#0b7d58" strokeWidth={2.5} fill="url(#ga)" name="Updated"/>
              <Area type="monotone" dataKey="failed" stroke="#c42b31" strokeWidth={2} fill="transparent" name="Failed"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className={cx('card panel')} aria-labelledby="ch2">
        <div className={cx('panel-h')}><h2 id="ch2">Stock health</h2></div>
        <div className={cx('donut')}>
          <ResponsiveContainer width="100%" height={190}>
            <PieChart><Pie data={stockMix} dataKey="value" innerRadius={58} outerRadius={84} paddingAngle={3} stroke="none">{stockMix.map(s=> <Cell key={s.name} fill={s.color}/>)}</Pie><Tooltip/></PieChart>
          </ResponsiveContainer>
          <div className={cx('donut-c')}><b>1,248</b><small>products</small></div>
        </div>
        <ul className={cx('mix')}>{stockMix.map(s=> <li key={s.name}><span style={{background:s.color}}/>{s.name}<b>{s.value.toLocaleString()}</b></li>)}</ul>
      </section>
      <section className={cx('card panel')} aria-labelledby="ch3">
        <div className={cx('panel-h')}><h2 id="ch3">Recent activity</h2><Link to="/app/history" className={cx('link')}>View all</Link></div>
        <ul className={cx('act')}>{activity.map(a=>{ const [I,c]=aI[a.type]; return <li key={a.t}><span className={cx(`act-ic c-${c}`)}><I size={16}/></span><div><b>{a.t}</b><small>{a.d}</small></div><time>{a.time}</time></li> })}</ul>
      </section>
      <section className={cx('card panel sync-card')} aria-labelledby="ch4">
        <div className={cx('panel-h')}><h2 id="ch4">Last sync</h2><Badge kind="ok">Success</Badge></div>
        <p className={cx('big')}>2 hours ago</p>
        <div className={cx('sync-bars')}><div><small>Updated</small><b>398</b></div><div><small>Skipped</small><b>12</b></div><div><small>Failed</small><b>2</b></div></div>
        <div className={cx('progress')}><i style={{width:'96%'}}/></div>
        <Link to="/app/review" className={cx(btn('brand','sm', 'w-full'))}>Review pending changes</Link>
      </section>
      <section className={cx('card panel wide')} aria-labelledby="ch5">
        <div className={cx('panel-h')}><h2 id="ch5">Supplier file activity</h2><Link to="/app/suppliers" className={cx('link')}>Manage suppliers</Link></div>
        <div className={cx('sup-mini')}>{suppliers.map(s=> <div key={s.id}><span className={cx('file-ic')}><FileSpreadsheet size={18}/></span><div><b>{s.name}</b><small>{s.file} · {s.lastImport}</small></div><Badge kind={s.mapped?'ok':'warn'}>{s.status}</Badge></div>)}</div>
      </section>
    </div>
  </>)
}
