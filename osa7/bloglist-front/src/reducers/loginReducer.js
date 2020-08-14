import loginService from '../services/login'
import storage from '../utils/storage'
import { setNotification } from './notificationReducer'

const loginReducer = (state = null, action) => {

  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const loadUser = () => {
  return async dispatch => {
    const user = storage.loadUser()
    dispatch({
      type: 'LOGIN',
      user
    })
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })
      storage.saveUser(user)
      dispatch({
        type: 'LOGIN',
        user
      })
      dispatch(setNotification(`${user.name} welcome back!`, false, 5))
    } catch(exception) {
      dispatch(setNotification('wrong username/password', true, 5))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    storage.logoutUser()
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default loginReducer