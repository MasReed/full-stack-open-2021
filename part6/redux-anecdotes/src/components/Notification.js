import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector( store => store.notifications )
  const style = {
    color: 'grey',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
