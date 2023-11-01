const AlbumPhotoManagementService = require("../../service/InformationGenealogy/AlbumPhotoManagement");
const Response = require("../../Utils/Response");

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
        const missingFields = requiredFields.filter(field => !(field in req.body));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // Thêm thông tin vào bảng albumphoto
        let data = await AlbumPhotoManagementService.insertAlbumPhoto(req.body);
        dataRes = {
            message: "Add albumphoto successfully",
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
        const missingFields = requiredFields.filter(field => !(field in req.body));
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
            message: "Update AlbumPhoto successfully",
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
        // Log ra thông tin trong req.params
        console.log('Request params: ', req.params);
        // các trường bắt buộc phải có trong req.params
        const requiredFields = [
            'AlbumID'
        ];
        // Kiểm tra xem có đủ các trường của AlbumPhoto không
        const missingFields = requiredFields.filter(field => !(field in req.params));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // lấy thông tin AlbumPhoto từ database
        let data = await AlbumPhotoManagementService.getAlbumPhotoById(req.params.AlbumID)
        if (data == null || data.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        }
        // xóa AlbumPhoto khỏi database
        let dataDelete = await AlbumPhotoManagementService.removeAlbumPhoto(req.params.AlbumID)
        dataRes = {
            message: "Delete AlbumPhoto successfully",
            affectedRows: dataDelete.affectedRows
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};


var getAlbumPhotoById = async (req, res) => {
    try {
        // Log ra thông tin trong req.params
        console.log('Request params: ', req.params);
        // các trường bắt buộc phải có trong req.params
        const requiredFields = [
            'id'
        ];
        // Kiểm tra xem có đủ các trường của AlbumPhoto không
        const missingFields = requiredFields.filter(field => !(field in req.params));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // lấy thông tin AlbumPhoto từ database
        let data = await AlbumPhotoManagementService.getAlbumPhotoById(req.params.id)
        if (data == null || data.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        } else {
            dataRes = {
                message: "View one AlbumPhoto successfully",
                data: data
            }
            return res.send(Response.successResponse(dataRes));
        }
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};

var getAlbumPhotoByCodeId = async (req, res) => {
    try {
        // Log ra thông tin trong req.params
        console.log('Request params: ', req.params);
        // các trường bắt buộc phải có trong req.params
        const requiredFields = [
            'id'
        ];
        // Kiểm tra xem có đủ các trường của AlbumPhoto không
        const missingFields = requiredFields.filter(field => !(field in req.params));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // lấy thông tin AlbumPhoto từ database
        let data = await AlbumPhotoManagementService.getAlbumPhotoByCodeId(req.params.id)
        if (data == null || data.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        } else {
            dataRes = {
                message: "View one AlbumPhoto successfully",
                data: data
            }
            return res.send(Response.successResponse(dataRes));
        }
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};


var getAllAlbumPhotos = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // lấy thông tin tất cả AlbumPhoto từ database
        let data = await AlbumPhotoManagementService.getAllAlbumPhoto();
        dataRes = {
            message: "View all AlbumPhoto successfully",
            data: data
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};



module.exports = { addAlbumPhoto, updateAlbumPhoto, deleteAlbumPhoto, getAlbumPhotoById, getAlbumPhotoByCodeId, getAllAlbumPhotos };
