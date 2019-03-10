import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
//import Filter from './Filter'


const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.notify(`anecdote ${anecdote.content} voted`,5)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {props.anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
          kirjoittaja:{anecdote.author}
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  const anecdotesToShow = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
  return {
    anecdotesToShow
  }
}
export default connect(mapStateToProps, { voteAnecdote, notify } )(AnecdoteList)
