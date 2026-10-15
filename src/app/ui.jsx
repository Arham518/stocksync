import { cx } from '../styles/ui.js'
export const PageHead = ({ title, sub, children }) => (
  <div className={cx('phead')}><div><h1>{title}</h1>{sub&&<p>{sub}</p>}</div>{children&&<div className={cx('phead-act')}>{children}</div>}</div>
)
export const Badge = ({ kind, children }) => <span className={cx(`badge b-${kind}`)}>{children}</span>
export const EmptyState = ({ title, children }) => (
  <div className={cx('card panel')}><div className={cx('empty')} role="status"><b className="block text-ink">{title}</b>{children}</div></div>
)
