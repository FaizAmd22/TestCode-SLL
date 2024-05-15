import axios from 'axios';

const token = sessionStorage.getItem("token")

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL
})

export const ApiPost = axios.create({
  baseURL: 'https://test.api.sahabatlautlestari.com',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-type': 'application/json'
  }
})

export default Api;