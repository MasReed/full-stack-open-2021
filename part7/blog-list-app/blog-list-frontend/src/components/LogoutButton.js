import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toastNotificationCreator } from '../reducers/notificationReducer'
import { unsetUserCreator } from '../reducers/userReducer'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(unsetUserCreator())
    window.localStorage.removeItem('loggedBlogappUser')

    dispatch(toastNotificationCreator(
      `${user.username} successfully logged out!`,
      'success'
    ))
  }

  return (
    <div style={{ display: 'inline-block', margin: '5px 5px' }}>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutButton
