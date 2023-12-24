const multer = require("multer");
const crypto = require('crypto');
const fs = require('fs');
const db = require('../Models/ConnectDB');
const moment = require('moment');
const SecureUtil = require('./SecureUtil');
const Response = require('./Response');
const util = require('util');
const queryString = require('querystring');

// nguyễn anh tuấn
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

// nguyễn anh tuấn
const isEmptyOrNullOrSpaces = (str) => {
    const isNull = str == null || (typeof str == 'string' && str.trim() == '') || typeof str == 'undefined';
    return isNull;
}

// nguyễn anh tuấn
const uploadExcelFile = (destinationFolder) => {
    return multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, `/uploads/excel/${destinationFolder}`);
            },
            filename: (req, file, cb) => {
                // Tạo tên file ngẫu nhiên
                let fileName = generateRandomFileName(file);

                // Kiểm tra tồn tại
                if (!fs.existsSync(`/uploads/excel/${destinationFolder}`)) {
                    fs.mkdirSync(`/uploads/excel/${destinationFolder}`);
                }

                const destPath = `/uploads/excel/${destinationFolder}/${fileName}`;
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

// nguyễn anh tuấn
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
                if (!fs.existsSync(`/uploads/images/${destinationFolder}`)) {
                    fs.mkdirSync(`/uploads/images/${destinationFolder}`);
                }
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

// nguyễn anh tuấn
const generateRandomFileName = (file) => {
    // Tạo tên file ngẫu nhiên
    const randomName = crypto.randomBytes(15).toString('hex');
    // Thêm đuôi file gốc vào 
    const fileName = `${randomName}.${file.originalname.split('.').pop()}`;
    return fileName;
}

// nguyễn anh tuấn
const deleteImage = async (filePath) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Vào hàm deleteImage");
            console.log("File : " + filePath);
            if (!isDataStringExist(filePath)) return resolve();

            // Kiểm tra quyền truy cập vào tệp
            fs.promises.access(filePath, fs.constants.F_OK)
                .then(() => {
                    // Tệp tồn tại, tiến hành xóa
                    fs.unlink(filePath, (err) => {
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

// nguyễn anh tuấn
const isDataStringExist = (data) => {
    return data != null && data != undefined && data != '';
}

// nguyễn anh tuấn
const isDataNumberExist = (data) => {
    return data != null && data != undefined && data != '' && data != 0;
}

// nguyễn anh tuấn
const isDataDateExist = (data) => {
    return data != null && data != undefined && moment(data, "yyyy-MM-dd").isValid();
}

const isChecksumValid = (req, res, next) => {
    try {
        console.log('req.body: ' + JSON.stringify(req.body));
        if (isDataStringExist(req.body) && JSON.stringify(req.body) != '{}' && req.body) {
            const encryptedData = req.headers['encryptdata'];
            if (!isDataStringExist(encryptedData)) return res.send(Response.badRequestResponse(null, "Missing encrypt data"));
            const secretKey = process.env.SECRET_KEY;
            console.log('encryptedData: ' + encryptedData);
            const decryptedData = SecureUtil.decrypt(encryptedData, secretKey);
            console.log('decryptedData: ' + decryptedData);
            if (!isDataStringExist(decryptedData)) return res.send(Response.badRequestResponse(null, "Invalid encrypt data"));
            const bodyData = JSON.stringify(req.body);
            if (bodyData != decryptedData) return res.send(Response.badRequestResponse(null, "Invalid encrypt body"));
        }
        next();
    } catch (error) {
        console.log(error);
        return res.send(Response.internalServerErrorResponse());
    }

}

module.exports = {
    missingFields, uploadImage, deleteImage, isEmptyOrNullOrSpaces, isDataStringExist, isChecksumValid,
    isDataNumberExist, uploadExcelFile, isDataDateExist
};