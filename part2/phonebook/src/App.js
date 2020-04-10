import React, { useState } from 'react'

const Person = ({person}) => <li>{person.name}, {person.number}</li>

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addEntry = (event) => {
    event.preventDefault()
    const found = persons.find(person => person.name === newName)
    if (found)
    {
      alert(`${newName} is already in the phonebook`)
    }
    else
    {
      setPersons(persons.concat(
        {name: newName, number: newNumber}))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter entries: <input value={newFilter} onChange={handleFilterChange}/></div>
      <form onSubmit={addEntry}>
      <div>name: <input value={newName} onChange={handleNameChange}/></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter(person => person.name.search(new RegExp(newFilter, 'i')) !== -1)
          .map(person => <Person key={person.name} person={person}/>)}
      </ul>
    </div>
  )
}

export default App