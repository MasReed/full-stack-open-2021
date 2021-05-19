import React, { useState } from 'react'

const NewBlogForm = ({ handleNewPost }) => {

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const makeNewPostObject = (event) => {
    event.preventDefault()

    handleNewPost({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={makeNewPostObject} className='newBlogDiv'>
        <div style={{ margin: '5px 0' }}>
          <label style={{ marginRight: '26px' }}>Title:</label>
          <input
            id='newBlogTitle'
            type='text'
            value={newBlogTitle}
            name='title'
            onChange={ ({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div style={{ margin: '5px 0' }}>
          <label style={{ marginRight: '10px' }}>Author:</label>
          <input
            id='newBlogAuthor'
            type='text'
            value={newBlogAuthor}
            name='author'
            onChange={ ({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div style={{ margin: '5px 0' }}>
          <label style={{ marginRight: '24px' }}>URL:</label>
          <input
            id='newBlogUrl'
            type='text'
            value={newBlogUrl}
            name='url'
            onChange={ ({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <div style={{ margin: '5px 0 0 60px' }}>
          <button id='createBlog' type='submit' style={{ padding: '3px 66.5px' }}>Create </button>
        </div>
      </form>
    </div>
  )
}

export default NewBlogForm
