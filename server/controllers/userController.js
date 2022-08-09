import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UserModel from '../models/userModel.js'

const secret = process.env.JWT_SECRET

export const userSignIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const existedUser = await UserModel.findOne({ email })

    if (!existedUser) {
      return res.status(400).json({
        message: 'User not found',
      })
    }

    const isPasswordValid = await bcrypt.compare(password, existedUser.password)

    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Invalid credentials',
      })
    }

    const token = jwt.sign(
      {
        email: existedUser.email,
        id: existedUser._id,
      },
      secret,
      { expiresIn: '1h' },
    )

    res.status(200).json({ result: existedUser, token })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({
      message: 'something went wrong while signing in',
    })
  }
}

export const userSignUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body

  try {
    const existedUser = await UserModel.findOne({ email })

    if (existedUser) {
      return res.status(400).json({
        message: 'User already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new UserModel({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    })

    await newUser.save()

    const token = jwt.sign(
      {
        email: newUser.email,
        id: newUser._id,
      },
      secret,
      { expiresIn: '1h' },
    )

    res.status(200).json({ result: newUser, token })
  } catch (err) {
    res.status(500).json({
      message: 'something went wrong while signing up',
    })

    console.log(err.message)
  }
}
