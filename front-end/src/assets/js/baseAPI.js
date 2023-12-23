import axios from 'axios';
import CryptoJS from 'crypto-js';
import VueCookies from 'vue-cookies';

let encryptedData;

export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  },
  responseType: 'json',
});

console.log('accessToken: ' + VueCookies.get('accessToken'));

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

  console.log('Encrypted:', encrypted);

  return encrypted;
}

HTTP.interceptors.request.use(config => {
  // Chuyển đổi params hoặc data thành chuỗi trước khi mã hóa
  if (config.params) {  
    const paramsString = JSON.stringify(config.params);
    encryptedData = encrypt(paramsString);
  }

  if (config.data) {
    const dataString = JSON.stringify(config.data);
    encryptedData = encrypt(dataString);
  }

  config.headers.Authorization = 'Bearer ' + VueCookies.get('accessToken');
  config.headers.EncryptData = encryptedData;

  return config;
});
