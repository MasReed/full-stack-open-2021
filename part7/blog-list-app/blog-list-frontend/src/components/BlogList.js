import React from 'react'
import { useSelector } from 'react-redux'
import BlogTile from './BlogTile'

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
      <BlogTile
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
