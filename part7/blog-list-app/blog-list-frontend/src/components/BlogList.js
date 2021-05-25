import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs
    .sort( (a, b) => {
      if (a.likes < b.likes) {
        return 1
      } else {
        return -1
      }}
    )
    .map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
      />
    )
  )

  return (
    <div>
      <hr />
      {blogs}
    </div>
  )
}

export default BlogList
