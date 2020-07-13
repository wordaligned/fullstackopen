import anecdoteService from '../services/anecdotes'

export const voteFor = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'ADD',
    data: { content }
  }
}

export const initialiseAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALISE',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      return state.map((a) => a.id === id ? { ...a, votes: a.votes + 1 } : a)
    case 'ADD':
      return [...state, action.data.content]
    case 'INITIALISE':
      return action.data
    default:
      return state
  }
}

export default reducer