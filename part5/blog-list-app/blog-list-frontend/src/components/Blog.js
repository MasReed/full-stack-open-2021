import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, currentUser, updateLikes, deleteBlog }) => {

    const blogStyle={
        border: 'solid',
        borderColor: 'blue',
        borderWidth: 1,
        marginBottom: 5,
        padding: '10px 0 7px 4px'
    }

    const handleLikeClick = (event) => {
        event.preventDefault()

        const updatedBlogObject = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1
        }

        updateLikes(blog.id, updatedBlogObject)
    }

    const handleDeleteClick = (event) => {
        event.preventDefault()

        const isConfirmed = window.confirm(`Permanently delete '${blog.title}' ?`)

        return isConfirmed ? deleteBlog(blog) : null
    }

    return (
      <div style={blogStyle}>
        <h4 style={{margin: '2px 0'}}>{blog.title}</h4>
        <p style={{margin: '2px 0'}}>{blog.author}</p>
        <Togglable buttonLabelToOpen='Details' buttonLabelToClose='Hide'>
            <div>
                <p style={{margin: '5px 0'}}>{blog.url}</p>
                <div style={{margin: '5px 0'}}>
                    <p style={{display: 'inline'}}> likes: {blog.likes}</p>
                    <button onClick={handleLikeClick} style={{marginLeft: '10px'}}>Like</button>
                    {(blog.user.username === currentUser.username)
                        && <button onClick={handleDeleteClick} style={{marginLeft: '10px'}}>Delete</button>}
                </div>
            </div>
        </Togglable>
      </div>
    )
}

export default Blog
