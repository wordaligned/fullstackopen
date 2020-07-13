export const setFilter = (filter) => {
  return {
    type: 'SET',
    data: { filter }
  }
}
  
const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET': return action.data.filter
    default: return state
  }
}
  
export default reducer
  