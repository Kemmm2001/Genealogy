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
function InsertMarriIdToMember(memberId, marriageID) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE familymember SET MarriageID = ? WHERE MemberID = ?;';
        const values = [
            marriageID, memberId
        ]
        db.connection.query(query, values, (err, result) => {
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

function queryFamilyMembers(filterOptions) {
    return new Promise((resolve, reject) => {
        let memberQuery = 'SELECT DISTINCT MemberID FROM genealogy.familymember Where 1 = 1';
        const queryParams = [];

        if (filterOptions.BloodType) {
            memberQuery += ' AND BloodType = ?';
            queryParams.push(filterOptions.BloodType);
        }
        if (filterOptions.selectAge || filterOptions.selectAge == 0) {
            memberQuery += ' AND dob >= DATE_SUB(CURDATE(), INTERVAL ? YEAR) AND dob <= DATE_SUB(CURDATE(), INTERVAL ? YEAR)';
            queryParams.push(filterOptions.EndAge);
            queryParams.push(filterOptions.startAge);
        }
        if (filterOptions.CodeID) {
            memberQuery += ' AND CodeID = ?';
            queryParams.push(filterOptions.CodeID);
        }
        if (filterOptions.Address) {
            memberQuery += ` AND MemberID IN (
                SELECT fm.MemberID
                FROM genealogy.familymember AS fm
                INNER JOIN contact AS c ON fm.MemberID = c.MemberID
                WHERE c.Address LIKE ?)`;
            queryParams.push(`%${filterOptions.Address}%`);
        }

        db.connection.query(memberQuery, queryParams, (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}



function queryContactMembers(filterOptions) {
    return new Promise((resolve, reject) => {
        let contactQuery = 'SELECT DISTINCT MemberID FROM genealogy.contact WHERE 1 = 1';

        if (filterOptions.Address) {
            contactQuery += ' AND Address = ?';
        }

        db.connection.query(contactQuery, [filterOptions.Address], (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err);
            } else {
                console.log('Result success from contact:', result);
                resolve(result);
            }
        });
    });
}

function getAllMemberInMemberRole() {
    return new Promise((resolve, reject) => {
        let query = `
        SELECT fm.* FROM familymember as fm
        INNER JOIN memberrole as mr
        on fm.MemberID = mr.MemberID
        ORDER BY
          CASE
            WHEN mr.RoleID = 1 THEN 1
            WHEN mr.RoleID = 2 THEN 2
            WHEN mr.RoleID = 3 THEN 3 
        END`;
        db.connection.query(query, (err, result) => {
            if (err) {
                reject(err);
                console.log(err)
            } else {
                resolve(result)
            }
        })
    })
}
function getAllMemberNotInMemberRole() {
    return new Promise((resolve, reject) => {
        let query = `SELECT fm.*
        FROM familymember fm
        LEFT JOIN memberrole mr ON fm.MemberID = mr.MemberID
        WHERE mr.MemberID IS NULL;`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
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

module.exports = {
    addMember, updateMember, deleteMember, getRelationship, getMember, createRelationship, searchMember,
    getAllMember, InsertMarriIdToMember, queryFamilyMembers, getAllMemberInMemberRole, getAllMemberNotInMemberRole
};