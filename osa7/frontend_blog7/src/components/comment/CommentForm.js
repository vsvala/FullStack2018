import React from 'react'
import { createComment } from '../../reducers/commentReducer'
import { notify } from '../../reducers/notificationReducer'
import { connect } from 'react-redux'
import { FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap'


const Comments = ({ blog, createComment, notify }) => {
  // Adding comment for blog
  const addComment = async(event) => {
    event.preventDefault()

    const commentObject = {
      content:event.target.content.value,
      blogId:blog.id
    }
    // tells blogreducer to create comment
    createComment(commentObject)
    notify('comment created', 5)

    event.target.content.value = ''
  }

  return (

    <div>

      <form onSubmit={addComment}>

        <FormGroup>

          <FormLabel>Write comment:</FormLabel>
          <FormControl
            type="text"
            name="content"
          />
          <br></br>
          <Button bsStyle="success" type="submit">add comment</Button>
        </FormGroup>
      </form>
    </div>
  )
}


export default connect(
  null,
  { createComment, notify }
)(Comments)