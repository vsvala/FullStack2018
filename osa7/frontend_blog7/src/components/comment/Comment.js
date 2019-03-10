import React from 'react'


const Comment = ({ comment }) => {

  return (
    <div className="content"><li>{comment.content}</li></div>
  )
}
export default Comment