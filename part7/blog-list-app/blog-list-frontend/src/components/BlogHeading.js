import React from 'react'

const BlogHeading = ({ blog }) => {


  return (
    <React.Fragment>
      <h1>{blog.title}</h1>
      <h5>{blog.author}</h5>
      <a style={{ display: 'block' }} target="_blank" href={'//' + blog.url} rel="noreferrer">
        <h6>{blog.url}</h6>
      </a>
    </React.Fragment>
  )
}

export default BlogHeading
