import anecdoteService from '../services/anecdotes'

export const voteFor = (anecdote) => {
  return async dispatch => {
    const updated = await anecdoteService.voteFor(anecdote)
    dispatch({
      type: 'VOTE',
      data: { updated }
    })
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const added = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: { added }
    })
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
      const updated = action.data.updated
      return state.map((a) => a.id === updated.id ? updated : a)
    case 'ADD':
      return [...state, action.data.added]
    case 'INITIALISE':
      return action.data
    default:
      return state
  }
}

export default reducer