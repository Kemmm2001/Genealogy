const db = require('../../Models/ConnectDB')
const fs = require('fs');

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
        removeFamilyPhotoUrl(ObjData.PhotoID, reject);
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
        removeFamilyPhotoUrl(photoId, reject);
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
function removeFamilyPhotoUrl(photoId, reject) {
    let querySelect = `SELECT * FROM familyphoto where PhotoID  = ${photoId}`
    db.connection.query(querySelect, (err, result) => {
        if (err) {
            console.log("Have err : " + err);
            reject(err)
        } else {
            console.log("result : " + result);
            for (let i = 0; i < result.length; i++) {
                console.log(`result[${i}] : ` + result[i]);
                console.log(`result[${i}].PhotoUrl : ` + result[i].PhotoUrl);
                fs.unlink(result[i].PhotoUrl, (err) => {
                    if (err) {
                        console.log("Have err : " + err);
                        reject(err);
                    }
                });
            }

        }
    })
}

module.exports = {
    getFamilyPhotoByAlbumId,
    getFamilyPhotoById,
    getAllFamilyPhoto,
    insertFamilyPhoto,
    updateFamilyPhoto,
    removeFamilyPhoto
}
