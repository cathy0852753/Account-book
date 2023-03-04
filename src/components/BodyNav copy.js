
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/BodyNav.css'
import 'semantic-ui-css/semantic.min.css'
import {
  Nav,
  Form,
  Button,
  Modal,
  ModalHeader,
  Container,
  Row,
  Col,
  InputGroup,

} from "react-bootstrap"
import {
  RiAddFill,
} from "react-icons/ri"
import { Label, Icon } from 'semantic-ui-react'

// Tabs
class TabClick extends React.Component {
  tabs = [
    { id: 1, name: '記帳', to: "/" },
    { id: 2, name: '銀行', to: "/Bank" },
    { id: 3, name: '信用卡', to: "/Card" }
  ]
  state = {
    clickTab: 1
  }
  changeLinkColor = (e, id) => {
    e.preventDefault()
    this.setState({
      clickTab: id
    })
    console.log('觸發', id, this.state.clickTab, e)
    console.log(e.target.classList)
  }
  clickTabColor = this.state.clickTab
  render () {
    return (
      <div>
        <Nav
          defaultActiveKey="/"
          className='bg-nav'
        >
          {this.tabs.map(tabs =>
            <Nav.Item className='bg-navItem' >
              <Nav.Link
                key={tabs.id}
                onClick={(e) => this.changeLinkColor(e, tabs.id)}
                className={this.state.clickTab === tabs.id ? "bg-navLink-Line active" : "bg-navLink"}
                to={tabs.to}
              >
                {tabs.name}
              </Nav.Link>
            </Nav.Item >
          )}
        </Nav>
      </div>

    )
  }
}

// Month Select

class SelectMonth extends React.Component {
  state = {

  }

  render () {
    let selectMonth = []
    const localDate = new Date()
    console.log(localDate.getFullYear())
    for (let years = localDate.getFullYear() - 1; years < localDate.getFullYear() + 2; years++) {
      console.log(years)
      for (let month = 0; month < 12; month++) {
        let m = month + 1
        if (m < 10) {
          m = '0' + m
        }
        let date = years + '-' + m   //顯示的格式
        let dateL = years + '-' + month  //判斷是否為這個月的格式
        if (dateL === localDate.getFullYear() + '-' + localDate.getMonth()) {
          if (m < 10) {
            m = '0' + month
          }
          selectMonth.push({ value: date, name: date, select: 'selected' })
        } else {
          selectMonth.push({ value: date, name: date, select: '' })
        }
      }
    }
    console.log(selectMonth)
    return (
      <Form.Select className='Select'>
        {selectMonth.map(selectMonth =>
          <option key={selectMonth.value} id={selectMonth.value} selected={selectMonth.select}>{selectMonth.name}</option>
        )}
      </Form.Select>
    )
  }
}


class ModalLabel extends React.Component {
  state = {
    clickIncome: false,
    clickExpenses: true
  }
  clickIncome = (e, msg) => {
    e.preventDefault()
    this.setState({
      clickIncome: true,
      clickExpenses: false
    })
    console.log('觸發', msg, e)
  }
  clickExpenses = (e, msg) => {
    e.preventDefault()
    this.setState({
      clickIncome: false,
      clickExpenses: true
    })
    console.log('觸發', msg, e)
  }
  render () {
    return (
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
        <ModalHeader closeButton className='modalHeader' >
          <ModalLabel />
        </ModalHeader >
        <Modal.Body className='modalBody'>
          <Container>
            <Row className='modalRow'>
              <Col xs={6}>
                <span className='modalBody-item'>日期</span>
                <InputGroup className='dateInput'>
                  <Form.Control className='dateInputBox'
                    placeholder='2023-01-09'
                  />
                </InputGroup>
              </Col>
              <Col xs={6}>
                <span className='modalBody-item'>分類</span>
                <Form.Select className='modalSelect'>
                  <option>電子票證加值</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className='modalRow'>
              <Col xs={6}>
                <span className='modalBody-item'>方式</span>
                <Form.Select className='modalSelect'>
                  <option>電子票證加值</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Form.Select>
              </Col>
              <Col xs={6}>
                <span className='modalBody-item'>帳戶</span>
                <Form.Select className='modalSelect'>
                  <option>電子票證加值</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className='modalRow'>
              <Col xs={6}>
                <span className='modalBody-item'>金額</span>
                <input className='modalSelect'></input>
              </Col>
            </Row>
            <Row className='modalRow'>
              <Col xs={12}>
                <span className='modalBody-item'>標籤</span>
                <Label color='teal' className='modalLabel' >
                  昂貴染護髮
                  <Icon name='delete' />
                </Label>
              </Col>
            </Row>
            <Row className='modalRow'>
              <Col xs={12}>
                <span className='modalBody-item'>備註</span>
                <textarea></textarea>
              </Col>
            </Row>
          </Container>
        </Modal.Body >
        <Modal.Footer className='modalFooter'>
          <Button
            className='confirmBtn'
            variant="primary"
            onClick={handleClose}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal >
    </>

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
    a: 0,
    b: '',
    value: '選擇標籤'
  }
  addTag = (e) => {
    console.log('新增標籤', e)
    this.setState({
      a: e.target.selectedIndex,
      b: '',
      value: '選擇標籤'
    })
    // console.log(e.target.selectedIndex, this.state.a)
  }
  removeTag = (e) => {
    console.log('移除標籤', e)
    console.log(e.target.parentElement.innerText)
    this.setState({
      a: 0,
      b: e.target.parentElement.innerText,
      value: '選擇標籤'
    })
  }
  t = []
  v = []   //顯示在input的陣列
  render () {
    let type = this.state.a
    //將標籤新增置t陣列中，選過的標籤會被隱藏
    if (type > 0) {
      this.t.push({
        value: this.tagOptions[type - 1].value,
        label: this.tagOptions[type - 1].label,
        color: this.tagOptions[type - 1].color,
      })
      this.tagOptions[type - 1].hidden = true
      this.v.push(this.tagOptions[type - 1].value)
    }
    console.log(this.v)
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
            <Form.Select
              className='modalSelect'
              onChange={this.addTag}
              defaultValue={this.state.value}
            >
              <option hidden value='選擇標籤'> -- 選擇標籤 -- </option>
              {this.tagOptions.map(el =>
                <option key={el.value} value={el.value} hidden={el.hidden ? 'hidden' : ''}  >{el.label}</option>
              )}
            </Form.Select>
          </Col>
        </Row>
        <Row className='modalRow'>
          <Col xs={12}>
            <input value={this.v} hidden name='tag' />
            <div>
              {this.t.map(el =>
                <Label value={el.value} className={el.color}>
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

export { TabClick, SelectMonth, AddBtn, TagSelect }

// export default function BodyNav () {
//   return (
//     <>
//       <TabClick />
//       <div className='container-fluid'>
//         <div className='row itemHome'>
//           <SelectMonth />
//           <AddBtn />
//         </div>
//       </div>
//       <BodyRecord />

//     </>

//   )
// }