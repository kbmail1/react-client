import React, { useState, useContext } from 'react'
import AppContext, { Role } from './AppContext'
import Banner, * as banner from './common/Banner'
import { useNavigate } from 'react-router-dom'
import './Login.scss'
import axios from 'axios'
import { relayStylePagination } from '@apollo/client/utilities'

// === React Component ===
const Login = () => {
  const [creds, setCreds] = useState({ userid: '', password: '' })
  const navigate = useNavigate()
  const [errors, setErrors] = useState({
    userIdError: false,
    passwordError: false,
  })

  const handleSubmit = (e) => {
    // login
    const restUrl = `https://localhost:8888/login/`
    console.log('login: handleSubmit: Login form Submitted', e.target.name)
    axios
      .post(restUrl, creds)
      .then((res) => {
        if (res.data.status) {
          navigate('/App')
        } else {
          console.log(`Error: get from ${restUrl} failed. Error: ${res.data.error}.  For now stil navigate to main.`)
          navigate('/App')
        }
      })
      .catch ( (err)  => {
        console.log('Err in catch: still navigate to same.Laater to fail or re - login page.', err);
        navigate('/App')
      })

  const handleChange = (e) => {
    // keep input, password fields up to date.
    setCreds({
      ...creds,
      [e.target.id]: e.target.value,
    })
    console.log('login: handleChange: creds: ', creds)
  }

  return (
    <>
      <ul
        className="login-form"
        style={{
          border: '1px solid gray',
          overflow: 'auto',
        }}
      >
        <li>
          <h2>login</h2>
        </li>
        <li>
          <label htmlFor="userid" className="required">
            User ID
          </label>
          <input
            className="required"
            type="text"
            id="userid"
            placeholder="User Id"
            name="userid"
            value={creds.userid}
            onChange={handleChange}
          />
        </li>
        <li>
          <label htmlFor="password" className="required">
            Password
          </label>
          <input
            className="required"
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={creds.password}
            onChange={handleChange}
          />
        </li>
        <li>
          <button className="submit-button" onClick={handleSubmit}>
            {' '}
            Submit{' '}
          </button>
        </li>
      </ul>
    </>
  )
}

export default Login
