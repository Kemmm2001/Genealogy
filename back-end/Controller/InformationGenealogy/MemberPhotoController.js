const MemberPhotoManagementService = require("../../service/InformationGenealogy/MemberPhotoManagement");
const Response = require("../../Utils/Response");

var addMemberPhoto = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        console.log('Request file: ', req.file);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'AlbumID'
        ];
        // Kiểm tra xem có đủ các trường của MemberPhoto không
        const missingFields = requiredFields.filter(field => !(field in req.body));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        req.body.PhotoUrl = req.file.path;
        // Thêm thông tin vào bảng memberphoto
        let data = await MemberPhotoManagementService.insertMemberPhoto(req.body);
        dataRes = {
            message: "Add memberphoto successfully",
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
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'PhotoID',
            'AlbumID'
        ];
        // Kiểm tra xem có đủ các trường của MemberPhoto không
        const missingFields = requiredFields.filter(field => !(field in req.body));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        req.body.PhotoUrl = req.file.path;
        // cập nhật MemberPhoto vào database
        let dataUpdate = await MemberPhotoManagementService.updateMemberPhoto(req.body)
        dataRes = {
            message: "Update MemberPhoto successfully",
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
        const missingFields = requiredFields.filter(field => !(field in req.query));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // xóa MemberPhoto khỏi database
        let dataDelete = await MemberPhotoManagementService.removeMemberPhoto(req.query.PhotoID)
        dataRes = {
            message: "Delete MemberPhoto successfully",
            affectedRows: dataDelete.affectedRows
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};


var getMemberPhotoById = async (req, res) => {
    try {
        // Log ra thông tin trong req.params
        console.log('Request params: ', req.params);
        // các trường bắt buộc phải có trong req.params
        const requiredFields = [
            'id'
        ];
        // Kiểm tra xem có đủ các trường của MemberPhoto không
        const missingFields = requiredFields.filter(field => !(field in req.params));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // lấy thông tin MemberPhoto từ database
        let data = await MemberPhotoManagementService.getMemberPhotoById(req.params.id)
        if (data == null || data.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        } else {
            dataRes = {
                message: "View one MemberPhoto successfully",
                data: data
            }
            return res.send(Response.successResponse(dataRes));
        }

    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};

var getMemberPhotoByAlbumId = async (req, res) => {
    try {
        // Log ra thông tin trong req.params
        console.log('Request params: ', req.params);
        // các trường bắt buộc phải có trong req.params
        const requiredFields = [
            'id'
        ];
        // Kiểm tra xem có đủ các trường của MemberPhoto không
        const missingFields = requiredFields.filter(field => !(field in req.params));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // lấy thông tin MemberPhoto từ database
        let data = await MemberPhotoManagementService.getMemberPhotoByAlbumId(req.params.id)
        if (data == null || data.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        } else {
            dataRes = {
                message: "View one MemberPhoto successfully",
                data: data
            }
            return res.send(Response.successResponse(dataRes));
        }
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};


var getAllMemberPhotos = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // lấy thông tin tất cả MemberPhoto từ database
        let data = await MemberPhotoManagementService.getAllMemberPhoto();
        dataRes = {
            message: "View all MemberPhoto successfully",
            data: data
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};



module.exports = { addMemberPhoto, updateMemberPhoto, deleteMemberPhoto, getMemberPhotoById, getMemberPhotoByAlbumId, getAllMemberPhotos };
