
import React from 'react'

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
    <div className="notification"  style ={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
