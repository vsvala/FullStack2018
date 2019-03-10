import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { mount } from 'enzyme'
import UserList from '../components/user/UserList'
import store from '../store'
import { Provider } from 'react-redux'

//tähän pitäisi tehdä storesta vielä mock
describe.skip('<UserList />', () => {
  let userList
  beforeAll(() => {
    let props = {
      visibleUsers: [
        {
          id: '5b4fbbee9',
          username: 'Jaska',
          blogs: [{ id: '5bff079d327e8825eeeb0f11', title: 'bloginotsikko', author: 'Mikkonen', url: 'www.jotain', likes: 5 }]
        },
        {
          id: '5b4fbbee9ab9b37ff73672e1',
          username: 'Mikko',
          blogs: [{ id: '5bff079d3', title: 'toinenblogi', author: 'Jaiku', url: 'www.mukkellis', likes: 1 }]
        }
      ]
    }

    userList = mount(
      <Provider store={store}>
        <Router>
          <UserList {...props} />
        </Router>
      </Provider>

      // <UserList {...props} />
    )
    console.log(userList.debug())
  })


  // afterAll(() => {
  //   userList.unMount()
  // })

  it('renders userList', () => {
    //let table = userList.find('.userList')
    //expect(table.length).toBe(1)
    expect(userList.find('User').length).toBe(2)
  })
})