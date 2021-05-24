import React from 'react'

const BlogPage = ({ blog }) => {

  console.log('BLOG', blog)

  return (
    <div>
      <h2>{blog.title}</h2>
      <h3>{blog.author}</h3>
      <a href=''>{blog.url}</a>
      <hr />
      <p>Liked {blog.likes} times</p>
      <p>Posted by: {blog.user.username}</p>
      <hr />
      <h3>Comments:</h3>
      {
        blog.comments.map( comment => (
          <li key={comment._id}>{comment.body}</li>
        ))
      }
    </div>
  )
}

export default BlogPage
