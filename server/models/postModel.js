import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: String,
  message: String,
  user: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

var Post = mongoose.model('Post', postSchema)

export default Post
