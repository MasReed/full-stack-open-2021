import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'react-bootstrap/Button'
import { blogDestroyer, blogLikeUpdater } from '../reducers/blogReducer'


const BlogMetrics = ({ blog }) => {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)

  const handleLikeClick = (event) => {
    event.preventDefault()
    dispatch(blogLikeUpdater(blog))
  }

  const handleDeleteClick = (event) => {
    event.preventDefault()
    const isConfirmed = window.confirm(`Permanently delete '${blog.title}' ?`)

    isConfirmed ? dispatch(blogDestroyer(blog.id)) : null
  }

  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0' }}>
        <p style={{ margin: '0' }}>{blog.likes} Likes</p>
        <p style={{ margin: '0' }}>Posted by: {blog.user.username}</p>
      </div>

      <p style={{ margin: '0', padding: '0' }}>{blog.comments.length} Comments</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0' }}>
        <Button
          onClick={handleLikeClick}
          variant='secondary'
          style={{ margin: '6px 0 3px', padding: '8px 14px' }}
        >Like</Button>

        {
          (blog.user.id === currentUser.id)
          && <Button
            onClick={handleDeleteClick}
            variant='outline-warning'
            size='sm'
            style={{ margin: '6px 0 3px', float: 'right' }}
          >
            Delete
          </Button>
        }
      </div>
    </React.Fragment>
  )
}

export default BlogMetrics
