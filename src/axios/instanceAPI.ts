import axios from "axios"

const token = localStorage.getItem('token')
export const instanceAPI = axios.create({
  baseURL: 'https://dummyjson.com/docs/',
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  }
})
