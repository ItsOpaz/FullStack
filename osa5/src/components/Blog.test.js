import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title:'test title', url:'www.testi.fi', author:'test author'
  }
  const component = render(
    <Blog blog = {blog}/>
  )

  expect(component.container).toHaveTextContent(
    'test title test author'
  )

})

test('renders expanded content', () => {
  const blog = {
    title:'test title', url:'www.testi.fi', author:'test author', likes:0, user: {
      username: 'user_name'
    }
  }

  const component = render(
    <Blog blog = {blog} user = {blog.user}/>
  )
  const button = component.getByText('show')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'test title test authorhidewww.testi.filikes 0likeuser_nameremove'
  )
})

test('likes is pressed twice', () => {
  const blog = {
    title:'test title', url:'www.testi.fi', author:'test author', likes:0, user: {
      username: 'user_name'
    }
  }
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog = {blog} user = {blog.user} addLike = {mockHandler}/>
  )
  const showButton = component.getByText('show')
  fireEvent.click(showButton)
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})