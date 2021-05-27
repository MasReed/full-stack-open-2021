import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import './index.css'

import BlogList from './components/BlogList'
import BlogPage from './components/BlogPage'
import HomePage from './components/HomePage'
import LoginForm from './components/LoginForm'
import NavigationHeader from './components/NavigationHeader'
import Notification from './components/Notification'
import UserPage from './components/UserPage'
import UserList from './components/UserList'

import { initializeBlogs } from './reducers/blogReducer'
import { setUserCreator } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import blogService from './services/blogs'


const App = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state)

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
    <React.Fragment>
      <div className='sticky-top'>
        <NavigationHeader />
        <Notification />
      </div>

      <React.Fragment>
        <Switch>

          <Route path='/login'>
            {state.user ? <Redirect to='/' /> : <LoginForm />}
          </Route>

          <Route path='/users/:id'>
            {state.user ? <UserPage user={userToView} /> : <Redirect to ='/login' />}
          </Route>

          <Route path='/users'>
            {state.user ? <UserList /> : <Redirect to='/login' />}
          </Route>

          <Route path='/blogs/:id'>
            {state.user ? <BlogPage blog={blogToView} /> : <Redirect to ='/login' />}
          </Route>

          <Route path='/blogs'>
            {state.user ? <BlogList /> : <Redirect to='/login' />}
          </Route>

          <Route path='/'>
            {state.user ? <HomePage /> : <Redirect to='/login' />}
          </Route>

          <Route path="*">
            {<h2>Not Found</h2>}
          </Route>

        </Switch>
      </React.Fragment>
    </React.Fragment>
  )
}

export default App
