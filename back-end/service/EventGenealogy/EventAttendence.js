const db = require('../../Models/ConnectDB')

function insertMemberAttend(eventID, memberID) {
  return new Promise((resolve, reject) => {
    try {
      let query = 'INSERT INTO genealogy.eventattendance (EventId, MemberID, IsGoing) VALUES (?,?, 0)';
      db.connection.query(query, [eventID, memberID], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("Insertion successful");
          resolve(true);
        }
      });
    } catch (error) {
      console.error(error);
      reject('Failed to insert attendance');
    }
  });
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

function UpdateIsGoing(memberId, IsGoing) {
  return new Promise((resolve, reject) => {
    try {
      let query = `UPDATE genealogy.eventattendance as a SET a.IsGoing = '${IsGoing}' WHERE MemberID = '${memberId};'`;
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
module.exports = { insertMemberAttend, checkEventID, Update, checkToken, UpdateIsGoing }
