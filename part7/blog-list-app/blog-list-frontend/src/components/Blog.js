import React from 'react'
import { useDispatch } from 'react-redux'
import { blogLikeUpdater, blogDestroyer } from '../reducers/blogReducer'
import { toastNotificationCreator } from '../reducers/notificationReducer'
import Togglable from './Togglable'

const Blog = ({ blog, currentUser, updateLikes, deleteBlog }) => {

  const dispatch = useDispatch()

  const blogStyle={
    border: 'solid',
    borderColor: 'purple',
    borderWidth: 1,
    marginBottom: 5,
    padding: '10px 0 7px 4px'
  }

  const handleLikeClick = (event) => {
    event.preventDefault()

    try {
      dispatch(blogLikeUpdater(blog))
      updateLikes()
      dispatch(toastNotificationCreator(
        'Liked!',
        'blue'
      ))
    } catch (exception) {
      dispatch(toastNotificationCreator(
        `${exception}`,
        'red'
      ))
    }
  }


  const handleDeleteClick = (event) => {
    event.preventDefault()

    const isConfirmed = window.confirm(`Permanently delete '${blog.title}' ?`)

    isConfirmed ? dispatch(blogDestroyer(blog.id)) : null

    deleteBlog()

    return
  }



  return (
    <div style={blogStyle} className='blogDiv'>
      <h4 style={{ margin: '2px 0' }} className='blogTitle'>{blog.title}</h4>
      <p style={{ margin: '2px 0' }} className='blogAuthor'>{blog.author}</p>
      <Togglable buttonLabelToOpen='Details' buttonLabelToClose='Hide'>
        <div className='togglableContent'>
          <p style={{ margin: '5px 0' }}>{blog.url}</p>
          <div style={{ margin: '5px 0' }}>
            <p className='blogLikes' style={{ display: 'inline' }}>likes: {blog.likes}</p>
            <button onClick={handleLikeClick} style={{ marginLeft: '10px' }}>Like</button>
            {
              (blog.user.username === currentUser.username)
              && <button
                onClick={handleDeleteClick}
                style={{ marginLeft: '10px' }}>
                Delete
              </button>
            }
          </div>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
