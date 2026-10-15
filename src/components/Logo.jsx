import { useId } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { cx } from '../styles/ui.js'

// Hand-built mark: stacked SKU layers (ivory) inside a champagne-gold sync arc, on deep emerald.
const ARCS = 'M12.06 22.70A22 22 0 0 1 48.35 17.28M51.94 41.30A22 22 0 0 1 15.65 46.72'
const HEADS = 'M51.48 20.76L49.53 13.77L44.74 18.08ZM12.52 43.24L14.47 50.23L19.26 45.92Z'
const spin = { initial: { rotate: 0 }, hover: { rotate: 180, transition: { type: 'spring', stiffness: 90, damping: 14 } } }

export function LogoMark({ size = 34, className }) {
  const id = useId()
  const reduce = useReducedMotion()
  return (
    <motion.svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" focusable="false" className={className}
      initial={reduce ? false : { opacity: 0, scale: .86 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }}>
      <defs>
        <linearGradient id={`${id}e`} x1="8" y1="2" x2="56" y2="62" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#12936a" /><stop offset=".55" stopColor="#0a6b4b" /><stop offset="1" stopColor="#04412e" /></linearGradient>
        <linearGradient id={`${id}g`} x1="10" y1="14" x2="54" y2="50" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ecd9a6" /><stop offset="1" stopColor="#c29b52" /></linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="15" fill={`url(#${id}e)`} />
      <rect x="2.75" y="2.75" width="58.5" height="58.5" rx="14.3" fill="none" stroke="#f1e2b8" strokeOpacity=".28" strokeWidth="1.1" />
      <motion.g variants={spin} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <path d={ARCS} fill="none" stroke={`url(#${id}g)`} strokeWidth="2.7" strokeLinecap="round" />
        <path d={HEADS} fill={`url(#${id}g)`} stroke={`url(#${id}g)`} strokeWidth="1" strokeLinejoin="round" />
      </motion.g>
      <path d="M32 19.5L44.5 26.5L32 33.5L19.5 26.5Z" fill="#fbf6e9" stroke="#fbf6e9" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M19.5 31.2L32 38.2L44.5 31.2M19.5 36L32 43L44.5 36" fill="none" stroke="#fbf6e9" strokeOpacity=".92" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  )
}

/** The only logo in the app: mark + wordmark. `compact` renders the mark alone. */
export default function Logo({ light = false, to = '/', compact = false }) {
  return (
    <Link to={to} aria-label="StockSync Pro home" className={cx('logo group inline-flex items-center gap-2.5')}>
      <motion.span initial="initial" whileHover="hover" animate="initial" className="inline-flex items-center gap-2.5">
        <LogoMark />
        {!compact && (
          <span className={`font-serif text-[21px] font-semibold leading-none tracking-[-.01em] ${light ? 'text-white' : 'text-ink'}`}>
            StockSync <span className={`font-sans text-[11px] font-semibold uppercase tracking-[.2em] ${light ? 'text-[#e6d3a8]' : 'text-gold'}`}>Pro</span>
          </span>
        )}
      </motion.span>
    </Link>
  )
}
