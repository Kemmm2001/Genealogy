const AlbumPhotoManagementService = require("../../service/InformationGenealogy/AlbumPhotoManagement");
const Response = require("../../Utils/Response");
const CoreFunction = require("../../Utils/CoreFunction");

var addAlbumPhoto = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'AlbumName',
            'CodeID'
        ];
        // Kiểm tra xem có đủ các trường của AlbumPhoto không
        const missingFields = CoreFunction.missingFields(requiredFields, req.body);
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // Thêm thông tin vào bảng albumphoto
        let data = await AlbumPhotoManagementService.insertAlbumPhoto(req.body);
        dataRes = {
            AlbumID: data.insertId,
            affectedRows: data.affectedRows
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};



var updateAlbumPhoto = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'AlbumID',
            'AlbumName',
            'CodeID'
        ];
        // Kiểm tra xem có đủ các trường của AlbumPhoto không
        const missingFields = CoreFunction.missingFields(requiredFields, req.body);
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");

        // lấy thông tin AlbumPhoto từ database
        let data = await AlbumPhotoManagementService.getAlbumPhotoById(req.body.AlbumID)
        if (data == null || data.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        }
        // cập nhật AlbumPhoto vào database
        let dataUpdate = await AlbumPhotoManagementService.updateAlbumPhoto(req.body)
        dataRes = {
            affectedRows: dataUpdate.affectedRows,
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};

var deleteAlbumPhoto = async (req, res) => {
    try {
        // Log ra thông tin trong req.query
        console.log('Request query: ', req.query);
        // các trường bắt buộc phải có trong req.query
        const requiredFields = [
            'AlbumID'
        ];
        // Kiểm tra xem có đủ các trường của AlbumPhoto không
        const missingFields = CoreFunction.missingFields(requiredFields, req.query);
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // lấy thông tin AlbumPhoto từ database
        let data = await AlbumPhotoManagementService.getAlbumPhotoById(req.query.AlbumID)
        if (data == null || data.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        }
        // xóa AlbumPhoto khỏi database
        let dataDelete = await AlbumPhotoManagementService.removeAlbumPhoto(req.query.AlbumID)
        dataRes = {
            affectedRows: dataDelete.affectedRows
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};


var getAlbumPhoto = async (req, res) => {
    try {
        let reqData = req.query;
        // Log ra thông tin trong req.query
        console.log('Request query: ', reqData);
        // lấy thông tin AlbumPhoto từ database
        // những thông tin có thể lấy được : AlbumID, CodeID
        let data;
        if (reqData.AlbumID != null && reqData.AlbumID != undefined && reqData.AlbumID !== "") {
            console.log(`Get AlbumPhoto by AlbumID : ${reqData.AlbumID}`);
            data = await AlbumPhotoManagementService.getAlbumPhotoById(reqData.AlbumID)
        }else if (reqData.CodeID != null && reqData.CodeID && reqData.CodeID !== "") {
            console.log(`Get AlbumPhoto by CodeID : ${reqData.CodeID}`);
            data = await AlbumPhotoManagementService.getAlbumPhotoByCodeId(reqData.CodeID)
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

var getAllAlbumPhotos = async (req, res) => {
    try {
        // lấy thông tin tất cả AlbumPhoto từ database
        let data = await AlbumPhotoManagementService.getAllAlbumPhoto();
        return res.send(Response.successResponse(data));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};



module.exports = { addAlbumPhoto, updateAlbumPhoto, deleteAlbumPhoto, getAlbumPhoto, getAllAlbumPhotos };
