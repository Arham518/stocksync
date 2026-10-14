export const problemBullets = ['Stop repeating the same spreadsheet tasks.','Reduce stock and pricing errors.','Identify missing and mismatched products.','Spend more time growing your business.']
export const solutionSteps = ["Upload your supplier's CSV or Excel file.",'Match supplier SKUs with Shopify products.','Review stock and price changes.','Confirm and synchronize updates.','Check the results in your dashboard.']
export const features = [
  { icon:'Link2', title:'Smart SKU Matching', text:'Match supplier products with Shopify variants and identify unmatched items.', tone:'brand' },
  { icon:'Layers', title:'Bulk Inventory Updates', text:'Update quantities across multiple products in one workflow.', tone:'blue' },
  { icon:'Tag', title:'Price Synchronization', text:'Review supplier price changes before applying them to your store.', tone:'amber' },
  { icon:'Users', title:'Multi-Supplier Management', text:'Organize supplier files, mappings, and inventory sources in one place.', tone:'violet' },
  { icon:'BellRing', title:'Low-Stock Alerts', text:'Identify products that need restocking.', tone:'red' },
  { icon:'History', title:'Sync History', text:'Review completed updates, failed records, and previous inventory changes.', tone:'brand' },
]
export const steps = [
  { icon:'UploadCloud', title:'Import Your Data', text:'Upload your supplier file and let StockSync Pro analyze its columns, SKUs, quantities, and prices.' },
  { icon:'FileSearch', title:'Review Changes', text:'Check matched products, missing records, quantity differences, and proposed price updates before making changes.' },
  { icon:'RefreshCcw', title:'Sync Your Store', text:'Confirm the updates and review the synchronization report to see which products were updated successfully.' },
]
export const dashItems = ['Total products tracked','Low-stock and out-of-stock products','Pending inventory changes','Last synchronization status','Supplier file activity','Recent price and quantity changes']
export const supplierBullets = ['Create separate supplier profiles.','Configure SKU, quantity, and price columns.','Review imported data before synchronization.','Track which supplier provided each update.','Identify missing or inconsistent information.']
export const safetyBullets = ['Preview changes before applying them.','Flag duplicate SKUs and invalid quantities.','Identify unmatched Shopify products.','Keep a record of inventory updates.','Report failed operations and affected products.']
export const automation = ['Scheduled synchronization','Low-stock notifications','Import and sync failure alerts','Automated update summaries','Configurable price synchronization']
export const plans = [
  { name:'Starter', sub:'For Small Stores', items:['One Shopify store','Supplier CSV and Excel imports','Basic SKU matching','Manual inventory synchronization','Basic sync history'] },
  { name:'Professional', sub:'For Growing Businesses', popular:true, items:['Multiple supplier profiles','Bulk inventory updates','Price synchronization controls','Scheduled syncing','Low-stock alerts','Detailed reports'] },
  { name:'Agency', sub:'For Multiple Stores', items:['Multiple Shopify stores','Centralized inventory monitoring','Store-specific supplier configurations','Expanded reporting','Team workflow support'] },
]
export const faqs = [
  ['What is StockSync Pro?','StockSync Pro is an inventory synchronization tool that helps Shopify merchants import supplier spreadsheets and update product inventory through a controlled workflow.'],
  ['Which file formats are supported?','The planned system supports CSV and Excel files, subject to file structure and validation requirements.'],
  ['Can I update hundreds of products at once?','Yes, bulk updates can be supported within the limits of file processing, Shopify API permissions, and platform constraints.'],
  ['Will my inventory update automatically?','You can manually review and confirm updates. Scheduled synchronization can be enabled when supported data sources and automation are configured.'],
  ['Can I manage multiple suppliers?','Yes. The planned multi-supplier functionality allows separate profiles, column mappings, and import histories.'],
  ['What happens when a SKU does not match?','The product is flagged for review instead of being silently updated against an uncertain match.'],
  ['Does StockSync Pro change prices automatically?','Price synchronization can be configured separately. The safer default is to preview changes before applying them.'],
]
export const footerLinks = [['Features','/features'],['How It Works','/how-it-works'],['Pricing','/pricing'],['FAQ','/faq'],['Contact','/contact'],['Privacy Policy','/privacy'],['Terms of Service','/terms']]
export const footerCols = [
  ['Product',[['Features','/features'],['Workflow','/workflow'],['How It Works','/how-it-works'],['Product Tour','/product-tour'],['Automation','/automation'],['Integrations','/integrations'],['Pricing','/pricing']]],
  ['Solutions',[['Why StockSync','/why-stocksync'],['Supplier Management','/suppliers-management'],['Review First','/review-first'],['Use Cases','/use-cases'],['Security & Data','/security']]],
  ['Resources',[['Help Center','/docs'],['FAQ','/faq'],['Roadmap','/roadmap'],['About','/about'],['Contact','/contact']]],
  ['Legal',[['Privacy Policy','/privacy'],['Terms of Service','/terms']]],
]
