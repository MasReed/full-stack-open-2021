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
    borderWidth: 2,
    marginBottom: 5,
    padding: '10px 0 7px 4px'
  }

  return (
    <div key={blog.id} style={blogStyle} className='blogDiv'>

      <Link to={`/blogs/${blog.id}`}>
        <h3 style={{ margin: '2px 0' }} className='blogTitle'>{blog.title}</h3>
      </Link>
      <p style={{ margin: '2px 0', color: 'grey' }} className='blogAuthor'>{blog.author}</p>

    </div>
  )
}

export default BlogTile
