export const notify = (content) => {
  return {
    type: 'NOTIFY',
    data: { content }
  }
}

export const clear = () => {
  return {
    type: 'CLEAR'
  }
}

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFY': return action.data.content
    case 'CLEAR': return ''
    default: return state
  }
}

export default reducer
