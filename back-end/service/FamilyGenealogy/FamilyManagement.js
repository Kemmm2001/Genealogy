const db = require("../../Models/ConnectDB")
const CoreFunction = require("../../Utils/CoreFunction");
function addMember(member) {
    return new Promise((resolve, reject) => {
        try {
            const query = `
        INSERT INTO familymember 
        (  FatherID, MotherID, MemberName, NickName, 
            BirthOrder,Origin, 
            NationalityID, ReligionID, 
            Dob, LunarDob, BirthPlace, 
            IsDead, Dod, LunarDod, PlaceOfDeath, 
            GraveSite, Note, Generation, BloodType, CodeID, Male, Image)
        VALUES 
        (?, ?, ?, ?, ?, ?,?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
            const values = [
                member.FatherID,
                member.MotherID,
                member.MemberName,
                member.NickName,
                member.BirthOrder,
                member.Origin,
                member.NationalityID,
                member.ReligionID,
                member.Dob,
                member.LunarDob,
                member.BirthPlace,
                member.IsDead,
                member.Dod,
                member.LunarDod,
                member.PlaceOfDeath,
                member.GraveSite,
                member.Note,
                member.Generation,
                member.BloodType,
                member.CodeID,
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

        }
        catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

function updateMember(member) {
    return new Promise(async (resolve, reject) => {
        try {
            if (member.Image == null || member.Image == "" || member.Image == undefined) {
                console.log("Ảnh nhận được là null, \"\" hoặc undefined");
                await removeMemberPhoto(member.MemberID);
            }
            const query = `
        UPDATE familymember 
        SET 
            FatherID = ?,
            MotherID = ?,
          MemberName = ?,
          NickName = ?,
          BirthOrder = ?,
          Origin = ?,
          NationalityID = ?,
          ReligionID = ?,
          Dob = ?,
          LunarDob = ?,
          BirthPlace = ?,
          IsDead = ?,
          Dod = ?,
          LunarDod = ?,
          PlaceOfDeath = ?,
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
                member.BirthOrder,
                member.Origin,
                member.NationalityID,
                member.ReligionID,
                member.Dob,
                member.LunarDob,
                member.BirthPlace,
                member.IsDead,
                member.Dod,
                member.LunarDod,
                member.PlaceOfDeath,
                member.GraveSite,
                member.Note,
                member.Generation,
                member.BloodType,
                member.CodeID,
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
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });

}

// hàm có chức năng xóa ảnh trong thư mục
const removeMemberPhoto = async (MemberID) => {
    try {
        let querySelect = `SELECT * FROM familymember where MemberID = ?`;
        let value = [MemberID];
        return await deleteImageBySelectQuery(querySelect, value);
    } catch (err) {
        console.error("Error : " + err);
        return false; // Trả về false nếu có lỗi
    }
}
const deleteImageBySelectQuery = async (query, values) => {
    try {
        console.log("query: " + query);
        console.log("values: " + values);
        db.connection.query(query, values, async (err, result) => {
            if (err) {
                console.error("Error in query: " + err);
                return false; // Trả về false nếu có lỗi
            } else {
                if (result[0].Image == null || result[0].Image == "") return true;
                // Gọi hàm deleteImage để xóa ảnh
                const isDeleted = await CoreFunction.deleteImage(result[0].Image);
                console.log(`isDeleted: ${isDeleted}`);
                return isDeleted;
            }
        });
    } catch (err) {
        console.error("Error: " + err);
        return false; // Trả về false nếu có lỗi
    }
}

function deleteMember(memberId) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("memberId: " + memberId);
            const isDeleted = removeMemberPhoto(memberId);
            // Tìm và xóa tất cả các thành viên liên quan
            await deleteMemberRelated(memberId);
            // bắt đầu xóa member
            const query = 'DELETE FROM familymember WHERE MemberID = ?';
            db.connection.query(query, [memberId], (err, result) => {
                if (err) {
                    console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                    db.connection.rollback();
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        } catch (err) {
            db.connection.rollback();
            console.log(err);
            reject(err);
        }
    });
}

