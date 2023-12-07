import axios from 'axios';
export const HTTP = axios.create({
  // baseURL: `https://giaphanguoiviet.com/api/v1`,
  baseURL: process.env.VUE_APP_BASEURL,
  // headers: {
  // },
  // baseURL: `https://giaphanguoiviet.com/api/v1`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  },
  responseType: "json",
})