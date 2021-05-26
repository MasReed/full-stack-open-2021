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
    marginBottom: 5,
    padding: '10px 0 7px 4px'
  }

  return (
    <div>
      <h2>Users</h2>
      <h4>Blogs Created</h4>
      <div>
        {
          users.map( user =>
            <div key={user.id} style={userStyle}>
              <p style={{ display: 'inline-block', margin: '0 20px' }}>{user.blogs.length}</p>
              <Link
                to={`/users/${user.id}`}
                style={{ display: 'inline-block', marginLeft: '50px' }}
              >
                {user.username}
              </Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default UserList
