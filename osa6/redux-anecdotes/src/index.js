import React from 'react'
import ReactDOM from 'react-dom'
//import { createStore, combineReducers } from 'redux'
import App from './App'
//import reducer from './reducer'
import notificationReducer from './reducers/notificationReducer'
//import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
import anecdoteReducer, { noteInitialization } from './reducers/anecdoteReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteService from './services/anecdotes'

const reducer = combineReducers({
  notifications: notificationReducer,
  anecdotes: anecdoteReducer,
  filter:filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
//const store = createStore(reducer)

anecdoteService.getAll().then(anecdotes =>

  store.dispatch(noteInitialization(anecdotes)
  )
)
// const render = () => {
//   ReactDOM.render(
//     <App store={store} />,
//     document.getElementById('root')
//   )
// }
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))


// render()
// store.subscribe(render)