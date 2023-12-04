const { Code } = require("mongodb");
const db = require("../../Models/ConnectDB");

//Nguyễn Lê Hùng
function getlistMemberToSendMessage(CodeID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `select *  from genealogy.familymember where CodeID = ${CodeID} and Generation != 0 and IsDead = 0`;
            db.connection.query(query, (err, results) => {
                if (!err && results.length > 0) {
                    resolve(results)
                } else {
                    reject(err)
                }

            })

        } catch (error) {
            reject(error)
        }
    })
}

//Nguyễn Lê Hùng
function getAllReligion() {
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM religion";
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
//Nguyễn Lê Hùng
async function RemoveAllRelationshipChild(id) {
    try {
        let queryFindParent = `SELECT * FROM familymember WHERE FatherID = ${id} Or MotherID = ${id}`;
        db.connection.query(queryFindParent, (err, result) => {
            if (!err && result.length > 0) {
                result.forEach(async (child) => {
                    let childID = child.MemberID;
                    let updateQuery = `UPDATE familymember SET FatherID = null,MotherID = null, Generation = 0 WHERE MemberID = ${childID}`;
                    db.connection.query(updateQuery, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    });

                    await RemoveAllRelationshipChild(childID);
                });
            }
        });

    } catch (error) {
        console.log(error);
    }
}
//Nguyễn Lê Hùng
async function RemoveRelationshipChild(id) {
    try {
        let updateQuery = `UPDATE familymember SET FatherID = null,MotherID = null, Generation = 0 WHERE MemberID = ${id}`;

        await new Promise((resolve, reject) => {
            db.connection.query(updateQuery, (err, result) => {
                if (!err) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });

        await RemoveAllRelationshipChild(id);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
//Nguyễn Lê Hùng
async function removeMarried(husbandID, wifeID, idRemove) {
    try {
        let queryRemoveMarried = `delete from marriage where husbandID = ${husbandID} and wifeID = ${wifeID}`;
        console.log('queryRemoveMarried: ' + queryRemoveMarried)
        db.connection.query(queryRemoveMarried, (err) => {
            if (err) {
                console.log(err)
            }
        });

        let queryRemoveMarriedAndGeneration = `UPDATE familymember SET Generation = 0 WHERE MemberID = ${idRemove}`;
        db.connection.query(queryRemoveMarriedAndGeneration, (err) => {
            if (err) {
                console.log(err)
            }
        });
    } catch (error) {
        console.log(error)
    }
}
//Nguyễn Lê Hùng

async function RemoveRelationshipMarried(currentID, RemoveID) {
    return new Promise((resolve, reject) => {
        try {
            let queryFindParent = `SELECT FatherID,MotherID,Male FROM genealogy.familymember WHERE MemberID = ${currentID}`;
            db.connection.query(queryFindParent, (err, result) => {
                if (!err && result.length > 0) {
                    if (result[0].Male == 1) {
                        removeMarried(currentID, RemoveID, currentID);
                    } else {
                        removeMarried(RemoveID, currentID, currentID);
                    }
                    resolve(true);
                } else {
                    if (result[0].Male == 1) {
                        removeMarried(currentID, RemoveID, RemoveID);
                    } else {
                        removeMarried(RemoveID, currentID, RemoveID);
                    }
                    resolve(true);
                }
            });
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}
//Nguyễn Lê Hùng
async function RemoveParent(RemoveChild) {
    try {
        let queryRemove = `UPDATE familymember SET MarriageID = null, Generation = 0 WHERE MemberID = ${RemoveChild}`;
        db.connection.query(queryRemove, (err) => {
            if (err) {
                console.log(err)
            }
        });
        let queryFindMarried = `select * from genealogy.familymember where MarriageID = ${RemoveChild}`;
        db.connection.query(queryFindMarried, async (err, result) => {
            if (!err && result.length > 0) {
                let queryRemove = `UPDATE familymember SET MarriageID = null WHERE MemberID = ${result[0].MemberID}`;
                db.connection.query(queryRemove, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}
//Nguyễn Lê Hùng
async function RemoveRelationshipParent(currentID, RemoveID) {
    return new Promise((resolve, reject) => {
        try {
            let queryFindParent = `select ParentID from genealogy.familymember where MemberID = ${RemoveID}`;
            db.connection.query(queryFindParent, async (err, result) => {
                console.log(result.length)
                if (!err && result.length > 0 && result[0].ParentID) {

                    await RemoveRelationshipChild(currentID)
                    resolve(true);
                } else {
                    console.log(RemoveID)
                    await RemoveParent(RemoveID)
                    resolve(true);
                }
            })
        } catch (error) {
            console.log(error);
            reject(false);
        }
    })

}
//Nguyễn Lê Hùng
function getAllMemberRole(id) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM memberrole where MemberID = '${id}'`;
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
//Nguyễn Lê Hùng
function getAllNationality() {
    return new Promise((resolve, reject) => {
        let query = "select * from nationality";
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


//Nguyễn Lê Hùng
function getInforMember(id) {
    return new Promise((resolve, reject) => {
        let query = `select * from familymember where MemberID = '${id}'`;
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
//Nguyễn Lê Hùng
function getContactMember(id) {
    return new Promise((resolve, reject) => {
        let query = `select * from contact where MemberID = '${id}'`;
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
//Nguyễn Lê Hùng
function getJobMember(id) {
    return new Promise((resolve, reject) => {
        let query = `select * from job where MemberID = '${id}'`;
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
//Nguyễn Lê Hùng
function getEducationMember(id) {
    return new Promise((resolve, reject) => {
        let query = `select * from education where MemberID = '${id}'`;
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

//Nguyễn Lê Hùng
function getEventMember(id) {
    return new Promise((resolve, reject) => {
        let query = `select * from eventmember where MemberID = '${id}'`;
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


//Nguyễn Lê Hùng
function getRoleExist(MemberID, Role) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM memberrole
        where MemberID = ${MemberID} and RoleID = ${Role}`;
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
//Nguyễn Lê Hùng
function turnOffSQL_SAFE_UPDATES() {
    let query = "SET SQL_SAFE_UPDATES = 0";
    db.connection.query(query, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        } else {
            console.log("remove succesfully")
        }
    })
}
//Nguyễn Lê Hùng
function turnOnSQL_SAFE_UPDATES() {
    let query = "SET SQL_SAFE_UPDATES = 1";
    db.connection.query(query, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        } else {
            console.log("remove succesfully")
        }
    })
}

//Nguyễn Lê Hùng
function ResetAllGenerationMember(CodeID) {
    let query = `UPDATE familymember
    SET Generation = 0
    where CodeID = '${CodeID}'`;
    db.connection.query(query, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        } else {
            console.log("remove succesfully")
        }
    })
}

//Nguyễn Lê Hùng
function setAllGenerationMember(memberId, generation) {
    const updateQuery = `update familymember Set Generation =  ${generation}  where MemberID = ${memberId}`;
    db.connection.query(updateQuery, (err, results) => {
        if (err) console.log(error);;

        //Tìm tất cả mối hôn nhân hiện tại
        const findMarriesQuery = `SELECT * FROM familymember where MemberID = ${memberId}`;
        db.connection.query(findMarriesQuery, (err, childResults) => {
            if (err) console.log(error);;

            childResults.forEach((child) => {
                if (child.MarriageID != null) {
                    setAllGenerationMember(child.MarriageID, generation);
                }
            });
        });

        // Tìm tất cả các con của thành viên hiện tại        
        const findChildrenQuery = `SELECT * FROM familymember where ParentID = ${memberId}`;
        db.connection.query(findChildrenQuery, (err, childResults) => {
            if (err) console.log(error);;

            childResults.forEach((child) => {
                setAllGenerationMember(child.MemberID, generation + 1);
            });
        });
    });
}

//Nguyễn Lê Hùng
function searchMemberCanSendMessage(CodeID, keySearch) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM genealogy.familymember WHERE CodeID = ${CodeID} and IsDead = 0 and Generation != 0 and MemberName like '%${keySearch}%'`;
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

//Nguyễn Lê Hùng
function getListUnspecifiedMembers(CodeID) {
    return new Promise((resolve, reject) => {
        try {
            if (CodeID != undefined) {
                let query = `SELECT * FROM genealogy.familymember
                where Generation = 0 and CodeID = ${CodeID}`;
                db.connection.query(query, (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    })
}


//Nguyễn Lê Hùng
async function getLivingFamilyMember(memberID) {
    return new Promise((resolve, reject) => {
        try {
            let queryGetFamilyHead = `SELECT * FROM familymember WHERE MemberID = ${memberID}`;
            db.connection.query(queryGetFamilyHead, async (err, results) => {
                if (!err) {
                    if (results.length > 0) {
                        let familyHead = results[0];

                        if (familyHead.IsDead == 0) {
                            resolve(familyHead.MemberID);
                        } else {
                            let queryGetSons = `SELECT MemberID FROM familymember WHERE FatherID = ${memberID} AND Male = 1 ORDER BY BirthOrder`;
                            db.connection.query(queryGetSons, async (err, resultGetSon) => {
                                if (!err && resultGetSon.length > 0) {
                                    for (let son of resultGetSon) {
                                        let livingSonID = await getLivingFamilyMember(son.MemberID);
                                        if (livingSonID) {
                                            resolve(livingSonID);
                                            return;
                                        }
                                    }
                                }
                                reject(false);
                            });
                        }
                    } else {
                        // Không tìm thấy thông tin cho MemberID
                        reject(false);
                    }
                } else {
                    reject(false);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}


//Nguyễn Lê Hùng
async function getListChildWithWifeID(husbandID, wifeID) {
    return new Promise((resolve, reject) => {
        try {
            let queryListChild = `select *  from familymember where FatherID = ${husbandID} and MotherID = ${wifeID} and Male = 1 order by BirthOrder`;
            db.connection.query(queryListChild, async (err, result) => {
                if (!err && result.length > 0) {
                    for (let i = 0; i < result.length; i++) {
                        let resultFamilyHead = await getLivingFamilyMember(result[i].MemberID)
                        if (resultFamilyHead != false) {
                            resolve(resultFamilyHead)
                            return
                        }
                    }
                    reject(false);
                } else {
                    reject(false)
                }
            })
        } catch (error) {

        }
    })
}

//Nguyễn Lê Hùng
async function getFamilyHeadInGenealogy(CodeID) {
    return new Promise(async (resolve, reject) => {
        try {
            let IdPaternal = await GetIdPaternalAncestor(CodeID);
            if (IdPaternal) {
                IdPaternal = IdPaternal.MemberID;
                let queryGetFirstWife = `select wifeID from marriage where husbandID = ${IdPaternal} order by MarriageNumber`;
                db.connection.query(queryGetFirstWife, async (err, result) => {
                    if (!err && result.length > 0) {
                        for (let i = 0; i < result.length; i++) {
                            try {
                                let resultFamilyHead = await getListChildWithWifeID(IdPaternal, result[i].wifeID);
                                if (resultFamilyHead !== false) {
                                    resolve(resultFamilyHead);
                                    return;
                                }
                            } catch (errorInGetListChild) {
                                console.error(`Error in getListChildWithWifeID: ${errorInGetListChild}`);
                            }
                        }
                        // Nếu không tìm thấy kết quả, gọi reject ở đây
                        console.log("Không tìm thấy Family Head");
                        reject(false);
                    } else {
                        console.log("Lỗi truy vấn");
                        reject(err);
                    }
                })
            }
        } catch (error) {
            console.log(error);
            reject(false); // Gọi reject nếu có lỗi trong try-catch
        }
    })
}



//Nguyễn Lê Hùng
async function RelationShipMember(CodeID, memberId) {
    return new Promise(async (resolve, reject) => {
        try {
            let objRelationship = {};
            // Lấy thông tin từ bảng familymember
            let getMemberQuery = `SELECT * FROM genealogy.familymember WHERE CodeID = '${CodeID}'`;
            db.connection.query(getMemberQuery, async (err, result) => {
                if (!err) {
                    let dataMarriage = await getAllMarriage(CodeID);
                    let data = result.find((element) => element.MemberID == memberId);
                    if (data.FatherID) {
                        objRelationship.Father = result.find((element) => element.MemberID == data.FatherID);
                    }
                    if (data.MotherID) {
                        objRelationship.Mother = result.find((element) => element.MemberID == data.MotherID);
                    }
                    if (data.Male == 1) {
                        let marriage = dataMarriage.filter((element) => element.husbandID == memberId);
                        if (marriage.length > 0) {
                            let wives = marriage.map((marriageElement) => {
                                return result.find((element) => element.MemberID == marriageElement.wifeID);
                            });
                            objRelationship.Wife = wives;
                        }
                    } else {
                        let marriage = dataMarriage.filter((element) => element.wifeID == memberId);
                        if (marriage.length > 0) {
                            let husbands = marriage.map((marriageElement) => {
                                return result.find((element) => element.MemberID == marriageElement.husbandID);
                            });
                            objRelationship.Husband = husbands;
                        }
                    }
                    let child = result.filter((element) => element.FatherID == memberId || element.MotherID == memberId);
                    if (child.length > 0) {
                        objRelationship.child = child;
                    }

                    resolve(objRelationship);
                } else {
                    reject(err);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}


//Nguyễn Lê Hùng
function GetIdPaternalAncestor(CodeID) {
    return new Promise((resolve, reject) => {
        let query = `select MemberID from memberrole
        where CodeId = '${CodeID}' and RoleID = 1`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(result[0])
            }
        })
    })
}

function getAllMarriage(CodeID) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM marriage where CodeID = ${CodeID}`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

async function GetGenealogy(result, dataMarriage, MemberID, ListFamily = [], visitedMembers = new Set()) {
    if (visitedMembers.has(MemberID)) {
        return ListFamily;
    }

    visitedMembers.add(MemberID);

    let Member = result.find(member => member.MemberID == MemberID);

    let marriages;

    if (Member.Male == 1) {
        marriages = dataMarriage.filter(member => member.husbandID == MemberID);

    } else {
        marriages = dataMarriage.filter(member => member.wifeID == MemberID);
    }

    marriages.sort((a, b) => b.MarriageNumber - a.MarriageNumber);


    let spouseIDs = marriages.map(marriage => Member.Male == 1 ? marriage.wifeID : marriage.husbandID);
    let spouses = result.filter(member => spouseIDs.includes(member.MemberID));

    let spouseMemberIDs = spouses.map(spouse => spouse.MemberID);

    let [familyData, spouseDataArray] = await Promise.all([
        createFamilyData(Member, result, spouseMemberIDs),
        Promise.all(spouses.map(spouse => createFamilyData(spouse, result, Member.MemberID)))
    ]);

    if (!isMemberInList(ListFamily, familyData)) {
        ListFamily.push(familyData);
    }

    for (let spouseData of spouseDataArray) {
        if (!isMemberInList(ListFamily, spouseData)) {
            ListFamily.push(spouseData);
        }
    }

    let children = result.filter(member => member.FatherID == MemberID || member.MotherID == MemberID);
    for (let child of children) {

        await GetGenealogy(result, dataMarriage, child.MemberID, ListFamily, visitedMembers);
    }

    return ListFamily;
}



// Helper function to check if a member is already in the list
function isMemberInList(list, member) {
    return list.some(existingMember => existingMember.id === member.MemberID);
}

//Nguyễn Lê Hùng
function getListMessage(CodeID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM genealogy.notificationhistory where CodeID = '${CodeID}'`;
            db.connection.query(query, (err, result) => {
                if (err) {
                    console.log(err)
                    reject(err);
                } else {
                    resolve(result)
                }
            })
        } catch (error) {
            console.log(error)
        }
    })
}

function getListNotificationEmail(CodeId) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM genealogy.notificationemail where CodeID = '${CodeId}'`;
            db.connection.query(query, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        } catch (error) {

        }
    })
}


//Nguyễn Lê Hùng
async function ViewFamilyTree(CodeID) {
    return new Promise((resolve, reject) => {
        try {
            let queryGetAllMember = `SELECT * FROM genealogy.familymember WHERE CodeID = '${CodeID}'`;
            db.connection.query(queryGetAllMember, async (err, result) => {
                if (!err) {
                    let IdPaternal = await GetIdPaternalAncestor(CodeID);
                    let dataMarriage = await getAllMarriage(CodeID);
                    if (IdPaternal == null && IdPaternal == undefined) {
                        reject(false)
                    } else {
                        let data = await GetGenealogy(result, dataMarriage, IdPaternal.MemberID)
                        resolve(data)
                    }
                }
            })
        } catch (e) {
            console.log(e);
            reject(false)
        }
    });
}

// Hàm tạo đối tượng familyData từ dữ liệu thành viên
async function createFamilyData(member, result, marriedArray) {
    try {
        if (member !== undefined) {
            let fid = '';
            let mid = '';
            let pids = [];

            if (member.Generation !== 1) {
                if (member.FatherID != null && member.FatherID != 0) {
                    let father = result.find(parent => parent.MemberID == member.FatherID);
                    if (father) {
                        fid = father.MemberID;
                    }
                }

                if (member.MotherID != null && member.MotherID != 0) {
                    let mother = result.find(parent => parent.MemberID == member.MotherID);
                    if (mother) {
                        mid = mother.MemberID;
                    }
                }
            }

            // Kiểm tra kiểu dữ liệu của marriedArray
            if (Array.isArray(marriedArray)) {
                pids = marriedArray;
            } else {
                pids = [marriedArray];
            }

            return {
                id: member.MemberID,
                pids: pids,
                fid: fid,
                mid: mid,
                name: member.MemberName,
                gender: member.Male === 1 ? 'male' : 'female',
                dob: formatDOB(member.Dob),
                dod: formatDOB(member.Dod),
                isDead: member.IsDead,
                generation: member.Generation,
                img: member.Image
            };
        }
    } catch (error) {
        console.log(error);
    }
}


function formatDOB(dateString) {

    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Tạo chuỗi ngày sinh đã được định dạng (ví dụ: "25-02-2001")
    const formattedDOB = `${day}-${month}-${year}`;

    return formattedDOB;
}

async function setRoleMember(MemberId, roleId, CodeId) {
    try {
        let query = `INSERT INTO memberrole (MemberID, RoleID,CodeId) VALUES ('${MemberId}', '${roleId}','${CodeId}')`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            } else {
                console.log('Đã thêm vai trò thành công.');
            }
        });
    } catch (e) {
        console.error('Lỗi trong quá trình thêm vai trò:', e);
    }
}


function removePaternalAncestor(CodeID) {
    let query = `DELETE FROM memberrole WHERE RoleID = 1 and CodeId =  ${CodeID}`;
    db.connection.query(query, (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
        } else {
            console.log("remove succesfully")
        }
    })
}






module.exports = {
    getAllReligion, getInforMember, getContactMember, getEducationMember, getJobMember, getEventMember, getAllNationality, getAllMemberRole,
    getRoleExist, setRoleMember, removePaternalAncestor, turnOnSQL_SAFE_UPDATES, turnOffSQL_SAFE_UPDATES, getListMessage,
    setAllGenerationMember, ResetAllGenerationMember, ViewFamilyTree, getListUnspecifiedMembers, GetIdPaternalAncestor, RelationShipMember,
    RemoveRelationshipChild, RemoveRelationshipMarried, RemoveRelationshipParent, getListNotificationEmail, getAllMarriage, getFamilyHeadInGenealogy,
    searchMemberCanSendMessage, getlistMemberToSendMessage
}