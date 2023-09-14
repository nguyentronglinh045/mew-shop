import axios, { type AxiosInstance } from 'axios'
const apiKey = import.meta.env.VITE_API_KEY

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: apiKey,
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

const http = new Http().instance

export default http
