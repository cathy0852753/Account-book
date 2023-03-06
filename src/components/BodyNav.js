
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import { Navbar, } from "react-bootstrap"
import { NavLink } from 'react-router-dom'
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
          {/* <NavLink to="Card"
            className={({ isActive }) =>
              isActive ? activeClassName : ClassName}>
            信用卡
          </NavLink> */}

        </nav>
      </div >
    )
  }
}

export { TabClick }
