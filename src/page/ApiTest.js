import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import '../components/css/ApiTest.css'
import { Form, Table, Row, Col, Container, } from "react-bootstrap"

const MRTApi = (props) => {
  const [posts, setPosts] = useState([])
  const [select, setSelect] = useState(107)
  useEffect(() => {
    fetch('https://data.kcg.gov.tw/dataset/6f29f6f4-2549-4473-aa90-bf60d10895dc/resource/30dfc2cf-17b5-4a40-8bb7-c511ea166bd3/download/lightrailtraffic.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setPosts(data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])
  console.log('repo', posts)
  let years = []
  for (let index = 0; index < posts.length; index++) {
    years.push(posts[index].年)
  }
  years = years.filter((item, index) => years.indexOf(item) === index)
  // console.log(years)
  let yearData = []
  const changeYears = (e) => {
    // console.log('Years', e)
    setSelect(e.target.value)

  }
  // console.log(select, 'posts', posts)
  for (let index = 0; index < posts.length; index++) {
    if (posts[index].年 === parseInt(select)) {
      yearData.push({
        年: posts[index].年,
        月: posts[index].月,
        總運量: posts[index].總運量,
        日均運量: posts[index].日均運量,
        假日均運量: posts[index].假日均運量,
      })
    }
  }
  // console.log(yearData, select)
  return (
    <div className="App">
      <h2 className='api-HeaderText'>高雄輕軌月均運量統計</h2>
      <div className='container-fluid'>
        <div className='row api-SelectDiv'>
          <span className='api-selectText' >選擇年份：</span>
          <Form.Select
            className='api-select'
            onChange={changeYears}
          >
            {years.map(post =>
              <option key={post} id={post}>{post}</option>
            )}
          </Form.Select>
        </div>
      </div>
      <Container className='api-Container'>
        <Row className='api-Row'>
          <Col xs={12} xl={7} className=''>
            <div className="api-table">
              <Table hover responsive="sm" striped="columns">
                <thead>
                  <tr>
                    <th className="api-month">月</th>
                    <th className="api-amount">總運量</th>
                    <th className="api-DayAmount">日均運量</th>
                    <th className="api-WeekendAmount">假日均運量</th>
                  </tr>
                </thead>
                <tbody className='api-tbody'>
                  {yearData.map(post => {
                    return (
                      <tr>
                        <td className="api-month">{post.月}</td>
                        <td className="api-amount">{post.總運量}</td>
                        <td className="api-DayAmount">{post.日均運量}</td>
                        <td className="api-WeekendAmount">{post.假日均運量}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          </Col>
          <Col xs={12} xl={5} className=''>

          </Col>
        </Row>
      </Container>

    </div>
  )
}


export default function ApiTest () {
  return (
    <>
      <MRTApi />
    </>
  )
}