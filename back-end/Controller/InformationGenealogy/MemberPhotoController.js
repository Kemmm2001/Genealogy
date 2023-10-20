const MemberPhotoManagementService = require("../../service/InformationGenealogy/MemberPhotoManagement");

function missingFieldsError(missingFields) {
    console.error(`Missing required fields: ${missingFields.join(', ')}`);
    return response = {
        success: false,
        message: 'Missing required fields',
        missingFields: missingFields
    };
}

function noDataFound(res) {
    message = "No data found";
    console.log(message);
    response = {
        success: false,
        message: message
    };
    return res.status(404).json(response);
}

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
            return res.status(400).json(missingFieldsError(missingFields));
        }
        console.log("No missing fields");
        req.body.PhotoUrl = req.file.path;
        // Thêm thông tin vào bảng memberphoto
        let data = await MemberPhotoManagementService.insertMemberPhoto(req.body);
        message = "Add memberphoto successfully";
        console.log(message);
        response = {
            success: true,
            message: message,
            data: {
                PhotoID: data.insertId,
                affectedRows: data.affectedRows
            }
        };
        return res.json(response);
    } catch (e) {
        console.log(e);
        res.send(e);
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
            return res.status(400).json(missingFieldsError(missingFields));
        }
        console.log("No missing fields");
        req.body.PhotoUrl = req.file.path;
        // cập nhật MemberPhoto vào database
        let dataUpdate = await MemberPhotoManagementService.updateMemberPhoto(req.body)

        message = "Update MemberPhoto successfully";
        console.log(message);
        response = {
            success: true,
            message: message,
            data: {
                affectedRows: dataUpdate.affectedRows,
            }
        };

        return res.json(response);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
};

var deleteMemberPhoto = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'PhotoID'
        ];
        // Kiểm tra xem có đủ các trường của MemberPhoto không
        const missingFields = requiredFields.filter(field => !(field in req.body));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.status(400).json(missingFieldsError(missingFields));
        }
        console.log("No missing fields");
        // xóa MemberPhoto khỏi database
        let dataDelete = await MemberPhotoManagementService.removeMemberPhoto(req.body.PhotoID)

        message = "Delete MemberPhoto successfully";
        console.log(message);
        response = {
            success: true,
            message: message,
            data: {
                affectedRows: dataDelete.affectedRows
            }
        };
        return res.json(response);
    } catch (e) {
        console.log(e);
        res.send(e);
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
            return res.status(400).json(missingFieldsError(missingFields));
        }

        console.log("No missing fields");
        // lấy thông tin MemberPhoto từ database
        let data = await MemberPhotoManagementService.getMemberPhotoById(req.params.id)

        message = "View one MemberPhoto successfully";
        console.log(message);
        response = {
            success: true,
            message: message,
            data: data
        };
        return res.json(response);


    } catch (e) {
        console.log(e);
        res.send(e);
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
            return res.status(400).json(missingFieldsError(missingFields));
        }

        console.log("No missing fields");
        // lấy thông tin MemberPhoto từ database
        let data = await MemberPhotoManagementService.getMemberPhotoByAlbumId(req.params.id)
        message = "View one MemberPhoto successfully";
        console.log(message);
        response = {
            success: true,
            message: message,
            data: data
        };
        return res.json(response);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
};


var getAllMemberPhotos = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // lấy thông tin tất cả MemberPhoto từ database
        let data = await MemberPhotoManagementService.getAllMemberPhoto();
        message = "View all MemberPhoto successfully";
        console.log(message);
        response = {
            success: true,
            message: message,
            data: data
        };
        return res.json(response);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
};



module.exports = { addMemberPhoto, updateMemberPhoto, deleteMemberPhoto, getMemberPhotoById, getMemberPhotoByAlbumId, getAllMemberPhotos };
