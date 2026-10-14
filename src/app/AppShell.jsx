import { cx } from '../styles/ui.js'
import { useEffect, useState } from 'react'
import { NavLink, Routes, Route, useLocation, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronsLeft, Menu, X, Search, LogOut, Moon, Sun } from 'lucide-react'
import { appMenu as menu } from './menu.js'
import CommandPalette from './CommandPalette.jsx'
import Notifications from './Notifications.jsx'
import Logo from '../components/Logo.jsx'
import Dashboard from './Dashboard.jsx'
import Imports from './Imports.jsx'
import Products from './Products.jsx'
import Suppliers from './Suppliers.jsx'
import ReviewSync from './ReviewSync.jsx'
import SyncHistory from './SyncHistory.jsx'
import SettingsPage from './Settings.jsx'
export default function AppShell(){
  const [collapsed,setCollapsed]=useState(false); const [drawer,setDrawer]=useState(false); const [cmd,setCmd]=useState(false)
  const [dark,setDark]=useState(()=>localStorage.getItem('ssp:theme')==='dark')
  useEffect(()=>{ localStorage.setItem('ssp:theme',dark?'dark':'light') },[dark])
  const { pathname } = useLocation()
  useEffect(()=>{ setDrawer(false); window.scrollTo(0,0) },[pathname])
  useEffect(()=>{ const k=e=>e.key==='Escape'&&setDrawer(false); window.addEventListener('keydown',k); return ()=>window.removeEventListener('keydown',k) },[])
  const current = menu.find(m=>m[2]===pathname)?.[1] || 'Dashboard'
  const Side = ({ mobile }) => (
    <aside className={cx(`side ${collapsed&&!mobile?'collapsed':''} ${mobile?'mobile':''}`)} aria-label="App navigation" id={mobile?'app-drawer':undefined}>
      <div className={cx('side-top')}>
        {(!collapsed||mobile) ? <Logo light to="/app"/> : <Link to="/app" className={cx('side-mark')} aria-label="Dashboard"><span/></Link>}
        {mobile ? <button className={cx('icon-btn dark')} onClick={()=>setDrawer(false)} aria-label="Close menu"><X size={20}/></button>
          : <button className={cx('icon-btn dark collapse')} onClick={()=>setCollapsed(c=>!c)} aria-label={collapsed?'Expand sidebar':'Collapse sidebar'} aria-expanded={!collapsed}><ChevronsLeft size={18}/></button>}
      </div>
      <nav className={cx('side-nav')}>
        <p className={cx('side-label')}>Workspace</p>
        {menu.map(([I,l,h])=> (
          <NavLink key={h} to={h} end={h==='/app'} className={cx(({isActive})=>`side-link ${isActive?'active':''}`)} title={collapsed&&!mobile?l:undefined}>
            <I size={19}/><span>{l}</span>
          </NavLink>
        ))}
      </nav>
      <div className={cx('side-foot')}>
        <div className={cx('side-store')}><span className={cx('avatar')}>AS</span><div><b>Acme Supply Store</b><small>acme-supply.myshopify.com</small></div></div>
        <Link to="/" className={cx('side-link')}><LogOut size={19}/><span>Back to website</span></Link>
      </div>
    </aside>
  )
  return (
    <div className={cx(`shell ${collapsed?'is-collapsed':''} ${dark?'dark-app':''}`)}>
      <CommandPalette open={cmd} setOpen={setCmd}/>
      <a href="#app-main" className={cx('skip')}>Skip to content</a>
      <div className={cx('side-desk')}><Side/></div>
      <AnimatePresence>{drawer && (<>
        <motion.div className={cx('scrim')} onClick={()=>setDrawer(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/>
        <motion.div className={cx('drawer')} role="dialog" aria-modal="true" aria-label="Navigation menu" initial={{x:'-100%'}} animate={{x:0}} exit={{x:'-100%'}} transition={{type:'spring',stiffness:320,damping:34}}><Side mobile/></motion.div>
      </>)}</AnimatePresence>
      <div className={cx('main')}>
        <header className={cx('topbar')}>
          <button className={cx('icon-btn burger-app')} onClick={()=>setDrawer(true)} aria-label="Open menu" aria-expanded={drawer} aria-controls="app-drawer"><Menu size={20}/></button>
          <div className={cx('crumb')}><small>StockSync Pro</small><b>{current}</b></div>
          <button className={cx('search')} onClick={()=>setCmd(true)} aria-label="Open search (Ctrl+K)"><Search size={17}/><span className={cx('flex-1 text-left text-sm')}>Search products, SKUs, suppliers…</span><kbd className={cx('rounded-md border border-line px-1.5 text-xs')}>Ctrl K</kbd></button>
          <button className={cx('icon-btn search-sm')} onClick={()=>setCmd(true)} aria-label="Search"><Search size={19}/></button>
          <button className={cx('icon-btn')} onClick={()=>setDark(d=>!d)} aria-label={dark?'Switch to light mode':'Switch to dark mode'}>{dark?<Sun size={19}/>:<Moon size={19}/>}</button>
          <Notifications/>
          <span className={cx('avatar top')} aria-label="Account">AS</span>
        </header>
        <main id="app-main" className={cx('content')}>
          <AnimatePresence mode="wait">
            <motion.div key={pathname} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.35,ease:[.22,1,.36,1]}}>
              <Routes>
                <Route index element={<Dashboard/>}/>
                <Route path="imports" element={<Imports/>}/>
                <Route path="products" element={<Products/>}/>
                <Route path="suppliers" element={<Suppliers/>}/>
                <Route path="review" element={<ReviewSync/>}/>
                <Route path="history" element={<SyncHistory/>}/>
                <Route path="settings" element={<SettingsPage/>}/>
                <Route path="*" element={<Dashboard/>}/>
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
