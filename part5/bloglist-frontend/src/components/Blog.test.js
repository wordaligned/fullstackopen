import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'

import Blog from './Blog'

describe('blog component', () => {
  const blog = {
    title: 'Testing',
    author: 'Tester',
    url: 'http://example.com',
    user: jest.mock()
  }

  const like = jest.fn()
  const remove = jest.fn()

  test('renders title and author', () => {
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

  test('renders details when show is clicked', () => {
    const component = render(
      <Blog blog={blog} username='tester' like={like} remove={remove} />
    )
    const button = component.getByText('show')
    fireEvent.click(button)
    const details = component.container.querySelector('.details')
    expect(details).toHaveTextContent(blog.url)
    expect(details).toHaveTextContent('likes')
  })

  test('like button works', () => {
    const component = render(
      <Blog blog={blog} username='tester' like={like} remove={remove} />
    )
    const before = like.mock.calls.length
    fireEvent.click(component.getByText('show'))
    fireEvent.click(component.getByText('like'))
    fireEvent.click(component.getByText('like'))
    const after = like.mock.calls.length
    expect(after - before).toEqual(2)
  })
})



