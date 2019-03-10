import React from 'react'
import { mount } from 'enzyme'
import { LoginForm } from '../components/login/LoginForm'


describe('<LoginForm />', () => {
  let loginComponent


  loginComponent = mount(<LoginForm />)
  //console.log(loginComponent.debug())


  it('renders loginForm', () => {
    expect(loginComponent.find('.loginForm').length).toBe(1)

    let nameDiv = loginComponent.find('.loginForm')
    expect(nameDiv.text()).toContain('username')
    expect(nameDiv.text()).toContain('password')
  })
})