import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { notify, clear } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const byVote = (a1, a2) => a2.votes - a1.votes
  const vote = (anecdote) => {
      dispatch(voteFor(anecdote))
      dispatch(notify(`You voted for "${anecdote.content}"`))
      setTimeout(() => dispatch(clear()), 5000)
  }

  return (
    <div>
      {anecdotes
        .filter(anecdote => anecdote.content.includes(filter))
        .sort(byVote)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
        )}
    </div>
  )
}

export default Anecdotes
