import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { loggedInUserCreator } from '../reducers/userReducer'

const LoginForm = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(loggedInUserCreator(username, password))

    setUsername('')
    setPassword('')
  }


  return (
    <form onSubmit={handleLogin} id='loginForm'>
      <div style={{ margin: '5px 0' }}>
        <label style={{ marginRight: '10px' }}>Username</label>
        <input
          id='loginUsername'
          type='text'
          value={username}
          name='username'
          onChange={ ({ target }) => setUsername(target.value)}
        />
      </div>
      <div style={{ margin: '5px 0' }}>
        <label style={{ marginRight: '14px' }}>Password</label>
        <input
          id='loginPassword'
          type='password'
          value={password}
          name='password'
          onChange={ ({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <Button id='loginButton' type='submit' variant='outline-primary'>Login</Button>
      </div>
    </form>
  )
}

export default LoginForm
