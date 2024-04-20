import axios from "axios";

export const API_URL = 'http://localhost:5000/api'

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    const token = config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    console.log("tokenLocalStorage", token);
    return config;
});

export default api;

// api.interceptors.request.use((config) => {
//     let token = localStorage.getItem('token');

//     //console is showing token but didn't add in request header
//     console.log("tokenLocalStorage", token)

//     if (token) {
//         api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     }
//     return config;

// }, (error) => {
//     return Promise.reject(error);

// });

// export default api;


