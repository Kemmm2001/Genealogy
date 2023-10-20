import axios from 'axios';

export const HTTP = axios.create({
  baseURL: './json/tinhhuyenxa.json',
  headers: {
  },
  responseType: "json",
})