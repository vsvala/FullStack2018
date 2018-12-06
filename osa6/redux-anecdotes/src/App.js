import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

class App extends React.Component {
  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      //tuodaan moduulit
      <div>
        <Notification store={this.props.store} />
        <AnecdoteList store={this.props.store} /> 
        <AnecdoteForm store={this.props.store} />
      </div>
    )
  }
}

export default App