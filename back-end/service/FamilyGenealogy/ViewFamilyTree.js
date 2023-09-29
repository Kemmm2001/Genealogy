const db = require("../../Models/ConnectDB")

//Ví dụ
function getAllReligion() {
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM religion";
        db.connection.query(query, (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err);
            } else {
                console.log("result" + result);
                resolve(result);
            }
        });
    });
}


module.exports = {
    getAllReligion
}