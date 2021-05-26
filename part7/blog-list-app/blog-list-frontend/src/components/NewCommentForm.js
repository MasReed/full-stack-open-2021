import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { blogCommentCreator } from '../reducers/blogReducer'


const NewCommentForm = ({ blog }) => {

  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleNewComment = (event) => {
    event.preventDefault()
    dispatch(blogCommentCreator(blog.id, comment))
    setComment('')
  }

  return (
    <React.Fragment>
      <Form style={{ marginTop: '20px' }}>
        <Form.Group controlId='formNewComment'>
          <Form.Control
            as='textarea'
            name='comment'
            value={comment}
            onChange={ ({ target }) => setComment(target.value) }
            placeholder='E.g. This is a good blog!' />
        </Form.Group>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type='submit' onClick={handleNewComment} variant='secondary'>
            Add Comment
          </Button>
        </div>
      </Form>
    </React.Fragment>
  )
}

export default NewCommentForm
