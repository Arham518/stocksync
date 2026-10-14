import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { PageHead, Badge } from './ui.jsx'
import { history } from '../data/mock.js'
export default function SyncHistory(){
  const [open,setOpen]=useState(null)
  const k = s => s==='Completed'?'ok':s==='Partial'?'warn':'err'
  return (<>
    <PageHead title="Sync History" sub="Completed updates, failed records and previous inventory changes."/>
    <div className="hist">
      {history.map(h=>{ const on=open===h.id; const total=h.updated+h.failed+h.skipped||1; return (
        <div key={h.id} className={`card hist-item ${on?'on':''}`}>
          <button className="hist-row" aria-expanded={on} onClick={()=>setOpen(on?null:h.id)}>
            <span className="mono">{h.id}</span><span className="hist-sup"><b>{h.supplier}</b><small>{h.date}</small></span>
            <span className="hist-bar" aria-hidden="true"><i className="u" style={{width:`${h.updated/total*100}%`}}/><i className="s" style={{width:`${h.skipped/total*100}%`}}/><i className="f" style={{width:`${h.failed/total*100}%`}}/></span>
            <Badge kind={k(h.status)}>{h.status}</Badge><ChevronDown size={18} className="chev"/>
          </button>
          {on && <div className="hist-d"><div><small>Updated</small><b>{h.updated}</b></div><div><small>Skipped</small><b>{h.skipped}</b></div><div><small>Failed</small><b className={h.failed?'neg':''}>{h.failed}</b></div><p className="muted">{h.failed?'Failed records were not changed in Shopify and are listed in the downloadable report.':'All selected products were updated successfully.'}</p></div>}
        </div>) })}
    </div>
  </>)
}
