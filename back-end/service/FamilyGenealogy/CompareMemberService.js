const db = require('../../Models/ConnectDB');

function getGenerationByID(MemberId) {
    return new Promise((resolve, reject) => {
        let query = `select Generation from familymember
        where MemberID = ${MemberId}`;
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

function GetParentId(MemberId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT ParentID FROM familymember WHERE MemberID = ${MemberId}`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

async function GetResultCompare(MemberId1, MemberId2) {
    let result1 = await GetParentId(MemberId1);
    let result2 = await GetParentId(MemberId2);

    // Kiểm tra nếu kết quả trống thì dừng lại
    if (!result1[0] || !result2[0]) {
        console.log("Không tìm thấy thông tin cho MemberId1 hoặc MemberId2.");
        return;
    }

    if (result1[0].ParentID != result2[0].ParentID) {
        await GetResultCompare(result1[0].ParentID, result2[0].ParentID);
    } else {
        console.log("Đã vào");
    }
}
module.exports = {
    getGenerationByID, GetResultCompare
}