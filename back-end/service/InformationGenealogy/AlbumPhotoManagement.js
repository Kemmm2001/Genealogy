const db = require('../../Models/ConnectDB')
const CoreFunction = require('../../Utils/CoreFunction');

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
function getFamilyTreeData(codeId) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM familytree where CodeID  = ${codeId}`
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
            let query = `SELECT * FROM albumphoto where AlbumID  = ?`
            let values = [albumId]
            db.connection.query(query,values, (err, result) => {
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
            let query = `INSERT INTO albumphoto (AlbumName, CodeID, description, BackGroundPhoto) VALUES (?, ?,?,?);`
            let values = [
                ObjData.AlbumName,
                ObjData.CodeID,
                ObjData.Description,
                ObjData.BackGroundPhoto
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
            // xóa ảnh cũ
            const isDeleted = removeAlbumPhotoUrl(ObjData.AlbumID);
            console.log(`isDeleted: ${isDeleted}`);
            if (isDeleted == false) {
                reject("Error when delete image");
            }
            let query = `UPDATE albumphoto SET AlbumName = ?, CodeID = ?, Description = ?, BackGroundPhoto = ? WHERE AlbumID = ?;`
            let values = [
                ObjData.AlbumName,
                ObjData.CodeID,
                ObjData.Description,
                ObjData.BackGroundPhoto,
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
            // xóa ảnh cũ
            const isDeleted = removeAlbumPhotoUrl(albumId);
            console.log(`isDeleted 1: ${isDeleted}`);
            if (isDeleted == false) {
                reject("Error when delete image");
            }
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
// hàm có chức năng xóa ảnh trong thư mục
async function removeAlbumPhotoUrl(AlbumID) {
    try {
        let querySelect = `SELECT * FROM albumphoto where AlbumID = ?`;
        let value = [AlbumID];
        return await deleteImageBySelectQuery(querySelect, value);
    } catch (err) {
        console.error("Error : " + err);
        return false; // Trả về false nếu có lỗi
    }
}

const deleteImageBySelectQuery = async (query, values) => {
    try {
        console.log("query: " + query);
        console.log("values: " + values);
        db.connection.query(query, values, async (err, result) => {
            if (err) {
                console.error("Error in query: " + err);
                return false; // Trả về false nếu có lỗi
            } else {
                try {
                    console.log("Result: ", result);
                    if (result[0].BackGroundPhoto == null || result[0].BackGroundPhoto == "") return true;
                    // Gọi hàm deleteImage để xóa ảnh
                    const isDeleted = await CoreFunction.deleteImage(result[0].BackGroundPhoto);
                    console.log(`isDeleted: ${isDeleted}`);
                    return isDeleted;
                } catch (err) {
                    console.error("Error : " + err);
                    return false; // Trả về false nếu có lỗi
                }
            }
        });
    } catch (err) {
        console.error("Error : " + err);
        return false; // Trả về false nếu có lỗi
    }
}


module.exports = {
    getAlbumPhotoByCodeId,
    getAlbumPhotoById,
    getAlbumPhotoByCodeId,
    getAlbumPhotoByIdAndCodeId,
    getAllAlbumPhoto,
    getFamilyTreeData,
    insertAlbumPhoto,
    updateAlbumPhoto,
    removeAlbumPhoto
}
