import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { initializeBlogs } from './reducers/blogReducer'
import { setUserCreator } from './reducers/userReducer'


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


  const blogFormRef = useRef()
  const handleNewPost = async () => {
    blogFormRef.current.toggleVisibility()
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
          <LogoutButton />
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
