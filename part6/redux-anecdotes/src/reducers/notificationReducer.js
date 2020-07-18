export const setNotification = (content, timeout_secs) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: { content }
    })
    setTimeout(() => {
      dispatch({type: 'CLEAR'})
    }, timeout_secs * 1000)
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
