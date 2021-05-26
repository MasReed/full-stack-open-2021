import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import { blogDestroyer, blogCommentCreator, blogLikeUpdater } from '../reducers/blogReducer'

import BlogHeading from './BlogHeading'

/*
Display the details of a singular blog, with ability to like, comment, or delete
*/

const BlogPage = ({ blog }) => {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const [ comment, setComment ] = useState('')

  const handleLikeClick = (event) => {
    event.preventDefault()
    dispatch(blogLikeUpdater(blog))
  }

  const handleNewComment = (event) => {
    event.preventDefault()
    dispatch(blogCommentCreator(blog.id, comment))
    setComment('')
  }

  const handleDeleteClick = (event) => {
    event.preventDefault()
    const isConfirmed = window.confirm(`Permanently delete '${blog.title}' ?`)

    isConfirmed ? dispatch(blogDestroyer(blog.id)) : null
  }

  if (!blog) {
    return <Redirect to='/blogs' />
  }


  return (
    <Container>

      <BlogHeading blog={blog} />

      <hr style={{ marginBottom: '8px' }}/>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0' }}>
        <p style={{ margin: '0' }}>{blog.likes} Likes</p>
        <p style={{ margin: '0' }}>Posted by: {blog.user.username}</p>
      </div>

      <p style={{ margin: '0', padding: '0' }}>{blog.comments.length} Comments</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0' }}>
        <Button
          onClick={handleLikeClick}
          variant='secondary'
          style={{ margin: '6px 0 3px', padding: '8px 14px' }}
        >Like</Button>

        {
          (blog.user.id === currentUser.id)
          && <Button
            onClick={handleDeleteClick}
            variant='outline-warning'
            size='sm'
            style={{ margin: '6px 0 3px', float: 'right' }}
          >
            Delete
          </Button>
        }


      </div>

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
