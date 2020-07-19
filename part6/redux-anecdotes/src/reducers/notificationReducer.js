let timeoutId = undefined

export const setNotification = (content, timeout_secs) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      data: { content }
    })
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = undefined
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
