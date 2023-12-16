const db = require('../../Models/ConnectDB')

function getFamilyHistoryByCodeId(codeId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM genealogy.familyhistory WHERE CodeID = '${codeId}'`
        db.connection.query(query, (err, result) => {
            console.log('result' + result)
            if (err) {
                console.log("Have err : " + err);
                reject(err)
            } else {
                resolve(result)
                console.log('result' + result)
            }
        })
    })
}


function getFamilyHistoryById(historyId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM familyhistory where HistoryID  = ${historyId} order by endDate`
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log("Have err : " + err);
                reject(err)
            } else {
                resolve(result)
                console.log('result: ' + result)
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

function insertFamilyHistory(ObjData, maxPositon) {
    return new Promise((resolve, reject) => {
        let query = `INSERT INTO familyhistory (CodeID, Description,startDate,endDate) VALUES (?, ?,? , ? );`
        let values = [
            ObjData.CodeID,
            ObjData.Description,
            ObjData.startDate,
            ObjData.endDate,
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
        let query = `UPDATE familyhistory SET Description = ?, startDate = ?, endDate = ? WHERE HistoryID = ?;`
        let values = [
            ObjData.Description,
            ObjData.startDate,
            ObjData.endDate,
            ObjData.FamilyHistoryID,
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

function filterHistory(startDate, endDate) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM familyhistory WHERE CodeID = '258191' AND startDate >= '${startDate}' AND endDate <= '${endDate}'`;
            db.connection.query(query, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        } catch (error) {

        }
    })
}

function searchHistory(codeID, keySearch) {
    return new Promise((resolve, reject) => {
        try {
            let query = `select * from genealogy.familyhistory where CodeID = ${codeID} and Description like '%${keySearch}%'`;
            db.connection.query(query, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        } catch (error) {
            console.log(error)
        }
    })
}

function removeFamilyHistory(historyId) {
    return new Promise((resolve, reject) => {
        console.log('historyId: ' + historyId)
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
    insertFamilyHistory,
    updateFamilyHistory,
    removeFamilyHistory,
    searchHistory,
    filterHistory
}
