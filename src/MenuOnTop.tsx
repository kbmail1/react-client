import { NavLink } from "react-router-dom";

const MenuOnTop = (props)  => {

  const getKey = () => {
    return Math.floor(100000 + Math.random() * 900000)
  }
  console.log('RbacMenu props: ', props)
  // receives perms array and renders. Role is not relevant here.


  return (
    <ul>
    {
      props.perms.map((perm: string) => {
        return (
          <li key={getKey()}><NavLink to={perm}>{perm.substring(1)}</NavLink></li>
        )
      })
    }
    </ul>
  )
}

export default MenuOnTop
