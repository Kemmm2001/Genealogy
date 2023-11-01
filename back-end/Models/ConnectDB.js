const mysql = require('mysql2');
const Sequelize = require('sequelize');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Baolan0598.',
  database: 'genealogy'
});

const sequelize = new Sequelize('genealogy', 'root', 'Baolan0598.', {
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
