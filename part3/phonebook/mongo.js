const mongoose = require('mongoose')

const argv = process.argv

if (argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-2z8nt.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (argv.length == 3) {
  Person.find({}).then(result => {
    result.forEach(note => console.log(note))
    mongoose.connection.close()
  })
} else if (process.argv.length == 5) {
  const person = new Person({name: argv[3], number: argv[4]})
  person.save().then(response => {
    console.log('person saved')
    mongoose.connection.close()
  })
} else {
  console.log('Usage: node mongo.js PASSWORD [NAME NUMBER]')
}
