import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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
      <h2>New Post</h2>

      <React.Fragment>
        <Form onSubmit={makeNewPostObject} style={{ marginTop: '20px' }}>
          <Form.Group controlId='formNewBlogTitle'>
            <Form.Control
              name='newBlogTitle'
              value={newBlogTitle}
              onChange={ ({ target }) => setNewBlogTitle(target.value) }
              placeholder='e.g. The Best Blog' />
          </Form.Group>

          <Form.Group controlId='formNewBlogAuthor'>
            <Form.Control
              name='newBlogAuthor'
              value={newBlogAuthor}
              onChange={ ({ target }) => setNewBlogAuthor(target.value) }
              placeholder='e.g. Ehts A. Rhealwun' />
          </Form.Group>

          <Form.Group controlId='formNewBlogUrl'>
            <Form.Control
              name='newBlogUrl'
              value={newBlogUrl}
              onChange={ ({ target }) => setNewBlogUrl(target.value) }
              placeholder='e.g. www.blog.com' />
          </Form.Group>

          <div style={{ float: 'right' }}>
            <Button type='submit' variant='light' style={{ backgroundColor: '#e06666' }}>
              Create
            </Button>
          </div>
        </Form>
      </React.Fragment>


    </div>
  )
}

export default NewBlogForm
