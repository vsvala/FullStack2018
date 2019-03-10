import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { mount } from 'enzyme'
import BlogList from '../components/blog/BlogList'
import store from '../store'
import { Provider } from 'react-redux'

//tähän pitäisi tehdä storesta vielä mock
describe.skip('<BlogList />', () => {
  let blogList
  beforeAll(() => {
    let props = {
      blogs: [
        {
          title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
          author: 'Jaska',
          url: 'www.komp.fi',
          likes: 2,
          user: 'Kalle'
        },
        {
          title: 'Toinen testiblogi',
          author: 'Julle',
          url: 'www.Dirlandaa.fi',
          likes: 100,
          user: 'test'
        }
      ]
    }

    blogList = mount(
      <Provider store={ store }>
        <Router>
          <BlogList {...props} />
        </Router>
      </Provider>
    )
    console.log(blogList.debug())
  })


  afterAll(() => {
    blogList.unMount()
  })

  it('renders blogList', () => {
    let table = blogList.find('.blogList')
    expect(table.length).toBe(1)
    expect(blogList.find('Blog').length).toBe(2)
  })
})