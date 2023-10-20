const db = require("../../Models/ConnectDB")
function addMember(member) {
    return new Promise((resolve, reject) => {
        const query = `
        INSERT INTO familymember 
        (  ParentID, MarriageID, MemberName, NickName, HasNickName, 
            BirthOrder, 
            Origin, 
            NationalityID, 
            ReligionID, 
            Dob, LunarDob, BirthPlace, 
            IsAlive, Dod, PlaceOfDeadth, 
            GraveSite, Note, Generation, BloodType, CodeID, Male)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

        const values = [
            member.parentID,
            member.marriageID,
            member.memberName,
            member.nickName,
            member.hasNickName,
            member.birthOrder,
            member.origin,
            member.nationalityId,
            member.religionId,
            member.dob, 
            member.lunarDob, 
            member.birthPlace,
            member.isAlive, 
            member.dod, 
            member.placeOfDeath,
            member.graveSite, 
            member.note, 
            member.generation, 
            member.bloodType,
            member.codeId,
            member.male
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
          ParentID = ?,
          MarriageID = ?,
          MemberName = ?,
          NickName = ?,
          HasNickName = ?,
          BirthOrder = ?,
          Origin = ?,
          NationalityID = ?,
          ReligionID = ?,
          Dob = ?,
          LunarDob = ?,
          BirthPlace = ?,
          IsAlive = ?,
          Dod = ?,
          PlaceOfDeadth = ?,
          GraveSite = ?,
          Note = ?,
          Generation = ?,
          BloodType = ?,
          CodeID = ?,
          Male = ?
        WHERE MemberID = ?
      `;

        const values = [
            member.parentID,
            member.marriageID,
            member.memberName,
            member.nickName,
            member.hasNickName,
            member.birthOrder,
            member.origin,
            member.nationalityId,
            member.religionId,
            member.dob, 
            member.lunarDob, 
            member.birthPlace,
            member.isAlive, 
            member.dod, 
            member.placeOfDeath,
            member.graveSite, 
            member.note, 
            member.generation, 
            member.bloodType,
            member.codeId,
            member.male,
            member.memberID
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

function filterMember(req, res) {
    try {
      const filterOptions = req.body; // Lấy filterOptions từ request body
  
      // Xây dựng câu truy vấn SQL cho bảng familymember
      let memberQuery = 'SELECT * FROM familymember WHERE 1 =1';
  
      // Xây dựng điều kiện lọc cho bảng familymember
      if (filterOptions.male !== undefined) {
        memberQuery += ` AND male = ${filterOptions.male}`;
      }
      if (filterOptions.BloodType) {
        memberQuery += ` AND BloodType = '${filterOptions.BloodType}'`;
      }
      if (filterOptions.IsAlive !== undefined) {
        memberQuery += ` AND IsAlive = ${filterOptions.IsAlive}`;
      }
  
      // Thực hiện truy vấn SQL cho bảng familymember
      const memberResults = db.connection.query(memberQuery);
  
      // Xây dựng câu truy vấn SQL cho bảng contact
      let contactQuery = 'SELECT * FROM contact WHERE 1=1';
  
      // Xây dựng điều kiện lọc cho bảng contact
      if (filterOptions.Address) {
        contactQuery += ` AND Address = '${filterOptions.Address}'`;
      }
  
      // Thực hiện truy vấn SQL cho bảng contact
      const contactResults = db.connection.query(contactQuery);
  
      // Gộp dữ liệu thành viên và thông tin liên hệ
      const mergedData = mergeData(memberResults, contactResults);
  
      res.json({
        success: true,
        data: mergedData,
      });
    } catch (error) {
      console.error('Lỗi khi lọc thành viên:', error);
      res.status(500).json({ success: false, message: 'Lỗi khi lọc thành viên' });
    }
  }

  function mergeData(memberResults, contactResults) {
    const mergedData = [];
  
    // Gộp dữ liệu từ bảng familymember
    for (const memberRow of memberResults) {
      // Tạo một đối tượng mới để lưu thông tin thành viên
      const mergedMember = {
        MemberID: memberRow.MemberID,
      };
  
      // Tìm thông tin liên hệ của thành viên dựa trên MemberID
      const relatedContact = contactResults.find(contactRow => contactRow.MemberID === memberRow.MemberID);
  
      if (relatedContact) {
        mergedData.push(mergedMember);

      }
    }
  
    return mergedData;
  }

  function getAllMember() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM familymember';
        db.connection.query(query, (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = { addMember, updateMember, deleteMember, getRelationship, getMember, createRelationship, searchMember, filterMember, getAllMember };