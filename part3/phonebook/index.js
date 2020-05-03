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

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(next)
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(removed => res.status(204).end())
        .catch(next)
})

app.post('/api/persons', (req, res, next) => {
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
    person.save()
        .then(saved => res.json(saved.toJSON()))
        .catch(next)
})

app.put('/api/persons/:id', (req, res, next) => {
    const person = { name: req.body.name, number: req.body.number }
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updated => res.send(updated.toJSON()))
        .catch(next)
})

app.get('/info', (req, res, next) => {
    Person.estimatedDocumentCount()
        .then(entries => {
            const content = `
            <p>Phonebook has entries for ${entries} people.</p>
            <p>${new Date()}</p>
            `
            res.send(content)
        })
        .catch(next)
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message})
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
