import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import { useSelector, useDispatch } from 'react-redux'
import { loadUser } from './reducers/loginReducer'
import './App.css'
import BlogSwitch from './components/BlogSwitches'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  if ( !user ) {
    return (
      <div align='center'>
        <p className='login'>Login to application</p>
        <Notification notification={notification} />
        <LoginForm />
      </div>
    )
  }
  return (
    <div className='container'>
      <Menu user = {user}/>
      <p className='login'>blogs</p>
      <Notification notification={notification} />
      <BlogSwitch />
    </div>
  )
}

export default App