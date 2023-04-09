
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import { AddBtn } from '../components/AddModal'
import { Form, Table, Row, Col, Container, } from "react-bootstrap"
import { TabClick } from "../components/BodyNav"
import '../components/css/BodyNav.css'
import '../components/css/RecordTable.css'
import { tableHead, tableBody } from "../components/data"
import Expenses from '../icon/expenses.png'
import Income from '../icon/income.png'
import { Popover, Whisper, IconButton, Loader } from 'rsuite'
import TagIcon from '@rsuite/icons/Tag'
import "chart.js/auto"
import { Pie } from "react-chartjs-2"

// Month Select

const localDate = new Date()
function SelectMonth (params) {
  const [years, setYears] = useState(localDate.getFullYear())
  const [month, setMonth] = useState(localDate.getMonth() + 1)
  const [IO, setIO] = useState('全部')
  const changeYear = (e) => {
    // console.log('Year', e)
    setYears(e.target.value)
    setIO('全部')
  }
  const changeMonth = (e) => {
    // console.log('Month', e)
    setMonth(e.target.value)
    setIO('全部')
  }
  const changeIO = (e) => {
    setIO(e.target.value)
  }

  //月份選單預設
  let defaultM
  if (month < 10) {
    defaultM = '0' + month
  } else {
    defaultM = month
  }
  // console.log(defaultM, this.state.month)

  /* -----篩選年月資料存到a陣列------------------ */
  let ab = years + '-' + defaultM
  // console.log(ab, 'aaaa:' + ab.substring(7, 5))
  if (ab.substring(7, 5) === '00') {
    ab = years + '-' + ab.substring(8, 6)
  }
  // console.log('ab:' + ab)
  let monthlyBilling = [] // monthlyBilling 篩選月份暫存的陣列
  for (let index = 0; index < tableBody.length; index++) {
    let d = tableBody[index].date
    if (d.substring(0, 7) === ab) {
      monthlyBilling.push({ id: tableBody[index].id, item: tableBody[index].item, transfer: tableBody[index].transfer, sort: tableBody[index].sort, way: tableBody[index].way, account: tableBody[index].account, description: tableBody[index].description, tag: tableBody[index].tag, date: tableBody[index].date, expense: tableBody[index].expense })
    }
  }
  /* -----年份及月分選單------------------------ */
  let yearSelect = []
  let monthSelect = []
  for (let yearsIndex = localDate.getFullYear() - 4; yearsIndex < localDate.getFullYear() + 2; yearsIndex++) {
    yearSelect.push({ value: yearsIndex, label: yearsIndex })
  }
  for (let monthIndex = 1; monthIndex <= 12; monthIndex++) {
    if (monthIndex < 10) {
      monthSelect.push({ value: '0' + monthIndex, label: '0' + monthIndex })
    } else {
      monthSelect.push({ value: monthIndex, label: monthIndex })
    }
  }
  /* ----------------------------------------- */
  return (
    <>
      <TabClick />
      <div className='container-fluid'>
        <div className='row record-itemHome'>
          <Form.Select
            className='record-select record-yearSelect'
            onChange={changeYear}
            defaultValue={years}
          >
            {yearSelect.map(el =>
              <option key={el.value} id={el.value}>{el.label}</option>
            )}
          </Form.Select>
          <span className='record-dateSpan'>-</span>
          <Form.Select
            className='record-select record-monthSelect'
            onChange={changeMonth}
            defaultValue={defaultM}
          >
            {monthSelect.map(el =>
              <option key={el.value} id={el.value}>{el.label}</option>
            )}
          </Form.Select>
          <Form.Select
            className='record-select record-IOSelect'
            onChange={changeIO}
            value={IO}
          >
            <option key='全部' id='全部'>全部</option>
            <option key='收入' id='收入'>收入</option>
            <option key='支出' id='支出'>支出</option>
          </Form.Select>
          <AddBtn />
        </div>
      </div>
      <Container className='record-Container'>
        <Row xs={1} xl={2} className="record-Row">
          <Col xs={12} xl={8} lg={12} className=''>
            {BodyRecord(monthlyBilling, IO)}
          </Col>
          <Col xs={12} xl={4} lg={12} className=''>
            {Histogram(monthlyBilling, IO)}
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
        className='record-ieItem'
        alt='Expenses'
        title='Expenses'
        width={'18px'} />
    )
  } else if (type === 0) {
    return (
      <img
        src={Income}
        className='record-ieItem'
        alt='Income'
        title='Income'
        width={'18px'} />
    )
  } else {
    return ('')
  }
}

