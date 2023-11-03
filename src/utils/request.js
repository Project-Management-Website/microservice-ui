import router from "@/router";
import axios from "axios";

const service = axios.create({
    withCredentials: true,
    timeout: 60 * 1000,
  })

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