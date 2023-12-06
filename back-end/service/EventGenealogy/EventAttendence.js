const db = require('../../Models/ConnectDB')

function insertMemberAttend(eventID, memberID) {
  return new Promise((resolve, reject) => {
    try {
      let query = 'INSERT INTO genealogy.eventattendance (EventId, MemberID) VALUES (?,?)';
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

module.exports = { insertMemberAttend, checkEventID, Update, checkToken, checkTokenEvent, UpdateIsGoing, checkConfirmedEvent }
