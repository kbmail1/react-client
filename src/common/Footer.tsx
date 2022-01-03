import React, { useContext } from 'react'
import AppContext from '../AppContext'
import './Footer.scss'

const Footer = () => {
  const appContext = useContext(AppContext)
  return (
    <footer>
      <span className="footer__trademark">
        Meander<sup>&#174;</sup>
      </span>
      <span className="footer__copyright">
        <sup>&#169;</sup> Meander Inc.
      </span>
    </footer>
  )
}

export default Footer
