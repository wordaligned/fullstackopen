const router = require('express').Router()
const User = require('../models/user')
const hasher = require('../utils/hasher')

router.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

router.post('/', async (request, response) => {
  const body = request.body
  if (body.password.length < 3) {
    throw {
      name: 'ValidationError',
      message: 'password must be at least 3 characters in length'
    }
  }
  const passwordHash = await hasher(body.password)
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const saved = await user.save()
  response.status(201).json(saved)
})

module.exports = router
