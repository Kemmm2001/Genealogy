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

module.exports = { addMember, updateMember, deleteMember };