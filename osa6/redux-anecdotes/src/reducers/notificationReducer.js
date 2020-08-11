var timeoutHandle

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      if (action.content){
        return action.content
      }else{
        return null
      }
    default:
      return state
  }
}

export const setNotification = (content, time) => {
  clearTimeout(timeoutHandle)
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      content
    })
    timeoutHandle = setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
      })
      
    }, time * 1000)
  }
}

export default notificationReducer