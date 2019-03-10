import blogReducer from '../reducers/blogReducer'
import deepFreeze from 'deep-freeze'

describe('blogReducer', () => {
  const blogObject = {
    title: 'Uusi blogikirjoitus',
    author: 'Kalle',
    url: 'www.metso.fi',
    user: 'test',
    id: 100
  }
  it('returns new state with action NEW_NOTE', () => {
    const store = []
    const action = {
      type: 'CREATE',
      data: {
        blogObject
      }
    }

    deepFreeze(store)
    const newState = blogReducer(store, action)

    expect(newState.length).toBe(1)
    expect(newState).toContainEqual(action.data)
  })
})
