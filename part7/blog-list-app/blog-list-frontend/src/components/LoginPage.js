import React from 'react'
import LoginForm from './LoginForm'

const LoginPage = () => {

  return (
    <div className='container'>
      <h1>Login!</h1>
      <div style={{ backgroundColor: 'lightblue', margin: '3rem 0 0', padding: '3rem' }}>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
