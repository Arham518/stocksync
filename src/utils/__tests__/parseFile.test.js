import { describe, it, expect } from 'vitest'
import * as XLSX from 'xlsx'
import { parseCsvText, parseExcelBuffer, validateFile, MAX_BYTES } from '../parseFile.js'

describe('validateFile', () => {
  it('accepts csv/xlsx/xls under 5 MB', () => {
    for (const name of ['a.csv', 'a.XLSX', 'a.xls']) expect(validateFile({ name, size: 100 })).toBe('')
  })
  it('rejects other types, empty and oversized files', () => {
    expect(validateFile({ name: 'a.pdf', size: 10 })).toMatch(/Unsupported/)
    expect(validateFile({ name: 'a.csv', size: 0 })).toMatch(/empty/)
    expect(validateFile({ name: 'a.csv', size: MAX_BYTES + 1 })).toMatch(/limit is 5 MB/)
  })
})

describe('parseCsvText', () => {
  it('trims headers and drops blank rows', () => {
    const { fields, rows } = parseCsvText(' SKU ,Qty\nA-1,3\n,\n\nB-2,4\n')
    expect(fields).toEqual(['SKU', 'Qty'])
    expect(rows).toHaveLength(2)
  })
  it('throws when there are no data rows', () => {
    expect(() => parseCsvText('SKU,Qty\n')).toThrow(/No data rows/)
  })
})

describe('parseExcelBuffer', () => {
  it('reads the first worksheet into the same row shape as CSV', async () => {
    const ws = XLSX.utils.aoa_to_sheet([['SKU', 'Quantity', 'Price'], ['SSP-1040', 58, 89], ['SSP-1047', 24, 134]])
    const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Stock')
    const buf = XLSX.write(wb, { type: 'array', bookType: 'xlsx' })
    const { fields, rows } = await parseExcelBuffer(buf)
    expect(fields).toEqual(['SKU', 'Quantity', 'Price'])
    expect(rows[0]).toEqual({ SKU: 'SSP-1040', Quantity: '58', Price: '89' })
  })
})
