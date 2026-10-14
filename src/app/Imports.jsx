import { cx } from '../styles/ui.js'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UploadCloud, FileSpreadsheet, X, Download, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react'
import { btn } from '../components/ui/button.js'
import { cn } from '../utils/cn.js'
import { PageHead, Badge } from './ui.jsx'
import { suppliers, SAMPLE_CSV } from '../data/mock.js'
import { useCsvImport } from '../hooks/useCsvImport.js'

export default function Imports() {
  const csv = useCsvImport()
  const [drag, setDrag] = useState(false)
  const input = useRef(null)
  const flagged = (csv.counts.get('missing') ?? 0) + (csv.counts.get('invalid') ?? 0) + (csv.counts.get('duplicate') ?? 0)
  const summary = [
    ['Rows', csv.rows.length], ['Columns', csv.fields.length],
    ['SKU column', csv.cols.sku ?? '—'], ['Quantity column', csv.cols.qty ?? '—'], ['Price column', csv.cols.price ?? '—'],
    ['Matched', csv.counts.get('matched') ?? 0], ['Price changes', csv.counts.get('price') ?? 0], ['Flagged', flagged],
  ]
  const download = () => {
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([SAMPLE_CSV], { type: 'text/csv' })), download: 'sample_supplier.csv' })
    a.click(); URL.revokeObjectURL(a.href)
  }
  const reset = () => { csv.reset(); if (input.current) input.current.value = '' }

  return (<>
    <PageHead title="Imports" sub="Upload a supplier CSV. It is parsed in your browser — nothing leaves your computer.">
      <button className={cx(btn('ghost', 'sm'))} onClick={download}><Download size={16} />Sample CSV</button>
    </PageHead>
    <div className={cx('grid gap-5 lg:grid-cols-[1.3fr_1fr]')}>
      <div className={cx('card panel')}>
        <div className={cx('field mb-4')}><label htmlFor="sup">Supplier</label>
          <select id="sup">{suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
        <div
          className={cx(cn('drop', drag && 'drag'))}
          onDragOver={e => { e.preventDefault(); setDrag(true) }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); csv.loadFile(e.dataTransfer.files[0]) }}
        >
          <span className={cx('drop-ic')}><UploadCloud size={30} /></span>
          <b>Drag & drop your supplier file</b>
          <small>CSV up to 5 MB · Excel support planned</small>
          <div className={cx('mt-2.5 flex flex-wrap justify-center gap-2.5')}>
            <label className={cx(btn('primary', 'sm', 'cursor-pointer'))} htmlFor="file-in">Browse files</label>
            <button type="button" className={cx(btn('ghost', 'sm'))} onClick={() => csv.parseText(SAMPLE_CSV, 'sample_supplier.csv', SAMPLE_CSV.length)}>Use sample data</button>
          </div>
          <input ref={input} id="file-in" data-testid="file-input" type="file" accept=".csv,.txt,.xlsx,.xls" className={cx('sr-only')} onChange={e => csv.loadFile(e.target.files[0])} />
        </div>
        {csv.error && <p className={cx('alert err-a')} role="alert"><AlertTriangle size={16} />{csv.error}</p>}
      </div>

      <div className={cx('card panel')}>
        <div className={cx('panel-h')}><h2>File summary</h2></div>
        {!csv.file ? <p className={cx('empty')}>No file yet. Upload a CSV or use the sample to see the preview.</p> : (
          <div className={cx('grid gap-3.5')}>
            <div className={cx('file-row')}>
              <span className={cx('file-ic')}><FileSpreadsheet size={18} /></span>
              <div><b>{csv.file.name}</b><small>{(csv.file.size / 1024).toFixed(1)} KB</small></div>
              <button className={cx('icon-btn')} onClick={reset} aria-label="Remove file"><X size={16} /></button>
            </div>
            <dl className={cx('m-0 grid grid-cols-2 gap-2')}>
              {summary.map(([k, v]) => (
                <div key={k} className={cx('min-w-0 rounded-xl bg-soft px-3 py-2.5')}>
                  <dt className={cx('text-xs text-muted')}>{k}</dt><dd className={cx('m-0 truncate font-bold text-ink')}>{v}</dd>
                </div>
              ))}
            </dl>
            {flagged
              ? <p className={cx('alert warn-a')}><AlertTriangle size={16} />{flagged} rows will be flagged for review.</p>
              : <p className={cx('alert ok-a')}><CheckCircle2 size={16} />File looks good.</p>}
            <Link to="/app/review" onClick={csv.saveForReview} className={cx(btn('brand', 'sm', 'w-full'))}>Continue to review <ArrowRight size={16} className={cx('arrow')} /></Link>
          </div>
        )}
      </div>
    </div>

    {csv.file && (
      <section className={cx('card panel mt-5')} aria-labelledby="pv">
        <div className={cx('panel-h')}><h2 id="pv">Preview</h2><small className={cx('text-muted')}>Showing {Math.min(50, csv.rows.length)} of {csv.rows.length} rows</small></div>
        <div className={cx('table-wrap')} tabIndex={0} role="region" aria-label="CSV preview">
          <table className={cx('tbl')} data-testid="preview-table">
            <thead><tr><th>#</th>{csv.fields.map(f => <th key={f}>{f}{f === csv.cols.sku && <Badge kind="info">SKU</Badge>}</th>)}</tr></thead>
            <tbody>{csv.rows.slice(0, 50).map((r, i) => <tr key={i}><td className={cx('text-muted')}>{i + 1}</td>{csv.fields.map(f => <td key={f}>{r[f]}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>
    )}
  </>)
}
