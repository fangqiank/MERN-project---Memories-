import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../../api/index'

const initialState = {
  posts: [],
  post: {},
  numberOfPages: 0,
  currentPage: 1,
  isError: false,
  isLoading: false,
  isSuccess: false,
  messsage: '',
}

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (page, thunkApi) => {
    try {
      return await api.fetchPosts(page)
    } catch (err) {
      const message =
        (err.res && err.res.data && err.res.data.message) ||
        err.message ||
        err.toString()

      return thunkApi.rejectWithValue(message)
    }
  },
)

export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (id, thunkApi) => {
    try {
      return await api.fetchPost(id)
    } catch (err) {
      const message =
        (err.res && err.res.data && err.res.data.message) ||
        err.message ||
        err.toString()

      return thunkApi.rejectWithValue(message)
    }
  },
)

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (newPost, thunkApi) => {
    try {
      return await api.createPost(newPost)
    } catch (err) {
      const message =
        (err.res && err.res.data && err.res.data.message) ||
        err.message ||
        err.toString()

      return thunkApi.rejectWithValue(message)
    }
  },
)

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (updInfo, thunkApi) => {
    try {
      const { id, updPost } = updInfo
      return await api.updatePost(id, updPost)
    } catch (err) {
      const message =
        (err.res && err.res.data && err.res.data.message) ||
        err.message ||
        err.toString()

      return thunkApi.rejectWithValue(message)
    }
  },
)

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, thunkApi) => {
    try {
      if (window.confirm(`Are you sure you want to delete post #${id}?`))
        return await api.deletePost(id)
    } catch (err) {
      const message =
        (err.res && err.res.data && err.res.data.message) ||
        err.message ||
        err.toString()

      return thunkApi.rejectWithValue(message)
    }
  },
)

export const fetchByCreator = createAsyncThunk(
  'posts/fetchByCreator',
  async (creatorName, thunkApi) => {
    try {
      return await api.fetchPostByCreator(creatorName)
    } catch (err) {
      const message =
        (err.res && err.res.data && err.res.data.message) ||
        err.message ||
        err.toString()

      return thunkApi.rejectWithValue(message)
    }
  },
)

export const fetchBySearch = createAsyncThunk(
  'posts/fetchBySearch',
  async (searchItem, thunkApi) => {
    try {
      return await api.fetchPostBySearch(searchItem)
    } catch (err) {
      const message =
        (err.res && err.res.data && err.res.data.message) ||
        err.message ||
        err.toString()

      return thunkApi.rejectWithValue(message)
    }
  },
)

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (id, thunkApi) => {
    try {
      return await api.likePost(id)
    } catch (err) {
      const message =
        (err.res && err.res.data && err.res.data.message) ||
        err.message ||
        err.toString()

      return thunkApi.rejectWithValue(message)
    }
  },
)

export const commentPost = createAsyncThunk(
  'posts/commentPost',
  async (id, comment, thunkApi) => {
    try {
      return await api.commentPost(id, comment)
    } catch (err) {
      const message =
        (err.res && err.res.data && err.res.data.message) ||
        err.message ||
        err.toString()

      return thunkApi.rejectWithValue(message)
    }
  },
)

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.data
        state.numberOfPages = action.payload.numberOfPages
        state.currentPage = action.payload.currentPage
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.messsage = action.payload
      })
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.post = action.payload
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.messsage = action.payload
      })
      .addCase(fetchBySearch.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBySearch.fulfilled, (state, action) => {
        state.posts = action.payload.result
        console.log(state.posts)
        state.numberOfPages = action.payload.numberOfPages
        state.currentPage = action.payload.currentPage
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(fetchBySearch.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.messsage = action.payload
      })
      .addCase(fetchByCreator.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchByCreator.fulfilled, (state, action) => {
        state.posts = action.payload.result
        state.numberOfPages = action.payload.numberOfPages
        state.currentPage = action.payload.currentPage
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(fetchByCreator.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.messsage = action.payload
      })
      .addCase(createPost.fulfilled, (state, action) => {
        // console.log('new post id: ', action.payload._id)
        state.isLoading = false
        state.isSuccess = true
        state.posts = [...state.posts, action.payload]
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.messsage = action.payload
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        console.log(action.payload)
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post,
        )
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.messsage = action.payload
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        console.log(action.payload)
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.id,
        )
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post,
        )
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = state.posts.map((post) =>
          post._id === +action.payload._id ? action.payload : post,
        )
      })
  },
})

export const { reset } = postSlice.actions
export default postSlice.reducer
