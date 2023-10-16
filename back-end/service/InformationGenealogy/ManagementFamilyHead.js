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

module.exports = {
    getAllFamilyHead
}