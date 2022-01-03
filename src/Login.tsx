import React, { useState, useContext } from 'react'
import AppContext, { Role } from './AppContext'
import Banner, * as banner from './Banner'
import './login.scss'

// === React Component ===
const Login = () => {
  const [creds, setCreds] = useState({ userid: '', password: '' })
  const [errors, setErrors] = useState({
    userIdError: false,
    passwordError: false,
  })

  const appContext = useContext(AppContext)

  const handleSubmit = (e) => {
    console.log('login: handleSubmit: Login form Submitted', e.target.name)

    if (appContext?.login(creds)) {
      appContext.isLoggedIn = true
      appContext.userId = creds.userid
      appContext.role = Role.Admin
      return <Redirect to="/login" />
    }
  }
  const handleChange = (e) => {
    // this keeps field values up to date.
    setCreds({
      ...creds,
      [e.target.id]: e.target.value,
    })
    console.log('login: handleChange: creds: ', creds)
  }

  // Banner component callback.
  const [bannerUpdates, setBannerUpdates] = useState({
    show: false,
    percentWidth: 100,
  })
  console.log(`InitialbannerUpdates: ${JSON.stringify(bannerUpdates)}`)
  // banner show it when page loads.
  const bannerConfig: banner.IBannerConfig = {
    title: 'K Banner',
    subTitle: 'K Banner subtitle',
    message: 'K Banner message',
    severity: banner.BannerSeverity.Info,
    totalDuration: 10,
    updateFrequency: 1,
  }
  const bannerCallback = (show: boolean, percentWidth: number) => {
    setBannerUpdates({
      ...bannerUpdates,
      show,
      percentWidth,
    })
  }
  console.log(`bannerUpdates: ${JSON.stringify(bannerUpdates)}`)
  console.log(`bannerUpdates.show: ${bannerUpdates.show}`)

  return (
    <>
      {bannerUpdates.show && (
        <Banner
          config={bannerConfig}
          callback={bannerCallback}
          width={bannerUpdates.percentWidth}
        />
      )}
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
