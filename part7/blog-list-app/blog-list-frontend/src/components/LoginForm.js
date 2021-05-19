import React from 'react'

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
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
      <div style={{ margin: '5px 0 0 75px' }}>
        <button id='loginButton' type='submit' style={{ padding: '3px 70px' }}>Login</button>
      </div>
    </form>
  )
}

export default LoginForm
