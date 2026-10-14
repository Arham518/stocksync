import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, XCircle, LayoutDashboard, Upload, Package, Users, Settings, FileSpreadsheet, ShoppingBag } from 'lucide-react'
const rows = [['Wireless Headphones','SPK-001','SPK-001','Matched'],['Smart Watch','SPK-002','SPK-002','Matched'],['Phone Case','SPK-003','—','Missing'],['Charger Cable','SPK-004','SPK-004','Matched'],['Desk Lamp','SPK-005','SPK-005','Price']]
export default function HeroMockup(){
  const reduce = useReducedMotion()
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rx = useSpring(useTransform(my,[-.5,.5],[10,-4]),{stiffness:120,damping:18})
  const ry = useSpring(useTransform(mx,[-.5,.5],[-14,8]),{stiffness:120,damping:18})
  const onMove = e => { if (reduce) return; const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX-r.left)/r.width-.5); my.set((e.clientY-r.top)/r.height-.5) }
  const reset = () => { mx.set(0); my.set(0) }
  return (
    <div className="hm-stage" onMouseMove={onMove} onMouseLeave={reset}>
      <motion.div className="hm-3d" style={{ rotateX:rx, rotateY:ry }} initial={{opacity:0, rotateX:24, y:60}} animate={{opacity:1, y:0}} transition={{duration:1.2, ease:[.22,1,.36,1], delay:.2}}>
        <div className="hm-win" role="img" aria-label="StockSync Pro inventory sync screen showing matched, missing and price-change SKUs">
          <aside className="hm-side">
            <div className="hm-brand"><span/>StockSync Pro</div>
            {[[LayoutDashboard,'Dashboard',1],[Upload,'Imports'],[Package,'Products'],[Users,'Suppliers'],[Settings,'Settings']].map(([I,l,a])=> <div key={l} className={`hm-nav ${a?'on':''}`}><I size={13}/>{l}</div>)}
          </aside>
          <div className="hm-main">
            <div className="hm-title">Inventory Sync</div>
            <div className="hm-steps">{['Upload','Match','Review','Sync'].map((s,i)=> <div key={s} className={`hm-step ${i<3?'done':''}`}><i>{i<3?'✓':i+1}</i>{s}</div>)}</div>
            <div className="hm-table">
              <div className="hm-tr hm-th"><span>Product</span><span>Supplier SKU</span><span>Shopify SKU</span><span>Status</span></div>
              {rows.map((r,i)=> (
                <motion.div key={r[0]} className="hm-tr" initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:.9+i*.09}}>
                  <span>{r[0]}</span><span>{r[1]}</span><span>{r[2]}</span><span><b className={`pill ${r[3].toLowerCase()}`}>{r[3]==='Price'?'Price change':r[3]}</b></span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <motion.div className="hm-float hm-files" style={{translateZ:80}} animate={reduce?{}:{y:[0,-10,0]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}}>
          <span className="f csv"><FileSpreadsheet size={16}/>CSV</span><span className="f xls"><FileSpreadsheet size={16}/>XLSX</span><span className="arrow-line"/><span className="f shop"><ShoppingBag size={16}/>Shopify</span>
        </motion.div>
        <motion.div className="hm-float hm-result" style={{translateZ:110}} animate={reduce?{}:{y:[0,12,0]}} transition={{duration:6,repeat:Infinity,ease:'easeInOut',delay:.5}}>
          <div className="r-h"><CheckCircle2 size={16}/>Sync Complete</div>
          <div className="r-row"><CheckCircle2 size={14} color="#0f9d6e"/><b>124</b> Updated</div>
          <div className="r-row"><AlertTriangle size={14} color="#f59e0b"/><b>8</b> Missing</div>
          <div className="r-row"><XCircle size={14} color="#e5484d"/><b>3</b> Failed</div>
        </motion.div>
      </motion.div>
      <div className="hm-glow" aria-hidden="true"/>
    </div>
  )
}
