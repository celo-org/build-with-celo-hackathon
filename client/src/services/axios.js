import axios from 'axios'
import { userToken } from './localStorage'

export const baseUrl = process.env.NODE_ENV === 'production'
  ? "https://culture-celo.herokuapp.com"
  : "http://localhost:5000"

const API = axios.create({ baseURL: baseUrl })

API.interceptors.request.use(req => {
    if (userToken) {
      req.headers.Authorization = `Bearer ${userToken}`
    }
    return req
})

export default API