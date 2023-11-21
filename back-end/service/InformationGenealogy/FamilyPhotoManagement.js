const db = require('../../Models/ConnectDB')
const CoreFunction = require("../../Utils/CoreFunction");

function getFamilyPhotoByAlbumId(albumId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM familyphoto where AlbumID  = ${albumId}`
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

function getFamilyPhotoById(photoId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM familyphoto where PhotoID  = ${photoId}`
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

function getAllFamilyPhoto() {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM familyphoto`
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

function insertFamilyPhoto(ObjData) {
    return new Promise((resolve, reject) => {
        let query = `INSERT INTO familyphoto (AlbumID, PhotoUrl) VALUES (?, ?);`
        let values = [
            ObjData.AlbumID,
            ObjData.PhotoUrl
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

function updateFamilyPhoto(ObjData) {
    return new Promise((resolve, reject) => {
        // xóa ảnh cũ
        const isDeleted = removeFamilyPhotoUrl(ObjData.PhotoID);
        console.log(`isDeleted: ${isDeleted}`);
        if (isDeleted == false) {
            reject("Error when delete image");
        }
        let query = `UPDATE familyphoto SET AlbumID = ?, PhotoUrl = ? WHERE PhotoID = ?;`
        let values = [
            ObjData.AlbumID,
            ObjData.PhotoUrl,
            ObjData.PhotoID
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

function removeFamilyPhoto(photoId) {
    return new Promise((resolve, reject) => {
        const isDeleted = removeFamilyPhotoUrl(photoId);
        console.log(`isDeleted: ${isDeleted}`);
        if (isDeleted == false) {
            reject("Error when delete image");
        }
        let query = `DELETE FROM familyphoto WHERE PhotoID = ${photoId};`
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

// hàm có chức năng xóa ảnh trong thư mục
function removeFamilyPhotoUrl(photoId) {
    try {
        let querySelect = `SELECT * FROM familyphoto where PhotoID = ?`;
        let value = [photoId];
        return deleteImageBySelectQuery(querySelect, value);
    } catch (err) {
        console.error("Error : " + err);
        return false; // Trả về false nếu có lỗi
    }
}

const deleteImageBySelectQuery = (query, values) => {
    try {
        console.log("query: " + query);
        console.log("values: " + values);
        db.connection.query(query, values, async (err, result) => {
            if (err) {
                console.error("Error in query: " + err);
                return false; // Trả về false nếu có lỗi
            } else {
                console.log("Result: ", result);
                if (result[0].PhotoUrl == null || result[0].PhotoUrl == "") return true;
                // Gọi hàm deleteImage để xóa ảnh
                const isDeleted = await CoreFunction.deleteImage(result[0].PhotoUrl);
                console.log(`isDeleted: ${isDeleted}`);
                return isDeleted;
            }
        });
    } catch (err) {
        console.error("Error : " + err);
        return false; // Trả về false nếu có lỗi
    }
}


module.exports = {
    getFamilyPhotoByAlbumId,
    getFamilyPhotoById,
    getAllFamilyPhoto,
    insertFamilyPhoto,
    updateFamilyPhoto,
    removeFamilyPhoto
}
