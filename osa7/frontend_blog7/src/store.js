import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import commentReducer from './reducers/commentReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'
import errorReducer from './reducers/errorReducer'
import notificationReducer from './reducers/notificationReducer'


const reducer = combineReducers({
  notification: notificationReducer,
  errors: errorReducer,
  blogs: blogReducer,
  users: userReducer,
  loggedUser: loginReducer,
  comments: commentReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store