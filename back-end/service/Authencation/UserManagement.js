const FreeSMS = process.env.FREE_SMS_EVERY_DAY
const FreeEmail = process.env.FREE_EMAIL_EVERY_DAY
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

function checkRegisterToken(token) {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) AS count FROM genealogy.account WHERE RegisterToken = ?`;
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
//Nguyễn Lê Hùng
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
//Nguyễn Lê Hùng
function UpdateAccount(email, token) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE genealogy.account as a SET a.RePassToken = '${token}' WHERE Email = '${email}'`;
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

//Nguyễn Lê Hùng
function UpdateRegisterToken(email, token) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE genealogy.account as a SET a.RegisterToken = '${token}' WHERE Email = '${email}'`;
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

//Nguyễn Lê Hùng
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

//Nguyễn Lê Hùng
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
    const query = 'INSERT INTO genealogy.account (Username, Email, Password,FreeSMS,FreeEmail, IsActive) VALUES (?, ?, ? , ? , ?, 0)';
    const values = [username, email, password, FreeSMS, FreeEmail];

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
    const query = 'SELECT accountID, Password, IsActive FROM genealogy.account WHERE Email = ?';
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
            password: result[0].Password,
            isActive: result[0].IsActive
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
      let query = `UPDATE genealogy.account AS a SET a.Password = '${newPassword}' WHERE Email = '${email}'`;
      db.connection.query(query, (err, result) => {
        if (!err) {
          resolve(result.affectedRows > 0); // Trả về true nếu có hàng bị ảnh hưởng
        } else {
          reject(err); // Trả về lỗi nếu có lỗi xảy ra
        }
      });
    } catch (error) {
      console.log(error);
      reject(false);
    }
  });
}

function DeleteRePasssToken(email) {
  return new Promise((resolve, reject) => {
    try {
      let query = `UPDATE genealogy.account AS a SET a.RePassToken = NULL WHERE Email = '${email}'`;
      db.connection.query(query, (err, result) => {
        if (!err) {
          resolve(result.affectedRows > 0); // Trả về true nếu có hàng bị ảnh hưởng
        } else {
          reject(err); // Trả về lỗi nếu có lỗi xảy ra
        }
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

function DeleteRegisterToken(email) {
  return new Promise((resolve, reject) => {
    try {
      let query = `UPDATE genealogy.account AS a SET a.RegisterToken = NULL WHERE Email = '${email}'`;
      db.connection.query(query, (err, result) => {
        if (!err) {
          resolve(result.affectedRows > 0); // Trả về true nếu có hàng bị ảnh hưởng
        } else {
          reject(err); // Trả về lỗi nếu có lỗi xảy ra
        }
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

function UpdateActive(IsActive, email) {
  return new Promise((resolve, reject) => {
    try {
      let query = `UPDATE genealogy.account as a SET a.IsActive = '${IsActive}' WHERE Email = '${email}'`;
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
      let query = `SELECT ac.Username, ac.Email, af.AccountID, af.CodeID, af.RoleID,r.RoleName
      FROM genealogy.AccountFamilyTree AS af
      INNER JOIN genealogy.account AS ac ON af.AccountID = ac.AccountID
      INNER JOIN genealogy.roleaccount AS r ON r.RoleID = af.RoleID
      WHERE af.CodeID = ${CodeID}
      GROUP BY af.AccountID, af.CodeID, af.RoleID;`;
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

function getAccount(AccountID) {
  return new Promise((resolve, reject) => {
    try {
      let query = `select * from account where AccountID = ${AccountID}`;
      db.connection.query(query, (err, result) => {
        if (!err && result.length > 0) {
          resolve(result[0])
        } else {
          resolve(false)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

function getUserInfo(accountID, CodeID) {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT ac.*, ra.RoleName FROM genealogy.account as ac
        INNER JOIN AccountFamilyTree as af ON ac.AccountID = af.AccountID 
        INNER JOIN roleaccount as ra ON af.RoleID = ra.RoleID 
        WHERE ac.AccountID = ${accountID} and af.CodeID = ${CodeID}`;
      db.connection.query(query, (err, result) => {
        if (!err && result.length > 0) {
          resolve(result[0])
        } else {
          reject(err)
        }
      })

    } catch (error) {
      reject(error);
    }
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
  return new Promise(async (resolve, reject) => {
    const query = 'UPDATE genealogy.account SET FreeEmail = ?';
    const values = [usesTime];
    const results = await coreQuery(query, values);
    resolve(results);
  });
}

function refreshFreeSMS(usesTime) {
  return new Promise(async (resolve, reject) => {
    const query = 'UPDATE genealogy.account SET FreeSMS = ?';
    const values = [usesTime];
    const results = await coreQuery(query, values);
    resolve(results);
  });
}

function setFreeEmail(usesTime, accountID) {
  return new Promise(async (resolve, reject) => {
    const query = 'UPDATE genealogy.account SET FreeEmail = ? WHERE AccountID = ?';
    const values = [usesTime, accountID];
    const results = await coreQuery(query, values);
    resolve(results);
  });
}

function setFreeSMS(usesTime, accountID) {
  return new Promise(async (resolve, reject) => {
    const query = 'UPDATE genealogy.account SET FreeSMS = ? WHERE AccountID = ?';
    const values = [usesTime, accountID];
    const results = await coreQuery(query, values);
    resolve(results);
  });
}

function formatMySQLDatetime(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

//Nguyễn lê Hung
function updateDateLoginGenealogy(AccountID, CodeID) {
  return new Promise((resolve, reject) => {
    try {
      let currentDate = new Date();
      let formattedDate = formatMySQLDatetime(currentDate);

      console.log('formattedDate:', formattedDate);
      let query = `UPDATE AccountFamilyTree
      SET AccessTime = '${formattedDate}'
      WHERE AccountID = ${AccountID} and CodeID = ${CodeID};`
      db.connection.query(query, (err, result) => {
        if (!err) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}



function insertAccountFamily(accountID, codeID, roleID) {
  return new Promise((resolve, reject) => {
    try {
      let currentDate = new Date();
      let formattedDate = formatMySQLDatetime(currentDate);
      const query = 'INSERT INTO genealogy.AccountFamilyTree (AccountID,CodeID ,RoleID,AccessTime) VALUES (?,?,?,?)';
      const values = [accountID, codeID, roleID, formattedDate];

      db.connection.query(query, values, (err, results) => {
        if (err) {
          console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
          resolve(false);
        } else {
          console.log('Dữ liệu đã được cập nhật thành công.');
          resolve(results);
        }
      });
    } catch (error) {
      reject(error)
    }
  });
}
function getHistoryLoginCodeID(AccountID) {
  return new Promise((resolve, reject) => {
    try {
      if (AccountID) {
        let query = `select * from AccountFamilyTree where  AccountID = ${AccountID} and AccessTime is not null`;
        db.connection.query(query, (err, results) => {
          if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            reject(err);
          } else {
            resolve(results);
          }
        });
      }
    } catch (error) {
      console.log(error)
    }
  });
}

function getInformationGenealogy(CodeID) {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT * FROM genealogy.familytree where CodeID = ${CodeID}`;
      db.connection.query(query, (err, result) => {
        if (!err && result.length > 0) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

// nguyễn anh tuấn
function getAccountByAccountID(accountID) {
  return new Promise(async (resolve, reject) => {
    const query = `SELECT * FROM genealogy.account WHERE AccountID = ?`;
    const values = [accountID];
    const result = await coreQuery(query, values);
    resolve(result);
  })
}
// nguyễn anh tuấn
function coreQuery(query, values) {
  return new Promise((resolve, reject) => {
    if (values == null) {
      db.connection.query(query, (err, result) => {
        if (err) {
          console.log(err);
          reject(err)
        } else {
          resolve(result)
        }
      })
    } else {
      db.connection.query(query, values, (err, result) => {
        if (err) {
          console.log(err);
          reject(err)
        } else {
          resolve(result)
        }
      })
    }
  })
}


function getRoleAccount(AccountID, CodeID) {
  return new Promise((resolve, reject) => {
    try {
      let query = `SELECT RoleID FROM genealogy.AccountFamilyTree where AccountID = ${AccountID} and CodeID = ${CodeID};`
      db.connection.query(query, (err, result) => {
        if (!err && result) {
          resolve(result[0])
        } else {
          reject(err)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

function getAllRoleAccount() {
  return new Promise((resolve, reject) => {
    try {
      let query = "SELECT * FROM genealogy.roleaccount";
      db.connection.query(query, (err, result) => {
        if (!err && result.length > 0) {
          resolve(result)
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
    const query = 'UPDATE genealogy.AccountFamilyTree SET RoleID = ? WHERE AccountID = ? and CodeID = ?';
    const values = [data.RoleId, data.accountID, data.CodeID];

    db.connection.query(query, values, (err, results) => {
      if (err) {
        console.log('Lỗi truy vấn cơ sở dữ liệu:', err);
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = {
  checkMail, checkID, create, getUser, refreshFreeEmail, insertAccountFamily, checkCodeID,
  checkAccountID, updateRoleID, insertIntoFamily, getUserInfo, getUserCodeID, checkCodeIdCreator,
  insertAccountFamilyTree, checkCodeCreatedByID, getHistoryLoginCodeID, ChangePassword, getListRoleMember, UpdateAccount, UpdatePassword,
  checkToken, changeUsername, getInformationGenealogy, UpdateRegisterToken, checkRegisterToken,
  UpdateActive, DeleteRePasssToken, DeleteRegisterToken, getRoleAccount, getAllRoleAccount, getAccountByAccountID, refreshFreeSMS,
  setFreeEmail, setFreeSMS, updateDateLoginGenealogy, getAccount
}