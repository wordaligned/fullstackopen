import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const choice = (n) => Math.floor(Math.random() * n)

const voteFor = (votes, n) => {
  const result = [...votes]
  result[n] += 1
  return result
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(choice(anecdotes.length))
  const [votes, setVotes] = useState(Array.from(anecdotes).fill(0))
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <button onClick={() => setSelected(choice(anecdotes.length))}>next anecdote</button>
      <button onClick={() => setVotes(voteFor(votes, selected))}>vote</button>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
