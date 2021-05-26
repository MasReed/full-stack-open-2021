import React from 'react'
import { Redirect } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import BlogHeading from './BlogHeading'
import BlogMetrics from './BlogMetrics'
import NewCommentForm from './NewCommentForm'

/*
Display the details of a singular blog, with ability to like, comment, or delete
*/

const BlogPage = ({ blog }) => {

  if (!blog) {
    return <Redirect to='/blogs' />
  }


  return (
    <Container>

      <BlogHeading blog={blog} />
      <BlogMetrics blog={blog} />

      <NewCommentForm blog={blog} />


      <div style={{ margin: '20px 0' }}>
        <h3>Comments:</h3>
        <ul>
          {
            blog.comments.map( comment => (
              <li key={comment._id} style={{ padding: '2px 0' }}>{comment.body}</li>
            ))
          }
        </ul>
      </div>
    </Container>
  )
}

export default BlogPage
