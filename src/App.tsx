import React, { useState, } from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Header from './common/Header'
import Login from './Login'
import Footer from './common/Footer'
import './App.scss'
import { now, templateSettings } from 'lodash'

// instead of making up func types for exact match pass null for initial context.
// const C = React.createContext (null)

const App = () => {
  // add userid, personalization, tokens etc. later.
  const [role, setRole] = useState('guest')

  const updateLoginStatus = (role: string) => {
    console.log(`APP updateLoginStatus: received role: ${role}`)
    setRole(role)
  }

  // convert to using context.
  return (
      <div className="app-container">
      <Header role={role} updateLoginStatus={updateLoginStatus} />
      {role === 'guest' && <Login role={role} updateLoginStatus={updateLoginStatus} />}
        { role !== 'guest' && <Outlet />}
        <Footer />
      </div>
  )
}

export default App
