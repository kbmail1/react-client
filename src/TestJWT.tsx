import * as React from 'react';
import axios from 'axios';

const TestJWT = () => {
  const url = 'https://localhost:8888/testjwt'
  const token = localStorage.getItem('jwt_token')
  axios.post(url, {
    token,
  })
    .then((res) => {
      alert('received response: ' + JSON.stringify(res.data, null, 2))
    })
    .catch((err) => {
      alert('response error: ' + JSON.stringify(err))
    })

  return (
    <>
      <h3>
        JWT test has passed
      </h3>
    </>
  )
}

export default TestJWT