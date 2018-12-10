
import React from 'react'
import { Alert } from 'react-bootstrap'

const notificationStyle = {
  color: 'green',
  fontStyle: 'italic',
  fontSize: 16,
  padding: 20,
  borderStyle: 'solid'

}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <Alert color="success">
    <div className="notification"  style ={notificationStyle}>
      {message}
    </div>
    </Alert>
  )
}

export default Notification
