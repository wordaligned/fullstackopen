const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Promise.all(initialBlogs.map(b => (new Blog(b)).save()))
})

test('blogs are returned as json', async () => {
  const res = await api.get('/api/blogs')
  expect(res.status).toEqual(200)
  expect(res.get('content-type')).toMatch(/application\/json/)
  expect(res.body).toHaveLength(3)
})

test('blog entries have id fields', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body[0].id).toBeDefined()
})

test('new blogs can be posted', async () => {
  const new_blog = {
    'title': 'Word Aligned',
    'author': 'Thomas Guest',
    'url': 'http://wordaligned.org',
    'likes': 999
  }
  const blogs_before = await Blog.countDocuments()
  const res = await api.post('/api/blogs', new_blog)
  expect(res.status).toEqual(201)
  expect(res.get('content-type')).toMatch(/application\/json/)
  expect(res.body.id).toBeDefined()
  const blogs_after = await Blog.countDocuments()
  expect(blogs_after).toEqual(blogs_before + 1)
})

afterAll(() => {
  mongoose.connection.close()
})
