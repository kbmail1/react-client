import { useState } from 'react'
import './Header.scss'

const Header = (props) => {
  console.log(props)
  const [role, setRole] = useState(props.role)

  return (
    <header>
      <div className="header-title">Meander Inc.</div>
      {
        /*
        <div className="header-menu">
          <MenuOnTop perms={perms} />
        </div>
        */
      }
    </header>
  )
}

export default Header
