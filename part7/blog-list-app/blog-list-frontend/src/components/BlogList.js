import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

import BlogTile from './BlogTile'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'



const BlogList = () => {

  const blogFormRef = useRef()

  // sort blogs by most likes and map each one to a display component
  const blogs = useSelector(state => state.blogs
    .sort( (a, b) => {
      if (a.likes < b.likes) {
        return 1
      } else {
        return -1
      }}
    )
    .map(blog =>
      <BlogTile
        key={blog.id}
        blog={blog}
      />
    )
  )

  return (
    <div className='container'>

      <div style={{ marginBottom: '30px' }}>
        <h1>Blogs</h1>
        <h5>The latest and greatest.</h5>
      </div>

      <Togglable buttonLabelToOpen='Make A New One' buttonLabelToClose='Cancel' ref={blogFormRef}>
        <NewBlogForm blogFormRef={blogFormRef} />
      </Togglable>

      <div style={{ margin: '20px 0' }}>
        {blogs}
      </div>
    </div>
  )
}

export default BlogList
