const pick = (fields, re) => fields.find(f => re.test(f))

/** Best-guess SKU / quantity / price columns, plus whether the guess is trustworthy. */
export function detectColumns(fields) {
  const cols = {
    sku: pick(fields, /sku|item.?code|part/i),
    qty: pick(fields, /qty|quant|stock|on.?hand|avail/i),
    price: pick(fields, /price|cost|wholesale/i),
  }
  const used = Object.values(cols).filter(Boolean)
  cols.certain = Boolean(cols.sku && cols.qty) && new Set(used).size === used.length
  return cols
}

export const normalizeSku = v => String(v ?? '').trim().toUpperCase()

/** Whole, non-negative integers only. Anything else (blank, text, -2, 12.5) is null = invalid. */
export function parseQty(v) {
  const s = String(v ?? '').trim()
  return /^\d+$/.test(s) ? Number(s) : null
}

/** Blank → undefined (missing). Non-numeric → NaN (invalid). "$1,234.50" → 1234.5 */
export function parsePrice(v) {
  const s = String(v ?? '').trim()
  if (!s) return undefined
  const n = Number(s.replace(/[$,\s]/g, ''))
  return Number.isFinite(n) && n >= 0 ? n : NaN
}

export const APPLICABLE = new Set(['matched', 'price'])

/**
 * Compare supplier rows with catalog products in O(n + m) using Map lookups.
 * flag: matched | price | missing (no catalog match) | invalid | duplicate. Only matched/price may be applied.
 */
export function buildDiff(rows, cols, catalog) {
  const bySku = new Map(catalog.map(p => [normalizeSku(p.sku), p]))
  const seen = new Map()
  for (const row of rows) { const k = normalizeSku(row[cols.sku]); if (k) seen.set(k, (seen.get(k) ?? 0) + 1) }

  return rows.map((row, i) => {
    const sku = normalizeSku(row[cols.sku])
    const next = parseQty(row[cols.qty])
    const nextP = cols.price ? parsePrice(row[cols.price]) : undefined
    const product = sku ? bySku.get(sku) : undefined
    const out = {
      row: i + 2, sku: sku || '—', name: product?.name ?? row.Product ?? row.Name ?? 'Unknown item',
      cur: product?.stock ?? null, curP: product?.price ?? null,
      next, rawQty: String(row[cols.qty] ?? ''), nextP: Number.isNaN(nextP) ? null : nextP ?? null,
    }
    const flag = (f, reason) => ({ ...out, flag: f, reason })
    if (!sku) return flag('invalid', 'Missing SKU')
    if (seen.get(sku) > 1) return flag('duplicate', `SKU appears ${seen.get(sku)} times`)
    if (next === null) return flag('invalid', `Invalid quantity "${out.rawQty}"`)
    if (Number.isNaN(nextP)) return flag('invalid', `Invalid price "${row[cols.price]}"`)
    if (!product) return flag('missing', 'No matching Shopify product')
    if (nextP !== undefined && nextP !== product.price) return flag('price', 'Price differs')
    return flag('matched', nextP === undefined ? 'Price not provided — quantity only' : '')
  })
}

export const countBy = (list, key) => list.reduce((acc, x) => acc.set(x[key], (acc.get(x[key]) ?? 0) + 1), new Map())
