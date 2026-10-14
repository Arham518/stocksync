import { useMemo, useState } from 'react'
/** Filter → sort → paginate, each step memoized. */
export function useTable(rows, { pageSize = 8, filter } = {}) {
  const [sort, setSort] = useState({ key: null, dir: 1 })
  const [page, setPage] = useState(0)
  const filtered = useMemo(() => (filter ? rows.filter(filter) : rows), [rows, filter])
  const sorted = useMemo(() => {
    if (!sort.key) return filtered
    const { key, dir } = sort
    return [...filtered].sort((a, b) => (a[key] > b[key] ? dir : a[key] < b[key] ? -dir : 0))
  }, [filtered, sort])
  const pages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const current = Math.min(page, pages - 1)
  const view = useMemo(() => sorted.slice(current * pageSize, (current + 1) * pageSize), [sorted, current, pageSize])
  const toggleSort = key => setSort(s => ({ key, dir: s.key === key ? -s.dir : 1 }))
  return { view, sorted, sort, toggleSort, page: current, pages, setPage, total: sorted.length }
}
