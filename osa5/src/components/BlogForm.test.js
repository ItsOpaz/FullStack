import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('adding blog works', () => {
  const createBlog = jest.fn()
  const setMsg = jest.fn()

  const component = render(
    <BlogForm createBlog = {createBlog} setMsg = {setMsg}/>
  )

  const title = component.container.querySelector('input[name="title"]')
  const url = component.container.querySelector('input[name="url"]')
  const author = component.container.querySelector('input[name="author"]')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'test_title' }
  })
  fireEvent.change(url, {
    target: { value: 'www.test.fi' }
  })
  fireEvent.change(author, {
    target: { value: 'test_author' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual(
    { title: 'test_title', author: 'test_author', url: 'www.test.fi' }
  )
})