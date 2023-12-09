const crypto = require("crypto");

const algorithm = 'aes-256-cbc';

// Khai báo key và iv cố định 
const key = '6368616e676520746869732070617373'; 
// Chuyển thành buffer 16 bytes
const iv = Buffer.alloc(16, 0); 
iv.write("74686973697373616d706c656976");

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex');
  return encrypted;  
}

function decrypt(encrypted) {
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8');
  return decrypted;
}
