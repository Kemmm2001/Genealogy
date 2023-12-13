const db = require('../../Models/ConnectDB');
//Nguyễn Lê Hùng
async function GetContactByMemberID(memberId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM contact where MemberID  = ${memberId}`
        db.connection.query(query, (err, result) => {
            console.log('result: ' + result)
            if (err) {
                reject(false)
            } else {
                resolve(result)
            }
        })
    })
}

//Nguyễn Lê Hùng
async function findMember(memberID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM genealogy.familymember where MemberID = ${memberID}`;
            db.connection.query(query, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

//Nguyễn Lê Hùng
async function InsertContactMember(objData) {
    try {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO contact (MemberID, Address, Phone, Email, FacebookUrl, Zalo) 
            VALUES (?,?,?,?,?,?)`
            let values = [
                objData.memberId,
                objData.Address,
                objData.Phone,
                objData.Email,
                objData.FacebookUrl,
                objData.Zalo
            ];

            db.connection.query(query, values, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            });
        })
    } catch (error) {
        reject(error)
    }
}
//Nguyễn Lê Hùng
async function UpdateContactByID(ObjData) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE contact 
    SET  Address = ?, Phone = ?, Email = ? , FacebookUrl = ? ,  Zalo = ?
    WHERE MemberID = ?`;
        const values = [
            ObjData.Address,
            ObjData.Phone,
            ObjData.Email,
            ObjData.FacebookUrl,
            ObjData.Zalo,
            ObjData.memberId
        ];

        db.connection.query(query, values, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(true)
            }
        });
    })
}
//Nguyễn Lê Hùng
async function RemoveContactByID(memberID) {
    return new Promise((resolve, reject) => {
        try {
            let findMember = `SELECT * FROM genealogy.contact where MemberID = ${memberID};`
            db.connection.query(findMember, (err, result) => {
                if (!err && result.length > 0) {
                    let query = `DELETE FROM contact WHERE MemberID = ${memberID};`
                    db.connection.query(query, (err) => {
                        if (err) {
                            reject(false)
                        } else {
                            console.log('remove Successfully');
                            resolve(true)
                        }
                    });
                } else {
                    resolve(false)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}




module.exports = {
    GetContactByMemberID, InsertContactMember, UpdateContactByID, RemoveContactByID, findMember
}