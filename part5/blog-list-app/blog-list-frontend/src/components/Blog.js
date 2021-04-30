import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog }) => {

    const blogStyle={
        border: 'solid',
        borderColor: 'blue',
        borderWidth: 1,
        marginBottom: 5,
        padding: '10px 0 7px 4px'
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
                    <button style={{marginLeft: '10px'}}>Like</button>
                </div>
            </div>
        </Togglable>
      </div>
    )
}

export default Blog
