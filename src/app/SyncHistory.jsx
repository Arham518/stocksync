import { cx } from '../styles/ui.js'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHead, Badge, EmptyState } from './ui.jsx'
import { history } from '../data/mock.js'
export default function SyncHistory(){
  const [open,setOpen]=useState(null)
  const k = s => s==='Completed'?'ok':s==='Partial'?'warn':'err'
  if (!history.length) return (<><PageHead title="Sync History"/><EmptyState title="No syncs yet">Run a review from <Link to="/app/imports" className={cx('link')}>Imports</Link> and the report will appear here.</EmptyState></>)
  return (<>
    <PageHead title="Sync History" sub="Sample history · completed updates, failed records and previous inventory changes."/>
    <div className={cx('hist')}>
      {history.map(h=>{ const on=open===h.id; const total=h.updated+h.failed+h.skipped||1; return (
        <div key={h.id} className={cx(`card hist-item ${on?'on':''}`)}>
          <button className={cx('hist-row')} aria-expanded={on} onClick={()=>setOpen(on?null:h.id)}>
            <span className={cx('mono')}>{h.id}</span><span className={cx('hist-sup')}><b>{h.supplier}</b><small>{h.date}</small></span>
            <span className={cx('hist-bar')} aria-hidden="true"><i className={cx('u')} style={{width:`${h.updated/total*100}%`}}/><i className={cx('s')} style={{width:`${h.skipped/total*100}%`}}/><i className={cx('f')} style={{width:`${h.failed/total*100}%`}}/></span>
            <Badge kind={k(h.status)}>{h.status}</Badge><ChevronDown size={18} className={cx('chev')}/>
          </button>
          {on && <div className={cx('hist-d')}><div><small>Updated</small><b>{h.updated}</b></div><div><small>Skipped</small><b>{h.skipped}</b></div><div><small>Failed</small><b className={cx(h.failed?'neg':'')}>{h.failed}</b></div><p className={cx('muted')}>{h.failed?'Failed records were not changed in Shopify and are listed in the downloadable report.':'All selected products were updated successfully.'}</p></div>}
        </div>) })}
    </div>
  </>)
}
