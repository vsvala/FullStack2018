import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {

  render() {
   // const noti = this.props.store.getState().notification

    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    const notificationToShow = (notifications, filter) => {
      if (filter === 'ALL') {
        return notifications
      }

      return filter === 'IMPORTANT'
        ? notifications.filter(notification => notification.important)
        : notifications.filter(notification => !notification.important)
    }

    // storen tilan kentät on otettu tuttuun tapaan destrukturoimalla apumuuttujiin
    // const notiToShow = () => {
    //   const { notification, filter } =this.props.store.getState()
    //   if (filter === 'ALL') {
    //     return notification
    //   }

    //   return filter === 'IMPORTANT'
    //     ? notification.filter(note => note.important)
    //     : notification.filter(note => !note.important)
    // }


    return (

    //   <ul>
    //     {notiToShow().map(noti =>
    //         key={noti.id}
    //         content={content}
    //         handleClick={() => this.props.importanceToggling(noti.id)}
    //       />
    //     )}

    //   </ul>

      <div style={style}>
        {/*    {console.log(this.props.store.getState().notifications[0].content)}
        {this.props.store.getState().notifications[1].content}
        {/* {this.props.store.getState().notifications} */}
        {this.props.notifications.map(n =>
          <div key={n.id}>
            <div>
              {n.content}
              {/* {this.toggleImportance(n.id)} */}
            </div>
          </div>
        )}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  // visibleNotes: notificationToShow(state.notifications, state.filter)
    anecdotes: state.anecdotes,
    notifications: state.notification
  }
}

const ConnectedNotificationList = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotificationList
//export default Notification
