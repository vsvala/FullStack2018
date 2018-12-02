import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
    it('returns new state with action NEW_NOTE', () => {
      const state = []
      const action = {
        type: 'NEW_NOTE',
        data: {
          content: 'sovelluksen tila talletetaan storeen',
          important: true,
          id: 1
        }
      }
  
      deepFreeze(state)
      const newState = noteReducer(state, action)
  
      expect(newState.length).toBe(1)
      expect(newState).toContainEqual(action.data)
    })
  })