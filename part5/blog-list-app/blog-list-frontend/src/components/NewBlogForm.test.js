import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {

  let component
  let createNewBlog

  beforeEach( () => {

    createNewBlog = jest.fn()

    component = render(
      <NewBlogForm handleNewPost={createNewBlog} />
    )
  })

  test('Title input', () => {
    const titleInput = component.container.querySelector('#newBlogTitle')
    const form = component.container.querySelector('.newBlogDiv')

    fireEvent.change(titleInput, {
      target: { value: 'new blog post title' }
    })

    fireEvent.submit(form)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0].title).toBe('new blog post title')
  })

  test('Author input', () => {
    const authorInput = component.container.querySelector('#newBlogAuthor')
    const form = component.container.querySelector('.newBlogDiv')

    fireEvent.change(authorInput, {
      target: { value: 'new blog post author' }
    })

    fireEvent.submit(form)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0].author).toBe('new blog post author')
  })

  test('Url input', () => {
    const urlInput = component.container.querySelector('#newBlogUrl')
    const form = component.container.querySelector('.newBlogDiv')

    fireEvent.change(urlInput, {
      target: { value: 'new blog post url' }
    })

    fireEvent.submit(form)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0].url).toBe('new blog post url')
  })
})
