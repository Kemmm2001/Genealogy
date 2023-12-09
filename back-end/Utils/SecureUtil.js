const CryptoJS = require("crypto-js");
const decrypt = (data) =>{
  const bytes = CryptoJS.AES.decrypt(data, process.env.AES256_SECRET, {
    iv: process.env.AES256_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7  
  });
  return bytes.toString(CryptoJS.enc.Utf8);

} 

const encrypt = (data) =>{
  const ciphertext = CryptoJS.AES.encrypt(data, process.env.AES256_SECRET, {
    iv: process.env.AES256_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7  
  });
  return ciphertext.toString();
}
  
module.exports = { encrypt, decrypt };