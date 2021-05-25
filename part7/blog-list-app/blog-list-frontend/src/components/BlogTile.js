import React from 'react'
import { Link } from 'react-router-dom'


const BlogTile = ({ blog }) => {

  const blogStyle={
    border: 'solid',
    borderColor: 'purple',
    borderWidth: 1,
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
