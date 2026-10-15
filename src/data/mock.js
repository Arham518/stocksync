export const suppliers = [
  { id:'s1', name:'Northline Wholesale', file:'northline_stock.csv', products:412, mapped:true, lastImport:'Today, 09:42', status:'Active', map:{ sku:'Item Code', qty:'On Hand', price:'Unit Cost' } },
  { id:'s2', name:'Coastal Goods Co.', file:'coastal_inventory.xlsx', products:268, mapped:true, lastImport:'Yesterday, 17:10', status:'Active', map:{ sku:'SKU', qty:'Available', price:'Wholesale' } },
  { id:'s3', name:'Maple Supply', file:'maple_feed.csv', products:186, mapped:false, lastImport:'Oct 9, 14:03', status:'Needs mapping', map:{ sku:'', qty:'', price:'' } },
  { id:'s4', name:'Union Trade Partners', file:'utp_weekly.xlsx', products:349, mapped:true, lastImport:'Oct 8, 11:26', status:'Active', map:{ sku:'Part #', qty:'Stock', price:'Price USD' } },
]
const names = ['Merino Crew Sweater','Canvas Weekender Bag','Ceramic Pour-Over Set','Linen Throw Blanket','Walnut Desk Organizer','Leather Card Holder','Stoneware Mug — Sand','Organic Cotton Tee','Brass Table Lamp','Wool Felt Slippers','Glass Storage Jar','Cedar Candle 8oz','Recycled Notebook A5','Bamboo Cutting Board','Copper Kettle 1.5L','Alpaca Beanie']
export const products = names.map((n,i)=>{
  const stock=[64,3,0,22,118,7,41,0,15,9,88,2,140,33,5,27][i]
  return { id:i+1, name:n, sku:`SSP-${(1040+i*7)}`, supplier:suppliers[i%4].name, stock, price:[89,129,54,72,48,36,24,32,164,42,18,28,14,39,96,38][i], status: stock===0?'Out of stock':stock<10?'Low stock':'In stock' }
})
export const trend = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i)=>({ d, updated:[182,240,198,310,276,142,208][i], failed:[4,7,2,9,5,1,3][i] }))
export const stockMix = [ { name:'In stock', value:1096, color:'#0b7d58' }, { name:'Low stock', value:104, color:'#f59e0b' }, { name:'Out of stock', value:48, color:'#c42b31' } ]
export const activity = [
  { t:'Supplier import completed', d:'Northline Wholesale · 412 rows parsed', time:'2m ago', type:'ok' },
  { t:'Price changes awaiting review', d:'Coastal Goods Co. · 18 products', time:'26m ago', type:'warn' },
  { t:'Sync finished with 3 failures', d:'Union Trade Partners · see report', time:'2h ago', type:'err' },
  { t:'Column mapping saved', d:'Maple Supply · SKU, Qty, Price', time:'5h ago', type:'info' },
  { t:'Low-stock alert', d:'7 products below threshold', time:'Yesterday', type:'warn' },
]
export const history = [
  { id:'SYNC-2048', date:'Oct 13, 2026 · 09:48', supplier:'Northline Wholesale', updated:398, failed:2, skipped:12, status:'Completed' },
  { id:'SYNC-2047', date:'Oct 12, 2026 · 17:14', supplier:'Coastal Goods Co.', updated:250, failed:0, skipped:18, status:'Completed' },
  { id:'SYNC-2046', date:'Oct 11, 2026 · 08:02', supplier:'Union Trade Partners', updated:331, failed:3, skipped:15, status:'Partial' },
  { id:'SYNC-2045', date:'Oct 9, 2026 · 14:20', supplier:'Maple Supply', updated:0, failed:186, skipped:0, status:'Failed' },
  { id:'SYNC-2044', date:'Oct 8, 2026 · 11:31', supplier:'Union Trade Partners', updated:340, failed:1, skipped:8, status:'Completed' },
  { id:'SYNC-2043', date:'Oct 6, 2026 · 10:05', supplier:'Northline Wholesale', updated:405, failed:0, skipped:7, status:'Completed' },
]
export const review = [
  { sku:'SSP-1040', name:'Merino Crew Sweater', cur:64, next:58, curP:89, nextP:89, flag:'matched' },
  { sku:'SSP-1047', name:'Canvas Weekender Bag', cur:3, next:24, curP:129, nextP:134, flag:'price' },
  { sku:'SSP-1054', name:'Ceramic Pour-Over Set', cur:0, next:12, curP:54, nextP:54, flag:'matched' },
  { sku:'NL-88213', name:'Unknown supplier item', cur:null, next:40, curP:null, nextP:22, flag:'missing' },
  { sku:'SSP-1068', name:'Walnut Desk Organizer', cur:118, next:110, curP:48, nextP:44, flag:'price' },
  { sku:'SSP-1075', name:'Leather Card Holder', cur:7, next:-2, curP:36, nextP:36, flag:'invalid' },
  { sku:'SSP-1082', name:'Stoneware Mug — Sand', cur:41, next:41, curP:24, nextP:24, flag:'matched' },
  { sku:'SSP-1082', name:'Stoneware Mug — Sand (dup)', cur:41, next:39, curP:24, nextP:24, flag:'duplicate' },
  { sku:'SSP-1089', name:'Organic Cotton Tee', cur:0, next:60, curP:32, nextP:32, flag:'matched' },
]
export const SAMPLE_CSV = 'SKU,Product,Quantity,Price\nSSP-1040,Merino Crew Sweater,58,89.00\nSSP-1047,Canvas Weekender Bag,24,134.00\nSSP-1054,Ceramic Pour-Over Set,12,54.00\nNL-88213,Bamboo Tray,40,22.00\nSSP-1068,Walnut Desk Organizer,110,44.00\nSSP-1075,Leather Card Holder,-2,36.00\nSSP-1082,Stoneware Mug - Sand,41,24.00\nSSP-1082,Stoneware Mug - Sand,39,24.00\n'
export const team = [
  { name: 'Store Owner', email: 'owner@acme-supply.com', role: 'Owner' },
  { name: 'Inventory Manager', email: 'inventory@acme-supply.com', role: 'Editor' },
  { name: 'Agency Partner', email: 'partner@agency.com', role: 'Viewer' },
]
