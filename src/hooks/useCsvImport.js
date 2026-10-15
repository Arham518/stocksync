import { useCallback, useMemo, useState } from 'react'
import { buildDiff, countBy, detectColumns } from '../utils/sku.js'
import { parseCsvText, parseFile } from '../utils/parseFile.js'
import { products } from '../data/mock.js'

export const DIFF_KEY = 'ssp:diff'
const EMPTY = { file: null, rows: [], fields: [], error: '', status: 'idle' }

/** Supplier file import: parse (CSV/Excel) → column mapping → diff against the catalog. */
export function useCsvImport() {
  const [state, setState] = useState(EMPTY)
  const [mapping, setMapping] = useState(null)

  const accept = useCallback((parsed, file) => {
    setState({ ...EMPTY, ...parsed, file, status: 'parsed' })
    setMapping(detectColumns(parsed.fields))
  }, [])
  const fail = useCallback((file, error) => { setState({ ...EMPTY, file, error, status: 'error' }); setMapping(null) }, [])

  const loadFile = useCallback(async file => {
    if (!file) return
    const meta = { name: file.name, size: file.size }
    setState({ ...EMPTY, file: meta, status: 'parsing' })
    try { accept(await parseFile(file), meta) } catch (e) { fail(meta, e.message) }
  }, [accept, fail])

  const loadText = useCallback((text, name) => {
    const meta = { name, size: text.length }
    try { accept(parseCsvText(text), meta) } catch (e) { fail(meta, e.message) }
  }, [accept, fail])

  const reset = useCallback(() => { setState(EMPTY); setMapping(null) }, [])
  const setColumn = useCallback((key, value) => setMapping(m => ({ ...m, [key]: value || undefined, certain: true })), [])

  const ready = Boolean(mapping?.sku && mapping?.qty)
  const diff = useMemo(() => (ready ? buildDiff(state.rows, mapping, products) : []), [ready, state.rows, mapping])
  const counts = useMemo(() => countBy(diff, 'flag'), [diff])

  const saveForReview = useCallback(() => sessionStorage.setItem(DIFF_KEY, JSON.stringify({ file: state.file?.name, diff })), [diff, state.file])

  return { ...state, mapping, setColumn, ready, diff, counts, loadFile, loadText, reset, saveForReview }
}
