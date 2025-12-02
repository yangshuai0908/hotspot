import axios from 'axios'
import { showSuccessToast } from './toast.js'

// 创建axios实例
const api = axios.create({
  baseURL: '/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
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
    if (response.status == 200) {
      // 弹窗提醒
      showSuccessToast(response.data.msg)
    }
    console.log('响应接收:', response)
    return response.data
  },
  error => {
    // 对响应错误做点什么
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)



export default api