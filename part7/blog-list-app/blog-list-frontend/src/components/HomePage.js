import React from 'react'
import { useSelector } from 'react-redux'

const HomePage = () => {

  const state = useSelector(state => state)

  const containerStyle={
    backgroundColor: '#fff',
    border: 'solid',
    borderColor: '#e06666',
    borderRadius: '5px',
    borderWidth: '5px',
    margin: '60px 0'
  }

  return (
    <div className='container'>
      <h1>Welcome to the Blog App</h1>
      <h5>Get the latest and greatest user-generated and referred content here.</h5>
      <div className='container' style={containerStyle}>
        <h3>{state.users.length} users</h3>
        <h3>{state.blogs.length} blogs</h3>
      </div>
    </div>
  )
}

export default HomePage
