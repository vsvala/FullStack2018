import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import App from './App';
//import reducer from './reducer'
import { combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
//import { createStore } from 'redux'

const reducer = combineReducers({
  notifications: notificationReducer,
  anecdotes: anecdoteReducer
})

const store = createStore(reducer)


const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)