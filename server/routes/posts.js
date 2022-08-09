import express from 'express'
import { verifyJWT } from '../middleware/verifyJWT.js'

import {
  getPosts,
  getPost,
  getPostsByCreator,
  getPostsBySearch,
  createPost,
  updatePost,
  likePost,
  deletePost,
  commentPost,
} from '../controllers/postController.js'

const router = express.Router()

router.get('/creator', getPostsByCreator)
router.get('/search', getPostsBySearch)
router.get('/', getPosts)
router.get('/:id', getPost)

router.post('/', verifyJWT, createPost)
router.patch('/:id', verifyJWT, updatePost)
router.delete('/:id', verifyJWT, deletePost)
router.patch('/:id/likePost', verifyJWT, likePost)
router.post('/:id/commentPost', commentPost)

export default router
