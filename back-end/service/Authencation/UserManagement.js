const db = require("../../Models/ConnectDB")

function checkMail(email) {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) AS count FROM genealogy.account WHERE Email = ?`;
    db.connection.query(query, [email], (err, results) => {
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
function checkCodeID(codeID) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) AS count FROM genealogy.familytree WHERE CodeID = ?';
    db.connection.query(query, [codeID], (err, results) => {
      if (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        reject(err);
      } else {
        const count = results[0].count;
        resolve(count > 0);
      }
    });
  });
}

function checkAccountID(accountID) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) AS count FROM genealogy.account WHERE AccountID = ?';
    db.connection.query(query, [accountID], (err, results) => {
      if (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
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

function getUserInfo(accountID) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT Username, Email, Password FROM genealogy.account WHERE AccountID = ?';
    const values = [accountID];

    db.connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        reject(err);
      } else {
        if (result.length === 0) {

          resolve(null);
        } else {

          const user = {
            username: result[0].Username,
            email: result[0].Email,
            password: result[0].Password
          };
          resolve(user);
        }
      }
    });
  });
}

function getUserCodeID(accountID) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT CodeID FROM genealogy.account WHERE AccountID = ?';
    const values = [accountID];

    db.connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        reject(err);
      } else {
        if (result.length === 0) {
          resolve(null);
        } else {
          resolve(result)
        }
      }
    });
  });
}

function refreshFreeEmail(usesTime) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE genealogy.account SET FreeEmail = ?';
    const values = [usesTime];
    db.connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}



function insertAccountFamily(accountID, codeID, roleID) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO genealogy.AccountFamilyTree (AccountID,CodeID ,RoleID) VALUES (?,?,?)';
    const values = [accountID, codeID, roleID];

    db.connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        reject(err);
      } else {
        console.log('Dữ liệu đã được cập nhật thành công.');
        resolve(results);
      }
    });
  });
}

function insertIntoFamily(value, codeID) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO genealogy.familytree (CodeID, TreeName,Ethnicity ) VALUES (?, ?, ?)';
    const values = [codeID, value.treeName, value.ethnicity];

    db.connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        reject(err);
      } else {
        console.log('Dữ liệu đã được cập nhật thành công.');
        resolve(results);
      }
    });
  });
}

function checkID(accountID) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) AS count FROM genealogy.AccountFamilyTree WHERE AccountID = ?';
    db.connection.query(query, [accountID], (err, results) => {
      if (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        reject(err);
      } else {
        const count = results[0].count;
        resolve(count > 0);
      }
    });
  });
}

function updateRoleID(data) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE genealogy.AccountFamilyTree SET RoleID = ? WHERE AccountID = ?';
    const values = [data.roleID, data.accountID];

    db.connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        reject(err);
      } else {
        console.log('Dữ liệu đã được cập nhật thành công.');
        resolve(results);
      }
    });
  });
}

module.exports = { checkMail,checkID, create, getUser, refreshFreeEmail,insertAccountFamily, checkCodeID, checkAccountID, updateRoleID, insertIntoFamily,getUserInfo, getUserCodeID }