import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
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
  expect(title).toHaveTextContent('Testing')

  const author = component.container.querySelector('.author')
  expect(author).toHaveTextContent('Tester')

  const details = component.container.querySelector('.details')
  expect(details).toHaveStyle('display: none')
})
