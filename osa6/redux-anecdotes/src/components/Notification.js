import React from 'react'

class Notification extends React.Component {

  render() { 
    const noti = this.props.store.getState().notification
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1    
    }  

    return ( 
       <div style={style}>
     {console.log(this.props.store.getState().notifications[0].content)}
    {/* {this.props.store.getState().notifications} */}

       
        {this.props.store.getState().notifications.map(n =>
           <div key={n.id}>
            <div>
            {n.content}
            </div>
            </div>
        )}
      </div>
    )
  }
}

export default Notification
