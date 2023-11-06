const db = require('../../Models/ConnectDB');

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
        ObjData.MemberID
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

async function RemoveContactByID(memberID) {
    let query = `DELETE FROM contact WHERE MemberID = ${memberID};`
    db.connection.query(query, (err, result) => {
        if (err) {
            console.error(err);

        } else {
            console.log('remove Successfully');
        }
    });
}




module.exports = {
    GetContactByMemberID, InsertContactMember, UpdateContactByID, RemoveContactByID
}