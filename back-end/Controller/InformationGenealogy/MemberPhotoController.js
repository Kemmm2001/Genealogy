const MemberPhotoManagementService = require("../../service/InformationGenealogy/MemberPhotoManagement");
const Response = require("../../Utils/Response");
const CoreFunction = require("../../Utils/CoreFunction");

var addMemberPhoto = async (req, res) => {
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
        // Kiểm tra xem có đủ các trường của MemberPhoto không
        const missingFields = CoreFunction.missingFields(requiredFields, reqData);
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // Thêm thông tin vào bảng memberphoto
        let data = await MemberPhotoManagementService.insertMemberPhoto(reqData);
        dataRes = {
            PhotoID: data.insertId,
            affectedRows: data.affectedRows
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};



var updateMemberPhoto = async (req, res) => {
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
        // Kiểm tra xem có đủ các trường của MemberPhoto không
        const missingFields = CoreFunction.missingFields(requiredFields, reqData);
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        let dataPhotoID = await MemberPhotoManagementService.getMemberPhotoById(reqData.PhotoID);
        if (dataPhotoID == null || dataPhotoID.length == 0) {
            return res.send(Response.dataNotFoundResponse(null, "PhotoID not found"));
        }
        let dataAlbumID = await MemberPhotoManagementService.getMemberPhotoByAlbumId(reqData.AlbumID);
        if (dataAlbumID == null || dataAlbumID.length == 0) {
            return res.send(Response.dataNotFoundResponse(null, "AlbumID not found"));
        }
        // cập nhật MemberPhoto vào database
        let dataUpdate = await MemberPhotoManagementService.updateMemberPhoto(reqData)
        dataRes = {
            affectedRows: dataUpdate.affectedRows,
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};

var deleteMemberPhoto = async (req, res) => {
    try {
        // các trường bắt buộc phải có trong req.query
        const requiredFields = [
            'PhotoID'
        ];
        // Kiểm tra xem có đủ các trường của MemberPhoto không
        const missingFields = CoreFunction.missingFields(requiredFields, req.query);
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // xóa MemberPhoto khỏi database
        let dataDelete = await MemberPhotoManagementService.removeMemberPhoto(req.query.PhotoID)
        dataRes = {
            affectedRows: dataDelete.affectedRows
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};


var getMemberPhoto = async (req, res) => {
    try {
        let reqData = req.query;
        // Log ra thông tin trong req.query
        console.log('Request query: ', reqData);
        // lấy thông tin MemberPhoto từ database
        // những thông tin có thể lấy được: PhotoID, AlbumID
        let data;
        if (reqData.PhotoID != null && reqData.PhotoID != undefined && reqData.PhotoID !== "") {
            console.log(`Get MemberPhoto by PhotoID : ${reqData.PhotoID}`);
            data = await MemberPhotoManagementService.getMemberPhotoById(reqData.PhotoID);
        } else if (reqData.AlbumID != null && reqData.AlbumID != undefined && reqData.AlbumID !== "") {
            console.log(`Get MemberPhoto by AlbumID : ${reqData.AlbumID}`);
            data = await MemberPhotoManagementService.getMemberPhotoByAlbumId(reqData.AlbumID);
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

var getAllMemberPhotos = async (req, res) => {
    try {
        // lấy thông tin tất cả MemberPhoto từ database
        let data = await MemberPhotoManagementService.getAllMemberPhoto();
        return res.send(Response.successResponse(data));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};



module.exports = { addMemberPhoto, updateMemberPhoto, deleteMemberPhoto, getMemberPhoto, getAllMemberPhotos };
