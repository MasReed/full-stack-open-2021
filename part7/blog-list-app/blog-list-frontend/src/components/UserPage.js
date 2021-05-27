import React from 'react'
import Container from 'react-bootstrap/Container'

import BlogTile from './BlogTile'


/*
Display the details of a singular user, with list of their blogs
*/

const UserPage = ({ user }) => {

  if (!user) {
    return null
  }

  return (
    <Container>
      <div style={{ marginBottom: '75px' }}>
        <h1>{user.username}</h1>
        <h5>Some user tagline..</h5>
      </div>

      <div style={{ color: 'lightblue', display: 'flex', justifyContent: 'space-between' }}>
        <h4 style={{ margin: '0', padding: '3px' }}>Blogs Created</h4>
      </div>

      <hr style={{ margin: '4px 0 16px' }} />

      {
        user.blogs.map( blog => <BlogTile key={blog.id} blog={blog} /> )
      }

    </Container>
  )
}

export default UserPage
