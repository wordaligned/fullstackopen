import React from 'react'

const Person = ({person}) => <li>{person.name}, {person.number}</li>

const Persons = ({persons, newFilter}) => {
    return (<ul>
            {persons
             .filter(person => person.name.search(new RegExp(newFilter, 'i')) !== -1)
             .map(person => <Person key={person.name} person={person}/>)}
            </ul>)
}

export default Persons
