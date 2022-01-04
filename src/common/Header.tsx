import './Header.scss'
import { getPermsByRole } from '../role2Permissions'
import MenuOnTop from '../MenuOnTop'

const Header = (props) => {
  console.log(props)
  const perms = getPermsByRole(props.role)
  return (
    <header>
      <div className="header-title">Meander Inc.</div>
      <div className="header-menu">
        <MenuOnTop perms />
      </div>
    </header>
  )
}

export default Header
