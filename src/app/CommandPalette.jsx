import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, CornerDownLeft } from 'lucide-react'
import { cn } from '../utils/cn.js'
import { products, suppliers } from '../data/mock.js'
import { appMenu } from './menu.js'

const index = [
  ...appMenu.map(([, label, to]) => ({ group: 'Pages', label, to })),
  ...products.map(p => ({ group: 'Products', label: `${p.name} · ${p.sku}`, to: '/app/products' })),
  ...suppliers.map(s => ({ group: 'Suppliers', label: s.name, to: '/app/suppliers' })),
]

export default function CommandPalette({ open, setOpen }) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const nav = useNavigate()
  const inputRef = useRef(null)

  useEffect(() => {
    const onKey = e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(o => !o) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])
  useEffect(() => { if (open) { setQ(''); setActive(0); setTimeout(() => inputRef.current?.focus(), 30) } }, [open])

  const results = useMemo(() => {
    const n = q.trim().toLowerCase()
    return (n ? index.filter(i => i.label.toLowerCase().includes(n)) : index.filter(i => i.group === 'Pages')).slice(0, 8)
  }, [q])
  const go = item => { if (!item) return; nav(item.to); setOpen(false) }
  const onKey = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)) }
    else if (e.key === 'Enter') go(results[active])
    else if (e.key === 'Escape') setOpen(false)
  }

  return (
    <AnimatePresence>{open && (
      <motion.div className="fixed inset-0 z-[90] grid place-items-start bg-ink/50 px-4 pt-[12vh] backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
        <motion.div role="dialog" aria-modal="true" aria-label="Command palette" onClick={e => e.stopPropagation()}
          className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-white shadow-deep"
          initial={{ y: -16, scale: .97 }} animate={{ y: 0, scale: 1 }} exit={{ y: -8, scale: .98 }} transition={{ duration: .2 }}>
          <div className="flex items-center gap-3 border-b border-line px-4">
            <Search size={18} className="text-muted" />
            <input ref={inputRef} value={q} onChange={e => { setQ(e.target.value); setActive(0) }} onKeyDown={onKey}
              placeholder="Search pages, products, suppliers…" aria-label="Search" className="h-14 w-full bg-transparent outline-none" />
            <kbd className="rounded-md border border-line px-1.5 text-xs text-muted">Esc</kbd>
          </div>
          <ul className="max-h-80 overflow-auto p-2" role="listbox">
            {results.map((r, i) => (
              <li key={r.group + r.label} role="option" aria-selected={i === active}>
                <button onMouseEnter={() => setActive(i)} onClick={() => go(r)}
                  className={cn('flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm', i === active && 'bg-soft')}>
                  <span><small className="mr-2 text-xs font-semibold uppercase tracking-wider text-brand-700">{r.group}</small>{r.label}</span>
                  {i === active && <CornerDownLeft size={14} className="text-muted" />}
                </button>
              </li>))}
            {!results.length && <li className="p-6 text-center text-sm text-muted">No results for “{q}”.</li>}
          </ul>
        </motion.div>
      </motion.div>)}
    </AnimatePresence>
  )
}
