import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
//import Notification from './components/Notification'
import Filter from './components/Filter'


class App extends React.Component {
  filterSelected = (value) => () => {
    console.log(value)
  }
  render() {
    //const anecdotes = this.props.store.getState().anecdotes
    return (
      //tuodaan moduulit
      <div>
        {/* <Notification /> */}
        <Filter />
        <AnecdoteList/>
        <AnecdoteForm />

      </div>//store={this.props.store}
    )
  }
}

export default App