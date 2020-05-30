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

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updated = await Blog.findByIdAndUpdate(
    request.params.id, body, { new: true })
  response.status(200).json(updated)
})

blogsRouter.post('/', async (request, response) => {
  const creator = await User.findOne()
  const body = request.body
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
  response.status(201).json(result)
})

module.exports = blogsRouter
