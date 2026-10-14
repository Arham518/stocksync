import Papa from 'papaparse'
export function downloadCsv(rows, filename) {
  const url = URL.createObjectURL(new Blob([Papa.unparse(rows)], { type: 'text/csv' }))
  Object.assign(document.createElement('a'), { href: url, download: filename }).click()
  URL.revokeObjectURL(url)
}
