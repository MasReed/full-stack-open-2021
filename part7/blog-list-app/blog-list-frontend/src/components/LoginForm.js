import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form'
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
    <React.Fragment>
      <Form id='loginForm' onSubmit={handleLogin}>
        <Form.Group controlId='formLoginUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={ ({ target }) => setUsername(target.value) }
            placeholder='Username' />
        </Form.Group>

        <Form.Group controlId= 'formLoginPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={ ({ target }) => setPassword(target.value) }
            placeholder='Password' />
        </Form.Group>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button id='loginButton' type='submit' variant='secondary'>
            Login
          </Button>
        </div>

      </Form>
    </React.Fragment>
  )
}

export default LoginForm
