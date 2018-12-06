import React from 'react'
import { doteCreation } from '../reducers/anecdoteReducer'
import { notiCreation } from '../reducers/notificationReducer'


class AnecdoteForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.dote.value
    //dispatchataan  eli lähetetään actioni storelle
    this.props.store.dispatch(
      doteCreation(content), notiCreation()
    )

    event.target.dote.value = ''
  }
  render() {
    return (
    // Uuden muistiinpanon sisältö saadaan suoraan lomakkeen syötekentästä,
    //johon kentän nimeämisen ansiosta päästään käsiksi tapahtumaolion kautta event.target.note.value
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='dote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
