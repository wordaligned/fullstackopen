const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.delete('/:id', async (req, res) => {
  if (!req.token) {
    return res.status(401).json({ error: 'token missing' })
  }
  const decoded = jwt.verify(req.token, process.env.SECRET)
  if (!decoded.id) {
    return res.status(401).json({ error: 'failed to decode token' })
  }
  const blog = await Blog.findById(req.params.id)
  if (blog.user.toString() !== decoded.id.toString()) {
    return res.status(401).json({ error: 'not the blog creator' })
  } else {
    await Blog.deleteOne(blog)
    return res.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  console.log(body)
  const updated = await Blog.findByIdAndUpdate(
    request.params.id, body, { new: true })
  response.status(200).json(updated)
})

blogsRouter.post('/', async (req, res) => {
  if (!req.token) {
    return res.status(401).json({ error: 'token missing' })
  }
  const decoded = jwt.verify(req.token, process.env.SECRET)
  if (!decoded.id) {
    return res.status(401).json({ error: 'failed to decode token' })
  }
  const creator = await User.findById(decoded.id)
  const body = req.body
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: creator._id
  })
  const result = await blog.save()
  creator.blogs = creator.blogs.concat(result._id)
  await creator.save()
  res.status(201).json(result)
})

module.exports = blogsRouter
