import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'



describe('<Blog />', () => {

  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'Test URL',
    likes: 9999,
    user: {
      username: name
    }
  }

  let component

  beforeEach( () => {
    component = render(
      <Blog blog={blog} currentUser={blog.user} />
    )
  })

  test('default blog render shows only title and author', () => {

    const title = component.container.querySelector('.blogTitle')
    expect(title).not.toHaveStyle('display: none')

    const author = component.container.querySelector('.blogAuthor')
    expect(author).not.toHaveStyle('display: none')

    const other = component.container.querySelector('.togglableContent')
    expect(other).toBeDefined()
  })

  test('url and likes are shown on toggle button click', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveTextContent('Test URL')
    expect(div).toHaveTextContent('9999')
  })
})
