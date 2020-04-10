import React from 'react';
import ReactDOM from 'react-dom';

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

const Courses = ({courses}) => (
    <div>
        <h1>Web development curriculum</h1>
        {courses.map(course => (
            <div key={course.id}><Course course={course}/></div>)
        )}
    </div>
)

const App = () => {
    const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
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
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]

    return <Courses courses={courses} />
}

ReactDOM.render(<App />, document.getElementById('root'))
