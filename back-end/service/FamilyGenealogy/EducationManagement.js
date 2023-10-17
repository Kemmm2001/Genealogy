const db = require('../../Models/ConnectDB')

function getEducationByMemberId(memberId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM education where MemberID  = ${memberId}`
        db.connection.query(query, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}
async function InsertEducation(ObjData) {
    let query = `INSERT INTO education (MemberID, School, Description, StartDate, EndDate) VALUES 
    (?, ?, ?, ?, ?);`
    let values = [
        ObjData.MemberID,
        ObjData.School,
        ObjData.Description,
        ObjData.StartDate,
        ObjData.EndDate,
    ]
    db.connection.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Insert successfully");
        }
    })
}

async function UpdateEducation(ObjData) {
    let query = `UPDATE education SET School = ?, Description = ?, StartDate = ?, EndDate = ? WHERE EducationID = ?;`
    let values = [
        ObjData.School,
        ObjData.Description,
        ObjData.StartDate,
        ObjData.EndDate,
        ObjData.EducationID
    ]
    db.connection.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Update successfully");
        }
    })
}

async function RemoveEducation(EducationID) {
    let query = `DELETE FROM education WHERE EducationID = ${EducationID};`
    db.connection.query(query, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("remove successfully");
        }
    })
}


module.exports = {
    getEducationByMemberId, InsertEducation, UpdateEducation,RemoveEducation
}