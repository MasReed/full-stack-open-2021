import React from 'react'

const User = ({ user }) => {

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h4>Blogs Added:</h4>
      <ul>
        {
          user.blogs.map( blog =>
            <p key={blog.id}>{blog.title}</p>
          )
        }
      </ul>
    </div>
  )
}

export default User
