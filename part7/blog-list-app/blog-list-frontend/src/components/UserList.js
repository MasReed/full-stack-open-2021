import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

/*
Display list of all users and the number of blogs they have created.
*/

const UserList = () => {

  const users = useSelector( state => state.users )

  const userStyle={
    border: 'solid',
    borderColor: 'purple',
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: '10px 0 7px 4px'
  }

  return (
    <div className='container'>
      <h2>Users</h2>
      <h5>All of `em</h5>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h6>Username</h6>
        <h6>Blogs Created</h6>
      </div>

      <div>
        {
          users.map( user =>
            <div key={user.id} style={userStyle}>
              <Link
                to={`/users/${user.id}`}
                style={{ margin: '0', padding: '10px' }}
              >
                {user.username}
              </Link>
              <p style={{ padding: '10px 45px' }}>{user.blogs.length}</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default UserList
