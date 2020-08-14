import React from 'react'

const Notification = ({ notification }) => {
  return (
    notification?
      <div className= {notification.error?'error' : 'notification'}>
        {notification.content}
      </div>
      :
      null
  )
}

export default Notification