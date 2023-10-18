const db = require('../../Models/ConnectDB')

function getAllFamilyHead(CodeID) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM genealogy.memberrole
        where RoleID = 2 and CodeId = ${CodeID}`;
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
    getAllFamilyHead,removeFamilyHead
}