import React from 'react'
import { useSelector } from 'react-redux'

const UserList = () => {

  const users = useSelector( state => state.users )

  return (
    <div>
      <h2>UserList</h2>
      {
        users.map( user => (
          <p key={user.id}>{user.username}</p>
        ))
      }
    </div>
  )
}

export default UserList
