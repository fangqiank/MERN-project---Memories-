import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3500',
})

api.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }

  return req
})

export const fetchPosts = async () => {
  const res = await api.get('/posts')

  return res.data
}

export const createPost = async (newPost) => {
  const res = await api.post('/posts', newPost)

  return res.data
}

export const updatePost = async (id, updPost) => {
  const res = await api.patch(`/posts/${id}`, updPost)

  return res.data
}

export const deletePost = async (id) => {
  const res = await api.delete(`/posts/${id}`)

  console.log(res.data)
}

export const likePost = async (id) => {
  const res = await api.patch(`/posts/${id}/like`)

  return res.data
}

export const signIn = async (formData) => {
  const res = await api.post('/user/signin', formData)

  return res.data
}

export const signUp = async (formData) => {
  const res = await api.post('/user/signup', formData)

  return res.data
}
