// src/services/api.js
import axios from 'axios';


//const API_BASE_URL = 'http://localhost:5199/';
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://memorydevelopingsitefinalversion.onrender.com'  // В production используем относительный путь (прокси через nginx)
  : 'https://memorydevelopingsitefinalversion.onrender.com';  // В development


const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Если используете куки для аутентификации
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  (config)=>{
    const token = JSON.parse(localStorage.getItem("user"));

    if(token){
      config.headers.Authorization = `Bearer ${token.jwstoken}`;
    }
    return config;
  },
  (error)=>{
    console.error(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response?.status === 401){
            // localStorage.removeItem('user');
            // localStorage.removeItem('jwstoken');
            // window.location.href = '';

        }
        console.log(error);
        return Promise.reject(error);
    }
    
);
export default api;