import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector( store => store.notifications )
  console.log('NOTI', notification)

  let style = {
    color: 'grey',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  if (notification.display === 'Blue') {
    style.color = 'blue'
    style.background = 'lightblue'
  } else if (notification.display === 'Green') {
    style.color = 'green'
    style.background = 'lightgreen'
  } else {
    style.display = 'none'
  }

  return (
    <div style={style}>
      {notification ? notification.message : null}
    </div>
  )
}

export default Notification
