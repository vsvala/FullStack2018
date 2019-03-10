import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'



const AnecdoteForm = (props) => {

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('createAnecdote')
    const content = event.target.anecdote.value
    const writer = event.target.author.value
    props.createAnecdote(content, writer) //&& notify(`anecdote ${content} created`, 5000)
    props.notify(`anecdote ${content} created`, 5)
    event.target.anecdote.value = ''
    event.target.author.value = ''
  }
  ////render() {
  return (
    // Uuden muistiinpanon sisältö saadaan suoraan lomakkeen syötekentästä,
    //johon kentän nimeämisen ansiosta päästään käsiksi tapahtumaolion kautta event.target.note.value
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name='anecdote'/></div>
        <div><input name='author'/></div>
        <button>create</button>
      </form>
    </div>
  )
}
//}

export default connect(
  null,
  { createAnecdote, notify }
)(AnecdoteForm)
