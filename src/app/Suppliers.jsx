import { cx } from '../styles/ui.js'
import { btn } from '../components/ui/button.js'
import { useState } from 'react'
import { FileSpreadsheet, Plus, Save, CheckCircle2, ArrowRight } from '../components/icons.js'
import { PageHead, Badge, EmptyState } from './ui.jsx'
import { suppliers as initial } from '../data/mock.js'
const cols = ['Item Code','SKU','Part #','Product Name','On Hand','Available','Stock','Unit Cost','Wholesale','Price USD']
export default function Suppliers(){
  const [list,setList]=useState(initial); const [sel,setSel]=useState(initial[0].id); const [saved,setSaved]=useState(false)
  const s = list.find(x=>x.id===sel)
  const setMap = (k,v) => { setSaved(false); setList(list.map(x=>x.id===sel?{...x,map:{...x.map,[k]:v}}:x)) }
  const save = () => { setList(list.map(x=>x.id===sel?{...x,mapped:!!(x.map.sku&&x.map.qty&&x.map.price),status:(x.map.sku&&x.map.qty&&x.map.price)?'Active':'Needs mapping'}:x)); setSaved(true) }
  const complete = s?.map.sku && s?.map.qty && s?.map.price
  if (!s) return (<><PageHead title="Suppliers"/><EmptyState title="No suppliers yet">Add a supplier to save its column mapping for future imports.</EmptyState></>)
  return (<>
    <PageHead title="Suppliers" sub="Separate profiles with reusable column mappings."><button className={cx(btn('primary','sm'))}><Plus size={16}/>Add supplier</button></PageHead>
    <div className={cx('sup-grid')}>
      <div className={cx('sup-list')} role="list">
        {list.map(x=> (
          <button key={x.id} role="listitem" className={cx(`card sup-card ${sel===x.id?'on':''}`)} onClick={()=>{setSel(x.id);setSaved(false)}} aria-pressed={sel===x.id}>
            <div className={cx('sc-top')}><span className={cx('avatar sq')}>{x.name.split(' ').map(w=>w[0]).slice(0,2).join('')}</span><Badge kind={x.mapped?'ok':'warn'}>{x.status}</Badge></div>
            <b>{x.name}</b><small><FileSpreadsheet size={13}/>{x.file}</small>
            <div className={cx('sc-meta')}><span>{x.products} products</span><span>{x.lastImport}</span></div>
          </button>
        ))}
      </div>
      <section className={cx('card panel map-panel')} aria-labelledby="mp">
        <div className={cx('panel-h')}><div><h2 id="mp">Column mapping</h2><small className={cx('muted')}>{s.name} · {s.file}</small></div></div>
        <div className={cx('map-rows')}>
          {[['sku','SKU','Unique product identifier'],['qty','Quantity','Units available from supplier'],['price','Price','Supplier cost or price']].map(([k,l,h])=> (
            <div key={k} className={cx('mrow')}>
              <div className={cx('field')}><label htmlFor={`m-${k}`}>Supplier column</label><select id={`m-${k}`} value={s.map[k]} onChange={e=>setMap(k,e.target.value)}><option value="">Select a column…</option>{cols.map(c=> <option key={c}>{c}</option>)}</select></div>
              <ArrowRight size={18} className={cx('mrow-arrow')} aria-hidden="true"/>
              <div className={cx('mtarget')}><b>{l}</b><small>{h}</small>{s.map[k] && <CheckCircle2 size={18}/>}</div>
            </div>
          ))}
        </div>
        <div className={cx('map-act')}>
          <p className={cx('muted')}>{complete?'All required fields are mapped.':'Map SKU, Quantity and Price to enable imports.'}</p>
          <button className={cx(btn('brand','sm'))} onClick={save} disabled={!complete}><Save size={16}/>Save mapping</button>
        </div>
        {saved && <p className={cx('alert ok-a')} role="status"><CheckCircle2 size={16}/>Mapping saved for {s.name}.</p>}
      </section>
    </div>
  </>)
}
