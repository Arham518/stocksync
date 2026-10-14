const pick = (fields, re) => fields.find(f => re.test(f))

/** Detect the SKU / quantity / price columns of a supplier file. */
export const detectColumns = fields => ({
  sku: pick(fields, /sku|code|part/i),
  qty: pick(fields, /qty|quant|stock|hand|avail/i),
  price: pick(fields, /price|cost|wholesale/i),
})

/**
 * Compare supplier rows with catalog products in O(n + m) using Map/Set lookups.
 * Flags: matched | price | missing | invalid | duplicate
 */
export function buildDiff(rows, cols, catalog) {
  const bySku = new Map(catalog.map(p => [p.sku, p]))
  const seen = new Set()
  return rows.map(row => {
    const sku = String(row[cols.sku] ?? '').trim()
    const next = Number(row[cols.qty])
    const nextP = cols.price ? Number(String(row[cols.price]).replace(/[^0-9.-]/g, '')) : null
    const product = bySku.get(sku)
    const base = { sku, name: product?.name ?? row.Product ?? row.Name ?? 'Unknown item', cur: product?.stock ?? null, curP: product?.price ?? null, next, nextP }
    let flag = 'matched'
    if (seen.has(sku)) flag = 'duplicate'
    else if (!Number.isInteger(next) || next < 0) flag = 'invalid'
    else if (!product) flag = 'missing'
    else if (nextP != null && nextP !== product.price) flag = 'price'
    seen.add(sku)
    return { ...base, flag }
  })
}

export const countBy = (list, key) => list.reduce((acc, x) => acc.set(x[key], (acc.get(x[key]) ?? 0) + 1), new Map())
