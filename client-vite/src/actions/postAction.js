import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  FETCH_BY_CREATOR,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  LIKE,
  COMMENT,
} from '../constants/actionTypes'

import * as api from '../api/index'

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const singlePost = await api.fetchPost(id)
    dispatch({ type: FETCH_POST, payload: singlePost })
    dispatch({ type: END_LOADING })
  } catch (err) {
    dispatch({ type: END_LOADING })
    console.log(err)
  }
}

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { currentPage, data, numberOfPages } = await api.fetchPosts(page)

    dispatch({
      type: FETCH_ALL,
      payload: { currentPage, data, numberOfPages },
    })
    dispatch({ type: END_LOADING })
  } catch (err) {
    dispatch({ type: END_LOADING })
    console.log(err)
  }
}

export const getPostBySearch = (searchItem) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const filteredPosts = await api.fetchPostBySearch(searchItem)

    dispatch({
      type: FETCH_BY_SEARCH,
      payload: filteredPosts.result,
    })
    dispatch({ type: END_LOADING })
  } catch (err) {
    dispatch({ type: END_LOADING })
    console.log(err)
  }
}

export const getPostByCreator = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const filteredPosts = await api.fetchPostByCreator(name)

    dispatch({
      type: FETCH_BY_CREATOR,
      payload: filteredPosts.result,
    })
    dispatch({ type: END_LOADING })
  } catch (err) {
    dispatch({ type: END_LOADING })
    console.log(err)
  }
}

export const createPost = (newPost, navigation) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const post = await api.createPost(newPost)

    dispatch({
      type: ADD_POST,
      payload: post,
    })
    dispatch({ type: END_LOADING })
    navigation(`/posts/${post._id}`)
  } catch (err) {
    console.log(err)
    dispatch({ type: END_LOADING })
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const updatedPost = await api.updatePost(id, post)

    dispatch({
      type: UPDATE_POST,
      payload: updatedPost,
    })
    dispatch({ type: END_LOADING })
  } catch (err) {
    console.log(err)
    dispatch({ type: END_LOADING })
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    if (window.confirm(`Are you sure you want to delete post #${id}?`)) {
      dispatch({ type: START_LOADING })
      await api.deletePost(id)
    }

    dispatch({
      type: DELETE_POST,
      payload: id,
    })
    dispatch({ type: END_LOADING })
  } catch (err) {
    console.log(err)
    dispatch({ type: END_LOADING })
  }
}

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'))

  try {
    dispatch({ type: START_LOADING })
    const likedPost = await api.likePost(id)

    dispatch({
      type: LIKE,
      payload: likedPost,
    })
    dispatch({ type: END_LOADING })
  } catch (err) {
    console.log(err)
    dispatch({ type: END_LOADING })
  }
}

export const commentPost = (id, comment) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING })
    const commentedPost = await api.commentPost(id, comment)

    dispatch({
      type: COMMENT,
      payload: commentedPost,
    })

    return commentedPost.comments
    // dispatch({ type: END_LOADING })
  } catch (err) {
    console.log(err)
    dispatch({ type: END_LOADING })
  }
}
