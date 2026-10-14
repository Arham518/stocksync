import { cx } from '../styles/ui.js'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { footerCols } from '../data/content.js'
export default function Footer(){
  return (
    <footer className={cx('foot')}>
      <div className={cx('wrap')}>
        <div className={cx('foot-top')}>
          <div className={cx('foot-brand')}>
            <Logo light/>
            <p>StockSync Pro helps Shopify merchants streamline supplier inventory imports, bulk stock updates, price management, and synchronization reporting.</p>
          </div>
          <nav aria-label="Footer" className={cx('foot-cols')}>
            {footerCols.map(([t,ls])=> <div key={t} className={cx('foot-links')}><b>{t}</b>{ls.map(([l,h])=> <Link key={h} to={h}>{l}</Link>)}</div>)}
          </nav>
        </div>
        <div className={cx('foot-tag')} aria-hidden="false">Less Manual Work. Better Inventory Control. More Time to Grow.</div>
        <div className={cx('foot-bottom')}><span>© {new Date().getFullYear()} StockSync Pro. All rights reserved.</span><span>Built for Shopify merchants.</span></div>
      </div>
    </footer>
  )
}
