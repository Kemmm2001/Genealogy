const db = require('../../Models/ConnectDB')

function getFamilyHistoryByCodeId(codeId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM familyhistory where CodeID  = ${codeId}`
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log("Have err : " + err);
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

function getFamilyHistoryById(historyId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM familyhistory where HistoryID  = ${historyId}`
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log("Have err : " + err);
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

function getFamilyHistoryByCodeId(codeID) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM familyhistory where CodeID  = ${codeID}`
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log("Have err : " + err);
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}
function getFamilyHistoryByIdAndCodeId(historyId, codeId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM familyhistory where HistoryID  = ${historyId} and CodeID = ${codeId}`
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log("Have err : " + err);
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}
function getAllFamilyHistory() {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM familyhistory`
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log("Have err : " + err);
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

function insertFamilyHistory(ObjData) {
    return new Promise((resolve, reject) => {
        let query = `INSERT INTO familyhistory (CodeID, Description) VALUES (?, ?);`
        let values = [
            ObjData.CodeID,
            ObjData.Description
        ]
        db.connection.query(query, values, (err, result) => {
            if (err) {
                console.log("Have err : " + err);
                reject(err);
            } else {
                resolve(result);
            }
        })
    });

}

function updateFamilyHistory(ObjData) {
    return new Promise((resolve, reject) => {
        let query = `UPDATE familyhistory SET CodeID = ?, Description = ? WHERE HistoryID = ?;`
        let values = [
            ObjData.CodeID,
            ObjData.Description,
            ObjData.FamilyHistoryID
        ]
        db.connection.query(query, values, (err, result) => {
            if (err) {
                console.log("Have err : " + err);
                reject(err);
            } else {
                resolve(result);
            }
        })
    });

}

function removeFamilyHistory(historyId) {
    return new Promise((resolve, reject) => {
        let query = `DELETE FROM familyhistory WHERE HistoryID = ${historyId};`
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log("Have err : " + err);
                reject(err);
            } else {
                resolve(result);
            }
        })
    });

}

module.exports = {
    getFamilyHistoryByCodeId,
    getFamilyHistoryById,
    getFamilyHistoryByIdAndCodeId,
    getFamilyHistoryByCodeId,
    getAllFamilyHistory,
    insertFamilyHistory,
    updateFamilyHistory,
    removeFamilyHistory
}
