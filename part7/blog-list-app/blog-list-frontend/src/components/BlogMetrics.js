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

      <hr style={{ margin: '75px 0 6px' }}/>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0' }}>
        <div style={{ display: 'flex', margin: '0', padding: '0' , alignItems: 'center' }}>
          <Button
            onClick={handleLikeClick}
            variant='primary'
            style={{ marginRight: '10px', padding: '1px 16px' }}
          >Like</Button>
          <p style={{ margin: '0', padding: '0 5px', display: 'inline' }}>{blog.likes} Likes</p>
          <p style={{ margin: '0', padding: '0 5px', display: 'inline' }}>{blog.comments.length} Comments</p>
        </div>

        <div style={{ display: 'flex', margin: '0', padding: '0' , alignItems: 'center' }}>
          {
            (blog.user.id === currentUser.id)
              ? <p style={{ margin: '0' }}>You posted this!</p>
              : <p style={{ margin: '0' }}>Posted by: {blog.user.username}</p>
          }
          {
            (blog.user.id === currentUser.id)
            && <Button
              onClick={handleDeleteClick}
              variant='outline-warning'
              size='sm'
              style={{ marginLeft: '10px', padding: '1px 16px' }}
            >Delete</Button>
          }
        </div>
      </div>

      <hr style={{ margin: '6px 0' }}/>

    </React.Fragment>
  )
}

export default BlogMetrics
