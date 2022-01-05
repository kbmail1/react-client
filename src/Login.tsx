import React, { useState, useEffect, useContext } from 'react'
import Banner, * as banner from './common/Banner'
import './Login.scss'
import axios from 'axios'

// === React Component ===
const Login = (props) => {

  const [creds, setCreds] = useState({
    userid: '',
    password: '',
  });

  useEffect(() => {
    if (props.role !== 'guest') {
      props.updateLoginStatus('guest')
      return
    }
  }, [props.role])
  // ----------------------

  const handleChange = (e) => {
    // keep input, password fields up to date.
    setCreds({
      ...creds,
      [e.target.id]: e.target.value,
    })
    console.log('login: handleChange: now creds are: creds: ', creds)
  }

  const handleSubmit = () => {
    console.log(`login: userid: ${creds.userid} and password: ${creds.password}`)
    // login
    const restUrl = `https://localhost:8888/login/`
    let role = 'guest'
    console.log('in handle submit: sending in axios request: ${creds}')
    axios
      .post(restUrl, {creds})
      .then((res) => {
        if (res.data.status) {
          props.updateLoginStatus(res.data.role)
        } else {
          console.log(`1-Error: get from ${restUrl} failed. Error: ${res.data.error}.  For now stil navigate to main.`)
          props.updateLoginStatus('guest')
        }
      })
      .catch((err) => {
        console.log('2-Error in catch: still navigate to same.Laater to fail or re - login page.', err);
        props.updateLoginStatus('guest')
      })
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
            Submit
          </button>
        </li>
      </ul>
    </>
  )
}

export default Login
