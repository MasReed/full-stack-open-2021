import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { initializeBlogs } from './reducers/blogReducer'
import { toastNotificationCreator } from './reducers/notificationReducer'
import { setUserCreator, unsetUserCreator } from './reducers/userReducer'


import blogService from './services/blogs'


const App = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state)

  useEffect( () => {
    dispatch(initializeBlogs())
  }, [ dispatch ])

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      dispatch(setUserCreator(user))
      blogService.setToken(user.token)
    }
  }, [ dispatch ])


  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(unsetUserCreator())
    window.localStorage.removeItem('loggedBlogappUser')

    toastNotification(
      `${state.user.username} successfully logged out!`,
      'green'
    )
  }


  const blogFormRef = useRef()
  const handleNewPost = async () => {
    blogFormRef.current.toggleVisibility()
  }

  const toastNotification = (message, color) => {
    dispatch(toastNotificationCreator(message, color))
  }


  return (
    <div>
      <h2 style={{ margin: '20px 0' }}>Blogs</h2>
      <Notification />
      <hr />

      {state.user === null
        ? <LoginForm />
        : <div>
          <p>{state.user.username} is logged in.</p>
          <button onClick={handleLogout}>Logout</button>
          <hr />

          <Togglable buttonLabelToOpen='New Post' buttonLabelToClose='Cancel' ref={blogFormRef}>
            <NewBlogForm handleNewPost={handleNewPost} currentUser={state.user} />
          </Togglable>

          <hr />

          {state.blogs
            .sort( (a, b) => {
              if (a.likes < b.likes) {
                return 1
              } else {
                return -1
              }
            })
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                currentUser={state.user}
              />
            )
          }
        </div>
      }
    </div>
  )
}

export default App
