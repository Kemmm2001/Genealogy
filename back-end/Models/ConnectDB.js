const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'AXeTFQW7pC3cxSFg9a7Q8JfwtXkMmy3PSbnG2NgLXASbWhps6x9dBLG',
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
