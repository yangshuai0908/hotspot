import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    console.log('请求发送:', config)
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    console.log('响应接收:', response)
    return response.data
  },
  error => {
    // 对响应错误做点什么
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// API方法
export const apiService = {
  // GET请求
  get(url, params = {}) {
    return api.get(url, { params })
  },
  
  // POST请求
  post(url, data = {}) {
    return api.post(url, data)
  },
  
  // PUT请求
  put(url, data = {}) {
    return api.put(url, data)
  },
  
  // DELETE请求
  delete(url) {
    return api.delete(url)
  }
}

export default api