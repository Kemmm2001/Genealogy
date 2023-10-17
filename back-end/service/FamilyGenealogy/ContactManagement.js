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
    let query = `INSERT INTO contact (MemberID, Address, Phone1, Phone2, Email1,Email2, FacebookUrl, Zalo) 
    VALUES (?,?,?,?,?,?,?,?)`
    let values = [
        objData.memberId,
        objData.Address,
        objData.Phone1,
        objData.Phone2,
        objData.Email1,
        objData.Email2,
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
                   SET  Address = ?, Phone1 = ?, Phone2 = ?, Email1 = ?,Email2 = ? , FacebookUrl = ? ,  Zalo = ?
                   WHERE ContactID = ?`;
    const values = [
        ObjData.Address,
        ObjData.Phone1,
        ObjData.Phone2,
        ObjData.Email1,
        ObjData.Email2,
        ObjData.FacebookUrl,
        ObjData.Zalo,
        ObjData.ContactID
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

async function RemoveContactByID(ContactID) {
    let query = `DELETE FROM contact WHERE ContactID = ${ContactID};`
    db.connection.query(query, (err, result) => {
        if (err) {
            console.error(err);

        } else {
            console.log('remove Successfully');
        }
    });
}




module.exports = {
    GetContactByMemberID, InsertContactMember, UpdateContactByID,RemoveContactByID
}