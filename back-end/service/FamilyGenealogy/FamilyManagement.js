const db = require("../../Models/ConnectDB")
function addMember(member) {
    return new Promise((resolve, reject) => {
        const query = `
        INSERT INTO familymember 
        (MemberName, NickName, HasNickName, 
            BirthOrder, 
            Origin, 
            NationalityID, 
            ReligionID, 
            Dob, LunarDob, BirthPlace, 
            IsAlive, Dod, PlaceOfDeadth, 
            GraveSite, Note, Generation, CodeID)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

        const values = [
            member.memberName,
            member.nickName,
            member.hasNickName,
            member.birthOrder,
            member.origin,
            member.nationalityId,
            member.religionId,
            member.dob, member.lunarDob, member.birthPlace,
            member.isAlive, member.dod, member.placeOfDeath,
            member.graveSite, member.note, member.generation, member.codeId

        ];

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

function updateMember(member) {
    return new Promise((resolve, reject) => {
        const query = `
        UPDATE familymember 
        SET 
          MemberName = ?, NickName = ?, HasNickName = ?,
          BirthOrder = ?,
          Origin = ?, NationalityID = ?, ReligionID = ?,
          Dob = ?, LunarDob = ?, BirthPlace = ?,
          IsAlive = ?, Dod = ?, PlaceOfDeadth = ?,
          GraveSite = ?,
          Note = ?,
          Generation = ?,
          CodeID = ?
        WHERE MemberID = ?
      `;

        const values = [
            member.memberName, member.nickName, member.hasNickName,
            member.birthOrder, member.origin,
            member.nationalityId, member.religionId,
            member.dob, member.lunarDob, member.birthPlace,
            member.isAlive, member.dod, member.placeOfDeath,
            member.graveSite,
            member.note,
            member.generation,
            member.codeId,
            member.memberId
        ];

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

function deleteMember(memberId) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM familymember WHERE MemberID = ?';
        db.connection.query(query, memberId, (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err);
            } else {
                console.log('Result: ', result);
                resolve(result);
            }
        });
    });
}

function getRelationship(relationshipFrom, relationshipTo) {
    let relationshipName = [relationshipFrom, relationshipTo];
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM relationship WHERE relationshipname = ?  OR relationshipname = ?';
        db.connection.query(query, relationshipName, (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
function getMember(memberId) {
    return new Promise((resolve, reject) => {
        const query = 'select * from familymember where memberid = ?';
        db.connection.query(query, memberId, (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
function createRelationship(member1Id, member2Id, relationship1Id, relationship2Id) {
    let relationship1 = [member1Id, member2Id, relationship1Id, relationship2Id];
    let relationship2 = [member2Id, member1Id, relationship2Id, relationship1Id];
    let values = relationship1.concat(relationship2);
    return new Promise((resolve, reject) => {
        const query = 'insert into familyrelationship (member1id, member2id, relationship1id, relationship2id) values (?,?,?,?),(?,?,?,?)';
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

function searchMember(searchTerm) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT * FROM familymember
        WHERE MemberName LIKE ? OR Dob = ? OR ...
        `;

        const values = [`%${searchTerm}%`, searchTerm, /* ... other criteria */];

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

function filterMember(filterOptions) {
    return new Promise((resolve, reject) => {
      const {
        name,
        dob,
        origin,
        // Có thể thêm sau
      } = filterOptions;
  
      const conditions = [];
      const values = [];
  
      if (name) {
        conditions.push('MemberName LIKE ?');
        values.push(`%${name}%`);
      }
  
      if (dob) {
        conditions.push('Dob = ?');
        values.push(dob);
      }
  
      if (origin) {
        conditions.push('Origin = ?');
        values.push(origin);
      }
  
  
      // Xây dựng câu truy vấn SQL
      let query = 'SELECT * FROM familymember';
  
      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
      }
  
      // Thực hiện truy vấn SQL
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
  

module.exports = { addMember, updateMember, deleteMember, getRelationship, getMember, createRelationship, searchMember, filterMember };