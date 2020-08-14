import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const Menu = ({ user }) => {
  const dispatch = useDispatch()
  const padding = {
    paddingRight: 5
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <Link style={padding} to='/blogs'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Menu