const db = require("../../Models/ConnectDB")

function getRoleID(accountID) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT RoleID FROM genealogy.AccountFamilyTree; WHERE AccountID = ?';
      const values = [accountID];
  
      db.connection.query(query, values, (err, result) => {
        if (err) {
          console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
          reject(err);
        } else {
          if (result.length === 0) {
            resolve(null);
          } else {
            const roleID = result[0].RoleID;
            resolve(roleID);
          }
        }
      });
    });
  }
  module.exports = { getRoleID }
  