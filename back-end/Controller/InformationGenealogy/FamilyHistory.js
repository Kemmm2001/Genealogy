const FamilyHistoryManagementService = require("../../service/InformationGenealogy/FamilyHistoryManagement");

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

var addFamilyHistory = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'CodeID',
            'Description'
        ];
        // Kiểm tra xem có đủ các trường của FamilyHistory không
        const missingFields = requiredFields.filter(field => !(field in req.body));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.status(400).json(missingFieldsError(missingFields));
        }
        console.log("No missing fields");
        // thêm FamilyHistory vào database
        let data = await FamilyHistoryManagementService.insertFamilyHistory(req.body)
        message = "Add FamilyHistory successfully";
        console.log(message);
        response = {
            success: true,
            message: message,
            data: {
                familyHistoryId: data.insertId,
                affectedRows: data.affectedRows
            }
        };

        return res.json(response);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
};

var updateFamilyHistory = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'FamilyHistoryID',
            'CodeID',
            'Description'
        ];
        // Kiểm tra xem có đủ các trường của FamilyHistory không
        const missingFields = requiredFields.filter(field => !(field in req.body));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.status(400).json(missingFieldsError(missingFields));
        }
        console.log("No missing fields");

        // lấy thông tin FamilyHistory từ database
        let data = await FamilyHistoryManagementService.getFamilyHistoryById(req.body.FamilyHistoryID)
        if (data == null || data.length == 0) {
            return noDataFound(res);
        }
        // cập nhật FamilyHistory vào database
        let dataUpdate = await FamilyHistoryManagementService.updateFamilyHistory(req.body)

        message = "Update FamilyHistory successfully";
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

var deleteFamilyHistory = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'FamilyHistoryID'
        ];
        // Kiểm tra xem có đủ các trường của FamilyHistory không
        const missingFields = requiredFields.filter(field => !(field in req.body));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.status(400).json(missingFieldsError(missingFields));
        }
        console.log("No missing fields");
        // lấy thông tin FamilyHistory từ database
        let data = await FamilyHistoryManagementService.getFamilyHistoryById(req.body.FamilyHistoryID)
        if (data == null || data.length == 0) {
            return noDataFound(res);
        }
        // xóa FamilyHistory khỏi database
        let dataDelete = await FamilyHistoryManagementService.removeFamilyHistory(req.body.FamilyHistoryID)

        message = "Delete FamilyHistory successfully";
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


var getFamilyHistoryById = async (req, res) => {
    try {
        // Log ra thông tin trong req.params
        console.log('Request params: ', req.params);
        // các trường bắt buộc phải có trong req.params
        const requiredFields = [
            'id'
        ];
        // Kiểm tra xem có đủ các trường của FamilyHistory không
        const missingFields = requiredFields.filter(field => !(field in req.params));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.status(400).json(missingFieldsError(missingFields));
        }

        console.log("No missing fields");
        // lấy thông tin FamilyHistory từ database
        let data = await FamilyHistoryManagementService.getFamilyHistoryById(req.params.id)
        if (data == null || data.length == 0) {
            return noDataFound(res);
        } else {
            message = "View one FamilyHistory successfully";
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
        res.send(e);
    }
};

var getFamilyHistoryByCodeId = async (req, res) => {
    try {
        // Log ra thông tin trong req.params
        console.log('Request params: ', req.params);
        // các trường bắt buộc phải có trong req.params
        const requiredFields = [
            'id'
        ];
        // Kiểm tra xem có đủ các trường của FamilyHistory không
        const missingFields = requiredFields.filter(field => !(field in req.params));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.status(400).json(missingFieldsError(missingFields));
        }

        console.log("No missing fields");
        // lấy thông tin FamilyHistory từ database
        let data = await FamilyHistoryManagementService.getFamilyHistoryByCodeId(req.params.id)
        if (data == null || data.length == 0) {
            return noDataFound(res);
        } else {
            message = "View one FamilyHistory successfully";
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
        res.send(e);
    }
};

var getAllFamilyHistories = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // lấy thông tin tất cả FamilyHistory từ database
        let data = await FamilyHistoryManagementService.getAllFamilyHistory();
        message = "View all FamilyHistory successfully";
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



module.exports = { addFamilyHistory, updateFamilyHistory, deleteFamilyHistory, getFamilyHistoryById,getFamilyHistoryByCodeId,  getAllFamilyHistories };
