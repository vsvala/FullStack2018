import React from 'react'
import { Link } from 'react-router-dom'


const Blog = ({ blog }) => {

  return (

    <tr>
      <td>
        <Link to={`/blogs/${blog.id}`}><div className="content">{blog.title}</div></Link>
      </td>
      <td>{blog.author} </td>
    </tr>
  )
}
export default Blog