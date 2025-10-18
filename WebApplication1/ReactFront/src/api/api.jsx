// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5199/';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Если используете куки для аутентификации
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response?.status === 401){
            localStorage.removeItem('user');
            window.location.href = '';

        }
        return Promise.reject(error);
    }
    
);
export default api;