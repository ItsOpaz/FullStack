import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    props.notification === null ?
    null
    :
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification