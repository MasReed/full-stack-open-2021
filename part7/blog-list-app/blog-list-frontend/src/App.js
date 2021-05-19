import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

import { notificationCreator, notificationReseter } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [pingBlogs, setPingBlogs] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const state = useSelector(state => state)


  useEffect( () => {

    async function fetchData() {
      const res = await blogService.getAll()
      setBlogs(res)
      // store.dispatch({
      //   type: 'SET_BLOGS',
      //   data: res
      // })
    }

    fetchData()
  }, [ pingBlogs ])

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      toastNotification(
        `${username} successfully logged in!`,
        'green'
      )
    } catch (exception) {
      console.log(exception)

      toastNotification(
        'Invalid Username or Password',
        'red'
      )
    }
    console.log('logging in with', username)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')

    toastNotification(
      `${username} successfully logged out!`,
      'green'
    )
  }


  const blogFormRef = useRef()
  const handleNewPost = async (newBlogObject) => {

    try {
      const newBlogPost = newBlogObject

      await blogService.create(newBlogPost)

      blogFormRef.current.toggleVisibility()

      // rerender blogs
      setPingBlogs(!pingBlogs)

      toastNotification(
        `A new blog '${newBlogPost.title}' by ${newBlogPost.author} successfully added!`,
        'green'
      )
    } catch (exception) {
      console.log(exception)
      toastNotification(
        `An error has occured: ${exception}`,
        'red'
      )
    }
  }

  const handleBlogLike = async (id, updatedBlogObject) => {
    try {
      await blogService.update(id, updatedBlogObject)
      // rerender blogs
      setPingBlogs(!pingBlogs)

      toastNotification(
        'Liked!',
        'blue'
      )
    } catch (exception) {
      toastNotification(
        `${exception}`,
        'red'
      )
    }
  }

  const handleBlogDelete = async (blog) => {
    try {
      await blogService.deletePost(blog.id)

      // rerender blogs
      setPingBlogs(!pingBlogs)

      toastNotification(
        `'${blog.title}' deleted!`,
        'darkorange'
      )
    } catch (exception) {
      toastNotification(
        `${exception}`,
        'red'
      )
    }
  }

  const toastNotification = (message, color) => {
    dispatch(notificationCreator(message, color))
    setTimeout( () => dispatch(notificationReseter()), 5000)
    // TODO: make async with clearTimer()
  }


  return (
    <div>
      <h2 style={{ margin: '20px 0' }}>Blogs</h2>

      <Notification message={state.message} color={state.color} />

      <hr />

      {user === null ? <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
        : <div>
          <p>{user.username} is logged in.</p>
          <button onClick={handleLogout}>Logout</button>
          <hr />

          <Togglable buttonLabelToOpen='New Post' buttonLabelToClose='Cancel' ref={blogFormRef}>
            <NewBlogForm handleNewPost={handleNewPost} />
          </Togglable>

          <hr />

          {blogs
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
                currentUser={user}
                updateLikes={handleBlogLike}
                deleteBlog={handleBlogDelete}
              />
            )
          }
        </div>}

    </div>
  )
}

export default App
