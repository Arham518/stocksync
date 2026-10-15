import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SEO, SITE_URL } from '../data/seo.js'

const BRAND = 'StockSync Pro'
const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.append(el) }
  el.setAttribute('content', content)
}

/** Keeps title, description, Open Graph tags and canonical URL in sync with the current route. */
export function useSeo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const key = pathname.startsWith('/app') ? '/app' : pathname
    const [title, description] = SEO[key] ?? ['Page Not Found', 'This page could not be found.']
    const full = key === '/' ? title : `${title} · ${BRAND}`
    document.title = full
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', SITE_URL + pathname)
    setMeta('name', 'robots', pathname.startsWith('/app') || !SEO[key] ? 'noindex' : 'index,follow')
  }, [pathname])
}
