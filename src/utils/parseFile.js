import Papa from 'papaparse'

export const MAX_BYTES = 5 * 1024 * 1024
export const ACCEPT = '.csv,.xlsx,.xls'
const CSV = /\.csv$/i, EXCEL = /\.xlsx?$/i

/** Validate name/size before reading. Returns an error message or ''. */
export function validateFile({ name, size }) {
  if (!CSV.test(name) && !EXCEL.test(name)) return 'Unsupported file type. Upload a .csv, .xlsx or .xls file.'
  if (size > MAX_BYTES) return `File is ${(size / 1048576).toFixed(1)} MB. The limit is 5 MB.`
  if (!size) return 'The file is empty.'
  return ''
}

const clean = (rows, fields) => {
  const data = rows.filter(r => fields.some(f => String(r[f] ?? '').trim() !== ''))
  if (!fields.length || !data.length) throw new Error('No data rows found. Make sure the first row contains column headers.')
  return { fields, rows: data }
}

export function parseCsvText(text) {
  const res = Papa.parse(text, { header: true, skipEmptyLines: 'greedy', transformHeader: h => h.trim() })
  return clean(res.data, (res.meta.fields ?? []).filter(Boolean))
}

/** First worksheet → rows of strings, via SheetJS (loaded on demand). */
export async function parseExcelBuffer(buffer) {
  const XLSX = await import('xlsx')
  const wb = XLSX.read(buffer, { type: 'array' })
  const sheet = wb.Sheets[wb.SheetNames[0]]
  if (!sheet) throw new Error('The workbook has no sheets.')
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: '', raw: false })
  const fields = (XLSX.utils.sheet_to_json(sheet, { header: 1 })[0] ?? []).map(h => String(h).trim()).filter(Boolean)
  return clean(rows.map(r => Object.fromEntries(Object.entries(r).map(([k, v]) => [k.trim(), v]))), fields)
}

export async function parseFile(file) {
  const error = validateFile(file)
  if (error) throw new Error(error)
  return EXCEL.test(file.name) ? parseExcelBuffer(await file.arrayBuffer()) : parseCsvText(await file.text())
}
