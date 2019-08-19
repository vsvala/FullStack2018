
import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../reducers/loginReducer'
import { Form, FormGroup, FormControl, FormLabel, Button, Col } from 'react-bootstrap'

export const LoginForm = ({ history, login }) => {
  // lomakkeen käsittelijä  history
  const handleSubmit = (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value
    login(username, password)

    event.target.username.value = ''
    event.target.password.value = ''
    history.push('/blogs')
  }

  return (
    <div className='loginForm'>
      <h2>Login</h2>

      <Form onSubmit={handleSubmit}>
        <FormGroup as={Col} md="4">
          <FormLabel>username:</FormLabel>

          <FormControl
            type="text"
            name="username"
          />
          <FormLabel>password:</FormLabel>
          <FormControl
            type="password"
            name="password"
          />
          <br></br>
          <Button bsStyle="success" type="submit">login</Button>
        </FormGroup>
      </Form>

    </div>
  )
}


export default connect(
  null,
  { login }
)(LoginForm)