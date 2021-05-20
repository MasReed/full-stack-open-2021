import React from 'react'
import { useSelector } from 'redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  blogs
    .sort( (a, b) => {
      if (a.likes < b.likes) {
        return 1
      } else {
        return -1
      }
    })
    .map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
      />
    )
}

export default BlogList
