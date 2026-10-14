import { cx } from '../styles/ui.js'
import { btn } from '../components/ui/button.js'
import { Link } from 'react-router-dom'
export default function NotFound(){ return (<section className={cx('section')}><div className={cx('wrap')} style={{textAlign:'center',display:'grid',gap:18,justifyItems:'center'}}><span className={cx('eyebrow')}>404</span><h1 className={cx('h2')}>This page could not be found.</h1><Link to="/" className={cx(btn('primary','md'))}>Back to home</Link></div></section>) }
