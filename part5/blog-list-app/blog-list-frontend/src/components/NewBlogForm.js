import React from 'react'

const NewBlogForm = (
    {
        handleNewPost,
        newBlogTitle,
        newBlogAuthor,
        newBlogUrl,
        setNewBlogTitle,
        setNewBlogAuthor,
        setNewBlogUrl
    }
) => {

    return (
        <div>
            <h2>Create New Post</h2>
            <form onSubmit={handleNewPost}>
                <div style={{margin: '5px 0'}}>
                    <label style={{marginRight: '26px'}}>Title:</label>
                    <input
                      type='text'
                      value={newBlogTitle}
                      name='title'
                      onChange={ ({ target }) => setNewBlogTitle(target.value)}
                    />
                </div>
                <div style={{margin: '5px 0'}}>
                    <label style={{marginRight: '10px'}}>Author:</label>
                    <input
                      type='text'
                      value={newBlogAuthor}
                      name='author'
                      onChange={ ({ target }) => setNewBlogAuthor(target.value)}
                    />
                </div>
                <div style={{margin: '5px 0'}}>
                    <label style={{marginRight: '24px'}}>URL:</label>
                    <input
                      type='text'
                      value={newBlogUrl}
                      name='url'
                      onChange={ ({ target }) => setNewBlogUrl(target.value)}
                    />
                </div>
                <div style={{margin: '5px 0 0 60px'}}>
                  <button type='submit' style={{padding: '3px 66.5px'}}>Create </button>
                </div>
            </form>
        </div>
    )
}

export default NewBlogForm
