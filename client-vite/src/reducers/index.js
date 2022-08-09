import { combineReducers } from 'redux'
import { postReducer } from './postReducer'
import { authReducer } from './authReducer'

const reducers = combineReducers({
  posts: postReducer,
  auth: authReducer,
})

export default reducers
