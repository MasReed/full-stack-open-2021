import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { blogDestroyer, blogCommentCreator, blogLikeUpdater } from '../reducers/blogReducer'

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
    <div>
      <div>
        <h2>{blog.title}</h2>
        <h3>{blog.author}</h3>
        <a style={{ display: 'block' }} target="_blank" href={'//' + blog.url} rel="noreferrer">
          <h4>{blog.url}</h4>
        </a>

        <div style={{ padding: '10px 0' }}>
          <p style={{ display: 'inline' }}>Posted by: {blog.user.username}</p>
          {
            (blog.user.id === currentUser.id)
            && <Button
              onClick={handleDeleteClick}
              style={{ marginLeft: '10px' }}
              variant='outline-warning'
            >
              Delete
            </Button>
          }
        </div>

        <hr />
      </div>

      <div>
        <p style={{ display: 'inline' }}>{blog.likes} Likes</p>
        <Button onClick={handleLikeClick} variant='primary' style={{ margin: '10px' }}>Like</Button>

        <form>
          <label>{blog.comments.length} Comments</label>
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
    </div>
  )
}

export default BlogPage
