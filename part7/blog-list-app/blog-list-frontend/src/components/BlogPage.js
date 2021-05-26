import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import { blogCommentCreator } from '../reducers/blogReducer'

import BlogHeading from './BlogHeading'
import BlogMetrics from './BlogMetrics'

/*
Display the details of a singular blog, with ability to like, comment, or delete
*/

const BlogPage = ({ blog }) => {

  const dispatch = useDispatch()
  const [ comment, setComment ] = useState('')

  const handleNewComment = (event) => {
    event.preventDefault()
    dispatch(blogCommentCreator(blog.id, comment))
    setComment('')
  }

  if (!blog) {
    return <Redirect to='/blogs' />
  }


  return (
    <Container>

      <BlogHeading blog={blog} />

      <hr style={{ marginBottom: '8px' }}/>

      <BlogMetrics blog={blog} />

      <hr style={{ marginTop: '8px' }}/>

      <div>
        <form>
          <textarea
            id='newComment'
            type='textblock'
            name='comment'
            value={comment}
            onChange={ ({ target }) => setComment(target.value) }
            cols='120'
            rows='10'
            style={{ display: 'block', resize: 'none' }}
            placeholder='e.g. I liked it!'
          />
          <Button onClick={handleNewComment} variant='primary'>Add Comment</Button>
        </form>

        <hr />
      </div>

      <div>
        <h3>Comments:</h3>
        {
          blog.comments.map( comment => (
            <li key={comment._id} style={{ padding: '2px 0' }}>{comment.body}</li>
          ))
        }
      </div>
    </Container>
  )
}

export default BlogPage
