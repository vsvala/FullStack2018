import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import App from './App';
//import reducer from './reducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'


const reducer = combineReducers({
  notifications: notificationReducer,
  anecdotes: anecdoteReducer,
  filter:filterReducer
})

const store = createStore(reducer)
console.log(store.getState())

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