import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { blogCommentCreator } from '../reducers/blogReducer'

const BlogPage = ({ blog }) => {

  const dispatch = useDispatch()
  const [ comment, setComment ] = useState('')

  const handleNewComment = (event) => {
    event.preventDefault()

    try {
      dispatch(blogCommentCreator(blog.id, comment))
    } catch (exception) {
      console.log(exception)
    } finally {
      setComment('')
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <h3>{blog.author}</h3>
      <a href=''>{blog.url}</a>
      <hr />
      <p>Liked {blog.likes} times</p>
      <p>Posted by: {blog.user.username}</p>
      <hr />
      <div>
        <h3>Comments:</h3>
        <form style={{ padding: '10px' }}>
          <input
            id='newComment'
            type='text'
            name='comment'
            value={comment}
            onChange={ ({ target }) => setComment(target.value) }
          />
          <button onClick={handleNewComment}>Add Comment</button>
        </form>
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
