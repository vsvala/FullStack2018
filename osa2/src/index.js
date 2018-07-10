import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'


  const filter= ''
  const showOne='true'

ReactDOM.render(
  <App filter={filter} showOne={showOne}  />,
  document.getElementById('root')
)
