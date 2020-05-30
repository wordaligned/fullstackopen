const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (req, res) => {
  const body = req.body
  const user = await User.findOne({ username: body.username })

  if (user === null) {
    return res.status(401).json({ error: `Unknown user ${body.username}` })
  }
  if (!await bcrypt.compare(body.password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid password' })
  }
  const userForToken = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  res.send({ token, username: user.username, name: user.name })
})

module.exports = router
