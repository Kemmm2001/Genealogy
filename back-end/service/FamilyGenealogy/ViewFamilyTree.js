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

//Có thể xóa
// function setGenerationPaternalAncestor(CodeID) {
//     let query = `update familymember as f inner join memberrole as m
//     on  f.MemberID = m.MemberID
//     set f.generation  = 1
//     where m.RoleID = 1
//     and f.CodeID = ${CodeID}`;
//     db.connection.query(query, (err, result) => {
//         if (err) {
//             console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
//         } else {
//             console.log("remove succesfully")
//         }
//     })
// }

function ResetAllGenerationMember(CodeID) {
    let query = `UPDATE familymember
    SET Generation = 0
    where CodeID = ${CodeID}`;
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
        if (err) throw err;

        //Tìm tất cả mối hôn nhân hiện tại
        const findMarriesQuery = `SELECT * FROM familymember where MemberID = ${memberId}`;
        db.connection.query(findMarriesQuery, (err, childResults) => {
            if (err) throw err;

            childResults.forEach((child) => {
                if (child.MarriageID != null) {
                    setAllGenerationMember(child.MarriageID, generation);
                }
            });
        });



        // Tìm tất cả các con của thành viên hiện tại        
        const findChildrenQuery = `SELECT * FROM familymember where ParentID = ${memberId}`;
        db.connection.query(findChildrenQuery, (err, childResults) => {
            if (err) throw err;

            childResults.forEach((child) => {
                setAllGenerationMember(child.MemberID, generation + 1);
            });
        });
    });
}

function getPaternalAncestor(CodeID) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM genealogy.familymember
        where CodeID = ${CodeID}`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err);
            } else {
                console.log(result)
                resolve(result);
            }
        });
    });
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

async function ViewFamilyTree(memberId, ListFamily = []) {
    return new Promise((resolve, reject) => {
        // Lấy thông tin từ bảng familymember
        let getMemberQuery = `SELECT * FROM familymember WHERE MemberID = ${memberId}`;
        db.connection.query(getMemberQuery, async (err, memberResult) => {
            if (err) return reject(err);

            let member = memberResult[0];
            let familyData = await createFamilyData(member);
            ListFamily.push(familyData);

            // Lấy thông tin từ bảng familymember với MarriageID
            let getMarriage = `SELECT * FROM familymember WHERE MarriageID = ${memberId}`;
            db.connection.query(getMarriage, async (err, marriageResult) => {
                if (err) return reject(err);

                if (marriageResult.length > 0) {
                    let memberMarriage = marriageResult[0];
                    let familyDataMarriage = await createFamilyData(memberMarriage);
                    ListFamily.push(familyDataMarriage);
                }

                // Lấy thông tin về con cái
                let childQuery = `SELECT * FROM familymember WHERE ParentID = ${memberId}`;
                db.connection.query(childQuery, (err, marriageResult) => {
                    if (err) return reject(err);

                    const childPromises = [];
                    marriageResult.forEach((child) => {
                        childPromises.push(ViewFamilyTree(child.MemberID, ListFamily));
                    });

                    Promise.all(childPromises)
                        .then(() => {
                            resolve(ListFamily);
                        })
                        .catch((err) => reject(err));
                });
            });
        });
    });
}

// Hàm tạo đối tượng familyData từ dữ liệu thành viên
async function createFamilyData(member) {
    if (member !== undefined) {
        let fid = 0;
        let mid = 0;
        if (member.Generation === 1) {
            fid = '';
            mid = '';
        } else if (member.Male === 1) {
            fid = member.ParentID;
            let marriageIDResult = await getParentID(member.ParentID);
            if (marriageIDResult != null) mid = marriageIDResult.MarriageID;

        } else {
            mid = member.ParentID;
            let marriageIDResult = await getParentID(member.ParentID);
            if (marriageIDResult != null) fid = marriageIDResult.MarriageID;
        }

        return {
            id: member.MemberID,
            pids: [member.MarriageID],
            fid: fid,
            mid: mid,
            name: member.MemberName,
            gender: member.Male === 1 ? 'male' : 'female',
            dob: formatDOB(member.Dob),
            dod: member.IsAlive ? '' : formatDOB(member.Dod),
            generation: member.Generation
        };
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

async function setRoleMember(MemberId, roleId) {
    try {
        let query = `INSERT INTO memberrole (MemberID, RoleID) VALUES ('${MemberId}', '${roleId}')`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                throw err;
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
    getRoleExist, setRoleMember, removePaternalAncestor, turnOnSQL_SAFE_UPDATES, turnOffSQL_SAFE_UPDATES,
    setAllGenerationMember, ResetAllGenerationMember, ViewFamilyTree
}