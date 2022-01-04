import { NavLink } from "react-router-dom";

const MenuOnTop = (props)  => {
  console.log('RbacMenu props: ', props)
  // receives perms array and renders. Role is not relevant here.

  return (
    <ul>
    {
      props.perms.map((perm: string) => {
        return (
          <li><NavLink to={perm}>{perm.substring(1)}</NavLink></li>
        )
      })
    }
    </ul>
  )
}

export default MenuOnTop
