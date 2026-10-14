import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { TopLevel, Problem, Solution, Features, HowItWorks, DashboardPreview, Suppliers, Safety, Automation, Pricing, Faq, FinalCta } from '../components/Sections.jsx'
import { tour } from '../data/site.js'
function Pager(){
  const { pathname } = useLocation(); const i = tour.findIndex(t=>t.to===pathname)
  if (i<0) return null
  const prev = tour[i-1], next = tour[i+1]
  return (
    <nav className="wrap pager" aria-label="Product tour">
      {prev ? <Link to={prev.to} className="pg prev"><small><ArrowLeft size={14}/>Previous</small><b>{prev.label}</b></Link> : <span/>}
      {next && <Link to={next.to} className="pg next"><small>Next<ArrowRight size={14}/></small><b>{next.label}</b></Link>}
    </nav>
  )
}
const Page = ({ children, cta=true }) => (<><TopLevel.Provider value={true}><div className="spage">{children}</div></TopLevel.Provider><Pager/>{cta && <div style={{paddingTop:40}}><FinalCta/></div>}</>)
export const ProblemPage = () => <Page><Problem/></Page>
export const WorkflowPage = () => <Page><Solution/></Page>
export const FeaturesPage = () => <Page><Features/></Page>
export const HowPage = () => <Page><HowItWorks/></Page>
export const TourPage = () => <Page><DashboardPreview/></Page>
export const SuppliersPage = () => <Page><Suppliers/></Page>
export const SafetyPage = () => <Page><Safety/></Page>
export const AutomationPage = () => <Page><Automation/></Page>
export const PricingPage = () => <Page><Pricing/></Page>
export const FaqPage = () => <Page><Faq/></Page>
export const GetStartedPage = () => <><TopLevel.Provider value={true}><div className="spage gs"><FinalCta/></div></TopLevel.Provider><Pager/></>
