import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `http://localhost:3003/api/v1`,
  headers: {
  },
  responseType: "json",
})