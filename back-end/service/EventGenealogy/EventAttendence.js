const db = require('../../Models/ConnectDB')

function insertMemberAttend(eventID, memberID) {
  return new Promise((resolve, reject) => {
    let query = 'INSERT INTO genealogy.eventattendance (EventId, MemberID, IsGoing) VALUES (?, ?, -1)';
    db.connection.query(query, [eventID, memberID], (err, result) => {
      if (err) {
        console.error(err);
        reject('Failed to insert attendance');
      } else {
        console.log('Insertion successful');
        resolve(result && result.affectedRows > 0);
      }
    });
  });
}


//Nguyễn Lê Hùng
function checkConfirmedEvent(EventID, MemberID, Token) {
  return new Promise((resolve, reject) => {
    let query = `SELECT IsGoing FROM genealogy.eventattendance where EventID = ${EventID} and MemberID = ${MemberID} and Token = '${Token}'`;
    db.connection.query(query, (err, result) => {
      if (!err && result[0].IsGoing != null) {
        resolve(result[0].IsGoing)
        console.log("vào khác null")
      } else {
        console.log("vào null")
        resolve(false)
      }
    })
  })
}

function checkEventID(eventID) {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) AS count FROM genealogy.eventattendance WHERE EventID = ?`;
    db.connection.query(query, [eventID], (err, results) => {
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

function Update(memberId, token) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE genealogy.eventattendance as a SET a.Token = '${token}' WHERE memberId = '${memberId}'`;
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

function checkTokenEvent(token) {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) AS count FROM genealogy.eventattendance WHERE Token = ?`;
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

function UpdateIsGoing(memberId, eventId, IsGoing) {
  return new Promise((resolve, reject) => {
    try {
      let query = `UPDATE genealogy.eventattendance as a SET a.IsGoing = '${IsGoing}' WHERE MemberID = '${memberId}' AND EventID = '${eventId}'`;
      db.connection.query(query, (err) => {
        if (!err) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    } catch (error) {
      console.log(error);
      reject(false);
    }
  });
}

function DeleteToken(memberId, eventId) {
  return new Promise((resolve, reject) => {
    let query = 'UPDATE genealogy.eventattendance AS a SET a.Token = NULL WHERE MemberID = ? AND EventID = ?';
    db.connection.query(query, [memberId, eventId], (err, result) => {
      if (!err) {
        resolve(result.affectedRows > 0); // Trả về true nếu có hàng bị ảnh hưởng
      } else {
        reject(err); // Trả về lỗi nếu có lỗi xảy ra
      }
    });
  });
}

module.exports = { insertMemberAttend, checkEventID, Update, checkToken, checkTokenEvent, UpdateIsGoing, checkConfirmedEvent, DeleteToken }
