# StockSync Pro

Premium SaaS marketing site + app dashboard for Shopify supplier inventory sync.
Built with React 18, Vite 5, JavaScript and Tailwind CSS v4.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build && npm run preview
```

## Structure
- `src/data` – all page/section copy and mock data (data-driven rendering)
- `src/components` – layout, navbar (mega menu), footer, sections, `ui/button.js` variants
- `src/pages` – marketing pages (each content section is its own route)
- `src/app` – dashboard (`/app`): Dashboard, Imports, Products, Suppliers, Review & Sync, Sync History, Settings, command palette (Ctrl+K), notifications
- `src/hooks` – `useCsvImport` (PapaParse), `useTable` (filter/sort/paginate)
- `src/utils` – `sku.js` (O(n) Map/Set SKU matching), `csv.js`, `cn.js`

No backend: forms validate client-side; CSV files are parsed in the browser.
