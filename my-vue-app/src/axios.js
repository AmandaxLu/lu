import axios from 'axios';
import { debugLog } from './utils/debug';

const request = axios.create({
  baseURL: 'https://localhost:5001/api', // 確保這裡的 URL 正確
  timeout: 5000
});

// 請求攔截器
request.interceptors.request.use(
  config => {
    // 在發送請求之前做些什麼
    return config
  },
  error => {
    // 對請求錯誤做些什麼
    console.error('請求錯誤:', error)
    return Promise.reject(error)
  }
);

// 響應攔截器
request.interceptors.response.use(
  response => {
    debugLog('Axios 響應:', response)
    return response.data
  },
  error => {
    console.error('Axios 錯誤:', error)
    return Promise.reject(error)
  }
);

export default request;