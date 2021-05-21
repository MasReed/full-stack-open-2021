import React from 'react'

const BlogPage = ({ blog }) => {

  console.log(blog)

  return (
    <div>
      <h2>{blog.title}</h2>
      <h3>{blog.author}</h3>
      <a href=''>{blog.url}</a>
      <hr />
      <p>Liked {blog.likes} times</p>
      <p>Posted by: {blog.user.username}</p>
    </div>
  )
}

export default BlogPage
