const AlbumPhotoManagementService = require("../../service/InformationGenealogy/AlbumPhotoManagement");
const Response = require("../../Utils/Response");
const CoreFunction = require("../../Utils/CoreFunction");

var addAlbumPhoto = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // nếu có file ảnh thì lưu đường dẫn vào req.body.BackGroundPhoto, còn ko thì gán null
        if (req.file != null) {
            req.body.BackGroundPhoto = req.file.path;
        } else {
            req.body.BackGroundPhoto = null;
        }
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
            CoreFunction.deleteImage(req.file);
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        let checkCodeIDExistResponse = await checkFamilyTreeExist(req);
        if (checkCodeIDExistResponse.success === false) {
            CoreFunction.deleteImage(req.file);
            return res.send(checkCodeIDExistResponse);
        }
        // Thêm thông tin vào bảng albumphoto
        let data = await AlbumPhotoManagementService.insertAlbumPhoto(req.body);
        dataRes = {
            AlbumID: data.insertId,
            affectedRows: data.affectedRows
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        CoreFunction.deleteImage(req.file);
        return res.send(Response.internalServerErrorResponse());
    }
};



var updateAlbumPhoto = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // nếu có file ảnh thì lưu đường dẫn vào req.body.BackGroundPhoto, còn ko thì gán null
        if (req.file != null) {
            req.body.BackGroundPhoto = req.file.path;
        } else {
            req.body.BackGroundPhoto = null;
        }
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
            CoreFunction.deleteImage(req.file);
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");

        let checkAlbumExistResponse = await checkAlbumExist(req.body.AlbumID, req.body.CodeID);
        if (checkAlbumExistResponse.success === false) {
            CoreFunction.deleteImage(req.file);
            return res.send(checkAlbumExistResponse);
        }
        // cập nhật AlbumPhoto vào database
        let dataUpdate = await AlbumPhotoManagementService.updateAlbumPhoto(req.body)
        dataRes = {
            affectedRows: dataUpdate.affectedRows,
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        CoreFunction.deleteImage(req.file);
        return res.send(Response.internalServerErrorResponse());
    }
};

var checkAlbumExist = async (AlbumID, CodeID) => {
    try {
        let checkAlbumIDExistResponse = await checkAlbumIDExist(AlbumID);
        if (checkAlbumIDExistResponse.success === false) {
            return checkAlbumIDExistResponse;
        }
        let checkCodeIDExistResponse = await checkCodeIDExist(CodeID);
        if (checkCodeIDExistResponse.success === false) {
            return checkCodeIDExistResponse;
        }
        return Response.successResponse();
    } catch (e) {
        console.log("Error: " + e);
        return Response.internalServerErrorResponse();
    }
}

var checkAlbumIDExist = async (AlbumID) => {
    try {
        let dataAlbumID;
        if (AlbumID != null && AlbumID != undefined && AlbumID !== "") {
            console.log(`Get AlbumPhoto by AlbumID : ${AlbumID}`);
            dataAlbumID = await AlbumPhotoManagementService.getAlbumPhotoById(AlbumID)
        }
        console.log("dataAlbumID: " + dataAlbumID);
        if (dataAlbumID == null || dataAlbumID.length == 0) {
            return Response.dataNotFoundResponse();
        }
        return Response.successResponse();
    } catch (e) {
        console.log("Error: " + e);
        return Response.internalServerErrorResponse();
    }
}

var checkCodeIDExist = async (CodeID) => {
    try {
        let dataCodeID;
        if (CodeID != null && CodeID != undefined && CodeID !== "") {
            console.log(`Get AlbumPhoto by CodeID : ${CodeID}`);
            dataCodeID = await AlbumPhotoManagementService.getAlbumPhotoByCodeId(CodeID)
        }
        console.log("dataCodeID: " + dataCodeID);
        if (dataCodeID == null || dataCodeID.length == 0) {
            return Response.dataNotFoundResponse();
        }
        return Response.successResponse();
    } catch (e) {
        console.log("Error: " + e);
        return Response.internalServerErrorResponse();
    }
}
var checkFamilyTreeExist = async (req) => {
    try {
        let dataCodeID;
        if (req.body.CodeID != null && req.body.CodeID && req.body.CodeID !== "") {
            console.log(`Get AlbumPhoto by CodeID : ${req.body.CodeID}`);
            dataCodeID = await AlbumPhotoManagementService.getFamilyTreeData(req.body.CodeID)
        }
        console.log("dataCodeID: " + dataCodeID);
        if (dataCodeID == null || dataCodeID.length == 0) {
            return Response.dataNotFoundResponse();
        }
        return Response.successResponse();
    } catch (e) {
        console.log("Error: " + e);
        return Response.internalServerErrorResponse();
    }
}
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
        let checkAlbumIDExistResponse = await checkAlbumIDExist(req.query.AlbumID);
        if (checkAlbumIDExistResponse.success === false) {
            return res.send(checkAlbumIDExistResponse);
        }
        // xóa AlbumPhoto khỏi database
        let dataDelete = await AlbumPhotoManagementService.removeAlbumPhoto(req.query.AlbumID)
        dataRes = {
            affectedRows: dataDelete.affectedRows
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse());
    }
};


var getAlbumPhoto = async (req, res) => {
    try {
        // Log ra thông tin trong req.query
        console.log('Request query: ', req.query);
        // lấy thông tin AlbumPhoto từ database
        // những thông tin có thể lấy được : AlbumID, CodeID
        let data;
        if (req.query.AlbumID != null && req.query.AlbumID != undefined && req.query.AlbumID !== "") {
            console.log(`Get AlbumPhoto by AlbumID : ${req.query.AlbumID}`);
            data = await AlbumPhotoManagementService.getAlbumPhotoById(req.query.AlbumID)
        } else if (req.query.CodeID != null && req.query.CodeID && req.query.CodeID !== "") {
            console.log(`Get AlbumPhoto by CodeID : ${req.query.CodeID}`);
            data = await AlbumPhotoManagementService.getAlbumPhotoByCodeId(req.query.CodeID)
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

var getAllAlbumPhotos = async (req, res) => {
    try {
        // lấy thông tin tất cả AlbumPhoto từ database
        let data = await AlbumPhotoManagementService.getAllAlbumPhoto();
        return res.send(Response.successResponse(data));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse());
    }
};



module.exports = { addAlbumPhoto, updateAlbumPhoto, deleteAlbumPhoto, getAlbumPhoto, getAllAlbumPhotos };
