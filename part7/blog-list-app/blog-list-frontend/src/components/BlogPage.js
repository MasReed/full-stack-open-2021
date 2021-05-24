import React, { useState } from 'react'
// import blogService from '../services/blogs'

const BlogPage = ({ blog }) => {

  const [ comment, setComment ] = useState('')

  console.log('BLOG', blog)

  const handleNewComment = async (event) => {
    event.preventDefault()
    console.log('comment:', comment)
    setComment('')
    return
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