/*--標籤------------------------------------------------*/
const DefaultPopover = React.forwardRef(({ content, ...props }, ref) => {
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  }, [])
  return (
    <Popover ref={ref} title="" {...props}>
      {loading ? (
        <Loader content="Loading..." />
      ) : (
        <div>
          <p>{content}</p>
        </div>
      )}
    </Popover>
  )
})

const ShowTag = ({ placement, tag }) => {

  return (
    <>
      {tag == null ? (
        <></>
      ) : (
        <Whisper
          trigger="click"
          placement={placement}
          controlId={`control-id-${placement}`}
          speaker={<DefaultPopover content={tag} />}
        >
          <IconButton icon={<TagIcon />} appearance="subtle" />
        </Whisper>
      )}
    </>
  )
}
/*------------------------------------------------------*/

function BodyRecord (monthlyBilling, IO) {
  // console.log(monthlyBilling)
  if (monthlyBilling.length === 0) {
    monthlyBilling = [{ id: null, item: null, transfer: null, sort: null, way: null, account: null, description: null, tag: null, date: null, expense: null, },]
  }
  let count = 0
  for (let index = 0; index < monthlyBilling.length; index++) {
    if (monthlyBilling[index].item === 1) {
      count = count - monthlyBilling[index].expense
    } else if (monthlyBilling[index].item === 0) {
      count = count + monthlyBilling[index].expense
    }
  }
  // console.log(monthlyBilling)
  let IOBilling = []
  if (IO === '全部') {
    IOBilling = monthlyBilling
    // console.log(123, IOBilling)

  } else if (IO === '收入') {
    for (let index = 0; index < monthlyBilling.length; index++) {
      if (monthlyBilling[index].item === 0) {
        IOBilling.push({ id: monthlyBilling[index].id, item: monthlyBilling[index].item, transfer: monthlyBilling[index].transfer, sort: monthlyBilling[index].sort, way: monthlyBilling[index].way, account: monthlyBilling[index].account, description: monthlyBilling[index].description, tag: monthlyBilling[index].tag, date: monthlyBilling[index].date, expense: monthlyBilling[index].expense })
      }
    }
    // console.log(456, IOBilling)
  } else if (IO === '支出') {
    for (let index = 0; index < monthlyBilling.length; index++) {
      if (monthlyBilling[index].item === 1) {
        IOBilling.push({ id: monthlyBilling[index].id, item: monthlyBilling[index].item, transfer: monthlyBilling[index].transfer, sort: monthlyBilling[index].sort, way: monthlyBilling[index].way, account: monthlyBilling[index].account, description: monthlyBilling[index].description, tag: monthlyBilling[index].tag, date: monthlyBilling[index].date, expense: monthlyBilling[index].expense })
      }
    }
    // console.log(789, IOBilling)
  }

  return (
    <>
      <div className="record-bg-table">
        <Table hover responsive="sm" className="record-table" >
          <thead>
            {tableHead.map(thead =>
              <tr key={thead.id}>
                <th className="record-itemCol" >{thead.item}</th>
                <th className="record-sortCol">{thead.sort}</th>
                <th className="record-wayCol">{thead.way}</th>
                <th className="record-accountCol">{thead.account}</th>
                <th className="record-descriptionCol">{thead.description}</th>
                <th className="record-tagCol">{thead.tag}</th>
                <th className="record-dateCol">{thead.date}</th>
                <th className="record-amountCol">{thead.expense}</th>
              </tr>
            )}
          </thead>
          <tbody>
            {IOBilling.map(tbody =>
              <tr key={tbody.id} className={tbody.item === 1 ? "record-trLine record-trLine-transfer" : "record-trLine"}>
                <td className="record-itemCol">{ExpensesAndIncome(tbody.item)}</td>
                <td className="record-sortCol">{tbody.sort}</td>
                <td className="record-wayCol">{tbody.way}</td>
                <td className="record-accountCol">{tbody.account}</td>
                <td className="record-descriptionCol">{tbody.description}</td>
                <td className="record-tagCol"><ShowTag placement="rightStart" tag={tbody.tag} /></td>
                <td className="record-dateCol record-NumberFont">{tbody.date}</td>
                <td className={tbody.item === 1 ? "record-amountCol record-NumberFont record-amountCol-red " : "record-amountCol record-NumberFont record-amountCol-green"}>{tbody.expense}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className="record-totalSpan">
        <span >
          當月結餘：
        </span>
        <span className={count < 0 ? " record-NumberFont record-amountCol-red " : " record-NumberFont record-amountCol-green"}>{count}</span>
      </div>
    </>
  )
}

function Histogram (monthlyBilling, IO) {
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

  let SortMenu = []
  let SortSum = []
  let Sum
  // console.log(monthlyBilling)
  if (IO === '全部') {
    SortMenu = ['收入', '支出']
    for (let index = 0; index < SortMenu.length; index++) {
      SortSum[index] = 0
    }
    for (let index = 0; index < monthlyBilling.length; index++) {
      if (monthlyBilling[index].item === 0) {
        SortSum[0] += parseInt(monthlyBilling[index].expense)
      }
      if (monthlyBilling[index].item === 1) {
        SortSum[1] += parseInt(monthlyBilling[index].expense)
      }
    }
  } else if (IO === '收入') {
    for (let sortIndex = 0; sortIndex < monthlyBilling.length; sortIndex++) {
      // console.log(monthlyBilling[sortIndex].sort, monthlyBilling[sortIndex].item)
      if (monthlyBilling[sortIndex].item === 0) {
        SortMenu.push(monthlyBilling[sortIndex].sort)
      }
    }
    SortMenu = SortMenu.filter((item, index) => SortMenu.indexOf(item) === index)
    for (let index = 0; index < SortMenu.length; index++) {
      Sum = 0
      for (let bill = 0; bill < monthlyBilling.length; bill++) {
        if (monthlyBilling[bill].sort === SortMenu[index]) {
          Sum = Sum + parseInt(monthlyBilling[bill].expense)
        }
      }
      SortSum.push(Sum)
    }
  } else if (IO === '支出') {
    for (let sortIndex = 0; sortIndex < monthlyBilling.length; sortIndex++) {
      // console.log(monthlyBilling[sortIndex].sort, monthlyBilling[sortIndex].item)
      if (monthlyBilling[sortIndex].item === 1) {
        SortMenu.push(monthlyBilling[sortIndex].sort)
      }
    }
    SortMenu = SortMenu.filter((item, index) => SortMenu.indexOf(item) === index)
    for (let index = 0; index < SortMenu.length; index++) {
      Sum = 0
      for (let bill = 0; bill < monthlyBilling.length; bill++) {
        if (monthlyBilling[bill].sort === SortMenu[index]) {
          Sum = Sum + parseInt(monthlyBilling[bill].expense)
        }
      }
      SortSum.push(Sum)
    }
  }
  // console.log(SortMenu, SortSum)
  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: IO,
      },
    },
  }
  const chartDataIO = {
    labels: ['收入', '支出'],
    datasets: [
      {
        label: "金額",
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        hoverBackgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
        data: SortSum,
        offset: 10,
        hoverOffset: 15
      }
    ]
  }
  const chartData = {
    labels: SortMenu,
    datasets: [
      {
        label: "金額",
        backgroundColor: IO === '收入' ? iStorColor : oStorColor,
        hoverBackgroundColor: IO === '收入' ? iStorHoverColor : oStorHoverColor,
        borderColor: IO === '收入' ? iSortBorderColor : oSortBorderColor,
        borderWidth: 1,
        data: SortSum,
        offset: 10,
        hoverOffset: 15
      }
    ]
  }
  return (
    <>
      <div className='bank-histogram'>
        <Pie className='bank-Chart'

          data={IO === '全部' ? chartDataIO : chartData}
          options={options} />
      </div>
    </>

  )
}


export default function Record () {
  return (
    <SelectMonth />
  )
}

