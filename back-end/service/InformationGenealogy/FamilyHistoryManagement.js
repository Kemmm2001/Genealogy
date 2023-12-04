const db = require('../../Models/ConnectDB')

function getFamilyHistoryByCodeId(codeId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM genealogy.familyhistory WHERE CodeID = '${codeId}' ORDER BY order_position ASC;`
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

function updateOrder_positionHistory(position, HistoryID) {
    return new Promise((resolve, reject) => {
        let query = `UPDATE familyhistory SET order_position = '${position}' WHERE (HistoryID = ${HistoryID});`
        db.connection.query(query, (err) => {
            if (err) {
                reject(false)
            } else {
                resolve(true)
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

async function getMaxOrder_position(CodeID) {
    return new Promise((resolve, reject) => {
        let query = `SELECT MAX(order_position) AS max_order_position FROM familyhistory where CodeID = ${CodeID}`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log("Error while fetching max order_position: " + err);
                reject(err);
            } else {
                // Lấy giá trị max_order_position từ kết quả truy vấn
                let maxOrderPosition = result[0].max_order_position || 0;
                resolve(maxOrderPosition);
            }
        });
    });
}

function insertFamilyHistory(ObjData, maxPositon) {
    return new Promise((resolve, reject) => {
        let query = `INSERT INTO familyhistory (CodeID, Description,startDate,endDate,order_position) VALUES (?, ?,? , ? , ?);`
        let values = [
            ObjData.CodeID,
            ObjData.Description,
            ObjData.startDate,
            ObjData.endDate,
            maxPositon + 1
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
    getAllFamilyHistory,
    insertFamilyHistory,
    updateFamilyHistory,
    removeFamilyHistory,
    updateOrder_positionHistory,
    getMaxOrder_position,
    searchHistory,
    filterHistory
}
