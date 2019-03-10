import React from 'react'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'


class App extends React.Component {
  //muistiinpanojen alustus initialize
  componentDidMount() {
    this.props.initializeAnecdotes() // funktio noteInitialization tulee komponentin App propsiksi this.props.noteInitialization
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <Filter  />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

export default connect(
  null,
  { initializeAnecdotes }
)(App)






// class App extends React.Component {
//   filterSelected = (value) => () => {
//     console.log(value)
//   }
//   render() {
//     //const anecdotes = this.props.store.getState().anecdotes
//     return (
//       //tuodaan moduulit
//       <div>
//         {/* <Notification /> */}
//         <Filter />
//         <AnecdoteList/>
//         <AnecdoteForm />

//       </div>//store={this.props.store}
//     )
//   }
// }

// export default App