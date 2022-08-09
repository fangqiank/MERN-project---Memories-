import { AUTH } from '../constants/actionTypes'
import * as api from '../api'

export const signIn = (formData, navigation) => async (dispatch) => {
  try {
    // console.log({ formData })
    const userInfo = await api.signIn(formData)
    dispatch({
      type: AUTH,
      payload: userInfo,
    })
    navigation('/')
  } catch (err) {
    console.log(err)
  }
}

export const signUp = (formData, navigation) => async (dispatch) => {
  try {
    const userInfo = await api.signUp(formData)
    dispatch({
      type: AUTH,
      payload: userInfo,
    })
    navigation('/')
  } catch (err) {
    console.log(err)
  }
}
