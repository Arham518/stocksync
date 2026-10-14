import { cx } from '../styles/ui.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import { cn } from '../utils/cn.js'

const steps = [
  ['Connect your Shopify store', '/app/settings', true],
  ['Add a supplier profile', '/app/suppliers', true],
  ['Map SKU, quantity and price columns', '/app/suppliers', true],
  ['Upload your first supplier file', '/app/imports', false],
  ['Review changes and run your first sync', '/app/review', false],
]
const done = steps.filter(s => s[2]).length

export default function Onboarding() {
  const [hidden, setHidden] = useState(() => localStorage.getItem('ssp:onboarding') === 'hidden')
  if (hidden) return null
  const hide = () => { localStorage.setItem('ssp:onboarding', 'hidden'); setHidden(true) }
  return (
    <section className={cx('card panel mb-5')} aria-labelledby="ob">
      <div className={cx('panel-h')}>
        <div><h2 id="ob">Get set up</h2><small className={cx('text-muted')}>{done} of {steps.length} steps complete</small></div>
        <button className={cx('icon-btn')} onClick={hide} aria-label="Dismiss setup checklist"><X size={16} /></button>
      </div>
      <div className={cx('mb-4 h-2 overflow-hidden rounded-full bg-soft')}><div className={cx('h-full rounded-full bg-gradient-to-r from-brand to-mint')} style={{ width: `${(done / steps.length) * 100}%` }} /></div>
      <ol className={cx('grid gap-2 sm:grid-cols-2 lg:grid-cols-5')}>
        {steps.map(([label, to, ok], i) => (
          <li key={label}>
            <Link to={to} className={cx(cn('flex h-full items-start gap-3 rounded-xl border border-line p-3 text-sm transition hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-soft', ok && 'bg-soft'))}>
              <span className={cx(cn('grid size-6 flex-none place-items-center rounded-full text-xs font-bold', ok ? 'bg-brand text-white' : 'border border-line-2 text-muted'))}>{ok ? <Check size={13} strokeWidth={3} /> : i + 1}</span>
              <span className={cx(cn(ok && 'text-muted line-through'))}>{label}</span>
            </Link>
          </li>))}
      </ol>
    </section>
  )
}
