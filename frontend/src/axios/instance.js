import axios from 'axios'


const config = {baseURL: 'http://localhost:8000/api/'}
const axiosInstance = axios.create(config)

export default axiosInstance