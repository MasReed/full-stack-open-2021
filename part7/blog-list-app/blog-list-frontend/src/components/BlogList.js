import React from 'react'
import { useSelector } from 'react-redux'
import BlogTile from './BlogTile'

const BlogList = () => {

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
    <div>
      <hr />
      {blogs}
    </div>
  )
}

export default BlogList
