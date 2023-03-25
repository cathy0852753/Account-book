
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import { Form, Table, Row, Col, Container, } from "react-bootstrap"
import { TabClick } from "../components/BodyNav"
import '../components/css/BodyNav.css'
import '../components/css/BankTable.css'
import { tableHead, tableBody, account } from "../components/data"
import Expenses from '../icon/expenses.png'
import Income from '../icon/income.png'
import "chart.js/auto"
import { Chart } from "react-chartjs-2"

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
        <TabClick />
        <div className='container-fluid'>
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
        <Container className='bank-Container'>
          <Row className='bank-Row'>
            <Col xs={12} xl={7} className=''>
              {BodyRecord()}
            </Col>
            <Col xs={12} xl={5} className=''>
              {Histogram()}
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

const ExpensesAndIncome = (type) => {
  if (type === 1) {
    return (
      <img
        src={Expenses}
        className='bank-ieItem'
        alt='Expenses'
        title='Expenses'
        width={'18px'} />
    )
  } else if (type === 0) {
    return (
      <img
        src={Income}
        className='bank-ieItem'
        alt='Income'
        title='Income'
        width={'18px'} />
    )
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
                <td className="bank-itemCol">{ExpensesAndIncome(tbody.item)}</td>
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


function Histogram () {
  let d = []
  for (let index = 0; index < a.length; index++) {
    d.push(a[index].sort)
  }
  let b = d.filter((item, index) => d.indexOf(item) === index)
  console.log(d, b)
  // 每月的金額
  let c = []
  for (let index = 0; index < b.length; index++) {
    console.log(b[index])
    let mTotal = 0
    for (let tbodyIndex = 0; tbodyIndex < a.length; tbodyIndex++) {
      console.log(a[tbodyIndex].sort, a[tbodyIndex].expense)
      if (a[tbodyIndex].sort === b[index]) {
        mTotal = mTotal + parseInt(a[tbodyIndex].expense, 0)
      }
    }
    c.push(mTotal)
  }
  // 正負金額的顏色
  let cBackgroundColor = []
  let cHoverBackgroundColor = []
  for (let index = 0; index < c.length; index++) {
    if (c[index] >= 0) {
      cBackgroundColor.push("rgb(130, 171, 163, 0.5)")
      cHoverBackgroundColor.push("rgb(130,171,163,1)")
    } else {
      cBackgroundColor.push("rgb(185,87,86,0.5)")
      cHoverBackgroundColor.push("rgb(85,87,86,1)")
    }

  }
  console.log('c:', c)
  const chartData = {
    labels: b,
    datasets: [
      {
        label: "金額",
        backgroundColor: cBackgroundColor,
        hoverBackgroundColor: cHoverBackgroundColor,
        data: c
      }
    ]
  }
  return (
    <div className='bank-histogram'>
      <Chart className='bank-Chart' type="doughnut" data={chartData} options={""} />
    </div>
  )
}

export default function Record () {
  return (
    <SelectBank />
  )
}