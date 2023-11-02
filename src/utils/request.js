import axios from "axios";

const service = axios.create({
    withCredentials: true,
    timeout: 60 * 1000,
  })

service.interceptors.request.use(
  config => {
    
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

  export default service