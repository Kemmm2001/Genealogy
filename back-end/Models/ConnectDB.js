const mysql = require('mysql2');
const Sequelize = require('sequelize');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'genealogy'
});

const sequelize = new Sequelize('genealogy', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
});

// Kết nối vào cơ sở dữ liệu
connection.connect(function (err) {
  if (err) {
    console.error('Lỗi kết nối:', err);
  } else {
    console.log('Kết nối thành công vào cơ sở dữ liệu MySQL');
  }
});


module.exports = { connection, sequelize };
