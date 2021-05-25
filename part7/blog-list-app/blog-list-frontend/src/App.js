import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'

import BlogList from './components/BlogList'
import BlogPage from './components/BlogPage'
import LoginForm from './components/LoginForm'
import NavigationHeader from './components/NavigationHeader'
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

  const blogFormRef = useRef()

  // initial render will initialize blogs and users into redux store
  useEffect( () => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [ dispatch ])

  // initial render gets persisted user e.g during refreshes
  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      dispatch(setUserCreator(user))
      blogService.setToken(user.token)
    }
  }, [ dispatch ])

  // finds user with id matching route
  const userMatch = useRouteMatch('/users/:id')
  const userToView = userMatch
    ? state.users.find( user => user.id === userMatch.params.id)
    : null

  // finds blog with id matching route
  const blogMatch = useRouteMatch('/blogs/:id')
  const blogToView = blogMatch
    ? state.blogs.find( blog => blog.id === blogMatch.params.id )
    : null

  // main app render
  return (
    <div>
      <div name='header'>
        <NavigationHeader />
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
                <NewBlogForm blogFormRef={blogFormRef} />
              </Togglable>

              <BlogList />

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
