import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const makeUser = (event) => {
    event.preventDefault()
    handleSubmit({
      username: username,
      password: password
    })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={makeUser} style={{ margin: '20px 0px' }}>
        <div>
          <label>username</label>
          <input
            id='loginUsername'
            type='text'
            value={username}
            name='username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label>password</label>
          <input
            id='loginPassword'
            type='password'
            value={password}
            name='password'
            onChange={handlePasswordChange}
          />
        </div>
        <button id='loginButton' type='submit'>Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
