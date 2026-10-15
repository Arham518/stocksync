import { describe, it, expect } from 'vitest'
import { buildDiff, detectColumns, normalizeSku, parseQty, parsePrice } from '../sku.js'

const catalog = [{ sku: 'SKU-123', name: 'Mug', stock: 5, price: 10 }, { sku: 'SKU-200', name: 'Bag', stock: 1, price: 50 }]
const cols = { sku: 'SKU', qty: 'Qty', price: 'Price' }
const diff = rows => buildDiff(rows, cols, catalog)
const flagOf = row => diff([row])[0].flag

describe('normalizeSku', () => {
  it('is case-insensitive and trims spaces', () => {
    expect(normalizeSku('  sku-123 ')).toBe('SKU-123')
    expect(flagOf({ SKU: 'sku-123', Qty: '3', Price: '10' })).toBe('matched')
    expect(flagOf({ SKU: '  SKU-123  ', Qty: '3', Price: '10' })).toBe('matched')
  })
})

describe('quantity validation', () => {
  it.each([['', 'blank'], ['-2', 'negative'], ['12.5', 'decimal'], ['abc', 'text']])('flags %s (%s) as invalid, never 0', q => {
    const [r] = diff([{ SKU: 'SKU-123', Qty: q, Price: '10' }])
    expect(r.flag).toBe('invalid')
    expect(r.next).toBeNull()
  })
  it('accepts whole numbers including 0', () => {
    expect(parseQty('0')).toBe(0)
    expect(parseQty(' 42 ')).toBe(42)
  })
})

describe('price handling', () => {
  it('treats blank price as missing, not 0', () => {
    expect(parsePrice('')).toBeUndefined()
    const [r] = diff([{ SKU: 'SKU-123', Qty: '3', Price: '' }])
    expect(r.flag).toBe('matched')
    expect(r.nextP).toBeNull()
  })
  it('parses currency formatting and detects price changes', () => {
    expect(parsePrice('$1,234.50')).toBe(1234.5)
    expect(flagOf({ SKU: 'SKU-200', Qty: '3', Price: '$55.00' })).toBe('price')
  })
  it('flags non-numeric price as invalid', () => {
    expect(flagOf({ SKU: 'SKU-200', Qty: '3', Price: 'n/a' })).toBe('invalid')
  })
})

describe('duplicates and missing SKUs', () => {
  it('flags every row of a duplicated SKU, regardless of case', () => {
    const out = diff([{ SKU: 'SKU-123', Qty: '1' }, { SKU: 'sku-123', Qty: '2' }, { SKU: 'SKU-200', Qty: '1' }])
    expect(out.map(r => r.flag)).toEqual(['duplicate', 'duplicate', 'matched'])
  })
  it('never applies a row with a missing SKU', () => {
    const [r] = diff([{ SKU: '  ', Qty: '4', Price: '1' }])
    expect(r.flag).toBe('invalid')
    expect(r.reason).toMatch(/Missing SKU/)
  })
  it('flags SKUs not in the catalog as missing', () => {
    expect(flagOf({ SKU: 'NEW-1', Qty: '4' })).toBe('missing')
  })
})

describe('detectColumns', () => {
  it('detects common headers confidently', () => {
    expect(detectColumns(['Item Code', 'On Hand', 'Unit Cost'])).toMatchObject({ sku: 'Item Code', qty: 'On Hand', price: 'Unit Cost', certain: true })
  })
  it('is uncertain when SKU or quantity cannot be found', () => {
    expect(detectColumns(['Code', 'Amount']).certain).toBe(false)
  })
})
