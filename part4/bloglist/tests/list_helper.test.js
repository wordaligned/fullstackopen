const listHelper = require('../utils/list_helper')

const blog1 = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const blogs3 = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }
]

describe('total likes', () => {
  test('is zero when list is empty', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(blog1)
    expect(result).toBe(5)
  })
  test('is the sum of likes for the listed blogs', () => {
    const result = listHelper.totalLikes(blogs3)
    expect(result).toBe(7 + 5 + 12)
  })
})

describe('favourite', () => {
  test('of an empty list is undefined', () => {
    const result = listHelper.favouriteBlog([])
    expect(result).toBe(undefined)
  })
  test('of a list of one is that one', () => {
    const result = listHelper.favouriteBlog(blog1)
    expect(result).toEqual(blog1[0])
  })
})

describe('author of the most blogs', () => {
  test('is the author of the blog when one blog supplied', () => {
    const result = listHelper.mostBlogs(blog1)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', count: 1 })
  })
  test('is Dijkstra when full list supplied', () => {
    const result = listHelper.mostBlogs(blogs3)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', count: 2 })
  })
  test('is undefined when no blogs supplied', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(undefined)
  })
})