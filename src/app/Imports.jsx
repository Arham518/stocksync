import { cx } from '../styles/ui.js'
import { btn } from '../components/ui/button.js'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { UploadCloud, FileSpreadsheet, X, Download, AlertTriangle, CheckCircle2, ArrowRight, Loader2 } from '../components/icons.js'
import { PageHead, Badge } from './ui.jsx'
import { suppliers, SAMPLE_CSV } from '../data/mock.js'
import { useCsvImport } from '../hooks/useCsvImport.js'
import { ACCEPT } from '../utils/parseFile.js'
import { APPLICABLE } from '../utils/sku.js'

const FIELDS = [['sku', 'SKU', true], ['qty', 'Quantity', true], ['price', 'Price', false]]

export default function Imports() {
  const csv = useCsvImport()
  const [drag, setDrag] = useState(false)
  const input = useRef(null)
  const applicable = csv.diff.filter(r => APPLICABLE.has(r.flag)).length
  const problems = csv.diff.filter(r => !APPLICABLE.has(r.flag))
  const reset = () => { csv.reset(); if (input.current) input.current.value = '' }

  return (<>
    <PageHead title="Imports" sub="Upload a supplier file. It is parsed in your browser — nothing leaves your computer.">
      <a href="/sample-supplier.csv" download className={cx(btn('ghost', 'sm'))}><Download size={16} />Sample CSV</a>
    </PageHead>
    <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
      <div className={cx('card panel')}>
        <div className={cx('field mb-4')}><label htmlFor="sup">Supplier</label>
          <select id="sup">{suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
        <div className={cx(`drop ${drag ? 'drag' : ''}`)}
          onDragOver={e => { e.preventDefault(); setDrag(true) }} onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); csv.loadFile(e.dataTransfer.files[0]) }}>
          <span className={cx('drop-ic')}><UploadCloud size={30} /></span>
          <b>Drag & drop your supplier file</b>
          <small>Accepted: .csv, .xlsx, .xls · Max 5 MB · First row must contain column headers</small>
          <div className="mt-2.5 flex flex-wrap justify-center gap-2.5">
            <label className={cx(btn('primary', 'sm', 'cursor-pointer'))} htmlFor="file-in">Browse files</label>
            <button type="button" className={cx(btn('ghost', 'sm'))} onClick={() => csv.loadText(SAMPLE_CSV, 'sample-supplier.csv')}>Use sample data</button>
          </div>
          <input ref={input} id="file-in" data-testid="file-input" type="file" accept={ACCEPT} className={cx('sr-only')} onChange={e => csv.loadFile(e.target.files[0])} />
        </div>
        {csv.status === 'parsing' && <p className={cx('alert')} role="status"><Loader2 size={16} className={cx('spin')} />Reading {csv.file.name}…</p>}
        {csv.error && <div className={cx('alert err-a')} role="alert"><AlertTriangle size={16} /><span><b>Upload failed.</b> {csv.error}</span></div>}
      </div>

      <div className={cx('card panel')}>
        <div className={cx('panel-h')}><h2>File summary</h2></div>
        {csv.status !== 'parsed' ? <p className={cx('empty')}>No file parsed yet. Upload a supplier file or use the sample data to see a preview.</p> : (
          <div className="grid gap-3.5" data-testid="summary">
            <div className={cx('file-row')}>
              <span className={cx('file-ic')}><FileSpreadsheet size={18} /></span>
              <div><b>{csv.file.name}</b><small>{(csv.file.size / 1024).toFixed(1)} KB · {csv.rows.length} rows · {csv.fields.length} columns</small></div>
              <button className={cx('icon-btn')} onClick={reset} aria-label="Remove file"><X size={16} /></button>
            </div>

            <fieldset className="grid gap-2.5 rounded-xl border border-line p-3" data-testid="mapping">
              <legend className="px-1 text-sm font-semibold text-ink">Column mapping</legend>
              {!csv.mapping.certain && <p className={cx('alert warn-a mt-0')}><AlertTriangle size={16} />We couldn't confidently detect the columns. Please confirm them.</p>}
              {FIELDS.map(([key, label, required]) => (
                <div key={key} className={cx('field')}>
                  <label htmlFor={`map-${key}`}>{label}{required ? ' *' : ' (optional)'}</label>
                  <select id={`map-${key}`} value={csv.mapping[key] ?? ''} onChange={e => csv.setColumn(key, e.target.value)}>
                    <option value="">{required ? 'Select a column…' : 'Not provided'}</option>
                    {csv.fields.map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>))}
            </fieldset>

            {!csv.ready ? <p className={cx('alert warn-a')}><AlertTriangle size={16} />Map SKU and Quantity to continue.</p>
              : applicable === 0 ? (
                <div className={cx('alert err-a')} role="alert" data-testid="no-valid"><AlertTriangle size={16} /><span><b>No valid rows to sync.</b> Fix the issues below and upload the file again.</span></div>
              ) : (<>
                <dl className="m-0 grid grid-cols-3 gap-2">
                  {[['Ready', applicable], ['Price changes', csv.counts.get('price') ?? 0], ['Flagged', problems.length]].map(([k, v]) => (
                    <div key={k} className="min-w-0 rounded-xl bg-soft px-3 py-2.5"><dt className="text-xs text-muted">{k}</dt><dd className="m-0 font-bold text-ink">{v}</dd></div>))}
                </dl>
                <Link to="/app/review" onClick={csv.saveForReview} className={cx(btn('brand', 'sm', 'w-full'))}>Continue to review <ArrowRight size={16} className={cx('arrow')} /></Link>
              </>)}
            {csv.ready && problems.length > 0 && (
              <details className="rounded-xl border border-line p-3 text-sm" open={applicable === 0}>
                <summary className="cursor-pointer font-semibold text-ink">{problems.length} row{problems.length > 1 ? 's' : ''} need attention</summary>
                <ul className="mt-2 grid max-h-48 gap-1 overflow-auto">{problems.map((r, i) => <li key={i} className="text-muted">Row {r.row} · <span className={cx('mono')}>{r.sku}</span> · {r.reason}</li>)}</ul>
              </details>)}
          </div>
        )}
      </div>
    </div>

    {csv.status === 'parsed' && (
      <section className={cx('card panel mt-5')} aria-labelledby="pv">
        <div className={cx('panel-h')}><h2 id="pv">Preview</h2><small className="text-muted">Showing {Math.min(50, csv.rows.length)} of {csv.rows.length} rows</small></div>
        <div className={cx('table-wrap')} tabIndex={0} role="region" aria-label="File preview">
          <table className={cx('tbl')} data-testid="preview-table">
            <thead><tr><th>#</th>{csv.fields.map(f => <th key={f}>{f}{FIELDS.filter(([k]) => csv.mapping[k] === f).map(([k, l]) => <Badge key={k} kind="info">{l}</Badge>)}</th>)}</tr></thead>
            <tbody>{csv.rows.slice(0, 50).map((r, i) => <tr key={i}><td className="text-muted">{i + 2}</td>{csv.fields.map(f => <td key={f}>{r[f]}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>
    )}
  </>)
}
