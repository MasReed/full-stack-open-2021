import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'


const NavigationHeader = () => {

  const currentUser = useSelector(state => state.user)
  return (
    <div>
      <h2 style={{ padding: '20px 0 10px', margin: '0' }}>Welcome to the Blog App</h2>

      <div style={{ backgroundColor: 'lightblue', padding: '8px' }}>
        <Link to='/' style={{ margin: '3px' }}><strong>Home</strong></Link>
        <Link to='/blogs' style={{ margin: '3px' }}><strong>Blogs</strong></Link>
        <Link to='/users' style={{ margin: '3px' }}><strong>Users</strong></Link>
        {currentUser
          ? <div style={{ display: 'inline', padding: '5px 10px' }}>
            <p style={{ display: 'inline', padding: '1px', margin: '0' }}>{currentUser.username} is logged in.</p>
            <LogoutButton />
          </div>
          : null }
      </div>

      <hr />
    </div>
  )
}

export default NavigationHeader
