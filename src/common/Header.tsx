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
import Hangman from '../Hangman'
import PWA from '../PWA'
import roles from '../auth/roles.json'
import RbackMenu from '../auth/RbackMenu'

const Header = (props) => {
  const appContext = useContext(AppContext)

  console.group('header: props: ', props)
  return (
    <>
      <header>
        <div className="header-title">Meander Inc.</div>
        <div className="header-menu">
          <RbackMenu role={props.role} />
        </div>
      </header>
    </>
  )
}
export default Header
