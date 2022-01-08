import React, { useState, useEffect, useContext } from 'react'
import Banner, * as banner from './common/Banner'
import './LoginPage.scss'
import axios from 'axios'
import { fakeAuthProvider } from './auth'
import { AuthContext } from './App'
import { useNavigate, useLocation, } from 'react-router-dom';
import crypto from 'crypto'

// === React Comjiponent ===
function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = React.useContext(AuthContext);

  let from = location.state?.from?.pathname || "/";
  console.log(`LoginPage: from: ${from}`)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let usser_name = formData.get("username") as string;
    let email = formData.get("username") as string;
    let password = formData.get("username") as string;

    let enc_password = crypto.createHash('sha256').update(password).digest('hex');
    password = ''

    auth.signIn(user_name, email, enc_password, () => {
      // do JWT here - authorization.
      // ---------------------------------------------------------------------------------
      // . (combined with authentication here. later use OAuth from Auth0 to authenticate,
      // .. and JWT-based authorization)
      // ---------------------------------------------------------------------------------
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>email</label>
        <input name="login" placeholder='a@b.c' type="text" />

        <label>Userid</label>
        <input name="user_name" placeholder='user_name' type="text" />

        <label>Password</label>
        <input name="password" placeholder='password' type="text" />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage
