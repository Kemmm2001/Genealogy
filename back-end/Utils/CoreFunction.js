const multer = require("multer");
const crypto = require('crypto');
const fs = require('fs');
const db = require('../Models/ConnectDB');


const missingFields = (requiredFields, data) => {
    const missing = [];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];

        if (!(field in data)) {
            missing.push(field);
        } else {
            const fieldValue = data[field];
            if (isEmptyOrNullOrSpaces(fieldValue)) {
                missing.push(field);
            }
        }
    }

    return missing;
}
const isEmptyOrNullOrSpaces = (str) => {
    const isNull = str == null || (typeof str == 'string' && str.trim() == '') || typeof str == 'undefined';
    return isNull;
}




const uploadImage = (destinationFolder) => {
    return multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, `/uploads/images/${destinationFolder}`);
            },
            filename: (req, file, cb) => {
                // Tạo tên file ngẫu nhiên
                let fileName = generateRandomFileName(file);

                // Kiểm tra tồn tại
                const destPath = `/uploads/images/${destinationFolder}/${fileName}`;
                while (fs.existsSync(destPath)) {
                    // Nếu tồn tại, tạo tên mới
                    console.log('File đã tồn tại, tạo tên mới');
                    fileName = generateRandomFileName(file);
                }
                console.log('Tên file mới:', fileName);
                // Tên chưa tồn tại, lưu file
                cb(null, fileName);
            }
        })
    });
};

const generateRandomFileName = (file) => {
    // Tạo tên file ngẫu nhiên
    const randomName = crypto.randomBytes(15).toString('hex');
    // Thêm đuôi file gốc vào 
    const fileName = `${randomName}.${file.originalname.split('.').pop()}`;
    return fileName;
}

const deleteImage = async (file) => {
    return new Promise(async (resolve, reject) => {
        try {
        console.log("File : " + file);
        if(!isDataStringExist(file)) return resolve();
        console.log("file path : " + file.path)
        // Kiểm tra quyền truy cập vào tệp
        fs.promises.access(file.path, fs.constants.F_OK)
            .then(() => {
                // Tệp tồn tại, tiến hành xóa
                fs.unlink(file.path, (err) => {
                    if (err) {
                        console.error("Error deleting image: " + err);
                        reject(err);
                    } else {
                        console.log("Image deleted successfully.");
                        resolve();
                    }
                });
            })
            .catch((accessErr) => {
                // Lỗi khi kiểm tra quyền truy cập, xem xét xóa tệp
                if (accessErr.code == 'ENOENT') {
                    // Tệp không tồn tại, xem như đã xóa thành công
                    console.log("Image does not exist. Skipping deletion.");
                    resolve();
                } else {
                    // Lỗi khác, reject với lỗi gốc
                    console.error("Error accessing image: " + accessErr);
                    reject(accessErr);
                }
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

const isDataStringExist = (data) => {
    return data != null && data != undefined && data != '';
}

const isDataNumberExist = (data) => {
    return data != null && data != undefined && data != '' && data != 0;
}

module.exports = { missingFields, uploadImage, deleteImage, isEmptyOrNullOrSpaces, isDataStringExist, isDataNumberExist };