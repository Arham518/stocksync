import { cx } from '../styles/ui.js'
import { useEffect, useRef, useState } from 'react'
import { Bell, CheckCheck } from '../components/icons.js'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../utils/cn.js'
import { activity } from '../data/mock.js'

const tone = { ok: 'bg-brand', warn: 'bg-amber-500', err: 'bg-red-500', info: 'bg-blue-500' }
export default function Notifications() {
  const [open, setOpen] = useState(false)
  const [read, setRead] = useState(() => new Set())
  const ref = useRef(null)
  const unread = activity.filter(a => !read.has(a.t)).length
  useEffect(() => {
    if (!open) return
    const close = e => { if (!ref.current?.contains(e.target) || e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', close); document.addEventListener('keydown', close)
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', close) }
  }, [open])
  return (
    <div ref={ref} className={cx('relative')}>
      <button className={cx('icon-btn')} aria-label={`Notifications, ${unread} unread`} aria-expanded={open} onClick={() => setOpen(o => !o)}>
        <Bell size={19} />{unread > 0 && <i className={cx('absolute right-2 top-2 size-2 rounded-full bg-red-500 ring-2 ring-white')} />}
      </button>
      <AnimatePresence>{open && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
          className={cx('absolute right-0 top-12 z-50 w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-line bg-white p-2 shadow-deep')}>
          <div className={cx('flex items-center justify-between px-3 py-2')}>
            <b className={cx('font-display text-ink')}>Notifications</b>
            <button className={cx('inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:underline')} onClick={() => setRead(new Set(activity.map(a => a.t)))}><CheckCheck size={14} />Mark all read</button>
          </div>
          <ul>{activity.map(a => (
            <li key={a.t}><button onClick={() => setRead(new Set(read).add(a.t))} className={cx(cn('flex w-full gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-soft', read.has(a.t) && 'opacity-55'))}>
              <span className={cx(cn('mt-1.5 size-2 flex-none rounded-full', tone[a.type]))} />
              <span className={cx('min-w-0 flex-1')}><b className={cx('block text-sm text-ink')}>{a.t}</b><small className={cx('text-xs text-muted')}>{a.d} · {a.time}</small></span>
            </button></li>))}</ul>
        </motion.div>)}
      </AnimatePresence>
    </div>
  )
}
