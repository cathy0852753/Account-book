
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import { AddBtn } from '../components/BodyNav'
import { Form, Table, } from "react-bootstrap"
import '../components/css/BodyNav.css'
import '../components/css/BodyRecord.css'

const tableHead = [
  { id: 1, item: null, sort: '分類', way: '方式', account: '帳戶', description: '描述', tag: '標籤', date: '日期', expense: '金額', },
]
const tableBody = [
  { id: 1, item: 0, transfer: false, sort: '薪資', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-01-19', expense: 1000, },
  { id: 2, item: 1, transfer: true, sort: '美容美髮', way: '信用卡', account: '兆豐銀行', description: null, tag: '昂貴染護髮', date: '2023-02-19', expense: -1000, },
  { id: 3, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-03-19', expense: 1000, },
  { id: 4, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-04-19', expense: 1000, },
  { id: 5, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '台新銀行', description: null, tag: '悠遊卡', date: '2023-03-19', expense: -1000, },
  { id: 6, item: 1, transfer: true, sort: '美容美髮', way: '信用卡', account: '兆豐銀行', description: null, tag: '昂貴染護髮', date: '2023-02-19', expense: -1000, },
  { id: 7, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-03-19', expense: 1000, },
  { id: 8, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-04-19', expense: 1000, },
  { id: 9, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '台新銀行', description: null, tag: '悠遊卡', date: '2023-05-19', expense: -1000, },
  { id: 10, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '台新銀行', description: null, tag: '悠遊卡', date: '2023-05-19', expense: -1000, },
  { id: 11, item: 1, transfer: true, sort: '美容美髮', way: '信用卡', account: '兆豐銀行', description: null, tag: '昂貴染護髮', date: '2023-02-19', expense: -1000, },
  { id: 12, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-03-19', expense: 1000, },
  { id: 13, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-04-19', expense: 1000, },
  { id: 14, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '台新銀行', description: null, tag: '悠遊卡', date: '2023-05-19', expense: -1000, },
]
// Month Select
let a = [] // a 篩選月份暫存的陣列
const localDate = new Date()
class SelectMonth extends React.Component {
  state = {
    years: localDate.getFullYear(),
    month: localDate.getMonth() + 1
  }
  changeYear = (e) => {
    console.log('Year', e)
    this.setState({
      years: e.target.value,
    })
  }
  changeMonth = (e) => {
    console.log('Month', e)
    this.setState({
      month: e.target.value,
    })
  }
  render () {
    //月份選單預設
    let defaultM = this.state.month.toString
    if (this.state.month < 10) {
      defaultM = '0' + this.state.month
    } else {
      defaultM = this.state.month
    }
    console.log(defaultM, this.state.month)

    //篩選月份數據
    let ab = this.state.years + '-' + defaultM
    console.log(ab, 'aaaa:' + ab.substring(7, 5))
    if (ab.substring(7, 5) === '00') {
      ab = this.state.years + '-' + ab.substring(8, 6)
    }
    console.log('ab:' + ab)
    a = []
    for (let index = 0; index < tableBody.length; index++) {
      let d = tableBody[index].date
      if (d.substring(0, 7) === ab) {
        a.push({ id: tableBody[index].id, item: tableBody[index].item, transfer: tableBody[index].transfer, sort: tableBody[index].sort, way: tableBody[index].way, account: tableBody[index].account, description: tableBody[index].description, tag: tableBody[index].tag, date: tableBody[index].date, expense: tableBody[index].expense })
      }
    }
    console.log('y:', this.state.years, ',m:', this.state.month) // y:目前年份 ,m: 目前月份
    let yearSelect = []
    let monthSelect = []
    for (let years = localDate.getFullYear() - 4; years < localDate.getFullYear() + 2; years++) {
      yearSelect.push({ value: years, label: years })
    }
    for (let month = 1; month <= 12; month++) {
      if (month < 10) {
        monthSelect.push({ value: '0' + month, label: '0' + month })
      } else {
        monthSelect.push({ value: month, label: month })
      }
    }


    return (
      <>
        <div className='container-fluid'>
          <div className='row itemHome'>
            <Form.Select
              className='select yearSelect'
              onChange={this.changeYear}
              defaultValue={this.state.years}
            >
              {yearSelect.map(el =>
                <option key={el.value} id={el.value}>{el.label}</option>
              )}
            </Form.Select>
            <span className='dateSpan'>-</span>
            <Form.Select
              className='select monthSelect'
              onChange={this.changeMonth}
              defaultValue={defaultM}
            >
              {monthSelect.map(el =>
                <option key={el.value} id={el.value}>{el.label}</option>
              )}
            </Form.Select>
            <AddBtn />
          </div>
        </div>
        {BodyRecord()}
      </>
    )
  }
}

const item = (type) => {
  if (type === 1) {
    return (<label type='button' className="ieItem expensesItem">支</label>)
  } else if (type === 0) {
    return (<label type='button' className="ieItem incomeItem">收</label>)
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
      <div className="bg-record">
        <Table hover responsive="sm" className="table" >
          <thead>
            {tableHead.map(thead =>
              <tr key={thead.id}>
                <th className="itemCol" >{thead.item}</th>
                <th className="sortCol">{thead.sort}</th>
                <th className="wayCol">{thead.way}</th>
                <th className="accountCol">{thead.account}</th>
                <th className="descriptionCol">{thead.description}</th>
                <th className="tagCol">{thead.tag}</th>
                <th className="dateCol">{thead.date}</th>
                <th className="amountCol">{thead.expense}</th>
              </tr>
            )}
          </thead>
          <tbody>
            {a.map(tbody =>
              <tr key={tbody.id} className={tbody.transfer ? "trLine trLine-transfer" : "trLine"}>
                <td className="itemCol">{item(tbody.item)}</td>
                <td className="sortCol">{tbody.sort}</td>
                <td className="wayCol">{tbody.way}</td>
                <td className="accountCol">{tbody.account}</td>
                <td className="descriptionCol">{tbody.description}</td>
                <td className="tagCol">{tbody.tag === null ? '' : <label className="tagLabel">{tbody.tag}</label>}</td>
                <td className="dateCol NumberFont">{tbody.date}</td>
                <td className={tbody.item === 1 ? "amountCol NumberFont amountCol-red " : "amountCol NumberFont amountCol-green"}>{tbody.expense}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className="totalSpan">
        <span >
          當月結餘：
        </span>
        <span className={count < 0 ? " NumberFont amountCol-red " : " NumberFont amountCol-green"}>{count}</span>
      </div>
    </>

  )

}

export default function Record () {
  return (
    <SelectMonth />
  )
}