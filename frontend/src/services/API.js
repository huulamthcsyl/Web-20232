import axios from 'axios'

const API_BASE_URL = "http://localhost:5000"

export function register(email, password) {
    return axios.post(`${API_BASE_URL}/register`, {
        email: email,
        password: password
    })
}