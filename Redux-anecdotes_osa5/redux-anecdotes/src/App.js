import React from 'react';


class App extends React.Component {
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
             {/* // <button onClick={this.klik('VOTE')}>vote</button> */}
            
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div><input />
          </div>
          <button onClick={e=>this.props.store.dispatch({type: 'NEW_NOTE', data: { content: 'sovelluksen tila talletetaan storeen',important: true, id: 1}})}>create</button> 
        </form>
      </div>
    )
  }
}

export default App