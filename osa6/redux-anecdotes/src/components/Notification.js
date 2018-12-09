import React from 'react'
import { connect } from 'react-redux'
import { importanceToggling } from './../reducers/notificationReducer'

// const noti = this.props.store.getState().notification

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1
}

const Notification = (props) => (
  <div style={style}>
    {/*    {console.log(this.props.store.getState().notifications[0].content)}
        {this.props.store.getState().notifications[1].content}
        {/* {this.props.store.getState().notifications} */}
    {this.props.visibleNotification.map(n =>
      <div key={n.id}>
        <div>
          {n.content}
          handleClick={() => props.importanceToggling(n.id)}

          {/* {this.toggleImportance(n.id)} */}
        </div>
      </div>
    )}
  </div>
)


const notificationToShow = (notifications, filter) => {
  if (filter === 'ALL') {
    return notifications
  }

  return filter === 'IMPORTANT'
    ? notifications.filter(notification => notification.important)
    : notifications.filter(notification => !notification.important)
}


const mapStateToProps = (state) => {
  return {
    visibleNotification: notificationToShow(state.notifications, state.filter)
    // anecdotes: state.anecdotes,
    // notifications: state.notifications
  }
}

export default connect(
  mapStateToProps,
  { importanceToggling }
)(Notification)


// const ConnectedNotificationList = connect(
//   mapStateToProps
// )(Notification)

// export default ConnectedNotificationList
//export default Notification
