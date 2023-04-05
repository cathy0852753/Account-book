
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import { Navbar, Nav } from "react-bootstrap"
import { NavLink } from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css"

class HeaderBar extends React.Component {
  render () {

    return (
      <>
        <Navbar
          key={'false'}
          expand={'false'}
          className="bg-navbar"
        >
        </Navbar>
      </>
    )
  }
}

class LeftBar extends React.Component {
  render () {
    return (
      <Nav defaultActiveKey="/Account-book" className="flex-column">
        <Nav.Link href="/Account-book/">Account book</Nav.Link>
        <Nav.Link href="/Account-book/ApiTest">api test</Nav.Link>
      </Nav >
    )
  }
}

// Tabs
class TabClick extends React.Component {
  render () {
    let ClassName = "navLink"
    let activeClassName = "navLink-active"
    return (
      <div>
        <nav className='nav-tab'>
          <NavLink
            to="/Account-book/"
            className={({ isActive }) =>
              isActive ? activeClassName : ClassName}>
            記帳
          </NavLink>
          <NavLink
            to="/Account-book/Bank"
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
      </div>
    )
  }
}

export { TabClick, LeftBar, HeaderBar }
