const multer = require("multer");
const crypto = require('crypto');
const fs = require('fs');
const db = require('../Models/ConnectDB');


const missingFields = (requiredFields, data) => {
    return requiredFields.filter(field => !(field in data &&
        (typeof data[field] === 'string' ? data[field].trim() !== '' : true)));
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

const deleteImage = (imageUrl) => {
    return new Promise((resolve, reject) => {
        console.log("Deleting image: " + imageUrl);
        // Kiểm tra quyền truy cập vào tệp
        fs.promises.access(imageUrl, fs.constants.F_OK)
            .then(() => {
                // Tệp tồn tại, tiến hành xóa
                fs.unlink(imageUrl, (err) => {
                    if (err) {
                        console.error("Error deleting image: " + err);
                        reject(err);
                    } else {
                        console.log("Image deleted successfully.");
                        resolve(true);
                    }
                });
            })
            .catch((accessErr) => {
                // Lỗi khi kiểm tra quyền truy cập, xem xét xóa tệp
                if (accessErr.code === 'ENOENT') {
                    // Tệp không tồn tại, xem như đã xóa thành công
                    console.log("Image does not exist. Skipping deletion.");
                    resolve(true);
                } else {
                    // Lỗi khác, reject với lỗi gốc
                    console.error("Error accessing image: " + accessErr);
                    reject(accessErr);
                }
            });
    });
};


module.exports = { missingFields, uploadImage, deleteImage };