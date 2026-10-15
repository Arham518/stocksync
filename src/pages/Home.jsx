import { cx } from '../styles/ui.js'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from '../components/icons.js'
import { Hero, FinalCta } from '../components/Sections.jsx'
import Reveal from '../components/Reveal.jsx'
import { IconTile } from '../components/Icon.jsx'
import { tour } from '../data/site.js'
// Asymmetric 12-column rhythm: 7/5, 4/4/4, 5/7, 6/6, 5/7 (wraps for longer lists)
const spans = ['lg:col-span-7','lg:col-span-5','lg:col-span-4','lg:col-span-4','lg:col-span-4','lg:col-span-5','lg:col-span-7','lg:col-span-6','lg:col-span-6','lg:col-span-5','lg:col-span-7']

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
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {items.map((t,i)=> (
            <Reveal key={t.to} delay={(i%3)*.07} className={spans[i%spans.length]}>
              <Link to={t.to} className={cx('teaser card group')}>
                <IconTile name={t.icon}/>
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
