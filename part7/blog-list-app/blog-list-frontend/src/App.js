import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Switch, Route, Link,
  Redirect, useRouteMatch
} from 'react-router-dom'

import Blog from './components/Blog'
import BlogPage from './components/BlogPage'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import User from './components/User'
import UserList from './components/UserList'

import { initializeBlogs } from './reducers/blogReducer'
import { setUserCreator } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import blogService from './services/blogs'


const App = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state)

  useEffect( () => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [ dispatch ])

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      dispatch(setUserCreator(user))
      blogService.setToken(user.token)
    }
  }, [ dispatch ])


  const userMatch = useRouteMatch('/users/:id')
  const userToView = userMatch
    ? state.users.find( user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogToView = blogMatch
    ? state.blogs.find( blog => blog.id === blogMatch.params.id )
    : null


  const blogFormRef = useRef()
  const handleNewPost = async () => {
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <div name='header'>
        <div>
          <h2 style={{ padding: '20px 0 10px', margin: '0' }}>Welcome to the Blog App</h2>
          {state.user
            ? <div style={{ padding: '5px 0' }}>
              <p style={{ display: 'inline-block', margin: '3px' }}>{state.user.username} is logged in.</p>
              <LogoutButton />
            </div>
            : null }


          <div style={{ backgroundColor: 'lightgrey', padding: '8px' }}>
            <Link to='/' style={{ margin: '3px' }}>Home</Link>
            <Link to='/blogs' style={{ margin: '3px' }}>Blogs</Link>
            <Link to='/users' style={{ margin: '3px' }}>Users</Link>
          </div>

          <hr />
        </div>
        <Notification />
      </div>

      <Switch>

        <Route path='/login'>
          {state.user ? <Redirect to='/' /> : <LoginForm />}
        </Route>

        <Route path='/users/:id'>
          {state.user ? <User user={userToView} /> : <Redirect to ='/login' />}
        </Route>

        <Route path='/users'>
          {state.user ? <UserList /> : <Redirect to='/login' />}
        </Route>

        <Route path='/blogs/:id'>
          {state.user ? <BlogPage blog={blogToView} /> : <Redirect to ='/login' />}
        </Route>

        <Route path='/blogs'>
          {state.user
            ? <div>

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
            : <Redirect to='/login' />
          }
        </Route>

        <Route path='/'>
          {state.user ? <h2>HELLO WELCOME HOME</h2> : <Redirect to='/login' />}
        </Route>

      </Switch>
    </div>
  )
}

export default App
