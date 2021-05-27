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
    borderColor: '#e06666',
    borderRadius: 3,
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: '10px 0 7px 4px'
  }


  return (
    <div className='container'>

      <div style={{ marginBottom: '30px' }}>
        <h1>Users</h1>
        <h5>All of `em</h5>
      </div>

      <div style={{ color: 'lightblue', display: 'flex', justifyContent: 'space-between' }}>
        <h4 style={{ margin: '0', padding: '3px' }}>Username</h4>
        <h4 style={{ margin: '0', padding: '3px' }}>Blogs Created</h4>
      </div>

      <hr style={{ margin: '4px 0 16px' }}/>

      <div>
        {
          users.map( user =>
            <div key={user.id} style={userStyle}>
              <Link
                to={`/users/${user.id}`}
                style={{ margin: '0', padding: '10px' }}
              >
                <h3>{user.username}</h3>
              </Link>
              <h3 style={{ color: 'grey', padding: '10px 45px' }}>{user.blogs.length}</h3>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default UserList
