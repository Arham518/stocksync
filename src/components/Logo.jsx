import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { cx } from '../styles/ui.js'

// Brand mark: the TradeMatrix logo animation, looping muted in a rounded square.
export function LogoMark({ size = 34, className }) {
  const reduce = useReducedMotion()
  return (
    <motion.span aria-hidden="true" className={className}
      style={{ width: size, height: size, borderRadius: size * 0.26, overflow: 'hidden', display: 'inline-block', flex: 'none',
        background: '#0b2b26', boxShadow: '0 0 0 1px rgba(241,226,184,.35), 0 6px 16px -6px rgba(4,65,46,.55)' }}
      initial={reduce ? false : { opacity: 0, scale: .86 }} animate={{ opacity: 1, scale: 1 }}
      variants={{ hover: { scale: 1.06 } }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }}>
      <video src="/logo.mp4" poster="/logo-poster.jpg" autoPlay={!reduce} muted loop playsInline preload="auto" aria-hidden="true"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </motion.span>
  )
}

/** The only logo in the app: mark + wordmark. `compact` renders the mark alone. */
export default function Logo({ light = false, to = '/', compact = false }) {
  return (
    <Link to={to} aria-label="TradeMatrix home" className={cx('logo group inline-flex items-center gap-2.5')}>
      <motion.span initial="initial" whileHover="hover" animate="initial" className="inline-flex items-center gap-2.5">
        <LogoMark />
        {!compact && (
          <span className={`font-serif text-[21px] font-semibold leading-none tracking-[-.01em] ${light ? 'text-white' : 'text-ink'}`}>
            Trade<span className={light ? 'text-[#e6d3a8]' : 'text-gold'}>Matrix</span>
          </span>
        )}
      </motion.span>
    </Link>
  )
}