async function deleteMemberRelated(memberId) {
    // Định nghĩa hàm async để có thể sử dụng await bên trong

    console.log("chạy vào hàm deleteMemberAndRelated");
    // In log khi vào hàm

    let parentID = memberId;
    // Khởi tạo biến parentID = memberId truyền vào

    // Danh sách các memberId cần update đời
    const memberIdsToUpdate = [];

    // Lấy thông tin member cần xóa
    let member = await getMember(memberId);

    // nếu member đó khác đời 1 ( không phải tổ phụ ) và không có parentid thì return
    if (member[0].Generation != 1 && member[0].ParentID == null) return;

    if (member[0].MarriageID != null || member[0].MarriageID != 0) {
        // Nếu member đó có MarriageID (có vợ/chồng)
        memberIdsToUpdate.push(member[0].MarriageID);
        // Thêm MarriageID vào danh sách cần update đời
    }

    let listParentIDToCheck = [];
    // Danh sách các ParentID cần kiểm tra  

    while (parentID != null) {
        // Vòng lặp kiểm tra cho tới khi parentID = null (không có cha/mẹ)

        console.log("parentID: " + parentID);

        let membersChild = await getMembersByParentID(parentID);
        // Lấy danh sách con của parentID

        if (membersChild.length == 0) {
            // Nếu không có con 
            parentID = null;
            // Thì đặt parentID = null để thoát vòng lặp
        } else {
            // Ngược lại nếu có con

            for (let index = 0; index < membersChild.length; index++) {
                // Lặp qua từng đứa con

                if (membersChild[index].MarriageID != null && membersChild[index].MarriageID !== 0) {
                    // Nếu đứa con đó có vợ/chồng
                    console.log("memberChild[index].MarriageID: " + membersChild[index].MarriageID);
                    memberIdsToUpdate.push(membersChild[index].MarriageID);
                    // Thêm MarriageID vào danh sách cần update đời
                }

                memberIdsToUpdate.push(membersChild[index].MemberID);
                // Thêm MemberID vào danh sách cần update đời           

                listParentIDToCheck.push(membersChild[index].MemberID);
                // Thêm MemberID vào danh sách ParentID cần kiểm tra tiếp
            }
        }

        parentID = listParentIDToCheck.shift();
        // Cập nhật lại parentID để kiểm tra tiếp ở vòng lặp kế
    }

    // nếu có cái memberId nào = null ở trong memberIdsToUpdate thì xóa nó đi
    for (let index = 0; index < memberIdsToUpdate.length; index++) {
        if (memberIdsToUpdate[index] == null) {
            memberIdsToUpdate.splice(index, 1);
        }
    }
    // nếu mảng khác rỗng thì mới thực hiện tiếp
    if (memberIdsToUpdate.length != 0) {
        // Cập nhật generation = 0 , parentID = null, marriageID = null cho các member liên quan
        const queryUpdateRelatedMember = `
    UPDATE familymember 
    SET Generation = 0, ParentID = null, MarriageID = null
    WHERE MemberID IN (${memberIdsToUpdate.join(',')}) 
  `;
        console.log('queryUpdateRelatedMember: ', queryUpdateRelatedMember);
        db.connection.query(queryUpdateRelatedMember, (err, result) => {
            if (err) {
                console.error('Error updating generation: ', err);
            }
            console.log('Generation updated for members: ', memberIdsToUpdate);
        });
    }

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

function insertParentIdToMember(fatherID, motherID, memberID) {
    let query = `UPDATE familymember SET FatherID = ?, MotherID = ? WHERE MemberID = ?;`
    let values = [fatherID, motherID, memberID];
    db.connection.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("insert success");
        }
    }
    )
}

function insertFatherIDToMember(fatherID, memberID) {
    let query = `UPDATE familymember SET FatherID = ? WHERE MemberID = ?;`
    let values = [fatherID, memberID];
    db.connection.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("insert success");
        }
    }
    )
}

function insertMotherIDToMember(motherID, memberID) {
    let query = `UPDATE familymember SET MotherID = ? WHERE MemberID = ?;`
    let values = [motherID, memberID];
    db.connection.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("insert success");
        }
    }
    )
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

function setBirthOrder(birthOrder, memberId) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE familymember SET BirthOrder = ? WHERE MemberID = ?';
        db.connection.query(query, [birthOrder, memberId], (err, result) => {
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

function getMembersByFatherID(fatherID) {
    return new Promise((resolve, reject) => {
        const query = 'select * from familymember where fatherID = ?';
        db.connection.query(query, fatherID, (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function getMembersByMotherID(motherID) {
    return new Promise((resolve, reject) => {
        const query = 'select * from familymember where motherID = ?';
        db.connection.query(query, motherID, (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function getMembersByParentID(fatherID, motherID) {
    return new Promise((resolve, reject) => {
        const query = 'select * from familymember where fatherID = ? or motherID = ?';
        const values = [fatherID, motherID];
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


function getAllMember(codeID) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM familymember where CodeID = ?';
        db.connection.query(query, codeID, (err, result) => {
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
    getAllMember, InsertMarriIdToMember, queryFamilyMembers, getAllMemberInMemberRole, getAllMemberNotInMemberRole, GetCurrentParentMember,
    insertFatherIDToMember, insertMotherIDToMember, getMembersByFatherID, getMembersByMotherID, getMembersByParentID,
    setBirthOrder, insertParentIdToMember
};