import axios from "axios"

// link back-end: 'localhost::3000'

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    },
})

export default axiosClient;