const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

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
  await User.deleteMany({})
  await Blog.deleteMany({})
  await Promise.all(initialBlogs.map(b => (new Blog(b)).save()))
})

describe('starting with some blogs', () => {
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

  test('blogs can be deleted', async () => {
    const before = await api.get('/api/blogs')
    const id = before.body[0].id
    await api.delete(`/api/blogs/${id}`).expect(204)
    const after = await api.get('/api/blogs')
    expect(after.body).toHaveLength(2)
  })

  test('blogs can be modified', async () => {
    const new_likes = 1234
    const before = await api.get('/api/blogs')
    const id = before.body[0].id
    const update = { 'likes': new_likes }
    await api.put(`/api/blogs/${id}`).send(update).expect(200)
    const after = await api.get(`/api/blogs/${id}`)
    expect(after.body.url).toEqual(before.body[0].url)
    expect(after.body.title).toEqual(before.body[0].title)
    expect(after.body.author).toEqual(before.body[0].author)
    expect(after.body.likes).toEqual(new_likes)
  })
})

describe('new blogs', () => {
  test('can be created', async () => {
    const new_blog = {
      'title': 'Word Aligned',
      'author': 'Thomas Guest',
      'url': 'http://wordaligned.org',
      'likes': 999
    }
    const blogs_before = await Blog.countDocuments()
    const res = await api.post('/api/blogs').send(new_blog)
    expect(res.status).toEqual(201)
    expect(res.get('content-type')).toMatch(/application\/json/)
    expect(res.body.id).toBeDefined()
    expect(res.body.title).toEqual(new_blog.title)
    expect(res.body.author).toEqual(new_blog.author)
    expect(res.body.url).toEqual(new_blog.url)
    const blogs_after = await Blog.countDocuments()
    expect(blogs_after).toEqual(blogs_before + 1)
  })

  test('default to 0 likes', async () => {
    const new_blog = {
      'title': 'Game of life',
      'author': 'Thomas Guest',
      'url': 'http://wordaligned.org/life'
    }
    const res = await api.post('/api/blogs').send(new_blog)
    const blog = await api.get(`/api/blogs/${res.body.id}`)
    expect(blog.body.likes).toEqual(0)
  })

  test('require a title', async () => {
    const new_blog = {
      'author': 'Thomas Guest',
      'url': 'http://wordaligned.org'
    }
    const res = await api.post('/api/blogs').send(new_blog)
    expect(res.status).toEqual(400)
  })

  test('require a url', async () => {
    const new_blog = {
      'author': 'Thomas Guest',
      'title': 'Slicing'
    }
    const res = await api.post('/api/blogs').send(new_blog)
    expect(res.status).toEqual(400)
  })
})

describe('new users', () => {
  test('can be created', async () => {
    const new_user = {
      'username': 'tag',
      'name': 'Thomas Guest',
      'password': 'abcd'
    }
    const users_before = await User.countDocuments()
    const res = await api.post('/api/users').send(new_user)
    expect(res.status).toEqual(201)
    expect(res.get('content-type')).toMatch(/application\/json/)
    expect(res.body.id).toBeDefined()
    expect(res.body.username).toEqual(new_user.username)
    expect(res.body.name).toEqual(new_user.name)
    const users_after = await User.countDocuments()
    expect(users_after).toEqual(users_before + 1)
  })

  test('require a valid username', async () => {
    const new_user = {
      'username': 'me',
      'name': 'Thomas',
      'password': 'xxx'
    }
    const res = await api.post('/api/users').send(new_user)
    expect(res.status).toEqual(400)
    expect(res.body.error).toMatch(/validation failed/)
  })

  test('require a unique username', async () => {
    const new_user = {
      'username': 'tag',
      'name': 'Thomas',
      'password': 'xxx'
    }
    await api.post('/api/users').send(new_user).expect(201)
    const res = await api.post('/api/users').send(new_user)
    expect(res.status).toEqual(400)
    expect(res.body.error).toMatch(/validation failed/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
