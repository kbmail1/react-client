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
        console.log('in MenuOTop: perm: ', perm);
        console.log('in MenuOTop: perm - substring: ', perm.substring(1))
        return (
          <li key={getKey()}><NavLink to={perm}>{perm.substring(1)}</NavLink></li>
        )
      })
    }
    </ul>
  )
}

export default MenuOnTop
