import { LOGOUT, AUTH } from '../constants/actionTypes'

const initialState = {
  authData: null,
  loading: false,
  error: null,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
      // console.log('setItem done')

      return {
        ...state,
        authData: action.payload,
        loading: false,
        errors: null,
      }
    case LOGOUT:
      localStorage.clear()

      return {
        ...state,
        authData: null,
        loading: false,
        error: null,
      }
    default:
      return state
  }
}
