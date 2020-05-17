const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  })
  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter
