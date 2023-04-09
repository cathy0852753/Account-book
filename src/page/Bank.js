
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import { Form, Table, Row, Col, Container, } from "react-bootstrap"
import { TabClick } from "../components/BodyNav"
import '../components/css/BodyNav.css'
import '../components/css/BankTable.css'
import { tableHead, tableBody, account, } from "../components/data"
import Expenses from '../icon/expenses.png'
import Income from '../icon/income.png'
import "chart.js/auto"
import { Bar } from "react-chartjs-2"

const MonthArray = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

// 銀行選擇
function SelectBank (params) {
  const [bank, setBank] = useState('現金')
  const [month, setMonth] = useState('選擇月份')
  const changeBank = (e) => {
    // console.log('Bank', e)
    setBank(e.target.value)
    setMonth('選擇月份')
  }
  const changeMonth = (e) => {
    // console.log('month', e.target.value)
    setMonth(e.target.value)
  }
  let bankBilling = [] // a 篩選銀行暫存的陣列
  for (let index = 0; index < tableBody.length; index++) {
    let d = tableBody[index].account
    if (d === bank) {
      bankBilling.push({ id: tableBody[index].id, item: tableBody[index].item, transfer: tableBody[index].transfer, sort: tableBody[index].sort, way: tableBody[index].way, account: tableBody[index].account, description: tableBody[index].description, tag: tableBody[index].tag, date: tableBody[index].date, expense: tableBody[index].expense })
    }
  }
  return (
    <>
      <TabClick />
      <div className='container-fluid'>
        <div className='row bank-itemHome'>
          <Form.Select
            className='bank-select bank-yearSelect'
            onChange={changeBank}
            defaultValue={bank}
          >
            {account.map(el =>
              <option key={el.value} id={el.value}>{el.label}</option>
            )}
          </Form.Select>
          <Form.Select
            className='bank-select bank-yearSelect'
            onChange={changeMonth}
            value={month}
          >
            <option>選擇月份</option>
            {MonthArray.map(el =>
              <option key={el} id={el}>{el}</option>
            )}
          </Form.Select>
        </div>
      </div>
      <Container className='bank-Container'>
        <Row className='bank-Row'>
          <Col xs={12} xl={7} className=''>
            {BodyRecord(bankBilling, month)}
          </Col>
          <Col xs={12} xl={5} className=''>
            {Histogram(bankBilling)}
          </Col>
        </Row>
      </Container>
    </>
  )
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

function BodyRecord (bankBilling, month) {
  // console.log(bankBilling)
  if (bankBilling.length === 0) {
    bankBilling = [{ id: null, item: null, transfer: null, sort: null, way: null, account: null, description: null, tag: null, date: null, expense: null, },]
  }
  let count = 0
  for (let index = 0; index < bankBilling.length; index++) {
    if (bankBilling[index].item === 1) {
      count = count - bankBilling[index].expense
    } else if (bankBilling[index].item === 0) {
      count = count + bankBilling[index].expense
    }
  }
  // console.log(MonthArray.indexOf(month))
  let monthBilling = []
  if (MonthArray.indexOf(month) >= 0) {
    for (let index = 0; index < bankBilling.length; index++) {
      if (parseInt(bankBilling[index].date.substring(7, 5)) === (MonthArray.indexOf(month) + 1)) {
        monthBilling.push({ id: bankBilling[index].id, item: bankBilling[index].item, transfer: bankBilling[index].transfer, sort: bankBilling[index].sort, way: bankBilling[index].way, account: bankBilling[index].account, description: bankBilling[index].description, tag: bankBilling[index].tag, date: bankBilling[index].date, expense: bankBilling[index].expense })
      }
    }
    // console.log(456, monthBilling)
  } else {
    // console.log(123)
    monthBilling = bankBilling
    // console.log(123, monthBilling)
  }

  return (
    <>
      <div className="bank-bg-table">
        <Table hover responsive="sm" >
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
            {monthBilling.map(tbody =>
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
          帳戶餘額：
        </span>
        <span className={count < 0 ? " bank-NumberFont bank-amountCol-red " : " bank-NumberFont bank-amountCol-green"}>{count}</span>
      </div>
    </>
  )
}

function Histogram (bankBilling) {
  // const [select, setSelect] = useState(0)
  // const iStorColor = [
  //   'rgba(255, 99, 132, 0.2)',
  //   'rgba(54, 162, 235, 0.2)',
  //   'rgba(255, 206, 86, 0.2)',
  //   'rgba(75, 192, 192, 0.2)',
  //   'rgba(153, 102, 255, 0.2)',
  //   'rgba(255, 159, 64, 0.2)',
  // ]
  // const iStorHoverColor = [
  //   'rgba(255, 99, 132, 0.8)',
  //   'rgba(54, 162, 235, 0.8)',
  //   'rgba(255, 206, 86, 0.8)',
  //   'rgba(75, 192, 192, 0.8)',
  //   'rgba(153, 102, 255, 0.8)',
  //   'rgba(255, 159, 64, 0.8)',
  // ]
  // const iSortBorderColor = [
  //   'rgba(255, 99, 132, 1)',
  //   'rgba(54, 162, 235, 1)',
  //   'rgba(255, 206, 86, 1)',
  //   'rgba(75, 192, 192, 1)',
  //   'rgba(153, 102, 255, 1)',
  //   'rgba(255, 159, 64, 1)',
  // ]
  // const oStorColor = iStorColor.slice(0, iStorColor.length).reverse()
  // const oStorHoverColor = iStorHoverColor.slice(0, iStorHoverColor.length).reverse()
  // const oSortBorderColor = iSortBorderColor.slice(0, iSortBorderColor.length).reverse()
  let oSum = [], iSum = []
  for (let index = 0; index < 12; index++) {
    oSum[index] = 0
    iSum[index] = 0
  }

  // console.log(parseInt(bankBilling[0].date.substring(7, 5)))
  for (let index = 0; index < bankBilling.length; index++) {
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      if (parseInt(bankBilling[index].date.substring(7, 5)) === (monthIndex + 1)) {
        if (bankBilling[index].item === 1) {
          oSum[monthIndex] += parseInt(bankBilling[index].expense)
          // console.log(expense)
        }
        if (bankBilling[index].item === 0) {
          iSum[monthIndex] += parseInt(bankBilling[index].expense)
          // console.log(iSum[monthIndex])
        }
      }
    }
  }
  // console.log(oSum, iSum)

  const options = {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: '',
      },
    },
  }

  const labels = MonthArray

  const data = {
    labels,
    datasets: [
      {
        label: '收入',
        data: iSum,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        offset: 10,
        hoverOffset: 15
      },
      {
        label: '支出',
        data: oSum,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        offset: 10,
        hoverOffset: 15
      },
    ],
  }
  return (
    <>
      <div className='bank-histogram'>
        <Bar className='bank-Chart'
          data={data}
          options={options} />
      </div>
    </>

  )
}

export default function Bank () {
  return (
    <SelectBank />
  )
}