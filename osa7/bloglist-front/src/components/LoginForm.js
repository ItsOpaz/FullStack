import React from 'react'
import { login } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const history = useHistory()
  const username = useField('text')
  const password = useField('password')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username.value, password.value))
    history.push('/')
  }

  return (
    <Form  align='center' backgroundcolor='blue' onSubmit={handleLogin}>
      <Form.Group >
        <div className='row1'>
          <div className='col-xs-2' style={{ backgroundColor:'lightgrey' }}>
            <Form.Label>username:</Form.Label>
            <Form.Control { ...username }/>
          </div>
        </div>
        <div className='row1'>
          <div className='col-xs-2' style={{ backgroundColor:'lightgrey' }}>
            <Form.Label>password:</Form.Label>
            <Form.Control { ...password }/><br/>
          </div>
        </div>
        <Button  variant="primary" type="submit">login</Button>
      </Form.Group>
    </Form>
  )
}

export default LoginForm