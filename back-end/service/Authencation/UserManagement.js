 const db = require("../../Models/ConnectDB")
 
async function checkMail(username) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS count FROM account WHERE Username = ?`;
  
      db.query(query, [username], (err, results) => {
        if (err) {
          reject(err);
        } else {
          const count = results[0].count;
          resolve(count > 0); // Trả về true nếu email tồn tại, ngược lại trả về false
        }
      });
    });
  }
  
async function create(username, password) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO account (Username, Password) VALUES (?, ?)';
      const values = [username, password];
  
      db.query(query, values, (err, results) => {
        if (err) {
          console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
          reject(err);
        } else {
          console.log('Dữ liệu đã được chèn thành công.');
          resolve(results);
        }
      });
    });
  }
  module.exports = {checkMail, create}