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

        // Tìm tất cả các con của thành viên hiện tại        
        const findChildrenQuery = `select Member2ID from familyrelationship where Relationship2ID = 7 and   Member1ID = ${memberId} `;
        db.connection.query(findChildrenQuery, (err, childResults) => {
            if (err) throw err;
            // Đối với từng con, thực hiện đệ quy để cập nhật Generation
            childResults.forEach((child) => {
                setAllGenerationMember(child.Member2ID, generation + 1);
            });
        });
    });
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

function removeFamilyHead(MemberId) {
    let query = `DELETE FROM memberrole WHERE MemberID = ${MemberId} and RoleID = 2 `;
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
    getRoleExist, setRoleMember, removePaternalAncestor, removeFamilyHead, turnOnSQL_SAFE_UPDATES, turnOffSQL_SAFE_UPDATES,
    setAllGenerationMember,ResetAllGenerationMember
}