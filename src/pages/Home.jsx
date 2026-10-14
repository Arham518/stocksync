import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Hero, FinalCta } from '../components/Sections.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { tour } from '../data/site.js'
export default function Home(){
  const items = tour.filter(t=>t.to!=='/get-started')
  return (<>
    <Hero/>
    <section className="section teasers">
      <div className="wrap">
        <div className="sec-head center">
          <Reveal><span className="eyebrow">Explore StockSync Pro</span></Reveal>
          <Reveal delay={.05}><h2 className="h2">One organized workflow, from supplier file to Shopify</h2></Reveal>
        </div>
        <div className="teaser-grid">
          {items.map((t,i)=> (
            <Reveal key={t.to} delay={(i%3)*.07} className={`teaser-wrap ${i===0||i===4?'big':''}`}>
              <Link to={t.to} className="teaser card">
                <span className="tz-ic"><Icon name={t.icon} size={22}/></span>
                <small>{String(i+1).padStart(2,'0')} · {t.label}</small>
                <h3>{t.title}</h3>
                <span className="tz-go">Explore <ArrowUpRight size={16}/></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
    <FinalCta/>
  </>)
}
