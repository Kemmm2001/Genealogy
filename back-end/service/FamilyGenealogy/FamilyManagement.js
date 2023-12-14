const db = require("../../Models/ConnectDB")
const CoreFunction = require("../../Utils/CoreFunction");
const MarriageManagement = require("./MarriageManagement");
// nguyễn anh tuấn
function addMember(member) {
    return new Promise(async (resolve, reject) => {
        console.log("Vào hàm addMember ");
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

            let result = await coreQuery(query, values);
            resolve(result);

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

            let result = await coreQuery(query, values);
            resolve(result);
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
            let result = await coreQuery(query, values);
            resolve(result);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}


//Nguyễn Lê Hùng
async function RemoveAllRelationshipChild(id) {
    try {
        let queryFindParent = `SELECT * FROM familymember WHERE FatherID = ${id} OR MotherID = ${id}`;
        console.log('queryFindParent: ' + queryFindParent)
        db.connection.query(queryFindParent, async (err, result) => {
            if (!err && result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    let child = result[i];
                    let childID = child.MemberID;
                    console.log('childID: ' + childID)

                    let queryFindMarried = `SELECT * FROM marriage WHERE husbandID = ${id} OR wifeID = ${id}`;
                    db.connection.query(queryFindMarried, async (err, marriedResult) => {
                        if (!err && marriedResult.length > 0) {
                            // Update tất cả Generation của vợ chồng = 0 ở đây
                            for (let j = 0; j < marriedResult.length; j++) {
                                let marriage = marriedResult[j];
                                let marriedChildID = marriage.MemberID;
                                let updateMarriedQuery = `UPDATE familymember SET FatherID = null, MotherID = null, Generation = 0 WHERE MemberID = ${marriedChildID}`;
                                db.connection.query(updateMarriedQuery, (err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                            }

                            // Tiếp tục xóa vợ quan hệ ở bảng vợ chồng ở đây
                            let removeMarried = `DELETE FROM marriage WHERE husbandID = ${id} OR wifeID = ${id}`;
                            db.connection.query(removeMarried, (err) => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        }
                    });

                    let updateQuery = `UPDATE familymember SET FatherID = null, MotherID = null, Generation = 0 WHERE MemberID = ${childID}`;
                    db.connection.query(updateQuery, (err) => {
                        if (err) {
                            console.log(err);
                        } else {

                        }
                    });

                    // Gọi đệ quy để xóa tất cả các mối quan hệ của các con cái
                    await RemoveAllRelationshipChild(childID);
                }
            }
        });

    } catch (error) {
        console.log(error);
    }
}


// nguyễn anh tuấn
function deleteMember(memberId) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Vào hàm deleteMember");
            console.log("memberId: " + memberId);
            // await RemoveAllRelationshipChild(memberId)
            // bắt đầu xóa member
            const query = 'DELETE FROM familymember WHERE MemberID = ?';
            const values = [memberId];
            let result = await coreQuery(query, values);
            resolve(result);
        } catch (err) {
            db.connection.rollback();
            console.log(err);
            reject(err);
        }
    });
}

