const AlbumPhotoManagementService = require("../../service/InformationGenealogy/AlbumPhotoManagement");

missingFieldsError = function (missingFields) {
    console.error(`Missing required fields: ${missingFields.join(', ')}`);
    return response = {
        success: false,
        message: 'Missing required fields',
        missingFields: missingFields
    };
}

noDataFound = function (res) {
    message = "No data found";
    console.log(message);
    response = {
        success: false,
        message: message
    };
    return res.status(404).json(response);
}

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
            return res.status(400).json(missingFieldsError(missingFields));
        }
        console.log("No missing fields");
        // Thêm thông tin vào bảng albumphoto
        let data = await AlbumPhotoManagementService.insertAlbumPhoto(req.body);
        message = "Add albumphoto successfully";
        console.log(message);
        response = {
            success: true,
            message: message,
            data: {
                AlbumID: data.insertId,
                affectedRows: data.affectedRows
            }
        };
        return res.json(response);
    } catch (e) {
        console.log(e);
        response = {
            success: false,
            message: 'Something went wrong'
        };
        res.send(response);
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
            return res.status(400).json(missingFieldsError(missingFields));
        }
        console.log("No missing fields");

        // lấy thông tin AlbumPhoto từ database
        let data = await AlbumPhotoManagementService.getAlbumPhotoById(req.body.AlbumID)
        if (data == null || data.length == 0) {
            return noDataFound(res);
        }
        // cập nhật AlbumPhoto vào database
        let dataUpdate = await AlbumPhotoManagementService.updateAlbumPhoto(req.body)

        message = "Update AlbumPhoto successfully";
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
        response = {
            success: false,
            message: 'Something went wrong'
        };
        res.send(response);
    }
};

var deleteAlbumPhoto = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'AlbumID'
        ];
        // Kiểm tra xem có đủ các trường của AlbumPhoto không
        const missingFields = requiredFields.filter(field => !(field in req.body));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.status(400).json(missingFieldsError(missingFields));
        }
        console.log("No missing fields");
        // lấy thông tin AlbumPhoto từ database
        let data = await AlbumPhotoManagementService.getAlbumPhotoById(req.body.AlbumID)
        if (data == null || data.length == 0) {
            return noDataFound(res);
        }
        // xóa AlbumPhoto khỏi database
        let dataDelete = await AlbumPhotoManagementService.removeAlbumPhoto(req.body.AlbumID)

        message = "Delete AlbumPhoto successfully";
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
        response = {
            success: false,
            message: 'Something went wrong'
        };
        res.send(response);
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
            return res.status(400).json(missingFieldsError(missingFields));
        }

        console.log("No missing fields");
        // lấy thông tin AlbumPhoto từ database
        let data = await AlbumPhotoManagementService.getAlbumPhotoById(req.params.id)
        if (data == null || data.length == 0) {
            return noDataFound(res);
        } else {
            message = "View one AlbumPhoto successfully";
            console.log(message);
            response = {
                success: true,
                message: message,
                data: data
            };
        }
        return res.json(response);


    } catch (e) {
        console.log(e);
        response = {
            success: false,
            message: 'Something went wrong'
        };
        res.send(response);
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
            return res.status(400).json(missingFieldsError(missingFields));
        }

        console.log("No missing fields");
        // lấy thông tin AlbumPhoto từ database
        let data = await AlbumPhotoManagementService.getAlbumPhotoByCodeId(req.params.id)
        if (data == null || data.length == 0) {
            return noDataFound(res);
        } else {
            message = "View one AlbumPhoto successfully";
            console.log(message);
            response = {
                success: true,
                message: message,
                data: data
            };
        }
        return res.json(response);
    } catch (e) {
        console.log(e);
        response = {
            success: false,
            message: 'Something went wrong'
        };
        res.send(response);
    }
};


var getAllAlbumPhotos = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // lấy thông tin tất cả AlbumPhoto từ database
        let data = await AlbumPhotoManagementService.getAllAlbumPhoto();
        message = "View all AlbumPhoto successfully";
        console.log(message);
        response = {
            success: true,
            message: message,
            data: data
        };
        return res.json(response);
    } catch (e) {
        console.log(e);
        response = {
            success: false,
            message: 'Something went wrong'
        };
        res.send(response);
    }
};



module.exports = { addAlbumPhoto, updateAlbumPhoto, deleteAlbumPhoto, getAlbumPhotoById,getAlbumPhotoByCodeId, getAllAlbumPhotos };
