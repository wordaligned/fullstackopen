import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ statusMessage, setStatusMessage ] = useState(null)

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
            setStatusMessage(`Updated ${updated.name}`)
            setTimeout(() => setStatusMessage(null), 5000)
          })
          .catch(error => {
            alert(`${newName} is no longer in the phonebook`)
            setPersons(persons.filter(p => p.id !== found.id))
          })
      }
    }
    else
    {
      personService
        .create(person)
        .then(created => {
          setPersons(persons.concat(created))
          setStatusMessage(`Added ${created.name}`)
          setTimeout(() => setStatusMessage(null), 5000)
        })
        .catch(error => {
          setStatusMessage(error.response.data.error)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const removeEntry = (person) => {
    if (window.confirm(`Remove ${person.name}?`)) {
      const id = person.id
      personService.remove(id)
        .then(all => setPersons(all))
        .catch(error => {
          alert(`${person.name} had already been removed from the phonebook`)
          setPersons(persons.filter(p => p.id !== id))
        })
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
      <Notification message={statusMessage} />
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