// nguyễn anh tuấn
function UpdateMemberRelated(member, listMember) {
    return new Promise(async (resolve, reject) => {
        console.log("Vào hàm UpdateMemberRelated với member: " + JSON.stringify(member.MemberID));
        if (CoreFunction.isEmptyOrNullOrSpaces(member.MemberID)) {
            console.log("member null");
            resolve();
        }
        // tìm tất cả người có mối quan hệ vợ chồng với memberId
        let marriedMember = await MarriageManagement.getMarriageByHusbandIDOrWifeID(member.MemberID, member.MemberID);
        if (marriedMember.length == 0) {
            console.log(`marriedMember của member.MemberID : ${member.MemberID} là null`);
            resolve();
        } else {
            for (let married of marriedMember) {
                // xóa mối quan hệ vợ chồng
                await MarriageManagement.deleteMarriage(married.MarriageID);
                let children = [];
                if (married.husbandID == member.MemberID) {
                    // cho generation của vợ = 0
                    await UpdateMemberGenerationToZero(married.wifeID);
                    // tìm tất cả người có fatherID hoặc motherID là memberId
                    children = findMemberByHusbandIDOrWifeID(married.wifeID, married.wifeID, listMember);

                } else if (married.wifeID == member.MemberID) {
                    // cho generation của chồng = 0
                    await UpdateMemberGenerationToZero(married.husbandID);
                    // tìm tất cả người có fatherID hoặc motherID là memberId
                    children = findMemberByHusbandIDOrWifeID(married.husbandID, married.husbandID, listMember);
                }
                if (children.length == 0) {
                    console.log(`children của member.MemberID : ${member.MemberID} là null`);
                    resolve();
                } else {
                    for (let child of children) {
                        UpdateMemberRelated(child, listMember);
                    }
                }

            }
        }
        // tìm tất cả người có fatherID hoặc motherID là memberId
        let children = await getMembersByFatherIDOrMotherID(member.MemberID, member.MemberID);
        if (children.length == 0) {
            console.log(`children của member.MemberID : ${member.MemberID} là null`);
            resolve();
        } else {
            for (let child of children) {
                console.log("child: " + JSON.stringify(child));
                UpdateMemberRelated(child);
            }
        }

        // update đời cho thành viên hiện tại
        await UpdateMemberGenerationToZero(member.MemberID);

    });
}

// nguyễn anh tuấn
function UpdateMemberGenerationToZero(memberId) {
    return new Promise(async (resolve, reject) => {
        console.log("Vào hàm UpdateMemberGenerationToZero với memberId: " + memberId);
        const query = 'UPDATE familymember SET Generation = 0, FatherID = null, MotherID = null WHERE MemberID = ?';
        const values = [memberId];
        let result = await coreQuery(query, values);
        resolve(result);
    })
}


// nguyễn anh tuấn
function insertParentIdToMember(fatherID, motherID, memberID) {
    return new Promise(async (resolve, reject) => {
        let query = `UPDATE familymember SET FatherID = ?, MotherID = ? WHERE MemberID = ?;`
        let values = [fatherID, motherID, memberID];
        let result = await coreQuery(query, values);
        resolve(result);
    })
}
// nguyễn anh tuấn
function insertFatherIDToMember(fatherID, memberID) {
    return new Promise(async (resolve, reject) => {
        let query = `UPDATE familymember SET FatherID = ? WHERE MemberID = ?;`
        let values = [fatherID, memberID];
        let result = await coreQuery(query, values);
        resolve(result);
    })
}

// nguyễn anh tuấn
function insertMotherIDToMember(motherID, memberID) {
    return new Promise(async (resolve, reject) => {
        console.log("Vào hàm insertMotherIDToMember với motherID: " + motherID + " và memberID: " + memberID);
        let query = `UPDATE familymember SET MotherID = ? WHERE MemberID = ?;`
        let values = [motherID, memberID];
        let result = await coreQuery(query, values);
        resolve(result);
    })
}

// nguyễn anh tuấn
function setGeneration(generation, memberId) {
    return new Promise(async (resolve, reject) => {
        console.log("Vào hàm setGeneration với generation: " + generation + " và memberId: " + memberId);
        const query = 'UPDATE familymember SET Generation = ? WHERE MemberID = ?';
        const values = [generation, memberId];
        let result = await coreQuery(query, values);
        resolve(result);
    })
}

// nguyễn anh tuấn
function setRole(roleId, memberId) {
    return new Promise(async (resolve, reject) => {
        console.log("Vào hàm setRole với roleId: " + roleId + " và memberId: " + memberId);
        const query = 'UPDATE familymember SET RoleID = ? WHERE MemberID = ?';
        const values = [roleId, memberId];
        let result = await coreQuery(query, values);
        resolve(result);
    })
}

// nguyễn anh tuấn
function setBirthOrder(birthOrder, memberId) {
    return new Promise(async (resolve, reject) => {
        console.log("Vào hàm setBirthOrder với birthOrder: " + birthOrder + " và memberId: " + memberId);
        const query = 'UPDATE familymember SET BirthOrder = ? WHERE MemberID = ?';
        const values = [birthOrder, memberId];
        let result = await coreQuery(query, values);
        resolve(result);
    })
}

// nguyễn anh tuấn
function getMembersByFatherID(fatherID) {
    return new Promise(async (resolve, reject) => {
        const query = 'select * from familymember where fatherID = ?';
        const values = [fatherID];
        let result = await coreQuery(query, values);
        resolve(result);
    });
}

// nguyễn anh tuấn
function getMembersByOnlyFatherID(fatherID) {
    return new Promise(async (resolve, reject) => {
        const query = 'select * from familymember where fatherID = ? and (MotherID is null or MotherID = 0)';
        const values = [fatherID];
        let result = await coreQuery(query, values);
        resolve(result);
    });
}

// nguyễn anh tuấn
function getMembersByOnlyMotherID(motherID) {
    return new Promise(async (resolve, reject) => {
        const query = 'select * from familymember where motherID = ? and (FatherID is null or FatherID = 0)';
        const values = [motherID];
        let result = await coreQuery(query, values);
        resolve(result);
    });
}

// nguyễn anh tuấn
function getMembersByMotherID(motherID) {
    return new Promise(async (resolve, reject) => {
        const query = 'select * from familymember where motherID = ?';
        const values = [motherID];
        let result = await coreQuery(query, values);
        resolve(result);
    });
}

// nguyễn anh tuấn
function getMembersByFatherIDAndMotherID(fatherID, motherID) {
    return new Promise(async (resolve, reject) => {
        console.log("Vào hàm getMembersByFatherIDAndMotherID với fatherID: " + fatherID + " và motherID: " + motherID);
        const query = 'select * from familymember where fatherID = ? and motherID = ?';
        const values = [fatherID, motherID];
        let result = await coreQuery(query, values);
        resolve(result);
    })
}

// nguyễn anh tuấn
function getMembersByFatherIDOrMotherID(fatherID, motherID) {
    return new Promise(async (resolve, reject) => {
        console.log("Vào hàm getMembersByFatherIDOrMotherID với fatherID: " + fatherID + " và motherID: " + motherID);
        const query = 'select * from familymember where fatherID = ? or motherID = ?';
        const values = [fatherID, motherID];
        let result = await coreQuery(query, values);
        resolve(result);
    })
}

// nguyễn anh tuấn
function updateFatherIDToMotherID(fatherID, memberList) {
    return new Promise(async (resolve, reject) => {
        console.log("Vào hàm updateFatherIDToMotherID với memberList: " + JSON.stringify(memberList));
        if (CoreFunction.isEmptyOrNullOrSpaces(memberList)) {
            console.log("memberList null");
            resolve();
        }
        const query = 'UPDATE familymember SET FatherID = null, MotherID = ? WHERE MemberID in (?)';
        const values = [fatherID, memberList];
        let result = await coreQuery(query, values);
        resolve(result);
    });
}

// nguyễn anh tuấn
function updateMotherIDToFatherID(motherID, memberList) {
    return new Promise(async (resolve, reject) => {
        console.log("Vào hàm updateMotherIDToFatherID với memberList: " + JSON.stringify(memberList));
        if (CoreFunction.isEmptyOrNullOrSpaces(memberList)) {
            console.log("memberList null");
            resolve();
        }
        const query = 'UPDATE familymember SET FatherID = ?, MotherID = null WHERE MemberID in (?)';
        const values = [motherID, memberList];
        let result = await coreQuery(query, values);
        resolve(result);
    });
}

// nguyễn anh tuấn
function getMaxBirthOrderByFatherIdOrMotherId(fatherId, motherId) {
    return new Promise(async (resolve, reject) => {
        const query = `
        SELECT MAX(BirthOrder) AS MaxBirthOrder FROM familymember
        WHERE FatherID = ? OR MotherID = ?
        `;
        const values = [fatherId, motherId];
        let result = await coreQuery(query, values);
        resolve(result);
    });
}

// nguyễn anh tuấn
function getMaxBirthOrderByFatherID(fatherId) {
    return new Promise(async (resolve, reject) => {
        const query = `
        SELECT MAX(BirthOrder) AS MaxBirthOrder FROM familymember
        WHERE FatherID = ? and (MotherID is null or MotherID = 0);
        `;
        const values = [fatherId];

        let result = await coreQuery(query, values);
        resolve(result);
    });
}

// nguyễn anh tuấn
function getMaxBirthOrderByMotherID(motherId) {
    return new Promise(async (resolve, reject) => {
        const query = `
        SELECT MAX(BirthOrder) AS MaxBirthOrder FROM familymember
        WHERE MotherID = ? and (FatherID is null or FatherID = 0);
        `;
        const values = [motherId];
        let result = await coreQuery(query, values);
        resolve(result);
    });
}

// nguyễn anh tuấn
function coreQuery(query, values) {
    return new Promise((resolve, reject) => {
        if (values == null) {
            db.connection.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        } else {
            db.connection.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        }
    })
}

function searchMember(searchTerm) {
    return new Promise(async (resolve, reject) => {
        const query = `
        SELECT * FROM familymember
        WHERE MemberName LIKE ?
        `;

        const values = [`%${searchTerm}%`];

        let result = await coreQuery(query, values);
        resolve(result);
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




// nguyễn anh tuấn
const findMemberByHusbandIDAndWifeID = (husbandID, wifeID, listMember) => {
    console.log(`Vào hàm findMemberByHusbandIDOrWifeID với những thông tin sau: husbandID = ${husbandID}, wifeID = ${wifeID}, listMember = ${JSON.stringify(listMember)}`)
    // nếu listMember không phải array
    if (!Array.isArray(listMember)) return [];
    const matchingMembers = [];
    for (let i = 0; i < listMember.length; i++) {
        const member = listMember[i];
        if (member.husbandID === husbandID && member.wifeID === wifeID) {
            matchingMembers.push(member);
        }
    }

    return matchingMembers;
};

// nguyễn anh tuấn
const findMemberByHusbandIDOrWifeID = (husbandID, wifeID, listMember) => {
    console.log(`Vào hàm findMemberByHusbandIDOrWifeID với những thông tin sau: husbandID = ${husbandID}, wifeID = ${wifeID}, listMember = ${JSON.stringify(listMember)}`)
    // nếu listMember không phải array
    if (!Array.isArray(listMember)) return [];
    const matchingMembers = [];
    for (let i = 0; i < listMember.length; i++) {
        const member = listMember[i];
        if (member.husbandID === husbandID || member.wifeID === wifeID) {
            matchingMembers.push(member);
        }
    }

    return matchingMembers;
};
123
function getAllMember(codeID) {
    return new Promise((resolve, reject) => {
        try {
            if (codeID) {
                const query = 'SELECT * FROM familymember where CodeID = ?';
                db.connection.query(query, codeID, (err, result) => {
                    if (err) {
                        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            }
        } catch (error) {
            reject(error)
        }
    });
}

function getAllMembersInGenalogy(CodeID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM familymember where CodeID = ${CodeID} and Generation != 0`;
            db.connection.query(query, (err, result) => {
                if (!err && result.length > 0) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
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
    addMember, updateMember, deleteMember, searchMember, getMemberByMemberID,
    setGeneration, queryContactMembers,
    getAllMember, queryFamilyMembers,
    insertFatherIDToMember, insertMotherIDToMember, getMembersByFatherID, getMembersByMotherID,
    setBirthOrder, insertParentIdToMember, getAllMemberID, updateMemberPhoto,
    getMembersByFatherIDAndMotherID, getMembersByFatherIDOrMotherID, updateFatherIDToMotherID,
    updateMotherIDToFatherID, UpdateMemberRelated, getMaxBirthOrderByFatherIdOrMotherId, getMaxBirthOrderByFatherID,
    getMaxBirthOrderByMotherID, getMembersByOnlyFatherID, getMembersByOnlyMotherID, setRole, getAllMembersInGenalogy
};