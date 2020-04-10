import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({name}) => (<h1>{name}</h1>)
const Part = ({part}) => (<span>{part.name} {part.exercises}</span>)

const Course = ({course}) => (
    <div>
    <Header name={course.name} />
    {course.parts.map(part => <p key={part.id}><Part part={part} /></p>)}
    </div>
)

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }
        ]
    }

    return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))
