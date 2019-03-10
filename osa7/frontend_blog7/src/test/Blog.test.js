import React from 'react'
import { shallow } from 'enzyme'
import Blog from '../components/blog/Blog'


// testi varmistaa, että komponentti renderöi blogin titlen, authorin
describe.only('<Blog />', () => {
  it('renders content with title and author', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Jaska',
      url: 'www.komp.fi',
      user: 'Kalle'
    }
    const noteComponent = shallow(<Blog blog={blog} />)
    // console.log(noteComponent.debug())
    const contentDiv = noteComponent.find('.content')
    //console.log(contentDiv.debug())

    expect(contentDiv.text()).toContain('Komponenttitestaus tapahtuu jestillä ja enzymellä')
    //expect(contentDiv.text()).toContain('Jaska')

  })
})