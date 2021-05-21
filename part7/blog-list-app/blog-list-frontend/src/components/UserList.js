import React from 'react'
// import { useSelector } from 'react-redux'
import userService from '../services/users'

const UserList = () => {

  const users = userService.getAll()
  console.log(users)

  return (
    <div>
      <h2>UserList</h2>
    </div>
  )
}

export default UserList
