export const PageHead = ({ title, sub, children }) => (
  <div className="phead"><div><h1>{title}</h1>{sub&&<p>{sub}</p>}</div>{children&&<div className="phead-act">{children}</div>}</div>
)
export const Badge = ({ kind, children }) => <span className={`badge b-${kind}`}>{children}</span>
