const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

require('dotenv').config()
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (req, res) => (
    req.method === 'POST' ? JSON.stringify(req.body) : ''
))

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => res.json(persons.map(p => p.toJSON())))
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(p => res.json(p.toJSON()))
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
        .then(removed => res.status(204).end())
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({ error: 'name missing' })
    }
    if (!body.number) {
        return res.status(400).json({ error: 'number missing' })
    }
    const person = new Person({
      name: body.name,
      number: body.number
    })
    person.save().then(saved => res.json(saved.toJSON()))
})

app.get('/info', (req, res) => {
    const content = `
    <p>Phonebook has entries for ${persons.length} people.</p>
    <p>${new Date()}</p>
    `
    res.send(content)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
