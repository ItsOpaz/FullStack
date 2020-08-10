const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.content
    case 'EMPTY':
      return null
    default:
      return state
  }
}

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      content
    })
    setTimeout(() => {
      dispatch(clearNotification())
      
    }, time * 1000)
  }
}

const clearNotification = () => {
  return {
    type: 'EMPTY'
  }
}

export default notificationReducer