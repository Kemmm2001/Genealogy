import axios from 'axios';
import VueCookies from 'vue-cookies';
import CryptoJS from 'crypto-js';

let encryptedData;

export const HTTPP = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  },
  responseType: "json",
})
function encrypt(message) {
  const encrypted = CryptoJS.AES.encrypt(
    message,
    process.env.VUE_APP_KEY_SECRET,
    {
      iv: process.env.VUE_APP_IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  ).toString();

  return encrypted;
}


console.log('accessTokenLoginCode: ' + VueCookies.get("accessTokenLoginCode"))

HTTPP.interceptors.request.use(config => {
  if (config.params) {
    const paramsString = JSON.stringify(config.params);
    encryptedData = encrypt(paramsString);
  }

  if (config.data) {
    const dataString = JSON.stringify(config.data);
    encryptedData = encrypt(dataString);
  }

  config.headers.Authorization = "Bearer " + VueCookies.get("accessTokenLoginCode");
  config.headers.EncryptData = encryptedData;
  return config;
});