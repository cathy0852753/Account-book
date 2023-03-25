import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import { Table, } from "react-bootstrap"

const MRTApi = (props) => {
  // const [repo, setRepo] = useState()
  // fetch('https://data.kcg.gov.tw/dataset/6f29f6f4-2549-4473-aa90-bf60d10895dc/resource/30dfc2cf-17b5-4a40-8bb7-c511ea166bd3/download/lightrailtraffic.json'
  //   , { method: "GET" })
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data)
  //     setRepo(data)
  //   })
  //   .catch(e => {
  //     console.log(e)
  //   })
  const [posts, setPosts] = useState([])
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
  return (
    <div className="App">
      <h2>高雄輕軌月均運量統計</h2>
      <div className="bank-bg-table">
        <Table hover responsive="sm" className="bank-table" >
          <thead>
            <tr>
              <th className="bank-itemCol" >年</th>
              <th className="bank-sortCol">月</th>
              <th className="bank-wayCol">總運量</th>
              <th className="bank-descriptionCol">日均運量</th>
              <th className="bank-dateCol">假日均運量</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => {
              return (
                <tr>
                  <td className="bank-itemCol">{post.年}</td>
                  <td className="bank-sortCol">{post.月}</td>
                  <td className="bank-wayCol">{post.總運量}</td>
                  <td className="bank-descriptionCol">{post.日均運量}</td>
                  <td className="bank-dateCol bank-NumberFont">{post.假日均運量}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
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