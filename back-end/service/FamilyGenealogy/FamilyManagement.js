const db = require("../../Models/ConnectDB")
const CoreFunction = require("../../Utils/CoreFunction");
function addMember(member) {
    return new Promise((resolve, reject) => {
        const query = `
        INSERT INTO familymember 
        (  ParentID, MarriageID, MemberName, NickName, 
            BirthOrder, Origin, 
            NationalityID, ReligionID, 
            Dob, LunarDob, BirthPlace, 
            IsDead, Dod, PlaceOfDeadth, 
            GraveSite, Note, Generation, BloodType, CodeID, Male, Image)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
        const values = [
            member.ParentID,
            member.MarriageID,
            member.MemberName,
            member.NickName,
            member.BirthOrder,
            member.Origin,
            member.NationalityId,
            member.ReligionId,
            member.Dob,
            member.LunarDob,
            member.BirthPlace,
            member.IsDead,
            member.Dod,
            member.PlaceOfDeath,
            member.GraveSite,
            member.Note,
            member.Generation,
            member.BloodType,
            member.CodeId,
            member.Male,
            member.Image
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
        const isDeleted = removeMemberPhoto(member.MemberID);
        console.log(`isDeleted: ${isDeleted}`);
        if (isDeleted == false) {
            reject("Error when delete image");
        }
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
          Male = ?,
            Image = ?
        WHERE MemberID = ?
      `;

        const values = [
            member.ParentID,
            member.MarriageID,
            member.MemberName,
            member.NickName,
            member.HasNickName,
            member.BirthOrder,
            member.Origin,
            member.NationalityId,
            member.ReligionId,
            member.Dob,
            member.LunarDob,
            member.BirthPlace,
            member.IsDead,
            member.Dod,
            member.PlaceOfDeath,
            member.GraveSite,
            member.Note,
            member.Generation,
            member.BloodType,
            member.CodeId,
            member.Male,
            member.Image,
            member.MemberID
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

// hàm có chức năng xóa ảnh trong thư mục
const removeMemberPhoto = (MemberID) => {
    try {
        let querySelect = `SELECT * FROM familymember where MemberID = ?`;
        let value = [MemberID];
        return deleteImageBySelectQuery(querySelect, value);
    } catch (err) {
        console.error("Error : " + err);
        return false; // Trả về false nếu có lỗi
    }
}
const deleteImageBySelectQuery = (query, values) => {
    console.log("query: " + query);
    console.log("values: " + values);
    db.connection.query(query, values, async (err, result) => {
        if (err) {
            console.error("Error in query: " + err);
            return false; // Trả về false nếu có lỗi
        } else {
            console.log("Result: ", result);
            if (result[0].Image == null || result[0].Image == "") return true;
            // Gọi hàm deleteImage để xóa ảnh
            const isDeleted = await CoreFunction.deleteImage(result[0].Image);
            console.log(`isDeleted: ${isDeleted}`);
            return isDeleted;
        }
    });
}

function deleteMember(memberId) {   
    return new Promise((resolve, reject) => {
        console.log("memberId: " + memberId);
        const isDeleted = removeMemberPhoto(memberId);
        console.log(`isDeleted: ${isDeleted}`);
        if (isDeleted == false) {
            reject("Error when delete image");
        }
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

function GetCurrentParentMember(memberID) {
    return new Promise((resolve, reject) => {
        let query = `select * from familymember
        where MemberID = ${memberID} and ParentID is not null`;
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

function insertParentIdToMember(parentID, memberID) {
    let query = `UPDATE familymember SET ParentID = ${parentID} WHERE MemberID = ${memberID};`
    db.connection.query(query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("insert success");
        }
    })
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
function setGeneration(generation, memberId) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE familymember SET Generation = ? WHERE MemberID = ?';
        db.connection.query(query, [generation, memberId], (err, result) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
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

function getMemberByMemberID(memberID) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM familymember WHERE MemberID = ?`;
        db.connection.query(query, memberID, (err, result) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = {
    addMember, updateMember, deleteMember, getRelationship, getMember, createRelationship, searchMember, getMemberByMemberID,
    setGeneration, queryContactMembers,
    getAllMember, InsertMarriIdToMember, queryFamilyMembers, getAllMemberInMemberRole, getAllMemberNotInMemberRole, GetCurrentParentMember, insertParentIdToMember
};