import router from "@/router";
import axios from "axios";
import { getToken } from "./auth";

const service = axios.create({
    withCredentials: false,
    timeout: 60 * 1000,
})

service.interceptors.request.use(
  config => {
    config.headers['jwt-Token'] = getToken()
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response.status === 401) {
      router.push({ name: 'Login' })
    } else {
      return Promise.reject(error)
    }
  }
)

export default service