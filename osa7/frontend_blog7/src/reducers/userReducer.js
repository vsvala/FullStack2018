import userService from '../services/users'


const userReducer = (store = [''], action) => {
  console.log('ACTION:', action)

  switch (action.type) {

  case 'CREATE_USER':
    console.log(action.content)
    console.log(action.data)
    //return store.concat(action.content)
    return [...store,  action.data ]//{ content: action.content, id: getId(), votes:0 }]

  case 'INITIALIZE_USERS':
    return store = action.data //palauttaa taulukon

  default:
    return store
  }
}

//ACTION CREATORIT
export const createUser=(content) => {
  return async (dispatch)  => {
    const newUser = await userService.create(content)
    dispatch({
      type:'CREATE_USER',
      data:newUser
    })
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const content = await userService.getAll()
    console.log(content)
    dispatch({
      type: 'INITIALIZE_USERS',
      data:content
    })
  }
}



export default userReducer