import React from 'react'

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin}) => {
    return (
      <form onSubmit={handleLogin}>
        <div style={{margin: '5px 0'}}>
          <label style={{marginRight: '10px'}}>Username</label>
          <input
            type='text'
            value={username}
            name='username'
            onChange={ ({ target }) => setUsername(target.value)}
          />
        </div>
        <div style={{margin: '5px 0'}}>
          <label style={{marginRight: '14px'}}>Password</label>
          <input
            type='password'
            value={password}
            name='password'
            onChange={ ({ target }) => setPassword(target.value)}
          />
        </div>
        <div style={{margin: '5px 0 0 75px'}}>
          <button type='submit' style={{padding: '3px 70px'}}>Login</button>
        </div>
      </form>
    )
}

export default LoginForm;
