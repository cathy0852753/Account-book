import React, { Component } from 'react'
import './App.css'
import { LeftBar, HeaderBar } from "./components/BodyNav"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RecordPage from "./page/Record"
import BankPage from "./page/Bank"
import CardPage from "./page/Card"
import ApiTest from "./page/ApiTest"

//根組件
class App extends Component {
  render () {
    return (
      <div className='allPage'>
        <HeaderBar />
        <div className='page'>
          <aside className='left-bar'>
            <LeftBar />
          </aside>
          <div className='pageWidth'>
            <BrowserRouter>
              <Routes>
                <Route path="Account-book" element={<RecordPage />} />
                <Route path="Bank" element={<BankPage />} />
                <Route path="Card" element={<CardPage />} />
                <Route path="ApiTest" element={<ApiTest />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
        <footer>
          first web
        </footer>
      </div >
    )
  }
}

export default App