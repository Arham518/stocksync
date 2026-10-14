import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SiteLayout from './components/SiteLayout.jsx'
import Home from './pages/Home.jsx'
import { ProblemPage, WorkflowPage, FeaturesPage, HowPage, TourPage, SuppliersPage, SafetyPage, AutomationPage, PricingPage, FaqPage, GetStartedPage } from './pages/SectionPages.jsx'
import { Integrations, Security, UseCases, Roadmap, Docs, About } from './pages/Extra.jsx'
import Contact from './pages/Contact.jsx'
import { Privacy, Terms } from './pages/Legal.jsx'
import Auth from './pages/Auth.jsx'
import NotFound from './pages/NotFound.jsx'
const AppShell = lazy(()=>import('./app/AppShell.jsx'))

const titles = { '/':'StockSync Pro — Shopify Inventory Sync', '/features':'Features', '/how-it-works':'How It Works', '/pricing':'Pricing', '/faq':'FAQ', '/contact':'Contact', '/privacy':'Privacy Policy', '/terms':'Terms of Service', '/why-stocksync':'Why StockSync', '/workflow':'Workflow', '/product-tour':'Product Tour', '/suppliers-management':'Supplier Management', '/review-first':'Review First', '/automation':'Automation', '/get-started':'Get Started', '/integrations':'Integrations', '/security':'Security & Data', '/use-cases':'Use Cases', '/roadmap':'Roadmap', '/docs':'Help Center', '/about':'About', '/login':'Log in', '/signup':'Get Started Free' }
function TitleSync(){
  const { pathname } = useLocation()
  useEffect(()=>{
    const t = titles[pathname]
    document.title = pathname==='/' ? titles['/'] : t ? `${t} · StockSync Pro` : pathname.startsWith('/app') ? 'Dashboard · StockSync Pro' : 'StockSync Pro'
  },[pathname])
  return null
}
export default function App(){
  return (<>
    <TitleSync/>
    <Routes>
      <Route element={<SiteLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="why-stocksync" element={<ProblemPage/>}/>
        <Route path="workflow" element={<WorkflowPage/>}/>
        <Route path="features" element={<FeaturesPage/>}/>
        <Route path="product-tour" element={<TourPage/>}/>
        <Route path="suppliers-management" element={<SuppliersPage/>}/>
        <Route path="review-first" element={<SafetyPage/>}/>
        <Route path="automation" element={<AutomationPage/>}/>
        <Route path="get-started" element={<GetStartedPage/>}/>
        <Route path="integrations" element={<Integrations/>}/>
        <Route path="security" element={<Security/>}/>
        <Route path="use-cases" element={<UseCases/>}/>
        <Route path="roadmap" element={<Roadmap/>}/>
        <Route path="docs" element={<Docs/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="how-it-works" element={<HowPage/>}/>
        <Route path="pricing" element={<PricingPage/>}/>
        <Route path="faq" element={<FaqPage/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="privacy" element={<Privacy/>}/>
        <Route path="terms" element={<Terms/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
      <Route path="login" element={<Auth mode="login"/>}/>
      <Route path="signup" element={<Auth mode="signup"/>}/>
      <Route path="app/*" element={<Suspense fallback={<div style={{minHeight:'100vh',display:'grid',placeItems:'center',color:'#5d6d66'}}>Loading dashboard…</div>}><AppShell/></Suspense>}/>
    </Routes>
  </>)
}
