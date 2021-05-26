import React from 'react'

/*
Display the details of a singular user, with list of their blogs
*/

const UserPage = ({ user }) => {

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

export default UserPage
