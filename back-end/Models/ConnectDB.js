const mysql = require('mysql2');

const connection = mysql.createConnection({
  // host: '14.225.254.123',
  // user: 'admin',
  // password: 'AXeTFQW7pC3cxSFg9a7Q8JfwtXkMmy3PSbnG2NgLXASbWhps6x9dBLG',
  host: 'localhost',
  user: 'root',
  password: 'Baolan0598.',
  database: 'genealogy'
});

// Kết nối vào cơ sở dữ liệu
connection.connect(function (err) {
  if (err) {
    console.error('Lỗi kết nối:', err);
  } else {
    console.log('Kết nối thành công vào cơ sở dữ liệu MySQL');
  }
});

module.exports = { connection };
