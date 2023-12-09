const db = require('../../Models/ConnectDB')







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
    addForefather, 
}