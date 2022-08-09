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

export const fetchPosts = async (page) => {
  const res = await api.get(`/posts?page=${page}`)
  // console.log(res.data)
  return res.data
}

export const fetchPost = async (id) => {
  const res = await api.get(`/posts/${id}`)

  return res.data
}

export const fetchPostByCreator = async (creatorName) => {
  const res = await api.get(`/posts/creator?user=${creatorName}`)

  return res.data
}

export const fetchPostBySearch = async (searchItem) => {
  const res = await api.get(
    `/posts/search?searchQuery=${searchItem.search || 'none'}&tags=${
      searchItem.tags
    }`,
  )

  // console.log(res.data)
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

export const commentPost = async (id, comment) => {
  const res = await api.post(`/posts/${id}/commentPost`, { comment })

  return res.data
}

export const signIn = async (formData) => {
  const res = await api.post('/user/signin', formData)

  // console.log(res.data)

  return res.data
}

export const signUp = async (formData) => {
  const res = await api.post('/user/signup', formData)

  return res.data
}
