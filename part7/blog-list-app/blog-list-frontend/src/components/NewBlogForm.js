import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blogCreator } from '../reducers/blogReducer'
import { toastNotificationCreator } from '../reducers/notificationReducer'

const NewBlogForm = ({ blogFormRef }) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const makeNewPostObject = (event) => {
    event.preventDefault()

    try {
      // update backend
      dispatch(blogCreator({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
        user: {
          id: user.id,
          username: user.username
        }
      }))

      // collapse form
      blogFormRef.current.toggleVisibility()

      // success message
      dispatch(toastNotificationCreator(
        `A new blog '${newBlogTitle}' by ${newBlogAuthor} successfully added!`,
        'success'
      ))

    } catch (exception) {
      // log failure message
      console.log(exception)
      dispatch(toastNotificationCreator(
        `An error has occured: ${exception}`,
        'danger'
      ))

    } finally {
      // reset input fields
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
    }
  }

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={makeNewPostObject} className='newBlogDiv'>
        <div style={{ margin: '5px 0' }}>
          <label style={{ marginRight: '26px' }}>Title:</label>
          <input
            id='newBlogTitle'
            type='text'
            value={newBlogTitle}
            name='title'
            onChange={ ({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div style={{ margin: '5px 0' }}>
          <label style={{ marginRight: '10px' }}>Author:</label>
          <input
            id='newBlogAuthor'
            type='text'
            value={newBlogAuthor}
            name='author'
            onChange={ ({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div style={{ margin: '5px 0' }}>
          <label style={{ marginRight: '24px' }}>URL:</label>
          <input
            id='newBlogUrl'
            type='text'
            value={newBlogUrl}
            name='url'
            onChange={ ({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <div style={{ margin: '5px 0 0 60px' }}>
          <button id='createBlog' type='submit' style={{ padding: '3px 66.5px' }}>Create </button>
        </div>
      </form>
    </div>
  )
}

export default NewBlogForm
