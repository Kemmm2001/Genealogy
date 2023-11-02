const db = require('../../Models/ConnectDB')

function GetListMember(CodeId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM genealogy.familymember
        where CodeID = ${CodeId}        `
        db.connection.query(query, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}
function getGenerationNumber(CodeID) {
    return new Promise((resolve, reject) => {
        let query = `SELECT MAX(Generation) AS TotalGenerations FROM genealogy.familymember
        where CodeID = ${CodeID}        `
        db.connection.query(query, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result[0].TotalGenerations)
            }
        })
    })
}

function getMemberByAge(startAge, EndAge, CodeID) {
    return new Promise((resolve, reject) => {
        let query = `SELECT *  FROM familymember
        WHERE dob >= DATE_SUB(CURDATE(), INTERVAL ${EndAge} YEAR) AND dob <= DATE_SUB(CURDATE(), INTERVAL ${startAge} YEAR)
        and CodeID = ${CodeID}`
        db.connection.query(query, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

function filtetMemberByMonth(month, CodeID) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM familymember
        WHERE MONTH(dob) = ${month}
        and CodeID = ${CodeID}`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}




module.exports = {
    GetListMember, getGenerationNumber, getMemberByAge, filtetMemberByMonth
}



