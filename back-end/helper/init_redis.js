// redis.js

 const redis = require('redis');

// Tạo một Redis client và kết nối
 const client = redis.createClient({
         host: "localhost",
         port: 6379
 });
 client.on('connect', () => {
     console.log('Client connected to Redis');
 });

 client.on('error', (err) => {
     console.error('Redis error:', err);
 });
client.connect();

 module.exports = client;