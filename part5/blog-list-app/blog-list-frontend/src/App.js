import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
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
    } catch (exception) {
      console.log(exception)
    }
      console.log('logging in with', username, password)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }


  const handleNewPost = async (event) => {
    event.preventDefault()

    const newBlogPost = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    await blogService.create(newBlogPost)

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }


  return (
    <div>
      <h2 style={{margin: '40px 0'}}>Blogs</h2>

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
