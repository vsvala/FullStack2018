import React from 'react'
//import { doteCreation } from '../reducers/anecdoteReducer'
import { addLikes } from '../reducers/anecdoteReducer'
import { notiLikes } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


class AnecdoteList extends React.Component {
  render() {
    //const anecdotes =this.props.store.getState().anecdotes
    const anecdotes =this.props.anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
              //Store käyttää reduceria käsitelläkseen actioneja, jotka dispatchataan eli “lähetetään” storelle
                //this.props.store.dispatch(addLikes(anecdote.id), notiLikes()) }
                this.props.addLikes(anecdote.id) && notiLikes()}
              >

                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}
//Funktion connect ensimmäisenä parametrina voidaan määritellä funktio mapStateToProps, joka liittää joitakin storen
// tilan perusteella määriteltyjä asioita connectilla muodostetun yhdistetyn komponentin propseiksi
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification
  }
}
//props.importanceToggling:lla funktioon,
//jonka avulla storeen saadaan dispatchattua actioneja.
const mapDispatchToProps = {
  addLikes, notiLikes
}

const ConnectedDoteList = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList, Notification)

export default ConnectedDoteList
//export default AnecdoteList