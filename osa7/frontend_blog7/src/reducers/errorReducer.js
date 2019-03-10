const errorReducer = (state = '', action) => {
  switch (action.type) {
  case 'ERROR':
    return action.message
  case 'CLEAR':
    return ''
  default:
    return state
  }
}

export const error = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'ERROR',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR',
      })
    }, time*1000)
  }
}


export default  errorReducer