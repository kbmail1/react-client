import { useState } from 'react'
import './Header.scss'
import { getPermsByRole } from '../role2Permissions'
import MenuOnTop from '../MenuOnTop'

const Header = (props) => {
  console.log(props)
  const [role, setRole] = useState(props.role)

  const perms: string[] = getPermsByRole(role)
  return (
    <header>
      <div className="header-title">Meander Inc.</div>
      {
        <div className="header-menu">
          <MenuOnTop perms={perms} />
        </div>
      }
    </header>
  )
}

export default Header
