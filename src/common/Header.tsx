import './Header.scss'
import React, { useContext } from 'react'
import AppContext, { Role } from '../AppContext'
import { guestMenu, adminMenu } from '../resources/menus'
import { Routes, Route, Link } from 'react-router-dom'

import Home from '../Home'
import Login from '../Login'
import Landing from '../Landing'
import About from '../About'
import NotFound from '../NotFound'
import Dictionary from '../dict/Dictionary'

const Header = () => {
  const appContext = useContext(AppContext)

  let showMenu: string[] = []
  showMenu = adminMenu

  return (
    <>
      <header>
        <div className="header-title">Meander Inc.</div>
        <div className="header-menu">
          <ul>
            <li>first</li>
            <li>second</li>
            <li>last</li>
          </ul>
        </div>
      </header>
    </>
  )
}
export default Header
