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
        resolve(count);
      }
    });
  });
}
function checkToken(token) {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) AS count FROM genealogy.account WHERE RePassToken = ?`;
    db.connection.query(query, [token], (err, results) => {
      if (err) {
        console.log(err)
        reject(err);

      } else {
        const count = results[0].count;
        resolve(count);
      }
    });
  });
}

function insertAccountFamilyTree(AccountID, CodeID) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO AccountFamilyTree (AccountID, CodeID, RoleID)
    VALUES (?, ?, ?)`;
    let values = [AccountID, CodeID, 3]
    db.connection.query(query, values, (err, results) => {
      if (err) {
        console.log(err)
        reject(err);
      } else {
        console.log(results)
      }
    });
  });
}

function UpdateAccount(email, token) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE genealogy.account as a SET a.RePassToken = '${token}' WHERE Email = ${email}`;
    db.connection.query(query, (err, results) => {
      if (err) {
        console.log(err)
        resolve(false);
      } else {
        resolve(true)
      }
    });
  });
}

function checkCodeIdCreator(AccountID, CodeID, RoleID) {
  return new Promise((resolve, reject) => {
    const query = `select COUNT(*) AS count from AccountFamilyTree where AccountID = ${AccountID} and CodeID = ${CodeID} and RoleID = ${RoleID}`;
    db.connection.query(query, (err, results) => {
      if (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        reject(err);
      } else {
        const count = results[0].count;
        resolve(count);
      }
    });
  });
}
function checkCodeCreatedByID(AccountID) {
  return new Promise((resolve, reject) => {
    const query = `select COUNT(*) AS count from AccountFamilyTree where RoleID = 1 AND CodeID IS NOT NULL  and AccountID = ${AccountID}`;
    db.connection.query(query, (err, results) => {
      if (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        reject(err);
      } else {
        const count = results[0].count;
        resolve(count);
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
        resolve(count);
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
    const query = 'INSERT INTO genealogy.account (Username, Email, Password,FreeSMS,FreeEmail) VALUES (?, ?, ? , ? , ?)';
    const values = [username, email, password, 5, 5];

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

function ChangePassword(newPassword, AccountID) {
  return new Promise((resolve, reject) => {
    try {
      let query = `UPDATE account as a SET a.Password = '${newPassword}' WHERE AccountID = ${AccountID};`;
      db.connection.query(query, (err) => {
        if (!err) {
          resolve(true)
        } else {
          reject(false)
        }
      })
    } catch (error) {
      console.log(error)
      reject(false)
    }
  })
}

function UpdatePassword(newPassword, email) {
  return new Promise((resolve, reject) => {
    try {
      let query = `UPDATE genealogy.account as a SET a.Password = '${newPassword}' WHERE Email = ${email};`;
      db.connection.query(query, (err) => {
        if (!err) {
          resolve(true)
        } else {
          reject(false)
        }
      })
    } catch (error) {
      console.log(error)
      reject(false)
    }
  })
}

function getListRoleMember(CodeID) {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT * FROM genealogy.AccountFamilyTree where CodeID = '${CodeID}';`;
      db.connection.query(query, (err, result) => {
        if (!err && result.length > 0) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    } catch (error) {
      console.log(error);
      reject(error)
    }
  })
}

function changeUsername(AccountId, Username) {
  return new Promise((resolve, reject) => {
    try {
      let query = `UPDATE account AS a SET a.Username = '${Username}' WHERE a.AccountID = ${AccountId};`;
      console.log(query);
      db.connection.query(query, (err) => {
        if (err) {       
          reject(false);
        } else {          
          resolve(true);
        }
      });
    } catch (error) {
      console.error(error);
      reject(false);
    }
  });
}


function getUserInfo(accountID) {
  return new Promise((resolve, reject) => {
    let query = 'SELECT Username, Email, Password FROM genealogy.account WHERE AccountID = ?';
    let values = [accountID];

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
    let currentDate = new Date();
    currentDate = currentDate.toISOString().slice(0, 19).replace("T", " ");
    const query = 'INSERT INTO genealogy.AccountFamilyTree (AccountID,CodeID ,RoleID,AccessTime) VALUES (?,?,?,?)';
    const values = [accountID, codeID, roleID, currentDate];

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
function getHistoryLoginCodeID(AccountID) {
  return new Promise((resolve, reject) => {
    try {
      let query = `select * from AccountFamilyTree where  AccountID = ${AccountID} and AccessTime is not null`;
      db.connection.query(query, (err, results) => {
        if (err) {
          console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    } catch (error) {
      console.log(error)
    }
  });
}
function getMemberRole(AccountID, CodeID) {
  return new Promise((resolve, reject) => {
    try {
      let query = `select RoleID from AccountFamilyTree where AccountID = ${AccountID} and CodeID = ${CodeID}`;
      db.connection.query(query, (err, result) => {
        if (!err && result.length > 0) {
          resolve(result[0].RoleID)
        } else {
          reject(err)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}



function insertIntoFamily(value, codeID) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO genealogy.familytree (CodeID, TreeName,Ethnicity,DeathAnniversary) VALUES (?, ?, ?, ?)';
    const values = [codeID, value.treeName, value.ethnicity, value.deathAnniversary];

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

module.exports = {
  checkMail, checkID, create, getUser, refreshFreeEmail, insertAccountFamily, checkCodeID,
  checkAccountID, updateRoleID, insertIntoFamily, getUserInfo, getUserCodeID, checkCodeIdCreator,
  insertAccountFamilyTree, checkCodeCreatedByID, getHistoryLoginCodeID, ChangePassword, getListRoleMember, UpdateAccount, UpdatePassword,
  checkToken, getMemberRole, changeUsername

}