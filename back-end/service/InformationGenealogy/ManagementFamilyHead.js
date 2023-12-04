const db = require('../../Models/ConnectDB')

async function getAllFamilyHead(CodeID) {
    return new Promise((resolve, reject) => {
        let query = `SELECT fm.MemberID,fm.MemberName, fm.Dob,fm.Generation FROM genealogy.memberrole as mr
        inner join familymember as fm
        where mr.MemberID = fm.MemberID and 
        mr.RoleID = 2 and mr.CodeId = ${CodeID}`;
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
function SearchMemberFamilyHead(CodeID, KeySearch) {
    return new Promise((resolve, reject) => {
        let query = `SELECT fm.MemberID, fm.MemberName, fm.Dob, fm.Generation
        FROM genealogy.memberrole as mr
        INNER JOIN familymember as fm ON mr.MemberID = fm.MemberID
        WHERE mr.RoleID = 2 AND mr.CodeId = ${CodeID} AND fm.MemberName LIKE '%${KeySearch}%';	`;
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

function SearchMemberFamilyHeadCanAdd(CodeID, KeySearch) {
    return new Promise((resolve, reject) => {
        try {
            let query = `select f.MemberID, f.MemberName,f.Dob,f.Generation from familymember as f    
            where f.Male = 1 and f.Generation != 0 and CodeID = '${CodeID}' AND f.MemberName LIKE '%${KeySearch}%';`;
            db.connection.query(query, (err, result) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        } catch (error) {
            console.log(error)
        }
    })
}

function getListFamilyHeadCanAdd(CodeID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `select f.MemberID, f.MemberName,f.Dob,f.Generation from familymember as f    
            where f.Male = 1 and f.Generation != 0 and CodeID = '${CodeID}'`;
            db.connection.query(query, async (err, result) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        } catch (error) {
            console.log(error)
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

function addForefather(MemberId, CodeId) {
    return new Promise((resolve, reject) => {
        let query = `INSERT INTO memberrole (MemberID, RoleID, CodeId) VALUES (?, 1, ?)`;
        let values = [MemberId, CodeId];
        db.connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = {
    getAllFamilyHead, removeFamilyHead, addForefather, getListFamilyHeadCanAdd, SearchMemberFamilyHead, SearchMemberFamilyHeadCanAdd
}