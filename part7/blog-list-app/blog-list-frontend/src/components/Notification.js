import React from 'react'
import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {

  let notification = useSelector(state => state.notifications)

  if (!notification.message) {
    return null
  }

  if (!notification.variant) {
    notification.variant = 'secondary'
  }

  return (
    <div>
      <Alert variant={notification.variant}>
        {notification.message}
      </Alert>
    </div>
  )
}

export default Notification
