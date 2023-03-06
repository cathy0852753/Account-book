
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import { Form, Table, } from "react-bootstrap"
import '../components/css/BodyNav.css'
import '../components/css/BankTable.css'
import { tableHead, tableBody, account } from "../components/data"

// 銀行選擇
let a = [] // a 篩選銀行暫存的陣列
class SelectBank extends React.Component {
  state = {
    bank: '現金'
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
              <tr key={tbody.id} className={tbody.item === 1 ? "bank-trLine bank-trLine-transfer" : "bank-trLine"}>
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
          存款金額：
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