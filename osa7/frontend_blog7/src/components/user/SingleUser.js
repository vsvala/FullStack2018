import React from 'react'
import { connect } from 'react-redux'


const SingleUser = ({ users, klickedUser }) => {

  const userStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  //console.log(user.name, 'tiedooooooooooot')
  const userAllInfo=users.find(u => u.name===klickedUser.name)


  return(

    <div style={userStyle}>
      <div className ="testausnimenta">
        <h1>User</h1>
        <h2>{klickedUser.name}</h2>

        <h3>Added blogs</h3>

        <ul>
          {userAllInfo.blogs.map(blog =>
            <li key={blog.id}>{blog.title}</li>
          )}
        </ul>
      </div>
    </div>
  )

}

const mapStateToProps = (state) => {
  console.log(state.blogs)
  return {
    users: state.users
  }
}
//kutsutaan  reducereista actioncreator metodeja
export default connect(
  mapStateToProps,
  {  }
)(SingleUser)
