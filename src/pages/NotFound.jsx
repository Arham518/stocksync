import { btn } from '../components/ui/button.js'
import { Link } from 'react-router-dom'
export default function NotFound(){ return (<section className="section"><div className="wrap" style={{textAlign:'center',display:'grid',gap:18,justifyItems:'center'}}><span className="eyebrow">404</span><h1 className="h2">This page could not be found.</h1><Link to="/" className={btn('primary','md')}>Back to home</Link></div></section>) }
