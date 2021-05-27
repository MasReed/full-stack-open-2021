import React from 'react'
import { Link } from 'react-router-dom'

/*
Display minimal details of a blog in a 'box', used to create BlogList
*/

const BlogTile = ({ blog }) => {

  const blogStyle={
    border: 'solid',
    borderColor: '#e06666',
    borderRadius: 3,
    borderWidth: 1,
    marginBottom: 10,
    padding: '10px 16px 7px'
  }

  return (
    <React.Fragment>
      <Link to={`/blogs/${blog.id}`}>
        <div style={blogStyle}>
          <h3 style={{ margin: '2px 0' }}>{blog.title}</h3>
          <p style={{ margin: '2px 0', color: 'grey' }}>{blog.author}</p>
        </div>
      </Link>
    </React.Fragment>
  )
}

export default BlogTile
