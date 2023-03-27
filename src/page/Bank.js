
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import { Form, Table, Row, Col, Container, } from "react-bootstrap"
import { TabClick } from "../components/BodyNav"
import '../components/css/BodyNav.css'
import '../components/css/BankTable.css'
import { tableHead, tableBody, account, sortE, sortI } from "../components/data"
import Expenses from '../icon/expenses.png'
import Income from '../icon/income.png'
import "chart.js/auto"
import { Pie } from "react-chartjs-2"

// 銀行選擇
function SelectBank (params) {
  const [bank, setBank] = useState('現金')
  const changeBank = (e) => {
    // console.log('Bank', e)
    setBank(e.target.value)
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
        </div>
      </div>
      <Container className='bank-Container'>
        <Row className='bank-Row'>
          <Col xs={12} xl={7} className=''>
            {BodyRecord(bankBilling)}
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


function BodyRecord (bankBilling) {
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
  // console.log(count)
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
            {bankBilling.map(tbody =>
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

function Histogram (bankBilling) {
  const [select, setSelect] = useState(0)
  const iStorColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ]
  const iStorHoverColor = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
  ]
  const iSortBorderColor = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ]
  const oStorColor = iStorColor.slice(0, iStorColor.length).reverse()
  const oStorHoverColor = iStorHoverColor.slice(0, iStorHoverColor.length).reverse()
  const oSortBorderColor = iSortBorderColor.slice(0, iSortBorderColor.length).reverse()
  let sortMenu = []
  let oSortMenu = [], iSortMenu = []
  for (let index = 0; index < bankBilling.length; index++) {
    sortMenu.push(bankBilling[index].sort)
  }
  sortMenu = sortMenu.filter((item, index) => sortMenu.indexOf(item) === index)
  for (let index = 0; index < sortMenu.length; index++) {
    for (let sortEIndex = 0; sortEIndex < sortE.length; sortEIndex++) {
      if (sortE[sortEIndex].label === sortMenu[index]) {
        oSortMenu.push(sortMenu[index])
      }
    }
    for (let sortIIndex = 0; sortIIndex < sortI.length; sortIIndex++) {
      if (sortI[sortIIndex].label === sortMenu[index]) {
        iSortMenu.push(sortMenu[index])
      }
    }
  }
  console.log(oSortMenu, iSortMenu)
  // console.log(sortMenu)
  // 每月的金額
  let iSortSum = []
  let oSortSum = []
  let iSum = 0
  let oSum = 0
  for (let index = 0; index < oSortMenu.length; index++) {
    for (let bill = 0; bill < bankBilling.length; bill++) {
      if (bankBilling[bill].sort === oSortMenu[index]) {
        oSum = oSum + parseInt(bankBilling[bill].expense)
      }
    }
    oSortSum.push(oSum)
  }
  for (let index = 0; index < iSortMenu.length; index++) {
    for (let bill = 0; bill < bankBilling.length; bill++) {
      if (bankBilling[bill].sort === iSortMenu[index]) {
        iSum = iSum + parseInt(bankBilling[bill].expense)
      }
    }
    iSortSum.push(iSum)
  }
  console.log(oSortSum)
  const changeIO = (e) => {
    console.log(e.target.options.selectedIndex)
    setSelect(e.target.options.selectedIndex)
  }
  const options = {
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
  const chartDataI = {
    labels: iSortMenu,
    datasets: [
      {
        label: "金額",
        backgroundColor: iStorColor,
        hoverBackgroundColor: iStorHoverColor,
        borderColor: iSortBorderColor,
        borderWidth: 1,
        data: iSortSum,
        offset: 10,
        hoverOffset: 15
      }
    ]
  }
  const chartDataO = {
    labels: oSortMenu,
    datasets: [
      {
        label: "金額",
        backgroundColor: oStorColor,
        hoverBackgroundColor: oStorHoverColor,
        borderColor: oSortBorderColor,
        borderWidth: 1,
        data: oSortSum,
        offset: 10,
        hoverOffset: 15
      }
    ]
  }
  return (
    <>
      <Form.Select
        className='bank-select bank-yearSelect'
        onChange={changeIO}
      >
        <option key='0' id='0'>收入</option>
        <option key='1' id='1'>支出</option>
      </Form.Select>
      <div className='bank-histogram'>
        <Pie className='bank-Chart'

          data={select === 0 ? chartDataI : chartDataO}
          options={options} />
      </div>
    </>

  )
}

export default function Record () {
  return (
    <SelectBank />
  )
}