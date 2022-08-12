import express from 'express'
import mongoose from 'mongoose'

import Post from '../models/postModel.js'

const router = express.Router()

export const getPosts = async (req, res) => {
  const { page } = req.query

  try {
    const LIMIT = 8
    const startInd = (Number(page) - 1) * LIMIT

    const total = await Post.countDocuments({})

    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startInd)

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const getPost = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findById(id)
    res.status(200).json(post)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query

  try {
    const title = new RegExp(searchQuery, 'i')

    const posts = await Post.find({
      $or: [
        { title: { $regex: new RegExp(title, 'i') } },
        { tags: { $in: tags.split(',') } },
      ],
    })

    res.status(200).json({ result: posts })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const getPostsByCreator = async (req, res) => {
  const { user } = req.query

  try {
    const posts = await Post.find({ name: user })

    res.status(200).json({ result: posts })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const createPost = async (req, res) => {
  const { title, message, selectedFile, tags, user } = req.body

  const newPost = new Post({
    title,
    message,
    user,
    selectedFile,
    creator: req.userId,
    createdAt: new Date().toISOString(),
    tags,
  })

  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (err) {
    res.status(409).json({ message: err.message })
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params

  const { title, message, user, selectedFile, creator, tags } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id ${id}`)
  }

  const updPost = { title, message, user, selectedFile, creator, tags, _id: id }

  await Post.findByIdAndUpdate(id, updPost, { new: true })

  res.status(200).json(updPost)
}

export const deletePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id ${id}`)
  }

  await Post.findByIdAndRemove(id)

  res.status(200).json({ id, message: 'Post deleted successfully' })
}

export const likePost = async (req, res) => {
  const { id } = req.params

  if (!req.userId)
    return res
      .status(401)
      .json({ message: 'You must be logged in to like a post' })

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id ${id}`)
  }

  const post = await Post.findById(id)

  const idx = post.likes.findIndex((id) => id === String(req.userId))

  idx === -1
    ? post.likes.push(String(req.userId))
    : post.likes.filter((id) => id !== String(req.userId))

  const updPost = await Post.findByIdAndUpdate(id, post, { new: true })

  res.status(200).json(updPost)
}

export const commentPost = async (req, res) => {
  const { id } = req.params

  const { comment } = req.body

  const post = await Post.findById(id)

  post.comments.push(comment)

  const updPost = await Post.findByIdAndUpdate(id, post, { new: true })

  res.status(200).json(updPost)
}
