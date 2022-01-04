import roles from '../auth/roles.json'
import { NavLink } from "react-router-dom";

import React from 'react'

const RbackMenu = (props)  => {
  // create menu based on props - role.
  console.log('RbackMenu props: ', props)

  // <Link to={perm}>{perm.substring(1)}</Link> |{" "}
  roles[props.role]['permissions'].map((perm: string) => {
    console.log('rback debug: ', perm)
  })
  /*
      roles[props.role]['permissions'].map((perm: string) => {
        <li>{ perm }</li>
        */
  return (
    <ul>
    {
      roles[props.role]['permissions'].map((perm: string) => {
        return (
          <li><NavLink to={perm}>{perm.substring(1)}</NavLink></li>
        )
      })
    }
    </ul>
  )
}

export default RbackMenu
