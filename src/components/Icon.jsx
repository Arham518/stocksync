import * as icons from './icons.js'
import { cn } from '../utils/cn.js'

/** Render an icon by its map name (used by data-driven content). */
export default function Icon({ name, ...props }) {
  const C = icons[name] ?? icons.Circle
  return <C {...props} />
}

const sizes = { sm: ['size-9 rounded-[11px]', 17], md: ['size-12 rounded-[14px]', 22], lg: ['size-14 rounded-2xl', 26] }

/** Refined icon container. Put `group` on the parent card to enable the hover micro-animation. */
export function IconTile({ name, as: Comp, size = 'md', dark = false, className }) {
  const [box, px] = sizes[size]
  const C = Comp ?? icons[name] ?? icons.Circle
  return (
    <span className={cn('grid shrink-0 place-items-center border shadow-[inset_0_1px_0_rgba(255,255,255,.7)] transition-all duration-500 ease-premium group-hover:-translate-y-0.5',
      dark ? 'border-[#e6d3a8]/25 bg-white/[.07] text-[#e6d3a8] group-hover:border-[#e6d3a8]/50'
           : 'border-gold-200/70 bg-gradient-to-br from-brand-50 via-white to-gold-50 text-brand-700 group-hover:border-gold/60 group-hover:shadow-soft', box, className)}>
      <span className="transition-transform duration-500 ease-premium group-hover:-rotate-6 group-hover:scale-110"><C size={px} strokeWidth={1.75} /></span>
    </span>
  )
}
