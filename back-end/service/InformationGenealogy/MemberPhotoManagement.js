const db = require('../../Models/ConnectDB')
const fs = require('fs');

function getMemberPhotoByAlbumId(albumId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM memberphoto where AlbumID  = ${albumId}`
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

function getMemberPhotoById(photoId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM memberphoto where PhotoID  = ${photoId}`
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

function getAllMemberPhoto() {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM photo`
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

function insertMemberPhoto(ObjData) {
    return new Promise((resolve, reject) => {
        let query = `INSERT INTO memberphoto (AlbumID, PhotoUrl) VALUES (?, ?);`
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

function updateMemberPhoto(ObjData) {
    return new Promise((resolve, reject) => {
        removeMemberPhotoUrl(ObjData.PhotoID, reject);
        let query = `UPDATE memberphoto SET AlbumID = ?, PhotoUrl = ? WHERE PhotoID = ?;`
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

function removeMemberPhoto(photoId) {
    return new Promise((resolve, reject) => {
        removeMemberPhotoUrl(photoId, reject);
        let query = `DELETE FROM memberphoto WHERE PhotoID = ${photoId};`
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

function removeMemberPhotoUrl(photoId, reject) {
    let querySelect = `SELECT * FROM memberphoto where PhotoID  = ${photoId}`
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
    getMemberPhotoByAlbumId,
    getMemberPhotoById,
    getAllMemberPhoto,
    insertMemberPhoto,
    updateMemberPhoto,
    removeMemberPhoto
}
