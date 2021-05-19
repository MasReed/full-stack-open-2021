import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notifications)

  const notificationStyle = {
    color: notification.color,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  if (!notification.message) {
    return null
  }

  return (
    <div style={notificationStyle} className='notification'>
      {notification.message}
    </div>
  )
}

export default Notification
