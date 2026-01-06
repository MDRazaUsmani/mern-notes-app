import axios from "axios"

//import.meta.env.MODE is used in Vite to get the environment variable
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api" //dynamic base url for production
const api = axios.create({
    baseURL: BASE_URL
})

export default api;