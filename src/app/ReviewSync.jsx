import { cx } from '../styles/ui.js'
import { btn } from '../components/ui/button.js'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCcw, CheckCircle2, ShieldCheck, FlaskConical, Upload } from '../components/icons.js'
import { PageHead, Badge } from './ui.jsx'
import { review as demo } from '../data/mock.js'
import { DIFF_KEY } from '../hooks/useCsvImport.js'
import { APPLICABLE, countBy } from '../utils/sku.js'

const load = () => { try { return JSON.parse(sessionStorage.getItem(DIFF_KEY)) } catch { return null } }
const label = { matched: ['ok', 'Matched'], price: ['warn', 'Price change'], missing: ['err', 'No match'], invalid: ['err', 'Invalid'], duplicate: ['err', 'Duplicate SKU'] }
const filters = ['all', ...Object.keys(label)]
const money = v => (v == null ? '—' : `$${Number(v).toFixed(2)}`)

export default function ReviewSync() {
  const saved = useMemo(load, [])
  const imported = Array.isArray(saved?.diff)
  const review = imported ? saved.diff : demo
  const [sel, setSel] = useState(() => new Set(review.flatMap((r, i) => (APPLICABLE.has(r.flag) ? [i] : []))))
  const [f, setF] = useState('all')
  const [state, setState] = useState('idle') // idle | confirm | running | done
  const rows = useMemo(() => review.map((r, i) => ({ ...r, i })).filter(r => f === 'all' || r.flag === f), [f, review])
  const counts = useMemo(() => countBy(review, 'flag'), [review])
  const count = k => counts.get(k) ?? 0
  const flagged = review.length - count('matched') - count('price')
  const selected = useMemo(() => review.filter((_, i) => sel.has(i)), [review, sel])
  const priceSel = selected.filter(r => r.flag === 'price').length
  const toggle = i => setSel(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n })
  const run = () => { setState('running'); setTimeout(() => setState('done'), 1200) }

  if (!review.length) return (<>
    <PageHead title="Review & Sync" />
    <div className={cx('card panel')}><p className={cx('empty')}>Nothing to review yet. <Link to="/app/imports" className={cx('link')}>Import a supplier file</Link> to compare it with your catalog.</p></div>
  </>)

  return (<>
    <PageHead title="Review & Sync" sub={imported ? `${saved.file} · parsed in your browser` : 'Sample data · Northline Wholesale'}>
      <Link to="/app/imports" className={cx(btn('ghost', 'sm'))}><Upload size={16} />Import file</Link>
    </PageHead>
    <p className={cx('alert warn-a mt-0 mb-5')} role="note" data-testid="sim-note"><FlaskConical size={16} /><span><b>Simulated — no changes are sent to Shopify.</b> This demo shows the review workflow only.</span></p>
    <div className={cx('rv-sum')}>
      {[['Matched', count('matched'), 'brand'], ['Price changes', count('price'), 'amber'], ['Flagged', flagged, 'red'], ['Selected', sel.size, 'blue']].map(([k, v, c]) =>
        <div key={k} className={cx(`card rv-s c-${c}`)}><small>{k}</small><b>{v}</b></div>)}
    </div>
    <div className={cx('card panel')}>
      <div className={cx('toolbar')}><div className={cx('tabs')} role="tablist">{filters.map(x => <button key={x} role="tab" aria-selected={f === x} className={cx(f === x ? 'on' : '')} onClick={() => setF(x)}>{x === 'all' ? 'All' : label[x][1]}<span>{x === 'all' ? review.length : count(x)}</span></button>)}</div></div>
      <div className={cx('table-wrap')}><table className={cx('tbl')}>
        <thead><tr><th><span className={cx('sr-only')}>Include</span></th><th>SKU</th><th>Product</th><th className={cx('r')}>Old qty</th><th className={cx('r')}>New qty</th><th className={cx('r')}>Old price</th><th className={cx('r')}>New price</th><th>Status</th></tr></thead>
        <tbody>{rows.map(r => { const [k, l] = label[r.flag]; const dis = !APPLICABLE.has(r.flag); return (
          <tr key={r.i} className={cx(dis ? 'row-flag' : '')}>
            <td><input type="checkbox" aria-label={`Include ${r.sku}`} checked={sel.has(r.i)} disabled={dis || state !== 'idle'} onChange={() => toggle(r.i)} /></td>
            <td className={cx('mono')}>{r.sku}</td><td>{r.name}</td>
            <td className={cx('r')}>{r.cur ?? '—'}</td>
            <td className={cx('r')}><b className={cx(r.next == null ? 'neg' : '')}>{r.next ?? (r.rawQty || 'blank')}</b></td>
            <td className={cx('r')}>{money(r.curP)}</td>
            <td className={cx('r')}><b className={cx(r.flag === 'price' ? 'chg' : '')}>{money(r.nextP)}</b></td>
            <td><Badge kind={k}>{l}</Badge>{r.reason && <small className="block text-xs text-muted">{r.reason}</small>}</td>
          </tr>) })}</tbody>
      </table></div>
      <div className={cx('rv-foot')}>
        <p className={cx('muted')}><ShieldCheck size={16} />Flagged rows can't be selected and are never applied.</p>
        <button className={cx(btn('brand', 'md'))} onClick={() => setState('confirm')} disabled={!sel.size || state !== 'idle'}>
          {state === 'running' ? <><RefreshCcw size={16} className={cx('spin')} />Running demo sync…</> : state === 'done' ? <><CheckCircle2 size={16} />Demo sync complete</> : <>Run Demo Sync ({sel.size})</>}
        </button>
      </div>
      <AnimatePresence>{state === 'done' && <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cx('alert ok-a')} role="status"><CheckCircle2 size={16} />Simulated: {sel.size} updates would be applied. No changes were sent to Shopify.</motion.p>}</AnimatePresence>
    </div>

    <AnimatePresence>{state === 'confirm' && (
      <motion.div className="fixed inset-0 z-[90] grid place-items-center bg-ink/50 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div role="alertdialog" aria-modal="true" aria-labelledby="cf-t" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-deep" initial={{ scale: .96 }} animate={{ scale: 1 }}>
          <h2 id="cf-t" className="font-display text-xl text-ink">Run demo sync?</h2>
          <ul className="my-4 grid gap-1.5 text-sm">
            <li><b>{sel.size}</b> selected updates ({sel.size - priceSel} quantity, {priceSel} with price changes)</li>
            <li><b>{flagged}</b> flagged rows will be skipped</li>
          </ul>
          <p className={cx('alert warn-a mt-0')}><FlaskConical size={16} />Simulated — no changes are sent to Shopify.</p>
          <div className="mt-5 flex justify-end gap-2">
            <button className={cx(btn('ghost', 'sm'))} onClick={() => setState('idle')}>Cancel</button>
            <button className={cx(btn('brand', 'sm'))} onClick={run} autoFocus>Run Demo Sync</button>
          </div>
        </motion.div>
      </motion.div>)}
    </AnimatePresence>
  </>)
}
