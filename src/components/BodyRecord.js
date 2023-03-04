import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/BodyRecord.css'
import {
  Table,

} from "react-bootstrap"


const tableHead = [
  { id: 1, item: null, sort: '分類', way: '方式', account: '帳戶', description: '描述', tag: '標籤', date: '日期', amount: '金額', },
]
const tableBody = [
  { id: 1, item: 0, transfer: false, sort: '薪資', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-01-19', amount: '1000', },
  { id: 2, item: 1, transfer: true, sort: '美容美髮', way: '信用卡', account: '兆豐銀行', description: null, tag: '昂貴染護髮', date: '2023-02-19', amount: '1000', },
  { id: 3, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-03-19', amount: '1000', },
  { id: 4, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-04-19', amount: '1000', },
  { id: 5, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '台新銀行', description: null, tag: '悠遊卡', date: '2023-05-19', amount: '1000', },
  { id: 6, item: 1, transfer: true, sort: '美容美髮', way: '信用卡', account: '兆豐銀行', description: null, tag: '昂貴染護髮', date: '2023-02-19', amount: '1000', },
  { id: 7, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-03-19', amount: '1000', },
  { id: 8, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-04-19', amount: '1000', },
  { id: 9, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '台新銀行', description: null, tag: '悠遊卡', date: '2023-05-19', amount: '1000', },
  { id: 10, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '台新銀行', description: null, tag: '悠遊卡', date: '2023-05-19', amount: '1000', },
  { id: 11, item: 1, transfer: true, sort: '美容美髮', way: '信用卡', account: '兆豐銀行', description: null, tag: '昂貴染護髮', date: '2023-02-19', amount: '1000', },
  { id: 12, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-03-19', amount: '1000', },
  { id: 13, item: 0, transfer: false, sort: '現金', way: '轉帳', account: '台新銀行', description: null, tag: '少少薪資', date: '2023-04-19', amount: '1000', },
  { id: 14, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '台新銀行', description: null, tag: '悠遊卡', date: '2023-05-19', amount: '1000', },
]
console.log(tableBody[1].date.substring(0, 7))
let a = []
for (let index = 0; index < tableBody.length; index++) {
  let d = tableBody[index].date
  if (d.substring(0, 7) === '2023-02') {
    a.push({ id: tableBody[index].id, item: tableBody[index].item, transfer: tableBody[index].transfer, sort: tableBody[index].sort, way: tableBody[index].way, account: tableBody[index].account, description: tableBody[index].description, tag: tableBody[index].tag, date: tableBody[index].date, amount: tableBody[index].amount })
  }
}

function BodyRecord () {
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
                <th className="amountCol">{thead.amount}</th>
              </tr>
            )}
          </thead>
          <tbody>
            {a.map(tbody =>
              <tr key={tbody.id} className={tbody.transfer ? "trLine trLine-transfer" : "trLine"}>
                <td className="itemCol">{tbody.item === 0 ? <label type='button' className="ieItem incomeItem">收</label> : <label type='button' className="ieItem expensesItem">支</label>}</td>
                <td className="sortCol">{tbody.sort}</td>
                <td className="wayCol">{tbody.way}</td>
                <td className="accountCol">{tbody.account}</td>
                <td className="descriptionCol">{tbody.description}</td>
                <td className="tagCol"><label className="tagLabel">{tbody.tag}</label></td>
                <td className="dateCol NumberFont">{tbody.date}</td>
                <td className={tbody.item === 1 ? "amountCol NumberFont amountCol-red " : "amountCol NumberFont amountCol-green"}>{tbody.amount}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className="totalSpan">
        <span >
          當月結餘：
        </span>
        <span className="NumberFont">10000</span>
      </div>
    </>

  )

}


export { BodyRecord }