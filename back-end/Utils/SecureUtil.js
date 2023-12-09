const crypto = require("crypto");

const algorithm = 'aes-256-cbc';

// Khai báo key và iv cố định 
let key = process.env.AES256_SECRET; 
// Chuyển thành buffer 16 bytes
let iv = Buffer.alloc(16, 0); 
iv.write(process.env.AES256_IV);

var encrypt = (text)=> {
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex');
  return encrypted;  
}

var decrypt = (encrypted) =>{
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8');
  return decrypted;
}
console.log(decrypt("U2FsdGVkX1+GOWgciuu7kb2XBoKynRnrRD5yLfNm9BE="));
console.log(decrypt("U2FsdGVkX18B3KxF9YTo076E4WDgJOwB3G+d7oTcz60="));
module.exports = { encrypt, decrypt };