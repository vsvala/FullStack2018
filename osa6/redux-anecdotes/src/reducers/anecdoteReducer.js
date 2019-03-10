
//haetaan anecdootit json serveriltä
import anecdotes from '../services/anecdotes'
import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  console.log('ACTION:', action)

  if (action.type==='VOTE') {

    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 } ]
  }
  if (action.type === 'CREATE') {
    console.log(action.data, 'createsta')
    return [...store,  action.data ]   //action.data...ei action.content
  }
  if (action.type === 'INIT_NOTES'){
    return store = action.data //palauttaa taulukon
  }
  return store
}

export const createAnecdote=(content,author) => {
  return async (dispatch)  => {
    const anecdote = await anecdoteService.create(content,author)
    dispatch({
      type:'CREATE',
      data:anecdote,
     // writer:author

    })
  }
}

export const voteAnecdote = (anecdote) => {
  const voted = { ...anecdote, votes: anecdote.votes + 1 }
  return async (dispatch) => {
    await anecdotes.update(anecdote.id, voted)
    dispatch({
      type: 'VOTE',
      id: anecdote.id
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    console.log(anecdotes)
    dispatch({
      type: 'INIT_NOTES',
      data:anecdotes
    })
  }
}
export default anecdoteReducer