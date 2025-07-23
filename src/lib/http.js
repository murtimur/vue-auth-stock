import axios from 'axios'

const http = axios.create()

http.interceptors.request.use((config) => {
  return config
})

export default http
