import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
export default function SiteLayout(){
  const { pathname, hash } = useLocation()
  useEffect(()=>{
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration:1.1, smoothWheel:true })
    window.__lenis = lenis
    let id; const raf = t => { lenis.raf(t); id = requestAnimationFrame(raf) }; id = requestAnimationFrame(raf)
    return ()=>{ cancelAnimationFrame(id); lenis.destroy(); window.__lenis = null }
  },[])
  useEffect(()=>{
    if (hash){ const el = document.querySelector(hash); if (el){ setTimeout(()=> window.__lenis ? window.__lenis.scrollTo(el,{offset:-80}) : el.scrollIntoView(),50); return } }
    window.__lenis ? window.__lenis.scrollTo(0,{immediate:true}) : window.scrollTo(0,0)
  },[pathname,hash])
  return (<>
    <a href="#main" className="skip">Skip to content</a>
    <Navbar/>
    <main id="main"><Outlet/></main>
    <Footer/>
  </>)
}
