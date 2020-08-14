import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ notification }) => {
  return (
    notification?
      notification.error?
        <Alert variant='danger'>
          {notification.content}
        </Alert>
        :
        <Alert variant='success'>
          {notification.content}
        </Alert>
      :
      null
  )
}

export default Notification