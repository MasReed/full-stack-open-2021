import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('darkgrey')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
}, [blogs])

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

      // notification banner
      setNotificationColor('green')
      setNotificationMessage(
        `${username} successfully logged in!`
      )
      setTimeout( () => {
        setNotificationMessage(null)
        setNotificationColor('darkgrey')
      }, 5000)
    } catch (exception) {
      console.log(exception)
      // notification banner
      setNotificationColor('red')
      setNotificationMessage(
        `Invalid Username or Password`
      )
      setTimeout( () => {
        setNotificationMessage(null)
        setNotificationColor('darkgrey')
      }, 5000)
    }
      console.log('logging in with', username, password)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')

    // notification banner
    setNotificationColor('green')
    setNotificationMessage(
      `${username} successfully logged out!`
    )
    setTimeout( () => {
      setNotificationMessage(null)
      setNotificationColor('darkgrey')
    }, 5000)
  }


  const blogFormRef = useRef()

  const handleNewPost = async (newBlogObject) => {

    try {
      const newBlogPost = newBlogObject

      await blogService.create(newBlogPost)

      blogFormRef.current.toggleVisibility()

      // notification banner
      setNotificationColor('green')
      setNotificationMessage(
        `A new blog '${newBlogPost.title}' by ${newBlogPost.author} successfully added!`
      )
      setTimeout( () => {
        setNotificationMessage(null)
        setNotificationColor('darkgrey')
      }, 5000)
    } catch (exception) {
      console.log(exception)
      // notification banner
      setNotificationColor('red')
      setNotificationMessage(
        `An error has occured: ${exception}`
      )
      setTimeout( () => {
        setNotificationMessage(null)
        setNotificationColor('darkgrey')
      }, 5000)
    }
  }


  return (
    <div>
      <h2 style={{margin: '20px 0'}}>Blogs</h2>

      <Notification message={notificationMessage} color={notificationColor}/>

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

        <Togglable buttonLabel='New Post' ref={blogFormRef}>
          <NewBlogForm handleNewPost={handleNewPost} />
        </Togglable>

        <hr />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>}



    </div>
  )
}

export default App
