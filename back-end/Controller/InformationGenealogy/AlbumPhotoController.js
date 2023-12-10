const AlbumPhotoManagementService = require("../../service/InformationGenealogy/AlbumPhotoManagement");
const Response = require("../../Utils/Response");
const CoreFunction = require("../../Utils/CoreFunction");

var addAlbumPhoto = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // nếu có file ảnh thì lưu đường dẫn vào req.body.BackGroundPhoto, còn ko thì gán null
        if (req.file != null) {
            // nếu file ảnh ko thuộc png, jpg, jpeg thì ko cho update
            if (!req.file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                CoreFunction.deleteImage(req.file.path);
                return res.send(Response.badRequestResponse(null, "File ảnh không hợp lệ"));
            }
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
            CoreFunction.deleteImage(req.file.path);
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        let checkCodeIDExistResponse = await checkFamilyTreeExist(req);
        if (checkCodeIDExistResponse.success == false) {
            CoreFunction.deleteImage(req.file.path);
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
        CoreFunction.deleteImage(req.file.path);
        return res.send(Response.internalServerErrorResponse());
    }
};



var updateAlbumPhoto = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        console.log("req.file: ", req.file);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'AlbumID',
            'AlbumName',
            'CodeID'
        ];
        // Kiểm tra xem có đủ các trường của AlbumPhoto không
        const missingFields = CoreFunction.missingFields(requiredFields, req.body);
        console.log(missingFields);

        if (!CoreFunction.isDataStringExist(req.file)) {
            console.log("Không có file ảnh");
            // trong trường hợp thiếu trường bắt buộc
            if (missingFields.length) {
                return res.send(Response.missingFieldsErrorResponse(missingFields));
            }
            console.log("No missing fields");
            let albumData = await AlbumPhotoManagementService.getAlbumPhotoById(req.body.AlbumID);
            if (albumData == null || albumData.length == 0) {
                return res.send(Response.dataNotFoundResponse());
            }
            let albumCodeIDData = await AlbumPhotoManagementService.getAlbumPhotoByCodeId(req.body.CodeID);
            if (albumCodeIDData == null || albumCodeIDData.length == 0) {
                return res.send(Response.dataNotFoundResponse());
            }
            req.body.BackGroundPhoto = albumData[0].BackGroundPhoto;
        } else {
            console.log("req.file: ", req.file);
            // trong trường hợp thiếu trường bắt buộc
            if (missingFields.length) {
                CoreFunction.deleteImage(req.file.path);
                return res.send(Response.missingFieldsErrorResponse(missingFields));
            }
            console.log("No missing fields");
            // nếu file ảnh ko thuộc png, jpg, jpeg thì ko cho update
            if (!req.file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                CoreFunction.deleteImage(req.file.path);
                return res.send(Response.badRequestResponse(null, "File ảnh không hợp lệ"));
            }
            let albumData = await AlbumPhotoManagementService.getAlbumPhotoById(req.body.AlbumID);
            if (albumData == null || albumData.length == 0) {
                CoreFunction.deleteImage(req.file.path);
                return res.send(Response.dataNotFoundResponse());
            }
            let albumCodeIDData = await AlbumPhotoManagementService.getAlbumPhotoByCodeId(req.body.CodeID);
            if (albumCodeIDData == null || albumCodeIDData.length == 0) {
                CoreFunction.deleteImage(req.file.path);
                return res.send(Response.dataNotFoundResponse());
            }

            req.body.BackGroundPhoto = req.file.path;
        }


        // cập nhật AlbumPhoto vào database
        let dataUpdate = await AlbumPhotoManagementService.updateAlbumPhoto(req.body)
        dataRes = {
            affectedRows: dataUpdate.affectedRows,
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        CoreFunction.deleteImage(req.file.path);
        return res.send(Response.internalServerErrorResponse());
    }
};

var checkFamilyTreeExist = async (req) => {
    try {
        let dataCodeID;
        if (req.body.CodeID != null && req.body.CodeID && req.body.CodeID != "") {
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
//Nguyễn Lê Hùng
var searchAlbumPhoto = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let keySearch = req.query.keySearch;
        let data = await AlbumPhotoManagementService.searchAlbumPhoto(CodeID, keySearch);
        if (data) {
            return res.send(Response.successResponse(data))
        } else {
            return res.send(Response.dataNotFoundResponse())
        }
    } catch (error) {
        return res.send(Response.dataNotFoundResponse(error))
    }
}
// nguyễn anh tuấn
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
        let albumData = await AlbumPhotoManagementService.getAlbumPhotoById(req.query.AlbumID);
        if (albumData == null || albumData.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        }
        // xóa ảnh
        CoreFunction.deleteImage(albumData[0].BackGroundPhoto);
        // xóa AlbumPhoto khỏi database
        let dataDelete = await AlbumPhotoManagementService.removeAlbumPhoto(req.query.AlbumID)
        let dataRes = {
            affectedRows: dataDelete.affectedRows
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse());
    }
};

// nguyễn anh tuấn
var getAlbumPhoto = async (req, res) => {
    try {
        // Log ra thông tin trong req.query
        console.log('Request query: ', req.query);
        // lấy thông tin AlbumPhoto từ database
        // những thông tin có thể lấy được : AlbumID, CodeID
        let data;
        if (req.query.AlbumID != null && req.query.AlbumID != undefined && req.query.AlbumID != "") {
            console.log(`Get AlbumPhoto by AlbumID : ${req.query.AlbumID}`);
            data = await AlbumPhotoManagementService.getAlbumPhotoById(req.query.AlbumID)
        } else if (req.query.CodeID != null && req.query.CodeID && req.query.CodeID != "") {
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


module.exports = { addAlbumPhoto, updateAlbumPhoto, deleteAlbumPhoto, getAlbumPhoto, searchAlbumPhoto };
