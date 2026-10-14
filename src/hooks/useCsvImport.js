import { useCallback, useMemo, useState } from 'react'
import Papa from 'papaparse'
import { buildDiff, countBy, detectColumns } from '../utils/sku.js'
import { products } from '../data/mock.js'

const MAX = 5 * 1024 * 1024
export const DIFF_KEY = 'ssp:diff'

export function useCsvImport() {
  const [state, setState] = useState({ file: null, rows: [], fields: [], error: '' })

  const parseText = useCallback((text, name, size) => {
    const res = Papa.parse(text, { header: true, skipEmptyLines: true })
    if (!res.meta.fields?.length || !res.data.length)
      return setState(s => ({ ...s, error: 'No rows found. Make sure the first row contains column headers.' }))
    setState({ file: { name, size }, rows: res.data, fields: res.meta.fields, error: '' })
  }, [])

  const loadFile = useCallback(file => {
    if (!file) return
    const fail = error => setState(s => ({ ...s, error }))
    if (/\.xlsx?$/i.test(file.name)) return fail('Excel preview is planned. Please export the sheet as CSV for now.')
    if (!/\.(csv|txt)$/i.test(file.name)) return fail('Unsupported file. Please upload a .csv file.')
    if (file.size > MAX) return fail('File is larger than 5 MB.')
    file.text().then(t => parseText(t, file.name, file.size))
  }, [parseText])

  const reset = useCallback(() => setState({ file: null, rows: [], fields: [], error: '' }), [])

  const cols = useMemo(() => detectColumns(state.fields), [state.fields])
  const diff = useMemo(() => (cols.sku && cols.qty ? buildDiff(state.rows, cols, products) : []), [state.rows, cols])
  const counts = useMemo(() => countBy(diff, 'flag'), [diff])

  const saveForReview = useCallback(() => sessionStorage.setItem(DIFF_KEY, JSON.stringify({ file: state.file?.name, diff })), [diff, state.file])

  return { ...state, cols, diff, counts, parseText, loadFile, reset, saveForReview }
}
