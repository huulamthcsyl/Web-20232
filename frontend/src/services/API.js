import axios from 'axios'

// const API_BASE_URL = "https://web-20232.onrender.com"
const API_BASE_URL = "http://localhost:5000"

export function register(email, password) {
    return axios.post(`${API_BASE_URL}/register`, {
        email: email,
        password: password
    })
}

export function login(email, password) {
    return axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password
    })
}

export function getProfileByUserId(userId) {
    return axios.get(`${API_BASE_URL}/getProfile/${userId}`);
}

export function updateProfile(userId, profile){
    return axios.post(`${API_BASE_URL}/updateProfile/${userId}`, profile, { 'content-type': 'multipart/form-data' })
}

export function createPost(data) {
    return axios.post(`${API_BASE_URL}/createPost`, data)
}

export function getAllPost() {
    return axios.get(`${API_BASE_URL}/getAllPost`)
}

export function getPostById(id) {
    return axios.get(`${API_BASE_URL}/getPostByPostId/${id}`)
}

export function likePost(userId, postId) {
    return axios.post(`${API_BASE_URL}/likePost/${userId}/${postId}`)
}

export function removeLikePost(userId, postId) {
    return axios.post(`${API_BASE_URL}/removeLikePost/${userId}/${postId}`)
}

export function getAllUser() {
    return axios.get(`${API_BASE_URL}/getAllUser`)
}