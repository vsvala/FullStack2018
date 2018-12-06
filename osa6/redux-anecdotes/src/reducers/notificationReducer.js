const initialState = [
  { content: 'New anecdote created ALKUTILA', important: false, id: 1 },
  { content: 'You voted anecdote ALKUTILA', important: false, id: 2 }
]
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTE_VOTE':
    console.log('tässäää vote')
    //return  this.state.concat(action.data.content)
    //return state.filter(n=>n.id===1)//
    return[...state, action.data.content]

  case action.type === 'NOTE_CREATE':
    // const id = action.data.id
    // const noteToChange = state.find(n => n.id === id)
    // const changedNote = { ...noteToChange, important: !noteToChange.important }
    // return state.map(note => note.id !== id ? note : changedNote )
    return this.state.concat(action.data)
  default:
    return state
  }
}
export const notiCreation=() => {
  console.log('Noticreation')
  return {
    type: 'NOTE_CREATE',
    data:{
      content: 'You create new anecdote;',
      important:true,
      id:1 }
  }
}


export const notiLikes=() => {
  console.log('NotiLikes')
  return {
    type: 'NOTE_VOTE',
    data:{
      content: 'You voted anecdote;,id:1',
      important:true,
      id:1  }
  }
}

export default notificationReducer