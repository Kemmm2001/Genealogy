const FamilyPhotoManagementService = require("../../service/InformationGenealogy/FamilyPhotoManagement");
const Response = require("../../Utils/Response");
const CoreFunction = require("../../Utils/CoreFunction");

var addFamilyPhoto = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // nếu có file ảnh thì lưu đường dẫn vào req.body.PhotoUrl, còn ko thì gán null
        if (req.file != null) {
            req.body.PhotoUrl = req.file.path;
        } else {
            req.body.PhotoUrl = null;
        }
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'AlbumID'
        ];
        // Kiểm tra xem có đủ các trường của FamilyPhoto không
        const missingFields = CoreFunction.missingFields(requiredFields, req.body);
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            CoreFunction.deleteImage(req.file);
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // Thêm thông tin vào bảng Familyphoto
        let data = await FamilyPhotoManagementService.insertFamilyPhoto(req.body);
        dataRes = {
            PhotoID: data.insertId,
            affectedRows: data.affectedRows,
            PhotoUrl: req.body.PhotoUrl
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        CoreFunction.deleteImage(req.file);
        return res.send(Response.internalServerErrorResponse());
    }
};



var updateFamilyPhoto = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // nếu có file ảnh thì lưu đường dẫn vào req.body.PhotoUrl, còn ko thì gán null
        if (req.file != null) {
            req.body.PhotoUrl = req.file.path;
        }
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'PhotoUrl',
            'PhotoID',
            'AlbumID'
        ];
        // Kiểm tra xem có đủ các trường của FamilyPhoto không
        const missingFields = CoreFunction.missingFields(requiredFields, req.body);
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            CoreFunction.deleteImage(req.file);
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        let dataPhotoID = await FamilyPhotoManagementService.getFamilyPhotoById(req.body.PhotoID);
        if (dataPhotoID == null || dataPhotoID.length == 0) {
            CoreFunction.deleteImage(req.file);
            return res.send(Response.dataNotFoundResponse(null, "PhotoID not found"));
        }
        let dataAlbumID = await FamilyPhotoManagementService.getFamilyPhotoByAlbumId(req.body.AlbumID);
        if (dataAlbumID == null || dataAlbumID.length == 0) {
            CoreFunction.deleteImage(req.file);
            return res.send(Response.dataNotFoundResponse(null, "AlbumID not found"));
        }
        req.body.PhotoUrl = dataPhotoID[0].PhotoUrl;
        // cập nhật FamilyPhoto vào database
        let dataUpdate = await FamilyPhotoManagementService.updateFamilyPhoto(req.body)
        dataRes = {
            affectedRows: dataUpdate.affectedRows,
            PhotoUrl: req.body.PhotoUrl
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        CoreFunction.deleteImage(req.file);
        return res.send(Response.internalServerErrorResponse());
    }
};

var deleteFamilyPhoto = async (req, res) => {
    try {
        // các trường bắt buộc phải có trong req.query
        const requiredFields = [
            'PhotoID'
        ];
        // Kiểm tra xem có đủ các trường của FamilyPhoto không
        const missingFields = CoreFunction.missingFields(requiredFields, req.query);
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        let dataPhotoID = await FamilyPhotoManagementService.getFamilyPhotoById(req.query.PhotoID);
        if (dataPhotoID == null || dataPhotoID.length == 0) {
            return res.send(Response.dataNotFoundResponse(null, "PhotoID not found"));
        }
        // xóa FamilyPhoto khỏi database
        let dataDelete = await FamilyPhotoManagementService.removeFamilyPhoto(req.query.PhotoID)
        if (dataDelete.affectedRows == 0) {
            return res.send(Response.dataNotFoundResponse(null, "PhotoID not found"));
        }
        dataRes = {
            affectedRows: dataDelete.affectedRows
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse());
    }
};


var getFamilyPhoto = async (req, res) => {
    try {
        // Log ra thông tin trong req.query
        console.log('Request query: ', req.query);
        // lấy thông tin FamilyPhoto từ database
        // những thông tin có thể lấy được: PhotoID, AlbumID
        let data;
        if (req.query.PhotoID != null && req.query.PhotoID != undefined && req.query.PhotoID != "") {
            console.log(`Get FamilyPhoto by PhotoID : ${req.query.PhotoID}`);
            data = await FamilyPhotoManagementService.getFamilyPhotoById(req.query.PhotoID);
        } else if (req.query.AlbumID != null && req.query.AlbumID != undefined && req.query.AlbumID != "") {
            console.log(`Get FamilyPhoto by AlbumID : ${req.query.AlbumID}`);
            data = await FamilyPhotoManagementService.getFamilyPhotoByAlbumId(req.query.AlbumID);
        }
        console.log("data: " + data);
        if (data == null || data.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        } else {
            return res.send(Response.successResponse(data));
        }

    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse());
    }
};

var getAllFamilyPhotos = async (req, res) => {
    try {
        // lấy thông tin tất cả FamilyPhoto từ database
        let data = await FamilyPhotoManagementService.getAllFamilyPhoto();
        return res.send(Response.successResponse(data));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse());
    }
};



module.exports = { addFamilyPhoto, updateFamilyPhoto, deleteFamilyPhoto, getFamilyPhoto, getAllFamilyPhotos };
