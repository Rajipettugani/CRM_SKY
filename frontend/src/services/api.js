import axios from 'axios'
import { getToken, clearToken } from '../utils/auth'

const api = axios.create({
  baseURL: 'http://localhost:8000/api'
})

api.interceptors.request.use(cfg => {
  const t = getToken()
  if(t) cfg.headers.Authorization = `Bearer ${t}`
  return cfg
})

api.interceptors.response.use(
  res => res,
  err => {
    if(err.response && err.response.status === 401){
      clearToken()
<<<<<<< HEAD
      window.location.href = '/login'
=======
      window.location.href = '/login/select'
>>>>>>> 7014ba474bf99e218ee2c5a6a32fd6a5cc923b0e
    }
    return Promise.reject(err)
  }
)

export default api
