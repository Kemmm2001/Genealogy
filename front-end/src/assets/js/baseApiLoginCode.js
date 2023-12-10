import axios from 'axios';
import VueCookies from 'vue-cookies'

export const HTTPP = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  },
  responseType: "json",
})

console.log('accessTokenLoginCode: ' + VueCookies.get("accessTokenLoginCode"))

HTTPP.interceptors.request.use(config => {
  config.headers.Authorization = "Bearer " + VueCookies.get("accessTokenLoginCode");
  return config;
});