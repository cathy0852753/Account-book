


const tableHead = [
  { id: 1, item: null, sort: '分類', way: '方式', account: '帳戶', description: '描述', tag: '標籤', date: '日期', expense: '金額', },
]
const tableBody = [
  { id: 1, item: 0, transfer: false, sort: '薪資', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-01-19', expense: 1000, },
  { id: 2, item: 1, transfer: true, sort: '美容美髮', way: '信用卡', account: '兆豐銀行', description: null, tag: '昂貴染護髮', date: '2023-02-19', expense: -1000, },
  { id: 3, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '永豐銀行', description: null, tag: '少少薪資', date: '2023-03-19', expense: 1000, },
  { id: 4, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-04-19', expense: 1000, },
  { id: 5, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '台新銀行', description: null, tag: '悠遊卡', date: '2023-03-19', expense: -1000, },
  { id: 6, item: 1, transfer: true, sort: '美容美髮', way: '信用卡', account: '兆豐銀行', description: null, tag: '昂貴染護髮', date: '2023-02-19', expense: -1000, },
  { id: 7, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '第一銀行', description: null, tag: '少少薪資', date: '2023-03-19', expense: 1000, },
  { id: 8, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-04-19', expense: 1000, },
  { id: 9, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '台新銀行', description: null, tag: '悠遊卡', date: '2023-05-19', expense: -1000, },
  { id: 10, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '台新銀行', description: null, tag: '悠遊卡', date: '2023-05-19', expense: -1000, },
  { id: 11, item: 1, transfer: true, sort: '美容美髮', way: '信用卡', account: '兆豐銀行', description: null, tag: '昂貴染護髮', date: '2023-02-19', expense: -1000, },
  { id: 12, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-03-19', expense: 1000, },
  { id: 13, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '華南銀行', description: null, tag: '少少薪資', date: '2023-04-19', expense: 1000, },
  { id: 14, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '王道銀行', description: null, tag: '悠遊卡', date: '2023-05-19', expense: -1000, },
]
const account = [
  { value: '1', label: '現金', way1: 'Cash' },
  { value: '008', label: '華南銀行', way1: 'Credit card', way2: 'Transfer' },
  { value: '005', label: '土地銀行', way1: 'Transfer', way2: '' },
  { value: '007', label: '第一銀行', way1: 'Credit card', way2: 'Transfer' },
  { value: '017', label: '兆豐商銀', way1: 'Credit card', way2: 'Transfer' },
  { value: '803', label: '聯邦銀行', way1: 'Transfer', way2: '' },
  { value: '808', label: '玉山銀行', way1: 'Credit card', way2: 'Transfer' },
  { value: '812', label: '台新銀行', way1: 'Credit card', way2: 'Transfer' },
  { value: '824', label: '連線銀行', way1: 'Credit card', way2: 'Transfer' },
]

const way = [
  { value: 'Cash', label: '現金' },
  { value: 'Credit card', label: '信用卡' },
  { value: 'Transfer', label: '轉帳' }
]

const tagOptions = [
  { value: '嚕嚕', label: '嚕嚕', hidden: false, color: 'orange' },
  { value: '小波', label: '小波', hidden: false, color: 'orange' },
  { value: '朋友聚餐', label: '朋友聚餐', hidden: false, color: 'brown' },
  { value: '同事聚餐', label: '同事聚餐', hidden: false, color: 'brown' },
  { value: '公司聚餐', label: '公司聚餐', hidden: false, color: 'brown' },
  { value: '聚餐', label: '聚餐', hidden: false, color: 'brown' },
  { value: '美金', label: '美金', hidden: false, color: 'red' },
  { value: '油費', label: '油費', hidden: false, color: 'blue' },
  { value: '飲料', label: '飲料', hidden: false, color: 'brown' },
]

const sortE = [
  { value: '1', label: '美容美髮', transfer: false },
  { value: '2', label: '購物', transfer: false },
  { value: '3', label: '交通', transfer: false },
  { value: '4', label: '飲食', transfer: false },
  { value: '5', label: '服飾', transfer: false },
  { value: '6', label: '網路費', transfer: false },
  { value: '7', label: '帳戶戶轉', transfer: true },
  { value: '8', label: '電子票證加值', transfer: true },
  { value: '9', label: '信用卡費', transfer: true },
  { value: '10', label: '外幣買賣', transfer: true },
  { value: '11', label: '寵物', transfer: false },
]
const sortI = [
  { value: '1', label: '薪資', transfer: false },
  { value: '2', label: '獎金', transfer: false },
  { value: '3', label: '中獎', transfer: false },
  { value: '4', label: '回饋', transfer: false },
  { value: '5', label: '利息所得', transfer: false },
  { value: '6', label: '帳戶戶轉', transfer: true },
  { value: '7', label: '外幣買賣', transfer: true },
  { value: '8', label: '定存到期', transfer: true },
]


export { tableHead, tableBody, account, way, tagOptions, sortE, sortI }