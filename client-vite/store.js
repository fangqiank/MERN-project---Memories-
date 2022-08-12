import { configureStore } from '@reduxjs/toolkit'
import { postReducer } from '../slice'
import { authReducer } from '../../reducers/authReducer'

export const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
  },
})
