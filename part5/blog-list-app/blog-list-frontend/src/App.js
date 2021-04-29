import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('darkgrey')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

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


  const handleNewPost = async (event) => {
    event.preventDefault()

    try {
      const newBlogPost = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      }

      await blogService.create(newBlogPost)

      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')

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
      <h2 style={{margin: '40px 0'}}>Blogs</h2>

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

        <NewBlogForm
          handleNewPost={handleNewPost}
          newBlogTitle={newBlogTitle}
          newBlogAuthor={newBlogAuthor}
          newBlogUrl={newBlogUrl}
          setNewBlogTitle={setNewBlogTitle}
          setNewBlogAuthor={setNewBlogAuthor}
          setNewBlogUrl={setNewBlogUrl}
        />

        <hr />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>}



    </div>
  )
}

export default App
