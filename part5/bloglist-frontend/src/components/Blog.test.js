import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'

import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'Testing',
    author: 'Tester',
    url: 'http://example.com',
    user: jest.mock()
  }

  const like = jest.fn()
  const remove = jest.fn()

  const component = render(
    <Blog blog={blog} username='tester' like={like} remove={remove} />
  )
  const title = component.container.querySelector('.title')
  expect(title).toHaveTextContent(blog.title)

  const author = component.container.querySelector('.author')
  expect(author).toHaveTextContent(blog.author)

  const details = component.container.querySelector('.details')
  expect(details).toBe(null)
})

test('renders details when clicked', () => {
  const blog = {
    title: 'Testing',
    author: 'Tester',
    url: 'http://example.com',
    user: jest.mock()
  }

  const like = jest.fn()
  const remove = jest.fn()

  const component = render(
    <Blog blog={blog} username='tester' like={like} remove={remove} />
  )
  const button = component.getByText('show')
  fireEvent.click(button)

  const details = component.container.querySelector('.details')
  expect(details).toHaveTextContent(blog.url)
  expect(details).toHaveTextContent('likes')
})
