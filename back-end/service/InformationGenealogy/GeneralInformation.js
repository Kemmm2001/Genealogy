const db = require('../../Models/ConnectDB');

function GeneralInformation(CodeId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM familytree where CodeID = ${CodeId}`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}



function GetInformationMember(MemberID) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM familymember where MemberID = ${MemberID}`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

async function UpdateGeneralInformation(objData) {
    let query = `UPDATE familytree SET TreeName = ?, Ethnicity = ? , DeathAnniversary = ? , MemberId = ? WHERE CodeID = ?;`
    let values = [
        objData.TreeName,
        objData.Ethnicity,
        objData.DeathAnniversary,
        objData.MemberId,
        objData.CodeID
    ]

    db.connection.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Update successfully")
        }
    })
}



module.exports = {
    GeneralInformation, GetInformationMember, UpdateGeneralInformation, 
}