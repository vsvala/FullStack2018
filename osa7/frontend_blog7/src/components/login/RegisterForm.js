import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../../reducers/userReducer'
import { notify } from '../../reducers/notificationReducer'
import { Form, FormGroup, FormControl, FormLabel, Button, Col } from 'react-bootstrap'

const RegisterForm = ( { history, createUser, notify  }) => {
  //tapahtumankäsittelijä
  const handleSubmit = async (event) => {
    event.preventDefault()

    const userObject = {
      username:event.target.username.value,
      name:event.target.name.value,
      password:event.target.password.value,
      age:event.target.age.value
    }

    //console.log(userObject, 'rrrrrrrrrrrrrrrrrrreeeeekirt')
    createUser(userObject)
    notify(`user ${userObject.username} created`, 5)

    event.target.username.value = ''
    event.target.name.value=''
    event.target.password.value=''
    event.target.age.value=''
    history.push('/login')
  }

  return (
    <div>
      <h2>Register</h2>

      <Form onSubmit={handleSubmit}>
        <FormGroup as={Col} md="8">
          <FormLabel>username:</FormLabel>

          <FormControl
            type="text"
            name="username"
          />
          <FormLabel>name:</FormLabel>
          <FormControl
            type="text"
            name="name"
          />

          <FormLabel>password:</FormLabel>
          <FormControl
            type="password"
            name="password"
          />
          <FormLabel>age:</FormLabel>
          <FormControl
            type="number"
            name="age"
          />
          <br></br>
          <Button bsStyle="success" type="submit">Register user</Button>
        </FormGroup>
      </Form>
    </div>
  )
}

export default connect(
  null,
  { createUser, notify }
)(RegisterForm)
