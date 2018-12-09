const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000*Math.random()).toFixed(0)

// Koko sovelluksen tila talletetaan yhteen storen tallettamaan Javascript-objektiin.
//talletettaan “eri asiat” storessa olevaan olioon erillisinä kenttinä.
const asObject = (anecdote) => {
  return {
    content: anecdote,
    important: false,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
//

//REDUCER on funktio  joka saa parametriksi alkutilan, actionin=tilanmuuttajan ja palauttaa uudentilan
//const anecdoteReducer = (store = initialState, action) => {
const anecdoteReducer = (store = [], action) => {
  console.log('ACTION:', action)

  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.data.id)
    const voted = store.find(a => a.id === action.data.id)

    return [...old, { ...voted, votes: voted.votes + 1 } ]
  }
  if (action.type === 'CREATE') {
    return [...store,  action.data ]//{ content: action.content, id: getId(), votes:0 }]
  }
  if (action.type === 'INIT_NOTES'){
    return action.data}

  if(action.type==='TOGGLE_IMPORTANCE') {
    const id = action.data.id
    const noteToChange = store.find(n => n.id === id)
    const changedNote = { ...noteToChange, important: !noteToChange.important }
    return store.map(note => note.id !== id ? note : changedNote )
  }
  return store
}
export const doteCreation=(content) => {
  return {
    type: 'CREATE',
    data: {
      content,
      important: true,
      id: getId(),
      votes:0
    }
  }
}

export const addLikes=(id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const importanceToggling = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export const noteInitialization = (data) => {
  return {
    type: 'INIT_NOTES',
    data
  }
}

export default anecdoteReducer