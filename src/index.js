//React : 框架的核心包
//ReactDOM : 專門做渲染相關的包

import React from 'react'
import ReactDOM from 'react-dom/client'
//應用的全局樣式文件
import './index.css'
// 引入根組件
import App from './App'

//渲染根組件APP到一個id為root的dom上
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(

  <App />

)
