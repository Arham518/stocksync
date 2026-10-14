import { cx } from '../styles/ui.js'
import { PageHero } from '../components/Sections.jsx'
const Doc = ({ eyebrow, title, sections }) => (<>
  <PageHero eyebrow={eyebrow} title={title} lead="Last updated: October 2026"/>
  <section className={cx('section')} style={{paddingTop:40}}><div className={cx('wrap legal')}>
    {sections.map(([h,p])=> <article key={h}><h2>{h}</h2><p>{p}</p></article>)}
    <p className={cx('note')}>This document is a template for a product in development and is not legal advice.</p>
  </div></section>
</>)
export const Privacy = () => <Doc eyebrow="Legal" title="Privacy Policy" sections={[
  ['Information we collect','Account details you provide (name, email, store name) and the supplier files you upload for processing.'],
  ['How we use information','To match SKUs, prepare inventory updates for your review, run synchronizations you confirm, and send notifications you enable.'],
  ['Shopify data','StockSync Pro only accesses the Shopify data allowed by the API permissions you grant, and only to perform inventory and price updates.'],
  ['Data retention','Uploaded files and sync history are kept so you can review previous updates. You can request deletion at any time.'],
  ['Contact','Questions about privacy can be sent through the Contact page.'],
]}/>
export const Terms = () => <Doc eyebrow="Legal" title="Terms of Service" sections={[
  ['Using StockSync Pro','You are responsible for the supplier files you upload and for reviewing changes before confirming a synchronization.'],
  ['Accounts','Keep your login details secure. You are responsible for activity on your account.'],
  ['Shopify integration','Synchronization depends on Shopify API availability, permissions and platform limits.'],
  ['Plans','Pricing and usage limits will be announced once plans are finalized.'],
  ['Changes','These terms may be updated as the product develops. Continued use means you accept the updated terms.'],
]}/>
