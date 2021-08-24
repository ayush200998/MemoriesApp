import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const fetchPostDetail = (id) => API.get(`/posts/${id}`)
export const createPost = (post) => API.post('/posts', post)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

// Auth Related 

export const signin = (formData) => API.post('/users/signin', formData)
export const signup = (formData) => API.post('/users/signup', formData)

// https://memories-aps.herokuapp.com/posts