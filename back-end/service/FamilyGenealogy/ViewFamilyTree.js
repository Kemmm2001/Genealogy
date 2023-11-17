const db = require("../../Models/ConnectDB")

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

async function RemoveAllRelationshipChild(id) {
    try {
        let queryFindParent = `SELECT * FROM familymember WHERE ParentID = ${id}`;
        db.connection.query(queryFindParent, (err, result) => {
            if (!err && result.length > 0) {
                result.forEach(async (child) => {
                    let childID = child.MemberID;
                    let updateQuery = `UPDATE familymember SET Generation = 0 WHERE MemberID = ${childID}`;
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

async function RemoveRelationshipChild(id) {
    try {
        let updateQuery = `UPDATE familymember SET ParentID = null, Generation = 0 WHERE MemberID = ${id}`;

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
async function removeMarried(memberID, RemoveID) {
    try {
        let queryRemoveMarried = `UPDATE familymember SET MarriageID = null WHERE MemberID = ${memberID}`;
        db.connection.query(queryRemoveMarried, (err) => {
            if (err) {
                console.log(err)
            }
        });

        let queryRemoveMarriedAndGeneration = `UPDATE familymember SET MarriageID = null,Generation = 0 WHERE MemberID = ${RemoveID}`;
        db.connection.query(queryRemoveMarriedAndGeneration, (err) => {
            if (err) {
                console.log(err)
            }
        });
    } catch (error) {
        console.log(error)
    }
}


async function RemoveRelationshipMarried(currentID, RemoveID) {
    return new Promise((resolve, reject) => {
        try {
            let queryFindParent = `SELECT ParentID FROM genealogy.familymember WHERE MemberID = ${currentID}`;
            db.connection.query(queryFindParent, (err, result) => {
                if (!err && result.length > 0) {
                    removeMarried(RemoveID, currentID);
                    resolve(true);
                } else {
                    removeMarried(currentID, RemoveID);
                    resolve(true);
                }
            });
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

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

function getListUnspecifiedMembers(CodeID) {
    return new Promise((resolve, reject) => {
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
    })
}






async function getParentID(MemberId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT MarriageID FROM familymember WHERE MemberID = ${MemberId}`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    });
}

async function RelationShipMember(memberId) {
    return new Promise((resolve, reject) => {
        try {
            let objRelationship = {};
            // Lấy thông tin từ bảng familymember
            let getMemberQuery = `SELECT * FROM familymember WHERE MemberID = ${memberId}`;
            db.connection.query(getMemberQuery, async (err, memberResult) => {
                if (err) return reject(err);
                let member = memberResult[0];
                // Lấy thông tin cha mẹ
                if (member.ParentID) {
                    let parentQuery = `SELECT * FROM familymember WHERE MemberID = ${member.ParentID}`;
                    db.connection.query(parentQuery, async (err, parentResult) => {
                        if (!err && parentResult.length > 0) {
                            let parentMember = parentResult[0];
                            if (parentMember.Male == 1) {
                                objRelationship.Father = parentMember;
                            } else {
                                objRelationship.Mother = parentMember;
                            }
                            // Kiểm tra thông tin vợ/chồng
                            if (parentMember.MarriageID) {
                                let spouseQuery = `SELECT * FROM familymember WHERE MemberID = ${parentMember.MarriageID}`;
                                db.connection.query(spouseQuery, async (err, spouseResult) => {
                                    if (!err && spouseResult.length > 0) {
                                        let spouseMember = spouseResult[0];
                                        if (spouseMember.Male == 1) {
                                            objRelationship.Father = spouseMember;
                                        } else {
                                            objRelationship.Mother = spouseMember;
                                        }
                                    }
                                    // Lấy thông tin về con cái
                                    let childQuery = `SELECT * FROM familymember WHERE ParentID = ${memberId}`;
                                    db.connection.query(childQuery, async (err, result) => {
                                        if (!err && result.length > 0) {
                                            objRelationship.child = result;
                                        }
                                        resolve(objRelationship);
                                    });
                                });
                            } else {
                                let childQuery = `SELECT * FROM familymember WHERE ParentID = ${memberId}`;
                                db.connection.query(childQuery, async (err, result) => {
                                    if (!err && result.length > 0) {
                                        objRelationship.child = result;
                                    }
                                    resolve(objRelationship);
                                });
                            }
                            if (member.MarriageID) {
                                let marriedQuery = `SELECT * FROM familymember WHERE MarriageID = ${memberId}`
                                db.connection.query(marriedQuery, async (err, marriedResult) => {
                                    if (!err && marriedResult.length > 0) {
                                        if (marriedResult.Male === 1) {
                                            objRelationship.Husband = marriedResult;
                                        } else {
                                            objRelationship.Wife = marriedResult;
                                        }
                                    }
                                    let childQuery = `SELECT * FROM familymember WHERE ParentID = ${memberId}`;
                                    db.connection.query(childQuery, async (err, result) => {
                                        if (!err && result.length > 0) {
                                            objRelationship.child = result;
                                        }
                                        resolve(objRelationship)
                                    });
                                    ;
                                });
                            }
                        }
                    });
                } else {
                    // Lấy thông tin về con cái
                    let marriedQuery = `SELECT * FROM familymember WHERE MarriageID = ${memberId}`
                    db.connection.query(marriedQuery, async (err, marriedResult) => {
                        if (err) {
                            // Xử lý lỗi nếu có
                            console.error(err);
                            return;
                        }
                        let objRelationship = {};
                        if (marriedResult.length > 0) {
                            if (marriedResult.Male === 1) {
                                objRelationship.Husband = marriedResult[0];
                            } else {
                                objRelationship.Wife = marriedResult[0];
                            }
                            let childQuery = `SELECT * FROM familymember WHERE ParentID = ${marriedResult[0].MemberID}`;
                            db.connection.query(childQuery, async (err, childResult) => {
                                if (err) {
                                    // Xử lý lỗi nếu có
                                    console.error(err);
                                    return;
                                }
                                if (childResult.length > 0) {
                                    objRelationship.child = childResult;
                                }
                                resolve(objRelationship);
                            });
                        } else {
                            resolve(objRelationship);
                        }
                    });
                }
            });
        } catch (error) {
            console.log(error)
        }
    });
}


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

async function GetGenealogy(result, MemberID, ListFamily = [], visitedMembers = new Set()) {
    if (visitedMembers.has(MemberID)) {
        // If MemberID has been visited, do nothing
        return ListFamily;
    }

    visitedMembers.add(MemberID);

    let Member = result.find(member => member.MemberID == MemberID);
    let familyData = await createFamilyData(Member, result);

    // Check if the member is already in ListFamily
    if (!isMemberInList(ListFamily, Member)) {
        ListFamily.push(familyData);
    }

    let married = result.find(member => member.MarriageID == MemberID);
    if (married) {
        let wifeData = await createFamilyData(married, result);

        if (!isMemberInList(ListFamily, married)) {
            ListFamily.push(wifeData);
        }
    }

    let children = result.filter(member => member.ParentID == MemberID);
    for (let child of children) {
        let childData = await createFamilyData(child, result);

        // Check if the child is already in ListFamily
        if (!isMemberInList(ListFamily, child)) {
            ListFamily.push(childData);
        }

        await GetGenealogy(result, child.MemberID, ListFamily, visitedMembers);
    }

    return ListFamily;
}

// Helper function to check if a member is already in the list
function isMemberInList(list, member) {
    return list.some(existingMember => existingMember.id === member.MemberID);
}


function getListMessage(CodeID) {
    console.log()
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM genealogy.notificationhistory where CodeID = '${CodeID}'`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err)
                reject(err);
            } else {
                resolve(result)
            }
        })
    })
}

async function ViewFamilyTree(CodeID) {
    return new Promise((resolve, reject) => {
        try {
            let queryGetAllMember = `SELECT * FROM genealogy.familymember WHERE CodeID = '${CodeID}'`;
            db.connection.query(queryGetAllMember, async (err, result) => {
                if (!err) {
                    let IdPaternal = await GetIdPaternalAncestor(CodeID);
                    if (IdPaternal != null) {
                        let data = await GetGenealogy(result, IdPaternal.MemberID)
                        resolve(data)
                    }
                }
            })
        } catch (e) {
            console.log(e);
            reject(e)
        }
    });
}

// Hàm tạo đối tượng familyData từ dữ liệu thành viên
async function createFamilyData(member, result) {
    try {
        if (member !== undefined) {
            let fid = '';
            let mid = '';
            if (member.Generation === 1) {
                fid = '';
                mid = '';
            }
            else {
                if (member.ParentID != null && member.ParentID != 0) {
                    let parent = result.find(parent => parent.MemberID == member.ParentID);
                    if (parent.Male == 1) {
                        fid = parent.MemberID;
                        mid = parent.MarriageID;
                    } else {
                        mid = parent.MemberID;
                        fid = parent.MarriageID;
                    }
                }
            }
            return {
                id: member.MemberID,
                pids: [member.MarriageID],
                fid: fid,
                mid: mid,
                name: member.MemberName,
                gender: member.Male === 1 ? 'male' : 'female',
                dob: formatDOB(member.Dob),
                dod: formatDOB(member.Dod),
                isDead: member.IsDead,
                // dod: member.IsDead ? null : formatDOB(member.Dod),
                generation: member.Generation,
                img: member.Image
            };
        }
    } catch (error) {
        console.log(error)
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


function removePaternalAncestor() {
    let query = "DELETE FROM memberrole WHERE RoleID = 1";
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
    RemoveRelationshipChild, RemoveRelationshipMarried, RemoveRelationshipParent
}