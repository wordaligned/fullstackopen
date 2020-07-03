import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'

import NewBlogForm from './NewBlogForm'

test('form receives properties', () => {
  const blog = { title: 'Test title', author: 'Tester', url: 'http://example.com' }
  const createBlog = jest.fn()
  const form = render(<NewBlogForm createBlog={createBlog} />)

  const titleInput = form.container.querySelector('#title')
  fireEvent.change(titleInput, {
    target: { value: blog.title }
  })
  const authorInput = form.container.querySelector('#author')
  fireEvent.change(authorInput, {
    target: { value: blog.author }
  })
  const urlInput = form.container.querySelector('#url')
  fireEvent.change(urlInput, {
    target: { value: blog.url }
  })

  fireEvent.click(form.getByText('create'))

  expect(createBlog.mock.calls[0][0]).toEqual(blog)
})