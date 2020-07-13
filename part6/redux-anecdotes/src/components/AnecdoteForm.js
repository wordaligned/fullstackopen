import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notify, clear } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
    dispatch(notify(`You added "${content}"`))
    setTimeout(() => dispatch(clear()), 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
      <div><input name='anecdote' /></div>
      <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm