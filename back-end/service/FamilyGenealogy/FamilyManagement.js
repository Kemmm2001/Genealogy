const db = require("../../Models/ConnectDB")
const CoreFunction = require("../../Utils/CoreFunction");
const MarriageManagement = require("./MarriageManagement");
// nguyễn anh tuấn
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
            GraveSite, Note, Generation, BloodType, CodeID, Male)
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
                member.Male
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

// nguyễn anh tuấn
function updateMember(member) {
    return new Promise(async (resolve, reject) => {
        try {
            const query = `
        UPDATE familymember 
        SET 
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
          BloodType = ?,
          Male = ?
        WHERE MemberID = ?
      `;

            const values = [
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
                member.BloodType,
                member.Male,
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

// nguyên anh tuấn
function updateMemberPhoto(memberPhotoUrl, memberId) {
    return new Promise(async (resolve, reject) => {
        console.log("Vào hàm updateMemberPhoto");
        try {
            let query = `UPDATE familymember SET Image = ? WHERE MemberID = ?`;
            let values = [memberPhotoUrl, memberId];
            db.connection.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
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

// nguyễn anh tuấn
function deleteMember(memberId) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Vào hàm deleteMember");
            console.log("memberId: " + memberId);
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

// nguyễn anh tuấn
async function deleteMemberRelated(member) {
    console.log(`chạy vào hàm deleteMemberRelated với member: ${JSON.stringify(member.MemberID)}`);

    // tìm tất cả người có fatherID hoặc motherID là memberId
    let children = await getMembersByParentID(member.MemberID);
    if (!Array.isArray(children)) {
        console.log("children không phải array");
    } else {
        if (children.length == 0) {
            console.log("children null");
            return;
        } else {
            for (let child of children) {
                console.log("child: " + child.MemberID);
                UpdateMemberRelated(child);
            }
        }

    }

}

function UpdateMemberRelated(member) {
    return new Promise((resolve, reject) => {
        console.log("Vào hàm UpdateMemberRelated với member: " + JSON.stringify(member.MemberID));
        if (CoreFunction.isEmptyOrNullOrSpaces(member)) {
            console.log("member null");
            resolve();
        }
        // Nếu là con trai, tìm các con có fatherID = memberId
        let children = getMembersByParentID(member.MemberID);
        console.log("children: " + JSON.stringify(children));

        // kiểm tra xem children có phải array ko 
        if (!Array.isArray(children)) {
            console.log("children không phải array");
        } else {
            if (children.length == 0) {
                console.log("children null");
                resolve();
            } else {
                for (let child of children) {
                    console.log("child: " + JSON.stringify(child));
                    UpdateMemberRelated(child);
                }
            }

        }
        // update đời cho thành viên hiện tại
        UpdateMemberGenerationToZero(member.MemberID);

    });
}


function UpdateMemberGenerationToZero(memberId) {
    return new Promise((resolve, reject) => {
        console.log("Vào hàm UpdateMemberGenerationToZero với memberId: " + memberId);
        const query = 'UPDATE familymember SET Generation = 0, FatherID = null, MotherID = null WHERE MemberID = ?';
        db.connection.query(query, memberId, (err, result) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
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
// nguyễn anh tuấn
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

// nguyễn anh tuấn
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
        console.log("Vào hàm getMembersByParentID với fatherID: " + fatherID + " và motherID: " + motherID);
        const query = 'select * from familymember where fatherID = ? and motherID = ?';
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
function getMembersByParentID(parentID) {
    return new Promise((resolve, reject) => {
        console.log("Vào hàm getMembersByParentID với parentID: " + parentID);
        const query = 'select * from familymember where fatherID = ? or motherID = ?';
        const values = [parentID, parentID];
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

function getAllMemberID(codeID) {
    return new Promise((resolve, reject) => {
        if (!codeID) {
            reject('Invalid CodeID');
            return;
        }

        const query = `SELECT MemberID FROM genealogy.familymember WHERE CodeID = '${codeID}'`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.error('Error querying the database:', err);
                reject('Error querying the database');
            } else {
                resolve(result);
            }
        });
    });
}



function getMemberByMemberID(memberID) {
    return new Promise((resolve, reject) => {
        console.log("Vào hàm getMemberByMemberID với memberID: " + memberID);
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
    addMember, updateMember, deleteMember, getMember, createRelationship, searchMember, getMemberByMemberID,
    setGeneration, queryContactMembers,
    getAllMember, InsertMarriIdToMember, queryFamilyMembers, getAllMemberInMemberRole, getAllMemberNotInMemberRole, GetCurrentParentMember,
    insertFatherIDToMember, insertMotherIDToMember, getMembersByFatherID, getMembersByMotherID, getMembersByParentID,
    setBirthOrder, insertParentIdToMember, getAllMemberID, updateMemberPhoto, deleteMemberRelated
};