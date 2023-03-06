
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import { AddBtn } from '../components/BodyNav'
import { Form, Table, } from "react-bootstrap"
import '../components/css/BodyNav.css'
import '../components/css/RecordTable.css'
import { tableHead, tableBody } from "../components/data"

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
    let defaultM
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
        <div className='record-container-fluid'>
          <div className='row record-itemHome'>
            <Form.Select
              className='record-select record-yearSelect'
              onChange={this.changeYear}
              defaultValue={this.state.years}
            >
              {yearSelect.map(el =>
                <option key={el.value} id={el.value}>{el.label}</option>
              )}
            </Form.Select>
            <span className='record-dateSpan'>-</span>
            <Form.Select
              className='record-select record-monthSelect'
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
    return (<label type='button' className="record-ieItem record-expensesItem">支</label>)
  } else if (type === 0) {
    return (<label type='button' className="record-ieItem record-incomeItem">收</label>)
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
            {a.map(tbody =>
              <tr key={tbody.id} className={tbody.transfer ? "record-trLine record-trLine-transfer" : "record-trLine"}>
                <td className="record-itemCol">{item(tbody.item)}</td>
                <td className="record-sortCol">{tbody.sort}</td>
                <td className="record-wayCol">{tbody.way}</td>
                <td className="record-accountCol">{tbody.account}</td>
                <td className="record-descriptionCol">{tbody.description}</td>
                <td className="record-tagCol">{tbody.tag === null ? '' : <label className="record-tagLabel">{tbody.tag}</label>}</td>
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

export default function Record () {
  return (
    <SelectMonth />
  )
}

