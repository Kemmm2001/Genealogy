// redis.js

const redis = require('redis');

// Tạo một Redis client và kết nối
const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
});

client.on('connect', () => {
    console.log('Client connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

module.exports = client;
