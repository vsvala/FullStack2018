import React from 'react'
//import { doteCreation } from '../reducers/anecdoteReducer'
//import { addLikes } from '../reducers/anecdoteReducer'
//import { notiLikes } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
//import { importanceToggling } from './../reducers/anecdoteReducer'
//import Filter from './Filter'


class AnecdoteList extends React.Component {
vote = (anecdote) => {
  this.props.voteAnecdote(anecdote)
  this.props.notify(`anecdote ${anecdote.content} voted`,5000)
  // setTimeout(() => {
  //   this.props.clearNotification()
  // }, 10000)
}
render() {
  return (
    <div>
      <h2>Anecdotes</h2>
      {this.props.anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
              has {anecdote.votes}
            <button onClick={() => this.vote(anecdote)}>
                vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
}
const mapStateToProps = (state) => {
  const anecdotesToShow = state.anecdotes
  //.filter(a => a.content.toLowerCase().includes(state.filter)) //console.log(state.anecdotes,'SSSSSSSSSSSSSS')
  return {
    anecdotesToShow
  }
}

export default connect(mapStateToProps, { voteAnecdote, notify  } )(AnecdoteList)



{/* <ul>
      {props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
      // {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div> has {anecdote.votes} </div>
          <div>
            <div handleClick={() => this.props.importanceToggling(anecdote.id)} >  </div>
            <button onClick={() => {
              //Store käyttää reduceria käsitelläkseen actioneja, jotka dispatchataan eli “lähetetään” storelle
              //this.props.store.dispatch(addLikes(anecdote.id), notiLikes()) }
              this.props.addLikes(anecdote.id)
              notiLikes()
            }} >vote</button>
          </div>
        </div>
      )}
    </ul>
  </div>
)

const anecdotesToShow = (anecdotes, filter) => {
  if (filter === 'ALL') {
    return anecdotes
  }

  return filter === 'IMPORTANT'
    ? anecdotes.filter(anecdote => anecdote.important)
    : anecdotes.filter(anecdote => !anecdote.important)
}
//const anecdotes =this.props.store.getState().anecdotes
// const anecdotes =this.props.anecdotes
//     return (
//       <div>
//         <h2>Anecdotes</h2>
//         <ul>
//           {anecdotesToShow().sort((a, b) => b.votes - a.votes).map(anecdote =>
//           // {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
//             <div key={anecdote.id}>
//               <div>
//                 {anecdote.content}
//               </div>
//               <div>
//               has {anecdote.votes}
//               handleClick={() => this.props.importanceToggling(anecdote.id)}
//                 <button onClick={() => {
//                   //Store käyttää reduceria käsitelläkseen actioneja, jotka dispatchataan eli “lähetetään” storelle
//                 //this.props.store.dispatch(addLikes(anecdote.id), notiLikes()) }
//                   this.props.addLikes(anecdote.id)
//                   notiLikes()
//                 }} >vote</button>
//               </div>
//             </div>
//           )}
//         </ul>
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
//     // anecdotes: state.anecdotes,
//     // notifications: state.notifications
//   }
// }

// export default connect(
//   mapStateToProps,
//   { importanceToggling },
// )(AnecdoteList)



//Funktion connect ensimmäisenä parametrina voidaan määritellä funktio mapStateToProps, joka liittää joitakin storen
// tilan perusteella määriteltyjä asioita connectilla muodostetun yhdistetyn komponentin propseiksi
const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)

    //anecdotes: state.anecdotes,
    //notification: state.notification
  }
}
const mapDispatchToProps = {
  importanceToggling,
  addLikes,
  notiLikes

}


//const ConnectedDoteList = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList, Notification)

const ConnectedDoteList = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)

export default ConnectedDoteList
//export default AnecdoteList */}