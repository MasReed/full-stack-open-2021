import React from 'react'

const Blog = ({blog}) => (
  <div style={{margin: '15px 0'}}>
    <h4 style={{margin: '0px'}}>{blog.title}</h4>
    <p style={{margin: '0px'}}>{blog.author}</p>
  </div>
)

export default Blog
