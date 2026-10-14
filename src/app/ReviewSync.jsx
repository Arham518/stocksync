import { btn } from '../components/ui/button.js'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCcw, CheckCircle2, ShieldCheck } from 'lucide-react'
import { PageHead, Badge } from './ui.jsx'
import { review as demo } from '../data/mock.js'
import { DIFF_KEY } from '../hooks/useCsvImport.js'
const load = () => { try { return JSON.parse(sessionStorage.getItem(DIFF_KEY)) } catch { return null } }
const label = { matched:['ok','Matched'], price:['warn','Price change'], missing:['err','No match'], invalid:['err','Invalid qty'], duplicate:['err','Duplicate SKU'] }
const filters = ['all','matched','price','missing','invalid','duplicate']
export default function ReviewSync(){
  const saved = useMemo(load,[]); const review = saved?.diff?.length ? saved.diff : demo
  const ok = r => r.flag==='matched'||r.flag==='price'
  const [sel,setSel]=useState(()=>new Set(review.flatMap((r,i)=>ok(r)?[i]:[])))
  const [f,setF]=useState('all'); const [state,setState]=useState('idle')
  const rows = useMemo(()=> review.map((r,i)=>({...r,i})).filter(r=>f==='all'||r.flag===f),[f,review])
  const toggle = i => { const n=new Set(sel); n.has(i)?n.delete(i):n.add(i); setSel(n) }
  const confirm = () => { setState('syncing'); setTimeout(()=>setState('done'),1600) }
  const counts = useMemo(()=>review.reduce((m,r)=>m.set(r.flag,(m.get(r.flag)??0)+1),new Map()),[review]); const count = k => counts.get(k)??0
  return (<>
    <PageHead title="Review & Sync" sub={saved?.file ? `${saved.file} · parsed in your browser` : "Demo data · Northline Wholesale · northline_stock.csv"}/>
    <div className="rv-sum">
      {[['Matched',count('matched'),'ok'],['Price changes',count('price'),'warn'],['Flagged',count('missing')+count('invalid')+count('duplicate'),'err'],['Selected',sel.size,'info']].map(([k,v,c])=> <div key={k} className={`card rv-s c-${c==='ok'?'brand':c==='warn'?'amber':c==='err'?'red':'blue'}`}><small>{k}</small><b>{v}</b></div>)}
    </div>
    <div className="card panel">
      <div className="toolbar"><div className="tabs" role="tablist">{filters.map(x=> <button key={x} role="tab" aria-selected={f===x} className={f===x?'on':''} onClick={()=>setF(x)}>{x==='all'?'All':label[x][1]}</button>)}</div></div>
      <div className="table-wrap"><table className="tbl">
        <thead><tr><th><span className="sr-only">Include</span></th><th>SKU</th><th>Product</th><th className="r">Stock</th><th className="r">Price</th><th>Status</th></tr></thead>
        <tbody>{rows.map(r=>{ const [k,l]=label[r.flag]; const dis=!ok(r); return (
          <tr key={r.i} className={dis?'row-flag':''}>
            <td><input type="checkbox" aria-label={`Include ${r.sku}`} checked={sel.has(r.i)} disabled={dis||state!=='idle'} onChange={()=>toggle(r.i)}/></td>
            <td className="mono">{r.sku}</td><td>{r.name}</td>
            <td className="r">{r.cur??'—'} <span className="muted">→</span> <b className={r.next<0?'neg':''}>{r.next}</b></td>
            <td className="r">{r.curP!=null?`$${r.curP}`:'—'} <span className="muted">→</span> <b className={r.nextP!==r.curP&&r.curP!=null?'chg':''}>${r.nextP}</b></td>
            <td><Badge kind={k}>{l}</Badge></td>
          </tr>) })}</tbody>
      </table></div>
      <div className="rv-foot">
        <p className="muted"><ShieldCheck size={16}/>Flagged rows are never synced automatically.</p>
        <button className={btn('brand','md')} onClick={confirm} disabled={!sel.size||state!=='idle'}>
          {state==='syncing'?<><RefreshCcw size={16} className="spin"/>Syncing…</>:state==='done'?<><CheckCircle2 size={16}/>Synced</>:<>Confirm & sync {sel.size} updates</>}
        </button>
      </div>
      <AnimatePresence>{state==='done' && <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="alert ok-a" role="status"><CheckCircle2 size={16}/>{sel.size} products were updated in this demo sync. A report was added to Sync History.</motion.p>}</AnimatePresence>
    </div>
  </>)
}
