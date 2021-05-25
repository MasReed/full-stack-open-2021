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

// import { useDispatch, useSelector } from 'react-redux'

// import { blogLikeUpdater, blogDestroyer } from '../reducers/blogReducer'
// import { toastNotificationCreator } from '../reducers/notificationReducer'
// import Togglable from './Togglable'

// const dispatch = useDispatch()
// const user = useSelector(state => state.user)

// const handleLikeClick = (event) => {
//   event.preventDefault()
//
//   try {
//     dispatch(blogLikeUpdater(blog))
//     dispatch(toastNotificationCreator(
//       'Liked!',
//       'blue'
//     ))
//   } catch (exception) {
//     dispatch(toastNotificationCreator(
//       `${exception}`,
//       'red'
//     ))
//   }
// }
//
// const handleDeleteClick = (event) => {
//   event.preventDefault()
//   const isConfirmed = window.confirm(`Permanently delete '${blog.title}' ?`)
//
//   if (isConfirmed) {
//     try {
//       dispatch(blogDestroyer(blog.id))
//       dispatch(toastNotificationCreator(
//         `'${blog.title}' deleted!`,
//         'orange'
//       ))
//     } catch (exception) {
//       dispatch(toastNotificationCreator(
//         `${exception}`,
//         'red'
//       ))
//     }
//
//   } else {
//     return null
//   }
// }


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
