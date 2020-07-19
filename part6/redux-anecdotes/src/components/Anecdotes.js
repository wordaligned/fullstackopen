import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = (props) => {
  const anecdotes = props.anecdotes
  const filter = props.filter
  const byVote = (a1, a2) => a2.votes - a1.votes
  const vote = (anecdote) => {
      props.voteFor(anecdote)
      props.setNotification(`You voted for "${anecdote.content}"`, 5)
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
const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteFor,
  setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps, 
  mapDispatchToProps)(Anecdotes)
export default ConnectedAnecdotes
