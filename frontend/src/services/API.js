import axios from 'axios'

const API_BASE_URL = process.env.NODE_ENV === 'production' ? "https://web-20232.onrender.com" : "http://localhost:5000";

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

export function removeLikePost(userId, postId) {
    return axios.post(`${API_BASE_URL}/removeLikePost/${userId}/${postId}`)
}

export function getCommentByPostId(postId) {
    return axios.get(`${API_BASE_URL}/getCommentByPostId/${postId}`)
}

export function getAllConversationByUserId(userId) {
    return axios.get(`${API_BASE_URL}/getAllConversationByUserId/${userId}`)
}

export function getConversationMessages(userId, friendId) {
    return axios.get(`${API_BASE_URL}/getConversationMessages/${userId}/${friendId}`)
}

export function markConversationAsRead(data) {
    return axios.post(`${API_BASE_URL}/markConversationAsRead`, data)
}

export function getAllUser() {
    return axios.get(`${API_BASE_URL}/getAllUser`)
}

export function getNotificationByUserId(userId) {
    return axios.get(`${API_BASE_URL}/getNotificationByUserId/${userId}`)
}