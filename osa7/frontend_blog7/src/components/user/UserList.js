import React from 'react'
import User from './User'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'


export const UserList = (props) => {
  console.log('props', props)
  return (

    <div className="userList">
      <Table striped>
        <thead>
          <tr>
            <th>Username</th> <th>blogs added</th>
          </tr>
        </thead>
        <tbody>
          {props.visibleUsers.map(user =>
            <User key={user.id}
              user={user}

            />
          )}</tbody>
      </Table>
    </div >
  )
}

const mapStateToProps = (state) => {
  console.log('state', state.users)
  return {
    visibleUsers: state.users
  }
}

export default connect(
  mapStateToProps
)(UserList)