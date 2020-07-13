import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notify, clear } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const added = await anecdoteService.createNew(content)
    dispatch(addAnecdote(added))
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