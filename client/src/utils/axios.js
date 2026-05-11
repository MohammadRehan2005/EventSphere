import axios from 'axios'

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

// automatically attach token to every request
API.interceptors.request.use((req) => {
    let token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
})

// automatically handle expired token
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
)

export default API;