const db = require("../../Models/ConnectDB")
 
function checkMail(email) {
 return new Promise((resolve, reject) => {
     const query = `SELECT COUNT(*) AS count FROM genealogy.account WHERE Email = ?`;
     db.connection.query(query, [email] ,(err, results) => {
         if (err) {
           console.log(err)
             reject(err);
            
         } else {
       
             const count = results[0].count;
             resolve(count > 0);
         }
     });
 });
}

function create(username, email, password) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO genealogy.account (Username, Email, Password) VALUES (?, ?, ?)';
    const values = [username, email, password];

    db.connection.query(query, values, (err, results) => {
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

function getUser(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT accountID, Password FROM genealogy.account WHERE Email = ?';
    const values = [email];

    db.connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        reject(err);
      } else {
        if (result.length === 0) {
          // Không tìm thấy email trong cơ sở dữ liệu
          resolve(null);
        } else {
          // Tìm thấy email và trả về accountID và mật khẩu
          const user = {
            accountID: result[0].accountID,
            password: result[0].Password
          };
          resolve(user);
        }
      }
    });
  });
}
module.exports = {checkMail, create, getUser}