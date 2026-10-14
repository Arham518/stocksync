import { Link } from 'react-router-dom'
export default function Logo({ light=false, to='/' }){
  return (
    <Link to={to} className="logo" aria-label="StockSync Pro home" style={{display:'inline-flex',alignItems:'center',gap:10,fontFamily:'var(--f-display)',fontWeight:800,fontSize:19,letterSpacing:'-.02em',color:light?'#fff':'var(--ink)'}}>
      <svg width="32" height="32" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#10b981"/><stop offset="1" stopColor="#047857"/></linearGradient></defs><rect width="64" height="64" rx="16" fill="url(#lg)"/><path d="M20 26a12 12 0 0 1 21-6l3-3v10h-10l3.5-3.5A7 7 0 0 0 25 26z M44 38a12 12 0 0 1-21 6l-3 3V37h10l-3.5 3.5A7 7 0 0 0 39 38z" fill="#fff"/></svg>
      <span>StockSync <span style={{color:light?'#6ee7b7':'var(--brand)'}}>Pro</span></span>
    </Link>
  )
}
