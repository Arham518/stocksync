import { cx } from '../styles/ui.js'
import { useCallback, useMemo, useState } from 'react'
import { Search, ArrowUpDown, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import { btn } from '../components/ui/button.js'
import { cn } from '../utils/cn.js'
import { PageHead, Badge } from './ui.jsx'
import { products } from '../data/mock.js'
import { useTable } from '../hooks/useTable.js'
import { downloadCsv } from '../utils/csv.js'

const tabs = ['All', 'In stock', 'Low stock', 'Out of stock']
const columns = [['name', 'Product'], ['sku', 'SKU'], ['supplier', 'Supplier'], ['stock', 'Stock', true], ['price', 'Price', true], ['status', 'Status']]
const kind = { 'In stock': 'ok', 'Low stock': 'warn', 'Out of stock': 'err' }
const tabCounts = products.reduce((m, p) => m.set(p.status, (m.get(p.status) ?? 0) + 1), new Map([['All', products.length]]))

export default function Products() {
  const [q, setQ] = useState('')
  const [tab, setTab] = useState('All')
  const needle = q.trim().toLowerCase()
  const filter = useCallback(p => (tab === 'All' || p.status === tab) && `${p.name} ${p.sku} ${p.supplier}`.toLowerCase().includes(needle), [tab, needle])
  const t = useTable(products, { filter })
  const exportRows = useMemo(() => t.sorted.map(({ id, ...r }) => r), [t.sorted])

  return (<>
    <PageHead title="Products" sub="Shopify products linked to supplier SKUs.">
      <button className={cx(btn('ghost', 'sm'))} onClick={() => downloadCsv(exportRows, 'products.csv')}><Download size={16} />Export CSV</button>
    </PageHead>
    <div className={cx('card panel')}>
      <div className={cx('toolbar')}>
        <div className={cx('tabs')} role="tablist">
          {tabs.map(x => <button key={x} role="tab" aria-selected={tab === x} className={cx(cn(tab === x && 'on'))} onClick={() => { setTab(x); t.setPage(0) }}>{x}<span>{tabCounts.get(x) ?? 0}</span></button>)}
        </div>
        <label className={cx('search in')}><Search size={16} /><span className={cx('sr-only')}>Search products</span>
          <input value={q} onChange={e => { setQ(e.target.value); t.setPage(0) }} placeholder="Search name, SKU or supplier" /></label>
      </div>
      <div className={cx('table-wrap')}><table className={cx('tbl')}>
        <thead><tr>{columns.map(([k, l, right]) => (
          <th key={k} className={cx(cn(right && 'r'))} aria-sort={t.sort.key === k ? (t.sort.dir > 0 ? 'ascending' : 'descending') : 'none'}>
            <button className={cx('inline-flex items-center gap-1 hover:text-ink')} onClick={() => t.toggleSort(k)}>{l}<ArrowUpDown size={13} /></button>
          </th>))}</tr></thead>
        <tbody>
          {t.view.map(p => (
            <tr key={p.id}>
              <td><div className={cx('prod')}><span className={cx('thumb')} style={{ '--h': p.id * 37 }}>{p.name[0]}</span><b>{p.name}</b></div></td>
              <td className={cx('mono')}>{p.sku}</td><td>{p.supplier}</td>
              <td className={cx('r')}>{p.stock}</td><td className={cx('r')}>${p.price.toFixed(2)}</td>
              <td><Badge kind={kind[p.status]}>{p.status}</Badge></td>
            </tr>))}
          {!t.view.length && <tr><td colSpan={6} className={cx('empty')}>No products match “{q}” in {tab}. Try another search or the All tab.</td></tr>}
        </tbody>
      </table></div>
      <div className={cx('mt-4 flex items-center justify-between gap-3 text-sm text-muted')}>
        <span>{t.total} products · page {t.page + 1} of {t.pages}</span>
        <div className={cx('flex gap-2')}>
          <button className={cx('icon-btn')} aria-label="Previous page" disabled={t.page === 0} onClick={() => t.setPage(t.page - 1)}><ChevronLeft size={16} /></button>
          <button className={cx('icon-btn')} aria-label="Next page" disabled={t.page >= t.pages - 1} onClick={() => t.setPage(t.page + 1)}><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  </>)
}
