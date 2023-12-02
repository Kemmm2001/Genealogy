const db = require('../../Models/ConnectDB');
//Nguyễn Lê Hùng
async function GetContactByMemberID(memberId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM contact where MemberID  = ${memberId}`
        db.connection.query(query, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}
//Nguyễn Lê Hùng
async function InsertContactMember(objData) {
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
            console.error(err);
            return;
        } else {
            console.log('Insert Successfully');
        }
    });
}
//Nguyễn Lê Hùng
async function UpdateContactByID(ObjData) {
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
            console.error(err);

            return;
        } else {
            console.log('Update Successfully');
        }
    });
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
    GetContactByMemberID, InsertContactMember, UpdateContactByID, RemoveContactByID
}