import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { blogLikeUpdater, blogDestroyer } from '../reducers/blogReducer'
import { toastNotificationCreator } from '../reducers/notificationReducer'
import Togglable from './Togglable'

const Blog = ({ blog }) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

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

    if (isConfirmed) {
      try {
        dispatch(blogDestroyer(blog.id))
        dispatch(toastNotificationCreator(
          `'${blog.title}' deleted!`,
          'orange'
        ))
      } catch (exception) {
        dispatch(toastNotificationCreator(
          `${exception}`,
          'red'
        ))
      }

    } else {
      return null
    }
  }


  return (
    <div style={blogStyle} className='blogDiv'>
      <Link to={`/blogs/${blog.id}`}>
        <h4 style={{ margin: '2px 0' }} className='blogTitle'>{blog.title}</h4>
      </Link>
      <p style={{ margin: '2px 0' }} className='blogAuthor'>{blog.author}</p>
      <Togglable buttonLabelToOpen='Details' buttonLabelToClose='Hide'>
        <div className='togglableContent'>
          <p style={{ margin: '5px 0' }}>{blog.url}</p>
          <div style={{ margin: '5px 0' }}>
            <p className='blogLikes' style={{ display: 'inline' }}>likes: {blog.likes}</p>
            <button onClick={handleLikeClick} style={{ marginLeft: '10px' }}>Like</button>
            {
              (blog.user === user.id)
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
