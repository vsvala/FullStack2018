import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {


  return (
    <tr >
      <td><Link to={`/users/${user.id}`}> {<p>{user.name}</p>} </Link></td>
      <div className="content"><td>{user.blogs.length}</td></div>
    </tr>
  )
}
export default User
