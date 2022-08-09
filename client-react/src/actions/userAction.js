import { AUTH } from '../constants/actionTypes'
import * as api from '../api'

export const signIn = (formData) => async (dispatch) => {
  try {
    const userInfo = await api.signIn(formData)

    // localStorage.setItem('profile', JSON.stringify(userInfo))

    dispatch({
      type: AUTH,
      payload: userInfo,
    })
  } catch (err) {
    console.log(err)
  }
}

export const signUp = (formData) => async (dispatch) => {
  try {
    const userInfo = await api.signUp(formData)

    dispatch({
      type: AUTH,
      payload: userInfo,
    })
  } catch (err) {
    console.log(err)
  }
}
