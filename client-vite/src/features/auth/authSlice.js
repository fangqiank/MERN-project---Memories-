import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../api/index'

const authData = localStorage.getItem('profile')
  ? JSON.parse(localStorage.getItem('profile'))
  : null

const initialState = {
  authData: authData ? authData : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
}

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (formDataAndRedirect, thunkApi) => {
    try {
      const { formData, redirect } = formDataAndRedirect
      const userInfo = await api.signIn(formData)
      redirect('/')
      return userInfo
    } catch (err) {
      const message =
        (err.res && err.res.data && err.res.data.message) ||
        err.message ||
        err.toString()

      return thunkApi.rejectWithValue(message)
    }
  },
)

export const signUp = createAsyncThunk(
  'auth/register',
  async (formDataAndRedirect, thunkApi) => {
    try {
      const { formData, redirect } = formDataAndRedirect
      const userInfo = await api.signUp(formData)
      redirect('/')
      return userInfo
    } catch (err) {
      const message =
        (err.res && err.res.data && err.res.data.message) ||
        err.message ||
        err.toString()

      return thunkApi.rejectWithValue(message)
    }
  },
)

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('profile')
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signUp.fulfilled, (state, action) => {
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
        state.authData = action.payload
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.authData = null
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signIn.fulfilled, (state, action) => {
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
        state.authData = action.payload
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.authData = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.authData = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
