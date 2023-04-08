import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/AddModal.css'
import {
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap"
import {
  Modal,
  ButtonToolbar,
  Button,
  DatePicker,
  SelectPicker,
  CheckPicker,
  InputNumber,
  Input,
} from 'rsuite'
import { account, way, tagOptions, sortE, sortI } from './data'
import Add from '../icon/add.png'
import selectExpenses from '../icon/expenses.png'
import selectIncome from '../icon/income.png'
import Unselected from '../icon/unselected.png'

function ModalLabel (params) {
  const [income, setIncome] = useState(false)
  const [expenses, setExpenses] = useState(true)
  const [type, setType] = useState(2)

  const clickIncome = (e, msg) => {
    e.preventDefault()
    setExpenses(false)
    setIncome(true)
    setType(1)
    // console.log('觸發', msg, e)
  }
  const clickExpenses = (e, msg) => {
    e.preventDefault()
    setExpenses(true)
    setIncome(false)
    setType(2)
    // console.log('觸發', msg, e)
  }

  return (
    <>
      <Container>
        <Row>
          <Col xs={2} className='modal-labelHome'>
            <img
              type='button'
              onClick={(e) => clickIncome(e, 'income')}
              src={income ? selectIncome : Unselected}
              className='record-ieItem'
              alt={income ? 'selectIncome' : 'Unselected'}
              title={income ? 'Select income' : 'Unselect income'}
              width={'18px'} />
          </Col>
          <Col xs={2} className='modal-labelHome'>
            <img
              type='button'
              onClick={(e) => clickExpenses(e, 'expenses')}
              src={expenses ? selectExpenses : Unselected}
              className='record-ieItem'
              alt={expenses ? 'selectExpenses' : 'Unselected'}
              title={expenses ? 'Select expenses' : 'Unselect expenses'}
              width={'18px'} />
          </Col>
        </Row>
      </Container>
      <Form target='_top'>
        <Modal.Body className='modalBody'>
          <Container>
            <Row className='modalRow'>
              <Col xs={6}>
                <span className='modalBody-item'>日期</span>
                <DatePicker oneTap defaultValue={new Date()} className='modalSelect' />
              </Col>
              <Col xs={6}>
                <span className='modalBody-item'>分類</span>
                {ChangeSort(type)}
              </Col>
            </Row>
            <Row className='modalRow'>
              <ChangeWay />
            </Row>
            <TagSelect />
            <Row className='modalRow'>
              <Col xs={12}>
                <span className='modalBody-item'>備註</span>
                <Input as='textarea' placeholder="輸入備註內容" />
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


//新增裡的分類變化
const ChangeSort = (type) => {
  let sort = []
  let sortT = []
  if (type === 1) {
    const dataI = sortI.map(
      item => ({
        label: item.label,
        value: item.value,
        role: item.transfer ? '移轉' : '收入'
      })
    )
    return (
      <SelectPicker data={dataI} placeholder="請選擇" groupBy="role" className='modalSelect' />
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
    const dataE = sortE.map(
      item => ({
        label: item.label,
        value: item.value,
        role: item.transfer ? '移轉' : '支出'
      })
    )
    return (
      <SelectPicker data={dataE} placeholder="請選擇" groupBy="role" className='modalSelect' />
    )
  }
}

//新增裡的帳戶及方式變化
function ChangeWay (params) {
  const [acc, setAcc] = useState(1)
  let accIndex = 0
  let accWay = []
  for (let index = 0; index < account.length; index++) {
    if (account[index].value === acc) {
      accIndex = index
    }
  }
  console.log(accIndex)
  for (let index = 0; index < way.length; index++) {
    if (account[accIndex].way1 === way[index].value) {
      accWay.push({ value: way[index].value, label: way[index].label })
    }
    if (account[accIndex].way2 === way[index].value) {
      accWay.push({ value: way[index].value, label: way[index].label })
    }
  }
  const AccData = account.map(
    item => ({
      label: item.label,
      value: item.value
    })
  )
  console.log(acc)
  return (
    <>
      <Col xs={6}>
        <span className='modalBody-item'>帳戶</span>
        <SelectPicker
          data={AccData}
          defaultValue={"1"}
          className='modalSelect'
          onChange={setAcc}
        />
      </Col>
      <Col xs={6}><span className='modalBody-item'>方式</span>
        <SelectPicker data={accWay} placeholder="請選擇" className='modalSelect' />

      </Col>
    </>
  )
}

function TagSelect (params) {
  return (
    <>
      <Row className='modalRow'>
        <Col xs={6}>
          <span className='modalBody-item'>金額</span>
          <InputNumber placeholder="輸入金額" step={100} />
        </Col>
        <Col xs={6}>
          <span className='modalBody-item'>標籤</span>
          <CheckPicker
            name='tag'
            sticky
            data={tagOptions}
            placeholder="選擇標籤"
            className='modalSelect'
          />
        </Col>
      </Row>
    </>
  )
}




const AddBtn = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <ButtonToolbar>
        <Button onClick={handleOpen} className='CircleBtn addBtn'>
          <img src={Add} alt='Add' title='Add' width={'15px'} />
        </Button>
      </ButtonToolbar>
      <Modal
        open={open}
        onClose={handleClose}
        backdrop={'static'}
        overflow={false}
      >
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
          <ModalLabel />
        </Modal.Body>
      </Modal>
    </>
  )
}



export { AddBtn }