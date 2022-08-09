import express from 'express'
import {} from 'dotenv/config'
import path from 'path'
import cors from 'cors'
import mongoose from 'mongoose'
import { fileURLToPath } from 'url'

import connectDB from './config/dbConn.js'
import corsOptions from './config/corsOptions.js'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'
import { logger } from './middleware/logEvents.js'
import { errorHandler } from './middleware/errorHandle.js'

const PORT = process.env.PORT || 3500

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(logger)

app.use('/', express.static(path.join(__dirname, 'public')))

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))

app.use(express.json()) //replace the body parser

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

app.use(errorHandler)

connectDB()

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
