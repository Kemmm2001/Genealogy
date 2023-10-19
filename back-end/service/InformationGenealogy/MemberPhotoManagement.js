const db = require('../../Models/ConnectDB')

function getMemberPhotoByAlbumId(albumId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM photo where AlbumID  = ${albumId}`
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
        let query = `SELECT * FROM photo where PhotoID  = ${photoId}`
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
        let query = `INSERT INTO photo (AlbumID, PhotoUrl) VALUES (?, ?);`
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
        let query = `UPDATE photo SET AlbumID = ?, PhotoUrl = ? WHERE PhotoID = ?;`
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
        let query = `DELETE FROM photo WHERE PhotoID = ${photoId};`
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
    getMemberPhotoByAlbumId,
    getMemberPhotoById,
    getAllMemberPhoto,
    insertMemberPhoto,
    updateMemberPhoto,
    removeMemberPhoto
}
