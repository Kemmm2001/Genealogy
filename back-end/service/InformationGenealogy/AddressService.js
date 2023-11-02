const db = require('../../Models/ConnectDB')

function getProvince() {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM genealogy.city`
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

function getDistrict(CityId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM genealogy.district where CityId  = ${CityId}`
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
module.exports = {getProvince, getDistrict}