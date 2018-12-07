const initialState = [
  { content: 'New anecdote created ALKUTILASSA', important: false, id: 1 },
  { content: 'You voted anecdote ALKUTILA', important: true, id: 2 }
]


const notificationReducer = (state = initialState, action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
  case 'VOTE_NOTIFICATION':
    console.log('tässäää vote')
    //return  this.state.concat(action.data.content)
    //return state.filter(n=>n.id===1)//
    return[...state, action.data.content] //content

  case action.type === 'NOTIFICATION_CREATE':
    // const id = action.data.id
    // const noteToChange = state.find(n => n.id === id)
    // const changedNote = { ...noteToChange, important: !noteToChange.important }
    // return state.map(note => note.id !== id ? note : changedNote )
    return[...state, action.data]
    //return this.state.concat(action.data)
  default:
    return state
  }
}
export const notiCreation=() => {
  console.log('Noticreation')
  return {
    type: 'NOTIFICATION_CREATE',
    data:{
      content: 'You create new anecdote;',
      important:true,
      id:1 }
  }
}


export const notiLikes=() => {
  console.log('NotiLikes')
  return {
    type:'VOTE_NOTIFICATION',
    data:{
      content:'You voted anecdote',
      important:true,
      id:1 }

  }
}


export default notificationReducer