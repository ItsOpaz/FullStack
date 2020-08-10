const notificationReducer = (state = null, action) => {
  console.log('action', action)
  switch (action.type) {
    case 'VOTE_NOTIFICATION':
      return `you voted '${action.data.content}'`
    case 'CREATE_NOTIFICATION':
      return `you created '${action.data.content}'`
    case 'EMPTY':
      return null
    default:
      return state
  }
}

export const voteNotification = (content) => {
  return{
    type: 'VOTE_NOTIFICATION',
    data: { content }
  }
}

export const createNotification = (content) => {
  return{
    type: 'CREATE_NOTIFICATION',
    data: { content }
  }
}

export const clearNotification = () => {
  return {
    type: 'EMPTY'
  }
}

export default notificationReducer