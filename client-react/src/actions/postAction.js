import {
  FETCH_ALL,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE,
} from '../constants/actionTypes'

import * as api from '../api/index'

export const getPosts = () => async (dispatch) => {
  try {
    const posts = await api.fetchPosts()

    dispatch({
      type: FETCH_ALL,
      payload: posts,
    })
  } catch (err) {
    console.log(err)
  }
}

export const createPost = (newPost) => async (dispatch) => {
  try {
    const post = await api.createPost(newPost)

    dispatch({
      type: ADD_POST,
      payload: post,
    })
  } catch (err) {
    console.log(err)
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const updatedPost = await api.updatePost(id, post)

    dispatch({
      type: UPDATE_POST,
      payload: updatedPost,
    })
  } catch (err) {
    console.log(err)
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    if (window.confirm(`Are you sure you want to delete post #${id}?`))
      await api.deletePost(id)

    dispatch({
      type: DELETE_POST,
      payload: id,
    })
  } catch (err) {
    console.log(err)
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const likedPost = await api.likePost(id)

    dispatch({
      type: LIKE,
      payload: likedPost,
    })
  } catch (err) {
    console.log(err)
  }
}
