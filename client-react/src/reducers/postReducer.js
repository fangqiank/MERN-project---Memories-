import {
  FETCH_ALL,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE,
} from '../constants/actionTypes'

const initialState = {
  posts: [],
}

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return { ...state, posts: action.payload }

    case ADD_POST:
      return { ...state, posts: [...state.posts, action.payload] }

    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post,
        ),
      }

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      }

    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post,
        ),
      }

    default:
      return state
  }
}
