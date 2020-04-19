import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addEntry = (event) => {
    event.preventDefault()
    const person = {name: newName, number: newNumber}
    const found = persons.find(person => person.name === newName)
    if (found)
    {
      if (window.confirm(`${newName} is already in the phonebook. Update their number?`)){
        personService
          .update(found.id, person)
          .then((updated) => {
            setPersons(persons.map(p => p.id !== updated.id ? p : updated))
          })
      }
    }
    else
    {
      personService
        .create(person)
        .then(created => setPersons(persons.concat(created)))
    }
    setNewName('')
    setNewNumber('')
  }

  const removeEntry = (person) => {
    if (window.confirm(`Remove ${person.name}?`)) {
      const id = person.id
      personService.remove(id).then(all => setPersons(all))
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  useEffect(() => {
    personService.getAll().then(all => setPersons(all))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <PersonForm addEntry={addEntry}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} remove={removeEntry}/>
    </div>
  )
}

export default App
