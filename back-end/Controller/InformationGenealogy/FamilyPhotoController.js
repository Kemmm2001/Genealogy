const FamilyPhotoManagementService = require("../../service/InformationGenealogy/FamilyPhotoManagement");
const Response = require("../../Utils/Response");
const CoreFunction = require("../../Utils/CoreFunction");

var addFamilyPhoto = async (req, res) => {
    try {
        let reqData = {
            PhotoUrl: req.file.path,
            AlbumID: req.body.AlbumID
        };
        // Log ra thông tin trong req.body
        console.log('Request body: ', reqData);
        // các trường bắt buộc phải có trong reqData
        const requiredFields = [
            'PhotoUrl',
            'AlbumID'
        ];
        // Kiểm tra xem có đủ các trường của FamilyPhoto không
        const missingFields = CoreFunction.missingFields(requiredFields, reqData);
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // Thêm thông tin vào bảng Familyphoto
        let data = await FamilyPhotoManagementService.insertFamilyPhoto(reqData);
        dataRes = {
            PhotoID: data.insertId,
            affectedRows: data.affectedRows,
            PhotoUrl : reqData.PhotoUrl
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};



var updateFamilyPhoto = async (req, res) => {
    try {
        let reqData = {
            PhotoUrl: req.file.path,
            AlbumID: req.body.AlbumID,
            PhotoID: req.body.PhotoID
        };
        // Log ra thông tin trong req.body
        console.log('Request body: ', reqData);
        // các trường bắt buộc phải có trong reqData
        const requiredFields = [
            'PhotoUrl',
            'PhotoID',
            'AlbumID'
        ];
        // Kiểm tra xem có đủ các trường của FamilyPhoto không
        const missingFields = CoreFunction.missingFields(requiredFields, reqData);
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        let dataPhotoID = await FamilyPhotoManagementService.getFamilyPhotoById(reqData.PhotoID);
        if (dataPhotoID == null || dataPhotoID.length == 0) {
            return res.send(Response.dataNotFoundResponse(null, "PhotoID not found"));
        }
        let dataAlbumID = await FamilyPhotoManagementService.getFamilyPhotoByAlbumId(reqData.AlbumID);
        if (dataAlbumID == null || dataAlbumID.length == 0) {
            return res.send(Response.dataNotFoundResponse(null, "AlbumID not found"));
        }
        // cập nhật FamilyPhoto vào database
        let dataUpdate = await FamilyPhotoManagementService.updateFamilyPhoto(reqData)
        dataRes = {
            affectedRows: dataUpdate.affectedRows,
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
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
        // xóa FamilyPhoto khỏi database
        let dataDelete = await FamilyPhotoManagementService.removeFamilyPhoto(req.query.PhotoID)
        if(dataDelete.affectedRows == 0){
            return res.send(Response.dataNotFoundResponse(null, "PhotoID not found"));
        }
        dataRes = {
            affectedRows: dataDelete.affectedRows
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};


var getFamilyPhoto = async (req, res) => {
    try {
        let reqData = req.query;
        // Log ra thông tin trong req.query
        console.log('Request query: ', reqData);
        // lấy thông tin FamilyPhoto từ database
        // những thông tin có thể lấy được: PhotoID, AlbumID
        let data;
        if (reqData.PhotoID != null && reqData.PhotoID != undefined && reqData.PhotoID !== "") {
            console.log(`Get FamilyPhoto by PhotoID : ${reqData.PhotoID}`);
            data = await FamilyPhotoManagementService.getFamilyPhotoById(reqData.PhotoID);
        } else if (reqData.AlbumID != null && reqData.AlbumID != undefined && reqData.AlbumID !== "") {
            console.log(`Get FamilyPhoto by AlbumID : ${reqData.AlbumID}`);
            data = await FamilyPhotoManagementService.getFamilyPhotoByAlbumId(reqData.AlbumID);
        }
        console.log("data: " + data);
        if (data == null || data.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        } else {
            return res.send(Response.successResponse(data));
        }

    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};

var getAllFamilyPhotos = async (req, res) => {
    try {
        // lấy thông tin tất cả FamilyPhoto từ database
        let data = await FamilyPhotoManagementService.getAllFamilyPhoto();
        return res.send(Response.successResponse(data));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};



module.exports = { addFamilyPhoto, updateFamilyPhoto, deleteFamilyPhoto, getFamilyPhoto, getAllFamilyPhotos };
