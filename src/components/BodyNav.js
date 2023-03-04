
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import {
  Navbar,
  Form,
  Button,
  Modal,
  ModalHeader,
  Container,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap"
import { RiAddFill } from "react-icons/ri"
import { Label, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


// Tabs
class TabClick extends React.Component {
  render () {
    let ClassName = "navLink"
    let activeClassName = "navLink-active"
    return (
      <div>
        <Navbar
          key={'false'}
          expand={'false'}
          className="bg-navbar"
        >
        </Navbar>
        <nav className='nav'>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClassName : ClassName}>
            記帳
          </NavLink>
          <NavLink
            to="Bank"
            className={({ isActive }) =>
              isActive ? activeClassName : ClassName}>
            銀行
          </NavLink>
          <NavLink to="Card"
            className={({ isActive }) =>
              isActive ? activeClassName : ClassName}>
            信用卡
          </NavLink>

        </nav>
      </div >

    )
  }
}

class ModalLabel extends React.Component {
  state = {
    clickIncome: false,
    clickExpenses: true,
    type: 2 //變化分類的索引
  }
  clickIncome = (e, msg) => {
    e.preventDefault()
    this.setState({
      clickIncome: true,
      clickExpenses: false,
      type: 1
    })
    console.log('觸發', msg, e)
  }
  clickExpenses = (e, msg) => {
    e.preventDefault()
    this.setState({
      clickIncome: false,
      clickExpenses: true,
      type: 2
    })
    console.log('觸發', msg, e)
  }
  render () {
    return (
      <>
        <ModalHeader closeButton className='modalHeader' >
          {/* 新增裡的收支變化 */}
          <Container>
            <Row>
              <Col xs={2} className='modal-labelHome'>
                <label
                  type='button'
                  value='0'
                  onClick={(e) => this.clickIncome(e, 'income')}
                  className={this.state.clickIncome ? 'modal-label modalLabel-income' : 'modal-label modalLabel-unSelect'}
                >收</label>
              </Col>
              <Col xs={2} className='modal-labelHome'>
                <label
                  type='button'
                  value='1'
                  onClick={(e) => this.clickExpenses(e, 'expenses')}
                  className={this.state.clickExpenses ? 'modal-label modalLabel-expenses' : 'modal-label modalLabel-unSelect'}
                >支</label>
              </Col>
              <Col xs={1}>
                <Form.Check
                  className='modalSwitch'
                  type='switch'
                  id='custom-switch'
                />
              </Col>
            </Row>
          </Container>
        </ModalHeader >
        <Form>
          <Modal.Body className='modalBody'>
            <Container>
              <Row className='modalRow'>
                <Col xs={6}>
                  <span className='modalBody-item'>日期</span>
                  <SelectDate className='dateInput' />
                </Col>
                <Col xs={6}>
                  <span className='modalBody-item'>分類</span>
                  {ChangeSort(this.state.type)}
                </Col>
              </Row>
              <Row className='modalRow'>
                <ChangeWay />
              </Row>
              <TagSelect />
              <Row className='modalRow'>
                <Col xs={12}>
                  <span className='modalBody-item'>備註</span>
                  <textarea name="remark"></textarea>
                </Col>
              </Row>
              <Row className='confirmBtnRow'>
                <Button
                  type='submit'
                  className='confirmBtn'
                  variant="primary"
                >
                  confirm
                </Button>
              </Row>
            </Container>

          </Modal.Body >

        </Form>

      </>
    )

  }
}

//新增裡的分類變化
const ChangeSort = (type) => {
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
  let sort = []
  let sortT = []
  if (type === 1) {
    for (let index = 0; index < sortI.length; index++) {
      if (sortI[index].transfer === false) {
        sort.push({ value: sortI[index].value, label: sortI[index].label })
      } else {
        sortT.push({ value: sortI[index].value, label: sortI[index].label })
      }
    }
    return (
      <Form.Select className='modalSelect' name="sort">
        <optgroup label="收入">
          {sort.map(el =>
            <option key={el.value} value={el.value}>{el.label}</option>
          )}
        </optgroup>
        <optgroup label="移轉">
          {sortT.map(el =>
            <option key={el.value} value={el.value}>{el.label}</option>
          )}
        </optgroup>
      </Form.Select>
    )
  }
  else if (type === 2) {
    for (let index = 0; index < sortE.length; index++) {
      if (sortE[index].transfer === false) {
        sort.push({ value: sortE[index].value, label: sortE[index].label })
      } else {
        sortT.push({ value: sortE[index].value, label: sortE[index].label })
      }
    }
    return (
      <Form.Select className='modalSelect' name="sort">
        <optgroup label="支出" className='fontText'>
          {sort.map(el =>
            <option key={el.value} value={el.value}>{el.label}</option>
          )}
        </optgroup>
        <optgroup label="移轉" className='fontText'>
          {sortT.map(el =>
            <option key={el.value} value={el.value}>{el.label}</option>
          )}
        </optgroup>
      </Form.Select>
    )
  }
}

//新增裡的帳戶及方式變化
class ChangeWay extends React.Component {
  account = [
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
  way = [
    { value: 'Cash', label: '現金' },
    { value: 'Credit card', label: '信用卡' },
    { value: 'Transfer', label: '轉帳' }
  ]
  state = {
    a: 0
  }
  changeAccount = (e) => {
    console.log('change事件被觸發了', e)
    this.setState({
      a: e.target.selectedIndex
    })
    console.log(e.target.selectedIndex)
  }
  render () {
    let w = []
    for (let index = 0; index < this.way.length; index++) {
      if (this.account[this.state.a].way1 === this.way[index].value) {
        w.push({ value: this.way[index].value, label: this.way[index].label })
      }
      if (this.account[this.state.a].way2 === this.way[index].value) {
        w.push({ value: this.way[index].value, label: this.way[index].label })
      }
    }

    return (
      <>
        <Col xs={6}>
          <span className='modalBody-item'>帳戶</span>
          <Form.Select className='modalSelect' name="account" onChange={this.changeAccount}>
            {this.account.map(el =>
              <option key={el.value} value={el.value}>{el.label}</option>
            )}
          </Form.Select>
        </Col>
        <Col xs={6}><span className='modalBody-item'>方式</span>
          <Form.Select className='modalSelect' name="way">
            {w.map(el =>
              <option key={el.value} value={el.value}>{el.label}</option>
            )}
          </Form.Select>

        </Col>
      </>
    )
  }
}

//新增裡的日期選擇
const SelectDate = () => {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <DatePicker
      name='date'
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      // isClearable
      className='inputBox'
      placeholderText="請選擇日期"
      dateFormat='yyyy-MM-dd'
    />
  )
}

class TagSelect extends React.Component {
  tagOptions = [
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
  state = {
    a: '',
    b: ''
  }
  addTag = (e) => {
    console.log('新增標籤', e)
    this.setState({
      a: e.target.text,
      b: ''
    })
    console.log('e:', e.target.text, 'a:', this.state.a)
  }
  removeTag = (e) => {
    console.log('移除標籤', e)
    console.log(e.target.parentElement.innerText)
    this.setState({
      a: 0,
      b: e.target.parentElement.innerText
    })
  }
  t = []
  v = []   //顯示在input的陣列
  render () {
    console.log('a:', this.state.a)
    let type = this.tagOptions.map(function (item) {
      return item.value
    }).indexOf(this.state.a)
    console.log('type:', type)
    //將標籤新增置t陣列中，選過的標籤會被隱藏
    if (type >= 0) {
      this.t.push({
        value: this.tagOptions[type].value,
        label: this.tagOptions[type].label,
        color: this.tagOptions[type].color,
      })
      this.tagOptions[type].hidden = true
      this.v.push(this.tagOptions[type].value)
    }
    console.log('t:', this.t, 'v:', this.v)
    //找出要刪除的標籤在t陣列裡的位置
    let num = this.t.map(function (item) {
      return item.value
    }).indexOf(this.state.b)
    let Num = this.tagOptions.map(function (item) {
      return item.value
    }).indexOf(this.state.b)
    if (num >= 0) {
      this.tagOptions[Num].hidden = false
      this.t.splice(num, 1)
      this.v.splice(num, 1)
    }
    return (
      <>
        <Row className='modalRow'>
          <Col xs={6}>
            <span className='modalBody-item'>金額</span>
            <input
              type="number"
              required
              autoComplete="off"
              className='modalExpense'
              name="expense" />
          </Col>
          <Col xs={6}>
            <span className='modalBody-item'>標籤</span>
            <Dropdown>
              <Dropdown.Toggle className='modalDropdown'>
                選擇標籤
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {this.tagOptions.map(el =>
                  <Dropdown.Item onClick={this.addTag} hidden={el.hidden ? 'hidden' : ''}>{el.label}</Dropdown.Item>
                )}
                {/* hidden={el.hidden ? 'hidden' : ''} */}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row className='modalRow'>
          <Col xs={12} className='tagShow'>
            <input defaultValue={this.v} hidden name='tag' />
            <div >
              {this.t.map(el =>
                <Label className={el.color}>
                  {el.label}
                  <Icon key={el.value} name='delete' onClick={this.removeTag} />
                </Label>
              )}
            </div>

          </Col>
        </Row>
      </>
    )
  }
}


function AddBtn () {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      <Button onClick={handleShow} className='CircleBtn addBtn'>
        <RiAddFill className='svgAdd' />
      </Button>
      <Modal
        size='lg'
        className="modal"
        show={show}
        onHide={handleClose}
        backdrop="static"   // 點旁邊不能關閉
        animation={false}   // false:直接出現 true:下滑出現
        keyboard={false}    // 設定快捷鍵
      >
        <ModalLabel />
      </Modal >
    </>

  )
}


export { TabClick, AddBtn }
