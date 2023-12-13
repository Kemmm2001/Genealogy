const db = require('../../Models/ConnectDB')

//Nguyễn Lê Hùng
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
function findEducation(EducationID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM genealogy.education where EducationID = ${EducationID}`;
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
async function InsertEducation(ObjData) {
    return new Promise((resolve, reject) => {
        try {
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
                    reject(err)
                } else {
                    resolve(true)
                }
            })
        } catch (error) {

        }
    })
}
//Nguyễn Lê Hùng
async function findMember(memberID) {
    return new Promise((resolve, reject) => {
        try {
            if (memberID) {
                let query = `SELECT * FROM genealogy.familymember where MemberID = ${memberID}`;
                db.connection.query(query, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

//Nguyễn Lê Hùng
async function UpdateEducation(ObjData) {
    return new Promise((resolve, reject) => {
        try {
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
                    reject(err)
                } else {
                    resolve(true)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

//Nguyễn Lê Hùng
async function RemoveEducation(EducationID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `DELETE FROM education WHERE EducationID = ${EducationID};`
            db.connection.query(query, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            })
        } catch (error) {

        }
    })
}

//Nguyễn Lê Hùng
async function RemoveListEducation(memberID) {
    return new Promise((resolve, reject) => {
        try {
            let findMember = `SELECT * FROM genealogy.education where MemberID = ${memberID};`
            db.connection.query(findMember, (err, result) => {
                if (!err && result.length > 0) {
                    let query = `DELETE FROM education WHERE MemberID = ${memberID};`
                    db.connection.query(query, (err) => {
                        if (err) {
                            reject(false)
                        } else {
                            resolve(true)
                        }
                    })
                } else {
                    resolve(false)
                }
            })
        } catch (error) {
            reject(false)
        }
    })
}


module.exports = {
    getEducationByMemberId, InsertEducation, UpdateEducation, RemoveEducation, RemoveListEducation, findMember, findEducation
}