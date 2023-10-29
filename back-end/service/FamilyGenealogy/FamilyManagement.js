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
            IsDead, Dod, PlaceOfDeadth, 
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
            member.IsDead, 
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
          IsDead = ?,
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
            member.IsDead, 
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
        WHERE MemberName LIKE ?
        `;

        const values = [`%${searchTerm}%`];

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

async function filterMember(filterOptions, db, res) {
    try {
      // Xây dựng câu truy vấn SQL cho bảng familymember
      let memberQuery = 'SELECT * FROM familymember WHERE 1 = 1';
      const queryParams = [];
  
      // Xây dựng điều kiện lọc cho bảng familymember
      if (filterOptions.male !== undefined) {
        memberQuery += ' AND male = ?';
        queryParams.push(filterOptions.male);
      }
      if (filterOptions.BloodType) {
        memberQuery += ' AND BloodType = ?';
        queryParams.push(filterOptions.BloodType);
      }
      if (filterOptions.IsAlive !== undefined) {
        memberQuery += ' AND IsAlive = ?';
        queryParams.push(filterOptions.IsAlive);
      }
  
      // Thực hiện truy vấn SQL cho bảng familymember
      const [memberResults] = await db.connection.query(memberQuery, queryParams);
  
      // Xây dựng câu truy vấn SQL cho bảng contact
      let contactQuery = 'SELECT * FROM contact WHERE 1 = 1';
  
      // Xây dựng điều kiện lọc cho bảng contact
      if (filterOptions.Address) {
        contactQuery += ' AND Address = ?';
      }
  
      // Thực hiện truy vấn SQL cho bảng contact
      const [contactResults] = await db.connection.query(contactQuery, [filterOptions.Address]);
  
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
  
    // Gộp dữ liệu từ bảng familymember và contact dựa trên MemberID
    for (const memberRow of memberResults) {
      // Tạo một đối tượng mới để lưu thông tin thành viên
      const mergedMember = {
        MemberID: memberRow.MemberID,
      };
  
      // Tìm thông tin liên hệ của thành viên dựa trên MemberID
      const relatedContact = contactResults.find(contactRow => contactRow.MemberID === memberRow.MemberID);
  
      if (relatedContact) {
        // Thêm thông tin liên hệ vào đối tượng thành viên
        mergedMember.ContactInfo = relatedContact;
      }
  
      mergedData.push(mergedMember);
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