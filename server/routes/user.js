import express from 'express'

const router = express.Router()

import { userSignIn, userSignUp } from '../controllers/userController.js'

router.post('/signin', userSignIn)
router.post('/signup', userSignUp)

export default router
