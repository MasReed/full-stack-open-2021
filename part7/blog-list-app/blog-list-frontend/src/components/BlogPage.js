import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { blogDestroyer, blogCommentCreator, blogLikeUpdater } from '../reducers/blogReducer'

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
            && <button
              onClick={handleDeleteClick}
              style={{ marginLeft: '10px' }}>
              Delete
            </button>
          }
        </div>

        <hr />
      </div>

      <div>
        <p style={{ display: 'inline' }}>{blog.likes} Likes</p>
        <button onClick={handleLikeClick} style={{ margin: '10px' }}>Like</button>

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
          <button onClick={handleNewComment}>Add Comment</button>
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


// <Togglable buttonLabelToOpen='Details' buttonLabelToClose='Hide'>
//   <div className='togglableContent'>
//     <p style={{ margin: '5px 0' }}>{blog.url}</p>
//     <div style={{ margin: '5px 0' }}>
//       <p className='blogLikes' style={{ display: 'inline' }}>likes: {blog.likes}</p>
//       <button onClick={handleLikeClick} style={{ marginLeft: '10px' }}>Like</button>
//       {
//         (blog.user === user.id)
//         && <button
//           onClick={handleDeleteClick}
//           style={{ marginLeft: '10px' }}>
//           Delete
//         </button>
//       }
//     </div>
//   </div>
// </Togglable>
