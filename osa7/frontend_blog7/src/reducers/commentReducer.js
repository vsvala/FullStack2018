import blogService from '../services/blogs'

const commentReducer = (store = [], action) => {
  console.log('ACTION:', action)

  switch (action.type) {

  case 'CREATE_COMMENT':
    console.log(action.data)
    return [...store,  action.data ]

  // case 'FILTER_COMMENTS':
  //   return{
  //     ...store,
  //     comments: store.comments.filter(c => c.blogId === action.data.id)
  //   }
  case 'INITIALIZE_COMMENT':
    return store = action.data //palauttaa taulukon

  default:
    return store
  }
}

//get all comments from database
export const initializeComments = (id) => {
  return async (dispatch) => {
    const content = await blogService.getAllComments(id)
    //console.log(content,'blogserviceltäRDUCERIcontent')
    dispatch({
      type: 'INITIALIZE_COMMENT',
      data:content
    })
  }
}
// export const filterComments = (id) => {
//   return async (dispatch) => {
//     const content = await blogService.getComments(id)
//     console.log(content,'blogserviceltäRDUCERIcontent')
//     dispatch({
//       type: 'FILTER_COMMENTS',
//       data:content
//     })
//   }
// }

//tells blogservice to create comment
export const createComment=(content) => {
  return async (dispatch)  => {
    console.log('createCommenACTION',content)
    const newcomment = await blogService.createComment(content)
    console.log(newcomment,'uuuskommenti')
    dispatch({
      type:'CREATE_COMMENT',
      data:newcomment
    })
  }
}
export default commentReducer