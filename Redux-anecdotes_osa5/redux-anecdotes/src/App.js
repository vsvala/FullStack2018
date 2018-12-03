import React from 'react';

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

class App extends React.Component {

  addDote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.store.dispatch({
      type: 'NEW_NOTE',
      data: {
        content: content,
        id: generateId(),
        votes: 0 
      }
    })
    event.target.anecdote.value = ''
  }


  render() {
    const anecdotes = this.props.store.getState()  
    //määritetään eniten ääniä saaneen anekdootin indeksi 
    //var max= Math.max(...(anecdotes.votes))  
    //console.log(max.content)
    //anecdotes=max.sort()
    return (
      <div>
        <h2>Anecdotes</h2>
  
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={e => this.props.store.dispatch({ type: 'VOTE', anecdote })}>vote</button>            
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addDote}>
          <div><input name="anecdote" />
          </div>
          <button type="submit">lisää</button>
        </form>
      </div>
    )
  }
}

export default App