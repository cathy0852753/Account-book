import React, { Component } from 'react'
import './App.css'
import { TabClick } from "./components/BodyNav"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RecordPage from "./page/Record"
import BankPage from "./page/Bank"
import CardPage from "./page/Card"



//根組件
class App extends Component {
  render () {
    return (
      <div>
        <BrowserRouter>
          <TabClick />
          <Routes>
            <Route path="/" element={<RecordPage />} />
            <Route path="Bank" element={<BankPage />} />
            <Route path="Card" element={<CardPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App