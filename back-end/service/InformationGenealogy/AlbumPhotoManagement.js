const db = require('../../Models/ConnectDB')

function getAlbumPhotoByCodeId(codeId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM albumphoto where CodeID  = ${codeId}`
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

function getAlbumPhotoById(albumId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM albumphoto where AlbumID  = ${albumId}`
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

function getAlbumPhotoByCodeId(codeId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM albumphoto where CodeID  = ${codeId}`
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
function getAlbumPhotoByIdAndCodeId(albumId, codeId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM albumphoto where AlbumID  = ${albumId} and CodeID = ${codeId}`
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

function getAllAlbumPhoto() {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM albumphoto`
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

function insertAlbumPhoto(ObjData) {
    return new Promise((resolve, reject) => {
        let query = `INSERT INTO albumphoto (AlbumName, CodeID) VALUES (?, ?);`
        let values = [
            ObjData.AlbumName,
            ObjData.CodeID
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

function updateAlbumPhoto(ObjData) {
    return new Promise((resolve, reject) => {
        let query = `UPDATE albumphoto SET AlbumName = ?, CodeID = ? WHERE AlbumID = ?;`
        let values = [
            ObjData.AlbumName,
            ObjData.CodeID,
            ObjData.AlbumID
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

function removeAlbumPhoto(albumId) {
    return new Promise((resolve, reject) => {
        let query = `DELETE FROM albumphoto WHERE AlbumID = ${albumId};`
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
    getAlbumPhotoByCodeId,
    getAlbumPhotoById,
    getAlbumPhotoByCodeId,
    getAlbumPhotoByIdAndCodeId,
    getAllAlbumPhoto,
    insertAlbumPhoto,
    updateAlbumPhoto,
    removeAlbumPhoto
}
