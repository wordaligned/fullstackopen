import React from 'react'

const sum = (array) => (array.reduce((acc, v) => acc + v))

const Header = ({name}) => <h2>{name}</h2>
const Part = ({part}) => <span>{part.name} {part.exercises}</span>
const Total = ({total}) => <div><b>total of {total} exercises</b></div>

const Course = ({course}) => (
    <div>
    <Header name={course.name} />
    {course.parts.map(part => <p key={part.id}><Part part={part} /></p>)}
    <Total total={sum(course.parts.map(part => part.exercises))} />
    </div>
)

export default Course