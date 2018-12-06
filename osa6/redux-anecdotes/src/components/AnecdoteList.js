import React from 'react'
//import { doteCreation } from '../reducers/anecdoteReducer'
import { addLikes } from '../reducers/anecdoteReducer'
import { notiLikes } from '../reducers/notificationReducer'


class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.store.getState().anecdotes
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
                this.props.store.dispatch(addLikes(anecdote.id), notiLikes()) }
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

export default AnecdoteList
