const bcrypt = require('bcrypt')
const saltRounds = 10
const hasher = async pass => await bcrypt.hash(pass, saltRounds)

module.exports = hasher
