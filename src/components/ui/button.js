import { cn } from '../../utils/cn.js'
const base = 'group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full border border-transparent font-semibold transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50 [&_svg.arrow]:transition-transform [&:hover_svg.arrow]:translate-x-1'
const variants = {
  primary: 'bg-ink text-white shadow-[0_8px_20px_-8px_rgba(11,26,20,.5)] before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-brand-700 before:to-brand before:opacity-0 before:transition-opacity hover:before:opacity-100 hover:shadow-[0_16px_30px_-10px_rgba(15,157,110,.55)]',
  brand: 'bg-brand text-white shadow-[0_10px_24px_-10px_rgba(15,157,110,.7)] hover:bg-brand-700',
  ghost: 'border-line-2 bg-white text-ink hover:border-ink hover:shadow-soft',
  gold: 'bg-gradient-to-r from-[#ecd9a6] to-[#c29b52] text-ink shadow-[0_10px_24px_-10px_rgba(194,155,82,.8)] hover:brightness-105',
  light: 'bg-white text-ink hover:shadow-[0_14px_30px_-10px_rgba(0,0,0,.4)]',
  outlineLight: 'border-white/25 bg-white/5 text-white hover:border-white hover:bg-white/10',
}
const sizes = { md: 'h-12 px-[22px] text-[15px]', sm: 'h-10 px-4 text-sm' }
export const btn = (variant = 'primary', size = 'md', className) => cn(base, variants[variant], sizes[size], className)
