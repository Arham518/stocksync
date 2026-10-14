import { cx } from '../styles/ui.js'
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
    <section className={cx('section teasers')}>
      <div className={cx('wrap')}>
        <div className={cx('sec-head center')}>
          <Reveal><span className={cx('eyebrow')}>Explore StockSync Pro</span></Reveal>
          <Reveal delay={.05}><h2 className={cx('h2')}>One organized workflow, from supplier file to Shopify</h2></Reveal>
        </div>
        <div className={cx('teaser-grid')}>
          {items.map((t,i)=> (
            <Reveal key={t.to} delay={(i%3)*.07} className={cx(`teaser-wrap ${i===0||i===4?'big':''}`)}>
              <Link to={t.to} className={cx('teaser card')}>
                <span className={cx('tz-ic')}><Icon name={t.icon} size={22}/></span>
                <small>{String(i+1).padStart(2,'0')} · {t.label}</small>
                <h3>{t.title}</h3>
                <span className={cx('tz-go')}>Explore <ArrowUpRight size={16}/></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
    <FinalCta/>
  </>)
}
