
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import { Form, Table, } from "react-bootstrap"
import '../components/css/BodyNav.css'
import '../components/css/BankTable.css'

const tableHead = [
  { id: 1, item: null, sort: '分類', way: '方式', account: '帳戶', description: '描述', tag: '標籤', date: '日期', expense: '金額', },
]
const tableBody = [
  { id: 1, item: 0, transfer: false, sort: '薪資', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-01-19', expense: 1000, },
  { id: 2, item: 1, transfer: true, sort: '美容美髮', way: '信用卡', account: '兆豐商銀', description: null, tag: '昂貴染護髮', date: '2023-02-19', expense: -1000, },
  { id: 3, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '永豐銀行', description: null, tag: '少少薪資', date: '2023-03-19', expense: 1000, },
  { id: 4, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-04-19', expense: 1000, },
  { id: 5, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '台新銀行', description: null, tag: '悠遊卡', date: '2023-03-19', expense: -1000, },
  { id: 6, item: 1, transfer: true, sort: '美容美髮', way: '信用卡', account: '兆豐商銀', description: null, tag: '昂貴染護髮', date: '2023-02-19', expense: -1000, },
  { id: 7, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '第一銀行', description: null, tag: '少少薪資', date: '2023-03-19', expense: 1000, },
  { id: 8, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-04-19', expense: 1000, },
  { id: 9, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '台新銀行', description: null, tag: '悠遊卡', date: '2023-05-19', expense: -1000, },
  { id: 10, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '台新銀行', description: null, tag: '悠遊卡', date: '2023-05-19', expense: -1000, },
  { id: 11, item: 1, transfer: true, sort: '美容美髮', way: '信用卡', account: '兆豐商銀', description: null, tag: '昂貴染護髮', date: '2023-02-19', expense: -1000, },
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
// 銀行選擇
let a = [] // a 篩選銀行暫存的陣列
const localDate = new Date()
class SelectBank extends React.Component {
  state = {
    bank: localDate.getFullYear()
  }
  changeBank = (e) => {
    console.log('Bank', e)
    this.setState({
      bank: e.target.value,
    })
  }
  render () {
    a = []
    for (let index = 0; index < tableBody.length; index++) {
      let d = tableBody[index].account
      if (d === this.state.bank) {
        a.push({ id: tableBody[index].id, item: tableBody[index].item, transfer: tableBody[index].transfer, sort: tableBody[index].sort, way: tableBody[index].way, account: tableBody[index].account, description: tableBody[index].description, tag: tableBody[index].tag, date: tableBody[index].date, expense: tableBody[index].expense })
      }
    }

    return (
      <>
        <div className='bank-container-fluid'>
          <div className='row bank-itemHome'>
            <Form.Select
              className='bank-select bank-yearSelect'
              onChange={this.changeBank}
              defaultValue={this.state.bank}
            >
              {account.map(el =>
                <option key={el.value} id={el.value}>{el.label}</option>
              )}
            </Form.Select>
          </div>
        </div>
        {BodyRecord()}
      </>
    )
  }
}

const item = (type) => {
  if (type === 1) {
    return (<label type='button' className="bank-ieItem bank-expensesItem">支</label>)
  } else if (type === 0) {
    return (<label type='button' className="bank-ieItem bank-incomeItem">收</label>)
  } else {
    return ('')
  }
}

function BodyRecord () {
  // console.log(a)
  if (a.length === 0) {
    a = [{ id: null, item: null, transfer: null, sort: null, way: null, account: null, description: null, tag: null, date: null, expense: null, },]
  }
  let count = a.map(el => el.expense).reduce((a, b) => a + b)
  return (
    <>
      <div className="bank-bg-table">
        <Table hover responsive="sm" className="bank-table" >
          <thead>
            {tableHead.map(thead =>
              <tr key={thead.id}>
                <th className="bank-itemCol" >{thead.item}</th>
                <th className="bank-sortCol">{thead.sort}</th>
                <th className="bank-wayCol">{thead.way}</th>
                <th className="bank-descriptionCol">{thead.description}</th>
                <th className="bank-dateCol">{thead.date}</th>
                <th className="bank-amountCol">{thead.expense}</th>
              </tr>
            )}
          </thead>
          <tbody>
            {a.map(tbody =>
              <tr key={tbody.id} className={tbody.transfer ? "bank-trLine bank-trLine-transfer" : "bank-trLine"}>
                <td className="bank-itemCol">{item(tbody.item)}</td>
                <td className="bank-sortCol">{tbody.sort}</td>
                <td className="bank-wayCol">{tbody.way}</td>
                <td className="bank-descriptionCol">{tbody.description}</td>
                <td className="bank-dateCol bank-NumberFont">{tbody.date}</td>
                <td className={tbody.item === 1 ? "bank-amountCol bank-NumberFont bank-amountCol-red " : "bank-amountCol bank-NumberFont bank-amountCol-green"}>{tbody.expense}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className="bank-totalSpan">
        <span >
          當月結餘：
        </span>
        <span className={count < 0 ? " bank-NumberFont bank-amountCol-red " : " bank-NumberFont bank-amountCol-green"}>{count}</span>
      </div>
    </>

  )

}

export default function Record () {
  return (
    <SelectBank />
  )
}