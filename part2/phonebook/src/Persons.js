import React from 'react'

const Person = ({person, remove}) => (<li>
        {person.name}, {person.number}
        <button onClick={() => remove(person)}>delete</button> 
    </li>)

const Persons = ({persons, newFilter, remove}) => {
    return (<ul>
            {persons
             .filter(person => person.name.search(new RegExp(newFilter, 'i')) !== -1)
             .map(person => <Person key={person.name} person={person} remove={remove}/>)}
            </ul>)
}

export default Persons
