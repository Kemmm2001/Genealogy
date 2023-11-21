const db = require('../../Models/ConnectDB')

function getAlbumPhotoByCodeId(codeId) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM albumphoto where CodeID  = ${codeId}`
            db.connection.query(query, (err, result) => {
                if (err) {
                    console.log("Have err : " + err);
                    reject()
                } else {
                    resolve(result)
                }
            })
        } catch (e) {
            console.log("Have err : " + e);
            reject()
        }
    })
}

function getAlbumPhotoById(albumId) {
    console.log('albumId: ' + albumId)
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM albumphoto where AlbumID  = ${albumId}`
            db.connection.query(query, (err, result) => {
                if (err) {
                    console.log("Have err : " + err);
                    reject()
                } else {
                    resolve(result)
                }
            })
        } catch (e) {
            console.log("Have err : " + e);
            reject()
        }
    })
}

function getAlbumPhotoByCodeId(codeId) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM albumphoto where CodeID  = ${codeId}`
            db.connection.query(query, (err, result) => {
                if (err) {
                    console.log("Have err : " + err);
                    reject()
                } else {
                    resolve(result)
                }
            })
        } catch (e) {
            console.log("Have err : " + e);
            reject()
        }
    })
}
function getAlbumPhotoByIdAndCodeId(albumId, codeId) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM albumphoto where AlbumID  = ${albumId} and CodeID = ${codeId}`
            db.connection.query(query, (err, result) => {
                if (err) {
                    console.log("Have err : " + err);
                    reject()
                } else {
                    resolve(result)
                }
            })
        } catch (e) {
            console.log("Have err : " + e);
            reject()
        }
    })
}

function getAllAlbumPhoto() {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM albumphoto`
            db.connection.query(query, (err, result) => {
                if (err) {
                    console.log("Have err : " + err);
                    reject()
                } else {
                    resolve(result)
                }
            })
        } catch (e) {
            console.log("Have err : " + e);
            reject()
        }
    })
}

function insertAlbumPhoto(ObjData) {
    return new Promise((resolve, reject) => {
        try {
            let query = `INSERT INTO albumphoto (AlbumName, CodeID, description) VALUES (?, ?,?);`
            let values = [
                ObjData.AlbumName,
                ObjData.CodeID,
                ObjData.Description
            ]
            db.connection.query(query, values, (err, result) => {
                if (err) {
                    console.log("Have err : " + err);
                    reject();
                } else {
                    resolve(result);
                }
            })
        } catch (e) {
            console.log("Have err : " + e);
            reject()
        }
    });

}

function updateAlbumPhoto(ObjData) {
    return new Promise((resolve, reject) => {
        try {
            let query = `UPDATE albumphoto SET AlbumName = ?, CodeID = ?, Description = ? WHERE AlbumID = ?;`
            let values = [
                ObjData.AlbumName,
                ObjData.CodeID,
                ObjData.Description,
                ObjData.AlbumID
            ]
            db.connection.query(query, values, (err, result) => {
                if (err) {
                    console.log("Have err : " + err);
                    reject();
                } else {
                    resolve(result);
                }
            })
        } catch (e) {
            console.log("Have err : " + e);
            reject()
        }
    });

}

function removeAlbumPhoto(albumId) {
    return new Promise((resolve, reject) => {
        try {
            let query = `DELETE FROM albumphoto WHERE AlbumID = ${albumId};`
            db.connection.query(query, (err, result) => {
                if (err) {
                    console.log("Have err : " + err);
                    reject();
                } else {
                    resolve(result);
                }
            })
        } catch (e) {
            console.log("Have err : " + e);
            reject()
        }
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
