import React, { useContext } from 'react'
import AppContext from './AppContext'
import Dictionary from './dict/Dictionary'
import { Navigate } from 'react-router-dom'

const Landing = () => {
  return <Navigate to="/dict" />
}

export default Landing
